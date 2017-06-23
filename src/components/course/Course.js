import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { has, map } from 'lodash';
import DocumentMeta from 'react-document-meta';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { courseCodeToLabel } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import Modal from '../modal';
import Navbar from '../navbar';

const req = require('superagent');

class CourseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [],
      modalError: null,
      modal: null,
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.waitlist = this.waitlist.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.setModalError = this.setModalError.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showForgotPasswordModal = this.showForgotPasswordModal.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showSignupModal = this.showSignupModal.bind(this);
    this.showWaitlistModal = this.showWaitlistModal.bind(this);
  }

  forgotPassword(e) {
    e.preventDefault();

    const email = this.refs.email.value;
    if (!isEmail(email))
      return this.setState({ error: "Invalid email." });

    this.setState({ error: null });
    req.post("/changePassword")
      .send({ email })
      .end((err, res) => {
        if (err || !res.ok) return this.setState({ error: err.body });
        document.location = "/";
        return;
      });
  }

  login() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (!isEmail(email))
      return this.setModalError('Invalid or empty email.');
    if (isEmpty(password))
      return this.setModalError('Empty password.');
    this.setModalError(null);
    this.props.auth.login(email, password, this.setModalError);
  }

  waitlist() {
    const email = this.refs.email.value;
    if (!isEmail(email))
      return this.setModalError('Invalid or empty email.');
    this.setModalError(null);
    req.post("/addToWaitlist")
      .send({ email })
      .end((err, res) => {
        if (err || !res.ok) this.setModalError("Waitlist failed.");
        else window.location = "/waitlisted";
        return;
      });
  }

  hideModal() {
    this.setState({ modal: null, modalError: null });
  }

  showSignupModal() {
    this.setState({ modal: 'signup', modalError: null });
  }

  showWaitlistModal() {
    this.setState({ modal: 'waitlist', modalError: null });
  }

  showLoginModal() {
    this.setState({ modal: 'login', modalError: null });
  }

  showForgotPasswordModal() {
    this.setState({ modal: 'forgotpassword', modalError: null });
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
      return this.setState({ modalError: "Fill in all fields." });

    if (!isEmail(email))
      return this.setstate({ modalError: "Enter a valid email." });

    req.post('/signup')
      .send({ access_code })
      .end((err, res) => {
        if (err || !res.ok) return this.setState({ modalError: res.text });
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
      <tr><td colSpan="4" className="course-signup-td"><a onClick={this.showWaitlistModal} className="course-signup-link">Get early access</a> or <a className="course-signup-link" onClick={this.showLoginModal}>log in</a> to unlock all interactive study resources.</td></tr>
      </tbody>
      </table>
      </div>
      </div>
      <hr className="margin" />
      </div>
      </div>
    );

    let infoContent = null, modalContent = null;
    if (this.state.modal === 'waitlist') {
      infoContent = (
        <div className="login-helper">
        <span> Already have an access code? </span>
        <a onClick={this.showSignupModal}> Sign up! </a>
        </div>
      );
      modalContent = (
        <span>
        <hr className="s3" />
        <input className="login-info" type="text" placeholder="Email" ref="email" autoComplete="off"/>
        <hr className="s2" />
        <a className="login-button blue" onClick={this.waitlist}>Get Early Access</a>
        </span>
      );
    } else if (this.state.modal === 'signup') {
      infoContent = (
        <div className="login-helper">
          <span> Don't have an access code? </span>
          <a onClick={this.showWaitlistModal}> Sign up on our waitlist! </a>
        </div>
      );
      modalContent = (
        <span>
          <div className="access-code-signup">Sign up with your Access Code to access content.</div>
          <input className="login-info" type="text" placeholder="Access Code" ref="access_code" autoComplete="on" />
          <hr className="s1" />
          <input className="login-info" type="text" placeholder="Username" ref="username" autoComplete="on" />
          <hr className="s1" />
          <input className="login-info" type="text" placeholder="Email" ref="email" autoComplete="email" />
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password" autoComplete="on" />
          <hr className="s2" />
          <a className="login-button blue" onClick={this.signup}>Sign Up</a>
        </span>
      );
    } else if (this.state.modal === 'login') {
      infoContent = (
        <div className="login-helper">
          <span> Don't have an account? </span>
          <a onClick={this.showWaitlistModal}> Get early access! </a>
        </div>
      );
      modalContent = (
        <span>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Email" ref="email" autoComplete="off"/>
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password" autoComplete="off"/>
          <hr className="s2" />
          <p className="forgot-pass">
            <a className="forgot-pass" onClick={this.showForgotPasswordModal}>Don't remember your password?</a>
          </p>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.login}>Log In</a>
        </span>
      );
    } else if (this.state.modal === 'forgotpassword') {
      infoContent = (
        <div className="login-helper">
          <span> Remembered your password? </span>
          <a onClick={this.showLoginModal}> Login! </a>
        </div>
      );
      modalContent = (
        <span>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Email" ref="email" autoComplete="off"/>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.login}>Send Recovery Email</a>
        </span>
      );
    }

    return (
      <div>
      <DocumentMeta {...meta} />
      <Navbar schoolCode={schoolCode} courseCode={courseCode} />
      {(this.state.modal) ? <Modal infoContent={infoContent} modalContent={modalContent} errorText={this.state.modalError} closeModal={this.hideModal} /> : null}
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
