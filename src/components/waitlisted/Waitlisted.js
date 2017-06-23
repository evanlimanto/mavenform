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
        <Navbar />
        <div className="container">
          <div className="center">
            <h4>Thanks for signing up! We'll be in touch shortly.</h4>
          </div>
        </div>
        <Footer />
      </div>
    );
    return <h1>Waitlisted!</h1>;
  }
}

export default Waitlisted;
