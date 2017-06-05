'use strict';

const async = require('async');
const bodyParser = require('body-parser');
const express = require('express');
const browserify = require('browserify');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const NodeCache = require('node-cache');
const pg = require('pg');
const sm = require('sitemap');
const SpellChecker = require('spellchecker');
const yaml = require('js-yaml');
const _ = require('lodash');

const retrieveLists = require('./retrieveLists');

// GCP Storage
const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: './gcp.json',
});
const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');
const stagingBucket = gcs.bucket('studyform-staging');

// Redis
const useCache = (process.env.NODE_ENV !== 'development');
const examCache = new NodeCache({ stdTTL: 30 * 60, checkperiod: 10 * 60 });
console.log("Using redis to cache exams:", useCache);

// Postgres
if (process.env.NODE_ENV !== 'development') {
  pg.defaults.ssl = true;
}
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

// Express
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/img', express.static(path.join(__dirname, '/src/img')));

// Error handler middleware
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Retrieve list of exams
app.get('/getExams', retrieveLists.getExams);

// Retrieve list of schools
app.get('/getSchools', retrieveLists.getSchools);

// Retrieve list of exam types
app.get('/getExamTypes', retrieveLists.getExamTypes);

// Retrieve list of terms
app.get('/getTerms', retrieveLists.getTerms);

// Retrieve list of transcribed exams
app.get('/getTranscribedExams', retrieveLists.getTranscribedExams);

// Retrieve list of transcribed content
app.get('/getTranscribedContent', retrieveLists.getTranscribedContent);

// Retrieve list of courses
app.get('/getSchoolCourses/:schoolCode', retrieveLists.getSchoolCourses);

// Retrieve list of exams
app.get('/getCourseExams/:schoolCode/:courseCode', retrieveLists.getCourseExams);

// Retrieve list of labels
app.get('/getLabels', retrieveLists.getLabels);

// Retrieve profs for an exam
app.get('/getProfs/:schoolCode/:courseCode/:examTypeCode/:termCode', retrieveLists.getProfs);

// File uploads
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  _.forEach(req.files, (file) => {
    const bucketFile = bucket.file(file.name);
    const ws = bucketFile.createWriteStream({
      public: true,
      metadata: {
        contentEncoding: file.encoding
      }
    });
    ws.on('error', function(err) {
      console.error(err);
    });
    ws.write(file.data);
    ws.end();
  });

  res.send('Successfully uploaded files!');
  res.end();
});

// Image uploads
app.post('/uploadImage', function(req, res) {
  if (!req.files)
    return req.status(400).send('No files were uploaded.');
  const { problem_num, image_num, school, courseid, examtype, examid } = req.body;
  const file = req.files[0];
  const fileName = `${school}/img/${coursecode}/${examtype}/${examid}-q${problem_num}-${image_num}.png`;
  const bucketFile = bucket.file(fileName);
  const ws = bucketFile.createWriteStream({
    public: true,
    metadata: {
      contentEncoding: file.encoding
    }
  });
  ws.on('error', function(err) {
    console.error(err);
    res.status(400).send(err);
  });
  ws.on('success', function(body) {
    res.send('Succesfully uploaded ' + fileName).end();
  });
  ws.write(file.data);
  ws.end();
});

// Search substring in problems
app.get('/searchProblems/:query_str', function(req, res, next) {
  const query_str = req.params.query_str;
  const q = `select * from content where problem like '%${query_str}%' or solution like '%${query_str}%'`;
  client.query({ text: q })
    .then((result) => {
      res.json(result.rows);
      res.end();
    });
});

// Search tags
app.get('/searchTags/:tag', function(req, res, next) {
  const query_str = req.params.query_tag;
  const q = `select * from content where `;
  client.query({ text: q})
    .then((result) => {
      res.json(result.rows);
      res.end();
    });
});

// Retrieve course listing
app.get('/getCourses/:schoolid', function(req, res, next) {
  const schoolid = req.params.schoolid;
  const q1 = `select id from schools where code = $1`;
  const q2 = `select id, code, name from courses where schoolid = $1`;
  client.query({ text: q1, values: [schoolid]})
    .then((result) => {
      if (result.rows.length > 0) {
        const id = result.rows[0].id;
        client.query({ text: q2, values: [id]})
          .then((result) => {
            const items = _.map(result.rows, function (row) {
              return { id: row.id, code: row.code, name: row.name };
            });
            res.json(items);
          });
      }
    });
});

// Retrieve exam contents
app.get('/getExam/:schoolCode/:courseCode/:examTypeCode/:termCode', function(req, res, next) {
  const { schoolCode, courseCode, examTypeCode, termCode } = req.params;

  const getidq = `
    select E.id from exams E
    inner join courses C on C.id = E.courseid
    inner join exam_types ET on ET.id = E.examtype
    inner join terms T on T.id = E.examid
    inner join schools S on S.id = E.schoolid
    where S.code = $1 and T.term_code = $2 and ET.type_code = $3 and C.code = $4;
  `;
  const getcontentq = `
    select problem_num, subproblem_num, problem, solution from content where exam = $1
  `;
  async.waterfall([
    (callback) => {
      client.query(getidq, [schoolCode, termCode, examTypeCode, courseCode], callback);
    },
    (result, callback) => {
      const id = result.rows[0].id;
      client.query(getcontentq, [id], callback);
    }
  ], (err, result) => {
    const info = _.reduce(result.rows, (result, row) => {
      const problem_num = row.problem_num;
      const subproblem_num = row.subproblem_num;
      if (_.has(result, problem_num)) {
        result[problem_num] = Math.max(result[problem_num], subproblem_num);
      } else {
        result[problem_num] = subproblem_num;
      }
      return result;
    }, {});

    const problems = _.reduce(result.rows, (result, row) => {
      const problem_num = row.problem_num;
      const subproblem_num = row.subproblem_num;
      const problem = row.problem;
      const solution = row.solution;
      const choices = row.choices;
      const key = `${problem_num}_${subproblem_num}`;
      result[key] = { problem, solution, choices };
      return result;
    }, {});
    res.json({info, problems});
    res.end();
  });
});

// Update problem contents
app.post('/updateProblem', function(req, res) {
  const { examid, problem_num, subproblem_num, problem_content, solution_content } = req.body;
  const q = `update content set problem=$1, solution=$2 where exam=$3 and problem_num=$4 and subproblem_num=$5`;
  client.query(q, [problem_content, solution_content, examid, problem_num, subproblem_num], function(err, result) {
    if (err) res.status(400).send(err);
    else res.send("Success!");
    res.end();
  });
});

// Add an exam
app.post('/addExam', function(req, res) {
  let { course_code, exam_type, exam_term, exam_year, profs } = req.body;
  exam_year = _.toInteger(exam_year) - 2000;
  if (exam_year < 10) {
    exam_year = "0" + _.toString(exam_year);
  }
  const q = `insert into exams (courseid, examtype, examid, profs) values ($1, $2, $3, $4)`;
  client.query(q, [course_code, exam_type, _.toString(exam_term) + exam_year, profs], function(err, result) {
    if (res) res.status(400).send(err);
    else res.send("Success!");
    res.end();
  });
});

app.post('/addProblem', function(req, res) {
  const { examid, problem_num, subproblem_num } = req.body;
  const q = `insert into content (problem_num, subproblem_num, problem, solution, exam) values($1, $2, $3, $4, $5)`;
  client.query(q, [problem_num, subproblem_num, "", "", examid], function(err, result) {
    if (res) res.status(400).send(err);
    else res.send("Success!");
    res.end();
  });
});

app.post('/createUser/:userid', function(req, res) {
  const userid = req.params.userid;
  const q = `insert into users (auth_user_id) values ($1) where not exists (select id from users where auth_user_id = $2)`;
  client.query(q, [userid, userid], function(err, result) {
    if (res) res.status(400).send(err);
    else res.send("Success!");
    res.end();
  });
});

function replaceImagePlaceholders(basePath, content) {
  if (!content) return content;
  const regexp = /\[\[(.*?)\]\]/g;
  const matches = content.match(regexp);
  _.forEach(matches, (match) => {
    const imageName = match.slice(2, match.length - 2);
    content = content.replace(match, `<img src="https://storage.googleapis.com/studyform-staging/${basePath}-${imageName}"></span>`);
  });
  return content;
}

app.post('/processTranscription', function(req, res, next) {
  const { contents, course, course_id, term, term_id, profs, school, school_id,
          exam_type, exam_type_id } = req.body;
  const imageFiles = req.files;

  const basePath = `${school}/img/${course}/${exam_type}-${term}`;
  async.forEach(imageFiles, (file, callback) => {
    const fileName = `${basePath}-${file.name}`;
    const bucketFile = stagingBucket.file(fileName);
    const ws = bucketFile.createWriteStream({
      public: true,
      metadata: {
        contentType: 'image/png',
        contentEncoding: file.encoding
      }
    });
    ws.on('error', function(err) {
      callback(err);
    });
    ws.on('finish', function() {
      console.log('Finished uploading file', fileName);
    });
    ws.write(file.data);
    ws.end();
  }, (err) => {
    next(err); 
  });

  let doc = null;
  try {
    doc = yaml.safeLoad(contents);
  } catch (err) {
    next(e);
  }

  const items = _.map(_.filter(_.keys(doc), function(k) {
    return k.match(/^q\d+_\d+$/);
  }), (k) => [k, _.split(k.slice(1), "_")]);

  const inq    = `insert into exams_staging (courseid, examtype, examid, profs, schoolid) values($1, $2, $3, $4, $5)`;
  const getq   = `select id from exams_staging where courseid = $1 and examtype = $2 and examid = $3 and profs = $4 and schoolid = $5`;
  const imageq = `insert into images_staging (examid, url) values($1, $2)`;
  const q      = `insert into content_staging (problem_num, subproblem_num, problem, solution, exam) values($1, $2, $3, $4, $5)`;
  async.waterfall([
    (callback) => {
      client.query(inq, [course_id, exam_type_id, term_id, profs, school_id], (err) => callback(err))
    },
    (callback) => {
      client.query(getq, [course_id, exam_type_id, term_id, profs, school_id], callback)
    },
    (result, callback) => {
      const id = result.rows[0].id;
      async.parallel([
        (funcCallback) => async.each(imageFiles, (file, innerCallback) => {
          client.query(imageq, [id, `${basePath}-${file.name}`], (err) => innerCallback(err));
        }, funcCallback),
        (funcCallback) => async.each(items, (item, innerCallback) => {
          const key = item[0];
          const problem_num = item[1][0];
          const subproblem_num = item[1][1];
          const content = replaceImagePlaceholders(basePath, doc[key]);
          const solution = replaceImagePlaceholders(basePath, doc[key + "_s"]);
          client.query(q, [problem_num, subproblem_num, content, solution, id], (err) => innerCallback(err));  
        }, funcCallback)
      ], callback);
    }
  ], (err, results) => {
    if (err) next(err);
    else res.send('Success!');
  });
});

app.get('/approveTranscription/:examid', function(req, res) {
  const approvedExamId = req.params.examid;

  const imageq    = `select url from images_staging where examid = $1`;
  const delimageq = `delete from images_staging where examid = $1`;
  const getq      = `select courseid, examtype, examid, schoolid, profs from exams_staging where id = $1`;
  const inq       = `insert into exams (courseid, examtype, examid, schoolid, profs) values($1, $2, $3, $4, $5)`;
  const getidq    = `select id from exams where courseid = $1 and examtype = $2 and examid = $3 and schoolid = $4 and profs = $5`;
  const insertproblemsq = `insert into content (problem_num, subproblem_num, problem, solution, exam)
    select problem_num, subproblem_num, problem, solution, $1 from content_staging where exam = $2`;
  const deleteproblemsq = `delete from content_staging where exam = $1`;
  const delq = `delete from exams_staging where id = $1`;

  async.series([
    (callback) => client.query(imageq, [approvedExamId], (err, result) =>
      async.each(result.rows, (row) => {
        const sourceFile = stagingBucket.file(row.url);
        async.waterfall([
          (innerCallback) => {
            sourceFile.move(bucket, innerCallback)
          },
          (destFile, resp, innerCallback) => {
            destFile.makePublic(innerCallback)
          }
        ], callback)
      })),
    (callback) => {
      client.query(delimageq, [approvedExamId], callback);
    }
  ], (err) => {
    next(err);
  });

  async.waterfall([
    (callback) => {
      client.query(getq, [approvedExamId], callback);
    },
    (result, callback) => {
      const { courseid, examtype, examid, schoolid, profs } = result.rows[0];
      client.query(inq, [courseid, examtype, examid, schoolid, profs], callback);
    },
    (result, callback) => {
      const id = result.rows[0].id;
      client.query(insertproblemsq, [id, approvedExamId], (err) => callback(err));
    },
    (callback) => {
      client.query(deleteproblemsq, [approvedExamId], (err) => callback(err)); 
    },
    (callback) => {
      client.query(delq, [approvedExamId], (err) => callback(err));
    }
  ], (err) => {
    next(err);
  });
});

app.get('/getBookmarkedCourses/:userid', (req, res, next) => {
  const userid = req.params.userid;

  const q = `select courses.id, courses.code from bookmarked_courses BC
    inner join courses on BC.courseid = courses.id
    inner join users on BC.userid = users.id
    where users.auth_user_id = $1`;
  client.query(q, [userid], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const items = _.map(result.rows, (row) => row.code);
    res.json(items);
  });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port, () => console.log('Started server on port', port));
