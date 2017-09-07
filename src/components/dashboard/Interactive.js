import React, { Component } from 'react';
import { cloneDeep, concat, filter, map, sortBy } from 'lodash';
import classnames from 'classnames';
import req from 'superagent';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import TopicCard from './TopicCard';
import TopicContainer from './TopicContainer';
import TopicListContainer from './TopicListContainer';
import DashboardNav from './DashboardNav';

class Interactive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      topicList: [],
      courseProblemSets: {},
      problemSetTopics: {},
      problemSetTopicProblems: {},

      selectedCourse: 888,
      selectedProblemSet: 4,
    };
    this.selectCourse = this.selectCourse.bind(this);
    this.getCourseList = this.getCourseList.bind(this);
    this.addProblemSet = this.addProblemSet.bind(this);
    this.selectProblemSet = this.selectProblemSet.bind(this);
    this.getProblemSetTopics = this.getProblemSetTopics.bind(this);
    this.getCourseProblemSets = this.getCourseProblemSets.bind(this);
    this.addTopicToProblemSet = this.addTopicToProblemSet.bind(this);
    this.removeTopicFromProblemSet = this.removeTopicFromProblemSet.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('/getAvailableCourses')
        .then((response) => response.json())
        .then((json) => this.setState({ courseList: json })),
      fetch('/getCourseProblemSets')
        .then((response) => response.json())
        .then((json) => this.setState({ courseProblemSets: json })),
      fetch('/getProblemSetTopics')
        .then((response) => response.json())
        .then((json) => this.setState({ problemSetTopics: json })),
      fetch('/getProblemSetTopicProblems')
        .then((response) => response.json())
        .then((json) => this.setState({ problemSetTopicProblems: json }))
    ]);
  }

  addProblemSet(e) {
    e.preventDefault();
    const courseid = this.state.selectedCourse;
    const code = this.refs.code.value;
    const label = this.refs.label.value;
    const newItem = { ps_code: code, ps_label: label };
    this.setState({
      courseProblemSets: {
        ...this.state.courseProblemSets,
        [courseid]: this.state.courseProblemSets[courseid] ? concat(this.state.courseProblemSets[courseid], newItem) : [newItem]
      }
    }, () => req.post('/addProblemSet')
      .send({ courseid, ps_code: code, ps_label: label })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        fetch('/getCourseProblemSets')
          .then((response) => response.json())
          .then((json) => this.setState({ courseProblemSets: json }))
      })
    );
  }

  selectCourse(courseid) {
    this.setState({ selectedCourse: courseid });
  }

  selectProblemSet(psid) {
    this.setState({ selectedProblemSet: psid });
  }

  getCourseList() {
    return map(sortBy(this.state.courseList, [(course) => course.school_label, (course) => course.course_code]), (course, key) =>
      <div key={key}><a className={classnames({ highlighted: course.id === this.state.selectedCourse })}
        onClick={() => this.selectCourse(course.id)}>{course.school_label} {course.course_code} - {course.course_label}</a></div>
    );
  }

  getCourseProblemSets() {
    const { courseProblemSets, selectedCourse } = this.state;
    if (!selectedCourse)
      return false;
    const form = (
      <form>
        <input type="text" placeholder="Label" ref="label" />
        <input type="text" placeholder="code" ref="code" />
        <button onClick={(e) => this.addProblemSet(e)}>SUBMIT</button>
      </form>
    );
    const problemSets = (courseProblemSets && courseProblemSets[selectedCourse]) ? map(courseProblemSets[selectedCourse],
      (ps, key) => <div key={key}><a className={classnames({ highlighted: ps.id === this.state.selectedProblemSet })}
                    onClick={() => this.selectProblemSet(ps.id)}>{ps.ps_label}</a></div>) : "No Problem Sets yet!";
    return (
      <span>
        <h1>ADD PROBLEMSET</h1>
        {form}
        <hr className="s1" />
        <h1>PROBLEMSETS</h1>
        {problemSets}
      </span>
    );
  }

  getProblemSetTopics() {
    const { problemSetTopics, selectedProblemSet } = this.state;
    if (!selectedProblemSet)
      return false;
    return (
      <span>
        <h1>TOPICS</h1>
        <TopicContainer problemSetTopics={problemSetTopics[selectedProblemSet]} addTopicToProblemSet={this.addTopicToProblemSet} removeTopicFromProblemSet={this.removeTopicFromProblemSet} />
        <hr className="s2" />
        <h1>TOPIC LIST</h1>
        <TopicListContainer problemSetTopics={problemSetTopics[selectedProblemSet]} addTopicToProblemSet={this.addTopicToProblemSet} removeTopicFromProblemSet={this.removeTopicFromProblemSet} />
      </span>
    );
  }

  addTopicToProblemSet(topic) {
    const psid = this.state.selectedProblemSet;
    const newProblemSetTopics = concat(this.state.problemSetTopics[psid] ? cloneDeep(this.state.problemSetTopics[psid]): [], topic);
    this.setState({
      problemSetTopics: {
        ...this.state.problemSetTopics,
        [psid]: newProblemSetTopics,
      }
    }, () => req.post('/addTopicToProblemSet')
      .send({ psid, topicid: topic.topicid })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
      })
    );
  }

  removeTopicFromProblemSet(topic) {
    const psid = this.state.selectedProblemSet;
    console.log(this.state.problemSetTopics[psid]);
    const newProblemSetTopics = filter(this.state.problemSetTopics[psid] ? cloneDeep(this.state.problemSetTopics[psid]) : this.state.problemSetTopics[psid], (item) => item.topicid !== topic.topicid);
    this.setState({
      problemSetTopics: {
        ...this.state.problemSetTopics,
        [psid]: newProblemSetTopics,
      }
    }, () => req.post('/removeTopicFromProblemSet')
      .send({ psid, topicid: topic.topicid })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
      })
    );
  }

  render() {
    console.log("state", this.state);
    const courseList = this.getCourseList();
    const courseProblemSets = this.getCourseProblemSets();
    const problemSetTopics = this.getProblemSetTopics();
    return (
      <div className="contentContainer">
        <DashboardNav />
        <span className="interactive-col interactive-courses">
          <h1>COURSES</h1>
          {courseList}
        </span>
        <span className="interactive-col">
          {courseProblemSets}
          <hr className="s2" />
          {problemSetTopics}
        </span>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Interactive);
