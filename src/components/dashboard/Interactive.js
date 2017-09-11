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

function cloneOrEmpty(arr) {
  if (!arr)
    return [];
  return cloneDeep(arr);
}

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
      selectedProblemSet: null,
      selectedTopic: null,
      selectedSubTopic: null,
    };
    this.getCourseList = this.getCourseList.bind(this);
    this.getProblemSetTopics = this.getProblemSetTopics.bind(this);
    this.getCourseProblemSets = this.getCourseProblemSets.bind(this);

    this.selectCourse = this.selectCourse.bind(this);
    this.selectTopic = this.selectTopic.bind(this);
    this.selectProblemSet = this.selectProblemSet.bind(this);

    this.addProblemSet = this.addProblemSet.bind(this);
    this.removeProblemSet = this.removeProblemSet.bind(this);

    this.addTopicToProblemSet = this.addTopicToProblemSet.bind(this);
    this.removeTopicFromProblemSet = this.removeTopicFromProblemSet.bind(this);

    this.addSubTopicToTopic = this.addSubTopicToTopic.bind(this);
    this.removeSubTopicFromTopic = this.removeSubTopicFromTopic.bind(this);

    this.addProblemToSubTopic = this.addProblemToSubTopic.bind(this);
    this.removeProblemFromSubTopic = this.removeProblemFromSubTopic.bind(this);
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
      fetch('/getTopicSubTopics')
        .then((response) => response.json())
        .then((json) => this.setState({ topicSubTopics: json })),
      fetch('/getSubTopicProblems')
        .then((response) => response.json())
        .then((json) => this.setState({ subTopicProblems: json }))
    ]);
  }

  selectCourse(courseid) {
    this.setState({ selectedCourse: courseid, selectedProblemSet: null, selectedTopic: null, selectedSubTopic: null });
  }

  selectProblemSet(ps_code) {
    this.setState({ selectedProblemSet: ps_code, selectedTopic: null, selectedSubTopic: null });
  }

  selectTopic(topic_code) {
    this.setState({ selectedTopic: topic_code, selectedSubTopic: null });
  }

  selectSubTopic(subtopic_code) {
    this.setState({ selectedSubTopic: subtopic_code });
  }

  addProblemSet(e) {
    e.preventDefault();
    const { selectedCourse, courseProblemSets } = this.state;
    const ps_code = this.refs.ps_code.value;
    const ps_label = this.refs.ps_label.value;
    const ps_order = this.refs.ps_order.value;
    const arr = concat(
      cloneOrEmpty(courseProblemSets[selectedCourse]),
      { courseid: selectedCourse, ps_code, ps_label, ps_order }
    );
    this.setState({
      courseProblemSets: {
        ...courseProblemSets,
        [selectedCourse]: arr
      }
    }, () => req.post('/addProblemSet')
      .send({ courseid: selectedCourse, ps_code, ps_label, ps_order })
      .end((err, res) => null)
    );
  }

  removeProblemSet(ps_code) {
    const { courseProblemSets, selectedCourse } = this.state;
    const arr = filter(
      cloneOrEmpty(courseProblemSets[selectedCourse]),
      (ps) => ps.ps_code !== ps_code
    );
    this.setState({
      courseProblemSets: {
        ...courseProblemSets,
        [selectedCourse]: arr
      }
    }, () => req.post('/removeProblemSet')
      .send({ courseid: selectedCourse, ps_code })
      .end((err, res) => null)
    );
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
        <input type="text" placeholder="Label" ref="ps_label" />
        <input type="text" placeholder="code" ref="ps_code" />
        <input type="text" placeholder="order" ref="ps_order" />
        <button onClick={(e) => this.addProblemSet(e)}>SUBMIT</button>
      </form>
    );
    const problemSets = (courseProblemSets && courseProblemSets[selectedCourse]) ? map(courseProblemSets[selectedCourse],
      (ps, key) => (
        <div key={key}>
          <a className={classnames({ highlighted: ps.ps_code === this.state.selectedProblemSet })}
            onClick={() => this.selectProblemSet(ps.ps_code)}>{ps.ps_label}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeProblemSet(ps.ps_code)}>Delete</a>
        </div>)) : "No Problem Sets yet!";
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

  addTopicToProblemSet(e) {
    e.preventDefault();
    const { selectedProblemSet, problemSetTopics } = this.state;
    const topic_label = this.refs.topic_label.value;
    const topic_code = this.refs.topic_code.value;
    const topic_order = this.refs.topic_order.value;
    const arr = concat(
      cloneOrEmpty(problemSetTopics[selectedProblemSet]),
      { topic_label, topic_code, topic_order }
    );
    this.setState({
      problemSetTopics: {
        ...problemSetTopics,
        [selectedProblemSet]: arr
      }
    }, () => req.post('/addTopicToProblemSet')
      .send({ topic_label, topic_code, topic_order, ps_code: selectedProblemSet })
      .end((err, res) => null)
    );
  }

  removeTopicFromProblemSet(topic_code) {
    const { selectedProblemSet, problemSetTopics } = this.state;
    const arr = filter(
      cloneOrEmpty(problemSetTopics[selectedProblemSet]),
      (topic) => topic.topic_code !== topic_code
    );
    this.setState({
      problemSetTopics: {
        ...problemSetTopics,
        [selectedProblemSet]: arr
      }
    }, req.post('/removeTopicFromProblemSet')
      .send({ psid: selectedProblemSet, topic_code })
      .end((err, res) => null)
    );
  }

  getProblemSetTopics() {
    const { selectedProblemSet, selectedTopic, problemSetTopics } = this.state;
    if (!selectedProblemSet)
      return false;
    const form = (
      <form>
        <input type="text" ref="topic_label" placeholder="Topic" />
        <input type="text" ref="topic_code" placeholder="Code" />
        <input type="text" ref="topic_order" placeholder="Order" />
        <button onClick={(e) => this.addTopicToProblemSet(e)}>ADD</button>
      </form>
    );
    const topics = (problemSetTopics && problemSetTopics[selectedProblemSet]) ? map(problemSetTopics[selectedProblemSet],
      (topic, key) => (
        <div key={key}>
          <a className={classnames({ highlighted: topic.topic_code === selectedTopic })}
            onClick={() => this.selectTopic(topic.topic_code)}>{topic.topic_label}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeTopicFromProblemSet(topic.topic_code)}>Delete</a>
        </div>)) : "No Topics yet!";
    return (
      <span>
        <h1>ADD TOPIC</h1>
        {form}
        <hr className="s1" />
        <h1>TOPICS</h1>
        {topics}
      </span>
    );
  }

  addSubTopicToTopic(e) {
    e.preventDefault();
    const { topicSubTopics, selectedTopic } = this.state;
    const subtopic_label = this.refs.subtopic_label.value;
    const subtopic_code = this.refs.subtopic_code.value;
    const subtopic_order = this.refs.subtopic_order.value;
    const arr = concat(
      cloneOrEmpty(topicSubTopics[selectedTopic]),
      { subtopic_label, subtopic_code, subtopic_order }
    );
    this.setState({
      topicSubTopics: {
        ...topicSubTopics,
        [selectedTopic]: arr
      }
    }, () => req.post('/addSubTopicToTopic')
      .send({ subtopic_label, subtopic_code, subtopic_order, pstid: selectedTopic })
      .end((err, res) => null)
    );
  }

  removeSubTopicFromTopic(subtopic_code) {
    const { selectedTopic, topicSubTopics } = this.state;
    const arr = filter(
      cloneOrEmpty(topicSubTopics[selectedTopic]),
      (subtopic) => subtopic.subtopic_code !== subtopic_code
    );
    this.setState({
      topicSubTopics: {
        ...topicSubTopics,
        [selectedTopic]: arr
      }
    }, () => req.post('/removeSubTopicFromTopic')
      .send({ pstid: selectedTopic, subtopic_code })
      .end((err, res) => null)
    );
  }

  getTopicSubTopics() {
    const { selectedTopic, selectedSubTopic, topicSubTopics } = this.state;
    if (!selectedTopic)
      return false;
    const form = (
      <form>
        <input type="text" ref="subtopic_label" placeholder="Subtopic" />
        <input type="text" ref="subtopic_code" placeholder="Code" />
        <input type="text" ref="subtopic_order" placeholder="Order" />
        <button onClick={(e) => this.addSubTopicToTopic(e)}>ADD</button>
      </form>
    );
    const subtopics = (topicSubTopics && topicSubTopics[selectedTopic]) ? map(topicSubTopics[selectedTopic],
      (subtopic, key) => (
        <div key={key}>
          <a className={classnames({ highlighted: subtopic.subtopic_code === selectedSubTopic })}
            onClick={() => this.selectSubTopic(subtopic.subtopic_code)}>{subtopic.subtopic_label}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeSubTopicFromTopic(subtopic.subtopic_code)}>Delete</a>
        </div>
      )) : "No Subtopics yet!";
    return (
      <div>
        <h1>ADD SUBTOPIC</h1>
        {form}
        <hr className="s1" />
        <h1>SUBTOPICS</h1>
        {subtopics}
      </div>
    );
  }

  addProblemToSubTopic(e) {
    e.preventDefault();
    const { selectedSubTopic, subTopicProblems } = this.state;
    const problemid = this.refs.problem.value;
    const problem_order = this.refs.problem_order.value;
    const pssid = this.state.selectedSubTopic;
    const arr = concat(
      cloneOrEmpty(subTopicProblems[selectedSubTopic]),
      { problemid, problem_order, pssid }
    );
    this.setState({
      subTopicProblems: {
        ...subTopicProblems,
        [selectedSubTopic]: arr,
      }
    }, () => req.post('/addProblemToSubTopic')
      .send({ problemid, problem_order, pssid })
      .end((err, res) => null)
    );
  }

  removeProblemFromSubTopic(problemid) {
    const { subTopicProblems, selectedSubTopic } = this.state;
    const arr = filter(
      cloneOrEmpty(subTopicProblems[selectedSubTopic]),
      (problem) => problem.id !== problemid
    );
    this.setState({
      subTopicProblems: {
        ...subTopicProblems,
        [selectedSubTopic]: arr
      }
    }, () => req.post('/removeProblemFromSubTopic')
      .send({ pssid: selectedSubTopic, problemid })
      .end((err, res) => null)
    );
  }

  getSubTopicProblems() {
    const { selectedSubTopic, subTopicProblems } = this.state;
    if (!selectedSubTopic)
      return false;
    const form = (
      <form>
        <input type="text" ref="problem" placeholder="Problem ID" />
        <input type="text" ref="problem_order" placeholder="Order" />
        <button onClick={(e) => this.addProblemToSubTopic(e)}>ADD</button>
      </form>
    );
    const problems = (subTopicProblems && subTopicProblems[selectedSubTopic]) ? map(subTopicProblems[selectedSubTopic],
      (problem, key) => (
        <div key={key}>
          <a href={`/dashboard/problem/${problem.id}`}>{problem.id}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeProblemFromSubTopic(problem.id)}>Delete</a>
        </div>
      )) : "No Problems yet!";
    return (
      <div>
        <h1>ADD PROBLEM</h1>
        {form}
        <hr className="s1" />
        <h1>PROBLEMS</h1>
        {problems}
      </div>
    );
  }

  render() {
    const courseList = this.getCourseList();
    const courseProblemSets = this.getCourseProblemSets();
    const problemSetTopics = this.getProblemSetTopics();
    const topicSubTopics = this.getTopicSubTopics();
    const subTopicProblems = this.getSubTopicProblems();
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
          <hr className="s2" />
          {topicSubTopics}
          <hr className="s2" />
          {subTopicProblems}
        </span>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Interactive);
