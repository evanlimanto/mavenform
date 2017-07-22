import { pageFocusEvent, pageBlurEvent, startSession, endSession } from './events';
import { canUseDOM } from './utils';

const mixpanel = canUseDOM ? require("mixpanel-browser") : null;

export default function initializeTracking() {
  if (canUseDOM) {
    const profile = JSON.parse(localStorage.getItem('profile'))
    if (profile)
      !mixpanel || mixpanel.identify(profile.user_id);
  }

  window.addEventListener('focus', function(e) {
    pageFocusEvent();
    startSession();
  });

  window.addEventListener('blur', function(e) {
    pageBlurEvent();
    endSession();
  });

  startSession();
  window.onbeforeunload = endSession;
}
