import React, { Component } from 'react';
import { courseIDToLabel, examTypeToLabel, termToLabel } from './exams';
import { MultipleChoiceQuestion, Navbar, NavSidebar, Question, Sidebar } from './components';

const _ = require('lodash');
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
renderer.heading = function(text, level) {
  if (level === 1) {
    level = 3;
  }
  return `<h${level}>${text}</h${level}>`;
};
renderer.code = function(code, language) {
  code = _.replace(code, /\r\n|\r|\n/g, '<hr class="s1" />');
  return `<hr class="s2" /><code>${code}</code><hr class="s2" />`;
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
  return `<img src="${href}" title="${title}" alt="${text}" />`;
};
renderer.list = function(body, ordered) {
  if (ordered) {
    return `${_.replace(_.replace(body, '<li>', ''), '</li>', '')}`;
  } else {
    return `<ul>${body}</ul>`;
  }
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
    var header = document.getElementsByClassName("center")[0];
    header.parentNode.removeChild(header);
    var firstQuestion = document.getElementsByClassName("element")[0];
    firstQuestion.insertBefore(header, firstQuestion.firstChild);

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
    const isMCQ = (examContent && _.has(examContent, 'mcq')) ? (examContent.mcq) : false;

    var content = null;
    if (isMCQ) {
      content = _.map(_.range(1, examContent.num + 1), (num) => {
        const key = `q${num}_1`;
        var qcontent = examContent[key] || '';
        var choices = examContent[key + "_i"] || [];
        if (num === 7) {
          console.log(choices[0]);
          console.log(marked(choices[0], {renderer}));
        }
        if (useMarkdown) {
          qcontent = marked(qcontent, {renderer});
          choices = _.map(choices, (choice) => (isString(choice)) ? marked(choice, {renderer}) : (choice));
        }
        const solutionNum = examContent[key + "_s"] || 1;
        return <Element key={num} className="element"><MultipleChoiceQuestion course={course} content={qcontent} solutionNum={solutionNum} choices={choices} examType={type} term={term} key={num} /></Element>;
      });
    } else {
      content = (examContent && _.has(examContent, 'parts')) ?
        _.map(examContent.parts, (num_parts, part) => {
          const subparts = _.map(_.range(1, num_parts + 1), subpart => {
            const key = `${part}_${subpart}`;
            if (!_.has(examContent, key)) {
              console.warn(`${key} doesn't exist in exam!`);
              return null;
            }
            var qcontent = examContent[key] || '';
            var solution = examContent[key + "_s"] || '';
            if (useMarkdown) {
                qcontent = marked(qcontent, {renderer});
                solution = marked(solution, {renderer});
            }
            return <Question id={`${part}_${subpart}`} course={course} content={qcontent} solution={solution} term={term} examType={type} key={key} />
          });
          return <Element name={part} key={part} className="element">{subparts}</Element>;
        }) : null;
    }

    return (
      <div className="content">
        <div className="center">
          <h4>{courseIDToLabel[course]}</h4>
          <h5>{examTypeToLabel[type]} | {termToLabel[term]} | {prof}</h5>
        </div>
        {content}
        <Sidebar course={course} term={term} examType={type} examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
      </div>
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
  }

  render() {
    const exam = this.props.params.examid;
    const course = this.props.params.courseid;
    const examType = this.props.params.examtype;

    const ExamComponent = <ExamContent exam={exam} course={course} type={examType} />;

    return (
      <div>
        <Navbar />
        <NavSidebar course={course} exam={exam} />
        <div>{ExamComponent}</div>
      </div>
    );
  }
}

export default Exam;
