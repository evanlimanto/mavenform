import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <span>
        <div className="footer-holder">
        </div>
        <div className="blue center footer">
          <hr className="s2" />
          <p className="white-text">Got feedback? Let us know <a className="feedback-link" href="https://goo.gl/forms/lNRTlct9SBSiAtrO2" target="_blank" rel="noopener noreferrer">here</a>!</p>
          <hr className="s2" />
        </div>
      </span>
    );
  }
}

export default Footer;
