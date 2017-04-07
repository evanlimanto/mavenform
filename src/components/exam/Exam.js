import React from 'react';
import { connect } from 'react-redux';
import { has } from 'lodash';

import ExamContent from './ExamContent';
import Navbar from '../navbar';
import NavSidebar from '../navsidebar';
import NotFound from '../notfound';

import { toggleAppMode } from '../../actions';
import { exams } from '../../exams';
import { toggleAppModeEvent } from '../../events';

import './Exam.css';

const ExamComponent = ({ appMode, courseid, examtype, examid, onToggleAppMode }) => {
  if (!has(exams, courseid) ||
      !has(exams[courseid], examtype) ||
      !has(exams[courseid][examtype], examid)) {
    return <NotFound />;
  }

  const navComponents = (appMode) ? (
    <span>
      <Navbar isExam={true} onToggleAppMode={onToggleAppMode} />
      <NavSidebar courseid={courseid} examtype={examtype} examid={examid} isExam={true} />
    </span>
  ) : (
    <div className="tooltip-container app-mode" onClick={() => onToggleAppMode()}>
      <a className="material-icons">dashboard</a>
      <span className="tooltip">App Mode</span>
    </div>
  );

  const { profs } = exams[courseid][examtype][examid];
  return (
    <div>
      {navComponents}
      <ExamContent courseid={courseid} examtype={examtype} examid={examid} profs={profs} term={examid} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    appMode: state.config.appMode,
    courseid: ownProps.match.params.courseid,
    examtype: ownProps.match.params.examtype,
    examid: ownProps.match.params.examid,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleAppMode: () => {
      dispatch(toggleAppMode());
      toggleAppModeEvent();
    }
  };
};

const Exam = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamComponent);

export default Exam;
