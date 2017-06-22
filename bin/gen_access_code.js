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

const inq = `insert into access_codes (code, used) values ($1, false)`;
_.forEach(_.range(0, 1000), (item) => {
  client.query(inq, [randomstring.generate(5)], (err, result) => {
    if (err) return console.error(err);
    return console.log(result);
  });
});
