import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { has } from 'lodash';
import classnames from 'classnames';

import Modal from '../modal';
import { courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };

    this.closeModal = this.closeModal.bind(this);
    this.loginModal = this.loginModal.bind(this);
    this.signUpModal = this.signUpModal.bind(this);
  }

  closeModal() {
    this.setState({
      modal: null
    });
  }

  loginModal() {
    this.setState({
      modal: 'login'
    });
  }

  signUpModal() {
    this.setState({
      modal: 'signup'
    });
  }

  render() {
    let modal = null;
    if (this.state.modal === 'signup') {
      modal = <Modal signUp={true} closeModal={this.closeModal} loginModal={this.loginModal} signUpModal={this.signUpModal} />;
    } else if (this.state.modal === 'login') {
      modal = <Modal signUp={false} closeModal={this.closeModal} loginModal={this.loginModal} signUpModal={this.signUpModal} />;
    }

    if (this.props.home) {
      return (
        <div className="home-nav">
          {modal}
          <div className="container">
            <Link to="/"><img className="logo home-logo" src="/img/logo.svg" alt="home logo" /></Link>
            <a className="home-button home-button-alt" onClick={this.loginModal}>Log In</a>
            <a className="home-button" onClick={this.signUpModal}>Sign Up</a>
          </div>
        </div>
      );
    }

    if (!has(this.props.labels, 'schools')) {
      return false;
    }

    const { schoolCode, courseCode, examTypeCode, termCode } = this.props;
    const courseLabel = courseCodeToLabel(courseCode);
    const schoolLabel = this.props.labels.schools[schoolCode];
    const examTypeLabel = examTypeToLabel(examTypeCode);
    const termLabel = termToLabel(termCode); 
    const numLayers = !!schoolLabel + !!courseLabel + !!examTypeLabel;
    let navbarNav = [<Link key='home' to='/' className={classnames({ active: numLayers === 0 })}>Home</Link>];
    if (schoolLabel) {
      navbarNav.push(<span key='homeSpan'> > </span>);
      navbarNav.push(<Link key='school' to={'/' + schoolCode} className={classnames({ active: numLayers === 1 })}>{schoolLabel}</Link>);
      if (courseLabel) {
        navbarNav.push(<span key='courseSpan'> > </span>);
        navbarNav.push(<Link key='course' to={'/' + schoolCode + '/' + courseCode} className={classnames({ active: numLayers === 2 })}>{courseLabel}</Link>);
        if (examTypeLabel) {
          navbarNav.push(<span key='examSpan'> > </span>);
          navbarNav.push(<Link key='exam' to={'/' + schoolCode + '/' + courseCode + '/' + examTypeCode + '/' + termCode} className={classnames({ active: numLayers === 3 })}>{examTypeLabel} - {termLabel}</Link>);
        }
      }
    }

    return (
      <div>
        {modal}
        <div className="nav">
          <div className="container">
            <Link to="/"><img className="logo" src="/img/logo.svg" /></Link>
            <input className="nav-search" name="search" placeholder="Search courses..." type="text" autoComplete="off">
            </input>
            <div className="material-icons nav-search-icon">search</div>
            <a className="nav-button nav-button-alt" onClick={this.loginModal}>Log In</a>
            <a className="nav-button" onClick={this.signUpModal}>Sign Up</a>
          </div>
        </div>
        <div className="gray-nav">
          <div className="container">
            {navbarNav}
          </div>
        </div>
      </div>
    ); 
  }
};

const mapStateToProps = (state) => {
  return {
    labels: state.labels,
  };
};

const Navbar = connect(
  mapStateToProps
)(NavbarComponent);

export default Navbar;
