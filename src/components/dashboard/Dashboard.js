import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div style={{ margin: "50px" }}>
        <Link to="/dashboard/content">Content</Link>
        <hr className="s1" />
        <Link to="/dashboard/courses">Courses</Link>
        <hr className="s1" />
        <Link to="/dashboard/exams">Exams</Link>
        <hr className="s1" />
        <Link to="/dashboard/schools">Schools</Link>
        <hr className="s1" />
        <Link to="/dashboard/imageupload">Image Upload</Link>
        <hr className="s1" />
        <Link to="/dashboard/transcribe">Transcription</Link>
      </div>
    );
  }
}

export default Dashboard;
