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
