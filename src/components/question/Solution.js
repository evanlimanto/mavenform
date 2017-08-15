import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { replace } from 'lodash'
import { toggleSolutionEvent } from '../../events';
import { showLoginModal, showSignupModal } from '../../actions';

class SolutionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: (process.env.NODE_ENV === 'development'),
      checkedSolutionStatus: null,
      error: null,
    };

    this.checkSolution = this.checkSolution.bind(this);
    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    toggleSolutionEvent();
    this.setState({ showSolution: !this.state.showSolution });
  }

  checkSolution() {
    const solutionContent = replace(this.refs.user_solution.value, / /g, '');
    const expectedSolutionContent = replace(this.props.final_solution.value, / /g, '');
    if (solutionContent === expectedSolutionContent)
      this.setState({ checkedSolutionStatus: "correct" })
    else
      this.setState({ checkedSolutionStatus: "wrong" })
  }

  render() {
    let solutionContent = null, solutionButton = null, solutionChecking = null;
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
        value={((this.state.showSolution) ? "Hide Solution" : "Show Solution")} onClick={this.toggleSolution}/>);
    }
    if (this.props.final_solution && this.props.final_solution.length > 0) {
      solutionChecking = (
        <span>
          <span className="solutionBoxWrapper">
            <input type="text" className={"solutionBox " + this.state.checkedSolutionStatus} placeholder="Enter your answer..." ref="user_solution" />
            {!this.state.checkedSolutionStatus || <img src={`/img/${this.state.checkedSolutionStatus}-symbol.svg`} className="solutionStatus" />}
          </span>
          <input className="green" type="button" value="Check Solution" onClick={this.checkSolution} />
        </span>
      );
    }

    return (
      <div>
        <hr className="s2" />
        {solutionChecking}
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
