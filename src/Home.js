import React, { Component } from 'react';
import { handleEvent } from '../src/utils';
import { courses } from './exams';

const _ = require('lodash');

class Home extends Component {
  render() {
    const courseBoxes = _.map(courses, (desc, course) => {
      return (
        <a className="course-card" href={`/course/${course}`} onClick={() => handleEvent('Click', 'Course', course)}>
          <h1>{_.upperCase(course)}</h1>
          <hr className="s1" />
          <i className="course-subtitle">{desc}</i>
          <h6 className="card-helper">CLICK TO VIEW &#8594;</h6>
        </a>
      );
    });

    return (
      <div className="home">
        <div className="dark-gray center">
          <hr className="s2" />
          <a className="material-icons notification-x">close</a>
          <p className="white-text notification-text">New courses are added every week. <a className="header-link">Sign up</a> to be notified when your course is available!</p>
          <hr className="s2" />
        </div>
        <div className="banner">
          <div className="banner-img"></div>
          <div className="banner-text">
            <div className="banner-header">Mavenform</div>
            <hr className="s2" />
            <div className="center">
              <h5 className="h5-alt">A new an intuitive format to view and study past exams</h5>
            </div>
          </div>
        </div>
        <div className="card-container center">
          <hr className="margin" />
          <h4 className="center">Courses</h4>
          <hr className="s1" />
          <h5>Currently available exam sets</h5>
          <hr className="s3" />
          {courseBoxes}
          <hr className="margin" />
        </div>
        <div className="light-gray center">
          <hr className="margin" />
          <h4 className="center">Features</h4>
          <hr className="s1" />
          <h5>Why view exams in Mavenform?</h5>
          <hr className="s3" />
          <div className="column">
            <div className="material-icons">touch_app</div>
            <h1>Interactive</h1>
            <hr className="s2" />
            <p>Use interactable elements like solution toggling and a live table of contents to make it easier and faster to check your answers and find specific problems.</p>
            <hr className="s1" />
          </div>
          <div className="column">
            <div className="material-icons">view_carousel</div>
            <h1>Responsive</h1>
            <hr className="s2" />
            <p>No more need to zoom in and pan around. Unlike static document types, Mavenform is intuitive and legible with any device type and any screen width.</p>
            <hr className="s1" />
          </div>
          <div className="column">
            <div className="material-icons">navigation</div>
            <h1>Navigable</h1>
            <hr className="s2" />
            <p>Instead of struggling to manage 10 or more tabs of individual PDFs, just browse a single web app that easily navigates between any relevant exam.</p>
            <hr className="s1" />
          </div>
          <hr className="margin" />
        </div>
        <div className="blue center">
          <hr className="s2" />
          <p className="white-text">Made by <a className="footer-link" href="http://www.kevinandstuff.com/" target="_blank">Kevin</a> & <a className="footer-link" href="http://evanlimanto.github.io/" target="_blank">Evan</a></p>
          <hr className="s2" />
        </div>
      </div>
    );
  }
}

export default Home;
