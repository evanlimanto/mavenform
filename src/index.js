import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

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

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={Home} />
    <Route path="/course" component={Course} />
    <Route path="/exam" component={App} />
  </Router>
), document.getElementById('root'));
