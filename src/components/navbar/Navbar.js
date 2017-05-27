import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NavbarComponent = ({ courseid, onToggleAppMode, isExam }) => {
  const toggleBackComponent = (isExam) ? (
      <Link to={`/${courseid}`} className="material-icons mobile-back">keyboard_backspace</Link>
    ) : (
      <Link to="/courses" className="material-icons mobile-back">keyboard_backspace</Link>
    );

  return (
    <div className="nav">
      <Link to="/courses" className="logo">Mavenform</Link>
      {toggleBackComponent}
      <div className="tooltip-container">
        <a className="material-icons" href="https://docs.google.com/forms/d/e/1FAIpQLSfCS9McWikQ7F6syAGV9FX7Wf2-rWjqt-XMXxxEx5piTIf92Q/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">sms</a>
        <span className="tooltip">Send Feedback</span>
      </div>
      <div className="tooltip-container reader-mode" onClick={() => onToggleAppMode()}>
        <a className="material-icons">subject</a>
        <span className="tooltip">Reader Mode</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    courseid: ownProps.courseid,
    onToggleAppMode: ownProps.onToggleAppMode,
    isExam: ownProps.isExam,
  };
};

const Navbar = connect(
  mapStateToProps
)(NavbarComponent);

export default Navbar;
