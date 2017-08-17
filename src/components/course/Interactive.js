import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { showLoginModal, showUploadSuccessModal, updateCourseLabel, updateCourseSubject } from '../../actions';
import { courseCodeToLabel, BASE_URL } from '../../utils';
import { Course } from '../course';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';

const request = require('superagent');

class InteractiveComponent extends Component {
  componentWillMount() {
    if (!this.props.auth.loggedIn())
      return <Course {...this.props} />;
  }

  componentDidMount() {
    InteractiveComponent.fetchData(this.props.dispatch, this.props);
  }

  componentWillMount() {
    
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

  static getMeta(props) {
    const { courseCode, schoolCode, labels, courseLabel } = props;
    const title = ((labels.schools) ? `${labels.schools[schoolCode]} ${courseCodeToLabel(courseCode)} - Studyform` : "Studyform");
    const description = `Study and discuss past exams and practice problems` +
      ((labels.schools) ? ` for ${labels.schools[schoolCode]} ${courseCodeToLabel(courseCode)} - ${courseLabel}.` : `.`);
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }

  render() {
    const { courseCode, schoolCode } = this.props;

    const content = (
      <div className="container info-container">
        <hr className="s5" />
        <img className="info-img" src={`/img/subject/${this.props.courseSubject || "misc"}.png`} />
        <div className="info">
          <h4 className="info-title">{courseCodeToLabel(courseCode)}</h4>
          <hr className="s1" />
          <h5 className="info-subtitle">{!this.props.courseLabel || <span dangerouslySetInnerHTML={{ __html: `${this.props.courseLabel}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;`}} />}
            <Link className="school-link" to={`/${schoolCode}`}>{!this.props.labels || !this.props.labels.schools || this.props.labels.schools[schoolCode]}</Link></h5>
          <hr className="s1" />
          <hr className="s0-5" />
          <p className="info-text">
            Browse, discuss, and upload exams and practice problems below
          </p>
        </div>
      </div>
    );

    return (
      <div>
      {InteractiveComponent.getMeta(this.props)}
      <Navbar schoolCode={schoolCode} courseCode={courseCode} interactive={true} />
      <Modals />
      {content}
      <hr className="s3" />
      <div className="container">
        <p>Based on your class syllabus and our document bank, we’ve generated the following study guides.</p>
        <div><Link to={`/${schoolCode}/${courseCode}/problemset/mt1`}>Midterm 1 (free)</Link></div>
        <div><Link to={`/${schoolCode}/${courseCode}/problemset/mt2`}>Midterm 2 (paid)</Link></div>
        <div><Link to={`/${schoolCode}/${courseCode}/problemset/final`}>Final (paid)</Link></div>
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showUploadSuccessModal: () => dispatch(showUploadSuccessModal()),
    dispatch
  };
};

const Interactive = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InteractiveComponent);

export default Interactive;
