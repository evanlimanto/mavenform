import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

import AuthService from '../../utils/AuthService'
import { evtEmitter } from '../../utils/events'

class LoginComponent extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: ""
      }
    };
  }

  componentWillMount() {
    const { auth, location } = this.props;
    this.props.parseAuthHash(auth, location);
    evtEmitter.addListener('profile_updated', (profile) => {
      this.setState({ profile });
    });
  }

  getAuthParams() {
    return {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  login(e) {
    e.preventDefault()
    const { email, password } = this.getAuthParams()
    this.props.auth.login(email, password)
  }

  signup() {
    const { email, password } = this.getAuthParams()
    this.props.auth.signup(email, password)
  }

  loginWithGoogle(e) {
    e.preventDefault()
    this.props.auth.loginWithGoogle();
  }

  loginWithFacebook(e) {
    e.preventDefault()
    this.props.auth.loginWithFacebook();
  }

  logout(e) {
    e.preventDefault()
    this.props.auth.logout();
  }

  render() {
    return (
      <div>
        {(this.props.auth.loggedIn()) ? 'Logged In as ' + this.state.profile.name : 'Logged Out'}
        <h2>Login</h2>
        <form onSubmit={this.login.bind(this)}>
          <div>
            <label>Email</label>
            <input type="email" ref="email" placeholder="denero@berkeley.edu" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" ref="password" placeholder="Password" />
          </div>
          <button type="submit">Login</button>
          <button onClick={this.signup.bind(this)}>Sign Up</button>
          <button onClick={this.loginWithGoogle.bind(this)}>
            Login with Google
          </button>
          <button onClick={this.loginWithFacebook.bind(this)}>
            Login with Facebook
          </button>
          <button onClick={this.logout.bind(this)}>
            Logout
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const Login = connect(
  mapStateToProps
)(LoginComponent)

export default Login;
