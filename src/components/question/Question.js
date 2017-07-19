import React, { Component } from 'react';

import Comments from './Comments';
import Solution from './Solution';
import QuestionDropdown from './QuestionDropdown';

class Question extends Component {
  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, solution, content } = this.props;

    return (
      <div id={id} className="question">
        <QuestionDropdown schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} id={id} content_id={content_id} />
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <Solution solution={solution} />
        <Comments content_id={content_id} />
      </div>
    );
  }
}

export default Question;
