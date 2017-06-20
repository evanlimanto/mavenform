import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

class SecretSignupComponent extends Component {
  signUp(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.auth.signup(email, username, password);
  }

  render() {
    const meta = { robots: "noindex" };
    return (
      <div style={{ margin: "50px" }}>
        <DocumentMeta {...meta} />
        <input type="text" placeholder="Email" ref="email" />
        <hr className="s1" />
        <input type="text" placeholder="Username" ref="username" />
        <hr className="s1" />
        <input type="password" placeholder="Password" ref="password" />
        <hr className="s1" />
        <input type="submit" value="Sign Up" onClick={(e) => this.signUp(e)} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
  }
};

const SecretSignup = connect(
  mapStateToProps
)(SecretSignupComponent);

export default SecretSignup;
