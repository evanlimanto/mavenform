import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has, range, map } from 'lodash';

import { Question, MultipleChoiceQuestion } from '../question';
import Sidebar from '../sidebar';

import { courseCodeToLabel, examTypeToLabel, preprocess, termToLabel } from '../../utils';
import { updateExamContent } from '../../actions';

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

class ExamContentComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (!(this.props.id === nextProps.id)) {
      this.props.getExamContent(nextProps.id);
    } else if (this.props.examContentHasLoaded) {
      Scroll.animateScroll.scrollToTop();
    }
  }

  componentDidMount() {
    this.props.getExamContent(this.props.id);
  }

  componentDidUpdate() {
    // Move header to first question element
    const header = document.getElementById("header-text");
    header.parentNode.removeChild(header);
    const firstQuestion = document.getElementsByClassName("element")[0];
    firstQuestion.insertBefore(header, firstQuestion.firstChild);

    scrollSpy.update();
    window.renderMJ();
  }

  render() {
    if (!this.props.examContentHasLoaded) {
      return null;
    }

    const { examContent, appMode, profs, term } = this.props;
    const { courseid, examtype, examid } = this.props.exams[this.props.id];
    const hasSolutions = true;

    const content = map(examContent.info, (num_parts, part) => {
      const subparts = map(range(1, num_parts + 1), subpart => {
        const key = `${part}_${subpart}`;
        if (!has(examContent.problems, key)) {
          console.warn(`${key} doesn't exist in exam!`);
          return null;
        }
        let qcontent = examContent.problems[key].problem || '';
        let solution = examContent.problems[key].solution || '';
        const choices = examContent.problems[key].choices || '';
        qcontent = preprocess(qcontent);
        solution = preprocess(solution);
        if (courseid === 'ugba10') {
          return <MultipleChoiceQuestion id={`${part}_${subpart}`} courseid={courseid} content={qcontent} solutionNum={solution} term={term} examtype={examtype} key={key} appMode={appMode} choices={choices} />
        }
        return <Question id={`${part}_${subpart}`} courseid={courseid} content={qcontent} solution={solution} term={term} examtype={examtype} key={key} appMode={appMode} />
      });

      return <Element name={part} key={part} className="element">{subparts}</Element>;
    });

    const examDesc = (
      <div id="header-text">
        <div className="center">
          <h4>{courseCodeToLabel(courseid)}</h4>
          <h5>{examTypeToLabel(examtype)} | {termToLabel(term)} | {profs}</h5>
        </div>
      </div>
    );

    return (
      <div className="content">
        {examDesc}
        {content}
        {(appMode) ? ((courseid === 'ugba10') ? <Sidebar term={term} courseid={courseid} examtype={examtype} hasSolutions={hasSolutions} examid={examid} /> : <Sidebar info={examContent.info} term={term} courseid={courseid} examtype={examtype} hasSolutions={hasSolutions} examid={examid} />) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    appMode: state.config.appMode,
    examContent: state.exam.examContent,
    examContentHasLoaded: state.exam.examContentHasLoaded,
    exams: state.exams.key_dict,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExamContent: (id) =>
      fetch(`/getExam/${id}`).then(
        (response) => response.json()
      ).then(
        (json) => dispatch(updateExamContent(json))
      ),
  };
};

const ExamContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamContentComponent);

export default ExamContent;
