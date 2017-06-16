const fs = require('fs');
const async = require('async');
const _ = require('lodash');
const pg = require('pg');

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const client = new pg.Client(config);
client.connect();

const json = _.map(JSON.parse(fs.readFileSync('./courses/cornell_courses.json')), (item) => {
  const ret = item[1];
  const sub = _.toLower(_.split(ret, ' ')[0]);
  const rem = _.last(_.split(ret, ' ')); 
  if (sub === 'compsci') {
    return 'CS ' + rem;
  } else if (sub === 'el') {
    return 'EE ' + rem;
  } else if (sub === 'bio') {
    return 'BIOENG ' + rem;
  } else if (sub === 'civ') {
    return 'CIVENG ' + rem;
  } else if (sub === 'ind') {
    return 'INDENG ' + rem;
  } else if (sub === 'mec') {
    return 'MECHENG ' + rem;
  } else if (sub === 'nuc') {
    return 'NUC ' + rem;
  } else if (sub === 'stat') {
    return 'STAT ' + rem;
  } else if (sub === 'chm' || sub == 'cheme') {
    return 'CHEMENG ' + rem;
  } else if (sub === 'phys') {
    return 'PHYSICS ' + rem;
  }
  return ret;
});

//_.forEach(_.uniqBy(_.map(json, (course) => _.split(course, ' ')[0]), (item) => item), (a) => console.log(a));

const q = `select id, subject_code from subjects`;
client.query(q, (err, result) => {
  const dict = _.reduce(result.rows, (res, row) => {
    res[row.subject_code] = row.id;
    return res;
  }, {});

  async.each(json, (item, callback) => {
    const getq = `select 1 from courses where code = $1`;
    const subject = _.toLower(_.split(item, ' ')[0]);
    if (subject in dict) {
      console.log(subject);
      item = _.toLower(_.join(_.split(item, ' '), ''));
      client.query(getq, [item], (err, result) => {
        if (err) return callback(err);
        if (result.rowCount === 0) {
          const inq = `insert into courses (code, schoolid, subjectid) values($1, 10, $2)`;
          client.query(inq, [item, dict[subject]], (err, result) => {
            if (err) return callback(err);
            return callback(null);
          });
        } else {
          return callback(null);
        }
      });
    } else {
      return callback(null);
    }
  }, (err) => {
    if (err) console.error(err);
    return;
  });
});
