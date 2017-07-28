const pg = require('pg');
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

const getids = `select id from exams_staging`;
const upq = `update exams_staging set id = $1 where id = $2`;
client.query(getids, (err, result) => {
  const ids = _.map(result.rows, (row) => _.toInteger(row.id)).sort((x, y) => _.toInteger(x) - _.toInteger(y));
  for (var i = 1; i <= ids.length; i++) {
    console.log(i, ids[i-1]);
    client.query(upq, [i, ids[i-1]], (err, result) => {
      console.log(err, result)
    });
  }
});
