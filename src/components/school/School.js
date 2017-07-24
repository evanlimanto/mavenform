import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduce, keys, has, map, sortBy, toInteger, takeRight } from 'lodash';
import DocumentMeta from 'react-document-meta';

import Footer from '../footer';
import Navbar from '../navbar';
import NotFound from '../notfound';
import { updateSchoolCourses } from '../../actions';
import { courseClickEvent } from '../../events';
import { BASE_URL } from '../../utils';

class SchoolComponent extends Component {
  constructor(props) {
    super(props);

    this.getCourseItems = this.getCourseItems.bind(this);
  }

  componentDidMount() {
    SchoolComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { schoolCode } = props;
    return fetch(`${BASE_URL}/getSchoolCourses/${schoolCode}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateSchoolCourses(json)));
  }

  getCourseItems() {
    if (!this.props.courses) {
      return <p className="loader">Loading courses...</p>;
    }

    const schoolCode = this.props.schoolCode;
    return map(sortBy(this.props.courses, [(obj) => -keys(obj.courses).length]), (obj, subject) => {
      const courseBoxes = map(sortBy(obj.courses, [(course) => toInteger((new RegExp("\\d+")).exec(course.code)[0]),
                                                   (course) => takeRight(course.code)]), (course, key) => {
        return (
          <Link className="card course-card" to={"/" + schoolCode + "/" + course.code}
           key={key} onClick={() => courseClickEvent(schoolCode, course.code)}>
            <span>{course.code_label}</span>
            <span className="card-arrow">&#8594;</span>
          </Link>
        );
      });
      return (
        <div className="department" key={subject}>
          <h1>{obj.label}</h1>
          {courseBoxes}
        </div>
      );
    });
  }

  render() {
    if (this.props.courses && this.props.courses.invalidCode)
      return <NotFound />;

    const schoolCode = this.props.schoolCode;
    const courseItems = this.getCourseItems();
    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode] : null;
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
            <hr className="s7-5" />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.schoolCourses,
    labels: state.labels,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
}

const School = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SchoolComponent);

export default School;
