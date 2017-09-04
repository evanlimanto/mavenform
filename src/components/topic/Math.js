import React, { Component } from 'react';
import { forEach, has, map, range } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';
import hash from 'string-hash';

import Navbar from '../navbar';
import Footer from '../footer';

import { BASE_URL } from '../../utils';
import { updateTopicsList } from '../../actions';

require('../../css/Math.css');

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

class MathComponent extends Component {
  constructor(props) {
    super(props);
    this.getCategorizedTopics = this.getCategorizedTopics.bind(this);
  }

  componentDidMount() {
    MathComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    return fetch(`${BASE_URL}/getAvailableTopics/888`)
      .then((response) => response.json())
      .then((json) => dispatch(updateTopicsList(json)));
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
    const topicsDict = this.getCategorizedTopics();
    const topicItems = map(this.getCategorizedTopics(), (items, topic) => {
      const arr = map(items, (item) => {
        const percent = hash(item.concept) % 100;
        const hexColor = "#" + getGreenToRed(percent);
        return (
          <div key={item.concept} className="subtopic">
            <Line className="progress" percent={percent} strokeWidth="4" strokeColor={hexColor} />
            <hr className="s1" />
            <Link to={`/interactive/math53/${item.code}`}>{item.concept}</Link>
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
        <Navbar interactive={true} links={["interactive/math53"]} navbarLabels={["Math 53"]} />
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
            <button className="int-button gray">Hide</button>
          </div>
          <div className="int-box int-box-white">{topicItems}</div>
          <div className="int-box int-box-mid">
            <p className="int-helper">
              <i className="fa fa-check-circle" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;
              <span className="int-highlight">Midterm 2 </span>
              Review
            </p>
            <button className="int-button int-button-white">View</button>
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
    topicsList: state.topicsList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const Math53 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MathComponent);

export default Math53;
