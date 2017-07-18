'use strict';

const async = require('async');
const bodyParser = require('body-parser');
const express = require('express');
const browserify = require('browserify');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const hash = require('string-hash');
const http = require('http');
const glob = require('glob');
const path = require('path');
const NodeCache = require('node-cache');
const pg = require('pg');
const request = require('request');
const randomstring = require('randomstring');
const url = require('url');
const validator = require('validator');
const yaml = require('js-yaml');
const _ = require('lodash');

const renderer = require('./src/renderer');
const retrieveLists = require('./retrieveLists');

Error.stackTraceLimit = Infinity;

// Mailgun
const mg_api_key = 'key-55424568d6fba5e1b922f7aedb80543b';
const mg_domain = 'mg.studyform.com';
const mg_options = {
  url: 'https://api.mailgun.net/v3/' + mg_domain + '/messages',
  method: 'POST',
  auth: {
    user: 'api',
    pass: mg_api_key,
  },
};

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
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: process.env.NODE_ENV !== 'development',
};
const pool = new pg.Pool(config);

// Express
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/img', express.static(path.join(__dirname, '/src/img')));

// Retrieve list of exams
app.get('/getExams', retrieveLists.getExams);

// Retrieve list of schools
app.get('/getSchools', retrieveLists.getSchools);

// Retrieve list of exam types
app.get('/getExamTypes', retrieveLists.getExamTypes);

// Retrieve list of terms
app.get('/getTerms', retrieveLists.getTerms);

// Retrieve list of subjects
app.get('/getSubjects', retrieveLists.getSubjects);

// Retrieve list of transcribed exams
app.get('/getTranscribedExams', retrieveLists.getTranscribedExams);

// Retrieve information for a transcribed exam
app.get('/getTranscribedExam/:examid', retrieveLists.getTranscribedExam);

// Retrieve courses grouped by school
app.get('/getCoursesBySchool', retrieveLists.getCoursesBySchool);

// Retrieve list of transcribed content
app.get('/getTranscribedContent/:examid', retrieveLists.getTranscribedContent);

// Retrive dict of transcribed content
app.get('/getTranscribedContentDict', retrieveLists.getTranscribedContentDict);

// Retrieve dictionary of courses with subjects
app.get('/getSchoolCourses/:schoolCode', retrieveLists.getSchoolCourses);

// Retrieve dictionary of courses with subjects
app.get('/getSchoolCoursesList/:schoolid', retrieveLists.getSchoolCoursesList);

// Retrieve list of courses that are not bookmarked
app.get('/getUnbookmarkedCourses/:school_id/:auth_user_id', retrieveLists.getUnbookmarkedCourses);

// Retrieve list of exams
app.get('/getCourseExams/:schoolCode/:courseCode', retrieveLists.getCourseExams);

// Retrieve list of labels
app.get('/getLabels', retrieveLists.getLabels);

// Retrieve information for an exam
app.get('/getExamInfo/:schoolCode/:courseCode/:examTypeCode/:termCode', retrieveLists.getExamInfo);

// Retrieve list of courses
app.get('/getCoursesList', retrieveLists.getCoursesList);

// Retrieve list of math topics
app.get('/getMathTopics', retrieveLists.getMathTopics);

// Retrieve math content by topic
app.get('/getMathContent/:topic', retrieveLists.getMathContent);

// File uploads
app.post('/upload', (req, res) => {
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
    ws.on('error', (err) => {
      console.error(err);
    });
    ws.write(file.data);
    ws.end();
  });

  res.send('Successfully uploaded files!');
  return res.end();
});

// Image uploads
app.post('/uploadImage', (req, res) => {
  if (!req.files || req.files.length === 0)
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
  ws.on('error', (err) => {
    console.error(err);
    res.status(400).send(err);
  });
  ws.write(file.data);
  return ws.end();
});

// Search substring in problems
app.get('/searchProblems/:query_str', (req, res, next) => {
  const query_str = req.params.query_str;
  const q = `select * from content where problem like '%${query_str}%' or solution like '%${query_str}%'`;
  pool.query(q, (err, result) => {
    if (err)
      return next(err);
    return res.json(result.rows);
  });
});

// Search tags
app.get('/searchTags/:tag', (req, res, next) => {
  const query_str = req.params.query_tag;
  const q = `select * from content where `;
  pool.query(q, (err, result) => {
    if (err)
      return next(err);
    return res.json(result.rows);
  });
});

// Retrieve course listing
app.get('/getCourses/:schoolid', (req, res, next) => {
  const schoolid = req.params.schoolid;
  const q1 = `select id from schools where code = $1`;
  const q2 = `select id, code from courses where schoolid = $1`;
  async.waterfall([
    (callback) => pool.query(q1, [schoolid], callback),
    (result, callback) => {
      if (result.rows.length === 0)
        return callback(null, null);
      return pool.query(q2, [result.rows[0].id], callback);
    },
  ], (err, result) => {
    if (err) return next(err);
    if (!result) return res.json({});
    const items = _.map(result.rows, (row) => {
      return { id: row.id, code: row.code, name: row.name };
    });
    return res.json(items);
  });
});

app.get('/getExamById/:examid', (req, res, next) => {
  const { examid } = req.params;

  const getcontentq = `
    select problem_num, subproblem_num, problem, solution, choices from content where exam = $1
  `;
  pool.query(getcontentq, [examid], (err, result) => {
    const info = _.reduce(result.rows, (result, row) => {
      const problem_num = row.problem_num;
      const subproblem_num = row.subproblem_num;
      if (_.has(result, problem_num))
        result[problem_num] = Math.max(result[problem_num], subproblem_num);
      else
        result[problem_num] = subproblem_num;
      return result;
    }, {});

    const problems = _.reduce(result.rows, (result, row) => {
      const problem_num = row.problem_num;
      const subproblem_num = row.subproblem_num;
      const problem = renderer.preprocess(row.problem);
      const solution = renderer.preprocess(row.solution);
      const choices = row.choices;
      const key = `${problem_num}_${subproblem_num}`;
      result[key] = { problem, solution, choices };
      return result;
    }, {});
    return res.json({info, problems});
  })
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
    select id as content_id, problem_num, subproblem_num, problem, solution, choices from content where exam = $1
  `;
  async.waterfall([
    (callback) => {
      pool.query(getidq, [schoolCode, termCode, examTypeCode, courseCode], callback);
    },
    (result, callback) => {
      if (result.rows.length === 0)
        return callback(null, null);
      const id = result.rows[0].id;
      pool.query(getcontentq, [id], callback);
    }
  ], (err, result) => {
    if (err)
      return next(err);
    if (!result)
      return res.json({});
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
      let { content_id, problem_num, subproblem_num, problem, solution, choices } = row;
      problem = renderer.preprocess(row.problem);
      solution = renderer.preprocess(row.solution);
      const key = `${problem_num}_${subproblem_num}`;
      result[key] = { problem, solution, choices, content_id };
      return result;
    }, {});

    return res.json({info, problems});
  });
});

// Update problem contents
app.post('/updateProblem', (req, res, next) => {
  const { examid, problem_num, subproblem_num, problem_content,
          solution_content, choices_content } = req.body;
  const q = `
    update content set problem=$1, solution=$2, choices=$3
    where exam=$4 and problem_num=$5 and subproblem_num=$6
  `;

  pool.query(q, [problem_content, solution_content,
                   choices_content, examid,
                   problem_num, subproblem_num], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

// Add a course
app.post('/addCourse', (req, res, next) => {
  const { course_code, schoolid, subjectid } = req.body;
  const q = `
    insert into courses (code, schoolid, subjectid)
    values($1, $2, $3, $4)
  `;
  pool.query(q, [course_code, schoolid, subjectid], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

// Add an exam
app.post('/addExam', (req, res, next) => {
  let { course_code, exam_type, exam_term, exam_year, profs } = req.body;
  exam_year = _.toInteger(exam_year) - 2000;
  if (exam_year < 10) {
    exam_year = "0" + _.toString(exam_year);
  }
  const q = `insert into exams (courseid, examtype, examid, profs) values ($1, $2, $3, $4)`;
  pool.query(q, [course_code, exam_type, _.toString(exam_term) + exam_year, profs], function(err, result) {
    if (res) return next(err);
    return res.send("Success!");
  });
});

app.post('/addProblem', (req, res, next) => {
  const { examid, problem_num, subproblem_num } = req.body;
  const q = `insert into content (problem_num, subproblem_num, problem, solution, exam) values($1, $2, $3, $4, $5)`;
  pool.query(q, [problem_num, subproblem_num, "", "", examid], (err, result) => {
    if (res) return next(err);
    return res.send("Success!");
  });
});

app.post('/createUser', (req, res, next) => {
  const { auth_user_id, nickname } = req.body;
  const q = `insert into users (auth_user_id, nickname) select $1, $2
    where not exists (select 1 from users where auth_user_id = $3)
  `;
  pool.query(q, [auth_user_id, nickname, auth_user_id], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

function replaceImagePlaceholders(basePath, content) {
  if (!content) return content;
  const regexp = /!!(.*?)!!/g;
  const matches = content.match(regexp);
  _.forEach(matches, (match) => {
    const imageName = match.slice(2, match.length - 2);
    content = content.replace(match, `<img src="https://storage.googleapis.com/studyform-staging/${basePath}-${imageName}"></span>`);
  });
  return content;
}

app.post('/processTranscription', (req, res, next) => {
  const { contents, course, course_id, term, term_id, profs, school, school_id,
          exam_type, exam_type_id, pdf_link } = req.body;
  const imageFiles = req.files;

  const pdfPath = `${school}/pdf/${course}/${exam_type}-${term}-${randomstring.generate(10)}.pdf`;
  if (false && validator.isURL(pdfPath))
    http.get(pdf_link, (response) => {
      if (_.has(response, 'statusCode') && response.statusCode === 404)
        return;
      const bucketFile = bucket.file(pdfPath);
      const ws = bucketFile.createWriteStream({
        public: true,
        metadata: { contentType: 'application/pdf' }
      }); 
      ws.on('error', function(err) {
        console.error(err);
      });
      return response.pipe(ws);
    });

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
    ws.write(file.data);
    return ws.end();
  }, (err) => {
    if (err) return next(err); 
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

  const inq    = `insert into exams_staging (courseid, examtype, examid, profs, schoolid, datetime, source_url) select $1, $2, $3, $4, $5, now(), $6
                  where not exists (select 1 from exams_staging where courseid = $7 and examtype = $8 and examid = $9 and profs = $10 and schoolid = $11)`;
  const getq   = `select id from exams_staging where courseid = $1 and examtype = $2 and examid = $3 and profs = $4 and schoolid = $5`;
  const imageq = `insert into images_staging (examid, url) values($1, $2)`;
  const q      = `insert into content_staging (problem_num, subproblem_num, problem, solution, exam, choices) values($1, $2, $3, $4, $5, $6)`;
  async.waterfall([
    (callback) => {
      pool.query(inq, [course_id, exam_type_id, term_id, profs, school_id, pdf_link, course_id, exam_type_id, term_id, profs, school_id], (err) => callback(err))
    },
    (callback) => {
      pool.query(getq, [course_id, exam_type_id, term_id, profs, school_id], callback)
    },
    (result, callback) => {
      if (result.rows.length === 0)
        return callback(null, null);
      const id = result.rows[0].id;
      async.parallel([
        (funcCallback) => async.each(imageFiles, (file, innerCallback) => {
          pool.query(imageq, [id, `${basePath}-${file.name}`], (err) => innerCallback(err));
        }, funcCallback),
        (funcCallback) => async.each(items, (item, innerCallback) => {
          const key = item[0];
          const problem_num = item[1][0];
          const subproblem_num = item[1][1];
          const content = replaceImagePlaceholders(basePath, doc[key]);
          let choices = null, solution = null;
          if (_.has(doc, key + "_i")) {
            solution = doc[key + "_s"];
            choices = _.join(doc[key + "_i"], "~");
          } else {
            solution = replaceImagePlaceholders(basePath, doc[key + "_s"]);
          }
          pool.query(q, [problem_num, subproblem_num, content, solution, id, choices], (err) => innerCallback(err));  
        }, funcCallback)
      ], callback);
    }
  ], (err, results) => {
    if (err) return next(err);
    return res.send('Success!');
  });
});

app.get('/approveTranscription/:examid', (req, res, next) => {
  const approvedExamId = req.params.examid;

  const imageq    = `select url from images_staging where examid = $1`;
  const delimageq = `delete from images_staging where examid = $1`;
  const getq      = `select courseid, examtype, examid, schoolid, profs, source_url from exams_staging where id = $1`;
  const inq       = `insert into exams (courseid, examtype, examid, schoolid, profs, source_url) values($1, $2, $3, $4, $5, $6)`;
  const getidq    = `select id from exams where courseid = $1 and examtype = $2 and examid = $3 and schoolid = $4 and profs = $5`;
  const insertproblemsq = `insert into content (problem_num, subproblem_num, problem, solution, exam, choices)
    select problem_num, subproblem_num, replace(problem, 'https://storage.googleapis.com/studyform-staging', 'https://storage.googleapis.com/studyform'), replace(solution, 'https://storage.googleapis.com/studyform-staging', 'https://storage.googleapis.com/studyform'), $1, choices from content_staging where exam = $2`;
  const deleteproblemsq = `delete from content_staging where exam = $1`;
  const delq = `delete from exams_staging where id = $1`;

  let courseid, examtype, examid, schoolid, profs, source_url;
  async.series([
    (callback) => pool.query(imageq, [approvedExamId], (err, result) => {
      if (err)
        return callback(err);
      async.parallel([
        (innerCallback) => pool.query(delimageq, [approvedExamId], innerCallback),
        (innerCallback) => {
          async.each(result.rows, (row, eachCallback) => {
            const sourceFile = stagingBucket.file(row.url);
            return sourceFile.exists((err, exists) => {
              if (err) return eachCallback(err);
              if (exists)
                return async.waterfall([
                  (innerCallback) => sourceFile.move(bucket, innerCallback),
                  (destFile, resp, innerCallback) => destFile.makePublic((err) => innerCallback(err))
                ], eachCallback)
              else return eachCallback(null);
            });
          }, innerCallback)
        }], callback);
    }),
  ], (err) => {
    if (err)
      return next(err);
    async.waterfall([
      (callback) => pool.query(getq, [approvedExamId], callback),
      (result, callback) => {
        if (result.rows.length === 0)
          return callback(new Error("No rows."));
        courseid = result.rows[0].courseid;
        examtype = result.rows[0].examtype;
        examid = result.rows[0].examid;
        schoolid = result.rows[0].schoolid;
        profs = result.rows[0].profs;
        source_url = result.rows[0].source_url;
        pool.query(inq, [courseid, examtype, examid, schoolid, profs, source_url], (err) => callback(err));
      },
      (callback) => pool.query(getidq, [courseid, examtype, examid, schoolid, profs], callback),
      (result, callback) => {
        const id = result.rows[0].id;
        pool.query(insertproblemsq, [id, approvedExamId], (err) => callback(err));
      },
      (callback) => pool.query(deleteproblemsq, [approvedExamId], (err) => callback(err)),
      (callback) => pool.query(delq, [approvedExamId], (err) => callback(err)),
    ], (err) => {
      if (err) return next(err);
      return res.send("Success!");
    });
  });
});

app.get('/getBookmarkedCourses/:userid', (req, res, next) => {
  const userid = req.params.userid;

  const q = `select courses.id, courses.code from bookmarked_courses BC
    inner join courses on BC.courseid = courses.id
    inner join users on BC.userid = users.id
    where users.auth_user_id = $1`;
  pool.query(q, [userid], (err, result) => {
    if (err) return next(err);
    const items = _.map(result.rows, (row) => row.code);
    return res.json(items);
  });
});

app.get('/getUserSchool/:userid', (req, res, next) => {
  const userid = req.params.userid;

  const q = `select users.schoolid as id, schools.name as name, schools.code as code from users
    inner join schools on schools.id = users.schoolid where users.auth_user_id = $1`;
  pool.query(q, [userid], (err, result) => {
    if (result.rows.length === 0) {
      return res.json({});
    } else {
      const row = result.rows[0];
      return res.json({ id: row.id, name: row.name, code: row.code });
    }
  });
});

app.post('/selectSchool', (req, res, next) => {
  const { auth_user_id, school_id } = req.body;

  const q = `update users set schoolid = $1 where auth_user_id = $2`;
  pool.query(q, [school_id, auth_user_id], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/bookmarkCourse', (req, res, next) => {
  const { auth_user_id, course_id } = req.body;

  const q = `
    insert into bookmarked_courses(userid, courseid)
      select id, $1 from users where auth_user_id = $2
  `;
  pool.query(q, [course_id, auth_user_id], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/applyMarketing', (req, res, next) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).send("No resume uploaded.");
  const marketingBucket = gcs.bucket('studyform-marketing'); 
  let file = _.values(req.files)[0];
  file.name = randomstring.generate(5) + "-" + file.name;

  const bucketFile = marketingBucket.file(file.name);
  const ws = bucketFile.createWriteStream({
    public: true,
    metadata: {
      contentEncoding: file.encoding,
      contentType: 'application/pdf'
    }
  });
  ws.on('error', function(err) {
    console.error(err);
  });
  ws.write(file.data);
  ws.end();

  const { name, email, school, essay1, essay2 } = req.body;
  const q = `
    insert into marketing_apps (name, email, school, essay1, essay2, resume)
    values($1, $2, $3, $4, $5, $6)
  `;

  pool.query(q, [name, email, school, essay1, essay2, file.name], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/waitlistSignup', (req, res) => {
  const { email } = req.body;
  const q = `insert into waitlist (email) values ($1)`;

  pool.query(q, [], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/contentFeedback', (req, res) => {
  const { content_id } = req.body;
  const q = `insert into content_feedback (content_id) values ($1)`;

  pool.query(q, [], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/dashboardLogin', (req, res) => {
  const { password } = req.body;
  if (password === "cloudfactory") {
    return res.send("Success!");
  } else {
    return res.status(400).send("Invalid password!");
  }
});

app.post('/deleteCourse', (req, res, next) => {
  const { course_id } = req.body;
  const q = `delete from courses where id = $1`;

  pool.query(q, [course_id], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/addToDiscussion', (req, res, next) => {
  const { content, parentid, userid, contentid } = req.body;
  
  const q = `
    insert into discussion (content, parentid, userid, contentid)
    values($1, $2, $3, $4)
  `;
  pool.query(q, [content, parentid, userid, contentid], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/reportError', (req, res, next) => {
  const { content_id, error_content } = req.body;
  const q = `insert into reports (content_id, error) values($1, $2)`;

  pool.query(q, [content_id, error_content], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.get('/getMarketingApps', (req, res, next) => {
  const getq = `select name, email, school, essay1, essay2, resume from marketing_apps`;

  pool.query(getq, (err, results) => {
    if (err) return next(err);
    const items = _.map(results.rows, (row) => {
      return {
        name: row.name,
        email: row.email,
        school: row.school,
        essay1: row.essay1, 
        essay2: row.essay2,
        resume: row.resume,
      };
    });
    return res.json(items);
  });
});

app.post('/signup', (req, res, next) => {
  const { access_code, username, email, password } = req.body;

  const q = `select id, code, used from access_codes where code = $1`;
  const uq = `update access_codes set used = true where id = $1`;
  pool.query(q, [access_code], (err, result) => {
    if (err) return next(err); 
    if (result.rows.length === 0)
      return res.status(400).send("Invalid access code.");
    if (result.rows[0].used)
      return res.status(400).send("Access code already used.");
    const row = result.rows[0];
    return pool.query(uq, [row.id], (err, result) => {
      if (err) return next(err);
      return res.send("Success!");
    });
  });
});

app.post('/changePassword', (req, res, next) => {
  const { email } = req.body;
  const options = {
    method: 'POST',
    url: 'https://mavenform.auth0.com/dbconnections/change_password',
    headers: { 'content-type': 'application/json' },
    body: {
      pool_id: 'oLKATgXnwtDDn8TwycvApVGECfBx2Zlq',
      email: email,
      connection: 'Username-Password-Authentication'
    },
    json: true
  };

  request(options, function (err, response, body) {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/waitlistCourses', (req, res, next) => {
  const { email, courses } = req.body;

  const q = `insert into waitlist_courses (email, courses) values($1, $2)`;
  pool.query(q, [email, courses], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/addToWaitlist', (req, res, next) => {
  const { email } = req.body;
  const q = `insert into waitlist (email) values ($1)`;

  const options = {
    method: 'POST',
    url: 'https://api.mailgun.net/v3/lists/waitlist@mg.studyform.com/members',
    auth: {
      user: 'api',
      pass: 'key-55424568d6fba5e1b922f7aedb80543b',
    },
    form: { address: email, upsert: "yes" }
  };

  async.parallel([
    (callback) => pool.query(q, [email], (err) => callback(err)),
    (callback) => request(options, (err) => callback(err)),
  ], (err) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/getProblem/:content_id', (req, res, next) => {
  const { content_id } = req.params;

  const getq = `select problem_num, subproblem_num, problem, solution, tags, choices from content where id = $1`;
  pool.query(getq, [content_id], (err, result) => {
    if (err) return next(err);
    const row = result.rows[0];
    return res.json({
      problem_num: row.problem_num,
      subproblem_num: row.subproblem_num,
      problem: row.problem,
      solution: row.solution,
      tags: row.tags,
      choices: row.choices,
    });
  });
});

app.get('/getComments/:contentid', (req, res, next) => {
  const { contentid } = req.params;

  const getq = `
    select D.id as id, D.content as content, users.nickname as nickname,
      D.datetime as datetime, D.parentid as parentid,
      D.upvotes as upvotes, D.deleted as deleted from discussion D
    inner join users on D.userid = users.id
    where contentid = $1
  `;

  pool.query(getq, [contentid], (err, result) => {
    if (err) return next(err);
    const items = _.map(result.rows, (row) => {
      return {
        id: row.id,
        content: row.content,
        nickname: row.nickname,
        datetime: row.datetime,
        parentid: row.parentid,
        upvotes: row.upvotes,
        deleted: row.deleted,
      }
    });
    return res.json(items);
  });
});

app.post('/addComment', (req, res, next) => {
  const { parentid, userid, comment, content_id } = req.body;

  const getq = `select id, nickname from users where auth_user_id = $1`;
  const getexamq = `
    select content.problem_num, content.subproblem_num, courses.code_label, schools.name as school_name, exam_types.type_label, terms.term_label from content
    inner join exams on exams.id = content.exam
    inner join courses on courses.id = exams.courseid
    inner join exam_types on exam_types.id = exams.examtype
    inner join terms on terms.id = exams.examid
    inner join schools on schools.id = courses.schoolid
    where content.id = $1;
  `;
  const inq = `insert into discussion (content, userid, contentid, datetime, parentid) values($1, $2, $3, now(), $4) returning id`;

  async.parallel([
    (outerCallback) => {
      async.parallel([
        (callback) => pool.query(getq, [userid], callback),
        (callback) => pool.query(getexamq, [content_id], callback),
      ], (err, results) => {
        const r0 = results[0].rows[0], r1 = results[1].rows[0];
        if (err)
          return outerCallback(err);
        const data = {
          from: 'Discussion <discussion@studyform.com>',
          to: 'founders@studyform.com',
          subject: 'Somone posted a discussion message!',
          html: `
          User with nickname: ${r0.nickname}, id: ${userid} just posted a comment!
          <br/>
          Course: ${r1.school_name} - ${r1.code_label}
          <br/>
          Type: ${r1.type_label}
          <br/>
          Term: ${r1.term_label}
          <br/>
          Problem: ${r1.problem_num}
          <br/>
          Subproblem: ${r1.subproblem_num}
          <br/>
          Content: ${comment}`,
        };
        return request.post(_.extend(mg_options, { form: data }), outerCallback);
      })
    },
    (outerCallback) => async.waterfall([
      (callback) => pool.query(getq, [userid], callback),
      (results, callback) => pool.query(inq, [comment, results.rows[0].id, content_id, parentid], callback)
    ], (err, results) => {
      res.send(_.toString(results.rows[0].id));
      return outerCallback(err);
    })
  ], (err) => {
    if (err) return next(err);
    return;
  });
});

app.get('/deleteComment/:commentid', (req, res, next) => {
  const { commentid } = req.params;

  const updateq = `update discussion set deleted = true where id = $1`;

  pool.query(updateq, [commentid], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.get('/undeleteComment/:commentid', (req, res, next) => {
  const { commentid } = req.params;

  const updateq = `update discussion set deleted = false where id = $1`;

  pool.query(updateq, [commentid], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.post('/replyComment', (req, res, next) => {
  const { parentid, content, contentid, userid } = req.body;
  const inq = `insert into discussion (content, userid, contentid, datetime, parentid) values($1, $2, $3, now(), $4)`;

  pool.query(inq, [content, userid, contentid, parentid], (err, result) => {
    if (err) return next(err);
    return res.send("Success!"); 
  });
});

app.get('/getUpvotes/:contentid', (req, res, next) => {
  const { contentid } = req.params;
  const getq = `select contentid, userid, commentid from upvotes where contentid = $1`;

  pool.query(getq, [contentid], (err, result) => {
    if (err) return console.erorr(err);
    const items = _.map(result.rows, (row) => {
      return {
        contentid: row.contentid,
        userid: row.userid,
        commentid: row.commentid,
      };
    });
    return res.json(items);
  });
});

app.get('/getComments', (req, res, next) => {
  const getq = `select * from discussion`;

  pool.query(getq, (err, result) => {
    if (err) return next(err);
    const items = _.map(result.rows, (row) => {
      return {
        id: row.id,
        content: row.content,
        userid: row.userid,
        contentid: row.contentid,
        upvotes: row.upvotes,
        deleted: row.deleted,
      };
    });
    return res.json(items);
  });
});

app.post('/deleteQuestionComment', (req, res, next) => {
  const { id } = req.body;
  const delq = `delete from discussion where id = $1`;

  pool.query(delq, [id], (err, result) => {
    if (err) return next(err);
    return res.send("Success!");
  });
});

app.get('/getMathLabel/:code', (req, res, next) => {
  const { code } = req.params;
  const getq = `select concept from math_topics where code = $1`;

  pool.query(getq, [code], (err, result) => {
    if (err) return next(err);
    return res.send({ concept: result.rows[0].concept });
  });
});

app.use(express.static(path.join(__dirname, '/build')));

// Error handler middleware
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return console.error(err);
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port, () => console.log('Started server on port', port));
