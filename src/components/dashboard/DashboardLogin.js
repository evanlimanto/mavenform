import React, { Component } from 'react';
import cookies from 'browser-cookies';
const req = require('superagent');

require('../../css/Dashboard.css');

class DashboardLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    const password = this.refs.password.value;
    const self = this;
    req.post('/dashboardLogin')
      .send({ password })
      .end((err, res) => {
        if (err || !res.ok) {
          self.setState({ error: "Login failed." }); 
        } else {
          cookies.set('dashboard_user', 'login', { expires: 1 });
          document.location = "/dashboard";
        }
      });
  }

  render() {
    return (
      <div className="dashboard-login-aligner">
        <form>
          <h1 className="dashboard-login-title">Studyform Transcription Dashboard</h1>
          <input className="dashboard-login-input" placeholder="Password" ref="password" type="password" />
          <button className="dashboard-login-btn" value="Login" onClick={(e) => this.login(e)}>Login</button>
          <p className="dashboard-error">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default DashboardLogin;
