import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import * as appReducers from './reducers';
import { Routes } from './components';
import initializeTracking from './tracking';

const store = createStore(
  combineReducers({
    ...appReducers,
    routing: routerReducer,
  })
);
const history = syncHistoryWithStore(createHistory(), store);

initializeTracking();

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>
), document.getElementById('root'));
