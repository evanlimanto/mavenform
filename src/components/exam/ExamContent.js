import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has, range, map } from 'lodash';

import { updateExamContent } from '../../actions';
import { Question, MultipleChoiceQuestion } from '../question';
import { BASE_URL, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

class ExamContentComponent extends Component {
  componentDidMount() {
    ExamContentComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { schoolCode, courseCode, examTypeCode, termCode } = props;
    return fetch(`${BASE_URL}/getExam/${schoolCode}/${courseCode}/${examTypeCode}/${termCode}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateExamContent(json)));
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode, examTypeCode, termCode, profs } = this.props;
    const examContent = this.props.examContent;
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
          return <Question content_id={content_id} id={part + "_" + subpart} courseCode={courseCode} content={qcontent} solution={solution} termCode={termCode} examType={examTypeCode} key={key} schoolCode={schoolCode} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    examContent: state.examContent,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const ExamContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamContentComponent);

export default ExamContent;
