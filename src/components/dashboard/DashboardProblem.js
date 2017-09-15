import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MultipleChoiceQuestion, Question } from '../question';
import renderer from '../../renderer';
import { BASE_URL } from '../../utils';

class DashboardProblemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
      status: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    const { problemid } = this.props;
    fetch(`/getProblemById/${problemid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ problem: json }));
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  updateContent() {
    const { problem_num, subproblem_num } = this.state.problem;
    const problem_content = this.refs.problem.value;
    const solution_content = this.refs.solution.value;
    const choices_content = this.refs.choices.value;
    const final_solution_content = this.refs.final_solution.value;
    const interactive_problem_content = this.refs.interactive_problem.value;
    const interactive_solution_content = this.refs.interactive_solution.value;
    const suggestion_text_content = this.refs.suggestion_text.value;

    fetch(`${BASE_URL}/updateProblemById`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.problemid,
        problem_num,
        subproblem_num,
        problem_content,
        solution_content,
        final_solution_content,
        choices_content,
        interactive_problem_content,
        interactive_solution_content,
        suggestion_text_content,
      })
    });
    this.handleChange();
    this.setState({ status: 'saved!' });
    window.setTimeout(() => this.setState({ status: null }), 1000);
  }

  handleChange() {
    this.setState({
      problem: {
        problem: this.refs.problem.value,
        solution: this.refs.solution.value,
        final_solution: this.refs.final_solution.value,
        choices: this.refs.choices.value,
        interactive_problem: this.refs.interactive_problem.value,
        interactive_solution: this.refs.interactive_solution.value,
        suggestion_text: this.refs.suggestion_text.value,
      }
    });
  }

  render() {
    const problem = this.state.problem;
    console.log(problem);
    return (
      <div className="contentContainer">
        <div>
          {this.state.status}
          <textarea className="contentCol" value={problem.problem ? problem.problem : ""} ref="problem" onChange={this.handleChange} placeholder="PROBLEM CONTENT" />
          <textarea className="contentCol" value={problem.solution ? problem.solution : ""} ref="solution" onChange={this.handleChange} placeholder="FREE RESPONSE SOLUTION" />
          <textarea className="contentCol" value={problem.choices ? problem.choices: ""} ref="choices" onChange={this.handleChange} placeholder="MULTIPLE CHOICE OPTIONS" />
          <textarea className="contentCol" value={problem.final_solution ? problem.final_solution : ""} ref="final_solution" onChange={this.handleChange} placeholder="MULTIPLE CHOICE SOLUTION" />
          <textarea className="contentCol" value={problem.interactive_problem ? problem.interactive_problem : ""} ref="interactive_problem" onChange={this.handleChange} placeholder="INTERACTIVE PROBLEM" />
          <textarea className="contentCol" value={problem.interactive_solution ? problem.interactive_solution : ""} ref="interactive_solution" onChange={this.handleChange} placeholder="INTERACTIVE SOLUTION" />
          <textarea className="contentCol" value={problem.suggestion_text ? problem.suggestion_text : ""} ref="suggestion_text" onChange={this.handleChange} placeholder="SUGGESTION TEXT" />
          <button onClick={() => this.updateContent()}>SAVE</button>
        </div>
        <hr className="s2" />
        {(problem.problem !== "") ? ((problem.choices) ?
        <MultipleChoiceQuestion content={problem.problem} solutionNum={problem.solution} choices={problem.choices} /> :
        <Question content={renderer.preprocess(problem.problem)} solution={renderer.preprocess(problem.solution)} final_solution={problem.final_solution} />) : null}
        <div dangerouslySetInnerHTML={{ __html: this.state.problem.interactive_problem }}></div>
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
