import React, { Component } from 'react';

import Comments from './Comments';
import Solution from './Solution';
import QuestionDropdown from './QuestionDropdown';
const ProgressBar = require('react-progressbar.js')
const Line = ProgressBar.Line;

class Question extends Component {
  componentDidMount() {
    const bar = new ProgressBar.Line("progress-container-" + this.props.content_id, {

      initialAnimate: true,
      progress: this.props.difficulty / 10.0,
    });
  }

  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, solution, content, final_solution, term_label, type_label, difficulty, comments } = this.props;
    const options = {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#00FF00'},
      to: {color: '#FFA05A'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      },
    };
    const difficultyBar = difficulty ? (
      <span>
        Difficulty
        <Line options={options} initialAnimate={true} progress={difficulty/10.0} containerClassName="progress-container" />
      </span>
    ): null

    return (
      <div id={id} className="question">
        <h2>{type_label} {term_label}</h2>
        {difficultyBar}
        <QuestionDropdown schoolCode={schoolCode} courseCode={courseCode} examType={examType} termCode={termCode} id={id} content_id={content_id} />
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <Solution solution={solution} final_solution={final_solution} />
        <Comments content_id={content_id} comments={comments} />
      </div>
    );
  }
}

export default Question;
