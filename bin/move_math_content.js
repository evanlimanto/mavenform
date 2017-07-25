var _ = require('lodash');
var pg = require('pg');

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

const getq = `select content, solution, tag from math_content`;
const inq = `insert into content (problem_num, subproblem_num, problem, solution, topicid) values ($1, $2, $3, $4, $5)`;
client.query(getq, (err, result) => {
  _.forEach(result.rows, (row) => {
    client.query(inq, [1, 1, row.content, row.solution, row.tag], (err, result) => {
      console.log(result);
    });
  });
});
