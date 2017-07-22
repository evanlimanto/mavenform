import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import history from './utils/history';

import { Routes } from './components';
import initializeTracking from './tracking';
import { ReactGA } from './events';
import configureStore from './utils/configureStore';

ReactGA.set({ path: window.location.pathname });
ReactGA.pageview(window.location.pathname);

const store = configureStore();

initializeTracking();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {Routes}
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
