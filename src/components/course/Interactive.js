import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { showCourseRegisterModal, showLoginModal, showUploadSuccessModal, updateCourseLabel, updateCourseSubject } from '../../actions';
import { courseCodeToLabel, BASE_URL } from '../../utils';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';

class InteractiveComponent extends Component {
  componentDidMount() {
    InteractiveComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { courseCode, schoolCode } = props;
    return Promise.all([
      fetch(`${BASE_URL}/getCourseLabel/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseLabel(json.label))),
      fetch(`${BASE_URL}/getCourseSubject/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseSubject(json.subject)))
    ]);
  }

  componentWillMount() {
    if (this.props.registered)
      this.props.showCourseRegisterModal();
  }

  static getMeta(props) {
  }

  render() {
    const { courseCode, schoolCode } = this.props;

    const content = (
      <div className="container info-container">
        <hr className="s5" />
        <img className="info-img" src={`/img/subject/${this.props.courseSubject || "misc"}.png`} alt="subject-logo" />
        <div className="info">
          <h4 className="info-title">{courseCodeToLabel(courseCode)}</h4>
          <hr className="s1" />
          <h5 className="info-subtitle">{!this.props.courseLabel || <span dangerouslySetInnerHTML={{ __html: `${this.props.courseLabel}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;`}} />}
            <Link className="school-link" to={`/${schoolCode}`}>{!this.props.labels || !this.props.labels.schools || this.props.labels.schools[schoolCode]}</Link></h5>
          <hr className="s1" />
          <hr className="s0-5" />
          <p className="info-text">
            Browse and discuss auto-generated practice problems below.
          </p>
        </div>
      </div>
    );

    return (
      <div>
      {InteractiveComponent.getMeta(this.props)}
      <Navbar schoolCode={schoolCode} courseCode={courseCode} problemset={true} />
      <Modals />
      {content}
      <hr className="s3" />
      <div className="container">
        <div className="study-guide-summary-container">
          <h5 align="center">Based on your class syllabus and our document bank, we’ve generated the following study guides.</h5>
          <hr className="s2" />
          <Link className="card" to={`/${schoolCode}/${courseCode}/problemset/mt1`}>Midterm 1</Link>
          <Link className="card" to={`/${schoolCode}/${courseCode}/problemset/mt2`}>Midterm 2 (locked)</Link>
          <Link className="card" to={`/${schoolCode}/${courseCode}/problemset/final`}>Final (locked)</Link>
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    courseLabel: state.courseLabel,
    courseSubject: state.courseSubject,
    labels: state.labels,
    auth: state.auth,
    registered: ownProps.location.search === "?registered=true"
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showUploadSuccessModal: () => dispatch(showUploadSuccessModal()),
    showCourseRegisterModal: () => dispatch(showCourseRegisterModal()),
    dispatch
  };
};

const Interactive = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InteractiveComponent);

export default Interactive;
