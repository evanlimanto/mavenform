import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import { copyQuestionLinkEvent } from '../../events';
import { setQuestionCopied } from '../../actions';
import Expire from './Expire';
import Solution from './Solution';

const QuestionComponent = ({ id, courseid, content, examtype, term, copying, solution, copyQuestionLink, doneCopyingLink }) => {
  const examCode = `${examtype}${term}${courseid}`;

  const SolutionComponent = (
    <Solution solution={solution} examCode={examCode} />
  );
  const url = `${document.location.origin}/${courseid}/${examtype}/${term}#${id}`;

  return (
    <div id={id} className="question">
      <div className="tooltip-container">
        <a className="link material-icons" onClick={() => copyQuestionLink(url)}>link</a>
        {(copying) ?
          (<span className="tooltip-link blue">
             <Expire delay={2000}
              callback={() => doneCopyingLink()}>
              Link Copied
             </Expire>
           </span>) : (<span className="tooltip-link">Copy Link</span>)}
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        {SolutionComponent}
      </div>
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
