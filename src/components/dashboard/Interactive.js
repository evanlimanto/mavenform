import React, { Component } from 'react';

import DashboardNav from './DashboardNav';

class Interactive extends Component {
  componentDidMount() {
    Promise.all([
      fetch('/getAvailableCourses')
        .then((response) => response.json())
        .then((json) => this.setState({ courseList: json })),
      fetch('/getTopics')
        .then((response) => response.json())
        .then((json) => this.setState({ topicList: json })),
    ]);
  }

  render() {
    return (
      <DashboardNav />
    );
  }
}

export default Interactive;
