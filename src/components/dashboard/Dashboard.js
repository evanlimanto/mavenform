import React, { Component } from 'react';
import { connect } from 'react-redux';
import { concat, map, range, reduce } from 'lodash';

import { Question } from '../question';
import { preprocess } from '../../utils';

require('./Dashboard.css');

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

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { auth, history } = this.props;
    this.props.requireAuth(auth, history)
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

    const id = `${problem_num}_${subproblem_num}`;
    this.state.content.problems[id] = {
      problem: problem_content,
      solution: solution_content,
    };
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

  saveProblem() {
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
      problem: {
        problem: this.refs.problem.value,
        solution: this.refs.solution.value,
      }
    });
  }

  render() {
    const exams = map(this.props.exams.key_dict, (exam, key) => {
      if (key === this.state.examid) {
        return <div key={key} onClick={() => this.getExam(key)}><a href="#" style={{ color: "blue" }}>{exam.courseid} - {exam.examtype} - {exam.examid}</a></div>;
      }
      return <div key={key} onClick={() => this.getExam(key)}><a href="#">{exam.courseid} - {exam.examtype} - {exam.examid}</a></div>;
    });

    const subparts = reduce(this.state.content.info, (res, num_parts, part) => {
      const subparts = map(range(1, num_parts + 1), (subpart) => {
        if (part === this.state.problem_num && subpart === this.state.subproblem_num) {
          return <div key={`${part}-${subpart}`}><a style={{ color: "blue" }} onClick={() => this.selectProblem(part, subpart)}>Question {part} Part {subpart}</a></div>;
        }
        return <div key={`${part}-${subpart}`}><a onClick={() => this.selectProblem(part, subpart)}>Question {part} Part {subpart}</a></div>;
      });
      res = concat(res, subparts);
      return res;
    }, []);

    const problem = this.state.problem;
    const exam = (this.state.examid) ? this.props.exams.key_dict[this.state.examid] : null;
    return (
      <div className="dashboardContainer">
        <span className="dashboardNavCol">{exams}</span>
        {subparts.length ? <span className="dashboardNavCol">{subparts}</span> : null}
        <div style={{"float": "left", "width": "1000px"}}>
          <h1>{this.state.examid} : {exam ? `${exam.courseid} - ${exam.examtype} - ${exam.examid}` : null}</h1>
          <span className="dashboardCol">
            <textarea value={problem.problem} ref="problem" onChange={this.handleChange} />
          </span>
          <span className="dashboardCol">
            <textarea value={problem.solution} ref="solution" onChange={this.handleChange} />
          </span>
          <br/>
          {(problem.problem !== "") ? <button onClick={() => this.saveProblem()}>Save</button> : null}
          {(problem.problem !== "") ? <Question content={preprocess(problem.problem)} solution={preprocess(problem.solution)} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    exams: state.global.exams
  };
};

const Dashboard = connect(
  mapStateToProps,
)(DashboardComponent);

export default Dashboard;
