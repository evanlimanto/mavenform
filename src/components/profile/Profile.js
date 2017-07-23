import React, { Component } from 'react';
import { connect } from 'react-redux'

import { requireAuth } from '../../utils';

class ProfileComponent extends Component {
  componentWillMount() {
    const { auth, history } = this.props
    requireAuth(auth, history)
  }

  render(){
    return <h1>profile page</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const Profile = connect(
  mapStateToProps
)(ProfileComponent)

export default Profile;
