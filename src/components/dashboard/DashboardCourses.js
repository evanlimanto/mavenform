import React, { Component } from 'react';
import { map, sortBy } from 'lodash';

const req = require('superagent');
require('../../css/Dashboard.css');

class DashboardCourses extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      schools: [],
      subjects: [],
    };

    this.addCourse = this.addCourse.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('/getCoursesBySchool')
        .then((response) => response.json())
        .then((json) => this.setState({ courses: json })),
      fetch('/getSchools')
        .then((response) => response.json())
        .then((json) => this.setState({ schools: json })),
      fetch('/getSubjects')
        .then((response) => response.json())
        .then((json) => this.setState({ subjects: json }))
    ]);
  }

  addCourse(e) {
    e.preventDefault();
    const course_code = this.refs.code.value;
    const course_name = this.refs.name.value;
    const schoolid = this.refs.school.value;
    const subjectid = this.refs.subject.value;

    req.post('/addCourse')
      .send({ course_code, course_name, schoolid, subjectid })
      .end((err, res) => {
        if (err || !res.ok) throw new Error(err);
        else document.location = "/dashboard/courses";
      });
  }

  deleteCourse(id) {
    req.post('/deleteCourse')
      .field('course_id', id)
      .end((err, res) => {
        if (err || !res.ok) throw new Error(err);
        else document.location = "/dashboard/courses";
      });
  }

  render() {
    const coursesList = map(this.state.courses, (schoolCourses, schoolName) => {
      return (
        <span key={schoolName}>
          <h2>{schoolName}</h2>
          {map(schoolCourses, (course, key) => {
            return <div key={key}>{course.course_code} - {(this.state.examid) ? course.course_name : "NO COURSE NAME"}<a className="admin-function" style={{"marginLeft" : "20px"}}onClick={() => this.deleteCourse(course.course_id)}>Delete</a></div>;
          })}
          <br/>
        </span>
      );
    });

    const schoolsSelect = (
      <select ref="school">
        {map(sortBy(this.state.schools, [(school) => school]), (school, key) => {
          return <option key={key} value={school.id}>{school.name}</option>;
        })}
      </select>
    );

    const subjectsSelect = (
      <select ref="subject">
        {map(this.state.subjects, (subject, key) => {
          return <option key={key} value={subject.subject_id}>{subject.subject_label}</option>;
        })}
      </select>
    );

    return (
      <div className="dashboard-courses-container">
        <div className="admin-nav">
          <a className="admin-link" href="/dashboard">TRANSCRIPTIONS</a>
          <a className="admin-link admin-link-active" href="/dashboard/courses">COURSES</a>
          <a className="admin-link" href="/dashboard/problems">PROBLEMS</a>
          <a className="admin-link" href="/dashboard/comments">COMMENTS</a>
        </div>
        <hr className="s1" />
        <form style={{"padding" : "5px"}}>
          <input type="text" ref="code" placeholder="Course Code" />
          <input type="text" ref="name" placeholder="Course Name" />
          {schoolsSelect}
          {subjectsSelect}
          <button onClick={(e) => this.addCourse(e)}>ADD COURSE</button>
        </form>
        <hr className="s1" />
        <div style={{"padding" : "5px"}}>
          <h1>COURSES</h1>
          {coursesList}
        </div>
      </div>
    );    
  }
}

export default DashboardCourses;
