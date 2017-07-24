import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { has, map, range } from 'lodash';

import { updateExamInfo } from '../../actions';
import { BASE_URL, canUseDOM, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';
import { Question, MultipleChoiceQuestion } from '../question';
import Footer from '../footer';
import Navbar from '../navbar';

class ExamComponent extends Component {
  componentDidMount() {
    ExamComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { schoolCode, courseCode, examType, termCode } = props;
    return fetch(`${BASE_URL}/getExamInfo/${schoolCode}/${courseCode}/${examType}/${termCode}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateExamInfo(json)));
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    const examInfo = this.props.examInfo;
    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode]: null;
    const meta = {
      description: `Review past exam problems and solutions for the ${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} from ${schoolLabel}.`,
      title: `${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} - ${schoolLabel} - Studyform`,
    };

    const examContent = (!examInfo) ? (<p className="loader">Loading content...</p>) :
      map(this.props.examInfo.info, (num_parts, part) => {
        const subparts = map(range(1, num_parts + 1), subpart => {
          const key = `${part}_${subpart}`;
          if (!has(examInfo.problems, key)) {
            console.warn(`${key} doesn't exist in exam!`);
            return null;
          }
          const content = examInfo.problems[key].problem || '';
          const solution = examInfo.problems[key].solution || '';
          const choices = examInfo.problems[key].choices || '';
          const content_id = examInfo.problems[key].content_id;
          const props = {
            content_id, courseCode, schoolCode, content, solution, termCode, examType, choices,
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

    const examDesc = (
      <div id="header-text">
        <div className="center">
          <h4>{courseCodeToLabel(courseCode)}</h4>
          <h5>{examTypeToLabel(examType)} | {termToLabel(termCode)} {!examInfo.profs || "| " + examInfo.profs}</h5>
        </div>
      </div>
    );

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar exam={true} schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} source_url={this.props.examInfo.source_url} />
        <div>
          {examDesc}
          <div className="content">
            {examContent}
          </div>
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
    examType: ownProps.examType || ownProps.match.params.examType,
    termCode: ownProps.termCode || ownProps.match.params.termCode,
    labels: state.labels,
    examInfo: state.examInfo,
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
