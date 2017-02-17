'use strict';

const express = require('express');
const browserify = require('browserify');
const fs = require('fs');
const glob = require("glob");
const _ = require('lodash')
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('./build'));
app.listen(port);
console.log("server started on port " + port);
