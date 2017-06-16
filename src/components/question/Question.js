import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import { copyQuestionLinkEvent } from '../../events';
import { setQuestionCopied } from '../../actions';
import Expire from './Expire';
import Solution from './Solution';

class QuestionComponent extends Component {
  render() {
    const { id, schoolCode, courseCode, examType, termCode, solution, copying, copyQuestionLink, doneCopyingLink, content } = this.props;

    const SolutionComponent = (
      <Solution solution={solution} />
    );
    const url = `${document.location.origin}/${schoolCode}/${courseCode}/${examType}/${termCode}#${id}`;

  return (
    <div id={id} className="question">
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
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        {SolutionComponent}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    content: ownProps.content,
    solution: ownProps.solution,
    copying: state.question.copying,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    copyQuestionLink: (url) => {
      copy(url);
      copyQuestionLinkEvent();
      dispatch(setQuestionCopied(true))
    },
    doneCopyingLink: () => {
      dispatch(setQuestionCopied(false))
    }
  };
};

const Question = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionComponent);

export default Question;
