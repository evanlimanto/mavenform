import React from 'react'
import { connect } from 'react-redux'

class LoginComponent extends React.Component {
  componentWillMount() {
    const { auth, location } = this.props;
    if (!location)
      return;
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.parseHash(location.hash);
    }
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
