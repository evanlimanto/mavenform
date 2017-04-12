import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { has, map } from 'lodash';

import { toggleAppMode } from '../../actions';
import { exams, examTypeToLabel, courseIDToLabel, courses } from '../../exams';
import { examClickEvent, toggleAppModeEvent } from '../../events';

import Navbar from '../navbar';
import NavSidebar from '../navsidebar';
import NotFound from '../notfound';

const CourseComponent = ({ courseid, appMode, onToggleAppMode }) => {
  if (!has(exams, courseid)) {
    return <NotFound />;
  }

  const desc = courses[courseid];
  const available = map(exams[courseid], (examsOfType, examtype) => {
    return map(examsOfType, (item, examid) => {
      const term = item.term;
      const note = item.note ? `(${item.note})` : (null);
      const url = `/${courseid}/${examtype}/${examid}`;
      return (
        <tr className="available" onClick={() => examClickEvent(courseid, examtype, examid)} key={examid}>
          <td><Link to={url}>{examTypeToLabel[examtype]} <i>{note}</i></Link></td>
          <td><Link to={url}>{term}</Link></td>
          <td><Link to={url}>{item.profs}</Link></td>
          <td><h6><Link to={url} className="table-link">CLICK TO VIEW &#8594;</Link></h6></td>
        </tr>
      );
    });
  });
  const navComponents = (appMode) ? (
    <span>
      <Navbar isExam={false} onToggleAppMode={() => onToggleAppMode()} couseid={courseid} />
      <NavSidebar courseid={courseid} isExam={false} />
      <div className="sidebar">
        <h6>INFO</h6>
        <i>{desc}</i>
      </div>
    </span>
  ) : (
    <div className="tooltip-container app-mode" onClick={() => onToggleAppMode()}>
      <a className="material-icons">dashboard</a>
      <span className="tooltip">App Mode</span>
    </div>
  );

  return (
    <div>
      {navComponents}
      <div>
        <h4 className="center">{courseIDToLabel[courseid]}</h4>
        <div className="center">
          <h5>Index of exams</h5>
        </div>
        <hr className="s4" />
        <div className="center">
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
              </table>
            </div>
          </div>
          <hr className="margin" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseid: ownProps.match.params.courseid,
    appMode: state.config.appMode,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleAppMode: () => {
      toggleAppModeEvent();
      dispatch(toggleAppMode());
    }
  }
};

const Course = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseComponent);

export default Course;