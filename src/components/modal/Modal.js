import React, { Component } from 'react';

class Modal extends Component {
  render() {
    const { signUp, closeModal, loginModal, signUpModal } = this.props;
    return (
      <div className="modal-container">
        <div className="modal-click" onClick={closeModal}>
        </div>
        <div className="modal-and-helper">
          <div className="modal">
            <div className="modal-header">
              <img className="modal-logo" src="/img/logo.svg" />
            </div>
            <div className="modal-content">
              <hr className="s3"/>
              <a className="login-button login-button-f" href="/userhome">
                <img className="f-logo" src="/img/f-logo/FB-f-Logo__white_100.png" />
                <span> Continue with Facebook </span> 
              </a>
              <hr className="s1" />
              <a className="login-button login-button-g" href="/userhome">
                <img className="g-logo" src="/img/g-logo.png" />
                <span> Continue with Google </span> 
              </a>
              <hr className="s2" />
              <div className="divider"> 
                <div className="divider-or"> OR </div>
              </div>
              <hr className="s4" />
              <input className="login-info" type="text" placeholder="Email"/>
              <hr className="s1" />
              {signUp ? (<span>
                <input className="login-info" type="text" placeholder="Username"/>
                <hr className="s1" /> 
              </span>) : null}
              <input className="login-info" type="password" placeholder="Password"/>
              {signUp ? (<span>
                <hr className="s3" />
                <a className="login-button blue" onClick={signUpModal}>Sign Up</a>
                <hr className="s3" />
              </span>) : (<span>
                <hr className="s2" />
                <p className="forgot-pass">
                  <a className="forgot-pass">Don't remember your password?</a>
                </p>
                <hr className="s2" />
                <a className="login-button blue" onClick={loginModal}>Log In</a>
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
              <a onClick={signUpModal}> Sign up! </a>
            </div>
          )}
        </div>
        <a className="x" onClick={closeModal}><img src="/img/x.svg" /></a>
      </div>
    );
  }
}

export default Modal;
