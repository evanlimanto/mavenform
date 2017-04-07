import { forEach } from 'lodash';

import { actionTakenEvent, activeUserEvent } from './events';

export default function initializeTracking() {
  function createEventTracker(name) {
    window.addEventListener(name, function(e) {
      actionTakenEvent(name);
    });
  }

  function createTimedEventTracker(name) {
    let lastTime = 0;
    const trackingInterval = 2.5 * 1000;
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
  const activeTrackingInterval = 5 * 1000;
  window.addEventListener('focus', function(e) {
    if (userOnPageTracker !== null) {
      window.clearInterval(userOnPageTracker);
    }
    activeUserEvent();
    userOnPageTracker = window.setInterval(activeUserEvent, activeTrackingInterval);
  });

  window.addEventListener('blur', function(e) {
    window.clearInterval(userOnPageTracker);
    userOnPageTracker = null;
  });

  activeUserEvent();
  userOnPageTracker = window.setInterval(activeUserEvent, activeTrackingInterval);
}
