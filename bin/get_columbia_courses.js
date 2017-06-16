const _ = require('lodash');
const cheerio = require('cheerio');
const request = require('request');
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

const urls = [
  "http://www.columbia.edu/cu/bulletin/uwb/sel/COMS_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/ELEN_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/ENGI_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/ECON_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/MATH_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/PHYS_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/STAT_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/CHEM_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/MECE_Fall2017.html",
  "http://www.columbia.edu/cu/bulletin/uwb/sel/CHEN_Fall2017.html",
];

const codes = [
  'cs',
  'ee',
  'engin',
  'econ',
  'math',
  'physics',
  'stat',
  'chem',
  'mecheng',
  'chemeng',
];

const labels = [
  'Computer Science',
  'Electrical Engineering',
  'Engineering',
  'Economics',
  'Mathematics',
  'Physics',
  'Statistics',
  'Chemistry',
  'Mechanical Engineering',
  'Chemical Engineering',
];

// 15

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});
  for (var i = 0; i < 10; i++) {
    const url = urls[i];
    const subject = codes[i];
    const label = labels[i];
    const expr = new RegExp("Fall 2017 " + label + " (.*?)<br>", "g");
    request(url, (err, response, body) => {
      const inq = `insert into courses (code, schoolid, subjectid) values ($1, 15, $2)`;
      while ((temp = expr.exec(body)) !== null) {
        const code = temp[1];
        client.query(inq, [code, dict[subject]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });
      }
    });
  }
});
