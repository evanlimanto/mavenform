import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { has, map, toString } from 'lodash';
import DocumentMeta from 'react-document-meta';
import cookies from 'browser-cookies';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { courseCodeToLabel } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import Modal from '../modal';
import Navbar from '../navbar';

const hash = require('string-hash');
const req = require('superagent');

class CourseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [],
      modalError: null,
      signUpModalError: null,
      modal: false,
    };

    this.signup = this.signup.bind(this);
    this.setModalError = this.setModalError.bind(this);
    this.hideSignupModal = this.hideSignupModal.bind(this);
    this.showSignupModal = this.showSignupModal.bind(this);
  }

  hideSignupModal() {
    this.setState({ modal: false });
  }

  showSignupModal() {
    this.setState({ modal: true });
  }

  componentDidMount() {
    const { courseCode, schoolCode } = this.props;
    fetch(`/getCourseExams/${schoolCode}/${courseCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ exams: json }));
  }

  setModalError(text) {
    this.setState({ modalError: text }); 
  }

  signup(e) {
    e.preventDefault();

    const access_code = this.refs.access_code.value;
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (isEmpty(access_code) || isEmpty(username) || isEmpty(email) || isEmpty(password))
      return this.setState({ signUpModalError: "Fill in all fields." });

    if (!isEmail(email))
      return this.setstate({ signUpModalError: "Enter a valid email." });

    req.post('/signup')
      .send({ access_code })
      .end((err, res) => {
        if (err || !res.ok) return this.setState({ signUpModalError: res.text });
        else return this.props.auth.signup(email, username, password);
      });
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
    const infoContent = (
      <div className="login-helper">
        <span> Already got an access code? </span>
        <a> Sign up! </a>
      </div>
    );
    const modalContent = (
      <span>
        <hr className="s3" />
        <input className="login-info" type="text" placeholder="Email" ref="email" autoComplete="email"/>
        <hr className="s2" />
        <a className="login-button blue" onClick={this.waitlist}>Get Early Access</a>
      </span>
    );

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
          <hr className="margin" />
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
                  <tr><td colSpan="4" className="course-signup-td"><a onClick={this.showSignupModal} className="course-signup-link">Get early access</a> or <a className="course-signup-link">log in</a> to unlock all interactive study resources.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr className="margin" />
        </div>
      </div>
    );

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar schoolCode={schoolCode} courseCode={courseCode} />
        {(this.state.modal) ? <Modal infoContent={infoContent} modalContent={modalContent} errorText={this.state.modalError} closeModal={this.hideSignupModal} errorText={this.state.signUpModalError} /> : null}
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
