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

export const updateExamList = (exams) => {
  return {
    type: 'UPDATE_EXAM_LIST',
    exams: exams,
  };
};

export const updateCourseList = (courses) => {
  return {
    type: 'UPDATE_COURSE_LIST',
    courses: courses,
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
