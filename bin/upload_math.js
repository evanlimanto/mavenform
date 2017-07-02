const pg = require('pg');
const fs = require('fs');
const _ = require('lodash');

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

const content = fs.readFileSync('math.txt');
const arr = _.split(content, '\n');

const problems = {};
const solutions = {};
const codes = {};

var i = 0;
while (i < arr.length) {
  var j = i;
  while (j + 1 < arr.length && arr[j + 1].length > 0) {
    j++;
  }

  let cur = [];
  for (var k = i + 1; k <= j; k++) {
    cur.push(arr[k]);
  }
  const prob = _.toInteger(_.split(arr[i], '.')[0]);
  const curstr = _.join(cur, '<hr class="s1" />');
  console.log(prob, cur);

  const code = arr[i];
  if (_.endsWith(code, 's')) {
    solutions[code.slice(0, code.length - 1)] = curstr;
  } else {
    codes[code] = prob;
    problems[code] = curstr;
  }

  i = j + 2;
}

_.forEach(_.keys(problems), (key) => {
  const inq = `insert into math_content (content, solution, tag) values($1, $2, $3)`;
  //key, problems[key], solutions[key];
  client.query(inq, [problems[key], solutions[key], codes[key]], (err, result) => {
    if (err) return console.error(err);
    else return console.log(result);
  });
})
