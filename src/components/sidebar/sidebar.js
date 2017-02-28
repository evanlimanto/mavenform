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
            (is_mobile) ?
            (
              <Link className="sidetab" to={problemID} isDynamic={true} smooth={true} duration={500} onClick={() => handleEvent("Click", "Sidebar", examCode)}>
                {problemTitle}
              </Link>
            ) :
            (
              <Link activeClass="active" className="sidetab" to={problemID} spy={true} isDynamic={true} smooth={true} duration={500} onClick={() => handleEvent("Click", "Sidebar", examCode)}>
                {problemTitle}
              </Link>
            )
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
        <Sticky className="sidebar screen">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          {webSidetabContainers}
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-exam.pdf`} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-soln.pdf`} target="_blank">Solutions PDF</a>
          </div>
        </Sticky>
        <div className="sidebar mobile">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          {mobileSidetabContainers}
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
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
