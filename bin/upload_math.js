const pg = require('pg');
const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');

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

const content = fs.readFileSync('math.yml');
const doc = yaml.safeLoad(content);
const kk = _.filter(_.keys(doc), (key) => !_.endsWith(key, "_s"));

const inq = `insert into math_content (content, solution, tag) values ($1, $2, $3)`;

_.forEach(kk, (key) => {
  const skey = key + "_s";
  const content = doc[key];
  const soln = doc[skey];
  client.query(inq, [content, soln, 14], (err, result) => {
    if (err) return console.error(err);
    else return console.log(result);
  });
});
