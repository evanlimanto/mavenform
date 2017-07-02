const _ = require('lodash');
const fs = require('fs');
const req = require('superagent');
const as = require('async');

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
as.map(params, (param, callback) => {
  const data = {"method": "network.filter_schools", "params": {"name": param } };
  const url = 'https://piazza.com/logic/api?method=network.filter_schools&aid=' + (new Date()).getTime().toString(36) + Math.round(Math.random() * 1679616).toString(36)
  return req.post(url)
    .send(data)
    .end((err, res) => {
      if (err) console.error(err);
      else {
        const resText = res.res.text;
        const json = JSON.parse(resText);
        const codes = _.map(json.result.list, (item) => [item.email, item.cnt]);
        console.log(param, codes);
        return callback(err, codes);
      }
    });
}, (err, results) => {
  if (err) console.error(err);
  return fs.writeFileSync('./piazza_schools.json', JSON.stringify(results), 'utf-8');
});
*/

/*
const phantom = require('phantom');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const obj = JSON.parse(fs.readFileSync('./piazza_schools.json', 'utf-8'));
const uniqueSchools = {};
_.forEach(obj, arr => _.forEach(arr, school => { uniqueSchools[school[0]] = school[1]; }));
let schools = _.map(uniqueSchools, (a, b) => [b, a]);
schools = schools.sort((a, b) => b[1] - a[1]);
schools = _.filter(schools, (school) => school[1] >= 50 && school[1] < 100);

as.map(schools, (item, callback) => {
  return (async (function() {
    const instance = await (phantom.create());
    const page = await (instance.createPage());
    await (page.on("onResourceRequested", function(requestData, networkRequest) {
      var match = requestData.url.match(/google|cloudfront|doubleclick|css|png|sliding/g);
      if (match != null) {
        console.log('Cancelled', requestData.url);
        if (networkRequest.abort) networkRequest.abort();
      } else {
        console.info('Requesting', requestData.url)
      }
      return;
    }));
    const status = await (page.open('https://piazza.com/' + item[0]));
    console.log(status);

    const classes = (await (page.evaluate(
      function filterClassSearch() {
        classResult = [];
        for (var x = 0; x < allClasses.length; x++) {
          var net = allClasses[x];
          if (classHave[net.cn + "_" + selectedTerm])
            continue;
          var name = net.cn + ": " + net.n;
          var toks = name.split(/\s/);
          if (!net.terms || !net.terms[selectedTerm] || !profExists(net.terms[selectedTerm])) continue;
          var obj = {name:name, org:net, terms:net.terms};
          classResult.push({ org: obj.org });
        }

        return { result: classResult, name: schoolName };
      } 
    )));
    await (instance.exit());
    return callback(null, classes);
  })())
}, (err, results) => {
  if (err) return console.error(err);
  else {
    return fs.writeFileSync('./piazza_courses3.json', JSON.stringify(results), 'utf-8');    
  }
});
*/

const json = JSON.parse(fs.readFileSync('./piazza_courses3.json', 'utf-8'));
let schoolItems = _.map(json, (school) => {
  if (!school)
    return null;
  const tot = _.reduce(school.result, (cur, obj) => {
    if (_.has(obj, 'org') && _.has(obj.org.terms, 'Summer 2017') && obj.org.terms['Summer 2017'].cnt >= 50) {
      cur.cnt += obj.org.terms['Summer 2017'].cnt;
      cur.courses.push({ code: obj.org.cn, cnt: obj.org.terms['Summer 2017'].cnt });
      return cur;
    }
    return cur;
  }, {cnt: 0, courses: []});
  tot.courses = tot.courses.sort((a, b) => b.cnt - a.cnt);
  return { name: school.name, cnt: tot.cnt, courses: tot.courses };
});
schoolItems = _.filter(schoolItems, (item) => item !== null && item.cnt > 0);
schoolItems = schoolItems.sort((a, b) => {
  return b.cnt - a.cnt
});
_.forEach(schoolItems, (school) => {
  _.forEach(school.courses, (course) => {
    console.log(school.name, school.cnt, course.code, course.cnt);
  });
});
//_.forEach(schoolItems, (school) => console.log(school.name, school.cnt, school.courses));

/*
let items = _.map(json, (school) => {
  if (!school)
    return null;
  return _.map(school.result, (obj) => {
    obj.schoolName = school.name;
    return obj;
  });
});
items = _.filter(_.flattenDeep(items), (item) => _.has(item, 'org') && _.has(item.org.terms, 'Summer 2017'));
items = items.sort((a, b) => {
  return b.org.terms['Summer 2017'].cnt - a.org.terms['Summer 2017'].cnt
});

function printItem(item) {
  console.log(item.schoolName, item.org.cn, item.org.terms['Summer 2017'].cnt); 
}
_.forEach(items, printItem);
*/
