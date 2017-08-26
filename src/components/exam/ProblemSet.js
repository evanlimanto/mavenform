import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { map, range } from 'lodash';

import { updateProblemSetInfo } from '../../actions';
import { BASE_URL, examTypeToLabel } from '../../utils';
import { Question, MultipleChoiceQuestion } from '../question';
import Footer from '../footer';
import Navbar from '../navbar';

class ProblemSetComponent extends Component {
  componentDidMount() {
    ProblemSetComponent.fetchData(this.props.dispatch, this.props);
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  componentWillMount() {
    const { schoolCode, courseCode } = this.props;
    if (!this.props.auth.loggedIn())
      document.location = `/${schoolCode}/${courseCode}`;
  }

  static getMeta(props) {
  }

  static fetchData(dispatch, props) {
    const { schoolCode, courseCode, problemSetType } = props;
    return fetch(`${BASE_URL}/getProblemSet/${schoolCode}/${courseCode}/${problemSetType}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateProblemSetInfo(json)));
  }

  render() {
    const problemSetInfo = this.props.problemSetInfo;
    const content = (!problemSetInfo) ? (<p className="loader">Loading content...</p>) :
      map(problemSetInfo.info, (num_parts, part) => {
        const subparts = map(range(1, 2), subpart => {
          const key = `${part}`;
          const content = problemSetInfo.problems[key].problem || '';
          const solution = problemSetInfo.problems[key].solution || '';
          const choices = problemSetInfo.problems[key].choices || '';
          const content_id = problemSetInfo.problems[key].content_id;
          const props = {
            content_id, content, solution, choices,
            id: part + "_" + subpart,
            solutionNum: solution,
            difficulty: problemSetInfo.problems[key].difficulty,
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
        {ProblemSetComponent.getMeta(this.props)}
        <Navbar schoolCode={this.props.schoolCode} courseCode={this.props.courseCode} concept={this.props.code} label={this.props.problemSetInfo.conceptLabel} />
        <div id="header-text">
          <div className="center">
            <h4>{examTypeToLabel(this.props.problemSetType)} Problem Set</h4>
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
    auth: state.auth,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    problemSetType: ownProps.problemSetType || ownProps.match.params.problemSetType,
    labels: state.labels,
    problemSetInfo: state.problemSetInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
}

const ProblemSet = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProblemSetComponent);

export default ProblemSet;
