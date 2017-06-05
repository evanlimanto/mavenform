import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router-dom';
import { has, map } from 'lodash';
import { courseCodeToLabel } from '../../utils';

const request = require('superagent');

const meta = {
  description: 'Home that a signed in user sees',
  title: 'Home',
};

class UserHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkedCourses: []
    };
  }

  componentWillMount() {
    const { auth, history } = this.props
    this.props.requireAuth(auth, history)
  }

  componentDidMount() {
    const userid = this.props.auth.getProfile().user_id;
    fetch(`/getBookmarkedCourses/${userid}`).then(
      (response) => response.json()
    ).then(
      (json) => this.setState({ bookmarkedCourses: json })
    );
  }

  bookmarkCourse() {
    const req = request.post('/bookmarkCourse');
    req.field('course', '')
      .end(function(err, res) {
        if (err || !res.ok) {
        } else {
        }
      });
  }

  render() {
    const profile = this.props.auth.getProfile();
    const username = (has(profile, 'user_metadata') && has(profile.user_metadata, 'username')) ?
      (profile.user_metadata.username) : (profile.nickname);

    const bookmarkedCoursesBoxes = (
      <div className="card-container">
        {map(this.state.bookmarkedCourses, (courseCode, key) => {
          return (
            <Link className="card course-card" key={key} to={"/" + "ucberkeley" + "/" + courseCode}>
              <span>{courseCodeToLabel(courseCode)}</span>
              <span className="card-arrow">&#8594;</span>
            </Link>
          );
        })}
        <a className="card course-card add-course">
          <span>+ Add course</span>
        </a>
      </div>
    );

    return (
      <div className="userhome">
        <DocumentMeta {...meta} />
        <div className="nav">
          <div className="container">
            <a href="..">
              <img className="logo" src="/img/logo.svg" />
            </a>
            <input className="nav-search nav-search-signed-in" name="search" placeholder="Search courses..." type="text" autoComplete="off">
            </input>
            <div className="material-icons nav-search-icon">search</div>
            <span className="nav-button nav-signed-in">
              <div className="material-icons signed-in-icon">person</div>
              {username}
              <div className="material-icons signed-in-arrow">keyboard_arrow_down</div>
            </span>
          </div>
        </div>
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>Dashboard</h4>
                <h5>Your bookmarked courses</h5>
              </div>
            </div>
            <hr className="s5" />
            {bookmarkedCoursesBoxes}
            <hr className="s2" />
            <hr className="margin" />
          </div>
          <div className="footer-holder">
          </div>
          <div className="blue center footer">
            <hr className="s2" />
            <p className="white-text">Made for Students by Students</p>
            <hr className="s2" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const UserHome = connect(
  mapStateToProps
)(UserHomeComponent);

export default UserHome;
