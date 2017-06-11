function courseCodeToLabel(course_code) {
  if (!!!course_code)
    return null;

  let idx = -1;
  for (var i = 0; i < course_code.length; i++) {
    if (course_code[i] >= '0' && course_code[i] <= '9') {
      idx = i;
      break;
    }
  }
  course_code = _.toUpper(course_code);
  if (idx !== -1) {
    course_code = course_code.slice(0, idx) + " " + course_code.slice(idx, course_code.length);
  }
  return course_code;
}

function getCourseNumber(courseCode) {
  const item = _.split(courseCode, ' ')[1];
  let idx = item.length;
  for (var i = 0; i < item.length; i++) {
    if (!(item[i] >= '0' && item[i] <= '9')) {
      idx = i;
      break;
    }
  }
  let ret = [];
  ret.push(_.toInteger(item.slice(0, idx))); // get integer part
  ret.push(item.slice(idx, item.length)); // get letters part
  return ret;
}

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const _ = require('lodash');
const APP_ID = 'NPJP92R96D'
const API_KEY = '9ed4d3400a4a61b31f02d2e5cdfe4364'
const algolia = require('algoliasearch')(APP_ID, API_KEY);
const index = algolia.initIndex('courses');
const pg = require('pg');
const client = new pg.Client(config);
client.connect();

index.clearIndex();

const q = `
  select courses.id, courses.code as code, courses.name as name, schools.code as school_code, schools.name as school_name from courses
  inner join schools on courses.schoolid = schools.id
`;

client.query(q, (err, result) => {
  _.forEach(result.rows, (row) => {
    let item = {
      objectID: row.id,
      code: courseCodeToLabel(row.code),
      name: row.name,
      school_code: row.school_code,
      school_name: row.school_name,
    };
    const code = getCourseNumber(item.code);
    item.number = code[0];
    item.letter = code[1];
    item.subject = _.split(item.code, ' ')[0]
    console.log(item);
    index.saveObject(item, (err, content) => {
      if (err) return console.error(err);
      else console.log(content);
    });
  });
});
