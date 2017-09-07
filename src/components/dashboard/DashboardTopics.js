import React, { Component } from 'react';
import { map, sortBy } from 'lodash';
import req from 'superagent';

import DashboardNav from './DashboardNav';
require('../../css/Dashboard.css');

class DashboardTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: []
    };
    this.addTopic = this.addTopic.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('/getTopics')
        .then((response) => response.json())
        .then((json) => this.setState({ topicList: json })),
      fetch('/getSubjects')
        .then((response) => response.json())
        .then((json) => this.setState({ subjectList: json })),
    ]);
  }

  addTopic(e) {
    e.preventDefault();
    const topic = this.refs.topic.value;
    const concept = this.refs.concept.value;
    const code = this.refs.code.value;
    const subjectid = this.refs.subject.value;
    req.post('/addTopic')
      .send({ topic, concept, code, subjectid })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        document.location = "/dashboard/topics";
      });
  }

  render() {
    const coursesList = map(sortBy(this.state.topicList, [(topic) => topic.topic, (topic) => topic.concept]), (topic, key) => {
      return (
        <span key={key}>
          <div>{topic.topic} - {topic.concept}</div>
        </span>
      );
    });
    const subjectSelect = (
      <select ref="subject">
        {map(sortBy(this.state.subjectList, [(subject) => subject.subject_label]), (subject, key) =>
          <option key={key} value={subject.id}>{subject.subject_label}</option>)}
      </select>
    );
    return (
      <div className="contentContainer">
        <DashboardNav />
        <form style={{"padding" : "5px"}}>
          <input type="text" ref="topic" placeholder="Topic" />
          <input type="text" ref="concept" placeholder="Concept" />
          <input type="text" ref="code" placeholder="Code" />
          {subjectSelect}
          <button onClick={(e) => this.addTopic(e)}>ADD TOPIC</button>
        </form>
        <div style={{"padding" : "5px"}}>
          <h1>TOPICS</h1>
          {coursesList}
        </div>
      </div>
    );
  }
}

export default DashboardTopics;
