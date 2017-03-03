'use strict';

const express = require('express');
const browserify = require('browserify');
const fs = require('fs');
const glob = require("glob");
const path = require('path');
const yaml = require("js-yaml");
const _ = require('lodash')

const port = process.env.PORT || 8080;
const app = express();

app.use('/img', express.static('./src/img'));
app.use(express.static('./build'));

const mjAPI = require("mathjax-node/lib/mj-page.js");
mjAPI.start();

// Read Exam .yaml files from disk
app.get('/getExam', function(req, res) {
  var doc = null;
  try {
    doc = fs.readFileSync(`src/exams/${req.query.type}/${req.query.id}.yml`, "utf8");
    doc = yaml.safeLoad(doc);
  } catch(e) {
    console.log(e);
  }
  res.json(doc);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Started server on port ' + port));
