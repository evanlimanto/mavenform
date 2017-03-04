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

app.use('/img', express.static('./src/img'));
app.use(express.static('./build'));

const useCache = false;
const examCache = new NodeCache({ stdTTL: 30 * 60, checkperiod: 10 * 60 });

// Read Exam .yaml files from disk
app.get('/getExam/:course/:type/:exam', function(req, res) {
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
    } catch(e) {
      error = true;
      res.status(404).send('Not found.');
    }
    const success = examCache.set(examKey, doc);
    error = !success;
  }
  if (!error) {
    res.json(doc);
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Started server on port ' + port));
