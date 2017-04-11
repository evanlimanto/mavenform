'use strict';

const express = require('express');
const browserify = require('browserify');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const NodeCache = require('node-cache');
const pg = require('pg');
const sm = require('sitemap');
const _ = require('lodash');

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

app.use('/img', express.static(path.join(__dirname, '/src/img')));

app.get('/getExam/:courseid/:examtype/:examid', function(req, res, next) {
  const courseid = req.params.courseid;
  const examtype = req.params.examtype;
  const examid = req.params.examid;

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
        const problem_num = row.problem_num;
        const subproblem_num = row.subproblem_num;
        const key = `${problem_num}_${subproblem_num}`;
        result[key] = {problem: row.problem, solution: row.solution};
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

//app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Started server on port ' + port));
