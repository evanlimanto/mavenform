import React, { Component } from 'react';
import { cloneDeep, forEach, has, keys, includes, range, map, reduce, replace, split, toLower } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import req from 'superagent';

import { updateTopicInfo, updateCompletedProblems } from '../../actions';
import { BASE_URL, courseCodeToLabel } from '../../utils';
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
    this.setState({
      answerStatus: "correct",
      showSolution: true,
      correct: this.state.correct + 1,
      problemStatus: newProblemStatus,
    }, () => this.saveProgress());
  }

  wrongAnswer() {
    this.setState({
      answerStatus: "wrong",
      showSolution: true,
      wrong: this.state.wrong + 1,
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
    this.setState({
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
            <div className="end-text">
              <h1 className="congratulations-text">Congratulations! You have mastered {this.state.subTopicInfo.subtopic_label}</h1>
              <hr className="s2" />
              <h2 className="info-text">Your correctly answered {this.state.correct} out of {this.problemCount} problem{this.problemCount > 1 ? "s" : ""}.</h2>
            </div>
            <div className="box-footer">
              <Link to={`/interactive/${schoolCode}/${courseCode}`}><button className="check-button">Continue</button></Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    const itemContent = this.state.subTopicInfo.problems[this.state.progressIndicator];
    const contents = this.state.showContents ? [(
      <div key={0}>
        <div dangerouslySetInnerHTML={{ __html: itemContent.problem }}></div>
        <hr className="s1" />
        <div dangerouslySetInnerHTML={{ __html: itemContent.interactive_problem }}></div>
        <div dangerouslySetInnerHTML={{ __html: this.state.showSolution ?
          `<hr class="s2" /><h3>Solution</h3><div class="problem-solution">${itemContent.solution}</div>` : null }}
        ></div>
      </div>
    )] : [];
    return (
      <div className="background">
        {navbar}
        <div className="box">
          <div className="box-header">
            <Link to={`/interactive/${schoolCode}/${courseCode}`}><i className="fa fa-chevron-left back-arrow" aria-hidden="true"></i></Link>
            &nbsp;&nbsp;&nbsp;
            <span className="box-title">{this.state.subTopicInfo.subtopic_label}</span>
            <span className="box-buttons">
              <input className="white" type="button" value="Ask Question" />
            </span>
          </div>
          <div className="problem-content">
            <h3>
              Problem {this.state.progressIndicator + 1}
              {/*itemContent.suggestion_text ? (<span className="reason-circle">
                <div className="tooltip-container">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  <div className="tooltip">
                    {itemContent.suggestion_text}
                  </div>
                </div>
              </span>) : null*/}
              &nbsp;&nbsp;&nbsp;
              <div className="badge">{itemContent.profs}, {itemContent.term_label}</div>
            </h3>
            <hr className="s2" />
            <CSSTransitionGroup
              transitionName="contents"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={300}>
              {contents}
            </CSSTransitionGroup>
          </div>
          <div className={classnames({
            "box-footer": true,
            "correct-answer": this.state.answerStatus === "correct",
            "wrong-answer": this.state.answerStatus === "wrong",
          })}>
            <span className="progress-label">Progress</span>
            {map(range(0, this.problemCount), (index) =>
              <div key={index} onClick={() => this.navigateProblem(index)} className={classnames({
                "progress-circle": true,
                "progress-done": this.state.problemStatus[index] || includes(this.state.completedProblems, this.state.subTopicInfo.problems[index].pspid),
                "progress-current": index === this.state.progressIndicator && !this.state.problemStatus[index]
              })}></div>
            )}
            <span className="progress-label progress-label-light">({this.state.progressIndicator + 1}/{this.problemCount})</span>
            <span className="box-buttons">
              {itemContent.interactive_problem && itemContent.interactive_problem.length > 0 ? (
                <input className="green" type="button" value="Check Answer" onClick={this.checkAnswer} />
              ) : null}
              &nbsp;
              <input className="blue" type="button" value="Show Solution" onClick={this.showSolution} />
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
