import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MultipleChoiceQuestion, Question } from '../question';
import renderer from '../../renderer';

class DashboardProblemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: {}
    };
  }

  componentDidMount() {
    const { problemid } = this.props;
    fetch(`/getProblemById/${problemid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ problem: json }));
  }

  render() {
    const problem = this.state.problem;
    return (
      <div className="contentContainer">
        {(problem.problem !== "") ? ((problem.choices) ?
        <MultipleChoiceQuestion content={problem.problem} solutionNum={problem.solution} choices={problem.choices} /> :
        <Question content={renderer.preprocess(problem.problem)} solution={renderer.preprocess(problem.solution)} final_solution={problem.final_solution} />) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    problemid: ownProps.problemid || ownProps.match.params.problemid
  };
};

const DashboardProblem = connect(
  mapStateToProps,
)(DashboardProblemComponent);

export default DashboardProblem;
