import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { handleEvent } from './utils';

import Exam from './Exam';
import Course from './Course';
import Home from './Home';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

function logPageView() {
  if (window.location.hostname !== "localhost") {
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
    if (window.location.hostname !== "localhost") {
      const path = window.location.pathname + window.location.search;
      handleEvent('Scroll', path);
    }
  }
});

function trackUserOnPage() {
  if (window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    handleEvent('Active', path);
  }
}

var userOnPageTracker = null;
window.addEventListener('focus', function(e) {
  if (window.location.hostname !== "localhost") {
    userOnPageTracker = window.setInterval(trackUserOnPage, 30 * 1000);
  }
});

window.addEventListener('blur', function(e) {
  if (window.location.hostname !== "localhost") {
    window.clearInterval(userOnPageTracker);
  }
});

var lastMouseMoveTime = 0;
window.addEventListener('mousemove', function(e) {
  const currentTime = Date.now();
  // Track scroll every thirty seconds
  if (currentTime - lastMouseMoveTime > 30 * 1000) {
    lastMouseMoveTime = currentTime;
    if (window.location.hostname !== "localhost") {
      const path = window.location.pathname + window.location.search;
      handleEvent('Mouse', path);
    }
  }
});

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/:courseid" component={Course} />
    <Route path="/:courseid/:examtype-:examid" component={Exam} />
  </Router>
), document.getElementById('root'));
