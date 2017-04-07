import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import * as appReducers from './reducers';
import { Routes } from './components';
import initializeTracking from './tracking';

const ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');
ReactGA.set({ path: location.pathname });
ReactGA.pageview(location.pathname);

const history = createHistory()
history.listen((location, action) => {
  // Track all pageviews, "PUSH" and "POP"
  ReactGA.set({ path: location.pathname });
  ReactGA.pageview(location.pathname);
})

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...appReducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);


initializeTracking();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {Routes}
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
