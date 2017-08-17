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
  }

  static fetchData(dispatch, props) {
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode } = this.props;
    return (
      <div>
        {ExamComponent.getMeta(this.props)}
        <Navbar exam={true} schoolCode={schoolCode} courseCode={courseCode} problemset={true} />
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
    labels: state.labels,
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
