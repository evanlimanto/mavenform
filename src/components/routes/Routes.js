import React from 'react';
import { Route, Switch } from 'react-router';

import Course from '../course';
import Courses from '../courses';
import Exam from '../exam';
import Home from '../home';
import NotFound from '../notfound';

const Routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses" component={Courses} />
    <Route path="/:courseid/:examtype/:examid" component={Exam} />
    <Route path="/:courseid" component={Course} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
