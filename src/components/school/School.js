import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { keys, has, map, sortBy, toInteger, takeRight } from 'lodash';
import { Helmet } from 'react-helmet';
import numeral from 'numeral';
import hash from 'string-hash';

import Footer from '../footer';
import Navbar from '../navbar';
import NotFound from '../notfound';
import { updateSchoolCourses, updateSchoolInfo } from '../../actions';
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

  static getMeta(props) {
    const { schoolCode, labels } = props;
    const title = ((labels.schools) ? `${labels.schools[schoolCode]} - Studyform` : "Studyform");
    const description = `Study from interactive past exams and practice problems` +
      ((labels.schools) ? ` for ${labels.schools[schoolCode]} courses.` : `.`);
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }

  static fetchData(dispatch, props) {
    const { schoolCode } = props;
    return Promise.all([
      fetch(`${BASE_URL}/getSchoolCourses/${schoolCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateSchoolCourses(json))),
      fetch(`${BASE_URL}/getSchoolInfo/${schoolCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateSchoolInfo(json)))
    ]);
  }

  getCourseItems() {
    if (!this.props.courses)
      return <p className="loader">Loading courses...</p>;
    if (this.props.courses.notfound)
      return <NotFound />;

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
    const schoolInfo = this.props.schoolInfo;
    const courseItems = this.getCourseItems();
    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode] : null;
    return (
      <div className="school">
        {SchoolComponent.getMeta(this.props)}
        <Navbar schoolCode={schoolCode} />
        <div className="container center">
          <div className="container info-container">
            <hr className="s5" />
            <img className="info-img" src={`/img/${schoolCode}.png`} />
            <div className="info">
              <h4 className="info-title">{schoolLabel}</h4>
              <hr className="s1" />
              <h5 className="info-subtitle">{schoolInfo.address}
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              {numeral(schoolInfo.num_students).format('0,0')} students
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a className="school-link" href={schoolInfo.website} target="_blank">{schoolInfo.website}</a></h5>
              <hr className="s1" />
              <hr className="s0-5" />
              <p className="info-text">
                Browse {numeral(schoolInfo.num_documents).format('0,0')} exams, {numeral(schoolInfo.num_problems).format('0,0')} practice problems, and {(hash(schoolCode) % 10) + toInteger(schoolInfo.num_discussions) + 10} discussion posts below
              </p>
            </div>
            <hr className="s5" />
          </div>
        </div>
        <div className="light-gray border-top">
          <hr className="s2" />
          <div className="card-container">
            {courseItems}
          </div>
          <hr className="s2" />
          <hr className="s7-5" />
        </div>
        <div className="gray-filler"></div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    labels: state.labels,
    courses: state.schoolCourses,
    schoolInfo: state.schoolInfo,
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
