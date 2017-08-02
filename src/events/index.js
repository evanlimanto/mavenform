import { canUseDOM } from '../utils';

const mixpanel = canUseDOM ? require('mixpanel-browser') : null;

const MIXPANEL_ID_DEV = '838462058ed380687ee46dae27d0d027';
const MIXPANEL_ID     = 'af9797f751c2f22b4ba5f77f20cc6cc5';

!mixpanel || mixpanel.init((window.location.hostname.indexOf("studyform.com") !== -1) ? MIXPANEL_ID : MIXPANEL_ID_DEV);

const ReactGA = canUseDOM ? require('react-ga') : null;
!ReactGA || ReactGA.initialize('UA-20131732-5');

const tracker = function(name, label) {
  const page = window.location.pathname;
  !mixpanel || mixpanel.track(name, { page, label });
  const count = (page.match(/\//g) || []).length;
  if (process.env.NODE_ENV === "development") {
    console.log(`Tracking event ${name}`);
  } else {
    // Track events on exams only
    if (count === 5)
      !ReactGA || ReactGA.event({ category: name, action: page, label });
  }
}

export { ReactGA, mixpanel };

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

export function actionTakenEvent(action) {
  tracker(action);
}

export function activeUserEvent() {
  tracker('active user');
}
