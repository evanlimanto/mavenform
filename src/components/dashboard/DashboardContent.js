import React, { Component } from 'react';
import { connect } from 'react-redux';
import { concat, map, range, reduce } from 'lodash';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Question } from '../question';
import { preprocess } from '../../utils';

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
      },
    };

    this.handleChange = this.handleChange.bind(this);
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
    });

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

  addExam(e) {
    e.preventDefault();
    const { exam_course_code, exam_type, exam_term, exam_year, profs } = this.refs;

    fetch('/addExam', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course_code: exam_course_code.value,
        exam_type: exam_type.value,
        exam_term: exam_term.value,
        exam_year: exam_year.value,
        profs: profs.value
      })
    }).then(
      (response) => console.log(response.body)
    );
  }

  addProblem(e) {
    e.preventDefault();
    const { exam, problem_num, subproblem_num } = this.refs;
    console.log(exam.value, problem_num.value, subproblem_num.value);

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
        return <div key={`${part}-${subpart}`}><a className={linkClass} onClick={() => this.selectProblem(part, subpart)}>Question {part} Part {subpart}</a></div>;
      });
      res = concat(res, subparts);
      return res;
    }, []);

    const coursesSelectItems = map(this.props.courses, (course) => {
      return <option value={course.id} key={course.id}>{course.code} - {course.name}</option>;
    });

    const examSelectItems = map(this.props.exams.key_dict, (exam, key) => {
      return <option value={key} key={key}>{exam.courseid} - {exam.examtype} - {exam.examid}</option>;
    });

    const problem = this.state.problem;
    const exam = (this.state.examid) ? this.props.exams.key_dict[this.state.examid] : null;
    return (
      <div className="contentContainer">
        <div className="backLink"><Link to="/dashboard">Back to Dashboard</Link></div>
        <h1>Add Exam</h1>
        <form>
          <select ref="exam_course_code">
            {coursesSelectItems}
          </select>
          &nbsp;&nbsp;
          <select ref="exam_type">
            <option value="mt1">Midterm 1</option>
            <option value="mt2">Midterm 2</option>
            <option value="mt3">Midterm 3</option>
            <option value="final">Final</option>
          </select>
          &nbsp;&nbsp;
          <select ref="exam_term">
            <option value="sp">Spring</option>
            <option value="su">Summer</option>
            <option value="fa">Fall</option>
            <option value="wi">Winter</option>
          </select>
          &nbsp;&nbsp;
          <select ref="exam_year">
            {map(range(2000, 2021), (year) => <option key={year} value={year}>{year}</option>) }
          </select>
          &nbsp;&nbsp;
          <input type="text" ref="profs" placeholder="Profs" />&nbsp;&nbsp;
          <button onClick={(e) => this.addExam(e)}>Add Exam</button>
        </form>
        <hr className="s2" />

        <h1>Add Problem</h1>
        <form>
          <select ref="exam">
            {examSelectItems}
          </select>
          &nbsp;&nbsp;
          <input type="text" ref="problem_num" placeholder="problem number" />&nbsp;&nbsp;
          <input type="text" ref="subproblem_num" placeholder="subproblem number" />&nbsp;&nbsp;
          <button onClick={(e) => this.addProblem(e)}>Add Problem</button>
        </form>
        <hr className="s2" />

        <span className="contentNavCol">{exams}</span>
        {subparts.length ? <span className="contentNavCol">{subparts}</span> : null}
        <div style={{"float": "left", "width": "1000px"}}>
          <h1>{this.state.examid} {exam ? `: ${exam.courseid} - ${exam.examtype} - ${exam.examid}` : null}</h1>
          <span className="contentCol">
            <textarea value={problem.problem} ref="problem" onChange={this.handleChange} />
          </span>
          <span className="contentCol">
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
    exams: state.exams,
    courses: state.courses,
  };
};

const DashboardContent = connect(
  mapStateToProps,
)(DashboardContentComponent);

export default DashboardContent;
