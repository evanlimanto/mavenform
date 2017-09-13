import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, sortBy, split } from 'lodash';
import { Elements } from 'react-stripe-elements';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import req from 'superagent';

import PaymentsForm from './PaymentsForm';
import Modal from './Modal';
import { closeModal, showLoginModal, showSignupModal, showForgotPasswordModal, showReportSuccessModal, setModalError } from '../../actions';

require('../../css/Modals.css');

class ModalsComponent extends Component {
  constructor(props) {
    super(props);

    this.hasInstantiatedStripe = false;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.selectSchool = this.selectSchool.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.getModal = this.getModal.bind(this);
    this.bookmarkCourse = this.bookmarkCourse.bind(this);
    this.reportError = this.reportError.bind(this);
  }

  reportError() {
    const error_content = document.getElementById("error_content").value;
    const content_id = this.props.modal.content_id;
    const self = this;
    req.post('/reportError')
      .send({ content_id, error_content })
      .end((err, res) => {
        if (err || !res.ok) console.error(err);
        else self.props.showReportSuccessModal();
      });
  }

  signup(e) {
    e.preventDefault();

    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (isEmpty(username) || isEmpty(email) || isEmpty(password))
        return this.props.setModalError("Fill in all fields.");

    if (!isEmail(email))
        return this.props.setModalError("Enter a valid email.");

    document.getElementById("signup").innerHTML = "Signing Up...";
    this.props.auth.signup(email, username, password, this.props.setModalError);
  }

  login(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (!isEmail(email))
      return this.props.setModalError('Invalid or empty email.');
    if (isEmpty(password))
      return this.props.setModalError('Empty password.');
    document.getElementById("login").innerHTML = "Logging In...";
    this.props.auth.login(email, password, this.props.setModalError);
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

  selectSchool() {
    const schoolArr = split(this.refs.selectedSchool.value, '~');
    const schoolid = schoolArr[1];
    const profile = this.props.auth.getProfile();
    req.post('/selectSchool')
      .send({ school_id: schoolid, auth_user_id: profile.user_id })
      .end((err, res) => {
        if (err || !res.ok) return console.error(err);
        else document.location = "/";
      });
  }

  bookmarkCourse() {
    const userid = this.props.auth.getProfile().user_id;
    const courseid = this.refs.selectedCourse.value;
    req.post('/bookmarkCourse')
      .send({ auth_user_id: userid, course_id: courseid })
      .end((err, res) => {
        if (err || !res.ok) console.error(err);
        else document.location = "/";
      });
  }

  getModal() {
    if (!this.props.modal.type)
      return null;

    let infoContent, modalContent, headerContent;
    if (this.props.modal.type !== 'reporttypo') {
      headerContent = <img className="modal-logo" src="/img/logo.svg" alt="modal logo" />;
    }
    if (this.props.modal.type === 'login') {
      infoContent = (
        <div className="login-helper">
          <span> Don't have an account? </span>
          <a onClick={this.props.showSignupModal}> Sign Up! </a>
        </div>
      );
      modalContent = (
        <form>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Email" ref="email" autocomplete="on" />
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password" autocomplete="on" />
          <hr className="s2" />
          <p className="forgot-pass">
            <a className="forgot-pass" onClick={this.props.showForgotPasswordModal}>Don't remember your password?</a>
          </p>
          <hr className="s2" />
          <button type="submit" className="login-button blue" onClick={(e) => this.login(e)} id="login">Log In</button>
        </form>
      );
    } else if (this.props.modal.type === 'signup') {
      infoContent = (
        <div className="login-helper">
          <span> Have an account? </span>
          <a onClick={this.props.showLoginModal}> Login! </a>
        </div>
      );
      modalContent = (
        <form>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Username" ref="username"  />
          <hr className="s1" />
          <input className="login-info" type="text" placeholder="Email" ref="email"  />
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password"  />
          <hr className="s2" />
          <button type="submit" className="login-button blue" onClick={(e) => this.signup(e)} id="signup">Sign Up</button>
        </form>
      );
    } else if (this.props.modal.type === 'forgotpassword') {
      infoContent = (
        <div className="login-helper">
          <span> Remembered your password? </span>
          <a onClick={this.props.showLoginModal}> Login! </a>
        </div>
      );
      modalContent = (
        <form>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Email" ref="email" />
          <hr className="s2" />
          <button type="submit" className="login-button blue" onClick={this.forgotPassword}>Send Recovery Email</button>
        </form>
      );
    } else if (this.props.modal.type === 'selectschool') {
      headerContent = <h1>Select Your School</h1>;
      modalContent = (
        <span>
          <hr className="s3" />
          <select ref="selectedSchool">
            {map(sortBy(this.props.schools, [(school) => school.name]), (school, key) => {
              return <option value={school.code + "~" + school.id} key={key}>{school.name}</option>;
            })}
          </select>
          <div className="select-arrow">
            <div className="material-icons">keyboard_arrow_down</div>
          </div>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.selectSchool}>Confirm</a>
        </span>
      );
    } else if (this.props.modal.type === 'addcourse') {
      headerContent = <h1>Add Course</h1>;
      modalContent = (
        <span>
          <hr className="s3"/>
          <select ref="selectedCourse">
            {map(sortBy(this.props.coursesToBookmark, [(course) => course.code_label]), (course, key) => {
              return <option value={course.id} key={key}>{course.code_label}</option>;
            })}
          </select>
          <div className="select-arrow">
            <div className="material-icons">keyboard_arrow_down</div>
          </div>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.bookmarkCourse}>Add To Dashboard</a>
        </span>
      );
    } else if (this.props.modal.type === 'uploadsuccess') {
      headerContent = <h1>Exam Uploaded</h1>;
      modalContent = (
        <span>
          <hr className="s3" />
          <p>Thanks for uploading your exam! We will work on validating and converting it as soon as possible.</p>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.props.closeModal}>Okay</a>
        </span>
      );
    } else if (this.props.modal.type === 'reportsuccess') {
      headerContent = <h1>Error Reported</h1>;
      modalContent = (
        <span>
          <hr className="s3" />
          <p>Error successfully reported! We will work on fixing it as soon as possible.</p>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.props.closeModal}>Okay</a>
        </span>
      );
    } else if (this.props.modal.type === 'reporterror') {
      headerContent = <h1>Report Error</h1>;
      modalContent = (
        <span>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Please describe the typo or error here..." id="error_content"/>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.reportError}>Report</a>
        </span>
      );
    } else if (this.props.modal.type === 'courseregister') {
      headerContent = <h1>Selected Section</h1>;
      modalContent = (
        <span>
          <hr className="s3" />
          <p>Thank your for registering! Now you will be able to access AI-generated custom problems for this course.</p>
        </span>
      );
    } else if (this.props.modal.type === 'payments') {
      modalContent = (
        <Elements>
          <PaymentsForm />
        </Elements>
      );
    }

    return <Modal closeModal={this.props.closeModal} infoContent={infoContent} modalContent={modalContent} errorText={this.props.modal.errorText} headerContent={headerContent} />;
  }

  render() {
    return this.getModal();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    modal: state.modal,
    schools: state.schools,
    coursesToBookmark: state.coursesToBookmark,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    showLoginModal: () => dispatch(showLoginModal()),
    showSignupModal: () => dispatch(showSignupModal()),
    showForgotPasswordModal: () => dispatch(showForgotPasswordModal()),
    showReportSuccessModal: () => dispatch(showReportSuccessModal()),
    setModalError: (errorText) => dispatch(setModalError(errorText)),
  };
};

const Modals = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalsComponent);

export default Modals;
