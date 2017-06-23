import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { Creatable } from 'react-select';
import { map, join, forEach, toUpper } from 'lodash';
import cookies from 'browser-cookies';
import 'react-select/dist/react-select.css';
import Footer from '../footer';
import Navbar from '../navbar';

const req = require('superagent');

function promptTextCreator(label) {
  return 'Add new course: ' + toUpper(label);
}

class Waitlisted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      message: null,
    };

    this.onChange = this.onChange.bind(this);
    this.waitlistCourses = this.waitlistCourses.bind(this);
  }

  onChange(selections) {
    forEach(selections, (selection) => { selection.label = toUpper(selection.label) });
    this.setState({ value: selections }); 
  }

  waitlistCourses() {
    const email = cookies.get('waitlist_email');
    const courses = join(map(this.state.value, (option) => option.value), '~');
    req.post('/waitlistCourses')
      .send({ email, courses })
      .end((err, res) => {
        if (err || !res.ok) return this.setState({ message: "Sorry, something went wrong. We're looking into it." });
        else return this.setState({ message: "Courses submitted!" });
      });
  }

  render() {
    const meta = {
      description: `Interactive and course-specific study resources.`,
      title: `Waitlisted - Studyform`,
      robots: 'noindex',
    };

    return (
      <div className="school">
        <DocumentMeta {...meta} />
        <Navbar waitlisted={true} />
        <div className="container">
          <div className="center">
            <p className="waitlisted-message">Thank you for signing up! We'll be in touch shortly. <hr className="s1" /><b>Optionally</b>, tell us the courses you're taking so we can provide you with better study materials.</p>
            <Creatable className="optional-courses" placeholder="Enter courses..." promptTextCreator={promptTextCreator} onChange={this.onChange} multi={true} value={this.state.value} noResultsText="Enter more than 1 character." joinValues={true} />
            <button className="optional-courses-btn" onClick={this.waitlistCourses}>Submit</button>
            <p>{this.state.message}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Waitlisted;
