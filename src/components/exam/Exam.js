import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import ExamContent from './ExamContent';
import Footer from '../footer';
import Navbar from '../navbar';

class ExamComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profs: null
    };
  }

  componentDidMount() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    fetch(`/getProfs/${schoolCode}/${courseCode}/${examType}/${termCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ profs: json.profs }));
  }

  render() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    const profs = this.state.profs;
    const meta = {
      description: '',
      title: '',
    };

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar exam={true} schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} />
        <ExamContent schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} profs={profs} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    schoolCode: ownProps.match.params.schoolCode,
    courseCode: ownProps.match.params.courseCode,
    examType: ownProps.match.params.examType,
    termCode: ownProps.match.params.termCode,
  };
};

const Exam = connect(
  mapStateToProps,
)(ExamComponent);

export default Exam;
