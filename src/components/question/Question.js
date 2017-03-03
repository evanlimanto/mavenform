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

  render() {
    const hasResponse = this.props.hasResponse;
    var check = null;
    var solutionButton = null;
    var solutionContent = null;
    if (hasResponse) {
       check = <input className="blue" type="button" value="Check" />;
    }

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

    if (!this.state.showSolution) {
      solutionButton = (
        <input className="blue" type="button" value="Show Solution" onClick={() => this.toggleSolution()}/>
      );
    } else {
      solutionButton = (
        <input className="gray" type="button" value="Hide Solution" onClick={() => this.toggleSolution()}/>
      );
    }

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

    return (
      <div id={this.props.id} className="question">
        <a className="link" onClick={() => this.copyToClipboard(`${document.location.origin}/exam/${course}/${examType}/${term}#${this.props.id}`)}>Share</a>
        {(this.state.copied) ? (<Expire delay={1800} callback={this.clearCopied}><div className="tooltip">Link copied to clipboard!</div></Expire>) : null}
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <Solution solution={this.props.solution} examCode={examCode} />
      </div>
    );
  }
}

class MultipleChoiceQuestion extends Question {
  constructor(props) {
    super(props);
  }

  render() {
    const examCode = this.props.examCode;
    const content = this.props.content;
    const choices = this.props.choices;
    const answer = this.props.answer;

    return (
      <div></div>
    );
  }
}

export default Question;
