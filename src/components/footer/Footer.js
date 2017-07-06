import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <span>
        <div className="footer-holder">
        </div>
        <div className="blue center footer">
          <hr className="s2" />
          <p className="white-text">Made for Students by Students</p>
          <p className="white-text">Questions or Feedback? Let us know <a className="feedback-link" href="https://goo.gl/forms/lNRTlct9SBSiAtrO2" target="_blank">here</a>!</p>
          <hr className="s2" />
        </div>
      </span>
    );
  }
}

export default Footer;
