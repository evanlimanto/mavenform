import React, { Component } from 'react';
import { connect } from 'react-redux';

import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

class SignupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.signup = this.signup.bind(this);
  }

  signup(e) {
    e.preventDefault(); 

    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const email = this.refs.email.value;

    if (isEmpty(username) || isEmpty(password) || isEmpty(email))
      return this.setState({ error: "Fields cannot be empty." });

    if (!isEmail(email))
      return this.setState({ error: "Invalid email." });

    this.props.auth.signup(email, username, password);
  }

  render() {
    return (
      <form>
        <h1>Sign Up</h1>
        <input type="text" placeholder="Username" ref="username" />
        <br />
        <input type="password" placeholder="Password" ref="password" />
        <br />
        <input type="text" placeholder="Email" ref="email" />
        <br />
        <input type="submit" value="Sign Up" onClick={(e) => this.signup(e)} />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const Signup = connect(
  mapStateToProps
)(SignupComponent)

export default Signup;
