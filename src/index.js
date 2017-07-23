import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { map } from 'lodash';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import * as appReducers from './reducers';
import routes from './routes';
import initializeTracking from './tracking';
import { initStore } from './utils';
import { ReactGA } from './events';

import './css/General.css';
import './css/Typography.css';
import './css/Navbar.css';
import './css/Errors.css';
import './css/Cards.css';
import './css/Home.css';
import './css/School.css';
import './css/Exam.css';
import './css/Course.css';
import './css/Marketing.css';
import './css/Modals.css';
import './css/Mobile.css';
import './css/Admin.css';

ReactGA.set({ path: window.location.pathname });
ReactGA.pageview(window.location.pathname);

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

initStore(store);
initializeTracking();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {map(routes, (route, key) => <Route key={key} path={route.path} component={route.component} exact={route.exact} />)}
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
