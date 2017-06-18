const pg = require('pg');
const _ = require('lodash');
const request = require('request');
const cheerio = require('cheerio');

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

const codes = [
  'COM+SCI',
  'ECON',
  'EL+ENGR',
  'MATH',
  'PHYSICS',
  'CH+ENGR',
  'MAT+SCI',
  'ENGR',
];

const subjects = [
  'cs',
  'econ',
  'ee',
  'math',
  'physics',
  'chemeng',
  'matsci',
  'engin',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});
 
  for (var i = 1; i < codes.length; i++) {
    const url = "http://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=" + codes[i] + "&funsel=3";
    const code = codes[i];
    const subject = subjects[i];
    request(url, (err, response, body) => {
      const regexp = new RegExp('<h3>([0-9A-Z]+)\.', 'g');
      while ((temp = regexp.exec(body)) !== null) {
        const realCode = _.join(_.split(code, '+'), ' ') + ' ' + temp[1];
        const inq = `insert into courses (code, schoolid, subjectid) values ($1, 3, $2)`;
        client.query(inq, [realCode, dict[subject]], (err, result) => {
          if (err) return console.error(err);
          else console.log(result);
        });
      }
    });
  }
});
