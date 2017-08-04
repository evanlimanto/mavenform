const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let params = _.take(_.shuffle(_.split(fs.readFileSync("first-names.txt"), '\n')), 10);
const baseUrl = "http://directory.uci.edu/index.php?search_group=students&form_fname_filter=starts+with&form_lname=&form_lname_filter=starts+with&form_email=&form_email_filter=starts+with&form_ucinetid=&form_ucinetid_filter=starts+with&form_department=&form_department_filter=starts+with&form_phone=&advanced_submit=Search&form_type=advanced_search";
async.map(params, (param, outerCallback) => {
  const url = baseUrl + "&form_fname=" + param;
  request(url, (err, response, body) => {
    if (err) return outerCallback(err);
    body = body.replace('onload="load();"', '');
    body = (new JSDOM(body, { runScripts: "dangerously" })).serialize();
    const regexp = new RegExp(/mailto:(.*?)"/, "g");
    const emails = [];
    while ((temp = regexp.exec(body)) != null) {
      console.log(temp[1]);
      emails.push([param, temp[1]]);
    }
    return outerCallback(null, emails);
  });
}, (err, results) => {
  console.log("done");
  const res = _.flatten(results);
  console.log(res.length);
  return fs.writeFileSync("uci_emails.json", JSON.stringify(res, null, '\t'));
});
