import React, { Component } from 'react';

class Footer extends Component {
  provideFeedback(e) {
    window.Intercom('showNewMessage');
  }

  render() {
    return (
      <span>
        <div className="footer-holder">
        </div>
        <div className="blue center footer">
          <hr className="s2" />
          <div className="container">
            <p className="white-text">
              <span className="lighter">Copyright &copy; 2017 Studyform. Got </span>
              <a onClick={this.provideFeedback} className="feedback-link">feedback</a>
              <span className="lighter">?</span>
            </p>
          </div>
          <hr className="s2" />
        </div>
      </span>
    );
  }
}

export default Footer;
