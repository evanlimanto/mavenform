import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loadjs from 'loadjs';
import { map } from 'lodash';
import DocumentMeta from 'react-document-meta';

import { courseClickEvent } from '../../events';
import { courseCodeToLabel } from '../../utils';

const meta = {
  description: 'Course List',
  title: 'Course List',
};

class CoursesComponent extends Component {
  componentWillMount() {
    loadjs('jquery.hideseek.min.js');
  }

  render() {
    const courses = this.props.courses;
    const courseBoxes = map(courses, (course) => {
      const coursecode = course.code;
      return (
        <Link to={`/${coursecode}`} key={coursecode} className="course-card" onClick={() => courseClickEvent(coursecode)}>
          <h1>{courseCodeToLabel(course.code)}</h1>
          <hr className="s1" />
          <i className="course-subtitle">{course.name}</i>
          <h6 className="card-helper">CLICK TO VIEW &#8594;</h6>
        </Link>
      );
    });

    return (
      <div className="courses">
        <DocumentMeta {...meta} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.courses,
  };
};

const Courses = connect(
  mapStateToProps
)(CoursesComponent);

export default Courses;
