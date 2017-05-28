'use strict';

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
const _ = require('lodash');

// GCP Storage
const gcloud = require('google-cloud')({
  projectId: 'studyform-168904',
  keyFilename: './gcp.json',
});
const gcs = gcloud.storage();
const bucket = gcs.bucket('studyform');

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

// Retrieve exam list
app.get('/getExams', function(req, res, next) {
  const q = `select * from exams`;
  client.query({ text: q })
    .then((result) => {
      const multi_dict = _.reduce(result.rows, (dict, row) => {
        const id = row.id;
        const courseid = row.courseid;
        const examtype = row.examtype;
        const examid = row.examid;
        const profs = row.profs;
        if (!_.has(dict, courseid)) {
          dict[courseid] = {};
        }
        if (!_.has(dict[courseid], examtype)) {
          dict[courseid][examtype] = {};
        }
        dict[courseid][examtype][examid] = { id, profs };
        return dict;
      }, {});
      const key_dict = _.reduce(result.rows, (dict, row) => {
        const id = row.id;
        const courseid = row.courseid;
        const examtype = row.examtype;
        const examid = row.examid;
        const profs = row.profs;
        dict[id] = { courseid, examtype, examid, profs };
        return dict;
      }, {});
      res.json({ multi_dict, key_dict });
    });
});

// Retrieve course listing
app.get('/getCourses/:schoolid', function(req, res, next) {
  const schoolid = req.params.schoolid;
  const q1 = `select id from schools where code = $1`;
  const q2 = `select code, name from courses where schoolid = $1`;
  client.query({ text: q1, values: [schoolid]})
    .then((result) => {
      if (result.rows.length > 0) {
        const id = result.rows[0].id;
        client.query({ text: q2, values: [id]})
          .then((result) => {
            const items = _.map(result.rows, function (row) {
              return { code: row.code, name: row.name };
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
  console.log(req.body);
  const q = `update content set problem=$1, solution=$2 where exam=$3 and problem_num=$4 and subproblem_num=$5`;
  client.query(q, [problem_content, solution_content, examid, problem_num, subproblem_num], function(err, result) {
    if (err) res.status(400).send(err);
    res.end();
  });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port, () => console.log('Started server on port', port));
