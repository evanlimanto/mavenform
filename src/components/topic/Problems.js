import React, { Component } from 'react';
import { cloneDeep, forEach, has, keys, includes, range, map, reduce, replace, split, toLower } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import req from 'superagent';

import { updateTopicInfo, updateCompletedProblems } from '../../actions';
import { BASE_URL, courseCodeToLabel, termToLabel } from '../../utils';
import Navbar from '../navbar';
import Footer from '../footer';

require('../../css/TopicSet.css');

class ProblemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: false,
      showContents: true,
      answerStatus: null,
      progressIndicator: 0,
      correct: 0,
      wrong: 0,
      problemStatus: map(range(0, 20), () => false),
      subTopicInfo: { problems: { 0: {} } }
    };
    this.problemCount = 1;
    this.reset = this.reset.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.saveProgress = this.saveProgress.bind(this);
    this.showSolution = this.showSolution.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.navigateProblem = this.navigateProblem.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
    this.redoQuestion = this.redoQuestion.bind(this);
  }

  componentDidMount() {
    const { courseCode, schoolCode, topicCode } = this.props;
    const auth_user_id = this.props.auth.getProfile().user_id;
    return Promise.all([
      fetch(`${BASE_URL}/getSubTopicInfo/${auth_user_id}/${schoolCode}/${courseCode}/${topicCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ subTopicInfo: json })),
      fetch(`${BASE_URL}/getCompletedProblems/${auth_user_id}/${schoolCode}/${courseCode}/${topicCode}`)
        .then((response) => response.json())
        .then((json) => this.setState({ completedProblems: json }))
    ]);
  }

  static fetchData(dispatch, props) {
  }

  componentWillUpdate(nextProps, nextState) {
    this.problemCount = keys(nextState.subTopicInfo.problems).length;
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  correctAnswer() {
    const newProblemStatus = cloneDeep(this.state.problemStatus);
    newProblemStatus[this.state.progressIndicator] = true;
    const inputBoxes = document.getElementsByClassName("inline-input");
    for (var i = 0; i < inputBoxes.length; i++) {
      inputBoxes[i].classList.remove("input-wrong");
      inputBoxes[i].classList.add("input-correct");
    }
    this.setState({
      answerStatus: "correct",
      showSolution: true,
      correct: this.state.correct + 1,
      problemStatus: newProblemStatus,
    }, () => this.saveProgress());
  }

  wrongAnswer() {
    const inputBoxes = document.getElementsByClassName("inline-input");
    for (var i = 0; i < inputBoxes.length; i++) {
      inputBoxes[i].classList.remove("input-correct");
      inputBoxes[i].classList.add("input-wrong");
    }
    this.setState({
      answerStatus: "wrong",
      wrong: this.state.wrong + 1,
    });
  }

  redoQuestion() {
    this.setState({
      showSolution: false,
      answerStatus: null,
    });
  }

  checkAnswer() {
    const answerInputs = document.getElementsByClassName("inline-input");
    const expectedAnswers = split(this.state.subTopicInfo.problems[this.state.progressIndicator].interactive_solution, '@');
    forEach(answerInputs, (answerInput, index) => {
      const answerValue = toLower(replace(answerInput.value, / /g, ''));
      const isCorrectAnswer = reduce(split(expectedAnswers[index], '|'), (res, item) => {
        if (res)
          return res;
        return item === answerValue;
      }, false);
      if (isCorrectAnswer)
        return this.correctAnswer();
      return this.wrongAnswer();
    });
  }

  showSolution() {
    const newProblemStatus = cloneDeep(this.state.problemStatus);
    newProblemStatus[this.state.progressIndicator] = true;
    const inputBoxes = document.getElementsByClassName("inline-input");
    for (var i = 0; i < inputBoxes.length; i++) {
      inputBoxes[i].classList.remove("input-wrong");
      inputBoxes[i].classList.remove("input-correct");
    }
    this.setState({
      answerStatus: null,
      showSolution: true,
      problemStatus: newProblemStatus
    }, () => this.saveProgress());
  }

  saveProgress() {
    const auth_user_id = this.props.auth.getProfile().user_id;
    const pspid = this.state.subTopicInfo.problems[this.state.progressIndicator].pspid;
    req.post('/saveProgress')
      .send({ auth_user_id, pspid })
      .end((err, res) => {
        if (err || !res.ok)
          return console.error(err);
      });
  }

  reset() {
    this.setState({
      showSolution: false,
      answerStatus: null,
      showContents: false,
    }, () => window.setTimeout(() => this.setState({ showContents: true }), 300));
  }

  navigateProblem(index) {
    this.setState({ answerStatus: null, progressIndicator: index, showSolution: false });
  }

  askQuestion() {
    const { courseCode } = this.props;
    window.Intercom('showNewMessage', `I need help with ${courseCode} on Problem ${(this.state.progressIndicator + 1)} of the topic "${this.state.subTopicInfo.subtopic_label}"!`);
  }

  componentWillMount() {
    const self = this;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        self.state.showSolution ? self.reset() : self.checkAnswer();
      }
    }, false);
  }

  render() {
    const { courseCode, schoolCode, topicCode } = this.props;
    const navbar = <Navbar interactive={true} links={[`${schoolCode}`, `${courseCode}`, "interactive", topicCode]}
                    navbarLabels={[this.props.labels.schools[schoolCode], courseCodeToLabel(courseCode), "Interactive Study", this.state.subTopicInfo.subtopic_label]} />

    if (this.state.progressIndicator === this.problemCount && !this.state.showSolution) {
      return (
        <div className="background">
          {navbar}
          <div className="box">
            <div className="box-header">
              <Link to={`/${schoolCode}/${courseCode}/interactive`}><i className="fa fa-chevron-left back-arrow" aria-hidden="true"></i></Link>
              &nbsp;&nbsp;&nbsp;
              <span className="box-title">{this.state.subTopicInfo.subtopic_label}</span>
              <span className="box-buttons">
                <input className="white" type="button" value="Ask Question" onClick={this.askQuestion} />
              </span>
            </div>
            <div className="problem-content">
              <img className="flag" src={"/img/flag.svg"} />
              <h1 className="congratulations-text">Congratulations!</h1>
              <h3 className="center"> You have mastered {this.state.subTopicInfo.subtopic_label}. </h3>
              <hr className="s2" />
              <p className="info-text center">{this.state.correct} out of {this.problemCount} problem{this.problemCount > 1 ? "s" : ""} successfully finished. </p>
            </div>
            <div className="box-footer">
              <span className="progress-label">Progress</span>
              {map(range(0, this.problemCount), (index) =>
                <div key={index} onClick={() => this.navigateProblem(index)} className={classnames({
                  "progress-circle": true,
                  "progress-done": this.state.problemStatus[index] || includes(this.state.completedProblems, this.state.subTopicInfo.problems[index].pspid),
                  "progress-current": index === this.state.progressIndicator && !this.state.problemStatus[index]
                })}></div>
              )}
              <span className={classnames({
                "progress-label": true,
                "progress-label-light": true,
              })}>({this.state.progressIndicator}/{this.problemCount})</span>
              <span className="box-buttons">
                <span onClick={() => this.navigateProblem(0)}><input className="white" type="button" value="Redo Section"/></span>
                <Link to={`/${schoolCode}/${courseCode}/interactive`}><input className="blue" type="button" value="Finish Section"/></Link>
              </span>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    const itemContent = this.state.subTopicInfo.problems[this.state.progressIndicator];
    const contents = this.state.showContents ? [(
      <div key={0} className="problem-contents">
        <div dangerouslySetInnerHTML={{ __html: itemContent.problem }}></div>
        <hr className="s1" />
        <div dangerouslySetInnerHTML={{ __html: itemContent.interactive_problem }}></div>
        <div dangerouslySetInnerHTML={{ __html: this.state.showSolution ?
          `<hr class="s2" /><div class="blue-text">${itemContent.solution}</div>` : null }}
        ></div>
      </div>
    )] : [];
    const thisExam = this.props.exams.key_dict[itemContent.exam];

    return (
      <div className="background">
        {navbar}
        <div className="box">
          <div className="box-header">
            <Link to={`/${schoolCode}/${courseCode}/interactive`}><i className="fa fa-chevron-left back-arrow" aria-hidden="true"></i></Link>
            &nbsp;&nbsp;&nbsp;
            <span className="box-title">{this.state.subTopicInfo.subtopic_label}</span>
            <span className="box-buttons">
              <input className="white" type="button" value="Ask Question" onClick={this.askQuestion} />
            </span>
          </div>
          <div className="problem-content">
            <h3>
              Problem {this.state.progressIndicator + 1}
              {(itemContent.suggestion_text && itemContent.suggestion_text.length > 0) ? (<span className="reason-circle">
                <div className="tooltip-container">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  <div className="tooltip">
                    {itemContent.suggestion_text}
                  </div>
                </div>
              </span>) : null}
              &nbsp;&nbsp;&nbsp;
              {itemContent.exam && thisExam ? (<div className="badge">{thisExam.profs}, {termToLabel(thisExam.examid)}</div>) : null}
            </h3>
            <hr className="s2" />
            <CSSTransitionGroup
              transitionName="contents"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={300}>
              {contents}
            </CSSTransitionGroup>
            {this.state.answerStatus === "wrong" ? (<div><hr className="s2"/><div className="red-text">Not quite! Try again by entering a different answer, or move on by looking at the solution.</div></div>) : null}
            {this.state.answerStatus === "correct" ? (<div><hr className="s2"/><div className="green-text">Great job! You're ready for the next question.</div></div>) : null}
          </div>
          <div className="box-footer">
          {/*{classnames({
            "box-footer": true,
            "correct-answer": this.state.answerStatus === "correct",
            "wrong-answer": this.state.answerStatus === "wrong",
          }*/}
            <span className="progress-label">Progress</span>
            {map(range(0, this.problemCount), (index) =>
              <div key={index} onClick={() => this.navigateProblem(index)} className={classnames({
                "progress-circle": true,
                "progress-done": this.state.problemStatus[index] || includes(this.state.completedProblems, this.state.subTopicInfo.problems[index].pspid),
                "progress-current": index === this.state.progressIndicator && !this.state.problemStatus[index]
              })}></div>
            )}
            <span className={classnames({
              "progress-label": true,
              "progress-label-light": true,
            })}>({this.state.progressIndicator + 1}/{this.problemCount})</span>
            <span className="box-buttons">
              {(this.state.answerStatus === "correct" || this.state.showSolution) ? (
                <span>
                  <input className="white" type="button" value="Redo Question" onClick={this.redoQuestion} />
                  {(this.state.progressIndicator < keys(this.state.subTopicInfo.problems).length - 1) ? (
                    <input className="blue" type="button" value="Next Problem" onClick={() => this.navigateProblem(this.state.progressIndicator + 1)} />
                  ): (
                    <input className="blue" type="button" value="Continue" onClick={() => this.navigateProblem(this.state.progressIndicator + 1)} />
                  )}
                </span>
              ) : (
                <span>
                  {itemContent.interactive_problem && itemContent.interactive_problem.length > 0 ? (
                    <input className="green" type="button" value="Check Answer" onClick={this.checkAnswer} />
                  ) : null}
                  &nbsp;
                  <input className="blue" type="button" value="Show Solution" onClick={this.showSolution} />
                </span>
              )}
            </span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topicCode: ownProps.topicCode || ownProps.match.params.topicCode,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    auth: state.auth,
    exams: state.exams,
    labels: has(state.labels, 'schools') ? state.labels : { schools: {} },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const Problems = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProblemsComponent);

export default Problems;
