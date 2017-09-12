import React, { Component } from 'react';
import { connect } from 'react-redux';
import { has, map, range, replace, split, flatten } from 'lodash';
import { Helmet } from 'react-helmet';

import { updateExamInfo, updateComments } from '../../actions';
import { BASE_URL, canUseDOM, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';
import { Question, MultipleChoiceQuestion } from '../question';
import { TopicContent } from '../topic';
import Footer from '../footer';
import Navbar from '../navbar';

class ExamComponent extends Component {
  componentDidMount() {
    ExamComponent.fetchData(this.props.dispatch, this.props);
  }

  static getMeta(props) {
    const { courseCode, labels, examStr } = props;
    const examArr = split(examStr, '-');
    const examType = examArr[0];
    const termCode = examArr[1];
    const title = ((labels.schools) ? `${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)} - Studyform` : "Studyform");
    const description = `Study and discuss past exam problems and solutions for ${courseCodeToLabel(courseCode)} ${termToLabel(termCode)} ${examTypeToLabel(examType)}.`;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }

  static fetchData(dispatch, props) {
    const { schoolCode, courseCode, examStr } = props;
    const examArr = split(examStr, '-');
    const examType = examArr[0];
    const termCode = examArr[1];
    const profs = (examArr.length <= 2) ? "None": examArr[2];
    return fetch(`${BASE_URL}/getExamInfo/${schoolCode}/${courseCode}/${examType}/${termCode}/${replace(profs, /_/g, ', ')}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(updateExamInfo(json))
        return json;
      })
      .then((examInfo) => {
        /*return fetch(`${BASE_URL}/getComments`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contentids: flatten(map(examInfo.info, (num_parts, part) => map(range(1, num_parts + 1), (subpart) => {
              return examInfo.problems[`${part}_${subpart}`].content_id
            })))
          }),
        }).then((response) => response.json())
          .then((json) => dispatch(updateComments(json)))*/
      });
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode, examStr } = this.props;
    const examArr = split(examStr, '-');
    if (examArr.length === 1)
      return <TopicContent schoolCode={schoolCode} courseCode={courseCode} code={examArr[0]} />;
    const examType = examArr[0];
    const termCode = examArr[1];
    const profs = replace((examArr.length <= 2) ? "None" : examArr[2], /_/g, ', ');
    const examInfo = this.props.examInfo;

    const examContent = (!examInfo) ? (<p className="loader">Loading content...</p>) :
      map(this.props.examInfo.info, (num_parts, part) => {
        const subparts = map(range(1, num_parts + 1), subpart => {
          const key = `${part}_${subpart}`;
          if (!has(examInfo.problems, key)) {
            console.warn(`${key} doesn't exist in exam!`);
            return null;
          }
          const content = examInfo.problems[key].problem || '';
          const solution = examInfo.problems[key].solution || '';
          const choices = examInfo.problems[key].choices || '';
          const content_id = examInfo.problems[key].content_id;
          const final_solution = examInfo.problems[key].final_solution;
          const props = {
            content_id, courseCode, schoolCode, content, solution, termCode, examType, choices, final_solution,
            id: part + "_" + subpart,
            solutionNum: solution,
            comments: this.props.comments[content_id]
          }
          if (choices && choices.length > 0) {
            return <MultipleChoiceQuestion key={key} {...props} />
          }
          return <Question key={key} {...props} />
        });

        return <span key={part} className="element">{subparts}</span>;
      });

    const examDesc = (
      <div id="header-text">
        <div className="center">
          <h4>{courseCodeToLabel(courseCode)}</h4>
          <h5>{examTypeToLabel(examType)} | {termToLabel(termCode)} {!(profs && profs !== "None") || "| " + profs}</h5>
        </div>
      </div>
    );

    return (
      <div>
        {ExamComponent.getMeta(this.props)}
        <Navbar exam={true} schoolCode={schoolCode} courseCode={courseCode} examTypeCode={examType} termCode={termCode} source_url={this.props.examInfo.source_url} profs={profs} />
        <div>
          {examDesc}
          <div className="content">
            {examContent}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    examStr: ownProps.examStr || ownProps.match.params.examStr,
    labels: state.labels,
    examInfo: state.examInfo,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
}

const Exam = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamComponent);

export default Exam;
