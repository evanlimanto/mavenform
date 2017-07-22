export const updateExamList = (exams) => {
  return {
    type: 'UPDATE_EXAM_LIST',
    exams: exams,
  };
};

export const updateSchoolList = (schools) => {
  return {
    type: 'UPDATE_SCHOOL_LIST',
    schools: schools,
  };
};

export const updateExamTypesList = (exam_types) => {
  return {
    type: 'UPDATE_EXAM_TYPES_LIST',
    exam_types: exam_types
  };
};

export const updateTermList = (terms) => {
  return {
    type: 'UPDATE_TERM_LIST',
    terms: terms
  };
};

export const updateLabels = (labels) => {
  return {
    type: 'UPDATE_LABELS',
    labels: labels,
  };
};

export const showLoginModal = () => { return { type: 'SHOW_LOGIN_MODAL' }; };
export const showWaitlistModal = () => { return { type: 'SHOW_WAITLIST_MODAL' }; };
export const showForgotPasswordModal = () => { return { type: 'SHOW_FORGOT_PASSWORD_MODAL' }; };
export const showSignupModal = () => { return { type: 'SHOW_SIGNUP_MODAL' }; };
export const closeModal = () => { return { type: 'CLOSE_MODAL' }; };

export const setModalError = (errorText) => {
  return {
    type: 'SET_MODAL_ERROR',
    errorText: errorText,
  };
};

