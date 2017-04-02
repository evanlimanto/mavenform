import { combineReducers } from 'redux';

const course = (state = {}, action) => {
	switch (action.type) {
		case 'TOGGLE_APP_MODE':
			return {
				appMode: !state.appMode,
			};
		default:
			return state;
	}
};

const exam = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_EXAM_CONTENT':
			return {
				examContent: action.examContent,
			};
    default:
      return state;
	}
};

const rootReducer = combineReducers({
	course,
	exam,
});

export default rootReducer;