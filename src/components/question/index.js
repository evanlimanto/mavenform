import React, { Component } from 'react';
import { handleEvent } from '../../utils';
import classnames from 'classnames';
import copy from 'copy-to-clipboard';
const _ = require('lodash');

var Expire = React.createClass({
  getDefaultProps: function() {
    return {delay: 1000};
  },
  getInitialState: function(){
    return {visible: true};
  },
  componentWillReceiveProps: function(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({visible: true});
    }
  },
  componentDidMount: function() {
      this.setTimer();
  },
  setTimer: function() {
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;

    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      this.setState({visible: false});
      this.props.callback();
      this._timer = null;
    }.bind(this), this.props.delay);
  },
  componentWillUnmount: function() {
    clearTimeout(this._timer);
  },
  render: function() {
    return this.state.visible
           ? <div>{this.props.children}</div>
           : <span />;
  }
});

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

// Replace the href with whatever you are going to use to copy
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
    const examCode = this.props.examCode;
    const content = this.props.content;
    return (
      <div id={this.props.id} className="question">
        <div className="tooltip-container">
          <a className="link material-icons" onClick={() => this.copyToClipboard(`${document.location.origin}/exam?id=${this.props.examCode}&courseId=cs162#${this.props.id}`)}>link</a>
            {(this.state.copied) ? 
              (<span className="tooltip-link blue"><Expire delay={2000} callback={this.clearCopied}>Link Copied!</Expire></span>) : 
              (<span className="tooltip-link">Copy Link</span>)
            }
        </div>
        
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
