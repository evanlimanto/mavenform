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
  "http://catalog.purdue.edu/preview_entity.php?catoid=8&ent_oid=2401",
  "http://catalog.purdue.edu/preview_entity.php?catoid=8&ent_oid=2437",
  "http://catalog.purdue.edu/preview_entity.php?catoid=8&ent_oid=2399",
  "http://catalog.purdue.edu/preview_entity.php?catoid=8&ent_oid=2406",
  "http://catalog.purdue.edu/preview_entity.php?catoid=8&ent_oid=2403",
];

const codes = [
  'ECE',
  'CE',
  'CHE',
  'ME',
  'IE',
];

const subjects = [
  'ece',
  'civeng',
  'chemeng',
  'mecheng',
  'indeng',
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});

  for (var i = 0; i < codes.length; i++) {
    if (i === 0) break;
    const code = codes[i];
    const subject = subjects[i];
    const url = urls[i];
    request(url, (err, result, body) => {
      const regexp = new RegExp(">(" + code + " [0-9]+) ", "g");
      while ((temp = regexp.exec(body)) !== null) {
        console.log(temp[1]);
        /*const inq = `insert into courses (code, schoolid, subjectid) values($1, 39, $2)`;
        client.query(inq, [code, dict[subject]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });*/
      }
    });
  }
});
