import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { keys, identity, map, sortBy } from 'lodash';

import { courseClickEvent } from '../../events';
import { courseIDToLabel, courseIsFeatured, courses } from '../../exams';

class Courses extends Component {
  render() {
    const sortedCourses = sortBy(keys(courses), [(courseid) => !courseIsFeatured[courseid], identity]);
    const courseBoxes = map(sortedCourses, (courseid) => {
      return (
        <Link to={`/${courseid}`} key={courseid} className="course-card" onClick={() => courseClickEvent(courseid)}>
          <h1>{courseIDToLabel[courseid]}</h1>
          <hr className="s1" />
          <i className="course-subtitle">{courses[courseid]}</i>
          {(courseIsFeatured[courseid]) ?  (<span><hr className="s2" /><span className="featured-tag">Featured</span></span>) : null}
          <h6 className="card-helper">CLICK TO VIEW &#8594;</h6>
        </Link>
      );
    });

    return (
      <div className="courses">
        <div className="banner">
          <Link to="/" className="material-icons courses-back">keyboard_backspace</Link>
          <div className="banner-img"></div>
          <div className="banner-text content">
            <div className="banner-header">Courses</div>
            <hr className="s2" />
            <h5 className="h5-alt">Currently available exam sets</h5>
            <hr className="s5" />
            <div className="material-icons search-icon">search</div>
            <input id="search" name="search" placeholder="Type a course name or description here..." type="text" data-list=".course-list" data-toggle="hideseek" autoComplete="off" />
          </div>
        </div>
        <div className="card-container-container">
          <div className="card-container center">
            <hr className="margin" />
            <div className="course-list">
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
