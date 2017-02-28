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
app.use(express.static('./build'));
app.use('/img', express.static('./src/img'));

app.get('/exam', function(req, res) {
  try {
    res.json(
      yaml.safeLoad(fs.readFileSync(`src/exams/${req.query.type}/${req.query.id}.yml`, "utf8"))
    );
  } catch (e) {
    console.log(e);
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Server on port ' + port));
