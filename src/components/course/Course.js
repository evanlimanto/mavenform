import React, { Component } from 'react'; import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { has, map } from 'lodash';
import DocumentMeta from 'react-document-meta';

import { showLoginModal, showWaitlistModal } from '../../actions';
import { courseCodeToLabel } from '../../utils';
import { examClickEvent } from '../../events';
import Footer from '../footer';
import { Modals } from '../modal';
import Navbar from '../navbar';

class CourseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: null,
      modalError: null,
      modal: null,
      mathTopics: null,
    };
  }

  componentDidMount() {
    const { courseCode, schoolCode } = this.props;
    fetch(`/getCourseExams/${schoolCode}/${courseCode}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ exams: json }));
  }

  render() {
    const { courseCode, schoolCode } = this.props;
    const available = map(this.state.exams, (exam, key) => {
      const typeCode = exam.type_code;
      const typeLabel = exam.type_label;
      const termCode = exam.term_code;
      const termLabel = exam.term_label;
      const profs = exam.profs;
      const url = `/${schoolCode}/${courseCode}/${typeCode}/${termCode}`;
      return (
        <tr key={key} className="available" onClick={() => examClickEvent(schoolCode, courseCode, typeCode, termCode)}>
        <td><Link to={url}>{typeLabel}</Link></td>
        <td><Link to={url}>{termLabel}</Link></td>
        <td><Link to={url}>{profs}</Link></td>
        <td><h6><Link to={url} className="table-link">CLICK TO VIEW &#8594;</Link></h6></td>
        </tr>
      );
    });

    const schoolLabel = (this.props.labels && has(this.props.labels.schools, schoolCode)) ? this.props.labels.schools[schoolCode]: null;
    const meta = {
      description: `Find interactive ${courseCodeToLabel(courseCode)} past midterms and finals from ${schoolLabel} here.`,
      title: `${courseCodeToLabel(courseCode)} - ${schoolLabel} - Studyform`,
    };
    const content = (
      <div>
        <h4 className="center">{courseCodeToLabel(courseCode)}</h4>
        <div className="center">
          <h5>Index of resources</h5>
        </div>
        <hr className="s4" />
        <div className="center">
        {!!this.state.exams || <p className="loader">Loading exams...</p>}
        <div className="table-container-container">
        <div className="table-container">
        <table className="exams center">
        <thead>
        <tr>
        <th>Type</th>
        <th>Term</th>
        <th>Instructors</th>
        <th>Studyform</th>
        </tr>
        </thead>
        <tbody>
        {available}
        </tbody>
        </table>
        {!!this.state.exams || <p>Loading exams...</p>}
        </div>
        </div>
        <hr className="s7-5" />
        </div>
      </div>
    );

    let topicsContent = null, mathTopics = null;
    if (schoolCode === 'ucsandiego' && (courseCode === 'MATH10A' || courseCode === 'MATH20C')) {
      if (courseCode === 'MATH10A') {
        mathTopics = [
          { concept: 'Functions', code: 'functions' },
          { concept: 'Limits and Derivatives', code: 'limitsandderivatives' },
          { concept: 'Differentiation', code: 'differentiation' },
          { concept: 'Applications of Differentiation', code: 'applicationsofdifferentiation' },
        ];
      } else if (courseCode === 'MATH20C') {
        mathTopics = [
          { concept: 'Vectors, Planes and Surfaces', code: 'vectorsplanesandsurfaces' },
          { concept: 'Functions', code: 'functions' },
          { concept: 'Limits and Derivatives', code: 'limitsandderivatives' },
          { concept: 'Differentiation', code: 'differentiation' },
          { concept: 'Multiple Integrals', code: 'multipleintegrals' }
        ];
      }
      const topicCards = map(mathTopics, (topic) => {
        return (
          <Link className="card" to={"/math/" + topic.code}>
            <span>{topic.concept}</span>
            <span className="card-arrow">&#8594;</span>
          </Link>
        );
      });
      topicsContent = (
        <div name="subjects" className="light-gray schools">
          <hr className="s7-5" />
          <h4 className="center">Topics</h4>
          <hr className="s1" />
          <h5>Browse resources by topic</h5>
          <hr className="s3" />
          <div className="card-container">
            {topicCards}
            <hr className="s7-5" />
          </div>
        </div>
      );
    }

    return (
      <div>
      <DocumentMeta {...meta} />
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
    auth: state.auth,
    courseCode: ownProps.match.params.courseCode,
    schoolCode: ownProps.match.params.schoolCode,
    exams: state.exams.multi_dict,
    labels: state.labels,
  }
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showWaitlistModal: () => dispatch(showWaitlistModal()),
  };
};

const Course = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseComponent);

export default Course;
