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
    return fetch(`${BASE_URL}/getAvailableTopics`)
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
            <Line className="progress" percent={percent} strokeWidth="5" strokeColor={hexColor} />
            <Link to={`/interactive/math53/${item.code}`}>{item.concept}</Link>
            <label>({Math.floor(percent/100 * 5)} / 5)</label>
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
        <div id="header-text">
          <div className="center">
            <h4>Math 53</h4>
          </div>
        </div>
        <div className="content">{topicItems}</div>
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
