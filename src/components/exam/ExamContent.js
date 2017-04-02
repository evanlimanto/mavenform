import React from 'react';
import { connect } from 'react-redux';
import { has, keys, range, replace, map, values} from 'lodash';
import marked from 'marked';

import { Question, Sidebar } from '../';
import { courseIDToLabel, examTypeToLabel, termToLabel } from '../../exams';
import { updateExamContent } from '../../actions';

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
  code = replace(code, /\r\n|\r|\n/g, '<hr class="scode" />');
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
  return `<code class="codediv">${code}</code>`;
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
  text = marked(text, {renderer});
  text = replace(text, /&amp;/g, '&');
  return text;
};

const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scrollSpy = Scroll.scrollSpy;

const ExamContentComponent = ({ examContent, courseid, examtype, examid, appMode, showSolutions }) => {
  // componentDidMount() {
  //   const exam = this.props.exam;
  //   const course = this.props.course;
  //   const type = this.props.type;
  //   fetch(`/getExam/${course}/${type}/${exam}`).then(function(response) {
  //     return response.json();
  //   }).then((json) => {
  //     this.setState({ examContent: json });
  //   });
  //   window.renderMJ();
  // }

  // componentDidUpdate() {
  //   // Move header to first question element
  //   var header = document.getElementById("header-text");
  //   header.parentNode.removeChild(header);
  //   var firstQuestion = document.getElementsByClassName("element")[0];
  //   firstQuestion.insertBefore(header, firstQuestion.firstChild);
  //   scrollSpy.update();
  //   window.renderMJ();
  // }
  if (!examContent) {
    return null;
  }

  const examCode = `${examContent.course}${examContent.ref}`;
  const problemIDs = keys(examContent.parts)
  const problemTitles = values(examContent.questions);
  const { course, prof, type, term, md, mcq, num, pre, has_solutions } = examContent;

  var content = map(examContent.parts, (num_parts, part) => {
    const subparts = map(range(1, num_parts + 1), subpart => {
      const key = `${part}_${subpart}`;
      if (!has(examContent, key)) {
        console.warn(`${key} doesn't exist in exam!`);
        return null;
      }
      var qcontent = examContent[key] || '';
      var solution = examContent[key + "_s"] || '';
      if (md) {
        // TODO: Remove md from .yml files
        qcontent = preprocess(qcontent);
        solution = preprocess(solution);
      }
      return <Question id={`${part}_${subpart}`} course={course} content={qcontent} solution={solution} term={term} examType={type} key={key} appMode={appMode} showSolutions={showSolutions} />
    });

    return <Element name={part} key={part} className="element">{subparts}</Element>;
  });

  const examDesc = (
    <div id="header-text">
      <div className="center">
        <h4>{courseIDToLabel[course]}</h4>
        <h5>{examTypeToLabel[type]} | {termToLabel[term]} | {prof}</h5>
      </div>
      <div dangerouslySetInnerHTML={{__html: pre}} />
    </div>
  );

  return (has_solutions) ? (
    <div className="content">
      {examDesc}
      {content}
    </div>
  ) : (
    <span className="reader">
      <div className="content">
        {examDesc}
        {content}
        {(appMode) ? <Sidebar /> : null}
      </div>
    </span>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    examContent: null,
    courseid: ownProps.courseid,
    examtype: ownProps.examtype,
    examid: ownProps.examid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExamContent: (courseid, examtype, examid) =>
      fetch(`/getExam/${courseid}/${examtype}/${examid}`).then(
        (response) => response.json()
      ).then(
        (json) => dispatch(updateExamContent(json))
      ),
  };
};

const ExamContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamContentComponent);

export default ExamContent;