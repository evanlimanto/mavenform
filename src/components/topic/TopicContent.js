import React, { Component } from 'react';
import { map, range } from 'lodash';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import Navbar from '../navbar';
import Footer from '../footer';
import { Question, MultipleChoiceQuestion } from '../question';
import { updateTopicInfo } from '../../actions';
import { BASE_URL, canUseDOM } from '../../utils';

class TopicContentComponent extends Component {
  static fetchData(dispatch, props) {
    const { code } = props;
    return fetch(`${BASE_URL}/getTopicInfo/${code}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateTopicInfo(json)));
  }

  componentDidMount() {
    TopicContentComponent.fetchData(this.props.dispatch, this.props);
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  render() {
    const meta = {
      description: `Interactive study resources for ${this.props.topicLabel} - ${this.props.conceptLabel}`,
      title: `${this.subjectLabel} - Studyform`,
    };
    const topicInfo = this.props.topicInfo;
    const content = (!topicInfo) ? (<p className="loader">Loading content...</p>) :
      map(topicInfo.info, (num_parts, part) => {
        const subparts = map(range(1, num_parts + 1), subpart => {
          const key = `${part}_${subpart}`;
          const content = topicInfo.problems[key].problem || '';
          const solution = topicInfo.problems[key].solution || '';
          const choices = topicInfo.problems[key].choices || '';
          const content_id = topicInfo.problems[key].content_id;
          const props = {
            content_id, content, solution, choices,
            id: part + "_" + subpart,
            solutionNum: solution
          }
          if (choices && choices.length > 0) {
            return <MultipleChoiceQuestion key={key} {...props} />
          }
          return <Question key={key} {...props} />
        });

        return <span key={part} className="element">{subparts}</span>;
      });

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar math={!this.props.courseCode} schoolCode={this.props.schoolCode} courseCode={this.props.courseCode} topic={this.props.topic} label={this.props.conceptLabel} />
        <div id="header-text">
          <div className="center">
            <h4>{topicInfo.topicLabel || topicInfo.conceptLabel}</h4>
          </div>
        </div>
        <div className="content">
          {content}
        </div>
        <Footer />
      </div> 
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    code: ownProps.code || ownProps.match.params.code,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    topicInfo: state.topicInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const TopicContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicContentComponent);

export default TopicContent;
