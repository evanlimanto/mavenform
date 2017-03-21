'use strict';

const express = require('express');
const browserify = require('browserify');
const fs = require('fs');
const glob = require("glob");
const path = require('path');
const yaml = require("js-yaml");
const NodeCache = require("node-cache");
const _ = require('lodash')

const port = process.env.PORT || 8080;
const app = express();

const useCache = false && (process.env.NODE_ENV !== 'development');
const examCache = new NodeCache({ stdTTL: 30 * 60, checkperiod: 10 * 60 });

console.log("Using redis to cache exams:", useCache);

app.use('/img', express.static(path.join(__dirname, '/src/img')));

// Read Exam .yaml files from disk
app.get('/getExam/:course/:type/:exam', function(req, res, next) {
  const course = req.params.course;
  const type = req.params.type;
  const exam = req.params.exam;

  const examKey = `${course}/${type}/${exam}`;
  const cachedValue = examCache.get(examKey);
  var doc = null;
  var error = false;
  if (useCache && cachedValue !== undefined) {
    doc = cachedValue;
  } else {
    try {
      doc = fs.readFileSync(`src/exams/${course}/${type}-${exam}.yml`, "utf8");
      doc = yaml.safeLoad(doc);
      error = !examCache.set(examKey, doc);
    } catch(e) {
      console.log(e);
      error = true;
      res.status(404).send('Not found.');
    }
  }
  if (!error) {
    res.json(doc);
  }
  res.end();
});

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Started server on port ' + port));
