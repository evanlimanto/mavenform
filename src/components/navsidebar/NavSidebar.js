import React, { Component } from 'react';
import classnames from 'classnames';
import { handleEvent } from '../../utils';
import { exams, examTypeToLabel, courseIDToLabel } from '../../exams';
import { has, map } from 'lodash';

class NavSidebar extends Component {
  render() {
    const course = this.props.course;
    const exam = this.props.exam;
    const isExam = this.props.isExam;
    const thisExamType = this.props.examType;

    const sideTabs = map(exams[course], (courseExams, examType) => {
      const content =  map(courseExams, (item, id) => {
        const term = item.term;
        var url = `/${course}/${examType}/${id}`;
        var note = item.note ? `<br/><i class="side-i" >(${item.note})</i>` : (null);
        if (has(item, 'available') && !item.available){
          url = '#';
          note = '';
        }
        const sideTabClass = classnames({
          sidetab: true,
          active: (exam === id && thisExamType === examType),
        });
        return (
          <div key={id} className="sidetab-container">
            <a className={sideTabClass} href={url} onClick={handleEvent("Click", "Sidebar URL")}>{term} <span dangerouslySetInnerHTML={{__html: note}} /></a>
          </div>
        );
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
        <h6>{courseIDToLabel[course]}</h6>
        <div className="sidetab-container">
          <a className={sidetabClass} href={`/${course}`} onClick={() => handleEvent('Click', 'Index')}>Index</a>
        </div>
        {sideTabs}
      </div>
    );
  }
}

NavSidebar.propTypes = {
  course: React.PropTypes.string,
  exam: React.PropTypes.string,
  isExam: React.PropTypes.bool,
  thisExamType: React.PropTypes.string,
};

export default NavSidebar;
