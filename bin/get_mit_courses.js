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

const courses = [
  'civeng',
  'mecheng',
  'matsci',
  'chem',
  'eecs',
  'bio',
  'physics',
  'chemeng',
  'econ',
  'math',
];

const numbers = [
  1,
  2,
  3,
  5,
  6,
  7,
  8,
  10,
  14,
  18
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});
  
  for (var i = 0; i < courses.length; i++) {
    const course = courses[i];
    const number = numbers[i];
    const url = "http://student.mit.edu/catalog/m" + number + "a.html";

    request(url, (err, response, body) => {
      const regexp = new RegExp("<h3>(.*?) ", "g");
      while ((temp = regexp.exec(body)) !== null) {
        const code = temp[1];
        const inq = `insert into courses (code, schoolid, subjectid) values($1, 24, $2)`;
        client.query(inq, [code, dict[course]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });
      }
    });
  }
});
