import { forEach } from 'lodash';

import { activeUserEvent, actionTakenEvent, pageFocusEvent, pageBlurEvent } from './events';
import { canUseDOM } from './utils';
import { mixpanel } from './events';

export default function initializeTracking() {
  if (!canUseDOM)
    return;
  let sessionStartTime = Date.now();
  let sessionLength = 0;

  window.onbeforeunload = function(e) {
    let length = Math.floor((sessionLength + Date.now() - sessionStartTime) / 1000);
    !mixpanel || mixpanel.track('Session Length', { last_page: window.location.pathname, length_seconds: length });
  }

  function createEventTracker(name) {
    window.addEventListener(name, function(e) {
      actionTakenEvent(name);
    });
  }

  function createTimedEventTracker(name) {
    let lastTime = 0;
    const trackingInterval = 5 * 1000;
    window.addEventListener(name, function(e) {
      const currentTime = Date.now();
      if (currentTime - lastTime > trackingInterval) {
        actionTakenEvent(name);
        lastTime = currentTime;
      }
    });
  }

  forEach(['click', 'keypress'], (e) => createEventTracker(e));
  forEach(['mousemove', 'scroll'], (e) => createTimedEventTracker(e));

  let userOnPageTracker = null;
  const activeTrackingInterval = 15 * 1000;
  window.addEventListener('focus', function(e) {
    if (userOnPageTracker !== null) {
      window.clearInterval(userOnPageTracker);
    }
    pageFocusEvent();
    activeUserEvent();
    userOnPageTracker = window.setInterval(activeUserEvent, activeTrackingInterval);

    sessionStartTime = Date.now();
  });

  window.addEventListener('blur', function(e) {
    pageBlurEvent();
    window.clearInterval(userOnPageTracker);
    userOnPageTracker = null;

    const currentTime = Date.now();
    sessionLength += (currentTime - sessionStartTime);
  });

  activeUserEvent();
  userOnPageTracker = window.setInterval(activeUserEvent, activeTrackingInterval);
}
