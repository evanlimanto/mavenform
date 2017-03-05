import React, { Component } from 'react';
import { handleEvent } from '../../utils';

class Navbar extends Component {
  render() {
    const toggleAppModeCallback = this.props.toggleAppModeCallback;

    return (
      <div className="nav">
        <a className="logo" href="/" onClick={() => handleEvent('Click', 'Home - Desktop')}>Mavenform</a>
        <a className="material-icons mobile-back" href="/" onClick={() => handleEvent('Click', 'Home - Mobile')}>home</a>
        <div className="tooltip-container">
          <a className="material-icons" href="https://docs.google.com/forms/d/e/1FAIpQLSfCS9McWikQ7F6syAGV9FX7Wf2-rWjqt-XMXxxEx5piTIf92Q/viewform?usp=sf_link">sms</a>
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