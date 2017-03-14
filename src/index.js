import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { handleEvent } from './utils';
import { lowerCase } from 'lodash';
import Exam from './Exam';
import Course from './Course';
import Home from './Home';
import NotFound from './NotFound';

const $ = require('jquery');
const debug = true;
var ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

function logPageView() {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    ReactGA.set({ path });
    ReactGA.pageview(path);
  }
}

var lastScrollTime = 0;
window.addEventListener('scroll', function(e) {
  const currentTime = Date.now();
  // Track scroll every thirty seconds
  if (currentTime - lastScrollTime > 30 * 1000) {
    lastScrollTime = currentTime;
    if (debug || window.location.hostname !== "localhost") {
      const path = window.location.pathname + window.location.search;
      if (!debug) {
        handleEvent('Scroll', path);
      }
    }
  }
});

// Track only for a maximum of 30 minutes at a time
var userOnPageTracker = null;
var userOnPageTrackerStart = 0;
function trackUserOnPage() {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    if (!debug) {
      handleEvent('Active', path);
    } else {
      console.log("Tracking user on page");
    }

    const currentTime = Date.now();
    console.log(currentTime - userOnPageTrackerStart);
    if (currentTime - userOnPageTrackerStart > 30 * 60 * 1000) {
      window.clearInterval(userOnPageTracker);
    }
  }
}

window.addEventListener('focus', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    if (userOnPageTracker === null) {
      userOnPageTrackerStart = Date.now();
      // Interval of one minute
      userOnPageTracker = window.setInterval(trackUserOnPage, 60 * 1000);
      trackUserOnPage();
    }
  }
});

$(document).ready(function() {
  if (debug || window.location.hostname !== "localhost") {
    // This should always be true
    if (userOnPageTracker === null) {
      userOnPageTrackerStart = Date.now();
      userOnPageTracker = window.setInterval(trackUserOnPage, 60 * 1000);
      trackUserOnPage();
    }
  }
});

window.addEventListener('blur', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    window.clearInterval(userOnPageTracker);
    userOnPageTracker = null;
  }
});

var lastMouseMoveTime = 0;
window.addEventListener('mousemove', function(e) {
  const currentTime = Date.now();
  // Track scroll every thirty seconds
  if (currentTime - lastMouseMoveTime > 30 * 1000) {
    lastMouseMoveTime = currentTime;
    if (debug || window.location.hostname !== "localhost") {
      const path = window.location.pathname + window.location.search;
      if (!debug) {
        handleEvent('Mouse', lowerCase(path));
      }
    }
  }
});

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/:courseid" component={Course} />
    <Route path="/:courseid/:examtype/:id" component={Exam} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('root'));
