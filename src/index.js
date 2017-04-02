import React from 'react';
import { createStore, combineReducers } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';

import rootReducer from './reducers';
import { Root } from './components';

const reducer = combineReducers({
	router: routerStateReducer,
	app: rootReducer,
});

const store = compose(
  reduxReactRouter({ createHistory }),
  devTools()
)(createStore)(reducer);

const RootComponent = (
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>
);

render((
  <div>
    {RootComponent}
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>
), document.getElementById('root'));