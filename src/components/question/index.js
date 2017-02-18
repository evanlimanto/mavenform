import React, { Component } from 'react';
const _ = require('lodash');

class Solution extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      showImage: false
    };

    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    this.setState({
      showImage: !this.state.showImage
    });
  }

  render() {
    const hasResponse = this.props.hasResponse;
    const examCode = this.props.examCode;
    const solution = this.props.solution;
    var check = null;
    var solutionContent = null;
    if (hasResponse) {
       check = <input className="blue" type="button" value="Check" />;
    }
   
    if (this.props.solution) { 
      const solutionClass = "solution" + ((this.state.showImage) ? "" : " hidden");
      solutionContent = (
        <div className={solutionClass}>
          <span dangerouslySetInnerHTML={{'__html': this.props.solution}}></span>
        </div>
      );
    } else if (this.props.image) {
      solutionContent = (
        <div>
          {_.map(this.props.image, (file) => {
            const path = require('../../solutions/' + examCode + '/' + file);
            const solutionClass = "solution" + ((this.state.showImage) ? "" : " hidden");
            return <img className={solutionClass} src={path} role="presentation" />;
          })}
        </div>
      );
    }

    if (!this.state.showImage) {
      solution = (
        <input className="blue" type="button" value="Show Solution" onClick={() => this.toggleSolution()}/>
      );
    } else {
      solution = (
        <input className="gray" type="button" value="Hide Solution" onClick={() => this.toggleSolution()}/>
      );
    }

    return (
      <div>
        <hr className="s3" />
        {check}
        <input className="gray" type="button" value="Solution" onClick={() => this.toggleSolution()}/>
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
        <Solution image={this.props.image} />
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
        <Solution hasResponse={true} image={this.props.image} examCode={this.props.examCode} />
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
        <Solution hasResponse={true} image={this.props.image} examCode={this.props.examCode} />
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
        <Solution hasResponse={true} image={this.props.image} examCode={this.props.examCode} />
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
        <Solution hasResponse={hasResponse} solution={this.props.solution} image={this.props.image} examCode={this.props.examCode} />
      </div>
    );
  }
}

export { Question, VariablesQuestion, MatrixQuestion, ToggleQuestion, FreeFormQuestion };
