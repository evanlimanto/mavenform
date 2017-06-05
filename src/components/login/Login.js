import React from 'react'
import { connect } from 'react-redux'

class LoginComponent extends React.Component {
  componentWillMount() {
    const { auth, location } = this.props;
    this.props.parseAuthHash(auth, location);
  }

  render() {
    return false;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const Login = connect(
  mapStateToProps
)(LoginComponent)

export default Login;
