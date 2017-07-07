import { pageFocusEvent, pageBlurEvent, startSession, endSession } from './events';
import mixpanel from 'mixpanel-browser';

export default function initializeTracking() {
  const profile = JSON.parse(localStorage.getItem('profile'))
  if (profile)
    mixpanel.identify(profile.user_id);

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
