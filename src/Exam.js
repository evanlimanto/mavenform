import React, { Component } from 'react';
import classnames from 'classnames';
import { handleEvent } from './utils';
import { examTypeToLabel, termToLabel } from './exams';
import { Question, Sidebar } from './components';
import { exams } from './exams';

const _ = require('lodash');
import './Exam.css';

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

const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  if (level === 1) {
    level = 3;
  }
  return `<h${level}>${text}</h${level}>`;
};
renderer.code = function(code, language) {
  code = _.replace(code, /\r\n|\r|\n/g, '<hr class="s1" />');
  console.log(JSON.stringify(code));
  return `<code>${code}</code>`;
};
renderer.em = function(text) {
  return `<i>${text}</i>`;
};

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

class ExamContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      examContent: null
    };
  }

  componentDidMount() {
    const exam = this.props.exam;
    const course = this.props.course;
    const type = this.props.type;
    fetch(`/getExam/${course}/${type}/${exam}`).then(function(response) {
      return response.json();
    }).then((json) => {
      this.setState({ examContent: json });
    });

    window.renderMJ();
  }

  componentDidUpdate() {
    scrollSpy.update();
  }

  render() {
    const examContent = this.state.examContent;
    const examCode =
      (examContent && _.has(examContent, 'course') && _.has(examContent, 'ref')) ?  (`${examContent.course}${examContent.ref}`) : [];
    const problemIDs =
      (examContent && _.has(examContent, 'parts')) ?
      (_.keys(examContent.parts)) : [];
    const problemTitles =
      (examContent && _.has(examContent, 'questions')) ?
      (_.values(examContent.questions)) : [];
    const course =
      (examContent && _.has(examContent, 'course')) ? examContent.course : null;
    const prof = (examContent && _.has(examContent, 'prof')) ? (examContent.prof) : null;
    const type = (examContent && _.has(examContent, 'type')) ? (examContent.type) : null;
    const term = (examContent && _.has(examContent, 'term')) ? (examContent.term) : null;
    const useMarkdown = (examContent && _.has(examContent, 'md')) ? (examContent.md) : true;

    // General information about the exam
    const pre = (examContent && _.has(examContent, 'pre')) ?
      (<div dangerouslySetInnerHTML={{'__html': marked(examContent.pre, {renderer})}} />) : null;
    const content = (examContent && _.has(examContent, 'parts')) ?
      _.map(examContent.parts, (num_parts, part) => {
        const subparts = _.map(_.range(1, num_parts + 1), subpart => {
          const key = `${part}_${subpart}`;
          if (!_.has(examContent, key)) {
            console.warn(`${key} doesn't exist in exam!`);
            return null;
          }
          var content = examContent[key];
          var solution = examContent[key + "_s"];
          if (useMarkdown) {
              content = marked(content, {renderer});
              solution = marked(solution, {renderer});
          }
          return <Question id={`${part}_${subpart}`} course={course} content={content} solution={solution} term={term} examType={type} key={key} />
        });
        return <Element name={part} key={part}>{subparts}</Element>;
      }) : null;

    return (
      <span>
        <h1>{_.toUpper(course)}</h1>
        <hr className="s2" />
        <div className="center">
          <h5>{examTypeToLabel[type]} | {termToLabel[term]} | {prof}</h5>
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

class Exam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: true,
    };
  }

  toggleCollapse() {
    this.setState({
      sidebar: !this.state.sidebar
    });
    if (this.state.sidebar) {
      document.body.style.left = '-125px';
    } else {
      document.body.style.left = '0';
    }
  }

  render() {
    const exam = this.props.params.examid;
    const course = this.props.params.courseid;
    const examType = this.props.params.examtype;

    // TODO: Check if exam exists in list of transcriptions
    const ExamComponent = <ExamContent exam={exam} course={course} type={examType} />;

    const collapserClass = classnames({
      collapse: true,
      iscollapsed: !this.state.sidebar
    });
    const collapser = (
      <a className={collapserClass} onClick={() => this.toggleCollapse()}>&#9776; {(this.state.sidebar) ? "COLLAPSE" : "MENU"}</a>
    );

    const menuClass = classnames({
      menu: true,
      hidden: !this.state.sidebar
    });

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
          <div className="sideTitle">{_.capitalize(_.replace(examType, '-', ' '))}</div>
          {content}
        </span>
      );
    });

    return (
      <span className="shift">
        <a className="return" href={`/course/${course}`} onClick={handleEvent("Click", "Exam Index", exam)}>&#8592; INDEX</a>
        {collapser}
        <div className={menuClass}>
          <a className="home center" href="/">Mavenform</a>
          <hr className="s1" />
          <h4>{_.toUpper(course)}</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={`/course/${course}`} onClick={handleEvent("Click", "Home")}>Index</a>
          </div>
          <hr className="s1" />
          {sideTabs}
          <a className="index" href="/" >&#8592; RETURN</a>
        </div>
        <a className="feedback" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="test-container">
          <div className="test">
            <hr className="margin" />
            {ExamComponent}
          </div>
        </div>
      </span>
    );
  }
}

export default Exam;
