import React, { Component } from 'react';
import { connect } from 'react-redux';
import { concat, map, range, reduce, sortBy } from 'lodash';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { BASE_URL } from '../../utils';
import { MultipleChoiceQuestion, Question } from '../question';

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

    this.handleChange = this.handleChange.bind(this);
  }

  updateContent() {
    const { examid, problem_num, subproblem_num } = this.state;
    const problem_content = this.refs.problem.value;
    const solution_content = this.refs.solution.value;
    const choices_content = this.refs.choices.value;
    const final_solution_content = this.refs.final_solution.value;
    const topicid = this.refs.topic.value;

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
    };
    this.setState({ content, status: 'saved!' });
    window.setTimeout(() => this.setState({ status: null }), 1000);
  }

  getExam(id) {
    fetch(`${BASE_URL}/getExamById/${id}`).then(
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
    console.log(this.state);
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
        return <div key={`${part}-${subpart}`}><a className={linkClass} onClick={() => this.selectProblem(part, subpart)}>Question {part} Part {subpart}</a></div>;
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

    const problem = this.state.problem;
    const exam = (this.state.examid) ? this.props.exams.key_dict[this.state.examid] : null;
    return (
      <div className="contentContainer">
        <div className="backLink"><Link to="/dashboard">Back to Dashboard</Link></div>
        <h1>Add Problem</h1>
        <select ref="exam">
          {examSelectItems}
        </select>
        &nbsp;&nbsp;
        <input type="text" ref="problem_num" placeholder="problem number" />&nbsp;&nbsp;
        <input type="text" ref="subproblem_num" placeholder="subproblem number" />&nbsp;&nbsp;
        <button onClick={(e) => this.addProblem(e)}>Add Problem</button>
        <hr className="s2" />
        <div>
          <span className="contentNavCol" style={{ height: "200px", "overflowY": "scroll" }}>{exams}</span>
          {subparts.length ? <span className="contentNavCol" style={{ height: "200px", "overflowY": "scroll" }}>{subparts}</span> : null}
          <h1>{this.state.examid} {!exam || `: ${exam.courseid} - ${exam.examtype} - ${exam.examid}`} {!exam || <a href={exam.source_url} target="_blank">URL</a>} {this.state.status}</h1>
          {topicSelectItems}
          <div>
            <textarea className="contentCol" value={problem.problem} ref="problem" onChange={this.handleChange} placeholder="problem" />
            <textarea className="contentCol" value={problem.solution} ref="solution" onChange={this.handleChange} placeholder="solution" />
            <textarea className="contentCol" value={problem.choices} ref="choices" onChange={this.handleChange} placeholder="choices" />
            <textarea className="contentCol" value={problem.final_solution} ref="final_solution" onChange={this.handleChange} placeholder="final solution" />
          </div>
          {(problem.problem !== "") ? <button onClick={() => this.saveProblem()}>Save</button> : null}
        </div>
        {(problem.problem !== "") ? ((problem.choices) ?
          <MultipleChoiceQuestion content={problem.problem} solutionNum={problem.solution} choices={problem.choices} /> :
          <Question content={problem.problem} solution={problem.solution} />) : null}
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
