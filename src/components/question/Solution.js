import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggleSolutionEvent } from '../../events';
import { showLoginModal, showSignupModal } from '../../actions';

class SolutionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: (process.env.NODE_ENV === 'development'),
      error: null,
    };

    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    toggleSolutionEvent();
    this.setState({ showSolution: !this.state.showSolution });
  }

  render() {
    let solutionContent = null, solutionButton = null;
    if (this.props.solution && this.props.solution.length > 0) {
      const solutionClass = classnames({
        solution: true,
        hidden: !this.state.showSolution,
      });
      solutionContent = (
        <div className={solutionClass}>
          <span dangerouslySetInnerHTML={{'__html': this.props.solution}} />
        </div>
      );
      solutionButton = (<input className={((this.state.showSolution) ? "gray" : "blue")} type="button"
        value={((this.state.showSolution) ? "Hide Solution" : "Show Solution")} onClick={() => this.toggleSolution()}/>);
    }

    return (
      <div>
        <hr className="s3" />
        {solutionButton}
        {solutionContent}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showSignupModal: () => dispatch(showSignupModal()),
  };
};

const Solution = connect(
  mapDispatchToProps,
)(SolutionComponent);

export default Solution;
