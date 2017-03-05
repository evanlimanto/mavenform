import React, { Component } from 'react';
import { handleEvent } from '../../utils';

class Navbar extends Component {
  render() {
    const showSolutions = this.props.showSolutions;
    const toggleAppModeCallback = this.props.toggleAppModeCallback;
    const toggleAllSolutionsCallback = this.props.toggleAllSolutionsCallback;
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

    return (
      <div className="nav">
        <a className="logo" href="/" onClick={() => handleEvent('Click', 'Home - Desktop')}>Mavenform</a>
        <a className="material-icons mobile-back" href="/" onClick={() => handleEvent('Click', 'Home - Mobile')}>home</a>
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

export default Navbar;
