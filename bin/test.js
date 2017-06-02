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

const Client = pg.Client;
const client = new Client(config);
client.connect();

const terms = ['sp', 'su', 'fa'];
const termLabels = ['Spring', 'Summer', 'Fall'];

_.map(_.range(0, 21), (year) => {
  _.map(termLabels, (label, i) => {
    let code = terms[i];
    let yearString = _.toString(year);
    if (year < 10) yearString = "0" + yearString;
    code = code + yearString;
    const q = `insert into terms (term_code, term_label) values($1, $2)`;
    client.query(q, [code, label + " " + yearString], function(err, res) {
      if (err) console.error(err);
      else console.log(res);
    });
  });
});
