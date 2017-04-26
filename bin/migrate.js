var _ = require('lodash'); var pg = require('pg');
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

const type = 2;

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const stagingConfig = {
  user: 'qrykorzlcooyev',
  database: 'd5956a3il3svmp',
  password: 'a98b8a5c9c43e32cf55e8a2a29f639f5f65751b580a26300b26ccb5d815aea13',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

const prodConfig = {
  user: 'wywhntmgwgishp',
  database: 'd4de7agqe51r1g',
  password: '99d4da5f646a2df74a609eb8fdea8a6fe4f084b8bf8d5dd7c796d9e8f48f0a14',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

if (type === 2 || type === 3) {
  pg.defaults.ssl = true;
}
const Client = pg.Client;

let client = null;
if (type === 1) {
  client = new Client(config);
} else if (type === 2) {
  client = new Client(stagingConfig);
} else if (type === 3) {
  client = new Client(prodConfig);
}
client.connect();

const courseid = 'ugba10';
const examtype = 'marketing';
const examid = 'sp11';

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
  return k.match(/^q\d+_\d$/);
}), (k) => [k, _.split(k.slice(1), "_")]);

let counter = 0;
_.forEach(results, (res) => {
  const problem_num = res[1][0];
  const subproblem_num = res[1][1];
  const problem = doc[res[0]];
  const solution = doc[`${res[0]}_s`];
  const choices = _.has(doc, `${res[0]}_i`) ? _.join(doc[`${res[0]}_i`], '~') : null;
  const q = `
insert into exams (courseid, examtype, examid, problem_num, subproblem_num, problem, solution, choices)
values ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  counter++;
  client.query(q, [courseid, examtype, examid, problem_num, subproblem_num, problem, solution, choices], function (err, result) {
    console.log("Query #", counter);
    console.log(err, result);
  });
});
