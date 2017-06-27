const fs = require("fs");
const request = require("request");
const aysnc = require("async");
const _ = require("lodash");

const first_names = _.split(fs.readFileSync("first-names.txt"), "\r\n");

const name = "kevin";

const options = {
  url: "https://directory.andrew.cmu.edu/index.cgi",
  method: "POST",
  formData: {
    search: "evan",
  }
};
request(options, (err, response, body) => {
  console.log(body);
});
