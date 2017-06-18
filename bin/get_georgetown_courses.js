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
  'http://courses.georgetown.edu/index.cfm?Action=List&ProgramID=11&AcademicYear=2017&AcademicTerm=FallSpring',
  'http://courses.georgetown.edu/index.cfm?Action=List&ProgramID=7&AcademicYear=2017&AcademicTerm=FallSpring',
  'http://courses.georgetown.edu/index.cfm?Action=List&ProgramID=52&AcademicYear=2017&AcademicTerm=FallSpring',
  'http://courses.georgetown.edu/index.cfm?Action=List&ProgramID=63&AcademicYear=2017&AcademicTerm=FallSpring',
  'http://courses.georgetown.edu/index.cfm?Action=List&ProgramID=63&AcademicYear=2017&AcademicTerm=FallSpring',
  'http://courses.georgetown.edu/index.cfm?Action=List&ProgramID=16&AcademicYear=2017&AcademicTerm=FallSpring',
];

const codes = [
  'CHEM',
  'BIOL',
  'MATH',
  'PHYS',
  'ECON',
  'COSC',
];

const subjects = [
  'chem',
  'bio',
  'math',
  'physics',
  'econ',
  'cs',
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
    const url = urls[i];
    request(url, (err, result, body) => {
      const regexp = new RegExp(">(" + code + ".*?)<", "g");
      while ((temp = regexp.exec(body)) !== null) {
        const code = temp[1];
        const inq = `insert into courses (code, schoolid, subjectid) values($1, 18, $2)`;
        client.query(inq, [code, dict[subject]], (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        });
      }
    });
  }
});
