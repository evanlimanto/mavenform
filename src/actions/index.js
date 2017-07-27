export const UPDATE_INITIAL_STATE = 'UPDATE_INITIAL_STATE';
export const updateInitialState = (data) => {
  return {
    type: UPDATE_INITIAL_STATE,
    data: data
  }
};

export const UPDATE_COURSE_EXAMS = 'UPDATE_COURSE_EXAMS';
export const updateCourseExams = (exams) => {
  return {
    type: UPDATE_COURSE_EXAMS,
    exams: exams,
  };
};

export const UPDATE_SCHOOL_COURSES = 'UPDATE_SCHOOL_COURSES';
export const updateSchoolCourses = (courses) => {
  return {
    type: UPDATE_SCHOOL_COURSES,
    courses: courses,
  }
};

export const UPDATE_EXAM_INFO = 'UPDATE_EXAM_INFO';
export const updateExamInfo = (info) => {
  return {
    type: UPDATE_EXAM_INFO,
    info: info,
  }
};

export const UPDATE_TOPIC_INFO = 'UPDATE_TOPIC_INFO';
export const updateTopicInfo = (info) => {
  return {
    type: UPDATE_TOPIC_INFO,
    info: info,
  };
};

export const UPDATE_COURSE_TOPICS = 'UPDATE_COURSE_TOPICS';
export const updateCourseTopics = (topics) => {
  return {
    type: UPDATE_COURSE_TOPICS,
    topics: topics,
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

