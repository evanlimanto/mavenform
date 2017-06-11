import React, { Component } from 'react';
import { has, range, map } from 'lodash';

import { Question, MultipleChoiceQuestion } from '../question';
import { courseCodeToLabel, examTypeToLabel, preprocess, termToLabel } from '../../utils';

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
    window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode, examTypeCode, termCode, profs } = this.props;
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
        if (choices && choices.length > 0) {
          return <MultipleChoiceQuestion id={part + "_" + subpart} courseCode={courseCode} content={qcontent} solutionNum={solution} termCode={termCode} examType={examTypeCode} key={key} choices={choices} schoolCode={schoolCode} />
        }
        return <Question id={part + "_" + subpart} courseCode={courseCode} content={qcontent} solution={solution} termCode={termCode} examType={examTypeCode} key={key} schoolCode={schoolCode} />
      });

      return <span className="element">{subparts}</span>;
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
      <div className="content">
        {examDesc}
        {content}
      </div>
    );
  }
}

export default ExamContent;
