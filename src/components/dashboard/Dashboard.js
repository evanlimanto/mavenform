import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import dateFormat from 'dateformat';
import { canUseDOM } from '../../utils';

import DashboardLogin from './DashboardLogin';
const cookies = canUseDOM ? require('browser-cookies') : null;

require('../../css/Dashboard.css');

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: []
    };
  }

  isLoggedIn() {
    if (!cookies)
      return false;
    return cookies.get('dashboard_user');
  }

  logout() {
    if (cookies)
      cookies.erase('dashboard_user');
    document.location = '/dashboard';
  }

  componentDidMount() {
    fetch('/getTranscribedExams')
      .then((response) => response.json())
      .then((examsJson) => this.setState({ exams: examsJson }));
  }

  render() {
    if (!this.isLoggedIn()) {
      return <DashboardLogin />;
    }
    const examsList = map(this.state.exams, (exam, key) => {
      return (
        <tr className="available" key={key}>
          <td><a>{exam.type_label}</a></td>
          <td><a>{exam.term_label}</a></td>
          <td><a>{exam.profs}</a></td>
          <td><a>{dateFormat(exam.datetime, "ddd, mmmm d, yyyy, h:MM TT")}</a></td>
          <td><a>Transcribed</a></td>
          {/*<td><h6><Link className="table-link" to={url}>CLICK TO EDIT &#8594;</Link></h6></td>*/}
        </tr>
      );
    });

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
                    <td><Link to="/dashboard/transcribe">-</Link></td>
                    <td><Link to="/dashboard/transcribe">-</Link></td>
                    <td><Link to="/dashboard/transcribe">-</Link></td>
                    <td><Link to="/dashboard/transcribe">-</Link></td>
                    <td><h6><Link className="table-link" to="/dashboard/transcribe">CREATE NEW &#8594;</Link></h6></td>
                  </tr>
                  {examsList}
                </tbody>
              </table>
            </div>
          </div>
          <hr className="s7-5" />
          <button className="dashboard-logout-btn" onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
