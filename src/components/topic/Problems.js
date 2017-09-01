import React, { Component } from 'react';
import { keys, map, range } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Line } from 'rc-progress';
import hash from 'string-hash';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';

import { updateTopicInfo } from '../../actions';
import { BASE_URL } from '../../utils';
import Navbar from '../navbar';
import Footer from '../footer';

require('../../css/Math.css');

class ProblemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: false,
      showContents: true,
      answerStatus: null,
      progress: 0,
      progressIndicator: 0,
      correct: 0,
      wrong: 0,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    ProblemsComponent.fetchData(this.props.dispatch, this.props);
  }

  static fetchData(dispatch, props) {
    const { topicCode } = props;
    return fetch(`${BASE_URL}/getTopicInfo/${topicCode}`)
      .then((response) => response.json())
      .then((json) => dispatch(updateTopicInfo(json)))
  }

  componentDidUpdate(prevProps, prevState) {
    window.renderMJ();
  }

  correctAnswer() {
    this.setState({
      answerStatus: "correct",
      showSolution: true,
      correct: this.state.correct + 1,
      progressIndicator: this.state.progressIndicator + 1
    });
  }

  wrongAnswer() {
    this.setState({
      answerStatus: "wrong",
      showSolution: true,
      wrong: this.state.wrong + 1,
      progressIndicator: this.state.progressIndicator + 1
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

  reset() {
    this.setState({
      showSolution: false,
      answerStatus: null,
      showContents: false,
      progress: this.state.progress + 1,
    }, () => window.setTimeout(() => this.setState({ showContents: true }), 300));
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
    if (this.state.progress === keys(this.props.topicInfo.problems).length && !this.state.showSolution) {
      return (
        <div className="background">
          <Navbar />
          <div className="box">
          </div>
          <Footer />
        </div>
      );
    }

    const itemContent = this.props.topicInfo.problems[this.state.progress];
    const contents = this.state.showContents ? [(
      <div key={0}>
        <div dangerouslySetInnerHTML={{ __html: itemContent.problem }}></div>
        <div className="problem-solution" dangerouslySetInnerHTML={{ __html: this.state.showSolution ? itemContent.solution : null }}></div>
        <div className="problem-answer">
          <label className={classnames({
            "correct-answer-style": this.state.answerStatus === "correct",
            "wrong-answer-style": this.state.answerStatus === "wrong",
          })}>Answer</label>
          <input type="text" placeholder="Enter your answer here" className={classnames({
            "correct-answer-style": this.state.answerStatus === "correct",
            "wrong-answer-style": this.state.answerStatus === "wrong",
          })} ref="answer" />
        </div>
      </div>
    )] : [];

    return (
      <div className="background">
        <Navbar />
        <div className="box">
          <Line className="problems-progress" percent={Math.floor(this.state.progressIndicator * 100.0 / keys(this.props.topicInfo.problems).length)} strokeWidth="1" strokeColor="#66BB66" />
          <div className="problem-content">
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
            "wrong-answer": this.state.answerStatus === "wrong"
          })}>
            {this.state.answerStatus === "correct" ? (<div className="answer-status correct-answer-style">Correct!</div>) :
              (this.state.answerStatus === "wrong" ? (<div className="answer-status wrong-answer-style">Read the solution above.</div>) : null)}
            {this.state.answerStatus ? null : (
              <button className="skip-button" onClick={this.reset}>
                Skip
              </button>
            )}
            <button className="check-button" onClick={this.state.showSolution ? this.reset : this.checkAnswer}>
              {this.state.showSolution ? "Next" : "Solve"}
            </button>
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
