'use strict';

require('ignore-styles')

require('es6-promise').polyfill();
require('isomorphic-fetch');

const bodyParser = require('body-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload')
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const express = require('express');

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
})

const paths = require('./paths');
const retrieveLists = require('./retrieveLists');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(morgan('combined'))

app.use('/', paths);
app.use('/', retrieveLists);

app.use('/img', express.static(path.join(__dirname, '../src/img')));
app.use('/static', express.static(path.join(__dirname, '../build/static')));

const React = require('react');
const { renderToString } = require('react-dom/server');
const { Provider } = require('react-redux');
const { Routes } = require('../src/components');
const { StaticRouter } = require('react-router');
const { default: configureStore } = require('../src/utils/configureStore');

app.use('/', (req, res) => {
  console.log("url", req.url);
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    const context = {};
    const store = configureStore();
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {Routes}
        </StaticRouter>
      </Provider>
    );
    console.log(req.url, context, markup);
    if (context.url) {
      // Somewhere a <Redirect> was rendered
      redirect(301, context.url)
    } else {
      // We're good, send a response
      const RenderedApp = htmlData.replace('{{SSR}}', markup)
      res.send(RenderedApp)
    }
  });
});

app.use(express.static(path.join(__dirname, '../build')));

app.listen(process.env.PORT || 8080, () => console.log('Started server on port', process.env.PORT || 8080));
