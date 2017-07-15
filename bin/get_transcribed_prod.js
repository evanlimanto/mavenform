const async = require('async');
const pg = require('pg');
const _ = require('lodash');

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const prodConfig = {
  user: 'isrpjtdgvvipsw',
  database: 'd8dard1pmcrhp5',
  password: 'f7f3bde3c69375748921280793854cbd319fe1d9fe7c847bcc29eb012f2b94ab',
  port: 5432,
  host: 'ec2-107-20-195-181.compute-1.amazonaws.com',
};

const local_client = new pg.Client(config);
local_client.connect();

pg.defaults.ssl = true;
const prod_client = new pg.Client(prodConfig);
prod_client.connect();

const q1 = `select * from content_staging where exam > 163`;
const q2 = `select * from exams_staging where id > 163`;
const q3 = `select * from images_staging where examid > 163`;
const i1 = `insert into content_staging (id, problem_num, subproblem_num, problem, solution, exam, choices) values ($1, $2, $3, $4, $5, $6, $7)`;
const i2 = `insert into exams_staging (id, courseid, examtype, examid, profs, schoolid, datetime, source_url) values ($1, $2, $3, $4, $5, $6, $7, $8)`;
const i3 = `insert into images_staging (id, examid, url) values ($1, $2, $3)`;

async.parallel([
  (callback) => prod_client.query(q1, callback),
  (callback) => prod_client.query(q2, callback),
  (callback) => prod_client.query(q3, callback),
], (err, results) => {
  if (err) return console.error(err);
  const r1 = results[0];
  const r2 = results[1];
  const r3 = results[2];

  return async.parallel([
    (callback) => {
      async.series([
        (outerCallback) => async.each(r2.rows, (row, callback) => local_client.query(i2, [row.id, row.courseid, row.examtype, row.examid, row.profs, row.schoolid, row.datetime, row.source_url], callback), outerCallback),
        (outerCallback) => async.each(r1.rows, (row, callback) => local_client.query(i1, [row.id, row.problem_num, row.subproblem_num, row.problem, row.solution, row.exam, row.choices], callback), outerCallback),
        (outerCallback) => async.each(r3.rows, (row, callback) => local_client.query(i3, [row.id, row.examid, row.url], callback), outerCallback),
      ], (err, results) => {
        if (err) return console.error(err);
        return process.exit(0);
      });
    }, 
  ], (err) => {
    if (err) return err; 
  });
});


