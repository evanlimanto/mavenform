import React, { Component } from 'react';
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory'

import Login from './Login';
import { parseAuthHash } from '../../utils'

class LogoutComponent extends Component {
  render() {
    this.props.auth.logout();
    createBrowserHistory().push('/login')
    return <Login parseAuthHash={parseAuthHash} />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const Logout = connect(
  mapStateToProps
)(LogoutComponent);

export default Logout;
