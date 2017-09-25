import React, { Component } from 'react';
import { includes, forEach, has, toInteger, map } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Navbar from '../navbar';
import Footer from '../footer';
import { Modals } from '../modal';

import { canUseDOM, courseCodeToLabel } from '../../utils';
import { showPaymentsModal, updateUnlockedSets } from '../../actions';

const cookies = canUseDOM ? require("browser-cookies") : null;

function getGreenToRed(percent){
  let r, g;
  r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
  g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
  r = r.toString(16)
  g = g.toString(16)
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  return r + g + "00";
}

class TopicSetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: (cookies ? (JSON.parse(cookies.get('showTabs')) || [false, false, false]) : [false, false, false]),
      lectureInfo: null,
      lectureProblemSets: {},
      problemSetTopics: {},
      topicSubTopics: {},
      completedProblemsCount: {},
    };
    this.getCategorizedTopics = this.getCategorizedTopics.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    if (!canUseDOM)
      return;
    const { schoolCode, courseCode } = this.props;
    const auth_user_id = this.props.auth.getProfile().user_id;
    Promise.all([
      fetch(`/getLectureInfo/${auth_user_id}/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ lectureInfo: json })),
      fetch(`/getLectureProblemSetsByCode/${auth_user_id}/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ lectureProblemSets: json })),
      fetch(`/getProblemSetTopicsByCode/${auth_user_id}/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ problemSetTopics: json })),
      fetch(`/getCompletedProblemsCount/${auth_user_id}/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ completedProblemsCount: json })),
      fetch(`/getTopicSubTopicsByCode/${auth_user_id}/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ topicSubTopics: json })),
      fetch(`/getUnlockedSetsByUser/${auth_user_id}`)
        .then((response) => response.json())
        .then((json) => this.props.updateUnlockedSets(json)),
    ])
  }

  toggleShow(index) {
    const show = this.state.show;
    const newShow = [show[0], show[1], show[2]];
    newShow[index] = !newShow[index];
    this.setState({ show: newShow }, () => cookies.set('showTabs', JSON.stringify(newShow), { expires: 1 }));
  }

  getCategorizedTopics() {
    const dict = {};
    forEach(this.props.topicsList, (item) => {
      if (!has(dict, item.topic))
        dict[item.topic] = [];
      dict[item.topic].push(item);
    });
    return dict;
  }

  render() {
    const { courseCode, schoolCode } = this.props;
    if (!this.state.lectureInfo || !this.state.lectureProblemSets || !this.state.problemSetTopics || !this.state.topicSubTopics || !this.state.completedProblemsCount)
      return (
        <div>
          <Navbar interactive={true} links={[`${schoolCode}`, `${courseCode}`, "interactive"]} navbarLabels={[this.props.labels.schools[schoolCode], courseCodeToLabel(courseCode), "Interactive Study"]} />
          <h1>Loading..</h1>
        </div>
      );

    const { lectureInfo } = this.state;
    const containers = map(this.state.lectureProblemSets, (set, index) => {
      let topicItems = map(this.state.problemSetTopics[set.id], (topic, topicKey) => {
        const arr = map(this.state.topicSubTopics[topic.id], (subtopic, subtopicKey) => {
          const percent = Math.floor(toInteger(this.state.completedProblemsCount[subtopic.id] || 0) / subtopic.problem_count * 100.0);
          const hexColor = "#" + getGreenToRed(percent);
          return (
            <div key={subtopicKey} className="subtopic">
              <Line className="progress" percent={percent} strokeWidth="4" strokeColor={hexColor} />
              <hr className="s1" />
              <Link to={`/${schoolCode}/${courseCode}/interactive/${subtopic.subtopic_code}`}>{subtopic.subtopic_label}</Link>
              <hr className="s0-5" />
              <label>({this.state.completedProblemsCount[subtopic.id] || 0}/{subtopic.problem_count})</label>
            </div>
          );
        });

        return (
          <div key={topicKey} className="topic-container">
            <div className="topic">{topic.topic_label}</div>
            <hr className="s2" />
            {arr}
          </div>
        );
      });
      if (topicItems.length === 0)
        topicItems = <div><hr className="s4"/><h1>In Progress</h1><p>We apologize for the inconvenience. We are still finalizing this problem set. It will be fully available <span className="blue-text">2 weeks</span> before its corresponding exam.</p><hr className="s1"/></div>;
      const isUnlocked = !set.paid || includes(this.props.unlockedSets, set.id);
      return (
        <span key={index}>
          <div className="int-box int-box-set">
            <p className="int-helper">
              {isUnlocked ? (<i className="fa fa-check-circle" aria-hidden="true"></i>) : (<i className="fa fa-lock" aria-hidden="true"></i>)}
              &nbsp;&nbsp;&nbsp;
              <span className="int-highlight">{set.ps_label} </span>
              Review
            </p>
            <button className={classnames({"int-button": true, "gray": this.state.show[index] & isUnlocked, "int-button-white": !this.state.show[index] & isUnlocked, "blue": !isUnlocked})}
              onClick={() => isUnlocked ? this.toggleShow(index) : this.props.showPaymentsModal(set.id, set.ps_label, schoolCode, courseCode)}>
              {isUnlocked ? (this.state.show[index] ? "Hide" : "View") : "Unlock"}
            </button>
          </div>
          {this.state.show[index] ? <div className="int-box-white-container">
            <div className="int-box int-box-white">
              {topicItems}
            </div>
          </div> : null}
          <hr className="s2"/>
        </span>
      );
    })
    return (
      <div>
        <Modals />
        <Navbar interactive={true} links={[`${schoolCode}`, `${courseCode}`, "interactive"]} navbarLabels={[this.props.labels.schools[schoolCode], courseCodeToLabel(courseCode), "Interactive Study"]} />
        <div className="container info-container">
          <hr className="s5" />
          <div className="mobile-warning int-box"><strong>Note:</strong> Interactive Mode is in beta and may not be fully optimized for your screen size yet. It will be soon!</div>
          <img className="info-img" src="/img/interactive.svg" alt="subject-logo" />
          <div className="info">
            <h4 className="info-title">{courseCodeToLabel(courseCode)} {lectureInfo.lecture_code}</h4>
            <hr className="s1" />
            <h5 className="info-subtitle">{lectureInfo.professor}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{lectureInfo.term_label}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a className="school-link" href={lectureInfo.syllabus_url} target="_blank">Syllabus</a></h5>
            <hr className="s1" />
            <hr className="s0-5" />
            <p className="info-text">
              Interactive study guide personalized to your class and professor.
            </p>
          </div>
        </div>
        <hr className="s5" />
        <div className="container interactive-container">
          {containers}
        </div>
        <hr className="s7-5" />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topicsList: state.topicsList,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    auth: state.auth,
    unlockedSets: state.unlockedSets,
    labels: has(state.labels, 'schools') ? state.labels : { schools: {} },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUnlockedSets: (sets) => dispatch(updateUnlockedSets(sets)),
    showPaymentsModal: (id, ps_label, schoolCode, courseCode) => dispatch(showPaymentsModal(id, ps_label, schoolCode, courseCode)),
    dispatch
  };
};

const TopicSet = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicSetComponent);

export default TopicSet;
