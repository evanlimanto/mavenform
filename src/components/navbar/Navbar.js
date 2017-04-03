import React from 'react';
import { connect } from 'react-redux';

const NavbarComponent = ({ course, onToggleAppMode, isExam }) => {
  const toggleBackComponent = (isExam) ? (
      <a className="material-icons mobile-back" href={`/${course}`}>keyboard_backspace</a>
    ) : (
      <a className="material-icons mobile-back" href="/courses">keyboard_backspace</a>
    );

  return (
    <div className="nav">
      <a className="logo" href="/courses">Mavenform</a>
      {toggleBackComponent}
      <div className="tooltip-container">
        <a className="material-icons" href="https://docs.google.com/forms/d/e/1FAIpQLSfCS9McWikQ7F6syAGV9FX7Wf2-rWjqt-XMXxxEx5piTIf92Q/viewform?usp=sf_link" target="_blank">sms</a>
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
