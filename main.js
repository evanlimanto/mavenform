'use strict';

const express = require('express');
const browserify = require('browserify');
const fs = require('fs');
const glob = require("glob");
const path = require('path');
const _ = require('lodash')
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('./build'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html'))).listen(port, () => console.log('Server on port ' + port));
