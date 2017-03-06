import React, { Component } from 'react';
import { handleEvent } from '../../utils';
import Expire from './Expire';
import classnames from 'classnames';
import copy from 'copy-to-clipboard';
const _ = require('lodash');

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
    if (_.has(props, 'showSolutions')) {
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
    copy(url);
    handleEvent("Click", "Copy Question", this.props.examCode + "/" + this.props.id);

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
    const examCode = `${examType}${term}${course}`;

    const SolutionComponent = (this.props.appMode) ? (
      <Solution solution={this.props.solution} examCode={examCode} showSolutions={this.props.showSolutions} />
    ) : (null);

    return (
      <div id={this.props.id} className="question">
        <div className="tooltip-container">
          <a className="link material-icons" onClick={() => this.copyToClipboard(`${document.location.origin}/exam/${course}/${examType}/${term}#${this.props.id}`)}>link</a>
          {(this.state.copied) ?
            (<span className="tooltip-link blue">
               <Expire delay={2000}
                callback={this.clearCopied}>
                Link copied!
               </Expire>
             </span>) : (<span className="tooltip-link">Copy Link</span>)}
          <div dangerouslySetInnerHTML={{__html: content}}></div>
          {SolutionComponent}
        </div>
      </div>
    );
  }
}

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
    copy(url);
    handleEvent("Click", "Copy Question", this.props.examCode + "/" + this.props.id);

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
    const solutionNum = this.props.solutionNum - 1;
    const choices = this.props.choices;
    const examCode = `${examType}${term}${course}`;
    const options = _.map(choices, (choice, index) => {
      choice = `${String.fromCharCode(index + 65)}) ${choice}`;
      const optionClass = classnames({
        option: true,
        right: (index === solutionNum),
      });
      return <div key={index} tabIndex="0" className={optionClass} dangerouslySetInnerHTML={{__html: choice}}></div>;
    });

    const SolutionComponent = (this.props.appMode) ? (
      <Solution solution={String.fromCharCode(solutionNum + 65)} examCode={examCode} showSolutions={this.props.showSolutions} />
    ) : (null);

    return (
      <div id={this.props.id} className="question mc-question">
        <div className="tooltip-container">
          <a className="link material-icons" onClick={() => this.copyToClipboard(`${document.location.origin}/exam/${course}/${examType}/${term}#${this.props.id}`)}>link</a>
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

export { Question, MultipleChoiceQuestion };
