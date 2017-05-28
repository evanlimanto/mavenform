import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { has, map } from 'lodash';

import { navSidebarClickEvent } from '../../events';
import { courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

const NavSidebarComponent = ({ exams, courseid, examid, thisExamType, isExam }) => {
  const sideTabs = map(exams[courseid], (courseExams, examtype) => {
    const content = map(courseExams, (item, id) => {
      const term = termToLabel(id);
      const isAvailable = has(item, 'available') ? item.available : true;
      var url = `/${courseid}/${examtype}/${id}`;
      var note = item.note ? `<br/><i class="side-i" >(${item.note})</i>` : (null);
      if (has(item, 'available') && !item.available){
        url = '#';
        note = '';
      }
      const sideTabClass = classnames({
        sidetab: true,
        active: (examid === id && thisExamType === examtype),
      });
      if (isAvailable) {
        return (
          <div key={id} className="sidetab-container">
            <Link to={url} className={sideTabClass} onClick={() => navSidebarClickEvent()}>
              {term}
              <span dangerouslySetInnerHTML={{__html: note}} />
            </Link>
          </div>
        );
      } else {
        return (<span key={id}></span>);
      }
    });
    return (
      <span key={examtype}>
        <div className="sideTitle">{examTypeToLabel(examtype)}</div>
        {content}
      </span>
    );
  });

  const sidetabClass = classnames({
    sidetab: true,
    active: !isExam,
  });

  return (
    <div className="menu">
      <h6>{courseCodeToLabel(courseid)}</h6>
      <div className="sidetab-container">
        <Link to={`/${courseid}`} className={sidetabClass} onClick={() => navSidebarClickEvent()}>Index</Link>
      </div>
      {sideTabs}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseid: ownProps.courseid,
    examid: ownProps.examid,
    thisExamType: ownProps.examtype,
    isExam: ownProps.isExam,
    exams: state.exams.multi_dict,
  }
};

const NavSidebar = connect(
  mapStateToProps
)(NavSidebarComponent);

export default NavSidebar;
