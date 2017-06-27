import AuthService from '../utils/AuthService';

export const exams = (state = { key_dict: {}, multi_dict: {} }, action) => {
  switch (action.type) {
    case 'UPDATE_EXAM_LIST':
      return action.exams;
    default:
      return state;
  }
};

export const schools = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SCHOOL_LIST':
      return action.schools;
    default:
      return state;
  }
};

export const courses = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_COURSE_LIST':
      return action.courses;
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

export const exam_types = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_EXAM_TYPES_LIST':
      return action.exam_types;
    default:
      return state;
  }
};

export const terms = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TERM_LIST':
      return action.terms;
    default:
      return state;
  }
};

export const labels = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LABELS':
      return action.labels;
    default:
      return state;
  }
};

export const modal = (state = { type: null, errorText: null }, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_MODAL':
      return { type: 'login', errorText: null };
    case 'SHOW_SIGNUP_MODAL':
      return { type: 'signup', errorText: null };
    case 'SHOW_FORGOT_PASSWORD_MODAL':
      return { type: 'forgotpassword', errorText: null };
    case 'CLOSE_MODAL':
      return { type: null, errorText: null };
    case 'SET_MODAL_ERROR':
      return { type: state.type, errorText: action.errorText };
    default:
      return state;
  }
};
