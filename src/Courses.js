import React, { Component } from 'react';
import { handleEvent } from '../src/utils';
import { courseIDToLabel, courses } from './exams';
import { map } from 'lodash';

class Courses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const courseBoxes = map(courses, (desc, course) => {
      return (
        <a key={course} className="course-card" href={`/${course}`} onClick={() => handleEvent('Click', 'Course', course)}>
          <h1>{courseIDToLabel[course]}</h1>
          <hr className="s1" />
          <i className="course-subtitle">{desc}</i>
          <h6 className="card-helper">CLICK TO VIEW &#8594;</h6>
        </a>
      );
    });

    return (
      <div className="courses">
        <div className="banner">
          <a className="material-icons courses-back" href="/">keyboard_backspace</a>
          <div className="banner-img"></div>
          <div className="banner-text content">
            <div className="banner-header">Courses</div>
            <hr className="s2" />
            <h5 className="h5-alt">Currently available exam sets</h5>
            <hr className="s5" />
            <div className="material-icons search-icon">search</div>
            <input id="search" name="search" placeholder="Type a course name or description here..." type="text" data-list=".course-list" autoComplete="off" />
          </div>
        </div>
        <div className="card-container-container">
          <div className="card-container center">
            <hr className="margin" />
            <div className="course-list">
              <a className="course-card">
                <h1>CS 101</h1>
                <hr className="s1" />
                <i className="course-subtitle">The Most Featured Course Ever</i>
                <hr className="s2" />
                <span className="featured-tag">Featured</span>
                <h6 className="card-helper">CLICK TO VIEW &#8594;</h6>
              </a>
              {courseBoxes}
            </div>
            <hr className="margin" />
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
