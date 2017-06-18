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
  'CPR E',
  'COM S',
  'C E',
  'CHEM',
  'CH E',
  'BIOL',
  'ECON',
  'ENGR',
  'E E',
  'M S E',
  'MATH',
  'M E',
  'PHYS',
  'STAT',
];

const subjects = [
  'compeng',
  'cs',
  'civeng',
  'chem',
  'chemeng',
  'bio',
  'econ',
  'engin',
  'ee',
  'matsci',
  'math',
  'mecheng',
  'physics',
  'stat'
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
    const url = 'http://catalog.iastate.edu/azcourses/' + _.toLower(_.join(_.split(code, ' '), '_'));
    request(url, (err, result, body) => {
      const regexp = new RegExp(">(" + _.join(_.split(code, ' '), '&#160;') + ".*?)(:|<)", "g");
      while ((temp = regexp.exec(body)) !== null) {
        const code = temp[1].replace(/&#160;/g, ' ');
        const inq = `insert into courses (code_label, schoolid, subjectid) values($1, 38, $2)`;
        client.query(inq, [code, dict[subject]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });
      }
    });
  }
});
