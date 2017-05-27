import { replace } from 'lodash';

import { updateExamList } from '../actions';
import MDRenderer from '../components/exam/MDRenderer';

export function parseAuthHash(auth, location) {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.parseHash(location.hash);
  }
}

export function requireAuth(auth, history) {
  if (!auth.loggedIn()) {
    history.push("/login");
  } else if (JSON.parse(localStorage.getItem("profile")).user_id !== "facebook|10210068307522822") {
    history.push("/");
  }
}

export function retrieveExamList(store) {
  fetch(`/getExams`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateExamList(json))
  )
}

export function preprocess(text) {
  text = replace(text, /\./g, '\\.');
  text = replace(text, /_/g, '\\_');
  text = replace(text, /&amp;/g, '&');
  text = MDRenderer(text);
  return text;
};
