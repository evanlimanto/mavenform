import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import App from './App';
import Course from './course';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-20131732-5');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={App}>
    </Route>
    <Route path="/ee16a" component={Course}>
    </Route>
    <Route path="/cs61c" component={Course}>
    </Route>
  </Router>
), document.getElementById('root'));
