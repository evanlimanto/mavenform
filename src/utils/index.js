import { replace, reduce, toUpper } from 'lodash';

import { updateExamList, updateCourseList } from '../actions';
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
}

export function preprocess(text) {
  text = replace(text, /\./g, '\\.');
  text = replace(text, /_/g, '\\_');
  text = replace(text, /&amp;/g, '&');
  text = MDRenderer(text);
  return text;
};

export function courseCodeToLabel(course_code) {
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
