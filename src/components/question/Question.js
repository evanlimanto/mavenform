import React, { Component } from 'react';

import Solution from './Solution';
import QuestionDropdown from './QuestionDropdown';

class Question extends Component {
  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, solution, content } = this.props;

    const SolutionComponent = <Solution solution={solution} />;
    const QuestionDropdownComponent = <QuestionDropdown schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} id={id} content_id={content_id} />;

    return (
      <span>
        <div id={id} className="question">
          {QuestionDropdownComponent} 
          <div dangerouslySetInnerHTML={{__html: content}}></div>
          {SolutionComponent}
        </div>
      </span>
    );
  }
}

export default Question;
