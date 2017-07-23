export const updateInitialState = (data) => {
  return {
    type: 'UPDATE_INITIAL_STATE',
    data: data
  }
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

