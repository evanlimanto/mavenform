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
  'biol',
  'chem',
  'csci',
  'econ',
  'math',
  'phys',
  'stat',
];

const subjects = [
  'bio',
  'chem',
  'cs',
  'econ',
  'math',
  'physics',
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
    const url = 'http://registrar.indiana.edu/browser/soc4178/' + _.toUpper(code) + '/index.shtml';
    request(url, (err, response, body) => {
      const regex = new RegExp("(" + _.toUpper(code) + ".[A-Z] [0-9]+)", "g");
      while ((temp = regex.exec(body)) !== null) {
        const item = temp[1];
        const inq = `insert into courses (code, code_label, schoolid, subjectid) values ($1, $2, 35, $3)`;
        client.query(inq, [_.join(_.split(code, ' ')), item, dict[code]], (err, result) => {
          if (err) return console.error(err);
          else return console.log(result);
        });
      }
    });
  }
});
