var _ = require('lodash');
var pg = require('pg');

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

const st = new Set();
const q = `select * from courses order by id`;
client.query(q, (err, result) => {
  _.forEach(result.rows, (row) => {
    const id = row.id;
    const val = _.toString(row.schoolid) + row.code_label;
    if (st.has(val)) {
      const q = `delete from courses where id = $1`;
      client.query(q, [id], (err, result) => {
        if (err) return console.error(err);
        return;
      });
    } else {
      st.add(val);
    }
  });
});
