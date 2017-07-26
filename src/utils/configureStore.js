import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import history from './history';

import { updateInitialState } from '../actions';
import * as appReducers from '../reducers';
import { BASE_URL } from '../utils';

function initStore(store) {
  return fetch(`${BASE_URL}/getInitial`)
    .then((response) => response.json())
    .then((json) => store.dispatch(updateInitialState(json)))
}

function configureStore() {
  const middleware = routerMiddleware(history)
  const store = createStore(
    combineReducers({
      ...appReducers,
      router: routerReducer
    }),
    applyMiddleware(middleware)
  );
  return store;
}

export { configureStore, initStore };
