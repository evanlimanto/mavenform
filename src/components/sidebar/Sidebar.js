import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { scrollNavClickEvent, PDFClickEvent } from '../../events';

const Scroll = require('react-scroll');

const SidebarComponent = ({ term, courseid, examtype, hasSolutions, examid, problemIDs, info }) => {
  const examDirPrefix = `${process.env.PUBLIC_URL}/exams/${courseid}/${examtype}-${examid}`;
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
        {toc}
        {noSolutionsInfo}
        <h6>SOURCES</h6>
        <div className="sidetab-container">
          <Link to={`${examDirPrefix}-exam.pdf`} className="sidetab" onClick={() => PDFClickEvent()} target="_blank">Exam PDF</Link>
        </div>
        <div className="sidetab-container">
          <Link to={`${examDirPrefix}-soln.pdf`} className="sidetab" onClick={() => PDFClickEvent()} target="_blank">Solutions PDF</Link>
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
