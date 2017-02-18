import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import App from './App';
import feedback from './feedback';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
    <Route path="feedback" component={feedback}>
    </Route>
  </Router>
), document.getElementById('root'));
