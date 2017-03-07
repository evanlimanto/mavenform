import React, { Component } from 'react';
import classnames from 'classnames';
import { handleEvent } from '../../utils';
import { exams, examTypeToLabel, courseIDToLabel } from '../../exams';
import { map } from 'lodash';

class NavSidebar extends Component {
  render() {
    const course = this.props.course;
    const exam = this.props.exam;
    const isExam = this.props.isExam;

    const sideTabs = map(exams[course], (courseExams, examType) => {
      const content =  map(courseExams, (info, semester) => {
        const url = `/${course}/${examType}-${info.id}`;
        const title = semester;
        const sideTabClass = classnames({
          sidetab: true,
          active: (exam === info['id']),
        });
        return (
          <div key={semester} className="sidetab-container">
            <a className={sideTabClass} href={url} onClick={handleEvent("Click", "Sidebar URL")}>{title}</a>
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

export default NavSidebar;
