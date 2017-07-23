import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { map } from 'lodash';

import Course from '../course';
import { Dashboard, DashboardContent, DashboardCourses, DashboardComments, Transcribe, Transcribed } from '../dashboard';
import Exam from '../exam';
import Home from '../home';
import { Login, Logout, SecretSignup, Signup } from '../login';
import NotFound from '../notfound';
import { AppSubmitted, Marketing, MarketingApps } from '../marketing';
import { Math, MathContent } from '../math';
import Profile from '../profile';
import Upload from '../upload';
import School from '../school';
import UserHome from '../userhome';
import Waitlisted from '../waitlisted';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/signup', component: Signup },
  { path: '/marketing', component: Marketing },
  { path: '/profile', component: Profile },
  { path: '/dashboard/comments', component: DashboardComments },
  { path: '/dashboard/courses', component: DashboardCourses },
  { path: '/dashboard/content', component: DashboardContent },
  { path: '/dashboard/transcribed', component: Transcribed },
  { path: '/dashboard/transcribe', component: Transcribe },
  { path: '/dashboard', component: Dashboard },
  { path: '/waitlisted', component: Waitlisted },
  { path: '/appsubmitted', component: AppSubmitted },
  { path: '/s3cr3tsignup', component: SecretSignup },
  { path: '/m4rk3t1ng4pp5', component: MarketingApps },
  { path: '/upload', component: Upload },
  { path: '/math/:topic', component: MathContent },
  { path: '/math', component: Math },
  { path: '/home', component: UserHome },
  { path: '/:schoolCode/:courseCode/:examType/:termCode', component: Exam },
  { path: '/:schoolCode/:courseCode/:topic', component: MathContent },
  { path: '/:schoolCode/:courseCode', component: Course },
  { path: '/:schoolCode', component: School },
  { path: '/', component: NotFound },
];

const Routes = (
  <Switch>
    {map(routes, (route) => <Route path={route.path} component={route.component} exact={route.exact} />)}
  </Switch>
);

export default Routes;
