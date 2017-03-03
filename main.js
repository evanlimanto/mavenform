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

function lmatrix(values, transpose=false, inline=true) {
  var s;
  if (Array.isArray(values[0])) {
    // 2-D
    var m = values[0].length;
    s = `
      \\left[\\begin{array}{${
        _.repeat('c ', m)
      }}${
        _.join(_.map(values, (list) => {
          return _.join(list, ' & ') + "\\\\";
        }), '')
      }\\end{array}\\right]${
        (transpose) ? "^T" : ""
      }
    `;
    return lx(s, inline);
  } else {
    // 1-D
    s = `
      \\left[\\begin{array}{c}${
        _.join(_.map(values, (value) => {
          return value + "\\\\";
        }), '')
      }\\end{array}\\right]${
        (transpose) ? "^T" : ""
      }
    `;
    return lx(s, inline);
  }
}

app.get('/exam', function(req, res) {
  // Parse lmatrix and lx functions (legacy)
  var doc = null;
  try {
    doc = fs.readFileSync(`src/exams/${req.query.type}/${req.query.id}.yml`, "utf8");
  } catch (e) {
    console.log(e);
  }
  console.log(doc);
  try {
    doc = yaml.safeLoad(doc);
  } catch(e) {
    console.log(e);
  }

  res.json(doc);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Server on port ' + port));
