import React, { Component } from 'react';
import { courseIDToLabel, examTypeToLabel, termToLabel } from './exams';
import { MultipleChoiceQuestion, Navbar, NavSidebar, Question, Sidebar } from './components';
import { handleEvent } from './utils';
import { keys, values, has, map, range, replace } from 'lodash';

const isString = require('is-string');
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
renderer.code = function(code, language) {
  code = replace(code, /\r\n|\r|\n/g, '<hr class="s1" />');
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
  return `<hr class="s2" /><code>${code}</code><hr class="s2" />`;
};
renderer.codespan = function(code, language) {
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
  return `<code>${code}</code>`;
};
renderer.em = function(text) {
  return `<i>${text}</i>`;
};
renderer.br = function() {
  return '<hr class="s1" />';
};
renderer.paragraph = function(text) {
  return `${text}`;
};
renderer.image = function(href, title, text) {
  href = replace(href, /\\\./g, '.'); // remove escapes
  return `<img src="${href}" title="${title}" alt="${text}" />`;
};
renderer.list = function(body, ordered) {
  if (ordered) {
    return `${replace(replace(body, '<li>', ''), '</li>', '')}`;
  } else {
    return `<ul>${body}</ul>`;
  }
};

const preprocess = function(text) {
  text = replace(text, /\./g, '\\.');
  text = replace(text, /_/g, '\\_');
  return marked(text, {renderer});
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
    // Move header to first question element
    var header = document.getElementById("header-text");
    header.parentNode.removeChild(header);
    var firstQuestion = document.getElementsByClassName("element")[0];
    firstQuestion.insertBefore(header, firstQuestion.firstChild);

    scrollSpy.update();
  }

  render() {
    const examContent = this.state.examContent;
    const examCode =
      (examContent && has(examContent, 'course') && has(examContent, 'ref')) ?  (`${examContent.course}${examContent.ref}`) : [];
    const problemIDs =
      (examContent && has(examContent, 'parts')) ?
      (keys(examContent.parts)) : [];
    const problemTitles =
      (examContent && has(examContent, 'questions')) ?
      (values(examContent.questions)) : [];
    const course =
      (examContent && has(examContent, 'course')) ? examContent.course : null;
    const prof = (examContent && has(examContent, 'prof')) ? (examContent.prof) : null;
    const type = (examContent && has(examContent, 'type')) ? (examContent.type) : null;
    const term = (examContent && has(examContent, 'term')) ? (examContent.term) : null;
    const useMarkdown = (examContent && has(examContent, 'md')) ? (examContent.md) : true;
    const isMCQ = (examContent && has(examContent, 'mcq')) ? (examContent.mcq) : false;
    const numProblems = (examContent && has(examContent, 'num')) ? (examContent.num) : problemIDs.length;
    const pre = (examContent && has(examContent, 'pre')) ? (preprocess(examContent.pre, {renderer})) : null;
    const appMode = this.props.appMode;
    const showSolutions = this.props.showSolutions;

    var content = null;
    if (isMCQ) {
      content = map(range(1, numProblems + 1), (num) => {
        const key = `q${num}_1`;
        var qcontent = `${num}\\. ${examContent[key]}` || '';
        var choices = examContent[key + "_i"] || [];
        if (useMarkdown) {
          qcontent = preprocess(qcontent, {renderer});
          choices = map(choices, (choice) => (isString(choice)) ? preprocess(choice, {renderer}) : (choice));
        }
        const solutionNum = examContent[key + "_s"] || 1;
        return (
          <Element key={num} className="element">
            <MultipleChoiceQuestion id={`q${num}`} course={course} content={qcontent} solutionNum={solutionNum} choices={choices} examType={type} term={term} key={num} appMode={appMode} showSolutions={showSolutions} />
          </Element>
        );
      });
    } else {
      content = (examContent && has(examContent, 'parts')) ?
        map(examContent.parts, (num_parts, part) => {
          const subparts = map(range(1, num_parts + 1), subpart => {
            const key = `${part}_${subpart}`;
            if (!has(examContent, key)) {
              console.warn(`${key} doesn't exist in exam!`);
              return null;
            }
            var qcontent = examContent[key] || '';
            var solution = examContent[key + "_s"] || '';
            if (useMarkdown) {
                qcontent = preprocess(qcontent, {renderer});
                solution = preprocess(solution, {renderer});
            }
            return <Question id={`${part}_${subpart}`} course={course} content={qcontent} solution={solution} term={term} examType={type} key={key} appMode={appMode} showSolutions={showSolutions} />
          });

          return <Element name={part} key={part} className="element">{subparts}</Element>;
        }) : null;
    }

    const examDesc = (examContent) ? (
      <div id="header-text">
        <div className="center">
          <h4>{courseIDToLabel[course]}</h4>
          <h5>
            {examTypeToLabel[type]} | {termToLabel[term]} | {prof}
          </h5>
        </div>
        <div dangerouslySetInnerHTML={{__html: pre}} />
      </div>
    ) : null;
    const SidebarComponent = (appMode) ? (
      <Sidebar course={course} term={term} examType={type} examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} numProblems={numProblems} isMCQ={isMCQ} />
    ) : (null);

    return (
      <div className="content">
        {examDesc}
        {content}
        {SidebarComponent}
      </div>
    );
  }
}

class Exam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appMode: true,
      showSolutions: false,
    };

    this.toggleAppMode = this.toggleAppMode.bind(this);
    this.toggleAllSolutions = this.toggleAllSolutions.bind(this);
  }

  toggleAppMode() {
    this.setState({
      appMode: !this.state.appMode
    });

    handleEvent('Click', 'Toggle Reader Mode');

    // Remove "Show Solution" buttons
    var wrapper;
    if (this.state.appMode) {
      wrapper = document.createElement("span");
      wrapper.className = "reader";
      var examNode = document.getElementsByClassName("content")[0];
      examNode.parentNode.replaceChild(wrapper, examNode);
      wrapper.appendChild(examNode);
    } else {
      wrapper = document.getElementsByClassName("reader")[0];
      var content = document.getElementsByClassName("content")[0];
      wrapper.removeChild(content);
      wrapper.parentNode.appendChild(content);
      wrapper.parentNode.removeChild(wrapper);
    }

    window.renderMJ();
  }

  toggleAllSolutions() {
    this.setState({
      showSolutions: !this.state.showSolutions
    });
  }

  render() {
    const exam = this.props.params.examid;
    const course = this.props.params.courseid;
    const examType = this.props.params.examtype;
    const ExamComponent = (
      <ExamContent exam={exam} course={course} type={examType} appMode={this.state.appMode} showSolutions={this.state.showSolutions} />
    );
    const navComponents = (this.state.appMode) ? (
      <span>
        <Navbar course={course} isExam={true} showSolutions={this.state.showSolutions} toggleAppModeCallback={this.toggleAppMode} toggleAllSolutionsCallback={this.toggleAllSolutions} />
        <NavSidebar course={course} exam={exam} isExam={true} />
      </span>
    ) : (
      <div className="tooltip-container app-mode" onClick={() => this.toggleAppMode()}>
        <a className="material-icons">dashboard</a>
        <span className="tooltip">App Mode</span>
      </div>
    );

    return (
      <div>
        {navComponents}
        <div>{ExamComponent}</div>
      </div>
    );
  }
}

export default Exam;
