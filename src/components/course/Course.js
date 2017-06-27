import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { has, map } from 'lodash';
import DocumentMeta from 'react-document-meta';

import { showLoginModal, showWaitlistModal } from '../../actions';
import { courseCodeToLabel } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';

class CourseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [],
      modalError: null,
      modal: null,
    };
  }

  componentDidMount() {
    const { courseCode, schoolCode } = this.props;
    fetch(`/getCourseExams/${schoolCode}/${courseCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ exams: json }));
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
    const content = this.props.auth.loggedIn() ? (
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
      <hr className="s7-5" />
      </div>
      </div>
    ) : (
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
      <tr><td colSpan="4" className="course-signup-td"><a onClick={this.props.showWaitlistModal} className="course-signup-link">Get early access</a> or <a className="course-signup-link" onClick={this.props.showLoginModal}>log in</a> to unlock all interactive study resources.</td></tr>
      </tbody>
      </table>
      </div>
      </div>
      <hr className="s7-5" />
      </div>
      </div>
    );

    return (
      <div>
      <DocumentMeta {...meta} />
      <Navbar schoolCode={schoolCode} courseCode={courseCode} />
      <Modals />
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


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showWaitlistModal: () => dispatch(showWaitlistModal()),
  };
};

const Course = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseComponent);

export default Course;
