import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import history from './history';

import * as appReducers from '../reducers';
import { BASE_URL } from '../utils';

function initStore(store) {
  fetch('/getInitial')
    .then((response) => response.json())
    .then((json) => store.dispatch(populateInitial(json)))
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
  initStore(store);
  return store;
}

export default configureStore;
