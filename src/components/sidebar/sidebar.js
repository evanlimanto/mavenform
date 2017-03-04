import React, { Component } from 'react';
import { handleEvent } from '../../utils';

const Scroll = require('react-scroll');
const Sticky = require('react-stickynode');
var Link = Scroll.Link;

const _ = require('lodash');

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.generateSidetabContainers = this.generateSidetabContainers.bind(this);
  }

  generateSidetabContainers() {
    const problemIDs = this.props.problemIDs;
    const problemTitles = this.props.problemTitles;
    const term = this.props.term;
    const course = this.props.course;
    const examType = this.props.examType;
    return _.map(_.range(problemIDs.length), (index) => {
      const problemID = problemIDs[index];
      const problemTitle = `Question ${problemID[1]}`;

      if (problemID.length === 0) {
        return (
          <span key={index}><hr className="s1" /><div className="sidetitle">{problemTitle}</div></span>
        );
      } else {
        return (
          <div className="sidetab-container" key={index}>
            {
              <Link
               activeClass="active"
               className="sidetab"
               to={problemID}
               spy={true}
               isDynamic={true}
               offset={-100}
               smooth={true}
               duration={500}
               onClick={() => handleEvent('Scroll Nav', problemID, `${course}${term}-${examType}`)}>
                {problemTitle}
              </Link>
            }
          </div>
        );
      }
    });
  }

  render() {
    const term = this.props.term;
    const course = this.props.course;
    const examType = this.props.examType;
    const examDirPrefix = `${process.env.PUBLIC_URL}/exams/${course}/${examType}-${term}`;
    const webSidetabContainers = this.generateSidetabContainers();

    return (
      <span>
        <div className="sidebar">
          <h6>CONTENTS</h6>
          {webSidetabContainers}
          <hr className="s2" />
          <h6>SOURCES</h6>
          <div className="sidetab-container">
            <a className="sidetab" href={`${examDirPrefix}-exam.pdf`} target="_blank" onClick={() => handleEvent('PDF', 'Exam', `${course}${term}-${examType}`)}>Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={`${examDirPrefix}-soln.pdf`} target="_blank" onClick={() => handleEvent('PDF', 'Solution', `${course}${term}-${examType}`)}>Solutions PDF</a>
          </div>
        </div>
      </span>
    );
  }
}

export default Sidebar;
