import React, { Component } from 'react';
import { has, range, map } from 'lodash';

import { Question, MultipleChoiceQuestion } from '../question';
import { courseCodeToLabel, examTypeToLabel, preprocess, termToLabel } from '../../utils';

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

class ExamContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      examContent: {
        info: {},
        problems: {},
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!(this.props.id === nextProps.id)) {
      this.props.getExamContent(nextProps.id);
    } else if (this.props.examContentHasLoaded) {
      Scroll.animateScroll.scrollToTop();
    }
  }

  componentDidMount() {
    const { schoolCode, courseCode, examTypeCode, termCode } = this.props;
    fetch(`/getExam/${schoolCode}/${courseCode}/${examTypeCode}/${termCode}`).then(
      (response) => response.json()
    ).then(
      (json) => this.setState({ examContent: json })
    );
  }

  componentDidUpdate() {
    scrollSpy.update();
    window.renderMJ();
  }

  render() {
    const { courseCode, examTypeCode, termCode, profs } = this.props;
    const examContent = this.state.examContent;
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
        if (choices && choices.length > 0) {
          return <MultipleChoiceQuestion id={part + "_" + subpart} courseid={courseCode} content={qcontent} solutionNum={solution} term={termCode} examtype={examTypeCode} key={key} choices={choices} />
        }
        return <Question id={part + "_" + subpart} courseid={courseCode} content={qcontent} solution={solution} term={termCode} examtype={examTypeCode} key={key} />
      });

      return <Element name={part} key={part} className="element">{subparts}</Element>;
    });

    const examDesc = (
      <div id="header-text">
        <div className="center">
          <h4>{courseCodeToLabel(courseCode)}</h4>
          <h5>{examTypeToLabel(examTypeCode)} | {termToLabel(termCode)} | {profs}</h5>
        </div>
      </div>
    );

    return (
      <div>
        {examDesc}
        <div className="content">
          {content}
        </div>
      </div>
    );
  }
}

export default ExamContent;
