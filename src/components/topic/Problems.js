import React, { Component } from 'react';
import { cloneDeep, keys, range, map } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { updateTopicInfo } from '../../actions';
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
      problemStatus: map(range(0, 10), () => false),
    };
    this.problemCount = 1;
    this.checkAnswer = this.checkAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.reset = this.reset.bind(this);
    this.showSolution = this.showSolution.bind(this);
    this.navigateProblem = this.navigateProblem.bind(this);
  }

  componentDidMount() {
    ProblemsComponent.fetchData(this.props.dispatch, this.props);
    window.renderMJ();
  }

  static fetchData(dispatch, props) {
    const { topicCode } = props;
    return fetch(`${BASE_URL}/getTopicInfo/${topicCode}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateTopicInfo(json)))
  }

  componentWillUpdate(nextProps, nextState) {
    this.problemCount = keys(nextProps.topicInfo.problems).length;
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
    });
  }

  wrongAnswer() {
    this.setState({
      answerStatus: "wrong",
      showSolution: true,
      wrong: this.state.wrong + 1,
    });
  }

  checkAnswer() {
    if (this.refs.answer) {
      const answerValue = this.refs.answer.value;
      if (answerValue === "0")
        return this.correctAnswer();
      return this.wrongAnswer();
    }
  }

  showSolution() {
    const newProblemStatus = cloneDeep(this.state.problemStatus);
    newProblemStatus[this.state.progressIndicator] = true;
    this.setState({ showSolution: true, problemStatus: newProblemStatus });
  }

  reset() {
    this.setState({
      showSolution: false,
      answerStatus: null,
      showContents: false,
    }, () => window.setTimeout(() => this.setState({ showContents: true }), 300));
  }

  navigateProblem(index) {
    this.setState({ progressIndicator: index, showSolution: false });
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
    const { courseCode, schoolCode } = this.props;
    const navbar = <Navbar interactive={true} links={[`interactive/${schoolCode}/${courseCode}`, this.props.topicCode]} navbarLabels={[courseCodeToLabel(courseCode), this.props.topicInfo.topicLabel]} />
    if (this.state.progressIndicator === this.problemCount && !this.state.showSolution) {
      return (
        <div className="background">
          {navbar}
          <div className="box">
            <div className="end-text">
              <h1 className="congratulations-text">Congratulations! You have mastered {this.props.topicInfo.topicLabel}</h1>
              <hr className="s2" />
              <h2 className="info-text">Your correctly answered {this.state.correct} out of {this.problemCount} problem{this.problemCount > 1 ? "s" : ""}.</h2>
            </div>
            <div className="box-footer">
              <Link to="/interactive/math53"><button className="check-button">Continue</button></Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    const itemContent = this.props.topicInfo.problems[this.state.progressIndicator];
    console.log(itemContent);
    const contents = this.state.showContents ? [(
      <div key={0}>
        <div dangerouslySetInnerHTML={{ __html: itemContent.problem }}></div>
        {/*$\int_0^2 \int_1^0 (x^2y^2 +$
          <input className="inline-input"></input>
          $) dy \; dx =$
        <input className="inline-input"></input>*/}
        {itemContent.interactive_problem}
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
            <span className="box-title">{this.props.topicInfo.topicLabel}</span>
            <span className="box-buttons">
              <input className="white" type="button" value="Ask Question" />
            </span>
          </div>
          <div className="problem-content">
            <h3>
              Problem {this.state.progressIndicator + 1}
              <span className="reason-circle">
                <div className="tooltip-container">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  <div className="tooltip">
                    {itemContent.suggestion_text}
                    {/*This problem came from Auroux's Midterm 1 in Fall 2016. It was suggested for you because it is medium difficulty, covers iterated integrals, and has high relevance to your specific instructor.*/}
                  </div>
                </div>
              </span>
            </h3>
            <hr className="s2" />
            <CSSTransitionGroup
              transitionName="contents"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={300}>
              {contents}
            </CSSTransitionGroup>
          </div>
          <div className="box-footer">
            <span className="progress-label">Progress</span>
            {map(range(0, this.problemCount), (index) =>
              <div key={index} onClick={() => this.navigateProblem(index)} className={classnames({
                "progress-circle": true,
                "progress-done": this.state.problemStatus[index],
                "progress-current": index === this.state.progressIndicator && !this.state.problemStatus[index]
              })}></div>
            )}
            <span className="progress-label progress-label-light">({this.state.progressIndicator + 1}/{this.problemCount})</span>
            <span className="box-buttons">
              <input className="green" type="button" value="Check Answer" onClick={this.checkAnswer} />
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
    topicInfo: state.topicInfo
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
