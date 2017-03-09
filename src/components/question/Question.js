import React, { Component } from 'react';
import { handleEvent } from '../../utils';
import { has, lowerCase, map } from 'lodash';
import Expire from './Expire';
import classnames from 'classnames';
import copy from 'copy-to-clipboard';

class Solution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: (process.env.NODE_ENV === 'development')
    };

    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    handleEvent("Click", "Toggle Solution", this.props.examCode);
    this.setState({
      showSolution: !this.state.showSolution
    });
  }

  componentWillReceiveProps(props) {
    if (has(props, 'showSolutions')) {
      this.setState({showSolution: props.showSolutions});
    }
  }

  render() {
    var check = null;
    var solutionButton = null;
    var solutionContent = null;

    if (this.props.solution) {
      const solutionClass = classnames({
        solution: true,
        hidden: !this.state.showSolution,
      });
      solutionContent = (
        <div className={solutionClass}>
          <span dangerouslySetInnerHTML={{'__html': this.props.solution}} />
        </div>
      );
    }

    solutionButton = (
      <input className={(this.state.showSolution) ? "gray" : "blue"} type="button"
       value={(this.state.showSolution) ? "Hide Solution" : "Show Solution"} onClick={() => this.toggleSolution()}/>
    );

    return (
      <div>
        <hr className="s3" />
        {check}
        {solutionButton}
        {solutionContent}
      </div>
    );
  }
}

Solution.propTypes = {
  examCode: React.PropTypes.string,
  solution: React.PropTypes.string,
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.clearCopied = this.clearCopied.bind(this);

    this.state = {
      copied: false
    }
  }

  copyToClipboard(url) {
    const course = this.props.course;
    const examType = this.props.examType;
    const term = this.props.term;
    const examCode = lowerCase(`${course}/${examType}-${term}`);
    copy(url);
    handleEvent("Click", "Copy Question", examCode);

    this.setState({
      copied: true
    });
  }

  clearCopied() {
    this.setState({
      copied: false
    });
  }

  render() {
    const course = this.props.course;
    const content = this.props.content;
    const examType = this.props.examType;
    const term = this.props.term;
    const examCode = lowerCase(`${examType}${term}${course}`);

    const SolutionComponent = (
      <Solution solution={this.props.solution} examCode={examCode} showSolutions={this.props.showSolutions} />
    );

    return (
      <div id={this.props.id} className="question">
        <div className="tooltip-container">
          <a className="link material-icons" onClick={() => this.copyToClipboard(`${document.location.origin}/${course}/${examType}/${term}#${this.props.id}`)}>link</a>
          {(this.state.copied) ?
            (<span className="tooltip-link blue">
               <Expire delay={2000}
                callback={this.clearCopied}>
                Link Copied
               </Expire>
             </span>) : (<span className="tooltip-link">Copy Link</span>)}
          <div dangerouslySetInnerHTML={{__html: content}}></div>
          {SolutionComponent}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  course: React.PropTypes.string,
  content: React.PropTypes.string,
  examType: React.PropTypes.string,
  term: React.PropTypes.string,
  id: React.PropTypes.string,
};

class MultipleChoiceQuestion extends Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.clearCopied = this.clearCopied.bind(this);

    this.state = {
      copied: false
    }
  }

  copyToClipboard(url) {
    const course = this.props.course;
    const examType = this.props.examType;
    const term = this.props.term;
    const examCode = lowerCase(`${course}/${examType}-${term}`);
    copy(url);
    handleEvent("Click", "Copy Question", examCode);

    this.setState({
      copied: true
    });
  }

  clearCopied() {
    this.setState({
      copied: false
    });
  }

  render() {
    const course = this.props.course;
    const content = this.props.content;
    const examType = this.props.examType;
    const term = this.props.term;
    const solutionNum = (this.props.solutionNum) ? (this.props.solutionNum - 1) : null;
    const choices = this.props.choices;
    const examCode = lowerCase(`${examType}${term}${course}`);
    const options = map(choices, (choice, index) => {
      choice = `${String.fromCharCode(index + 65)}) ${choice}`;
      const optionClass = classnames({
        option: true,
        right: (index === solutionNum),
      });
      return <div key={index} tabIndex="0" className={optionClass} dangerouslySetInnerHTML={{__html: choice}} onClick={handleEvent("Click", "Multiple Choice", examCode)}></div>;
    });

    const solution = (solutionNum >= 0) ? `${String.fromCharCode(solutionNum + 65)}) ${choices[solutionNum]}` : "Solution unavailable. Sorry!";
    const SolutionComponent = (
      <Solution solution={solution} examCode={examCode} showSolutions={this.props.showSolutions} />
    );

    return (
      <div id={this.props.id} className="question mc-question">
        <div className="tooltip-container">
          <a className="link material-icons" onClick={() => this.copyToClipboard(`${document.location.origin}/${course}/${examType}-${term}#${this.props.id}`)}>link</a>
            {(this.state.copied) ?
              (<span className="tooltip-link blue">
                <Expire
                 delay={2000}
                 callback={this.clearCopied}
                >Link Copied!</Expire>
               </span>) : (<span className="tooltip-link">Copy Link</span>)
            }
        </div>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s1" />
        {options}
        {SolutionComponent}
      </div>
    );
  }
}

MultipleChoiceQuestion.propTypes = {
  course: React.PropTypes.string,
  content: React.PropTypes.string,
  examType: React.PropTypes.string,
  term: React.PropTypes.string,
  solutionNum: React.PropTypes.number,
  choices: React.PropTypes.array,
  id: React.PropTypes.string,
};

export { Question, MultipleChoiceQuestion };
