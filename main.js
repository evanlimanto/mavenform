'use strict';

const AdmZip = require('adm-zip');
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


// Retrieve list of exams
app.get('/getExams', retrieveLists.getExams);

// Retrieve list of schools
app.get('/getSchools', retrieveLists.getSchools);

// Retrieve list of exam types
app.get('/getExamTypes', retrieveLists.getExamTypes);

// Retrieve list of terms
app.get('/getTerms', retrieveLists.getTerms);

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
app.get('/getExam/:id', function(req, res, next) {
  const id = req.params.id;
  const q = `select problem_num, subproblem_num, problem, solution, choices from content where exam = $1`;
  client.query({ text: q, values: [id]})
    .then((result) => {
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

app.post('/createUser', function(req, res) {
  const userId = req.body;
  const q = `insert into users (auth_user_id) values ($1) where not exists (select id from users where auth_user_id = $2)`;
  client.query(q, [userId, userId], function(err, result) {
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
    const imageName = match.slice(2, match.length - 6);
    content = content.replace(match, `<img src="https://storage.googleapis.com/studyform/${basePath}-${imageName}"></span>`);
  });
  return content;
}

app.post('/processTranscription', function(req, res) {
  const { contents, course, course_id, term, term_id, profs, school, school_id, exam_type, exam_type_id } = req.body;
  const imageFiles = req.files;

  const basePath = `${school}/img/${course}/${exam_type}-${term}`;
  _.forEach(imageFiles, (file) => {
    const fileName = `${basePath}-${file.name}`;
    const bucketFile = stagingBucket.file(fileName);
    const ws = bucketFile.createWriteStream({
      public: true,
      metadata: {
        contentEncoding: file.encoding
      }
    });
    ws.on('error', function(err) {
      console.error(err);
    });
    ws.on('finish', function() {
      console.log('Finished uploading file', fileName);
    });
    ws.write(file.data);
    ws.end();
  });

  let doc = null;
  try {
    doc = yaml.safeLoad(contents);
  } catch (e) {
    return console.error(e);
  }

  const results = _.map(_.filter(_.keys(doc), function(k) {
    return k.match(/^q\d+_\d+$/);
  }), (k) => [k, _.split(k.slice(1), "_")]);

  const inq = `insert into exams_staging (courseid, examtype, examid, profs, schoolid) values($1, $2, $3, $4, $5)`;
  client.query(inq, [course_id, exam_type_id, term_id, profs, school_id], function(err, res) {
    if (err) return console.error(err);
    const getq = `select id from exams_staging where courseid = $1 and examtype = $2 and examid = $3 and profs = $4 and schoolid = $5`;
    client.query(getq, [course_id, exam_type_id, term_id, profs, school_id], function(err, res) {
      if (err) return console.error(err);
      const renderedContent = _.map(results, (res) => {
        const key = res[0];
        const problem_num = res[1][0];
        const subproblem_num = res[1][1];
        const content = replaceImagePlaceholders(basePath, doc[key]);
        const solution = replaceImagePlaceholders(basePath, doc[key + "_s"]);
        const id = _.values(res.rows).id;
        const q = `insert into content_staging (problem_num, subproblem_num, problem, solution, exam) values($1, $2, $3, $4, $5)`;
        client.query(q, [problem_num, subproblem_num, content, solution, id], function(err, res) {
          if (err) return console.error(err);   
        });
      });
    });
  });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port, () => console.log('Started server on port', port));
