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

export const UPDATE_USER_SCHOOL = 'UPDATE_USER_SCHOOL';
export const updateUserSchool = (school) => {
  return {
    type: UPDATE_USER_SCHOOL,
    school: school,
  };
};

export const UPDATE_COURSES_TO_BOOKMARK = 'UPDATE_COURSES_TO_BOOKMARK';
export const updateCoursesToBookmark = (courses) => {
  return {
    type: UPDATE_COURSES_TO_BOOKMARK,
    courses: courses,
  };
};

export const UPDATE_COURSE_LABEL = 'UPDATE_COURSE_LABEL';
export const updateCourseLabel = (label) => {
  return {
    type: UPDATE_COURSE_LABEL,
    label: label,
  };
};

export const UPDATE_COURSE_SUBJECT = 'UPDATE_COURSE_SUBJECT';
export const updateCourseSubject = (subject) => {
  return {
    type: UPDATE_COURSE_SUBJECT,
    subject: subject
  };
};

export const UPDATE_SCHOOL_INFO = 'UPDATE_SCHOOL_INFO';
export const updateSchoolInfo = (info) => {
  return {
    type: UPDATE_SCHOOL_INFO,
    info: info,
  };
};

export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const updateComments = (comments) => {
  return {
    type: UPDATE_COMMENTS,
    comments: comments,
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
export const SHOW_SELECT_SCHOOL_MODAL = 'SHOW_SELECT_SCHOOL_MODAL';
export const showSelectSchoolModal = () => { return { type: SHOW_SELECT_SCHOOL_MODAL }; };
export const SHOW_ADD_COURSE_MODAL = 'SHOW_ADD_COURSE_MODAL';
export const showAddCourseModal = () => { return { type: SHOW_ADD_COURSE_MODAL }; };
export const SHOW_UPLOAD_SUCCESS_MODAL = 'SHOW_UPLOAD_SUCCESS_MODAL';
export const showUploadSuccessModal = () => { return { type: SHOW_UPLOAD_SUCCESS_MODAL }; };
export const SHOW_REPORT_SUCCESS_MODAL = 'SHOW_REPORT_SUCCESS_MODAL';
export const showReportSuccessModal = () => { return { type: SHOW_REPORT_SUCCESS_MODAL }; };
export const SHOW_REPORT_ERROR_MODAL = 'SHOW_REPORT_ERROR_MODAL';
export const showReportErrorModal = (content_id) => { return { type: SHOW_REPORT_ERROR_MODAL, content_id }; };
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => { return { type: CLOSE_MODAL }; };

export const SET_MODAL_ERROR = 'SET_MODAL_ERROR';
export const setModalError = (errorText) => {
  return {
    type: 'SET_MODAL_ERROR',
    errorText: errorText,
  };
};

