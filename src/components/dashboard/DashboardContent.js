import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cloneDeep, concat, map, range, reduce, sortBy } from 'lodash';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import DashboardNav from './DashboardNav';
import { BASE_URL } from '../../utils';
import { MultipleChoiceQuestion, Question } from '../question';
import renderer from '../../renderer';

class DashboardContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        info: {}
      },
      problem: {
        problem: "",
        solution: "",
        choices: "",
      },
      status: null
    };

    this.updateTopicId = this.updateTopicId.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateTopicId(id) {
    const newProblem = cloneDeep(this.state.problem);
    newProblem.topicid = id;
    this.setState({ problem: newProblem });
  }

  updateContent() {
    const { examid, problem_num, subproblem_num } = this.state;
    const problem_content = this.refs.problem.value;
    const solution_content = this.refs.solution.value;
    const choices_content = this.refs.choices.value;
    const final_solution_content = this.refs.final_solution.value;
    const topicid = this.refs.topic.value;
    const difficulty = this.refs.difficulty.value;

    fetch(`${BASE_URL}/updateProblem`, {
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
        final_solution_content,
        choices_content,
        topicid,
        difficulty,
      })
    });

    const id = `${problem_num}_${subproblem_num}`;
    const content = this.state.content;
    content.problems[id] = {
      problem: problem_content,
      solution: solution_content,
      final_solution: final_solution_content,
      choices: choices_content,
      topicid,
      difficulty,
    };
    this.setState({ content, status: 'saved!' });
    window.setTimeout(() => this.setState({ status: null }), 1000);
  }

  getExam(id) {
    Promise.all([
      fetch(`${BASE_URL}/getExamById/${id}`)
        .then((response) => response.json())
        .then((json) => this.setState({ examid: id, content: json })),
      fetch(`${BASE_URL}/getExamInfoById/${id}`)
        .then((response) => response.json())
        .then((json) => this.setState({ examInfo: json }))
    ])
  }

  selectProblem(part, subpart) {
    const id = `${part}_${subpart}`;
    this.setState({
      problem_num: part,
      subproblem_num: subpart,
      problem: this.state.content.problems[id]
    });
  }

  componentDidUpdate() {
		window.renderMJ();
  }

  saveProblem() {
    this.handleChange();
    this.updateContent();
    window.renderMJ();
  }

  handleChange() {
    this.setState({
      problem: {
        problem: this.refs.problem.value,
        solution: this.refs.solution.value,
        final_solution: this.refs.final_solution.value,
        choices: this.refs.choices.value,
        topicid: this.refs.topic.value,
        difficulty: this.refs.difficulty.value,
      }
    });
  }

  addProblem(e) {
    e.preventDefault();
    const { exam, problem_num, subproblem_num } = this.refs;

    fetch('/addProblem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examid: exam.value,
        problem_num: problem_num.value,
        subproblem_num: subproblem_num.value
      })
    });
  }

  render() {
    const exams = map(this.props.exams.key_dict, (exam, key) => {
      const linkClass = classnames({
        highlighted: key === this.state.examid
      });
      return <div key={key} onClick={() => this.getExam(key)}><a className={linkClass}>{exam.courseid} - {exam.examtype} - {exam.examid}</a></div>;
    });

    const subparts = reduce(this.state.content.info, (res, num_parts, part) => {
      const subparts = map(range(1, num_parts + 1), (subpart) => {
        const linkClass = classnames({
          highlighted: part === this.state.problem_num && subpart === this.state.subproblem_num
        });
        const id = `${part}_${subpart}`;
        return <div key={`${part}-${subpart}`}><a className={linkClass} onClick={() => this.selectProblem(part, subpart)}>Question {part} Part {subpart}
          {this.state.content.problems[id].topicid ? "(tagged)" : "(untagged)"}</a></div>;
      });
      res = concat(res, subparts);
      return res;
    }, []);

    const examSelectItems = map(this.props.exams.key_dict, (exam, key) => {
      return <option value={key} key={key}>{exam.courseid} - {exam.examtype} - {exam.examid}</option>;
    });

    const topicSelectItems = (
      <select ref="topic" value={this.state.problem.topicid ? this.state.problem.topicid : ""} onChange={this.handleChange}>
        <option selected value={null}> -- select a topic -- </option>
        {map(sortBy(this.props.topics, [(topic) => topic.topic, (topic) => topic.concept]), (topic, key) => <option key={key} value={topic.id}>{topic.topic} - {topic.concept}</option>)}
      </select>
    );

    const difficultySelectItems = (
      <select ref="difficulty" value={this.state.problem.difficulty ? this.state.problem.difficulty : ""} onChange={this.handleChange}>
        <option selected value={null}> -- select a difficulty -- </option>
        {map(range(1, 11), (num) => <option key={num} value={num}>{num}</option>)}
      </select>
    );

    const problem = this.state.problem;
    const exam = (this.state.examid) ? this.props.exams.key_dict[this.state.examid] : null;
    return (
      <div className="contentContainer">
        <DashboardNav />
        <hr className="s1" />
        <select ref="exam" style={{"marginLeft" : "5px"}}>
          {examSelectItems}
        </select>
        &nbsp;&nbsp;
        <input type="text" ref="problem_num" placeholder="problem number" />&nbsp;&nbsp;
        <input type="text" ref="subproblem_num" placeholder="subproblem number" />&nbsp;&nbsp;
        <button onClick={(e) => this.addProblem(e)}>ADD PROBLEM</button>
        <hr className="s2" />
        <div>
          <h1 style={{"marginLeft" : "5px"}}>PROBLEMS</h1>
          <span className="contentNavCol" style={{ height: "200px", "overflowY": "scroll" }}>{exams}</span>
          {subparts.length ? <span className="contentNavCol" style={{ height: "200px", "overflowY": "scroll", "marginRight" : "10px" }}>{subparts}</span> : <span className="contentNavCol" style={{ height: "200px", "overflowY": "scroll", "marginRight" : "10px" }}>NO EXAM SELECTED YET</span>}
          <p style={{ "paddingBottom" : "4px" }}><strong>EXAM:</strong> ({this.state.examid}) {!exam || ` ${exam.courseid} - ${exam.examtype} - ${exam.examid}`} {!exam || <a href={exam.source_url} target="_blank" style={{"textDecoration" : "underline", "marginLeft" : "10px"}}>[SOURCE PDF]</a>} {this.state.status}</p>
          {topicSelectItems}
          {difficultySelectItems}
          {(problem.problem !== "") ? <button onClick={() => this.saveProblem()}>SAVE</button> : <button>SAVE</button>}
          <div>
            <textarea className="contentCol" value={problem.problem ? problem.problem : ""} ref="problem" onChange={this.handleChange} placeholder="PROBLEM CONTENT" />
            <textarea className="contentCol" value={problem.solution ? problem.solution : ""} ref="solution" onChange={this.handleChange} placeholder="FREE RESPONSE SOLUTION" />
            <textarea className="contentCol" value={problem.choices ? problem.choices: ""} ref="choices" onChange={this.handleChange} placeholder="MULTIPLE CHOICE OPTIONS" />
            <textarea className="contentCol" value={problem.final_solution ? problem.final_solution : ""} ref="final_solution" onChange={this.handleChange} placeholder="MULTIPLE CHOICE SOLUTION" />
            <textarea className="contentCol" value={problem.interactive_problem ? problem.interactive_problem : ""} ref="interactive_problem" onChange={this.handleChange} placeholder="INTERACTIVE PROBLEM" />
            <textarea className="contentCol" value={problem.interactive_solution ? problem.interactive_solution : ""} ref="interactive_solution" onChange={this.handleChange} placeholder="INTERACTIVE SOLUTION" />
          </div>
        </div>
        <hr className="s1" />
        <div className="normal-buttons">
          {(problem.problem !== "") ? ((problem.choices) ?
          <MultipleChoiceQuestion content={problem.problem} solutionNum={problem.solution} choices={problem.choices} /> :
          <Question content={renderer.preprocess(problem.problem)} solution={renderer.preprocess(problem.solution)} final_solution={problem.final_solution} />) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    exams: state.exams,
    topics: state.topics,
  };
};

const DashboardContent = connect(
  mapStateToProps,
)(DashboardContentComponent);

export default DashboardContent;
