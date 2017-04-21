var _ = require('lodash');
var pg = require('pg');
var fs = require('fs');
var yaml = require('js-yaml');

/*
create table exams (
	id serial primary key,
	courseid varchar(20) not null,
	examtype varchar(20) not null,
	examid varchar(20) not null,
	problem_num integer not null,
	subproblem_num integer not null,
	problem varchar,
	solution varchar
);
*/

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const prodConfig = {
  user: 'wywhntmgwgishp',
  database: 'd4de7agqe51r1g',
  password: '99d4da5f646a2df74a609eb8fdea8a6fe4f084b8bf8d5dd7c796d9e8f48f0a14',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

pg.defaults.ssl = false;
const Client = pg.Client;

const client = new Client(config);
client.connect();

const courseid = 'cs162';
const examtype = 'mt3';
const examid = 'fa16';

const delq = `delete from exams where courseid = $1 and examtype = $2 and examid = $3`;
client.query({text: delq, values: [courseid, examtype, examid]})
  .then((result) => {
    console.log(result)
  });

const contents = fs.readFileSync(`${examtype}-${examid}.yml`);
let doc = null;
try {
  doc = yaml.safeLoad(contents);
} catch (e) {
  console.log(e);
  process.exit(1);
}
const results = _.map(_.filter(_.keys(doc), function(k) {
  return k.match(/^q\d_\d$/);
}), (k) => [k, _.split(k.slice(1), "_")]);
_.forEach(results, (res) => {
  const problem_num = res[1][0];
  const subproblem_num = res[1][1];
  const problem = doc[res[0]];
  const solution = doc[`${res[0]}_s`];
  const q = `
insert into exams (courseid, examtype, examid, problem_num, subproblem_num, problem, solution)
values ($1, $2, $3, $4, $5, $6, $7)
  `;
  client.query(q, [courseid, examtype, examid, problem_num, subproblem_num, problem, solution], function (err, result) {
    console.log(err, result);
  });
});
