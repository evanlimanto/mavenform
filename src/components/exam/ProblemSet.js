import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has, map, range, replace, split, flatten } from 'lodash';
import { Helmet } from 'react-helmet';

import { updateExamInfo, updateComments } from '../../actions';
import { BASE_URL, canUseDOM, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';
import { Question, MultipleChoiceQuestion } from '../question';
import { Interactive } from '../course';
import { TopicContent } from '../topic';
import Footer from '../footer';
import Navbar from '../navbar';

class ExamComponent extends Component {
  componentDidMount() {
    ExamComponent.fetchData(this.props.dispatch, this.props);
  }

  static getMeta(props) {
    const { courseCode, labels, examStr } = props;
    const examArr = split(examStr, '-');
    const examType = examArr[0];
    const termCode = examArr[1];
    const profs = examArr[2];
    const title = ((labels.schools) ? `${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} - Studyform` : "Studyform");
    const description = `Study and discuss past exam problems and solutions for ${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)}.`;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }

  static fetchData(dispatch, props) {
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  render() {
    return false;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    labels: state.labels,
    examInfo: state.examInfo,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
}

const Exam = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamComponent);

export default Exam;
