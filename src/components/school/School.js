import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { keys, has, map, sortBy, split, toInteger } from 'lodash';
import DocumentMeta from 'react-document-meta';

import Footer from '../footer';
import Navbar from '../navbar';
import NotFound from '../notfound';
import { courseClickEvent } from '../../events';
import { normalizeCourseCode } from '../../utils';

class SchoolComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: null
    };
  }

  componentDidMount() {
    fetch(`/getSchoolCourses/${this.props.schoolCode}`)
      .then((response) => response.json())
      .then((json) => this.setState({ courses: json }));
  }

  render() {
    if (this.state.courses && this.state.courses.invalidCode)
      return <NotFound />;

    const schoolCode = this.props.schoolCode;
    const courseItems = (this.state.courses === null) ? "Loading courses..." : (
      (keys(this.state.courses).length > 0) ?
        map(sortBy(this.state.courses, [(course) => course.label]), (obj, subject) => {
          const courseBoxes = map(sortBy(obj.courses, [(course) => toInteger((new RegExp("\\d+")).exec(course.code)[0])]), (course, key) => (
            <Link className="card course-card" to={"/" + schoolCode + "/" + course.code} key={key} onClick={() => courseClickEvent(schoolCode, course.code)}>
              <span>{course.code_label}</span>
              <span className="card-arrow">&#8594;</span>
            </Link>
          ));
          return (
            <div className="department" key={subject}>
              <h1>{obj.label}</h1>
              {courseBoxes}
            </div>
          );
        }) : "No courses yet. Check again for more updates!"
      );

    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode]: null;
    const meta = {
      description: `Interactive and course-specific study resources for ${schoolLabel}.`,
      title: `${schoolLabel} - Studyform`,
    };

    return (
      <div className="school">
        <DocumentMeta {...meta} />
        <Navbar schoolCode={schoolCode} />
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>{schoolLabel}</h4>
                <h5>Available courses</h5>
              </div>
            </div>
            <hr className="s1" />
            <div className="card-container">
              {courseItems}
            </div>
            <hr className="s2" />
            <hr className="margin" />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    labels: state.labels,
    schoolCode: ownProps.match.params.schoolCode
  };
};

const School = connect(
  mapStateToProps
)(SchoolComponent);

export default School;
