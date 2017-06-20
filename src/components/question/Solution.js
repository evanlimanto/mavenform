import React, { Component } from 'react';
import classnames from 'classnames';

import { toggleSolutionEvent } from '../../events';

class Solution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: (process.env.NODE_ENV === 'development')
    };

    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    toggleSolutionEvent();
    this.setState({
      showSolution: !this.state.showSolution
    });
  }

  render() {
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

    const solutionButton = (
      <input className={(this.state.showSolution) ? "gray" : "blue"} type="button"
       value={(this.state.showSolution) ? "Hide Solution" : "Show Solution"} onClick={() => this.toggleSolution()}/>
    );

    return (
      <div>
        <hr className="s3" />
        {solutionButton}
        {solutionContent}
      </div>
    );
  }
}

export default Solution;
