import React, { Component } from 'react';
import renderHTML from 'react-render-html';
const _ = require('lodash');

class Solution extends Component {
  render() {
    return (
      <div>
        <hr className="s2" />
        <input className="blue" type="button" value="Check" />
        <input className="gray" type="button" value="Solution" />
        <img id="s1" className="solution" src="s1.png" />
      </div>
    );
  }
}

class VariablesQuestion extends Component {
    render() {
      const content = this.props.content;
      const variables = this.props.variables;
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: content}}></div>
          <hr className="s2" />
            {_.map(variables, (variable, key) => {
              const str = `\\(${variable} =\\)`;
              return <span key={key}>{str}<input className="cell" type="text" /></span>;
            })}
          <Solution />
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
      <div>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s2" />
        {_.range(rows).map(() => {
          const row = _.range(cols).map(() => {
            return <input className="cell" type="text" />
          });
          return <div>{row}</div>
        })}
        <Solution />
      </div>
    );
  }
}

class TrueFalseQuestion extends Component {
  render() {
    const content = this.props.content;

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s5" />
        <input type="checkbox" data-toggle="toggle" data-on="True" data-off="False" />
        <Solution />
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
      solution = (<i>Free-form answer. No input type available.</i>);
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s5" />
        {solution} 
        <Solution />
      </div>
    );
  }
}

export { VariablesQuestion, MatrixQuestion, TrueFalseQuestion, FreeFormQuestion };
