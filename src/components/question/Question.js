import React, { Component } from 'react';

import Comments from './Comments';
import Solution from './Solution';
import QuestionDropdown from './QuestionDropdown';

class Question extends Component {
  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, solution, content, final_solution, term_label, type_label, comments } = this.props;

    return (
      <div id={id} className="question">
        <h2>{type_label} {term_label}</h2>
        <QuestionDropdown schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} id={id} content_id={content_id} />
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <Solution solution={solution} final_solution={final_solution} />
        <Comments content_id={content_id} comments={comments} />
      </div>
    );
  }
}

export default Question;
