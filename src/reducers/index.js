import AuthService from '../utils/AuthService';
import * as Actions from '../actions';

export const exams = (state = { key_dict: {}, multi_dict: {} }, action) => {
  switch (action.type) {
    case Actions.UPDATE_INITIAL_STATE:
      return action.data.exams;
    default:
      return state;
  }
};

export const schools = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_INITIAL_STATE:
      return action.data.schools;
    default:
      return state;
  }
};

export const exam_types = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_INITIAL_STATE:
      return action.data.exam_types;
    default:
      return state;
  }
};

export const terms = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_INITIAL_STATE:
      return action.data.terms;
    default:
      return state;
  }
};

export const labels = (state = {}, action) => {
  switch (action.type) {
    case Actions.UPDATE_INITIAL_STATE:
      return action.data.labels;
    default:
      return state;
  }
};

export const courseExams = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_COURSE_EXAMS:
      return action.exams;
    default:
      return state;
  }
};

export const schoolCourses = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_SCHOOL_COURSES:
      return action.courses;
    default:
      return state;
  }
};

export const examInfo = (state = {}, action) => {
  switch (action.type) {
    case Actions.UPDATE_EXAM_INFO:
      return action.info;
    default:
      return state;
  }
};

export const schoolInfo = (state = {}, action) => {
  switch (action.type) {
    case Actions.UPDATE_SCHOOL_INFO:
      return action.info;
    default:
      return state;
  }
};

export const topicInfo = (state = {}, action) => {
  switch (action.type) {
    case Actions.UPDATE_TOPIC_INFO:
      return action.info;
    default:
      return state;
  }
};

export const courseTopics = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_COURSE_TOPICS:
      return action.topics;
    default:
      return state;
  }
};

export const coursesToBookmark = (state = [], action) => {
  switch (action.type) {
    case Actions.UPDATE_COURSES_TO_BOOKMARK:
      return action.courses;
    default:
      return state;
  }
};

export const courseLabel = (state = null, action) => {
  switch (action.type) {
    case Actions.UPDATE_COURSE_LABEL:
      return action.label;
    default:
      return state;
  }
};

export const courseSubject = (state = null, action) => {
  switch (action.type) {
    case Actions.UPDATE_COURSE_SUBJECT:
      return action.subject;
    default:
      return state;
  }
};

export const modal = (state = { type: null, errorText: null }, action) => {
  switch (action.type) {
    case Actions.SHOW_LOGIN_MODAL:
      return { type: 'login', errorText: null };
    case Actions.SHOW_SIGNUP_MODAL:
      return { type: 'signup', errorText: null };
    case Actions.SHOW_FORGOT_PASSWORD_MODAL:
      return { type: 'forgotpassword', errorText: null };
    case Actions.SHOW_SELECT_SCHOOL_MODAL:
      return { type: 'selectschool', errorText: null };
    case Actions.SHOW_ADD_COURSE_MODAL:
      return { type: 'addcourse', errorText: null };
    case Actions.SHOW_UPLOAD_SUCCESS_MODAL:
      return { type: 'uploadsuccess', errorText: null };
    case Actions.SHOW_REPORT_SUCCESS_MODAL:
      return { type: 'reportsuccess', errorText: null };
    case Actions.SHOW_REPORT_ERROR_MODAL:
      return { type: 'reporterror', errorText: null, content_id: action.content_id };
    case Actions.CLOSE_MODAL:
      return { type: null, errorText: null };
    case Actions.SET_MODAL_ERROR:
      return { type: state.type, errorText: action.errorText };
    default:
      return state;
  }
};

export const userSchool = (state = { code: null }, action) => {
  switch (action.type) {
    case Actions.UPDATE_USER_SCHOOL:
      return action.school;
    default:
      return state;
  }
};

const authState = new AuthService('tgMckz0tmKMhju4VwEnPLxEH4BDExL21', 'mavenform.auth0.com')
export const auth = (state = authState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
