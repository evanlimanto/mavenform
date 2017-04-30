import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import classnames from 'classnames';
import { map, split } from 'lodash';

import Expire from './Expire';
import Solution from './Solution';
import { setQuestionCopied } from '../../actions';
import { copyQuestionLinkEvent } from '../../events';

const MultipleChoiceQuestionComponent = ({ id, courseid, content, examtype, term, copying, solutionNum, choices, copyQuestionLink, doneCopyingLink, showSolutions }) => {
  solutionNum = (solutionNum) ? (solutionNum - 1) : null;
  const options = map(split(choices, '~'), (choice, index) => {
    choice = `${String.fromCharCode(index + 65)}) ${choice}`;
    const optionClass = classnames({
      option: true,
      right: (index === solutionNum),
    });
    return <div key={index} tabIndex="0" className={optionClass} dangerouslySetInnerHTML={{__html: choice}}></div>;
  });

  const solution = (solutionNum >= 0) ? `${String.fromCharCode(solutionNum + 65)}) ${choices[solutionNum]}` : "Solution unavailable. Sorry!";
  const url = `${document.location.origin}/${courseid}/${examtype}/${term}#${id}`;

  return (
    <div id={id} className="question mc-question">
      <div className="tooltip-container">
        <a className="link material-icons" onClick={() => copyQuestionLink(url)}>link</a>
          {(copying) ?
            (<span className="tooltip-link blue">
              <Expire
               delay={2000}
               callback={() => doneCopyingLink()}
              >Link Copied!</Expire>
             </span>) : (<span className="tooltip-link">Copy Link</span>)
          }
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

const MultipleChoiceQuestion = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleChoiceQuestionComponent);

export default MultipleChoiceQuestion;
