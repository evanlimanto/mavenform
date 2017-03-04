import React, { Component } from 'react';
import classnames from 'classnames';
import { exams, examTypeToLabel, courseIDToLabel } from './exams';
import { handleEvent } from './utils';

const _ = require('lodash');

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: true,
    };
  }

  toggleCollapse(courseName) {
    handleEvent('Click', 'Toggle Sidebar', courseName);
    this.setState({
      sidebar: !this.state.sidebar
    });
    if (this.state.sidebar) {
      document.body.style.left = '-125px';
    } else {
      document.body.style.left = '0';
    }
  }

  render() {
    var course = this.props.params.courseid;
    var examId = null;
    var unavailable = null;
    var note = null;
    const available = _.map(exams[course], (examsOfType, examType) => {
      return _.map(examsOfType, (dict, semester) => {
        const url = `/exam/${course}/${examType}/${dict['id']}`;
        return (
          <tr className="available" onClick={handleEvent("Click", "Exam", course)} key={semester}>
            <td><a href={url}>{examTypeToLabel[examType]}</a></td>
            <td><a href={url}>{semester}</a></td>
            <td><a href={url}>{dict['profs']}</a></td>
            <td><h6><a className="table-link" href={`/course/${course}`}>CLICK TO VIEW &#8594;</a></h6></td>
          </tr>
        );
      });
    });

    const collapserClass = classnames({
      collapse: true,
      iscollapsed: !this.state.sidebar
    });
    const collapser = (
      <a className={collapserClass} onClick={() => this.toggleCollapse(courseIDToLabel[course])}>&#9776; {(this.state.sidebar) ? "COLLAPSE" : "MENU"}</a>
    );

    const menuClass = classnames({
      menu: true,
      hidden: !this.state.sidebar
    });

    const sideTabs = _.map(exams[course], (courseExams, examType) => {
      const content =  _.map(courseExams, (info, semester) => {
        const url = `/exam/${course}/${examType}/${info.id}`;
        const title = semester;
        const sideTabClass = classnames({
          sidetab: true,
          active: (examId === info['id']),
        });
        return (
          <div key={semester} className="sidetab-container">
            <a className={sideTabClass} href={url} onClick={() => handleEvent('Click', 'Navigation Menu', course)}>{title}</a>
          </div>
        );
      });
      return (
        <span key={examType}>
          <div className="sideTitle">{examTypeToLabel[examType]}</div>
          {content}
        </span>
      );
    });

    return (
      <div>
        <div className="nav">
          <a className="logo" href="/">Mavenform</a>
          <a className="material-icons mobile-back">home</a>
          <div className="tooltip-container">
            <a className="material-icons" href="https://docs.google.com/forms/d/e/1FAIpQLSfCS9McWikQ7F6syAGV9FX7Wf2-rWjqt-XMXxxEx5piTIf92Q/viewform?usp=sf_link">sms</a>
            <span className="tooltip">Send Feedback</span>
          </div>
          <div className="tooltip-container reader-mode">
            <a className="material-icons">subject</a>
            <span className="tooltip">Reader Mode</span>
          </div>
        </div>
        <div className={menuClass}>
          <h6>{_.toUpper(course)}</h6>
          <div className="sidetab-container">
            <a className="sidetab active" href={`/course/${course}`}>Index</a>
          </div>
          {sideTabs}
        </div>
        <div className="sidebar">
          <h6>Note</h6>
          <i>This index accounts for every exam from HKN, TBP, and other sources from the past 2 academic years.</i>
        </div>
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
                  <tbody dangerouslySetInnerHTML={{__html: unavailable}}></tbody>
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
