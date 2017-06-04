import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from '../course';
import Courses from '../courses';
import Dashboard from '../dashboard';
import Exam from '../exam';
import Home from '../home';
import { Login, Logout } from '../login';
import NotFound from '../notfound';
import Profile from '../profile';
import Upload from '../upload';

/* mockups */
import { School, UserHome, Marketing } from '../mockups';

import { requireAuth, parseAuthHash } from '../../utils';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/courses" component={Courses} />
    <Route path="/login" render={(props) => <Login parseAuthHash={parseAuthHash} {...props} />} />
    <Route path="/logout" component={Logout} />
    <Route path="/profile" render={(props) => <Profile requireAuth={requireAuth} {...props} />} />
    <Route path="/dashboard" render={(props) => <Dashboard requireAuth={requireAuth} {...props} />} />
    <Route path="/upload" component={Upload} />
    
    {/* mockups */}
    <Route path="/school" component={School} />
    <Route path="/userhome" component={UserHome} />
    <Route path="/marketing" component={Marketing} />

    <Route path="/:courseid/:examtype/:examid" component={Exam} />
    <Route path="/:courseid" component={Course} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
