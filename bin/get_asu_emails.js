const fs = require("fs");
const request = require("request");
const async = require("async");
const _ = require("lodash");
const Horseman = require("node-horseman");
const horseman = new Horseman();

horseman.on('error', (msg) => {
  console.log(msg);
});

horseman.open("http://isearch.asu.edu/asu-people/")
  .click("a:contains('Student')")
  .plainText()
  .then((text) => {
    console.log(text);
  });
