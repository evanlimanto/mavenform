import { join, split, reduce, toUpper } from 'lodash';

export const ENV_IS_DEV = process.env.NODE_ENV === "development";
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
export const BASE_URL = ENV_IS_DEV ? "http://localhost:8080" : process.env.HOST;

export function requireAuth(auth, history) {
  if (!auth.loggedIn()) {
    history.goBack();
  }
}

// Algolia search
const APP_ID = 'NPJP92R96D'
const SEARCH_API_KEY = '22cd6e2a19445d1444df8fb7a3d00f52'
const algolia = require('algoliasearch')(APP_ID, SEARCH_API_KEY);
export const algoliaCourseIndex = algolia.initIndex('courses');

export function courseCodeToLabel(course_code) {
  if (!course_code)
    return null;

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
    case 'mt1p':
      return 'Midterm 1 - Practice';
    case 'mt2p':
      return 'Midterm 2 - Practice';
    case 'finalp':
      return 'Final - Practice';
    default:
      return "Unknown Type";
  }
}

export function normalizeCourseCode(courseCode) {
  return join(split(courseCode, ' '), '-');
}
