import React, { Component } from 'react';
import { forEach, has, map, range } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import hash from 'string-hash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navbar from '../navbar';
import Footer from '../footer';

import { BASE_URL, courseCodeToLabel } from '../../utils';
import { updateTopicsList } from '../../actions';

require('../../css/TopicSet.css');

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
      show: [false, false, false],
    };
    this.getCategorizedTopics = this.getCategorizedTopics.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    TopicSetComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { schoolCode, courseCode } = props;
    return fetch(`${BASE_URL}/getAvailableTopics/${schoolCode}/${courseCode}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateTopicsList(json)));
  }

  toggleShow(index) {
    const show = this.state.show;
    const newShow = [show[0], show[1], show[2]];
    newShow[index] = !newShow[index];
    this.setState({ show: newShow });
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
    const topicsDict = this.getCategorizedTopics();
    const topicItems = map(this.getCategorizedTopics(), (items, topic) => {
      const arr = map(items, (item) => {
        const percent = hash(item.concept) % 100;
        const hexColor = "#" + getGreenToRed(percent);
        return (
          <div key={item.concept} className="subtopic">
            <Line className="progress" percent={percent} strokeWidth="4" strokeColor={hexColor} />
            <hr className="s1" />
            <Link to={`/interactive/${schoolCode}/${courseCode}/${item.code}`}>{item.concept}</Link>
            <hr className="s0-5" />
            <label>({Math.floor(percent/100 * item.count)}/{item.count}) &nbsp;</label>
          </div>
        );
      });

      return (
        <div key={topic} className="topic-container">
          <div className="topic">{topic}</div>
          <hr className="s2" />
          {arr}
        </div>
      );
    });
    return (
      <div>
        <Navbar interactive={true} links={["courses", `interactive/${schoolCode}/${courseCode}`]} navbarLabels={["Courses", courseCodeToLabel(courseCode)]} />
        <div className="container info-container">
          <hr className="s5" />
          <img className="info-img" src="/img/interactive.svg" alt="subject-logo" />
          <div className="info">
            <h4 className="info-title">MATH 53 001</h4>
            <hr className="s1" />
            <h5 className="info-subtitle">Interactive Study Guide&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Auroux&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a className="school-link">Syllabus</a></h5>
            <hr className="s1" />
            <hr className="s0-5" />
            <p className="info-text">
              Interactive problem sets personalized to your class and professor.
            </p>
          </div>
        </div>
        <hr className="s5" />
        <div className="container interactive-container">
          <div className="int-box int-box-top">
            <p className="int-helper">
              <i className="fa fa-check-circle" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;
              <span className="int-highlight">Midterm 1 </span>
              Review
            </p>
            <button className={classnames({"int-button": true, "gray": this.state.show[0], "int-button-white": !this.state.show[0]})} onClick={() => this.toggleShow(0)}>{this.state.show[0] ? "Hide" : "View"}</button>
          </div>
          <ReactCSSTransitionGroup
            transitionName="topicItems"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {this.state.show[0] ? <div className="int-box int-box-white">{topicItems}</div> : null}
          </ReactCSSTransitionGroup>
          <div className="int-box int-box-mid">
            <p className="int-helper">
              <i className="fa fa-lock" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;
              <span className="int-highlight">Midterm 2 </span>
              Review
            </p>
            <button className="int-button">Unlock</button>
          </div>
          <div className="int-box int-box-bot">
            <p className="int-helper">
              <i className="fa fa-lock" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;
              <span className="int-highlight">Final </span>
              Review
            </p>
            <button className="int-button">Unlock</button>
          </div>
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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const TopicSet = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicSetComponent);

export default TopicSet;
