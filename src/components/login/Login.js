import React from 'react'
import { connect } from 'react-redux'
import { parseAuthHash } from '../../utils';

class LoginComponent extends React.Component {
  componentWillMount() {
    const { auth, location } = this.props;
    parseAuthHash(auth, location);
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
