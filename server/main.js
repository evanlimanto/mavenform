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
const _ = require('lodash');

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
})

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan('combined'))

app.use('/img', express.static(path.join(__dirname, '../src/img')));
app.use('/static', express.static(path.join(__dirname, '../build/static')));

require('./paths')(app);
require('./retrieveLists')(app);

const React = require('react');
const { renderToString } = require('react-dom/server');
const { Provider } = require('react-redux');
const { default: routes } = require('../src/routes');
const { matchPath, StaticRouter } = require('react-router');
const { configureStore, initStore } = require('../src/utils/configureStore');

app.use('/', (req, res) => {
  console.log(req.url);
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    const store = configureStore();
    initStore(store).then(() => {
      const matches = [];
      routes.some((route) => {
        const match = matchPath(req.url, { path: route.path, exact: route.exact });
        if (match) {
          console.log(match);
          matches.push({
            component: route.component,
            params: match.params,
            fetchData: () => (
              route.component.fetchData ?
              route.component.fetchData(store.dispatch, match.params) :
              new Promise((resolve, reject) => resolve(null))
            )
          });
        }
        return match;
      });

      const Component = matches[0].component;
      matches[0].fetchData().then(() => {
        const context = {};
        const markup = renderToString(
          <Provider store={store}>
            <StaticRouter context={context} url={req.url}>
              <Component {...matches[0].params} />
            </StaticRouter>
          </Provider>
        );
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
  });
});

app.listen(process.env.PORT || 8080, () => console.log('Started server on port', process.env.PORT || 8080));
