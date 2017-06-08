import React, { Component } from 'react';
import { map } from 'lodash';

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
    fetch('/getCoursesList')
      .then((response) => response.json())
      .then((json) => this.setState({ courses: json }));
    fetch('/getSchools')
      .then((response) => response.json())
      .then((json) => this.setState({ schools: json }));
    fetch('/getSubjects')
      .then((response) => response.json())
      .then((json) => this.setState({ subjects: json }));
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
        if (err || !res.ok) console.error(err);
        else console.log("Success!");
      });
  }

  render() {
    const coursesList = map(this.state.courses, (course, key) => {
      return <div key={key}>{course.course_name}</div>;
    });

    const schoolsSelect = (
      <select ref="school">
        {map(this.state.schools, (school, key) => {
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
        <h1>Courses</h1>
        {coursesList}
        <form>
          <br/><br/>
          <input type="text" ref="code" placeholder="Course Code" />
          <input type="text" ref="name" placeholder="Course Name" />
          {schoolsSelect}
          {subjectsSelect}
          <button onClick={(e) => this.addCourse(e)}>Add Course</button>
        </form>
      </div>
    );    
  }
}

export default DashboardCourses;
