import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

const req = require('superagent');

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.forgotPassword = this.forgotPassword.bind(this);
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

  render() {
    return (
      <div>
        <h1>Enter your email:</h1>
        <input type="text" ref="email" placeholder="Email" />
        <input type="submit" onClick={(e) => this.forgotPassword(e)} />
        {this.state.error}
      </div>
    );
  }
}

export default ForgotPassword;
