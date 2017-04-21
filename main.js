'use strict';

const AWS = require('aws-sdk');
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

AWS.config.update(JSON.parse(fs.readFileSync('aws.json')));
const s3 = new AWS.S3();

const port = process.env.PORT || 8080;
const app = express();

const useCache = (process.env.NODE_ENV !== 'development');
const examCache = new NodeCache({ stdTTL: 30 * 60, checkperiod: 10 * 60 });
console.log("Using redis to cache exams:", useCache);

// Postgres
if (process.env.NODE_ENV !== 'development') {
  pg.defaults.ssl = true;
}
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.use(fileUpload());
app.use('/img', express.static(path.join(__dirname, '/src/img')));

// File uploads
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let has_error = false;
  _.forEach(req.files, (file) => {
    const params = {
      Bucket: 'mavenform',
      Key: file.name,
      Body: file.data,
      ContentEncoding: file.encoding,
      ContentType: file.mimetype
    };
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        res.end();
        has_error = true;
      }
    });
  });

  if (!has_error) {
    res.send('Successfully uploaded files!');
    res.end();
  }
});

// Search substring in problems
app.get('/searchProblems/:query_str', function(req, res, next) {
  const query_str = req.params.query_str;
  const q = `select * from exams where problem like '%${query_str}%' or solution like '%${query_str}%'`;
  client.query({ text: q})
    .then((result) => {
      res.json(result.rows);
      res.end();
    });
});

// Search tags
app.get('/searchTags/:tag', function(req, res, next) {
  const query_tag = req.params.query_tag;
  const q = `select * from exams where tags like '%${query_tag}%'`;
  client.query({ text: q})
    .then((result) => {
      res.json(result.rows);
      res.end();
    });
});

// Retrieve exam contents
app.get('/getExam/:courseid/:examtype/:examid', function(req, res, next) {
  const courseid = req.params.courseid;
  const examtype = req.params.examtype;
  const examid = req.params.examid;

  console.log(courseid, examtype, examid);
  const q = `select problem_num, subproblem_num, problem, solution from exams where courseid = $1 and examtype = $2 and examid = $3`;
  client.query({ text: q, values: [courseid, examtype, examid]})
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
        const { problem_num, subproblem_num, problem, solution } = row;
        const key = `${problem_num}_${subproblem_num}`;
        result[key] = { problem, solution };
        return result;
      }, {});
      res.json({info, problems});
      res.end();
    });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port, () => console.log('Started server on port', port));
