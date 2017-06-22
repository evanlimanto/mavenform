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

const base = 'http://catalog.tamu.edu/undergraduate/course-descriptions/';
const codes = [
  'econ',
  'math',
  'phys',
  'ecen',
  'biol',
  'csce',
  'chen',
  'engr',
  'msen',
  'stat'
];

const subjects = [
  'econ',
  'math',
  'physics',
  'ece',
  'bio',
  'cse',
  'chemeng',
  'engin',
  'mse',
  'stat',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});

  for (var i = 0; i < codes.length; i++) {
    const subject = subjects[i];
    const code = codes[i];
    const url = base + code;
    request(url, (err, response, body) => {
      const regex = new RegExp("(" + _.toUpper(code) + " [0-9]+[A-Z]?)", "g");
      while ((temp = regex.exec(body)) !== null) {
        const item = temp[1];
        const inq = `insert into courses (code, code_label, schoolid, subjectid) values ($1, $2, 27, $3)`;
        client.query(inq, [_.join(_.split(item, ' ')), item, dict[subject]], (err, result) => {
          if (err) return console.error(err);
          else return console.log(result);
        });
      }
    });
  }
});
