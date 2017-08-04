const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

function denc( str )
{
if (str == "&nbsp;")
  return "&nbsp;";

var tpyrcne = '16;35&4829#07';
var fixed = '&#;0987654321';	
var decoded = ''; 

for (i=0; i<str.length; i++) {
	decoded += tpyrcne.charAt(fixed.indexOf(str.charAt(i)))
}
return decoded;

}

let params = _.shuffle(_.split(fs.readFileSync("first-names.txt"), '\n'));
const baseUrl = "http://directory.uci.edu/index.php?search_group=students&form_fname_filter=starts+with&form_lname=&form_lname_filter=starts+with&form_email=&form_email_filter=starts+with&form_ucinetid=&form_ucinetid_filter=starts+with&form_department=&form_department_filter=starts+with&form_phone=&advanced_submit=Search&form_type=advanced_search";
params = ["kevin"];
/*const data = fs.readFileSync("test.html");
const items = _.split(data, "\n");
console.log(denc(items[0]));*/
async.map(params, (param, outerCallback) => {
  const url = baseUrl + "&form_fname=" + param;
  request(url, (err, response, body) => {
    if (err) return outerCallback(err);
    const regexp = new RegExp(/denc\('(.*?)',1\)/, "g");
    console.log(body);
    fs.writeFileSync('test.html', body);
    while ((temp = regexp.exec(body)) != null) {
      console.log(temp[1]);
    }
  });
}, (err, results) => {
  if (err) return console.error(err);
});
