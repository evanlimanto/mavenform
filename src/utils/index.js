import { join, split, reduce, toUpper } from 'lodash';

import { updateExamList, updateCourseList, updateSchoolList, updateExamTypesList, updateTermList, updateLabels } from '../actions';

export const ENV_IS_DEV = process.env.NODE_ENV === "development";

export function parseAuthHash(auth, location) {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.parseHash(location.hash);
  }
}

export function requireAuth(auth, history) {
  if (!auth.loggedIn()) {
    history.push('/');
  }
}

// Algolia search
const APP_ID = 'NPJP92R96D'
const SEARCH_API_KEY = '22cd6e2a19445d1444df8fb7a3d00f52'
const algolia = require('algoliasearch')(APP_ID, SEARCH_API_KEY);
export const algoliaCourseIndex = algolia.initIndex('courses');

// Redux store
export function initStore(store) {
  fetch(`/getExams`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateExamList(json))
  );

  fetch(`/getCourses/ucberkeley`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateCourseList(json))
  );

  fetch(`/getSchools`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateSchoolList(json))
  );

  fetch(`/getExamTypes`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateExamTypesList(json))
  );

  fetch(`/getTerms`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateTermList(json))
  );

  fetch(`/getLabels`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateLabels(json))
  );
}

export function courseCodeToLabel(course_code) {
  if (!course_code)
    return null;

  course_code = join(split(course_code, '-'), '');
  let idx = -1;
  for (var i = 0; i < course_code.length; i++) {
    if (course_code[i] >= '0' && course_code[i] <= '9') {
      idx = i;
      break;
    }
  }
  course_code = toUpper(course_code);
  if (idx !== -1) {
    course_code = course_code.slice(0, idx) + " " + course_code.slice(idx, course_code.length);
  }
  return course_code;
}

export function getCourse(courses, courseid) {
  return reduce(courses, (res, course) => {
    if (course.code === courseid) {
      return course;
    }
    return res;
  }, { code: null, name: null });
}

export function termToLabel(term) {
  if (!term)
    return null;
  let label = "";
  if (term[0] === 'f') {
    label = "Fall";
  } else if (term[0] === 'w') {
    label = "Winter";
  } else if (term[0] === 's' && term[1] === 'p') {
    label = "Spring";
  } else if (term[0] === 's' && term[1] === 'u') {
    label = "Summer";
  } else {
    return "Unknown Term";
  }
  label += " ";
  const year = term.slice(2, 4);
  label += "'" + year;
  if (term[term.length - 1] === 'p') {
    label += " - Practice";
  }
  return label;
}

export function examTypeToLabel(exam_type) {
  if (!exam_type)
    return null;
  switch (exam_type) {
    case 'marketing':
      return 'Marketing';
    case 'marketingp':
      return 'Marketing - Practice';
    case 'finance':
      return 'Finance';
    case 'mt1':
      return 'Midterm 1';
    case 'mt2':
      return 'Midterm 2';
    case 'mt3':
      return 'Midterm 3';
    case 'final':
      return 'Final';
    default:
      return "Unknown Type";
  }
}

export function normalizeCourseCode(courseCode) {
  return join(split(courseCode, ' '), '-');
}
