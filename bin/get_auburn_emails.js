const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const Browser = require('zombie');


/*
let params = _.shuffle(_.split(fs.readFileSync("first-names.txt"), '\n'));
const baseUrl = "http://peoplefinder.auburn.edu/peoplefinder/index.php";
params = ["Kevin"];
async.map(params, (param, outerCallback) => {
  request.post(baseUrl, {
    form: {
      gensearch: param,
      genname: 'fullName',
      submit: 'Search',
      person_role: 'Student',
    },
    jar: true
  }, (err, response, body) => {
    if (err) return outerCallback(err);
    const regexp = new RegExp(/<a href='(index\.php\?.*?)'>/, "g");
    const paths = [];
    while ((temp = regexp.exec(body)) != null) {
      paths.push("http://peoplefinder.auburn.edu/peoplefinder/" + temp[1]);
    }
    console.log(paths[0]);
    request.get(paths[0], {
      headers: {
        cookie: 'PHPSESSID=s4933piq699mndju8ocsltlfq6;',
        referer: 'http://peoplefinder.auburn.edu/peoplefinder/index.php',
      }
    }, (err, response, body) => {
      console.log(body);
    });
  });
}, (err, results) => {
  if (err) return console.error(err);
  console.log(results);
});*/
