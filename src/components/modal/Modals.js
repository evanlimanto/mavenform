import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookies from 'browser-cookies';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import req from 'superagent';

import Modal from './Modal';
import { closeModal, showLoginModal, showSignupModal, showForgotPasswordModal, setModalError } from '../../actions';

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
        return this.setState({ modalError: "Enter a valid email." });

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

  login(e) {
    e.preventDefault();
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
          <input className="login-info" type="text" placeholder="Email" ref="email" />
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password" />
          <hr className="s2" />
          <p className="forgot-pass">
            <a className="forgot-pass" onClick={this.props.showForgotPasswordModal}>Don't remember your password?</a>
          </p>
          <hr className="s2" />
          <button type="submit" className="login-button blue" onClick={(e) => this.login(e)}>Log In</button>
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
          <button type="submit" className="login-button blue" onClick={(e) => this.signup(e)}>Sign Up</button>
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
    }

    return <Modal closeModal={this.props.closeModal} infoContent={infoContent} modalContent={modalContent} errorText={this.props.modal.errorText} headerContent={headerContent} />;
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
