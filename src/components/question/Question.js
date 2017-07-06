import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comments from './Comments';
import Solution from './Solution';
import QuestionDropdown from './QuestionDropdown';

class Question extends Component {
  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, solution, content } = this.props;

    const SolutionComponent = <Solution solution={solution} content_id={content_id} />;
    const QuestionDropdownComponent = <QuestionDropdown schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} id={id} content_id={content_id} />;
    const CommentsComponent = <Comments content_id={content_id} />

    return (
      <span>
        <div id={id} className="question">
          {QuestionDropdownComponent} 
          <div dangerouslySetInnerHTML={{__html: content}}></div>
          {SolutionComponent}
          {CommentsComponent}
        </div>
      </span>
    );
  }
}

export default Question;
