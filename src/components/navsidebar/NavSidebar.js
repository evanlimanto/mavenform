import React, { Component } from 'react';
import classnames from 'classnames';
import { handleEvent } from '../../utils';
import { exams, examTypeToLabel, courseIDToLabel } from '../../exams';

const _ = require('lodash');

class NavSidebar extends Component {
  render() {
    const course = this.props.course;
    const exam = this.props.exam;

    const sideTabs = _.map(exams[course], (courseExams, examType) => {
      const content =  _.map(courseExams, (info, semester) => {
        const url = `/exam/${course}/${examType}/${info.id}`;
        const title = semester;
        const sideTabClass = classnames({
          sidetab: true,
          active: (exam === info['id']),
        });
        return (
          <div key={semester} className="sidetab-container">
            <a className={sideTabClass} href={url}>{title}</a>
          </div>
        );
      });
      return (
        <span key={examType}>
          <div className="sideTitle"><span className="material-icons sideArrow">keyboard_arrow_down</span>{examTypeToLabel[examType]}</div>
          {content}
          <div className="sideTitle"><span className="material-icons sideArrow">keyboard_arrow_right</span> Midterm 2 </div>
          <div className="sideTitle"><span className="material-icons sideArrow">keyboard_arrow_right</span> Final </div>
        </span>
      );
    });

    return (
      <div className="menu">
        <h6>{courseIDToLabel[course]}</h6>
        <div className="sidetab-container">
          <a className="sidetab active" href={`/course/${course}`} onClick={() => handleEvent('Click', 'Index')}>Index</a>
        </div>
        {sideTabs}
      </div>
    );
  }
}

export default NavSidebar;
