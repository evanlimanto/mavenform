'use strict';

const express = require('express');
const browserify = require('browserify');
const fs = require('fs');
const glob = require("glob");
const _ = require('lodash')
const port = process.env.PORT || 8080;
const app = express();

console.log("server started on port " + port);

const mjAPI = require("mathjax-node/lib/mj-page.js");
mjAPI.start();

app.get('/', function(req, res) {
  glob('bank/fa15-q*.txt', {}, function (err, names) {
    var html = '';
    _.map(names, (name) => {
      var contents = fs.readFileSync(name, 'utf8');
      mjAPI.typeset({
        html: contents,
        render: "NativeMML",
        inputs: ["TeX"],
        xmlns: "mml"
      }, function(result) {
        html += result.html;
        html += "<br/><br/>";
      });
    });
    res.send(html);
  });
});

app.get('/api', function(req, res) {
  var id = req.query.id;
  var filename = 'bank/' + id + '.txt';
  try {
    var contents = fs.readFileSync(filename, 'utf8');
    mjAPI.typeset({
      html: contents,
      render: "NativeMML",
      inputs: ["TeX"],
      xmlns: "mml"
    }, function(result) {
      res.send(result.html);
    });
  } catch (e) {
    res.status(404).send(e);
  }
});

app.listen(port);
