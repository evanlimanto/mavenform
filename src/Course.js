import React, { Component } from 'react';
import classnames from 'classnames';
import { exams } from './exams';
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
    var course = null;
    var examId = null;
    var courseName = null;
    var unavailable = null;
    var note = null;
    if (this.props.location.query) {
      course = this.props.location.query.id;
    }
    if (course === 'ee16a') {
      courseName = 'EE 16A';
    } else if (course === 'cs61c') {
      courseName = 'CS 61C';
    } else {
      courseName = 'CS 162';
    }
    const examType = 'midterm-1';
    const available = _.values(_.mapValues(exams[course][examType], (dict, semester) => {
      return (
        <tr className="available" onClick={handleEvent("Click", "Exam", course)}>
          <td><a href={dict['url'] + '&courseId=' + course}>{_.replace(_.capitalize(examType), '-', ' ')}</a></td>
          <td><a href={dict['url'] + '&courseId=' + course}>{semester}</a></td>
          <td><a href={dict['url'] + '&courseId=' + course}>{dict['profs']}</a></td>
          <td><h4><a className="table-link" href={dict['url'] + '&courseId=' + course}>CLICK TO VIEW &#8594;</a></h4></td>
        </tr>
      );
    }));
    if (course === 'ee16a') {
      unavailable =
      `
      <tr>
        <td>Midterm 2</td>
        <td>2015 - 2016</td>
        <td>Miscellaneous</td>
        <td><i>In progress</i></td>
      </tr>
      <tr>
        <td>Final</td>
        <td>2015 - 2016</td>
        <td>Miscellaneous</td>
        <td><i>In progress</i></td>
      </tr>
      `;
      note = '';
    } else if (course === 'cs61c') {
      unavailable =
      `
      <tr>
        <td>Midterm 2</td>
        <td>2014 - 2016</td>
        <td>Miscellaneous</td>
        <td><i>In progress</i></td>
      </tr>
      <tr>
        <td>Final</td>
        <td>2014 - 2016</td>
        <td>Miscellaneous</td>
        <td><i>In progress</i></td>
      </tr>
      `;
      note = '<i>(up to the last 3 academic years)</i>';
    } else {
      unavailable =
      `
      <tr>
        <td>Midterm 2</td>
        <td>2015 - 2016</td>
        <td>Miscellaneous</td>
        <td><i>In progress</i></td>
      </tr>
      <tr>
        <td>Final</td>
        <td>2015 - 2016</td>
        <td>Miscellaneous</td>
        <td><i>In progress</i></td>
      </tr>
      `;
      note = '<i>(up to the last 2 years)</i>';
    }

    const collapserClass = classnames({
      collapse: true,
      iscollapsed: !this.state.sidebar
    });
    const collapser = (
      <a className={collapserClass} onClick={() => this.toggleCollapse(courseName)}>&#9776; {(this.state.sidebar) ? "COLLAPSE" : "MENU"}</a>
    );

    const menuClass = classnames({
      menu: true,
      hidden: !this.state.sidebar
    });

    const sideTabs = _.map(exams[course], (courseExams, examType) => {
      const content =  _.map(courseExams, (info, semester) => {
        const url = `${info['url']}&courseId=${course}`;
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
        <span>
          <div className="sideTitle">{_.capitalize(_.replace(examType, '-', ' '))}</div>
          {content}
        </span>
      );
    });

    return (
      <div className="shift">
        <a className="return" href="/">&#8592; RETURN</a>
        {collapser}
        <div className={menuClass}>
          <a className="home center" href="/">Mavenform</a>
          <hr className="s1" />
          <h4>{_.toUpper(course)}</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab active" href={"/course?id=" + course} onClick={handleEvent("Click", "Index", course)}>Index</a>
          </div>
          <hr className="s1" />
          {sideTabs}
          <a className="index" href="/">&#8592; RETURN</a>
        </div>
        <a className="feedback" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div>
          <hr className="margin" />
          <h1 className="center">{courseName}</h1>
          <hr className="s2" />
          <div className="center">
            <h5>Index of all exams</h5>
          </div>
          <hr className="s5" />
          <div className="center">
            <p className="test">Status of every exam from TBP, HKN, and all other sources <span dangerouslySetInnerHTML={{__html: note}}></span></p>
            <hr className="s3" />
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
