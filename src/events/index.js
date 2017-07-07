const mixpanel = require('mixpanel-browser');

const MIXPANEL_ID_DEV = '838462058ed380687ee46dae27d0d027';
const MIXPANEL_ID     = 'af9797f751c2f22b4ba5f77f20cc6cc5';

mixpanel.init((window.location.hostname.indexOf("studyform.com") !== -1) ? MIXPANEL_ID : MIXPANEL_ID_DEV);

const ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

const tracker = function(name, label) {
  const page = window.location.pathname;
  mixpanel.track(name, { page, label });
	if (process.env.NODE_ENV === "development") {
    console.log(`Tracking event ${name}`);
  } else {
		ReactGA.event({ category: name, action: page, label });
	}
}

let startTime = Date.now();
export function startSession() {
  startTime = Date.now();
}

export function endSession() {
  let length = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(length / 3600); length = length % 3600;
  const minutes = Math.floor(length / 60); length = length % 60;
  const seconds = length;
  mixpanel.track('Session Length', { page: window.location.pathname, length_str: `${hours}h ${minutes}m ${seconds}s`, length_seconds: length });
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

export function pageFocusEvent() {
  tracker('page focus');
}

export function pageBlurEvent() {
  tracker('page blur');
}
