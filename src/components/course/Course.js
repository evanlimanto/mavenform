import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { has, map, toString } from 'lodash';
import DocumentMeta from 'react-document-meta';
import cookies from 'browser-cookies';

import { courseCodeToLabel } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import Navbar from '../navbar';

const hash = require('string-hash');

class CourseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [] 
    };

    this.checkAccessCode = this.checkAccessCode.bind(this);
    this.updateAccessCode = this.updateAccessCode.bind(this);
  }

  componentDidMount() {
    const { courseCode, schoolCode } = this.props;
    fetch(`/getCourseExams/${schoolCode}/${courseCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ exams: json }));

    fetch(`/getCourseAccessCode/${schoolCode}/${courseCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ hashedCode: json }));
  }

  checkAccessCode() {
    const hashedCode = this.state.hashedCode;
    const { schoolCode, courseCode } = this.props;
    const cookiePath = schoolCode + '-' + courseCode;
    const storedAccessCode = cookies.get(cookiePath);
    if (storedAccessCode) {
      if (toString(storedAccessCode) === toString(hashedCode))
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
    const { courseCode, schoolCode } = this.props;
    const available = map(this.state.exams, (exam, key) => {
      const typeCode = exam.type_code;
      const typeLabel = exam.type_label;
      const termCode = exam.term_code;
      const termLabel = exam.term_label;
      const profs = exam.profs;
      const url = `/${schoolCode}/${courseCode}/${typeCode}/${termCode}`;
      return (
        <tr key={key} className="available" onClick={() => examClickEvent(schoolCode, courseCode, typeCode, termCode)}>
          <td><Link to={url}>{typeLabel}</Link></td>
          <td><Link to={url}>{termLabel}</Link></td>
          <td><Link to={url}>{profs}</Link></td>
          <td><h6><Link to={url} className="table-link">CLICK TO VIEW &#8594;</Link></h6></td>
        </tr>
      );
    });

    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode]: null;
    const meta = {
      description: `Find interactive ${courseCodeToLabel(courseCode)} past midterms and finals from ${schoolLabel} here.`,
      title: `${courseCodeToLabel(courseCode)} - ${schoolLabel} - Studyform`,
    };

    const content = (this.props.auth.loggedIn() || this.checkAccessCode() ? (
      <div>
        <h4 className="center">{courseCodeToLabel(courseCode)}</h4>
        <div className="center">
          <h5>Index of resources</h5>
        </div>
        <hr className="s4" />
        <div className="center">
          <div className="table-container-container">
            <div className="table-container">
              <table className="exams center">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Term</th>
                    <th>Instructors</th>
                    <th>Studyform</th>
                  </tr>
                </thead>
                <tbody>
                  {available}
                </tbody>
              </table>
            </div>
          </div>
          <hr className="margin" />
        </div>
      </div>
    ) : (
      <div>
        <div>
          <h4 className="center">Login or input access code to view content for {courseCodeToLabel(courseCode)}.</h4>
          <hr className="s2" />
          <div className="center">
            <input className="access-code-input" type="text" placeholder="Access Code" ref="access_code" />
            <hr className="s2" />
            <input type="button" className="blue access-code-btn" onClick={this.updateAccessCode} value="Access" />
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar schoolCode={schoolCode} courseCode={courseCode} />
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
    courseCode: ownProps.match.params.courseCode,
    schoolCode: ownProps.match.params.schoolCode,
    exams: state.exams.multi_dict,
    labels: state.labels,
  }
};

const Course = connect(
  mapStateToProps,
)(CourseComponent);

export default Course;
