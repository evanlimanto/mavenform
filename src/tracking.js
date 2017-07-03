import { activeUserEvent, pageFocusEvent, pageBlurEvent } from './events';

export default function initializeTracking() {
  let userOnPageTracker = null;
  const activeTrackingInterval = 30 * 1000;
  window.addEventListener('focus', function(e) {
    if (userOnPageTracker !== null) {
      window.clearInterval(userOnPageTracker);
    }
    pageFocusEvent();
    activeUserEvent();
    userOnPageTracker = window.setInterval(activeUserEvent, activeTrackingInterval);
  });

  window.addEventListener('blur', function(e) {
    pageBlurEvent();
    window.clearInterval(userOnPageTracker);
    userOnPageTracker = null;
  });

  activeUserEvent();
  userOnPageTracker = window.setInterval(activeUserEvent, activeTrackingInterval);
}
