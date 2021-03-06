'use strict'; 
require('ignore-styles');

require('string.prototype.startswith');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var _ = require('lodash');

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
});

var app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan('combined'));

app.use('/img', express.static(path.join(__dirname, '../src/img')));
app.use('/static', express.static(path.join(__dirname, '../build/static')));

require('./sitemap')(app);
require('./paths')(app);
require('./retrieveLists')(app);

var React = require('react');

var _require = require('react-dom/server'),
    renderToString = _require.renderToString;

var _require2 = require('react-redux'),
    Provider = _require2.Provider;

var _require3 = require('../src/routes'),
    routes = _require3.default;

var _require4 = require('react-router'),
    matchPath = _require4.matchPath,
    StaticRouter = _require4.StaticRouter;

var _require5 = require('../src/utils/configureStore'),
    configureStore = _require5.configureStore,
    initStore = _require5.initStore;

var _require6 = require('react-helmet'),
    Helmet = _require6.Helmet;

var _require7 = require('../src/components/notfound'),
    NotFound = _require7.default;

app.use('/', function (req, res, next) {
  if (req.url.startsWith("/img") || req.url.startsWith("/static"))
    return next();

  var filePath = path.resolve(__dirname, '..', 'build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, htmlData) {
    if (err) {
      console.error('read err', err);
      return res.status(404).end();
    }

    var store = configureStore();
    initStore(store).then(function () {
      var matches = [];
      routes.some(function (route) {
        var match = matchPath(req.url, { path: route.path, exact: route.exact });
        if (match) {
          matches.push({
            component: route.component,
            params: match.params,
            fetchData: function fetchData() {
              return route.component.fetchData ? route.component.fetchData(store.dispatch, match.params) : new Promise(function (resolve, reject) {
                return resolve(null);
              });
            }
          });
        }
        return match;
      });

      var Component = matches[0].component;
      matches[0].fetchData().then(function () {
        var context = {};
        var markup = renderToString(React.createElement(
          Provider,
          { store: store },
          React.createElement(
            StaticRouter,
            { context: context, url: req.url },
            React.createElement(Component, matches[0].params)
          )
        ));
        if (matches[0].component.getMeta)
          matches[0].component.getMeta(Object.assign({}, matches[0].params, { labels: store.getState().labels }));
        var helmet = Helmet.renderStatic();
        if (context.url) {
          // Somewhere a <Redirect> was rendered
          redirect(301, context.url);
        } else {
          // We're good, send a response
          var RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`).replace('<title>Studyform</title>', helmet.title.toString() + helmet.meta.toString());
          res.send(RenderedApp);
        }
      });
    });
  });
});

app.get('/img/*', function(req, res) {
  res.sendfile(path.resolve('src/img/subject/misc.png'))
});

app.use(function (req, res, next) {
  console.log(404);
  res.status(404);
  var markup = renderToString(React.createElement(NotFound));
  var filePath = path.resolve(__dirname, '..', 'build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, htmlData) {
    var RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    res.send(RenderedApp);
  });
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.listen(process.env.PORT || 8080, function () {
  return console.log('Started server on port', process.env.PORT || 8080);
});

