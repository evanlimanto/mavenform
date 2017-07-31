import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, replace } from 'lodash';
import { Helmet } from 'react-helmet';
import Dropzone from 'react-dropzone';

import { showLoginModal, showUploadSuccessModal, updateCourseExams, updateCourseTopics, updateCourseLabel, updateCourseSubject } from '../../actions';
import { courseCodeToLabel, BASE_URL } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';
import NotFound from '../notfound';

const request = require('superagent');

class CourseComponent extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    CourseComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { courseCode, schoolCode } = props;
    return Promise.all([
      fetch(`${BASE_URL}/getCourseExams/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseExams(json))),
      fetch(`${BASE_URL}/getCourseTopics/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseTopics(json))),
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

  onDrop(acceptedFiles, rejectedFiles) {
    const profile = this.props.auth.getProfile();
    const req = request.post('/upload');
    acceptedFiles.forEach((file) => {
      req.attach(file.name, file);
    });
    req.field('schoolCode', this.props.schoolCode)
      .field('courseCode', this.props.courseCode);
    if (profile)
      req.field('auth_user_id', profile.user_id)
    req.end((err, res) => {
        if (err || !res.ok) console.log(err);
        else this.props.showUploadSuccessModal();
    });
  }

  render() {
    if (this.props.exams.notfound)
      return <NotFound />;

    const { courseCode, schoolCode } = this.props;
    const available = map(this.props.exams, (exam, key) => {
      const typeCode = exam.type_code;
      const typeLabel = exam.type_label;
      const termCode = exam.term_code;
      const termLabel = exam.term_label;
      const profs = exam.profs, regexp = /, /g;
      const url = `/${schoolCode}/${courseCode}/${typeCode}/${termCode}/${replace(profs, regexp, '-')}`;
      return (
        <tr key={key} className="available" onClick={() => examClickEvent(schoolCode, courseCode, typeCode, termCode)}>
          <td><Link to={url}>{typeLabel}</Link></td>
          <td><Link to={url}>{termLabel}</Link></td>
          <td><Link to={url}>{profs}</Link></td>
          <td><Link to={url}>{exam.solutions_available ? ( <span className="available">Available</span> ) : ( <span className="unavailable">Unavailable</span> )}</Link></td>
          <td><h6><Link to={url} className="table-link">CLICK TO VIEW &#8594;</Link></h6></td>
        </tr>
      );
    });

    const content = (
      <div>
       <div className="container info-container">
          <hr className="s5" />
          <img className="info-img" src={`/img/subject/${this.props.courseSubject || "misc"}.png`} />
          <div className="info">
            <h4 className="info-title">{courseCodeToLabel(courseCode)}</h4>
            <hr className="s1" />
            <h5 className="info-subtitle">{!this.props.courseLabel || this.props.courseLabel}
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link className="school-link" to={`/${schoolCode}`}>{!this.props.labels || !this.props.labels.schools || this.props.labels.schools[schoolCode]}</Link></h5>
            <hr className="s1" />
            <hr className="s0-5" />
            <p className="info-text">
              Browse, discuss, and upload exams and practice problems below
            </p>
          </div>
        </div>
        <hr className="s5" />
        <div className="center">
        {!!this.props.exams || <p className="loader">Loading exams...</p>}
        <div className="table-container-container">
        <div className="table-container">
        <table className="exams center">
        <thead>
        <tr>
        <th>Type</th>
        <th>Term</th>
        <th>Instructors</th>
        <th>Solutions</th>
        <th>Studyform</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="upload-exam-container" colSpan="5">
            <Dropzone onDrop={this.onDrop} className="upload-exam"> Click to upload an exam to convert (.pdf, .doc, .docx, .jpg, .png files only) </Dropzone>
          </td>
        </tr>
        {available}
        </tbody>
        </table>
        {!!this.props.exams || <p>Loading exams...</p>}
        </div>
        </div>
        </div>
      </div>
    );

    const topicCards = map(this.props.topics, (topic) => {
      return (
        <Link key={topic.code} className="card topic-card" to={"/" + schoolCode + "/" + courseCode + "/" + topic.code}>
          <span>{topic.concept}</span>
          <span className="card-arrow">&#8594;</span>
        </Link>
      );
    });

    const topicsContent = (this.props.topics.length > 0) ? (
      <div name="subjects">
        <hr className="s5" />
        <h5>Based on the exams above, these are our suggested practice problems by topic...</h5>
        <hr className="s4" />
        <div className="card-container topic-card-container">
          {topicCards}
          <hr className="s7-5" />
        </div>
      </div>
    ) : <hr className="s8" />;

    return (
      <div>
      {CourseComponent.getMeta(this.props)}
      <Navbar schoolCode={schoolCode} courseCode={courseCode} />
      <Modals />
      {content}
      {topicsContent}
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
    topics: state.courseTopics,
    exams: state.courseExams,
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

const Course = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseComponent);

export default Course;
