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
  "http://www.catalog.gatech.edu/coursesaz/econ/",
  "http://www.catalog.gatech.edu/coursesaz/ece/",
  "http://www.catalog.gatech.edu/coursesaz/math/",
  "http://www.catalog.gatech.edu/coursesaz/phys/",
  "http://www.catalog.gatech.edu/coursesaz/me/",
  "http://www.catalog.gatech.edu/coursesaz/chem/",
];

const subjects = [
  "cs",
  "econ",
  "ece",
  "math",
  "phys",
  "me",
  "chem",
];

const getq = `select id, subject_code from subjects`;
client.query(getq, (err, result) => {
  const dict = _.reduce(result.rows, (d, row) => {
    d[row.subject_code] = row.id;
    return d;
  }, {});
 
