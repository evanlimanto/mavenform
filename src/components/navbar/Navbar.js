import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { has } from 'lodash';
import classnames from 'classnames';

import { courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

class NavbarComponent extends Component {
  render() {
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
        <div className="nav">
          <div className="container">
            <a href="..">
              <img className="logo" src="/img/logo.svg" />
            </a>
            <input className="nav-search" name="search" placeholder="Search courses..." type="text" autoComplete="off">
            </input>
            <div className="material-icons nav-search-icon">search</div>
            <a className="nav-button nav-button-alt" href="../userhome">Log In</a>
            <a className="nav-button" href="../userhome">Sign Up</a>
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
