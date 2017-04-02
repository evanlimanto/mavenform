import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import * as appReducers from './reducers';
import { Routes } from './components';

const DevTools = createDevTools(
  <LogMonitor theme='tomorrow' />
);

const store = createStore(
  combineReducers({
    ...appReducers,
    routing: routerReducer,
  }),
  DevTools.instrument()
);
const history = syncHistoryWithStore(createHistory(), store);

const ReactGA = require('react-ga').initialize('UA-20131732-5');

function logPageView() {
  const debug = false;
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    ReactGA.set({ path });
    ReactGA.pageview(path);
  }
}

function showDevTools(store) {
  const popup = window.open(null, 'Redux DevTools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  // Reload in case it already exists
  popup.location.reload();

  setTimeout(() => {
    popup.document.write('<div id="react-devtools-root"></div>');
    ReactDOM.render(
      <DevTools store={store} />,
      popup.document.getElementById('react-devtools-root')
    );
  }, 10);
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>
), document.getElementById('root'));

showDevTools(store);