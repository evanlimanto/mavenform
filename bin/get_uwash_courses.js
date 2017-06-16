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

const urls = [
  "https://www.washington.edu/students/crscat/cse.html",
  "https://www.washington.edu/students/crscat/econ.html",
  "https://www.washington.edu/students/crscat/math.html",
  "https://www.washington.edu/students/crscat/phys.html",
  "https://www.washington.edu/students/crscat/ee.html",
  "https://www.washington.edu/students/crscat/meche.html",
  "https://www.washington.edu/students/crscat/engr.html",
  "https://www.washington.edu/students/crscat/cheng.html"
];

const subjects = [
  'cse',
  'econ',
  'math',
  'physics',
  'ee',
  'mecheng',
  'engin',
  'chemeng',
];

const codes = [
  'CSE',
  'ECON',
  'MATH',
  'PHYS',
  'E E',
  'M E',
  'ENGR',
  'CHEM E',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});

  for (var i = 1; i < urls.length; i++) {
    const url = urls[i];
    const subject = subjects[i];
    const code = codes[i];
    console.log(url, subject, code);
    request(url, (err, response, body) => {
      const regex = new RegExp(code + " ([0-9]+)", "g");
      while ((match = regex.exec(body)) !== null) {
        const inq = `insert into courses (code, schoolid, subjectid) values ($1, 45, $2)`;
        client.query(inq, [match[0], dict[subject]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });
      }
      return;
    });
  }
});
