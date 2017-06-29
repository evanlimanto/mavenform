import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookies from 'browser-cookies';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import req from 'superagent';

import Modal from './Modal';
import { closeModal, showLoginModal, showWaitlistModal, showSignupModal, showForgotPasswordModal, setModalError } from '../../actions';

class ModalsComponent extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.waitlist = this.waitlist.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.getModal = this.getModal.bind(this);
  }

  signup(e) {
    e.preventDefault();

    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (isEmpty(username) || isEmpty(email) || isEmpty(password))
        return this.setState({ modalError: "Fill in all fields." });

    if (!isEmail(email))
        return this.setstate({ modalError: "Enter a valid email." });

    return this.props.auth.signup(email, username, password);
  }

  waitlist() {
    const email = this.refs.email.value;
    if (!isEmail(email))
      return this.props.setModalError('Invalid or empty email.');
    this.props.setModalError(null);
    req.post("/addToWaitlist")
      .send({ email })
      .end((err, res) => {
        if (err || !res.ok) this.props.setModalError("Waitlist failed.");
        else {
          cookies.set('waitlist_email', email, { expires: 1 });
          window.location = "/waitlisted";
        }
        return;
      });
  }

  login() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (!isEmail(email))
      return this.props.setModalError('Invalid or empty email.');
    if (isEmpty(password))
      return this.props.setModalError('Empty password.');
    this.props.setModalError(null);
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

  getModal() {
    if (!this.props.modal.type)
      return null;

    let infoContent, modalContent;
    if (this.props.modal.type === 'login') {
      infoContent = (
        <div className="login-helper">
          <span> Have an account? </span>
          <a onClick={this.props.showSignupModal}> Sign Up! </a>
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
            <a className="forgot-pass" onClick={this.props.showForgotPasswordModal}>Don't remember your password?</a>
          </p>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.login}>Log In</a>
        </span>
      );
    } else if (this.props.modal.type === 'signup') {
      infoContent = (
        <div className="login-helper">
          <span> Have an account? </span>
          <a onClick={this.props.showLoginModal}> Login! </a>
        </div>
      );
      modalContent = (
        <span>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Username" ref="username" autoComplete="off" />
          <hr className="s1" />
          <input className="login-info" type="text" placeholder="Email" ref="email" autoComplete="email" autoComplete="off" />
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password" autoComplete="off" />
          <hr className="s2" />
          <a className="login-button blue" onClick={this.signup}>Sign Up</a>
        </span>
      );
    } else if (this.props.modal.type === 'forgotpassword') {
      infoContent = (
        <div className="login-helper">
          <span> Remembered your password? </span>
          <a onClick={this.props.showLoginModal}> Login! </a>
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

    return <Modal closeModal={this.props.closeModal} infoContent={infoContent} modalContent={modalContent} errorText={this.props.modal.errorText} />;
  }

  render() {
    return this.getModal();
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    showLoginModal: () => dispatch(showLoginModal()),
    showSignupModal: () => dispatch(showSignupModal()),
    showForgotPasswordModal: () => dispatch(showForgotPasswordModal()),
    setModalError: (errorText) => dispatch(setModalError(errorText)),
  };
};

const Modals = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalsComponent);

export default Modals;
