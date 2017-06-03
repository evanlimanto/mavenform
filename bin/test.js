const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const _ = require('lodash');
_.map(_.range(11, 18), (year) => {
  const q = `insert into terms (term_code, term_label) values($1, $2)`;
  client.query(q, ['wi' + _.toString(year), 'Winter ' + _.toString(year)]);
});
