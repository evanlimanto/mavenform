const fs = require("fs");
const request = require("request");
const async = require("async");
const _ = require("lodash");

request("https://isearch.asu.edu/asu-people/fq=affiliationsFacet:Student&q=*:*", (err, response, body) => {
  console.log(body);
});
