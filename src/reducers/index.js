import { combineReducers } from 'redux';

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