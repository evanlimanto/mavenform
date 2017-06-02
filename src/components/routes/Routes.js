import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from '../course';
import Courses from '../courses';
import { Dashboard, DashboardContent, ImageUpload, Transcribe } from '../dashboard';
import Exam from '../exam';
import Home from '../home';
import { Login, Logout } from '../login';
import NotFound from '../notfound';
import Profile from '../profile';
import Upload from '../upload';

import { requireAuth, parseAuthHash } from '../../utils';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/courses" component={Courses} />
    <Route path="/login" render={(props) => <Login parseAuthHash={parseAuthHash} {...props} />} />
    <Route path="/logout" component={Logout} />
    <Route path="/profile" render={(props) => <Profile requireAuth={requireAuth} {...props} />} />
    <Route path="/dashboard/content" component={DashboardContent} />
    <Route path="/dashboard/imageupload" component={ImageUpload} />
    <Route path="/dashboard/transcribe" component={Transcribe} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/upload" component={Upload} />
    <Route path="/:courseid/:examtype/:examid" component={Exam} />
    <Route path="/:courseid" component={Course} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
