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
    var check = null;
    var image = null;
    if (hasResponse) {
       check = <input className="blue" type="button" value="Check" />;
    }
    if (this.props.image && this.state.showImage) {
        image = (
          <span>
            {_.map(this.props.image, (file) => {
              const path = require('../../solutions/' + file);
              return <img className="solution" src={path} role="presentation" />;
            })}
          </span>
        );
    }

    return (
      <div>
        <hr className="s2" />
        {check}
        <input className="gray" type="button" value="Solution" onClick={() => this.toggleSolution()}/>
        {image}
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
        <hr className="s2" />
          {_.map(variables, (variable, key) => {
            const str = `\\(${variable} =\\)`;
            return <span key={key}>{str}<input className="cell" type="text" /></span>;
          })}
        <Solution hasResponse={true} image={this.props.image} />
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
        <hr className="s2" />
        {_.range(rows).map((rowKey) => {
          const row = _.range(cols).map((colKey) => {
            return <input key={colKey} className="cell" type="text" />
          });
          return <div key={rowKey}>{row}</div>
        })}
        <Solution hasResponse={true} image={this.props.image} />
      </div>
    );
  }
}

class TrueFalseQuestion extends Component {
  render() {
    const content = this.props.content;

    return (
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s5" />
        <input type="checkbox" data-toggle="toggle" data-on="True" data-off="False" />
        <Solution hasResponse={true} image={this.props.image} />
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
      <div id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
        <hr className="s5" />
        {solution} 
        <Solution hasResponse={hasResponse} image={this.props.image} />
      </div>
    );
  }
}

export { VariablesQuestion, MatrixQuestion, TrueFalseQuestion, FreeFormQuestion };
