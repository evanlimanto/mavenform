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
        <td><Link to={url}>{exam.solutions_available ? ( <span className="available">Available</span> ) : ( <span className="unavailable">Unavailable</span> )}</Link></td>
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
          <h5>Index of study resources</h5>
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
        <th>Solutions</th>
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
        </div>
      </div>
    );

    let topicsContent = ( <hr className="s8" /> ), mathTopics = null;
    if ((schoolCode === 'ucsd' && (courseCode === 'MATH10A' || courseCode === 'MATH20C' || courseCode === 'MATH20D') || (courseCode === 'MATH18')) ||
        (schoolCode === 'ucb' && (courseCode === 'MATH53' || courseCode === 'MATH1A'))) {
      if (courseCode === 'MATH10A') {
        mathTopics = [
          { concept: 'Functions', code: 'functions' },
          { concept: 'Limits and Derivatives', code: 'limitsandderivatives' },
          { concept: 'Differentiation', code: 'differentiation' },
          { concept: 'Applications of Differentiation', code: 'applicationsofdifferentiation' },
        ];
      } else if (courseCode === 'MATH20C') {
        mathTopics = [
          { concept: 'Vectors in 2D and 3D Space', code: 'vectors' },
          { concept: 'Inner Product, Length and Distance', code: 'innerproductlengthdistance' },
          { concept: 'Matrices, Determinants and the Cross Product', code: 'matricesdeterminantscrossproduct' },
          { concept: 'Limits and Continuity', code: 'limitsandcontinuity' },
          { concept: 'Differentiation', code: 'differentiation' },
          { concept: 'Introduction to Paths and Curves', code: 'intropathscurves' },
          { concept: 'Properties of the Derivative', code: 'propertiesofderivative' },
          { concept: 'Gradients and Directional Derivatives', code: 'gradientsanddirectionalderivatives' },
        ];
      } else if (courseCode === 'MATH20D') {
        mathTopics = [
          { concept: 'First-Order Equations', code: 'firstordereqns' },
          { concept: 'Linear Second-Order Equations', code: 'linearsecondordereqns' },
        ];
      } else if (courseCode === 'MATH53') {
        mathTopics = [
          { concept: 'Parametric Equations', code: 'parametriceqns' },
          { concept: 'Vectors, Planes and Surfaces', code: 'vectorsplanesandsurfaces' },
          { concept: 'Vector Functions', code: 'vectorfunctions' },
          { concept: 'Partial Derivatives', code: 'partialderivatives' },
          { concept: 'Multiple Integrals', code: 'multipleintegrals' },
          { concept: 'Vector Calculus', code: 'vectorcalculus' },
        ];
      } else if (courseCode === 'MATH54') {
        mathTopics = [
          { concept: 'First-Order Equations', code: 'firstordereqns' },
          { concept: 'Linear Second-Order Equations', code: 'linearsecondordereqns' },
        ];
      } else if (courseCode === 'MATH1A') {
        mathTopics = [
          { concept: 'Functions', code: 'functions' },
          { concept: 'Limits and Derivatives', code: 'limitsandderivatives' },
          { concept: 'Differentiation', code: 'differentiation' },
          { concept: 'Applications of Differentiation', code: 'applicationsofdifferentiation' },
          { concept: 'Integrals', code: 'integrals' },
          { concept: 'Applications of Integration', code: 'applicationsofintegration' },
        ];
      } else if (courseCode === 'MATH18') {
        mathTopics = [
          { concept: 'Systems of Linear Equations', code: 'systemsoflineareqns' },
          { concept: 'Row Reduction and Echelon Forms', code: 'rowreductionechelonforms' },
          { concept: 'Vector Equations', code: 'vectoreqns' },
          { concept: 'Introduction to Linear Transformations', code: 'introtolineartransformations' },
        ];
      }
      const topicCards = map(mathTopics, (topic) => {
        return (
          <Link key={topic.code} className="card topic-card" to={"/" + schoolCode + "/" + courseCode + "/" + topic.code}>
            <span>{topic.concept}</span>
            <span className="card-arrow">&#8594;</span>
          </Link>
        );
      });
      topicsContent = (
        <div name="subjects">
          <hr className="s5" />
          <h5>Based on the exams above, these are our suggested practice problems by topic...</h5>
          <hr className="s4" />
          <div className="card-container topic-card-container">
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
