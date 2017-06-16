import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  signUp() {
    const email = this.refs.email.value;
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    if (isEmail(email) && !isEmpty(username) && !isEmpty(password)) {
      this.props.auth.signup(email, username, password);
    }
  }

  login() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (isEmail(email) && !isEmpty(password)) {
      this.props.auth.login(email, password);
    }
  }

  loginWithGoogle(e) {
    e.preventDefault()
    this.props.auth.loginWithGoogle();
  }

  loginWithFacebook(e) {
    e.preventDefault()
    this.props.auth.loginWithFacebook();
  }

  render() {
    const { signUp, closeModal, loginModal, signUpModal } = this.props;
    return (
      <div className="modal-container">
        <div className="modal-click" onClick={closeModal}>
        </div>
        <div className="modal-and-helper">
          <div className="modal">
            <div className="modal-header">
              <img className="modal-logo" src="/img/logo.svg" alt="modal logo" />
            </div>
            <div className="modal-content">
              <hr className="s3"/>
              <input className="login-info" type="text" placeholder="Email" ref="email"/>
              <hr className="s1" />
              {signUp ? null : <input className="login-info" type="password" placeholder="Password" ref="password"/>}
              {signUp ? (<span>
                <hr className="s1" />
                <a className="login-button blue" onClick={this.signUp}>Get Early Access</a>
              </span>) : (<span>
                <hr className="s2" />
                <p className="forgot-pass">
                  <a className="forgot-pass">Don't remember your password?</a>
                </p>
                <hr className="s2" />
                <a className="login-button blue" onClick={this.login}>Log In</a>
              </span>)}
                <hr className="s3" />
            </div>
          </div>
          <hr className="s2" />
          {signUp ? (
            <div className="login-helper">
              <span> Have an account? </span>
              <a onClick={loginModal}> Login! </a>
            </div>
          ) : (
            <div className="login-helper">
              <span> Don't have an account? </span>
              <a onClick={signUpModal}> Get Early Access </a>
            </div>
          )}
        </div>
        <a className="x" onClick={closeModal}><img src="/img/x.svg" alt="close" /></a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const Modal = connect(
  mapStateToProps
)(ModalComponent);

export default Modal;
