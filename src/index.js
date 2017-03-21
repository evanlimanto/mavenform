import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { handleEvent } from './utils';
import { lowerCase } from 'lodash';
import Exam from './Exam';
import Course from './Course';
import Courses from './Courses';
import Home from './Home';
import NotFound from './NotFound';

const debug = process.env.NODE_ENV === "development";
const $ = require('jquery');
var ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

function logPageView() {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    ReactGA.set({ path });
    ReactGA.pageview(path);
  }
}

window.addEventListener('scroll', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    if (!debug) {
      handleEvent('Scroll', path);
    }
  }
});

window.addEventListener('mousemove', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    if (!debug) {
      handleEvent('Mouse', lowerCase(path));
    }
  }
});

window.addEventListener('click', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    if (!debug) {
      handleEvent('Click', lowerCase(path));
    }
  }
});

window.addEventListener('keypress', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    if (!debug) {
      handleEvent('KeyPress', lowerCase(path));
    }
  }
});

/* Active Users Tracking - Scroll, Focus, Blur */
window.addEventListener('scroll', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname;
    if (!debug) {
      handleEvent('Scroll', path);
    }
  }
});

var userOnPageTracker = null;
var userOnPageTrackerStart = 0;
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
    userOnPageTrackerStart = Date.now();
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
    userOnPageTrackerStart = Date.now();
    trackUserOnPage();
    userOnPageTracker = window.setInterval(trackUserOnPage, activeTrackingInterval);
  }
});

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/courses" component={Courses} />
    <Route path="/:courseid" component={Course} />
    <Route path="/:courseid/:examtype/:id" component={Exam} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('root'));
