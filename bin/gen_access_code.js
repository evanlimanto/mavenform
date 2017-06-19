const pg = require('pg');
const _ = require('lodash');
const randomstring = require('randomstring');

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

const q = `select id from courses`;
client.query(q, (err, result) => {
  const ids = _.map(result.rows, (row) => row.id);
  _.forEach(ids, (id) => {
    const uq = `update courses set access_code = $1 where id = $2`;
    client.query(uq, [randomstring.generate(5), id], (err, result) => {
      if (err) return console.error(err);
      return console.log(result);
    });
  });
});
