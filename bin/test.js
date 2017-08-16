const pg = require("pg");
const async = require("async");
const _ = require("lodash");
const req = require("superagent");

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const ids = [9214, 8395]
const getq = `
  select D.id as id, D.content as content, users.nickname as nickname,
    D.datetime as datetime, D.parentid as parentid,
    D.upvotes as upvotes, D.deleted as deleted from discussion D
  inner join users on D.userid = users.id
  where contentid in (${_.join(ids, ', ')})
`;

const client = new pg.Client(config);
client.connect();

client.query(getq, (err, result) => {
  if (err) return console.error(err);
  console.log(result.rows);
});
