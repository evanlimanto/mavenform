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

const q1 = `select * from math_content where tag >= 57`;
const q2 = `select * from math_topics where id >= 57`;
const i1 = `insert into math_content (id, content, solution, tag) values($1, $2, $3, $4)`;
const i2 = `insert into math_topics (id, topic, concept, code) values($1, $2, $3, $4)`;

async.parallel([
  (callback) => local_client.query(q1, callback),
  (callback) => local_client.query(q2, callback),
], (err, results) => {
  if (err) return console.error(err);
  const r1 = results[0];
  const r2 = results[1];

  return async.parallel([
    (callback) => {
      async.series([
        (outerCallback) => async.each(r2.rows, (row, callback) => prod_client.query(i2, [row.id, row.topic, row.concept, row.code], callback), outerCallback),
        (outerCallback) => async.each(r1.rows, (row, callback) => prod_client.query(i1, [row.id, row.content, row.solution, row.tag], callback), outerCallback),
      ], (err, results) => {
        if (err) return console.error(err);
        return process.exit(0);
      });
    }, 
  ], (err) => {
    if (err) return err;
    return process.exit(0);
  });
});
