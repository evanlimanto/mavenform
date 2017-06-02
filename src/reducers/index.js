import AuthService from '../utils/AuthService';

export const exam = (state = { examContent: null, examContentHasLoaded: false }, action) => {
  switch (action.type) {
    case 'UPDATE_EXAM_CONTENT':
      return {
        examContent: action.examContent,
        examContentHasLoaded: true,
      };
    default:
      return state;
	}
};

export const home = (state = { notificationBar: true }, action) => {
  switch (action.type) {
    case 'CLOSE_NOTIFICATION_BAR':
      return {
        notificationBar: false,
      };
    default:
      return state;
  }
};

export const question = (state = { copying: false }, action) => {
  switch (action.type) {
    case 'SET_QUESTION_COPIED':
      return {
        copying: action.copying,
      };
    default:
      return state;
  }
};

export const config = (state = { appMode: true }, action) => {
  switch (action.type) {
    case 'TOGGLE_APP_MODE':
      return {
        appMode: !state.appMode,
      };
    default:
      return state;
  }
};

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
  console.log(action);
  switch (action.type) {
    case 'UPDATE_TERM_LIST':
      return action.terms;
    default:
      return state;
  }
};
