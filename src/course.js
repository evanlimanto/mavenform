import React, { Component } from 'react';
import { exams, captions } from './exams'

const _ = require('lodash');

class Course extends Component {
  render() {
    var course = null;
    if (this.props.location.query) {
      course = this.props.location.query.id;
    }
    const examType = 'midterm-1'; // hardcoded for now
    const cards = _.values(_.mapValues(exams[course][examType], (dict, semester) => {
      return (
        <a className="card" href={dict['url']}>
          <h2>{_.replace(_.capitalize(examType), '-', ' ')}</h2>
          <h3 className="card-subtitle">{semester}</h3>
          <i>{dict['profs']}</i>
          <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
        </a>
      );
    }));

    return (
      <div>
        <a className="return screen home-link" href="/">&#8592; HOME</a>
        <a className="return mobile home-link" href="/">&#8592; HOME</a>
        <a className="feedback home-link" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="banner">
          <hr className="margin" />
          <h6>{_.upperCase(course)}</h6>
          <hr className="s2" />
          <div className="center">
            <h5 className="h5-alt">{captions[course]}</h5>
          </div>
          <hr className="margin" />
        </div>
        <div className="card-container center">
          <hr className="margin-alt" />
          <h1 className="center">Exams</h1>
          <hr className="s1" />
          <h5>Interactive, responsive, and navigable</h5>
          <hr className="s2" />
          {cards}
          <hr className="margin-alt" />
        </div>
        <div className="banner center">
          <hr className="s2" />
          <p className="white-text">Made by <a className="footer-link" href="http://www.kevinandstuff.com/" target="_blank">Kevin</a> & <a className="footer-link" href="http://evanlimanto.github.io/" target="_blank">Evan</a></p>
          <hr className="s2" />
        </div>
      </div>
    );
  }
}

export default Course;
