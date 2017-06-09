import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from '../course';
import { Dashboard, DashboardContent, DashboardCourses, Transcribe, Transcribed } from '../dashboard';
import Exam from '../exam';
import Home from '../home';
import { Login, Logout } from '../login';
import NotFound from '../notfound';
import Marketing from '../marketing';
import Profile from '../profile';
import Upload from '../upload';
import School from '../school';
import UserHome from '../userhome';

import { requireAuth, parseAuthHash } from '../../utils';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" render={(props) => <Login parseAuthHash={parseAuthHash} {...props} />} />
    <Route path="/logout" component={Logout} />
    <Route path="/marketing" component={Marketing} />
    <Route path="/profile" render={(props) => <Profile requireAuth={requireAuth} {...props} />} />
    <Route path="/dashboard/courses" component={DashboardCourses} />
    <Route path="/dashboard/content" component={DashboardContent} />
    <Route path="/dashboard/transcribed" component={Transcribed} />
    <Route path="/dashboard/transcribe/:examid" component={Transcribe} />
    <Route path="/dashboard/transcribe" component={Transcribe} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/upload" component={Upload} />
    <Route path="/home" render={(props) => <UserHome requireAuth={requireAuth} {...props} />} />
    <Route path="/:schoolCode/:courseCode/:examType/:termCode" component={Exam} />
    <Route path="/:schoolCode/:courseCode" component={Course} />
    <Route path="/:schoolCode" component={School} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
