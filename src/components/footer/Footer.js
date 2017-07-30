import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <span>
        <div className="footer-holder">
        </div>
        <div className="blue center footer">
          <hr className="s2" />
          <div className="container">
            <p className="white-text"><span className="lighter">Copyright &copy; 2017 Studyform.</span> Got <a className="feedback-link" href="https://goo.gl/forms/lNRTlct9SBSiAtrO2" target="_blank" rel="noopener noreferrer">feedback</a>?</p>
          </div>
          <hr className="s2" />
        </div>
      </span>
    );
  }
}

export default Footer;
