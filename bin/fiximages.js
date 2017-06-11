const pg = require('pg');
const async = require('async');
const request = require('request');
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

const q = `select problem, solution from content where problem like '%googleapi%' or solution like '%googleapi%'`;

client.query(q, (err, result) => {
  _.forEach(result.rows, (row) => {
    const problem = row.problem;
    const solution = row.solution;
    const regex = /https.*?\.png/g
    const matches = problem.match(regex);
    const matchesS = solution ? solution.match(regex) : null;
    async.parallel([
      (callback) => {
        async.map(matches, (match, innerCallback) => {
          request(match, (err, res, body) => {
            if (err) return innerCallback(err);
            if (res.statusCode === 404) {
              innerCallback(err, match);
            }
          });
        }, callback);
      },
      (callback) => {
        if (matchesS) {
           async.map(matchesS, (match, innerCallback) => {
            request(match, (err, res, body) => {
              if (err) return innerCallback(err);
              if (res.statusCode === 404) {
                innerCallback(err, match);
              }
            });
          }, callback);
        }
      }
    ], (err, results) => {
      if (err) console.error(err);
      else console.log(results);
    });
  });
});
