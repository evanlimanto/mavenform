import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has } from 'lodash';

import ExamContent from './ExamContent';
import Navbar from '../navbar';
import NavSidebar from '../navsidebar';
import NotFound from '../notfound';

import { toggleAppMode } from '../../actions';
import { exams } from '../../exams';
import { handleEvent } from '../../utils';

import './Exam.css';

const ExamComponent = ({ appMode, courseid, examtype, examid, onToggleAppMode }) => {
  try {
    exams[courseid][examtype][examid];
  } catch (ex) {
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

  return (
    <div>
      {navComponents}
      <ExamContent courseid={courseid} examtype={examtype} examid={examid} />
    </div>
  );
}

ExamComponent.propTypes = {
  params: React.PropTypes.object,
};

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
      handleEvent('Click', 'Toggle Reader Mode');
    }
  };
};

const Exam = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamComponent);

export default Exam;
