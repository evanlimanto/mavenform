import React, { Component } from 'react';
import { keys, identity, map, sortBy } from 'lodash';

import { handleEvent } from '../../utils';
import { courseIDToLabel, courseIsFeatured, courses } from '../../exams';

const Courses = () => {
  const sortedCourses = sortBy(keys(courses), [(course) => !courseIsFeatured[course], identity]);
  const courseBoxes = map(sortedCourses, (course) => {
    return (
      <a key={course} className="course-card" href={`/${course}`} onClick={() => handleEvent('Click', 'Course', course)}>
        <h1>{courseIDToLabel[course]}</h1>
        <hr className="s1" />
        <i className="course-subtitle">{courses[course]}</i>
        {(courseIsFeatured[course]) ?  (<span><hr className="s2" /><span className="featured-tag">Featured</span></span>) : null}
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
            {courseBoxes}
          </div>
          <hr className="margin" />
        </div>
      </div>
    </div>
  );
}

export default Courses;
