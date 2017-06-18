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

const getq = `select id, code from courses where id <= 2474`;
client.query(getq, (err, result) => {
  if (err) return console.error(err);
  _.forEach(result.rows, (row) => {
    const id = row.id;
    const code = row.code;
    const uq = `update courses set code = $1 where id = $2`;
    client.query(uq, [_.toUpper(code), id], (err, result) => {
      if (err) return console.error(err);
    });
  });
});
