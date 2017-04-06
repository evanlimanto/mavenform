import Mixpanel from 'mixpanel';

const MIXPANEL_ID_DEV = 'd9dbfd1988e5250bea11879c6a783054';
const MIXPANEL_ID = 'af9797f751c2f22b4ba5f77f20cc6cc5';

const mixpanel = Mixpanel.init((window.location.hostname === "www.mavenform.com") ? MIXPANEL_ID : MIXPANEL_ID_DEV);
const ReactGA = require('react-ga').initialize('UA-20131732-5');

const tracker = function(name, dict={}) {
	if (process.env.NODE_ENV === "development") {
    console.log(`Tracking event ${name}`);
  } else {
    const page = window.location.pathname;
    mixpanel.track(name, { page });
		ReactGA.event({ category: name, page: page });
	}
}

export function viewCoursesEvent() {
	tracker('view courses');
}

export function learnMoreEvent() {
	tracker('learn more');
}

export function examClickEvent(courseid, examtype, examid) {
	tracker('exam click', {
		courseid,
		examtype,
		examid,
	});
}

export function courseClickEvent(courseid) {
	tracker('course click', {
		courseid
	})
}

export function toggleAppModeEvent() {
	tracker('toggle app mode');
}

export function navSidebarClickEvent() {
	tracker('nav sidebar click');
}

export function scrollNavClickEvent() {
	tracker('scroll nav click');
}

export function copyQuestionLinkEvent() {
	tracker('copy question link');
}

export function toggleSolutionEvent() {
	tracker('toggle solution');
}

export function actionTakenEvent(action) {
	tracker(action);
}

export function activeUserEvent() {
	tracker('active user');
}

export function PDFClickEvent() {
  tracker('pdf');
}
