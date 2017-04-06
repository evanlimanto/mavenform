import React from 'react';
import { connect } from 'react-redux';
import { map, range, replace } from 'lodash';

import { scrollNavClickEvent, PDFClickEvent } from '../../events';

const Scroll = require('react-scroll');
var Link = Scroll.Link;

const SidebarComponent = ({ term, courseid, examtype, hasSolutions, examid, problemIDs }) => {
  const examDirPrefix = `${process.env.PUBLIC_URL}/exams/${courseid}/${examtype}-${examid}`;
  const sidetabContainers = map(range(problemIDs.length), (index) => {
    const problemID = problemIDs[index];
    const problemTitle = `Question ${replace(problemID, 'q', '')}`;

    if (problemID.length === 0) {
      return (
        <span key={index}><hr className="s1" /><div className="sidetitle">{problemTitle}</div></span>
      );
    } else {
      return (
        <div className="sidetab-container" key={index}>
          {
            <Link activeClass="active" className="sidetab" to={problemID} spy={true} isDynamic={true} offset={-50} smooth={true} duration={500}
             onClick={() => scrollNavClickEvent()}>
              {problemTitle}
            </Link>
          }
        </div>
      );
    }
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
        {toc}
        {noSolutionsInfo}
        <h6>SOURCES</h6>
        <div className="sidetab-container">
          <a className="sidetab" onClick={() => PDFClickEvent()} href={`${examDirPrefix}-exam.pdf`} target="_blank">Exam PDF</a>
        </div>
        <div className="sidetab-container">
          <a className="sidetab" onClick={() => PDFClickEvent()} href={`${examDirPrefix}-soln.pdf`} target="_blank">Solutions PDF</a>
        </div>
      </div>
    </span>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    term: ownProps.term,
    courseid: ownProps.courseid,
    examtype: ownProps.examtype,
    hasSolutions: ownProps.hasSolutions,
    examid: ownProps.examid,
    problemIDs: ownProps.problemIDs,
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
