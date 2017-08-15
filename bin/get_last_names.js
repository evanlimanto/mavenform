const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let params = _.shuffle(_.split(fs.readFileSync("first-names.txt"), '\n'));
const baseUrl = "http://directory.uci.edu/index.php?search_group=students&form_fname_filter=starts+with&form_lname=&form_lname_filter=starts+with&form_email=&form_email_filter=starts+with&form_ucinetid=&form_ucinetid_filter=starts+with&form_department=&form_department_filter=starts+with&form_phone=&advanced_submit=Search&form_type=advanced_search";
params = _.map(params, (param) => { return {param: param }});
params = ['kevin'];
const q = async.queue((task, callback) => {
  const url = baseUrl + "&form_fname=" + _.toLower(task.param);
  request(url, (err, response, body) => {
    if (err) {
      console.error(err);
      return callback();
    }
    const regexp = new RegExp(/<a href='\/index\.php\?uid=.*?'>(.*?)<\/a>/, "g");
    const lastnames = [];
    while ((temp = regexp.exec(body)) != null) {
      const namearr = _.split(temp[1], ' ');
      const lastname = _.takeRight(namearr, namearr.length - 1);
      _.forEach(lastname, (name) => console.log(name));
    }
    return callback();
  });
}, 10);

q.push(params, (err) => {
  if (err) console.error(err);
});

