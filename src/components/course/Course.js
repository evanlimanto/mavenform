import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, range, replace } from 'lodash';
import { Helmet } from 'react-helmet';
import Dropzone from 'react-dropzone';
import req from 'superagent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { showSignupModal, showUploadSuccessModal, updateCourseExams, updateCourseLabel,
         updateCourseSubject, updateRegisteredLecture, updateCourseLectures } from '../../actions';
import { canUseDOM, courseCodeToLabel, BASE_URL } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';

class InteractiveCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
    this.clickBox = this.clickBox.bind(this);
  };

  clickBox(id) {
    this.setState({ selected: id });
    this.props.setSelectedLecture(id);
  }

  render() {
    const cards = map(this.props.courseLectures, (lecture) => {
      return (
        <div key={lecture.id} className={"card int-card " + ((lecture.id === this.state.selected) ? "active" : "")} onClick={() => this.clickBox(lecture.id)}>
          <div className="int-card-h">{courseCodeToLabel(this.props.courseCode)} {lecture.lecture_code}</div>
          <p><span className="int-highlight">Instructor(s): </span> {lecture.professor}</p>
          <p><span className="int-highlight">Syllabus: </span>
          {lecture.syllabus_url && lecture.syllabus_url.length > 0 ? (<a target="_blank" href={lecture.syllabus_url}>Syllabus</a>) : "Unavailable"}
          </p>
        </div>
      );
    });
    return (
      <div>{cards}</div>
    );
  }
}

class CourseComponent extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.registerClass = this.registerClass.bind(this);
    this.unregisterClass = this.unregisterClass.bind(this);
    this.setSelectedLecture = this.setSelectedLecture.bind(this);
    this.professor = null;
    this.state = {
      lectureInfo: { lecture_code: null },
      getInfo: false,
    };
  }

  componentDidMount() {
    CourseComponent.fetchData(this.props.dispatch, this.props);
    const { courseCode, schoolCode, auth } = this.props;
    const profile = canUseDOM ? auth.getProfile() : null;
    const auth_user_id = profile ? profile.user_id : null;
    fetch(`/getLectureInfo/${auth_user_id}/${schoolCode}/${courseCode}`)
      .then((response) => response.json())
      .then((json) => this.setState({ lectureInfo: json }))
  }

  setSelectedLecture(id) {
    this.selectedId = id;
  }

  static fetchData(dispatch, props) {
    const { courseCode, schoolCode } = props;
    const profile = canUseDOM ? props.auth.getProfile() : null;
    const auth_user_id = profile ? profile.user_id : null;
    return Promise.all([
      fetch(`${BASE_URL}/getCourseExams/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseExams(json))),
      fetch(`${BASE_URL}/getCourseLabel/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseLabel(json.label))),
      fetch(`${BASE_URL}/getCourseSubject/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseSubject(json.subject))),
      fetch(`${BASE_URL}/getCourseLecturesByCode/${schoolCode}/${courseCode}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateCourseLectures(json))),
      fetch(`${BASE_URL}/getRegisteredLecture/${schoolCode}/${courseCode}/${auth_user_id}`)
        .then((response) => response.json())
        .then((json) => dispatch(updateRegisteredLecture(json.lecture_code)))
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

  registerClass() {
    const { courseCode, schoolCode } = this.props;
    const auth_user_id = this.props.auth.getProfile().user_id;
    const id = this.selectedId;
    req.post('/registerClass')
      .send({ auth_user_id, lectureid: id })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        document.location = `/interactive/${schoolCode}/${courseCode}`;
      });
  }

  unregisterClass() {
    const auth_user_id = this.props.auth.getProfile().user_id;
    const { courseCode, schoolCode } = this.props;
    const self = this;
    req.post('/unregisterClass')
      .send({ auth_user_id, courseCode, schoolCode })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        self.props.dispatch(updateRegisteredLecture(null));
      });
  }

  getInfo() {
    if (!this.props.auth.loggedIn())
      return this.props.showSignupModal();
    this.setState({ getInfo: !this.state.getInfo });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const profile = this.props.auth.getProfile();
    const request = req.post('/upload');
    acceptedFiles.forEach((file) => {
      request.attach(file.name, file);
    });
    request.field('schoolCode', this.props.schoolCode)
      .field('courseCode', this.props.courseCode);
    if (profile)
      request.field('auth_user_id', profile.user_id)
    request.end((err, res) => {
        if (err || !res.ok) console.log(err);
        else this.props.showUploadSuccessModal();
    });
  }

  render() {
    const { courseCode, schoolCode } = this.props;
    const { lectureInfo } = this.state;
    const exams = map(this.props.exams, (exam, key) => {
      if (key === "notfound")
        return null;
      const typeCode = exam.type_code;
      const typeLabel = exam.type_label;
      const termCode = exam.term_code;
      const termLabel = exam.term_label;
      const profs = exam.profs, regexp = /, /g;
      let url = `/${schoolCode}/${courseCode}/${typeCode}-${termCode}`;
      if (profs !== "None")
        url = url + `-${replace(profs, regexp, '_')}`;
      return (
        <tr key={key} className="available" onClick={() => examClickEvent(schoolCode, courseCode, typeCode, termCode)}>
          <td><Link to={url}>{typeLabel}</Link></td>
          <td><Link to={url}>{termLabel}</Link></td>
          <td><Link to={url}>{profs === "None" ? "-" : profs}</Link></td>
          <td><Link to={url}>{exam.solutions_available ? ( <span className="available">Available</span> ) : ( <span className="unavailable">Unavailable</span> )}</Link></td>
          <td><h6><Link to={url} className="table-link">CLICK TO VIEW &#8594;</Link></h6></td>
        </tr>
      );
    });

    const interactiveBox = (courseCode === "MATH53" || courseCode === "MATH54" || courseCode === "MATH1A" || courseCode === "MATH1B" || courseCode === "MATH16A" || courseCode === "MATH16B") ? (
      <div className="container interactive-container">
        <div className="int-box">
          {this.props.registeredLecture ? (
            <span>
              <p className="int-helper">
                You've already signed up for the interactive study guide for <span className="int-highlight">{courseCodeToLabel(courseCode)} {lectureInfo.lecture_code}</span>.
              </p>
              <button className="int-button int-button-white int-button-spacer" onClick={this.unregisterClass}>Remove</button>
              <Link to={`/${schoolCode}/${courseCode}/interactive`}><button className="int-button">View</button></Link>
            </span>
          ) : (
            <span>
              <p className="int-helper">
                  <span className="int-highlight">Interactive study mode available.</span> Study from an interactive study guide personalized to your class and professor.
                </p>
              <ReactCSSTransitionGroup
                transitionName="getInfoButton"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {this.state.getInfo ? null : (<button className="int-button" onClick={this.getInfo}>Get Started</button>)}
              </ReactCSSTransitionGroup>
            </span>
          )}
          <ReactCSSTransitionGroup
            transitionName="getInfo"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
          {this.state.getInfo ? (
            <div key={0} className="int-form">
              <hr className="s2" />
              <p className="int-helper">Great! To get started, please select the option below that best matches your class information and syllabus.</p>
              <hr className="s1" />
              <InteractiveCards courseLectures={this.props.courseLectures} courseCode={courseCode} setSelectedLecture={this.setSelectedLecture} />
              <hr className="s2" />
              <input type="button" className="blue" value="Sign Up" onClick={this.registerClass} />
              <input type="button" className="gray" value="Cancel" onClick={this.getInfo}/>
            </div>) : null}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    ) : null;

    const content = (
      <div>
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
              Browse, discuss, and upload exams and practice problems below.
            </p>
          </div>
        </div>
        <hr className="s3" />
        {interactiveBox}
        <hr className="s1" />
        <hr className="s0-5" />
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
            <Dropzone onDrop={this.onDrop} className="upload-exam"> Click to upload an exam or document to convert (.pdf, .doc, .docx, .jpg, .png files only) </Dropzone>
          </td>
        </tr>
        {exams}
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
          <span>{topic.concept} (<b>{topic.problem_count} problem{topic.problem_count <= 1 || "s"}</b>)</span>
          <span className="card-arrow">&#8594;</span>
        </Link>
      );
    });

    return (
      <div>
      {CourseComponent.getMeta(this.props)}
      <Navbar schoolCode={schoolCode} courseCode={courseCode} />
      <Modals />
      {content}
      <hr className="s8" />
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
    registeredLecture: state.registeredLecture,
    courseLectures: state.courseLectures,
    labels: state.labels,
    auth: state.auth,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showSignupModal: () => dispatch(showSignupModal()),
    showUploadSuccessModal: () => dispatch(showUploadSuccessModal()),
    dispatch
  };
};

const Course = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseComponent);

export default Course;
