import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import history from './history';

import { updateExamList, updateSchoolList, updateExamTypesList, updateTermList, updateLabels } from '../actions';
import * as appReducers from '../reducers';
import { BASE_URL } from '../utils';

function initStore(store) {
  fetch(`${BASE_URL}/getExams`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateExamList(json))
  );

  fetch(`${BASE_URL}/getSchools`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateSchoolList(json))
  );

  fetch(`${BASE_URL}/getExamTypes`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateExamTypesList(json))
  );

  fetch(`${BASE_URL}/getTerms`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateTermList(json))
  );

  fetch(`${BASE_URL}/getLabels`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateLabels(json))
  );
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
