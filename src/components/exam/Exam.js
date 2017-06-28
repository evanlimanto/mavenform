import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { has } from 'lodash';

import { courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';
import ExamContent from './ExamContent';
import Footer from '../footer';
import Navbar from '../navbar';

class ExamComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profs: null,
      source_url: null,
    };
  }

  componentDidMount() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    fetch(`/getExamInfo/${schoolCode}/${courseCode}/${examType}/${termCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ profs: json.profs, source_url: json.source_url }));
  }

  render() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    const profs = this.state.profs;
    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode]: null;
    const meta = {
      description: `Review past exam problems and solutions for the ${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} from ${schoolLabel}.`,
      title: `${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} - ${schoolLabel} - Studyform`,
    };

    const content = <ExamContent schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} profs={profs} />
    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar exam={true} schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} source_url={this.state.source_url} />
        {content}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    history: ownProps.history,
    schoolCode: ownProps.match.params.schoolCode,
    courseCode: ownProps.match.params.courseCode,
    examType: ownProps.match.params.examType,
    termCode: ownProps.match.params.termCode,
    labels: state.labels,
  };
};

const Exam = connect(
  mapStateToProps,
)(ExamComponent);

export default Exam;
