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

const getq = `select id, code_label from courses`;
client.query(getq, (err, result) => {
  if (err) return console.error(err);
  _.forEach(result.rows, (row) => {
    const id = row.id;
    const code = row.code_label;
    const uq = `update courses set code = $1 where id = $2`;
    client.query(uq, [_.join(_.split(code, ' '), ''), id], (err, result) => {
      if (err) return console.error(err);
      return console.log(result);
    });
  });
  return;
});
