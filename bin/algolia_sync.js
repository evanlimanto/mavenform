function courseCodeToLabel(course_code) {
  if (!course_code)
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
  const numberRegexp = new RegExp('\\d+');
  const letterRegexp = new RegExp('[a-zA-Z]+');
  const numberMatch = numberRegexp.exec(courseCode);
  const letterMatch = letterRegexp.exec(courseCode);
  return [numberMatch ? numberMatch[0] : "", letterMatch ? letterMatch[0] : ""];
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

const q = `
  select courses.id, courses.code as code, courses.code_label as code_label, courses.label as label, schools.code as school_code, schools.name as school_name, subjects.subject_label as subject_label from courses
  inner join schools on courses.schoolid = schools.id
  inner join subjects on courses.subjectid = subjects.id
  where exists (select 1 from exams where exams.courseid = courses.id)
`;

client.query(q, (err, result) => {
  _.forEach(result.rows, (row) => {
    let item = {
      objectID: row.id,
      code: row.code,
      label: row.label,
      code_label: row.code_label,
      school_code: row.school_code,
      school_name: row.school_name,
      subject_label: row.subject_label,
    };
    const code = getCourseNumber(_.takeRight(_.split(item.code_label, ' ')));
    item.number = code[0];
    item.letter = code[1];
    item.subject = _.join(_.dropRight(_.split(item.code_label, ' ')), ' ');
    console.log(item);
    index.partialUpdateObject(item, (err, content) => {
      if (err) return console.error(err);
      else console.log(content);
    });
  });
  return;
});
