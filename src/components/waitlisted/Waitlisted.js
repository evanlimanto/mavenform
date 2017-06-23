import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import Footer from '../footer';
import Navbar from '../navbar';

class Waitlisted extends Component {
  render() {
    const meta = {
      description: `Interactive and course-specific study resources.`,
      title: `Waitlisted - Studyform`,
      robots: "noindex",
    };

    return (
      <div className="school">
        <DocumentMeta {...meta} />
        <Navbar waitlisted={true} />
        <div className="container">
          <div className="center">
            <p className="waitlisted-message">Thanks for signing up! We'll be in touch shortly.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Waitlisted;
