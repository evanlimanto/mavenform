import React, { Component } from 'react';
import classnames from 'classnames';
import { has } from 'lodash';

import { handleEvent } from '../../utils';

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

export default Solution;