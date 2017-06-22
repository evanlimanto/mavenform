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
  'Bi',
  'ChE',
  'Ch',
  'CE',
  'CS',
  'Ec',
  'EE',
  'E',
  'MS',
  'Ma',
  'ME',
  'Ph',
];

const subjects = [
  'bio',
  'chemeng',
  'chem',
  'civeng',
  'cs',
  'econ',
  'ee',
  'engin',
  'mse',
  'math',
  'mecheng',
  'physics',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});
  
  for (var i = 0; i < courses.length; i++) {
    const course = courses[i];
    const subject = subjects[i];

    const url = 'https://catalog.caltech.edu/current/' + course;
    request(url, (err, response, body) => {
      const regexp = new RegExp("<strong>(" + course + ".*?)\\.", 'g');
      while ((temp = regexp.exec(body)) !== null) {
        const code = temp[1];
        const inq = `insert into courses (code_label, code, schoolid, subjectid) values($1, $2, 9, $3)`;
        client.query(inq, [_.join(_.split(code, ' '), ''), code, dict[subject]], (err, result) => {
          if (err) return console.error(err);
          console.log(result);
        });
      }
    });
  }
});
