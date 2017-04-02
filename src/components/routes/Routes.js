import React, { PropTypes } from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { forEach } from 'lodash';

import { Course, Courses, Exam, Home, NotFound } from '../';
import { handleEvent } from '../../utils';

const debug = process.env.NODE_ENV === "development";
const $ = require('jquery');

let ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

function logPageView() {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    ReactGA.set({ path });
    ReactGA.pageview(path);
  }
}

function createEventTracker(name) {
  window.addEventListener(name, function(e) {
    if (debug || window.location.hostname !== "localhost") {
      const path = window.location.pathname;
      if (!debug) {
        handleEvent(name, path);
      }
    }
  });
}

forEach(['scroll', 'mousemove', 'click', 'keypress'],
        (event) => createEventTracker(event));

let userOnPageTracker = null;
const activeTrackingInterval = 5 * 1000;
function trackUserOnPage() {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    if (!debug) {
      handleEvent('Active', path);
    } else {
      console.log("Tracking - Active User.");
    }
  }
}

window.addEventListener('focus', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    if (userOnPageTracker !== null) {
      window.clearInterval(userOnPageTracker);
    }
    trackUserOnPage();
    userOnPageTracker = window.setInterval(trackUserOnPage, activeTrackingInterval);
  }
});

window.addEventListener('blur', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    window.clearInterval(userOnPageTracker);
    userOnPageTracker = null;
  }
});

$(document).ready(function() {
  if (debug || window.location.hostname !== "localhost") {
    trackUserOnPage();
    userOnPageTracker = window.setInterval(trackUserOnPage, activeTrackingInterval);
  }
});

const Routes = (
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/courses" component={Courses} />
    <Route path="/:courseid" component={Course} />
    <Route path="/:courseid/:examtype/:examid" component={Exam} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;