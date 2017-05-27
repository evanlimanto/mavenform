import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { scrollNavClickEvent, PDFClickEvent } from '../../events';

const Scroll = require('react-scroll');

function getExamPDFURL(courseid, examtype, examid) {
  return `https://storage.googleapis.com/studyform/ucberkeley/${courseid}/${examtype}-${examid}-exam.pdf`;
}

function getSolutionPDFURL(courseid, examtype, examid) {
  return `https://storage.googleapis.com/studyform/ucberkeley/${courseid}/${examtype}-${examid}-soln.pdf`;
}

class SidebarComponent extends Component {
  render() {
    const { term, courseid, examtype, hasSolutions, examid, problemIDs, info } = this.props;
    const sidetabContainers = map(info, (num_parts, part) => {
      const problemTitle = `Question ${part}`;

      return (
        <div className="sidetab-container" key={part}>
          {
            <Scroll.Link activeClass="active" className="sidetab" to={part} spy={true} isDynamic={true} offset={-50} smooth={true} duration={500}
             onClick={() => scrollNavClickEvent()}>
              {problemTitle}
            </Scroll.Link>
          }
        </div>
      );
    });

    const toc = (
      <span>
        <h6>CONTENTS</h6>
        {sidetabContainers}
        <hr className="s2" />
      </span>
    );

    const noSolutionsInfo = (hasSolutions) ? (null) : (
      <span>
        <h6>NOTE</h6>
        <i>Unfortunately, no solutions are available for this exam.</i>
        <hr className="s2" />
      </span>
    );

    return (
      <span>
        <div className="sidebar">
          {(info) ? toc : null}
          {noSolutionsInfo}
          <h6>SOURCES</h6>
          <div className="sidetab-container">
            <a href={getExamPDFURL(courseid, examtype, examid)} className="sidetab" onClick={PDFClickEvent} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a href={getSolutionPDFURL(courseid, examtype, examid)} className="sidetab" onClick={PDFClickEvent} target="_blank">Solution PDF</a>
          </div>
        </div>
      </span>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    term: ownProps.term,
    courseid: ownProps.courseid,
    examtype: ownProps.examtype,
    hasSolutions: ownProps.hasSolutions,
    examid: ownProps.examid,
    problemIDs: ownProps.problemIDs,
    info: ownProps.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);

export default Sidebar;
