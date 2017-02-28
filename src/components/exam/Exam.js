import React, { Component } from 'react';
import { Question, Sidebar } from '../../components';
const _ = require('lodash');
const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

class Exam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      examContent: null
    };
  }

  componentDidMount() {
    fetch(`/exam?id=${this.props.code}&type=${this.props.type}`).then(function(response) {
      return response.json();
    }).then((json) => {
      this.setState({ examContent: json });
    });
  }

  componentDidUpdate() {
    scrollSpy.update();
  }

  formatSemester(sem) {
    return _.replace(_.replace(sem, 'fa', 'Fall '), 'sp', 'Spring ');
  }

  render() {
    const examContent = this.state.examContent;
    const examCode =
      (examContent && _.has(examContent, 'examcode')) ?
      (examContent.examcode) : [];
    const problemIDs =
      (examContent && _.has(examContent, 'parts')) ?
      (_.keys(examContent.parts)) : [];
    const problemTitles =
      (examContent && _.has(examContent, 'titles')) ?
      (_.values(examContent.titles)) : [];
    const course =
      (examContent && _.has(examContent, 'examcode')) ?
      (examContent.examcode.split('/')[0]) : null;
    const prof = (examContent && _.has(examContent, 'prof')) ? (examContent.prof) : null;
    const type = (examContent && _.has(examContent, 'type')) ? (examContent.type) : null;
    const semester =
      (examContent && _.has(examContent, 'examcode')) ?
      (examContent.examcode.split('-')[1]) : null;

    const pre = (examContent && _.has(examContent, 'pre')) ?
      (<div dangerouslySetInnerHTML={{'__html': marked(examContent.pre)}} />) : null;
    const content = (examContent && _.has(examContent, 'parts')) ?
      _.map(examContent.parts, (num_parts, part) => {
        const subparts = _.map(_.range(1, num_parts + 1), subpart => {
          const key = `${part}_${subpart}`;
          if (!_.has(examContent, key)) {
            return null;
          }
          console.log(key);
          console.log(examContent[key]);
          const content = marked(examContent[key]);
          console.log(key);
          console.log(examContent[key + "_s"]);
          const solution = marked(examContent[key + "_s"]);
          console.log(key);
          return <Question id={_.replace(key, '_', '-')} content={content} solution={solution} examCode={examCode} key={key} />
        });
        return <Element name={part} key={part}>{subparts}</Element>;
      }) : null;

    return (
      <span>
        <h1>{_.toUpper(course)}</h1>
        <hr className="s2" />
        <div className="center">
          <h5>{type} | {this.formatSemester(semester)} | {prof}</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          {pre}
          {content}
        </div>
      </span>
    );
  }
}

export default Exam;
