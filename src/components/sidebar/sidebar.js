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

  generateSidetabContainers(is_mobile) {
    const problemIDs = this.props.problemIDs;
    const problemTitles = this.props.problemTitles;
    const examCode = this.props.examCode;
    return _.map(_.range(problemIDs.length), (index) => {
      const problemID = problemIDs[index];
      const problemTitle = problemTitles[index];

      if (problemID.length === 0) {
        return (
          <span><hr className="s1" /><div className="sidetitle">{problemTitle}</div></span>
        );
      }

      return (
        <div className="sidetab-container">
          {
            <Link activeClass="active" className="sidetab" to={problemID} spy={true} isDynamic={true} offset={-50} smooth={true} duration={500}>
              {problemTitle}
            </Link>
          }
        </div>
      );
    });
  }

  render() {
    const examCode = this.props.examCode;
    const webSidetabContainers = this.generateSidetabContainers(false);
    const mobileSidetabContainers = this.generateSidetabContainers(true);

    return (
      <span>
        <div className="sidebar">
          <h6>CONTENTS</h6>
          {webSidetabContainers}
          <hr className="s2" />
          <h6>SOURCES</h6>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-exam.pdf`} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-soln.pdf`} target="_blank">Solutions PDF</a>
          </div>
        </div>
      </span>
    );
  }
}

export default Sidebar;
