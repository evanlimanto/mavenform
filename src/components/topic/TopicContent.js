import React, { Component } from 'react';
import { map, range } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Navbar from '../navbar';
import Footer from '../footer';
import { Question, MultipleChoiceQuestion } from '../question';
import { updateComments, updateTopicInfo } from '../../actions';
import { BASE_URL, canUseDOM } from '../../utils';

class TopicContentComponent extends Component {
  static fetchData(dispatch, props) {
    const { code } = props;
    return fetch(`${BASE_URL}/getTopicInfo/${code}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(updateTopicInfo(json))
        return json;
      }).then((topicInfo) => {
        return fetch(`${BASE_URL}/getComments`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contentids: map(topicInfo.info, (num_parts, part) => topicInfo.problems[part].content_id)
          }),
        }).then((response) => response.json())
          .then((json) => dispatch(updateComments(json)))
      })
  }

  componentDidMount() {
    TopicContentComponent.fetchData(this.props.dispatch, this.props);
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  static getMeta(props) {
    const topicInfo = props.topicInfo;
    const title = `${topicInfo.conceptLabel} - Studyform`;
    const description = `Interactive study resorces for ${topicInfo.subjectLabel}, ${topicInfo.topicLabel} - ${topicInfo.conceptLabel}`;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }

  render() {
    const topicInfo = this.props.topicInfo;
    const content = (!topicInfo) ? (<p className="loader">Loading content...</p>) :
      map(topicInfo.info, (num_parts, part) => {
        const subparts = map(range(1, 2), subpart => {
          const key = `${part}`;
          const content = topicInfo.problems[key].problem || '';
          const solution = topicInfo.problems[key].solution || '';
          const choices = topicInfo.problems[key].choices || '';
          const content_id = topicInfo.problems[key].content_id;
          const props = {
            content_id, content, solution, choices,
            id: part + "_" + subpart,
            solutionNum: solution,
            term_label: topicInfo.problems[key].term_label,
            type_label: topicInfo.problems[key].type_label,
            difficulty: topicInfo.problems[key].difficulty,
            comments: this.props.comments[content_id],
          }
          if (choices && choices.length > 0) {
            return <MultipleChoiceQuestion key={key} {...props} />
          }
          return <Question key={key} {...props} />
        });

        return <span key={part} className="element">{subparts}</span>
      });

    return (
      <div>
        {TopicContentComponent.getMeta(this.props)}
        <Navbar schoolCode={this.props.schoolCode} courseCode={this.props.courseCode} concept={this.props.code} label={this.props.topicInfo.conceptLabel} />
        <div id="header-text">
          <div className="center">
            <h4>{topicInfo.conceptLabel}</h4>
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
    comments: state.comments,
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
