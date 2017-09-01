import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, range, replace } from 'lodash';
import { Helmet } from 'react-helmet';
import Dropzone from 'react-dropzone';
import req from 'superagent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { showLoginModal, showUploadSuccessModal, updateCourseExams, updateCourseTopics, updateCourseLabel, updateCourseSubject, updateClassRegistered } from '../../actions';
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

  clickBox(index, professor) {
    this.props.setProfessor(professor);
    this.setState({ selected: index });
  }

  render() {
    const { courseCode } = this.props;
    const professors = ["Drimbe", "Jeggers", "None"];
    const codes = ["001", "002", "003"];
    const syllabi = ["Available", "Available", "None"];
    const cards = map(range(0, 3), (index) => {
      return (
        <div key={index} className={"card int-card " + ((index === this.state.selected) ? "active" : "")} onClick={() => this.clickBox(index, professors[index])} key={index}>
          <div className="int-card-h">{courseCodeToLabel(courseCode)} {codes[index]}</div>
          <p><span className="int-highlight">Instructor(s): </span> {professors[index]}</p>
          <p><span className="int-highlight">Syllabus: </span>
            {(index === 0) ? <a target="_blank" href="http://math.ucsd.edu/~ddrimbe/math18s/syllabus.html">{syllabi[index]}</a> : <a>None</a>}</p>
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
    this.setProfessor = this.setProfessor.bind(this);
    this.professor = null;
    this.state = {
      getInfo: false,
    };
  }

  componentDidMount() {
    CourseComponent.fetchData(this.props.dispatch, this.props);
  }

  setProfessor(professor) {
    this.professor = professor;
  }

  static fetchData(dispatch, props) {
    const { courseCode, schoolCode } = props;
    const profile = canUseDOM ? props.auth.getProfile() : null;
    const auth_user_id = profile ? profile.user_id : null;
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
        .then((json) => dispatch(updateCourseSubject(json.subject))),
      fetch(`${BASE_URL}/checkUserClassRegistered/${schoolCode}/${courseCode}/${auth_user_id}`)
        .then((response) => response.text())
        .then((text) => dispatch(updateClassRegistered(text === "Available")))
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
    const term = "fa";
    const year = 2017;
    const professor = this.professor;
    const auth_user_id = this.props.auth.getProfile().user_id;
    const { courseCode, schoolCode } = this.props;
    if (professor.length === 0)
      return;
    req.post('/registerClass')
      .send({ term, year, professor, auth_user_id, courseCode, schoolCode })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
        document.location = `/${schoolCode}/${courseCode}/problemset?register=true`;
      });
  }

  getInfo() {
    if (!this.props.auth.loggedIn())
      return this.props.showLoginModal();
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

    const interactiveBox = (courseCode === "MATH53") ? (
      <div className="container interactive-container">
        <div className="int-box">
          {this.props.classRegistered ? (
            <p className="int-helper">
              <span className="int-highlight">You've signed up for the AI-generated problem set for this course! </span>
              <Link className="int-browse-link" to={`/${schoolCode}/${courseCode}/problemset`}>Click here to browse.</Link>
            </p>
          ) : (
            <span>
              <p className="int-helper">
                  <span className="int-highlight">Interactive study mode available.</span> Study from an AI-generated study guide personalized to your class and professor.
                </p>
              {/*<ReactCSSTransitionGroup
                transitionName="getInfoButton"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {this.state.getInfo ? null : (<button className="int-button" onClick={this.getInfo}>Get Started</button>)}
              </ReactCSSTransitionGroup>*/}
              <Link to="/interactive/math53"><button className="int-button">Get Started</button></Link>
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
              <InteractiveCards setProfessor={this.setProfessor} courseCode={courseCode} />
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
        <hr className="s1" />
        {interactiveBox}
        <hr className="s1" />
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
    classRegistered: state.classRegistered,
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
