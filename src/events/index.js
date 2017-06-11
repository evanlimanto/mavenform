import Mixpanel from 'mixpanel';

const MIXPANEL_ID_DEV = 'd9dbfd1988e5250bea11879c6a783054';
const MIXPANEL_ID = 'af9797f751c2f22b4ba5f77f20cc6cc5';

const mixpanel = Mixpanel.init((window.location.hostname === "www.mavenform.com") ? MIXPANEL_ID : MIXPANEL_ID_DEV);
const ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

const tracker = function(name, label) {
	if (process.env.NODE_ENV === "development") {
    console.log(`Tracking event ${name}`);
  } else {
    const page = window.location.pathname;
    mixpanel.track(name, { page });
		ReactGA.event({ category: name, action: page, label });
	}
}

export { ReactGA };

export function schoolClickEvent(schoolCode) {
  tracker('school click', {
    label: schoolCode,
  });
}

export function courseClickEvent(schoolCode, courseCode) {
	tracker('course click', {
    label: `${schoolCode} - ${courseCode}`
	})
}

export function examClickEvent(schoolCode, courseCode, typeCode, termCode) {
	tracker('exam click', {
    label: `${schoolCode} - ${courseCode} ${typeCode} ${termCode}`
	});
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

export function pageFocusEvent() {
  tracker('page focus');
}

export function pageBlurEvent() {
  tracker('page blur');
}
