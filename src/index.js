import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import * as appReducers from './reducers';
import { Routes } from './components';

const $ = require('jquery');

const store = createStore(
  combineReducers({
    ...appReducers,
    routing: routerReducer,
  })
);
const history = syncHistoryWithStore(createHistory(), store);

const ReactGA = require('react-ga').initialize('UA-20131732-5');

$(document).ready(function() {
  if (window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    ReactGA.set({ path });
    ReactGA.pageview(path);
  }
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>
), document.getElementById('root'));
