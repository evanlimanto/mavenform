import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import classnames from 'classnames';
import { map, split } from 'lodash';

import Expire from './Expire';
import QuestionDropdown from './QuestionDropdown';
import { copyQuestionLinkEvent } from '../../events';

class MultipleChoiceQuestion extends Component {
  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, content, choices } = this.props;
    let solutionNum = this.props.solutionNum;
    solutionNum = (solutionNum) ? (solutionNum - 1) : null;
    const options = map(split(choices, '~'), (choice, index) => {
      choice = `${String.fromCharCode(index + 65)}) ${choice}`;
      const optionClass = classnames({
        option: true,
        right: (index === solutionNum),
      });
      return <div key={index} tabIndex="0" className={optionClass} dangerouslySetInnerHTML={{__html: choice}}></div>;
    });

    const QuestionDropdownComponent = <QuestionDropdown schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} id={id} content_id={content_id} />;

    return (
      <div id={id} className="question mc-question">
        {QuestionDropdownComponent}
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s1" />
        {options}
      </div>
    );
  }
}

export default MultipleChoiceQuestion;
