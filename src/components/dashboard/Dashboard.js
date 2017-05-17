import React, { Component } from 'react';
import { connect } from 'react-redux';
import { concat, map, range, reduce } from 'lodash';

import { Question } from '../question';
import { preprocess } from '../../utils';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        info: {}
      },
      problem: {
        problem: "",
        solution: "",
      },
    };
  }

  updateContent() {
    const { examid, problem_num, subproblem_num } = this.state;
    const problem_content = this.refs.problem.value;
    const solution_content = this.refs.solution.value;

    fetch('/updateProblem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examid,
        problem_num,
        subproblem_num,
        problem_content,
        solution_content,
      })
    })
  }

  getExam(id) {
    fetch(`/getExam/${id}`).then(
      (response) => response.json()
    ).then(
      (json) => {
        this.setState({ examid: id, content: json })
      }
    );
  }

  selectProblem(part, subpart) {
    const id = `${part}_${subpart}`;
    this.setState({
      problem_num: part,
      subproblem_num: subpart,
      problem: this.state.content.problems[id]
    });
  }

  componentDidUpdate(prevProps, prevState) {
		window.renderMJ();
  }

  refreshProblem() {
    this.setState({
      problem: {
        problem: this.refs.problem.value,
        solution: this.refs.solution.value
      }
    })
    this.updateContent();
    window.renderMJ();
  }

  handleChange() {
    this.setState({
      problem: this.refs.problem.value,
      solution: this.refs.solution.value,
    });
  }

  render() {
    const exams = map(this.props.exams.key_dict, (exam, key) => {
      return <div key={key} onClick={() => this.getExam(key)}><a href="#">{exam.courseid} - {exam.examtype} - {exam.examid}</a></div>;
    });

    const subparts = reduce(this.state.content.info, (res, num_parts, part) => {
      const subparts = map(range(1, num_parts + 1), (subpart) => {
        return <div key={`${part}-${subpart}`}><a onClick={() => this.selectProblem(part, subpart)}>Question {part} Part {subpart}</a></div>;
      });
      res = concat(res, subparts);
      return res;
    }, []);

    const problem = this.state.problem;
    return (
      <div>
        <span style={{"float": "left", "width": "200px"}}>{exams}</span>
        <span style={{"float": "left", "width": "200px"}}>{subparts}</span>
        <span style={{"float": "left", "width": "1000px"}}>
          <textarea value={problem.problem} style={{"width": "500px", "height": "300px"}} ref="problem" onChange={this.handleChange} />
          <textarea value={problem.solution} style={{"width": "500px", "height": "300px"}} ref="solution" onChange={this.handleChange} />
          {(problem.problem !== "") ? <button onClick={() => this.refreshProblem()}>Refresh</button> : null}
          {(problem.problem !== "") ? (<Question content={preprocess(problem.problem)} solution={preprocess(problem.solution)} />) : null}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exams: state.global.exams
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {

  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default Dashboard;
