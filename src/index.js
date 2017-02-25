import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { handleEvent } from './utils';

import App from './App';
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

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/course" component={Course} />
    <Route path="/exam" component={App} />
  </Router>
), document.getElementById('root'));
