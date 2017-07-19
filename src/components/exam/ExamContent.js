import React, { Component } from 'react';
import { has, range, map } from 'lodash';

import { Question, MultipleChoiceQuestion } from '../question';
import { courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

class ExamContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      examContent: null
    };
  }

  componentDidMount() {
    const { schoolCode, courseCode, examTypeCode, termCode } = this.props;
    fetch(`/getExam/${schoolCode}/${courseCode}/${examTypeCode}/${termCode}`).then(
      (response) => response.json()
    ).then(
      (json) => this.setState({ examContent: json })
    )
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode, examTypeCode, termCode, profs } = this.props;
    const examContent = this.state.examContent;
    const content = (!examContent) ? (<p className="loader">Loading content...</p>) :
      map(examContent.info, (num_parts, part) => {
        const subparts = map(range(1, num_parts + 1), subpart => {
          const key = `${part}_${subpart}`;
          if (!has(examContent.problems, key)) {
            console.warn(`${key} doesn't exist in exam!`);
            return null;
          }
          const qcontent = examContent.problems[key].problem || '';
          const solution = examContent.problems[key].solution || '';
          const choices = examContent.problems[key].choices || '';
          const content_id = examContent.problems[key].content_id;
          if (choices && choices.length > 0) {
            return <MultipleChoiceQuestion content_id={content_id} id={part + "_" + subpart} courseCode={courseCode} content={qcontent} solutionNum={solution} termCode={termCode} examType={examTypeCode} key={key} choices={choices} schoolCode={schoolCode} />
          }
          return <Question key={part + "_" + subpart} content_id={content_id} id={part + "_" + subpart} courseCode={courseCode} content={qcontent} solution={solution} termCode={termCode} examType={examTypeCode} key={key} schoolCode={schoolCode} />
        });

        return <span key={part} className="element">{subparts}</span>;
      });

    const examDesc = (
      <div id="header-text">
        <div className="center">
          <h4>{courseCodeToLabel(courseCode)}</h4>
          <h5>{examTypeToLabel(examTypeCode)} | {termToLabel(termCode)} {!this.props.profs || "| " + profs}</h5>
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
