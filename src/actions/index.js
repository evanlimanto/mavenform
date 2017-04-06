export const toggleAppMode = () => {
	return {
		type: 'TOGGLE_APP_MODE'
	}
};

export const updateExamContent = (examContent) => {
	return {
		type: 'UPDATE_EXAM_CONTENT',
		examContent: examContent,
	}
};

export const closeNotificationBar = () => {
	return {
		type: 'CLOSE_NOTIFICATION_BAR'
	}
};

export const setQuestionCopied = (copying) => {
	return {
		type: 'SET_QUESTION_COPIED',
		copying: copying,
	}
};