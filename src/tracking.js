import { forEach } from 'lodash';

import { activeUserEvent, actionTakenEvent, pageFocusEvent, pageBlurEvent } from './events';
import { canUseDOM, ENV_IS_DEV } from './utils';
import { mixpanel } from './events';

export default function initializeTracking() {
  if (!canUseDOM)
    return;
  const profile = JSON.parse(localStorage.getItem('profile'))
  if (profile)
    !mixpanel || mixpanel.identify(profile.user_id);

  let sessionStartTime = Date.now();
  let sessionLength = 0;

  window.onbeforeunload = function(e) {
    let length = Math.floor((sessionLength + Date.now() - sessionStartTime) / 1000);
    const savedLength = length;
    const hours = Math.floor(length / 3600); length = length % 3600;
    const minutes = Math.floor(length / 60); length = length % 60;
    const seconds = length;
    if (!ENV_IS_DEV)
      !mixpanel || mixpanel.track('Session Length', { page: window.location.pathname, length_str: `${hours}h ${minutes}m ${seconds}s`, length_seconds: savedLength });
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
