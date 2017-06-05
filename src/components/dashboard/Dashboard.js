import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <hr className="s5" />
        <h1 className="center">ALL TRANSCIPTIONS</h1>
        <div className="center">
          <div className="table-container-container">
            <div className="table-container">
              <table className="exams center">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Term</th>
                    <th>Instructors</th>
                    <th>Last Modified</th>
                    <th>Studyform</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="available" >
                    <td><a href="dashboard/transcribe">-</a></td>
                    <td><a href="dashboard/transcribe">-</a></td>
                    <td><a href="dashboard/transcribe">-</a></td>
                    <td><a href="dashboard/transcribe">-</a></td>
                    <td><h6><a className="table-link" href="dashboard/transcribe">CREATE NEW &#8594;</a></h6></td>
                  </tr>
                  <tr className="available" >
                    <td><a href="dashboard/transcribe">Midterm 1</a></td>
                    <td><a href="dashboard/transcribe">Spring 2017</a></td>
                    <td><a href="dashboard/transcribe">Loma</a></td>
                    <td><a href="dashboard/transcribe">12/07/17 12:00:02</a></td>
                    <td><h6><a className="table-link" href="dashboard/transcribe">CLICK TO EDIT &#8594;</a></h6></td>
                  </tr>
                  <tr className="available" >
                    <td><a href="dashboard/transcribe">Midterm 1</a></td>
                    <td><a href="dashboard/transcribe">Spring 2017</a></td>
                    <td><a href="dashboard/transcribe">Loma</a></td>
                    <td><a href="dashboard/transcribe">12/07/17 12:00:01</a></td>
                    <td><h6><a className="table-link" href="dashboard/transcribe">CLICK TO EDIT &#8594;</a></h6></td>
                  </tr>
                  <tr className="available" >
                    <td><a href="dashboard/transcribe">Midterm 1</a></td>
                    <td><a href="dashboard/transcribe">Spring 2017</a></td>
                    <td><a href="dashboard/transcribe">Loma</a></td>
                    <td><a href="dashboard/transcribe">12/07/17 12:00:00</a></td>
                    <td><h6><a className="table-link" href="dashboard/transcribe">CLICK TO EDIT &#8594;</a></h6></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr className="margin" />
        </div>
        {/*<Link to="/dashboard/content">Content</Link>
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
        <hr className="s1" />
        <Link to="/dashboard/transcribed">Transcribed Exams</Link>*/}
      </div>
    );
  }
}

export default Dashboard;
