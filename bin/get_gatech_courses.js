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
  "http://www.catalog.gatech.edu/coursesaz/cs/",
];

const subjects = [
  "cs",
];

const codes = [
  'cs',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});

  for (var i = 0; i < urls.length; i++) {
    const url = urls[i];
    const subject = subjects[i];
    const code = codes[i];
    request(url, (err, response, body) => {
      const regex = new RegExp("(" + _.toUpper(subject) + " [0-9]+[A-Z]?)\.", "g");
      while ((temp = regex.exec(body)) !== null) {
        const item = temp[1];
        const inq = `insert into courses (code, schoolid, subjectid) values ($1, 61, $2)`;
        client.query(inq, [item, dict[code]], (err, result) => {
          if (err) return console.error(err);
          else return console.log(result);
        });
      }
    });
  }
});
