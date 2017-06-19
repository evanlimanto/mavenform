import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { has, toString } from 'lodash';
import cookies from 'browser-cookies';

import { courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';
import ExamContent from './ExamContent';
import Footer from '../footer';
import Navbar from '../navbar';

const hash = require('string-hash');

class ExamComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profs: null
    };

    this.checkAccessCode = this.checkAccessCode.bind(this);
    this.updateAccessCode = this.updateAccessCode.bind(this);
  }

  componentDidMount() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    fetch(`/getProfs/${schoolCode}/${courseCode}/${examType}/${termCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ profs: json.profs }));
    fetch(`/getCourseAccessCode/${schoolCode}/${courseCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ hashedCode: json }));
  }

  checkAccessCode() {
    const hashedCode = this.state.hashedCode;
    const { schoolCode, courseCode } = this.props;
    const cookiePath = schoolCode + '-' + courseCode;
    const storedAccessCode = cookies.get(cookiePath);
    console.log(storedAccessCode, hashedCode);
    if (storedAccessCode) {
      if (storedAccessCode == hashedCode)
        return true;
      return false;
    }
    return false;
  }

  updateAccessCode() {
    const accessCode = this.refs.access_code.value;
    const { schoolCode, courseCode } = this.props;
    const cookiePath = schoolCode + '-' + courseCode;
    cookies.set(cookiePath, toString(hash(accessCode)), { expires: 7 }); 
    window.location.reload();
  }

  render() {
    const { schoolCode, courseCode, examType, termCode } = this.props;
    const profs = this.state.profs;
    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode]: null;
    const meta = {
      description: `Review past exam problems and solutions for the ${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} from ${schoolLabel}.`,
      title: `${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} - ${schoolLabel} - Studyform`,
    };

    const content = (this.props.auth.loggedIn() || this.checkAccessCode() ? (
      <ExamContent schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} profs={profs} />
    ) : (
      <div>
        <div id="header-text">
          <div className="center">
            <h4>Login to view content.</h4>
          </div>
          <div className="content">
            Or input access code:
            <hr className="s1" />
            <input type="text" placeholder="Access Code" ref="access_code" />
            <hr className="s2" />
            <button onClick={this.updateAccessCode}>Access</button>
          </div>
        </div>
      </div>
  ));

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar exam={true} schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} />
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
