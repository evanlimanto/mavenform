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
  user: 'wywhntmgwgishp',
  database: 'd4de7agqe51r1g',
  password: '99d4da5f646a2df74a609eb8fdea8a6fe4f084b8bf8d5dd7c796d9e8f48f0a14',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

const local_client = new pg.Client(config);
local_client.connect();

pg.defaults.ssl = true;
const prod_client = new pg.Client(prodConfig);
prod_client.connect();

const q4 = `select * from marketing_apps`;
const i4 = `insert into marketing_apps (name, email, school, essay1, essay2, resume) values ($1, $2, $3, $4, $5, $6)`;

const q5 = `select * from waitlist`;
const i5 = `insert into waitlist (email) values ($1)`;

const q6 = `select * from waitlist_courses`;
const i6 = `insert into waitlist_courses (email, courses) values ($1, $2)`;

const q7 = `select * from bookmarked_courses`;
const i7 = `insert into bookmarked_courses (userid, courseid) values ($1, $2)`;

const q8 = `select * from content_feedback`;
const i8 = `insert into content_feedback (content_id) values ($1)`;

async.parallel([
  (callback) => prod_client.query(q4, callback),
  (callback) => prod_client.query(q5, callback),
  (callback) => prod_client.query(q6, callback),
  (callback) => prod_client.query(q7, callback),
  (callback) => prod_client.query(q8, callback),
], (err, results) => {
  if (err) return console.error(err);
  const r4 = results[0];
  const r5 = results[1];
  const r6 = results[2];
  const r7 = results[3];
  const r8 = results[4];

  return async.parallel([
    (callback) => async.each(r4.rows, (row, innerCallback) => local_client.query(i4, [row.name, row.email, row.school, row.essay1, row.essay2, row.resume], innerCallback), callback),
    (callback) => async.each(r5.rows, (row, innerCallback) => local_client.query(i5, [row.email], innerCallback), callback),
    (callback) => async.each(r6.rows, (row, innerCallback) => local_client.query(i6, [row.email, row.courses], innerCallback), callback),
    (callback) => async.each(r7.rows, (row, innerCallback) => local_client.query(i7, [row.userid, row.courseid], innerCallback), callback),
    (callback) => async.each(r8.rows, (row, innerCallback) => local_client.query(i8, [row.content_id], innerCallback), callback),
  ], (err) => {
    if (err) return err;
    return;
  });
});


