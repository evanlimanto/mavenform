import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { showAddCourseModal, showSelectSchoolModal, updateCoursesToBookmark } from '../../actions';
import { courseCodeToLabel, BASE_URL } from '../../utils';
import { Modals } from '../modal';
import Footer from '../footer';
import Navbar from '../navbar';

class UserHomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSchool: { id: null },
      bookmarkedCourses: [],
      coursesToBookmark: [],
    };
  }

  componentDidMount() {
    const userid = this.props.auth.getProfile().user_id;
    fetch(`${BASE_URL}/getUserSchool/${userid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ selectedSchool: json }));
    fetch(`${BASE_URL}/getBookmarkedCourses/${userid}`)
      .then((response) => response.json())
      .then((json) => this.setState({ bookmarkedCourses: json }));
    fetch(`${BASE_URL}/getCoursesToBookmark/${userid}`)
      .then((response) => response.json())
      .then((json) => this.props.updateCoursesToBookmark(json));
  }

  render() {
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
        <a className="card course-card add-course" onClick={this.props.showAddCourseModal}>
          <span>+ &nbsp; Add Course</span>
        </a>
      </div>
    );
    return (
      <div className="userhome">
        <Modals />
        <Navbar userHome={true} />
        <div className="container">
          <div className="center">
            <h4>Your Courses</h4>
          </div>
        </div>
        <hr className="s5" />
        {this.state.selectedSchool.id ? bookmarkedCoursesBoxes : (
          <div className="center">
            <a className="card school-card add-school" onClick={this.props.showSelectSchoolModal}>
              <span>Click to select your school</span>
            </a>
          </div>
        )}
        {/*
          <hr className="s2" />
          <h4>Your Documents</h4>
          <hr className="s7-5" />
          <div className="card-container">
            <a className="card course-card add-course" onClick={this.props.showUploadDocumentsModal}>
              <span>+ &nbsp; Upload A Document</span>
            </a>
          </div>
          */}
        <hr className="s7-5" />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    userSchool: state.userSchool
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSelectSchoolModal: () => dispatch(showSelectSchoolModal()),
    showAddCourseModal: () => dispatch(showAddCourseModal()),
    updateCoursesToBookmark: (courses) => dispatch(updateCoursesToBookmark(courses)),
  };
};

const UserHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomeComponent);

export default UserHome;
