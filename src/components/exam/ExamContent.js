import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has, range, replace, map } from 'lodash';

import MDRenderer from './MDRenderer';
import { Question, MultipleChoiceQuestion } from '../question';
import Sidebar from '../sidebar';

import { courseIDToLabel, examTypeToLabel, termToLabel } from '../../exams';
import { updateExamContent } from '../../actions';

const preprocess = function(text) {
  text = replace(text, /\./g, '\\.');
  text = replace(text, /_/g, '\\_');
  text = replace(text, /&amp;/g, '&');
  text = MDRenderer(text);
  return text;
};

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

class ExamContentComponent extends Component {
  componentWillReceiveProps(nextProps) {
    const { courseid, examtype, examid } = nextProps
    if (!(this.props.courseid === nextProps.courseid &&
          this.props.examtype === nextProps.examtype &&
          this.props.examid === nextProps.examid)) {
      this.props.getExamContent(courseid, examtype, examid);
    } else if (this.props.examContentHasLoaded) {
      Scroll.animateScroll.scrollToTop();
    }
  }

  componentDidMount() {
    const { courseid, examtype, examid } = this.props
    this.props.getExamContent(courseid, examtype, examid);
  }

  componentDidUpdate() {
    // Move header to first question element
    var header = document.getElementById("header-text");
    header.parentNode.removeChild(header);
    var firstQuestion = document.getElementsByClassName("element")[0];
    firstQuestion.insertBefore(header, firstQuestion.firstChild);

    scrollSpy.update();
    window.renderMJ();
  }

  render() {
    if (!this.props.examContentHasLoaded) {
      return null;
    }

    const { examContent, courseid, examtype, examid, appMode, profs, term } = this.props;
    const hasSolutions = true;

    const content = map(examContent.info, (num_parts, part) => {
      const subparts = map(range(1, num_parts + 1), subpart => {
        const key = `${part}_${subpart}`;
        if (!has(examContent.problems, key)) {
          console.warn(`${key} doesn't exist in exam!`);
          return null;
        }
        var qcontent = examContent.problems[key].problem || '';
        var solution = examContent.problems[key].solution || '';
        var choices = examContent.problems[key].choices || '';
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
          <h4>{courseIDToLabel[courseid]}</h4>
          <h5>{examTypeToLabel[examtype]} | {termToLabel[term]} | {profs}</h5>
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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExamContent: (courseid, examtype, examid) =>
      fetch(`/getExam/${courseid}/${examtype}/${examid}`).then(
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
