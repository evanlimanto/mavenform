import { canUseDOM } from '../utils';

const mixpanel = canUseDOM ? require('mixpanel-browser') : null;

const MIXPANEL_ID_DEV = '838462058ed380687ee46dae27d0d027';
const MIXPANEL_ID     = 'af9797f751c2f22b4ba5f77f20cc6cc5';

!mixpanel || mixpanel.init((window.location.hostname.indexOf("studyform.com") !== -1) ? MIXPANEL_ID : MIXPANEL_ID_DEV);
!mixpanel || mixpanel.track('Page Landing', { page: document.location.pathname });

const ReactGA = canUseDOM ? require('react-ga') : null;
!ReactGA || ReactGA.initialize('UA-20131732-5');

const tracker = function(name, label) {
  const page = window.location.pathname;
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
  mixpanel.track('School Click', { schoolCode });
}

export function courseSearchResultClickEvent(schoolCode, courseCode) {
  mixpanel.track('Course Search Click', { schoolCode, courseCode });
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
  mixpanel.track('Solution Toggle', { page: document.location.pathname });
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
