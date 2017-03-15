import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { handleEvent } from './utils';
import { lowerCase } from 'lodash';
import Exam from './Exam';
import Course from './Course';
import Home from './Home';
import NotFound from './NotFound';

const debug = false;
var ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

function logPageView() {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    ReactGA.set({ path });
    ReactGA.pageview(path);
  }
}

window.addEventListener('scroll', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
    if (!debug) {
      handleEvent('Scroll', path);
    }
  }
});

window.addEventListener('mousemove', function(e) {
  if (debug || window.location.hostname !== "localhost") {
    const path = window.location.pathname + window.location.search;
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

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/:courseid" component={Course} />
    <Route path="/:courseid/:examtype/:id" component={Exam} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('root'));
