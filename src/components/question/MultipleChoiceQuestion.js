import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import classnames from 'classnames';
import { map, split } from 'lodash';

import Expire from './Expire';
import { copyQuestionLinkEvent } from '../../events';

const MultipleChoiceQuestionComponent = ({ id, courseid, content, examtype, term, solutionNum, choices }) => {
  solutionNum = (solutionNum) ? (solutionNum - 1) : null;
  const options = map(split(choices, '~'), (choice, index) => {
    choice = `${String.fromCharCode(index + 65)}) ${choice}`;
    const optionClass = classnames({
      option: true,
      right: (index === solutionNum),
    });
    return <div key={index} tabIndex="0" className={optionClass} dangerouslySetInnerHTML={{__html: choice}}></div>;
  });

  const url = `${document.location.origin}/${courseid}/${examtype}/${term}#${id}`;
  return (
    <div id={id} className="question mc-question">
      <div className="tooltip-container">
        <a className="arrow material-icons">keyboard_arrow_down</a>
        <div className="question-options">
          <a className="question-option">
            <span className="material-icons">link</span>
            <span>Copy Link</span>
          </a>
          <a className="question-option">
            <span className="material-icons">report</span>
            <span>Report Error</span>
          </a>
          <a className="question-option">
            <span className="material-icons">share</span>
            <span>Share Question</span>
          </a>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
      <hr className="s1" />
      {options}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    courseid: ownProps.courseid,
    content: ownProps.content,
    examtype: ownProps.examtype,
    term: ownProps.term,
    choices: ownProps.choices,
    solutionNum: ownProps.solutionNum,
  };
};

const MultipleChoiceQuestion = connect(
  mapStateToProps,
)(MultipleChoiceQuestionComponent);

export default MultipleChoiceQuestion;
