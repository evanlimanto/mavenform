const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

//const params = _.take(_.shuffle(_.split(fs.readFileSync("first-names.txt"), '\r\n')), 2);
const baseUrl = "http://www.berkeley.edu/directory/results?search-term=";
const params = ["Xu", "Wu"];
async.map(params, (param, outerCallback) => {
  const url = baseUrl + param;
  request(url, (err, response, body) => {
    if (err) return outerCallback(err);
    const regexp = new RegExp(/<li><a href="\/directory(.*?)">(.*?)<\/a>/, "g");
    const paths = [];
    while ((temp = regexp.exec(body)) !== null) {
      if (temp[1].length > 0) {
        paths.push([temp[1], temp[2]]);
      }
    }
    return async.map(paths, (path, callback) => {
      const newUrl = "http://www.berkeley.edu/directory" + _.replace(path[0], " ", "%20");
      request(newUrl, (err, response, body) => {
        if (err) return callback(err);
        const innerRegexp = new RegExp(/<p><label>(.*?)<\/label><br\/>(.*?)<\/p>/, "g");
        const items = {};
        while ((temp = innerRegexp.exec(body)) !== null) {
          items[temp[1]] = temp[2];
          console.log(path[1], temp[1], temp[2]);
        }
        if (!_.has(items, "Title") && !_.has(items, "Address") && _.has(items, "Email") && _.has(items, "UID") && _.toInteger(items.UID) >= 1000000) {
          return callback(null, [(new RegExp(/<a href=".*?">(.*?)<\/a>/, "g")).exec(items.Email)[1], path[1]]);
        }
        return callback(null, null);
      });
    }, (err, results) => {
      return outerCallback(err, results);
    });
  });
}, (err, results) => {
  if (err) return console.error(err);
  return console.log(results);
});
