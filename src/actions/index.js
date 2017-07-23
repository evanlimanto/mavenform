export const UPDATE_EXAM_LIST = 'UPDATE_EXAM_LIST';
export const updateExamList = (exams) => {
  return {
    type: UPDATE_EXAM_LIST,
    exams: exams,
  };
};

export const UPDATE_COURSE_LIST = 'UPDATE_COURSE_LIST';
export const updateCourseList = (courses) => {
  return {
    type: UPDATE_COURSE_LIST,
    courses: courses,
  };
};

export const UPDATE_SCHOOL_LIST = 'UPDATE_SCHOOL_LIST';
export const updateSchoolList = (schools) => {
  return {
    type: UPDATE_SCHOOL_LIST,
    schools: schools,
  };
};

export const UPDATE_EXAM_TYPES_LIST = 'UPDATE_EXAM_TYPES_LIST';
export const updateExamTypesList = (exam_types) => {
  return {
    type: UPDATE_EXAM_TYPES_LIST,
    exam_types: exam_types
  };
};

export const UPDATE_TERM_LIST = 'UPDATE_TERM_LIST';
export const updateTermList = (terms) => {
  return {
    type: UPDATE_TERM_LIST,
    terms: terms
  };
};

export const UPDATE_LABELS = 'UPDATE_LABELS';
export const updateLabels = (labels) => {
  return {
    type: 'UPDATE_LABELS',
    labels: labels,
  };
};

export const UPDATE_COURSE_EXAMS = 'UPDATE_COURSE_EXAMS';
export const updateCourseExams = (exams) => {
  return {
    type: UPDATE_COURSE_EXAMS,
    exams: exams,
  };
};

export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const showLoginModal = () => { return { type: SHOW_LOGIN_MODAL }; };
export const SHOW_WAITLIST_MODAL = 'SHOW_WAITLIST_MODAL';
export const showWaitlistModal = () => { return { type: SHOW_WAITLIST_MODAL }; };
export const SHOW_FORGOT_PASSWORD_MODAL = 'SHOW_FORGOT_PASSWORD_MODAL';
export const showForgotPasswordModal = () => { return { type: SHOW_FORGOT_PASSWORD_MODAL }; };
export const SHOW_SIGNUP_MODAL = 'SHOW_SIGNUP_MODAL';
export const showSignupModal = () => { return { type: SHOW_SIGNUP_MODAL }; };
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => { return { type: CLOSE_MODAL }; };

export const SET_MODAL_ERROR = 'SET_MODAL_ERROR';
export const setModalError = (errorText) => {
  return {
    type: 'SET_MODAL_ERROR',
    errorText: errorText,
  };
};

