import React, { Component } from 'react';
import { exams, examTypeToLabel, courseIDToLabel } from './exams';
import { handleEvent } from './utils';
import { Navbar, NavSidebar } from './components';

const _ = require('lodash');

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appMode: false,
    };

    this.toggleAppMode = this.toggleAppMode.bind(this);
  }

  toggleAppMode() {
    this.setState({
      appMode: !this.state.appMode
    });
  }

  render() {
    const course = this.props.params.courseid;
    const available = _.map(exams[course], (examsOfType, examType) => {
      return _.map(examsOfType, (dict, semester) => {
        const url = `/exam/${course}/${examType}/${dict['id']}`;
        return (
          <tr className="available" onClick={handleEvent("Click", "Exam", course)} key={semester}>
            <td><a href={url}>{examTypeToLabel[examType]}</a></td>
            <td><a href={url}>{semester}</a></td>
            <td><a href={url}>{dict['profs']}</a></td>
            <td><h6><a className="table-link" href={url}>CLICK TO VIEW &#8594;</a></h6></td>
          </tr>
        );
      });
    });
    const navComponents = (this.state.appMode) ? (
      <div className="tooltip-container app-mode" onClick={() => this.toggleAppMode()}>
        <a className="material-icons">dashboard</a>
        <span className="tooltip">App Mode</span>
      </div>
    ) : (
      <span>
        <Navbar isExam={false} toggleAppModeCallback={this.toggleAppMode} />
        <NavSidebar course={course} isExam={false} />
        <div className="sidebar">
          <h6>NOTE</h6>
          <i>This index accounts for every exam from HKN, TBP, and other sources from the past 2 academic years.</i>
        </div>
      </span>
    );

    return (
      <div>
        {navComponents}
        <div>
          <h4 className="center">{courseIDToLabel[course]}</h4>
          <div className="center">
            <h5>Index of exams</h5>
          </div>
          <hr className="s4" />
          <div className="center">
            <div className="table-container-container">
              <div className="table-container">
                <table className="exams center">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Term</th>
                      <th>Instructors</th>
                      <th>Mavenform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {available}
                  </tbody>
                </table>
              </div>
            </div>
            <hr className="margin" />
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
