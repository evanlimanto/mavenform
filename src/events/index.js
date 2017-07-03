const mixpanel = require('mixpanel-browser');

const MIXPANEL_ID_DEV = '838462058ed380687ee46dae27d0d027';
const MIXPANEL_ID     = 'af9797f751c2f22b4ba5f77f20cc6cc5';

mixpanel.init((window.location.hostname === "www.studyform.com") ? MIXPANEL_ID : MIXPANEL_ID_DEV);
const distinct_id = mixpanel.get_distinct_id();

const ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

const tracker = function(name, label) {
  const page = window.location.pathname;
  mixpanel.track(name, { page, distinct_id, label });
	if (process.env.NODE_ENV === "development") {
    console.log(`Tracking event ${name}`);
  } else {
		ReactGA.event({ category: name, action: page, label });
	}
}

export { ReactGA };

export function schoolClickEvent(schoolCode) {
  tracker('school click', schoolCode);
}

export function courseClickEvent(schoolCode, courseCode) {
	tracker('course click', `${schoolCode} - ${courseCode}`)
}

export function examClickEvent(schoolCode, courseCode, typeCode, termCode) {
	tracker('exam click', `${schoolCode} - ${courseCode} ${typeCode} ${termCode}`);
}

export function copyQuestionLinkEvent() {
	tracker('copy question link');
}

export function toggleSolutionEvent() {
	tracker('toggle solution');
}

export function activeUserEvent() {
	tracker('active user');
}

export function pageFocusEvent() {
  tracker('page focus');
}

export function pageBlurEvent() {
  tracker('page blur');
}
