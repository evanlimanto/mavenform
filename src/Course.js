import React, { Component } from 'react';
import { exams, examTypeToLabel, courseIDToLabel, courses } from './exams';
import { handleEvent } from './utils';
import { Navbar, NavSidebar } from './components';
import { has, lowerCase, map } from 'lodash';
import NotFound from './NotFound';

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
    if (!has(exams, course)) {
      return <NotFound />;
    }

    const desc = courses[course];
    const available = map(exams[course], (examsOfType, examType) => {
      return map(examsOfType, (item, id) => {
        const term = item.term;
        const note = item.note ? `(${item.note})` : (null);
        const isAvailable = has(item, 'available') ? item.available : true;
        const url = `/${course}/${examType}/${id}`;
        if (!isAvailable) {
          return (
            <tr className="available" onClick={handleEvent("Click", "Exam", lowerCase(course))} key={id}>
              <td><a>{examTypeToLabel[examType]} <i>{note}</i></a></td>
              <td><a>{term}</a></td>
              <td><a>{item.profs}</a></td>
              <td><a><h6 className="table-link">AVAILABLE SOON</h6></a></td>
            </tr>
          );
        }

        return (
          <tr className="available" onClick={handleEvent("Click", "Exam", lowerCase(course))} key={id}>
            <td><a href={url}>{examTypeToLabel[examType]} <i>{note}</i></a></td>
            <td><a href={url}>{term}</a></td>
            <td><a href={url}>{item.profs}</a></td>
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
          <h6>INFO</h6>
          <i>{desc}</i>
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
