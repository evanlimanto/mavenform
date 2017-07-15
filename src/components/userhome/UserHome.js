import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router-dom';
import { concat, has, map, keys, split } from 'lodash';
import { courseCodeToLabel } from '../../utils';
import Navbar from '../navbar';

const request = require('superagent');

const meta = {
  description: 'Home that a signed in user sees',
  title: 'Home',
};

class UserHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkedCourses: [],
      selectedSchool: { code: null },
      showSelectSchoolModal: false,
      showAddCourseModal: false,
      coursesToBookmark: null,
    };

    this.bookmarkCourse = this.bookmarkCourse.bind(this);
    this.getUnbookmarkedCourses = this.getUnbookmarkedCourses.bind(this);
    this.selectSchool = this.selectSchool.bind(this);
    this.toggleAddCourseModal = this.toggleAddCourseModal.bind(this);
    this.toggleSelectSchoolModal = this.toggleSelectSchoolModal.bind(this);
  }

  componentWillMount() {
    const { auth, history } = this.props
    this.props.requireAuth(auth, history)
  }

  componentDidMount() {
    const userid = this.props.auth.getProfile().user_id;
    fetch(`/getBookmarkedCourses/${userid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ bookmarkedCourses: json }));
    fetch(`/getUserSchool/${userid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ selectedSchool: json }));
  }

  getUnbookmarkedCourses() {
    const userid = this.props.auth.getProfile().user_id;
    const schoolid = this.state.selectedSchool.id;
    fetch(`/getUnbookmarkedCourses/${schoolid}/${userid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ coursesToBookmark: json }));
  }

  bookmarkCourse() {
    const bookmarkArr = split(this.refs.bookmark.value, "~");
    const userid = this.props.auth.getProfile().user_id;
    const courseid = bookmarkArr[0];
    const courseCode = bookmarkArr[1];
    const req = request.post('/bookmarkCourse');
    req.field('auth_user_id', userid)
      .field('course_id', courseid)
      .end(function(err, res) {
        if (err || !res.ok) console.error(err);
      });
    this.setState({
      bookmarkedCourses: concat(this.state.bookmarkedCourses, [courseCode]),
      showAddCourseModal: !this.state.showAddCourseModal
    });
  }

  toggleAddCourseModal() {
    if (this.state.selectedSchool && !this.state.coursesToBookmark) {
      this.getUnbookmarkedCourses();
    }
    this.setState({
      showAddCourseModal: !this.state.showAddCourseModal
    });
  }

  toggleSelectSchoolModal() {
    this.setState({
      showSelectSchoolModal: !this.state.selectSchoolModal
    });
  }

  selectSchool() {
    const schoolArr = split(this.refs.selectedSchool.value, "~");
    const profile = this.props.auth.getProfile();
    const schoolCode = schoolArr[0];
    const schoolid = schoolArr[1];
    const req = request.post('/selectSchool');
    const self = this;
    req.field('school_id', schoolid)
      .field('auth_user_id', profile.user_id)
      .end((err, res) => {
        if (err || !res.ok)
          console.error(err);
        else {
          self.setState({
            selectedSchool: { code: schoolCode, id: schoolid },
            showSelectSchoolModal: false,
          });
        }
      });
  }

  render() {
    const schools = ['ucb', 'ucsd', 'stanford'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego', 'Stanford'];
    const schoolCards = map(schools, (school, key) => {
      return (
        <Link key={key} className="card" to={"/" + school}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });

    const bookmarkedCoursesBoxes = (
      <div className="card-container">
        {map(this.state.bookmarkedCourses, (courseCode, key) => {
          return (
            <Link className="card course-card" key={key} to={"/" + this.state.selectedSchool.code + "/" + courseCode}>
              <span>{courseCodeToLabel(courseCode)}</span>
              <span className="card-arrow">&#8594;</span>
            </Link>
          );
        })}
        <a className="card course-card add-course" onClick={this.toggleAddCourseModal}>
          <span>+ Add course</span>
        </a>
      </div>
    );

    const hasSelectedSchool = has(this.state, 'selectedSchool') && (keys(this.state.selectedSchool).length > 0);
    const selectSchoolModal = (this.state.showSelectSchoolModal) ? (
      <div className="modal-container">
        <div className="modal-click" onClick={this.toggleSelectSchoolModal}>
        </div>
        <div className="modal">
          <div className="modal-header">
            <h1>Select Your School</h1>
          </div>
          <div className="modal-content">
            <hr className="s3"/>
            <select ref="selectedSchool">
              {map(this.props.schools, (school, key) => {
                return <option value={school.code + "~" + school.id} key={key}>{school.name}</option>;
              })}
            </select>
            <div className="select-arrow">
              <div className="material-icons">keyboard_arrow_down</div>
            </div>
            <hr className="s2" />
            <a className="login-button blue" onClick={this.selectSchool}>Confirm</a>
            <hr className="s3"/>
          </div>
        </div>
        <a className="x"><img src="/img/x.svg" alt="close" /></a>
      </div> 
    ) : null;

    const coursesToBookmarkSelect = (this.state.coursesToBookmark) ? (
      <select ref="bookmark">
        {map(this.state.coursesToBookmark.sort((a, b) => a.code.localeCompare(b.code)), (course, key) => {
          return (
            <option key={key} value={`${course.id}~${course.code}`}>{courseCodeToLabel(course.code)}</option>
          );
        })}
      </select>
    ) : null;

    const addCourseModal = (this.state.showAddCourseModal) ? (
      <div className="modal-container">
        <div className="modal-click" onClick={this.toggleAddCourseModal}>
        </div>
        <div className="modal">
          <div className="modal-header">
            <h1>Add Course</h1>
          </div>
          <div className="modal-content">
            <hr className="s3"/>
            {coursesToBookmarkSelect}
            <div className="select-arrow">
              <div className="material-icons">keyboard_arrow_down</div>
            </div>
            <hr className="s2" />
            <a className="login-button blue" onClick={this.bookmarkCourse}>Add To Dashboard</a>
            <hr className="s3"/>
          </div>
        </div>
        <a className="x" onClick={this.toggleAddCourseModal}><img src="/img/x.svg" alt="close" /></a>
      </div>
    ) : null;

    return (
      <div className="userhome">
        <DocumentMeta {...meta} />
        {selectSchoolModal} 
        {addCourseModal}
        <Navbar userHome={true} />
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>Dashboard</h4>
                <h5>Your personal dashboard</h5>
              </div>
            </div>
            <hr className="s5" />
            {hasSelectedSchool ? bookmarkedCoursesBoxes : (
              <div className="center">
                <a className="card school-card add-school" onClick={this.toggleSelectSchoolModal}>
                  <span>Click to select your school</span>
                </a>
              </div>
            )}
            <hr className="s7-5" />
          </div>
          <div className="schools">
            <hr className="s7-5" />
            <h4>Directory</h4>
            <h5>Manually browse schools</h5>
            <hr className="s3" />
            <div className="card-container">
              {schoolCards}
              <hr className="s7-5-plus" />
            </div>
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
    auth: state.auth,
    schools: state.schools
  };
};

const UserHome = connect(
  mapStateToProps
)(UserHomeComponent);

export default UserHome;
