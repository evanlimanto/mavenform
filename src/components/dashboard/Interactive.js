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
      lectureProblemSets: {},
      problemSetTopics: {},
      problemSetTopicProblems: {},

      selectedCourse: 888,
      selecdtedLecture: null,
      selectedProblemSet: null,
      selectedTopic: null,
      selectedSubTopic: null,
    };
    this.getCourseList = this.getCourseList.bind(this);
    this.getProblemSetTopics = this.getProblemSetTopics.bind(this);
    this.getLectureProblemSets = this.getLectureProblemSets.bind(this);

    this.selectCourse = this.selectCourse.bind(this);
    this.selectLecture = this.selectLecture.bind(this);
    this.selectProblemSet = this.selectProblemSet.bind(this);
    this.selectTopic = this.selectTopic.bind(this);
    this.selectSubTopic = this.selectSubTopic.bind(this);

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
      fetch('/getCourseLectures')
        .then((response) => response.json())
        .then((json) => this.setState({ courseLectures: json })),
      fetch('/getLectureProblemSets')
        .then((response) => response.json())
        .then((json) => this.setState({ lectureProblemSets: json })),
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
    this.setState({ selectedCourse: courseid, selectedLecture: null, selectedProblemSet: null, selectedTopic: null, selectedSubTopic: null });
  }

  selectLecture(lectureid) {
    this.setState({ selectedLecture: lectureid, selectedProblemSet: null, selectedTopic: null, selectedSubTopic: null });
  }

  selectProblemSet(psid) {
    this.setState({ selectedProblemSet: psid, selectedTopic: null, selectedSubTopic: null });
  }

  selectTopic(topicid) {
    this.setState({ selectedTopic: topicid, selectedSubTopic: null });
  }

  selectSubTopic(subtopicid) {
    this.setState({ selectedSubTopic: subtopicid });
  }

  addProblemSet(e) {
    e.preventDefault();
    const { selectedLecture, lectureProblemSets } = this.state;
    const ps_code = this.refs.ps_code.value;
    const ps_label = this.refs.ps_label.value;
    const ps_order = this.refs.ps_order.value;
    const paid = this.refs.paid.value;
    const self = this;
    req.post('/addProblemSet')
      .send({ lectureid: selectedLecture, ps_code, ps_label, ps_order, paid })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        const id = res.text;
        const arr = concat(
          cloneOrEmpty(lectureProblemSets[selectedLecture]),
          { id, ps_code, ps_label, ps_order, paid }
        );
        self.setState({
          lectureProblemSets: {
            ...lectureProblemSets,
            [selectedLecture]: arr
          }
        });
      })
  }

  addLecture(e) {
    e.preventDefault();
    const { selectedCourse, courseLectures } = this.state;
    const professor = this.refs.professor.value;
    const syllabus_url = this.refs.syllabus_url.value;
    const lecture_code = this.refs.lecture_code.value;
    const lecture_order = this.refs.lecture_order.value;
    const self = this;
    req.post('/addLecture')
      .send({ courseid: selectedCourse, professor, syllabus_url, lecture_code, lecture_order })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        const id = res.text;
        const arr = concat(
          cloneOrEmpty(courseLectures[selectedCourse]),
          { id, professor, syllabus_url, lecture_code, lecture_order }
        );
        self.setState({
          courseLectures: {
            ...courseLectures,
            [selectedCourse]: arr
          }
        });
      });
  }

  removeLecture(id) {
    const { selectedCourse, courseLectures } = this.state;
    const arr = filter(
      cloneOrEmpty(courseLectures[selectedCourse]),
      (ps) => ps.id !== id
    );
    this.setState({
      courseLectures: {
        ...courseLectures,
        [selectedCourse]: arr
      }
    }, () => req.post('/removeLecture')
      .send({ id })
      .end((err, res) => null)
    );
  }

  removeProblemSet(id) {
    const { lectureProblemSets, selectedLecture } = this.state;
    const arr = filter(
      cloneOrEmpty(lectureProblemSets[selectedLecture]),
      (ps) => ps.id !== id
    );
    this.setState({
      lectureProblemSets: {
        ...lectureProblemSets,
        [selectedLecture]: arr
      }
    }, () => req.post('/removeProblemSet')
      .send({ id })
      .end((err, res) => null)
    );
  }

  getCourseList() {
    return map(sortBy(this.state.courseList, [(course) => course.school_label, (course) => course.course_code]), (course, key) =>
      <div key={key}><a className={classnames({ highlighted: course.id === this.state.selectedCourse })}
        onClick={() => this.selectCourse(course.id)}>{course.school_label} {course.course_code} - {course.course_label}</a></div>
    );
  }

  getLectureProblemSets() {
    const { lectureProblemSets, selectedLecture } = this.state;
    if (!selectedLecture)
      return false;
    const form = (
      <form>
        <input type="text" placeholder="Label" ref="ps_label" />
        <input type="text" placeholder="code" ref="ps_code" />
        <input type="text" placeholder="order" ref="ps_order" />
        <select ref="paid">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button onClick={(e) => this.addProblemSet(e)}>SUBMIT</button>
      </form>
    );
    console.log(lectureProblemSets);
    const problemSets = (lectureProblemSets && lectureProblemSets[selectedLecture]) ? map(lectureProblemSets[selectedLecture],
      (ps, key) => (
        <div key={key}>
          <a className={classnames({ highlighted: ps.id === this.state.selectedProblemSet })}
            onClick={() => this.selectProblemSet(ps.id)}>{ps.ps_label} - {ps.ps_code} - paid: {ps.paid ? "Yes" : "No"} - order: {ps.ps_order}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeProblemSet(ps.id)}>Delete</a>
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
    const { selectedCourse, selectedProblemSet, problemSetTopics } = this.state;
    const topic_label = this.refs.topic_label.value;
    const topic_code = this.refs.topic_code.value;
    const topic_order = this.refs.topic_order.value;
    const self = this;
    req.post('/addTopicToProblemSet')
      .send({ courseid: selectedCourse, topic_label, topic_code, topic_order, psid: selectedProblemSet })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        const id = res.text;
        const arr = concat(
          cloneOrEmpty(problemSetTopics[selectedProblemSet]),
          { id, topic_label, topic_code, topic_order }
        );
        self.setState({
          problemSetTopics: {
            ...problemSetTopics,
            [selectedProblemSet]: arr
          }
        });
      });
  }

  removeTopicFromProblemSet(id) {
    const { selectedProblemSet, problemSetTopics } = this.state;
    const arr = filter(
      cloneOrEmpty(problemSetTopics[selectedProblemSet]),
      (topic) => topic.id !== id
    );
    this.setState({
      problemSetTopics: {
        ...problemSetTopics,
        [selectedProblemSet]: arr
      }
    }, () => req.post('/removeTopicFromProblemSet')
      .send({ id })
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
          <a className={classnames({ highlighted: topic.id === selectedTopic })}
            onClick={() => this.selectTopic(topic.id)}>{topic.topic_label}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeTopicFromProblemSet(topic.id)}>Delete</a>
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
    const { selectedTopic, topicSubTopics } = this.state;
    const subtopic_label = this.refs.subtopic_label.value;
    const subtopic_code = this.refs.subtopic_code.value;
    const subtopic_order = this.refs.subtopic_order.value;
    const self = this;
    req.post('/addSubTopicToTopic')
      .send({ pstid: selectedTopic, subtopic_label, subtopic_code, subtopic_order })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        const id = res.text;
        const arr = concat(
          cloneOrEmpty(topicSubTopics[selectedTopic]),
          { id, subtopic_label, subtopic_code, subtopic_order }
        );
        self.setState({
          topicSubTopics: {
            ...topicSubTopics,
            [selectedTopic]: arr
          }
        });
      })
  }

  removeSubTopicFromTopic(id) {
    const { selectedTopic, topicSubTopics } = this.state;
    const arr = filter(
      cloneOrEmpty(topicSubTopics[selectedTopic]),
      (subtopic) => subtopic.id !== id
    );
    this.setState({
      topicSubTopics: {
        ...topicSubTopics,
        [selectedTopic]: arr
      }
    }, () => req.post('/removeSubTopicFromTopic')
      .send({ id })
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
          <a className={classnames({ highlighted: subtopic.id === selectedSubTopic })}
            onClick={() => this.selectSubTopic(subtopic.id)}>{subtopic.subtopic_label}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeSubTopicFromTopic(subtopic.id)}>Delete</a>
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
    const { selectedCourse, selectedTopic, selectedSubTopic, subTopicProblems } = this.state;
    const problemid = this.refs.problem.value;
    const problem_order = this.refs.problem_order.value;
    const self = this;
    req.post('/addProblemToSubTopic')
      .send({ problemid, problem_order, pssid: selectedSubTopic })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        const id = res.text;
        const arr = concat(
          cloneOrEmpty(subTopicProblems[selectedSubTopic]),
          { problemid, problem_order, id }
        );
        self.setState({
          subTopicProblems: {
            ...subTopicProblems,
            [selectedSubTopic]: arr,
          }
        });
      });
  }

  removeProblemFromSubTopic(id) {
    const { subTopicProblems, selectedSubTopic } = this.state;
    const arr = filter(
      cloneOrEmpty(subTopicProblems[selectedSubTopic]),
      (problem) => problem.id !== id
    );
    this.setState({
      subTopicProblems: {
        ...subTopicProblems,
        [selectedSubTopic]: arr
      }
    }, () => req.post('/removeProblemFromSubTopic')
      .send({ id })
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
          <a href={`/dashboard/problem/${problem.problemid}`} target="_blank">{problem.problemid}</a>&nbsp;
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

  getCourseLectures() {
    const { courseLectures, selectedCourse } = this.state;
    if (!selectedCourse)
      return false;
    const form = (
      <form>
        <input type="text" placeholder="Professor" ref="professor" />
        <input type="text" placeholder="Syllabus URL" ref="syllabus_url" />
        <input type="text" placeholder="code" ref="lecture_code" />
        <input type="text" placeholder="order" ref="lecture_order" />
        <button onClick={(e) => this.addLecture(e)}>SUBMIT</button>
      </form>
    );
    const lectures = (courseLectures && courseLectures[selectedCourse]) ? map(courseLectures[selectedCourse],
      (lecture, key) => (
        <div key={key}>
          <a className={classnames({ highlighted: lecture.id === this.state.selectedLecture })}
            onClick={() => this.selectLecture(lecture.id)}>{lecture.lecture_code} - {lecture.professor} | Syllabus: {lecture.syllabus_url} | Order: {lecture.lecture_order}</a>&nbsp;
          <a className="admin-function" onClick={() => this.removeLecture(lecture.id)}>Delete</a>
        </div>)) : "No Lectures yet!";
    return (
      <span>
        <h1>ADD LECTURE</h1>
        {form}
        <hr className="s1" />
        <h1>LECTURES</h1>
        {lectures}
      </span>
    );
  }

  render() {
    console.log(this.state);
    const courseList = this.getCourseList();
    const courseLectures = this.getCourseLectures();
    const lectureProblemSets = this.getLectureProblemSets();
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
          {courseLectures}
          <hr className="s2" />
          {lectureProblemSets}
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
