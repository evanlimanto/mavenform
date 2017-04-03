import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has, endsWith, keys, range, replace, map, reduce, values} from 'lodash';

import MDRenderer from './MDRenderer';
import { Question } from '../question';
import Sidebar from '../sidebar';

import { courseIDToLabel, examTypeToLabel, termToLabel } from '../../exams';
import { updateExamContent } from '../../actions';

const preprocess = function(text) {
  text = replace(text, /\./g, '\\.');
  text = replace(text, /_/g, '\\_');
  text = MDRenderer(text);
  text = replace(text, /&amp;/g, '&');
  return text;
};

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

class ExamContentComponent extends Component {
  componentDidMount() {
    this.props.getExamContent();
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

    const { examContent, courseid, examtype, examid, appMode } = this.props;
    const examCode = `${examContent.course}${examContent.ref}`;
    const problemIDs = keys(examContent.parts);
    const problemTitles = values(examContent.questions);
    const { course, prof, type, term, md, mcq, num, pre } = examContent;
    const hasSolutions = reduce(examContent, function(result, value, key) {
      return result || endsWith(key, "_s");
    }, false);

    const content = map(examContent.parts, (num_parts, part) => {
      const subparts = map(range(1, num_parts + 1), subpart => {
        const key = `${part}_${subpart}`;
        if (!has(examContent, key)) {
          console.warn(`${key} doesn't exist in exam!`);
          return null;
        }
        var qcontent = examContent[key] || '';
        var solution = examContent[key + "_s"] || '';
        // TODO: Remove md from .yml files
        qcontent = preprocess(qcontent);
        solution = preprocess(solution);
        return <Question id={`${part}_${subpart}`} courseid={courseid} content={qcontent} solution={solution} term={term} examType={type} key={key} appMode={appMode} />
      });

      return <Element name={part} key={part} className="element">{subparts}</Element>;
    });

    const examDesc = (
      <div id="header-text">
        <div className="center">
          <h4>{courseIDToLabel[course]}</h4>
          <h5>{examTypeToLabel[type]} | {termToLabel[term]} | {prof}</h5>
        </div>
        <div dangerouslySetInnerHTML={{__html: pre}} />
      </div>
    );

    return (
      <div className="content">
        {examDesc}
        {content}
        {(appMode) ? <Sidebar problemIDs={problemIDs} term={term} courseid={courseid} examType={type} hasSolutions={hasSolutions} examid={examid} /> : null}
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
    getExamContent: () =>
      fetch(`/getExam/${ownProps.courseid}/${ownProps.examtype}/${ownProps.examid}`).then(
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