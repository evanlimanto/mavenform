import React, { Component } from 'react';
import { handleEvent } from '../../utils';

class Navbar extends Component {
  render() {
    const course = this.props.course;
    const showSolutions = this.props.showSolutions;
    const toggleAppModeCallback = this.props.toggleAppModeCallback;
    const toggleAllSolutionsCallback = this.props.toggleAllSolutionsCallback;
    const toggleSolutionsComponent = null;
    const toggleBackComponent = (this.props.isExam) ? (
        <a className="material-icons mobile-back" href={`/${course}`}  onClick={() => handleEvent('Click', 'Home - Mobile')}>keyboard_backspace</a>
      ) : (
        <a className="material-icons mobile-back" href="/courses" onClick={() => handleEvent('Click', 'Home - Mobile')}>keyboard_backspace</a>
      );
    /*
    const toggleSolutionsComponent = (this.props.isExam) ? (
      (showSolutions) ? (
        <div className="tooltip-container" onClick={() => toggleAllSolutionsCallback()}>
          <a className="material-icons">indeterminate_check_box</a>
          <span className="tooltip tooltip-long">Hide All Solutions</span>
        </div>
      ) : (
        <div className="tooltip-container" onClick={() => toggleAllSolutionsCallback()}>
          <a className="material-icons">done_all</a>
          <span className="tooltip tooltip-long">Show All Solutions</span>
        </div>
      )
    ) : (null);
    */

    return (
      <div className="nav">
        <a className="logo" href="/courses" onClick={() => handleEvent('Click', 'Home - Desktop')}>Mavenform</a>
        {toggleBackComponent}
        {toggleSolutionsComponent}
        <div className="tooltip-container">
          <a className="material-icons" href="https://docs.google.com/forms/d/e/1FAIpQLSfCS9McWikQ7F6syAGV9FX7Wf2-rWjqt-XMXxxEx5piTIf92Q/viewform?usp=sf_link" target="_blank">sms</a>
          <span className="tooltip">Send Feedback</span>
        </div>
        <div className="tooltip-container reader-mode" onClick={() => toggleAppModeCallback()}>
          <a className="material-icons">subject</a>
          <span className="tooltip">Reader Mode</span>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  course: React.PropTypes.string,
  showSolutions: React.PropTypes.bool,
  toggleAppModeCallback: React.PropTypes.func,
  toggleAllSolutionsCallback: React.PropTypes.func,
};

export default Navbar;
