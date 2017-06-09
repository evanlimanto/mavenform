const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const crawler = require('node-webcrawler');
const request = require('request');

/*
let letters = [];
let params = [];

function dfs(depth, str) {
  if (depth > 0) {
    params.push(str);
  }

  _.each(letters, (letter) => {
    if (depth + 1 <= 2)
      dfs(depth + 1, str + letter);
  });
}

_.each(_.range(0, 26), (index) => {
  const charCode = index + 97; 
  letters.push(String.fromCharCode(charCode));
});

dfs(0, "");

async.map(params, (param, callback) => {
  request('https://www.coursehero.com/ajax/autocomplete_resultset.php?term=' + param + '&type=school', (err, response, body) => {
    if (body !== '[{"label":"No results found","id":-1}]')
      callback(err, JSON.parse(body));
  });
}, (err, results) => {
  if (err) console.error(err);
  else {
    fs.writeFileSync('./coursehero_schools.json', JSON.stringify(_.flattenDeep(results)), 'utf-8');
  }
});
*/
const schoolSet = new Set();
let schools = _.filter(JSON.parse(fs.readFileSync('./coursehero_schools.json', 'utf-8')), (school) => school.document_count > 0 && school.country === 'United States');
schools = _.sortBy(schools, (a) => {
  return -_.toInteger(a.document_count);
});
schools = _.filter(schools, (school) => {
  if (schoolSet.has(school.id))
    return false;
  schoolSet.add(school.id);
  return true;
});
schools = [{id: 234, label: 'Berkeley'}];

const c = new crawler();
async.map(schools, (school, callback) => {
  const url = `https://www.coursehero.com/sitemap/schools/${school.id}-${_.join(_.split(school.label, ' '), '-')}`;
  c.queue([{
    uri: url,
    callback: (err, result, $) => {
      const items = $('.sl_courseSeal_info').parent().find('a:nth-child(1)');
      _.each(_.values(items), (item) => {
        if (_.has(item, 'attribs') && item.attribs.href) {
          const courseUrl = url + item.attribs.href;
          c.queue([{
            uri: courseUrl,
            callback: (err, result, $) => {
              const courseItems = $('.dl_courseSeal_info').parent().find('a:nth-child(1)');
              const verifiedCourses = _.map(courseItems, (courseItem) => courseItem.children[0].data);
              console.log(verifiedCourses);
            }
          }]);
        }
      });
    }
  }]);
});
