import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, replace } from 'lodash';
import { Helmet } from 'react-helmet';

import { showLoginModal, showWaitlistModal, updateCourseExams, updateCourseTopics, updateCourseLabel } from '../../actions';
import { courseCodeToLabel, BASE_URL } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';
import NotFound from '../notfound';

class CourseComponent extends Component {
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
        .then((json) => dispatch(updateCourseLabel(json.label)))
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
        <h4 className="center">{courseCodeToLabel(courseCode)}</h4>
        <div className="center">
          <h5>{!this.props.courseLabel || this.props.courseLabel}</h5>
        </div>
        <hr className="s4" />
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
    topics: state.courseTopics,
    exams: state.courseExams,
    labels: state.labels,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showWaitlistModal: () => dispatch(showWaitlistModal()),
    dispatch
  };
};

const Course = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseComponent);

export default Course;
