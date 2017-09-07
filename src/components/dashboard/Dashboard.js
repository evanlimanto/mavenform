import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import dateFormat from 'dateformat';

import DashboardNav from './DashboardNav';
import { canUseDOM, BASE_URL } from '../../utils';
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

  componentDidMount() {
    fetch(`${BASE_URL}/getTranscribedExams`)
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
          <td><Link to={"/dashboard/transcribe/" + key}>{exam.type_label}</Link></td>
          <td><Link to={"/dashboard/transcribe/" + key}>{exam.term_label}</Link></td>
          <td><Link to={"/dashboard/transcribe/" + key}>{exam.profs}</Link></td>
          <td><Link to={"/dashboard/transcribe/" + key}>{dateFormat(exam.datetime, "ddd, mmmm d, yyyy, h:MM TT")}</Link></td>
          <td><h6><Link to={"/dashboard/transcribe/" + key} className="table-link">EDIT / APPROVE &#8594;</Link></h6></td>
        </tr>
      );
    });

    return (
      <div className="admin-general">
        <DashboardNav />
        <hr className="s2" />
        <div className="adjust">
          <h1>TRANSCIPTIONS</h1>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="available">
                      <td><Link to="/dashboard/transcribe">-</Link></td>
                      <td><Link to="/dashboard/transcribe">-</Link></td>
                      <td><Link to="/dashboard/transcribe">-</Link></td>
                      <td><Link to="/dashboard/transcribe">-</Link></td>
                      <td><h6><Link className="table-link" to="/dashboard/transcribe">CREATE NEW  &#8594;</Link></h6></td>
                    </tr>
                    {examsList}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
