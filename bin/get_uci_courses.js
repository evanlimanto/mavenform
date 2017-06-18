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

const baseUrl = 'http://catalogue.uci.edu/allcourses/';
const codes = [
  'compsci',
  'econ',
  'cse',
  'math',
  'stats',
  'physics',
  'eecs',
];

const subjects = [
  'cs',
  'econ',
  'cse',
  'math',
  'stat',
  'physics',
  'eecs',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});

  for (var i = 0; i < codes.length; i++) {
    const code = codes[i];
    const subject = subjects[i];
    const url = baseUrl + code;

    request(url, (err, response, body) => {
      const regex = new RegExp("(" + _.toUpper(subject) + " [0-9]+[A-Z]?)\.", "g"); 
      while ((temp = regex.exec(body)) !== null) {
        const code = temp[1];
        const inq = `insert into courses (code, schoolid, subjectid) values($1, 5, $2)`;
        client.query(inq, [code, dict[subject]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });
      }
    });
  }
});
