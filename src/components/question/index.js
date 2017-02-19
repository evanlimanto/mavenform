import React, { Component } from 'react';
const _ = require('lodash');

class Solution extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      showSolution: false
    };

    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    this.setState({
      showSolution: !this.state.showSolution
    });
  }

  render() {
    const hasResponse = this.props.hasResponse;
    const examCode = this.props.examCode;
    var check = null;
    var solutionButton = null;
    var solutionContent = null;
    if (hasResponse) {
       check = <input className="blue" type="button" value="Check" />;
    }
   
    if (this.props.solution) { 
      const solutionClass = "solution" + ((this.state.showSolution) ? "" : " hidden");
      solutionContent = (
        <div className={solutionClass}>
          <span dangerouslySetInnerHTML={{'__html': this.props.solution}}></span>
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
  render() {
    const content = this.props.content;
    return (
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <Solution solution={this.props.solution} examCode={this.props.examCode} />
      </div>
    );
  }
}

class VariablesQuestion extends Component {
  render() {
    const content = this.props.content;
    const variables = this.props.variables;
    return (
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s3" />
          {_.map(variables, (variable, key) => {
            const str = `\\(${variable} =\\)`;
            return <span key={key}>{str}<input className="cell" type="text" /></span>;
          })}
        <Solution hasResponse={true} examCode={this.props.examCode} />
      </div>
    );
  }
}

class MatrixQuestion extends Component {
  render() {
    const content = this.props.content;
    const rows = this.props.rows;
    const cols = this.props.cols;

    return (
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s3" />
        {_.range(rows).map((rowKey) => {
          const row = _.range(cols).map((colKey) => {
            return <input key={colKey} className="cell" type="text" />
          });
          return <div key={rowKey}>{row}</div>
        })}
        <Solution hasResponse={true} examCode={this.props.examCode} />
      </div>
    );
  }
}

class ToggleQuestion extends Component {
  render() {
    const content = this.props.content;
    const on = this.props.on;
    const off = this.props.off;

    return (
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s3" />
        <input type="checkbox" data-toggle="toggle" data-on={on} data-off={off} />
        <Solution hasResponse={true} examCode={this.props.examCode} />
      </div>
    );
  }
}

class FreeFormQuestion extends Component {
  render() {
    const content = this.props.content;
    const hasResponse = this.props.hasResponse;

    var solution = null;
    if (hasResponse) {
      solution = (<input type="text" />);
    } else {
      solution = (<i className="no-input">Free-form answer. No input type available.</i>);
    }

    return (
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s3" />
        {solution} 
        <Solution hasResponse={hasResponse} solution={this.props.solution} examCode={this.props.examCode} />
      </div>
    );
  }
}

export { Question, VariablesQuestion, MatrixQuestion, ToggleQuestion, FreeFormQuestion };
