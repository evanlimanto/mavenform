import { Component } from 'react';
import { connect } from 'react-redux';

class LogoutComponent extends Component {
  componentWillMount() {
    this.props.auth.logout();
  }

  render() {
    return false;
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
