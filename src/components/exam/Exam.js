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

function setReaderMode() {
  var wrapper = document.createElement("span");
  wrapper.className = "reader";
  var examNode = document.getElementsByClassName("content")[0];
  examNode.parentNode.replaceChild(wrapper, examNode);
  wrapper.appendChild(examNode);
}

function setAppMode() {
  var wrapper = document.getElementsByClassName("reader")[0];
  var content = document.getElementsByClassName("content")[0];
  wrapper.removeChild(content);
  wrapper.parentNode.appendChild(content);
  wrapper.parentNode.removeChild(wrapper);
}

const ExamComponent = ({ appMode, courseid, examtype, examid, onToggleAppMode }) => {
  // if (appMode) {
  //   setAppMode();
  // } else {
  //   setReaderMode();
  // }

  try {
    exams[courseid][examtype][examid];
  } catch (ex) {
    return <NotFound />;
  }

  const navComponents = (appMode) ? (
    <span>
      <Navbar isExam={true} onToggleAppMode={onToggleAppMode} />
      <NavSidebar isExam={true} />
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
