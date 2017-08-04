const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

const options = {
  headers: {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
    'Referer': 'http://www.berkeley.edu/directory/results?search-term='
  }
};
let params = _.shuffle(_.split(fs.readFileSync("first-names.txt"), '\n'));
const baseUrl = "http://www.berkeley.edu/directory/results?search-term=";
params = ["Kevin"];
async.map(params, (param, outerCallback) => {
  const url = baseUrl + _.upperFirst(_.toLower(param));
  console.log(url);
  request(url, options, (err, response, body) => {
    if (err) return outerCallback(err);
    console.log(response);
    const regexp = new RegExp(/<li><a href="\/directory(.*?)">(.*?)<\/a>/, "g");
    const paths = [];
    while ((temp = regexp.exec(body)) !== null) {
      if (temp[1].length > 0) {
        paths.push([temp[1], temp[2]]);
      }
    }
    return async.map(paths, (path, callback) => {
      const newUrl = "http://www.berkeley.edu/directory" + _.replace(path[0], " ", "%20");
      request(newUrl, options, (err, response, body) => {
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
  const res = _.filter(_.flatten(results), (a) => a);
  console.log(res.length);
  fs.writeFileSync('./berkeley_emails.json', JSON.stringify(res, null, '\t'));
});
