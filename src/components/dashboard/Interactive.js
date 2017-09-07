import React, { Component } from 'react';
import { cloneDeep, concat, map, sortBy } from 'lodash';
import classnames from 'classnames';
import req from 'superagent';

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

      selectedCourse: null,
    };
    this.addProblemSet = this.addProblemSet.bind(this);
    this.getCourseList = this.getCourseList.bind(this);
    this.getCourseProblemSets = this.getCourseProblemSets.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('/getAvailableCourses')
        .then((response) => response.json())
        .then((json) => this.setState({ courseList: json })),
      fetch('/getTopics')
        .then((response) => response.json())
        .then((json) => this.setState({ topicList: json })),
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
      })
    );
  }

  selectCourse(courseid) {
    this.setState({ selectedCourse: courseid });
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
      (ps, key) => <div key={key}><a>{ps.ps_label}</a></div>) : "No Problem Sets yet!";
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

  render() {
    const courseList = this.getCourseList();
    const courseProblemSets = this.getCourseProblemSets();
    return (
      <div className="contentContainer">
        <DashboardNav />
        <span className="interactive-col interactive-courses">
          <h1>COURSES</h1>
          {courseList}
        </span>
        <span className="interactive-col">
          {courseProblemSets}
        </span>
      </div>
    );
  }
}

export default Interactive;
