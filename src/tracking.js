import { pageFocusEvent, pageBlurEvent, startSession, endSession } from './events';

export default function initializeTracking() {
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
