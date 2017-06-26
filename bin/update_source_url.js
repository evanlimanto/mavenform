const pg = require('pg');
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

// https://storage.googleapis.com/studyform/ucberkeley/pdf/ee16a/mt1-fa16-soln.pdf
