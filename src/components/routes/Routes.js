import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from '../course';
import Courses from '../courses';
import Exam from '../exam';
import Home from '../home';
import Login from '../login';
import NotFound from '../notfound';
import Profile from '../profile';
import Upload from '../upload';

const requireAuth = (auth, history) => {
  if (!auth.loggedIn()) {
    history.push("/login");
  }
};

const parseAuthHash = (auth, location) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.parseHash(location.hash);
  }
};

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/courses" component={Courses} />
    <Route path="/login" render={(props) => <Login parseAuthHash={parseAuthHash} {...props} />} />
    <Route path="/profile" render={(props) => <Profile requireAuth={requireAuth} {...props} />} />
    <Route path="/upload" component={Upload} />
    <Route path="/:courseid/:examtype/:examid" component={Exam} />
    <Route path="/:courseid" component={Course} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
