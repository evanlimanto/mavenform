const _ = require('lodash');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const API_KEY = '9ed4d3400a4a61b31f02d2e5cdfe4364'

const APP_ID = 'NPJP92R96D'
const SEARCH_API_KEY = '22cd6e2a19445d1444df8fb7a3d00f52'
const algolia = require('algoliasearch')(APP_ID, API_KEY);
const index = algolia.initIndex('courses');

const q = `
  select courses.code, courses.name as course_name, schools.name as school_name, subjects.subject_label from courses
  inner join schools on courses.schoolid = schools.id
  inner join subjects on courses.subjectid = subjects.id
`;

/*
client.query(q, [], (err, result) => {
  _.forEach(result.rows, (row) => {
    const { code, course_name, school_name, subject_label } = row; 
    index.addObject({
      code: code,
      course_name: course_name,
      school_name: school_name,
    }, (err, content) => {
      if (err) console.error(err); 
      else console.log(content);
    });
  });
});
*/

index.search('berkeley', (err, content) => {
  console.log(content);
  _.forEach(content.hits, (hit) => {
    console.log(hit._highlightResult);
  });
})
