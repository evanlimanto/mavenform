import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { has, map } from 'lodash';

import { handleEvent } from '../../utils';
import { exams, examTypeToLabel, courseIDToLabel } from '../../exams';

const NavSidebarComponent = ({ courseid, examid, thisExamType, isExam }) => {
  const sideTabs = map(exams[courseid], (courseExams, examType) => {
    const content =  map(courseExams, (item, id) => {
      const term = item.term;
      const isAvailable = has(item, 'available') ? item.available : true;
      var url = `/${courseid}/${examType}/${id}`;
      var note = item.note ? `<br/><i class="side-i" >(${item.note})</i>` : (null);
      if (has(item, 'available') && !item.available){
        url = '#';
        note = '';
      }
      const sideTabClass = classnames({
        sidetab: true,
        active: (examid === id && thisExamType === examType),
      });
      if (isAvailable) {
        return (
          <div key={id} className="sidetab-container">
            <a className={sideTabClass} href={url} onClick={handleEvent("Click", "Sidebar URL")}>
              {term}
              <span dangerouslySetInnerHTML={{__html: note}} />
            </a>
          </div>
        );
      } else {
        return (<span key={id}></span>);
      }
    });
    return (
      <span key={examType}>
        <div className="sideTitle">{examTypeToLabel[examType]}</div>
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
      <h6>{courseIDToLabel[courseid]}</h6>
      <div className="sidetab-container">
        <a className={sidetabClass} href={`/${courseid}`} onClick={() => handleEvent('Click', 'Index')}>Index</a>
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const NavSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavSidebarComponent);

export default NavSidebar;
