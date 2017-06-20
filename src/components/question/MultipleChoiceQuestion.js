import React, { Component } from 'react';
import classnames from 'classnames';
import { map, split } from 'lodash';

import QuestionDropdown from './QuestionDropdown';

class MultipleChoiceQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSolution: (process.env.NODE_ENV === 'development')
    };

    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    this.setState({
      showSolution: !this.state.showSolution
    });
  }

  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode, content, choices } = this.props;
    let solutionNum = this.props.solutionNum;
    solutionNum = (solutionNum) ? (solutionNum - 1) : null;
    const options = map(split(choices, '~'), (choice, index) => {
      choice = `${String.fromCharCode(index + 65)}) ${choice}`;
      const optionClass = classnames({
        option: true,
        right: (index === solutionNum),
        "right-toggled": (index === solutionNum) && this.state.showSolution,
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
        <hr className="s3" />
        <input className={(this.state.showSolution) ? "gray" : "blue"} type="button"
          value={(this.state.showSolution) ? "Hide Solution" : "Show Solution"} onClick={() => this.toggleSolution()}/>
      </div>
    );
  }
}

export default MultipleChoiceQuestion;
