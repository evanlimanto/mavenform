import React, { Component } from 'react';
import { map, range } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Line } from 'rc-progress';
import hash from 'string-hash';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';

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
    };
    this.check = this.check.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.reset = this.reset.bind(this);
  }

  check() {
    this.correctAnswer();
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  correctAnswer() {
    this.setState({ answerStatus: "correct", showSolution: true });
  }

  wrongAnswer() {
    this.setState({ answerStatus: "wrong", showSolution: true });
  }

  checkAnswer() {
    const answerValue = this.refs.answer.value;
    return (answerValue === "0");
  }

  reset() {
    console.log("reset");
    this.setState({
      showSolution: false,
      answerStatus: null,
      showContents: false
    }, () => window.setTimeout(() => this.setState({ showContents: true }), 1000));
  }

  componentDidMount() {
    window.renderMJ();
    const self = this;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 13)
        self.state.showSolution ? self.reset() : (self.checkAnswer() ? self.correctAnswer() : self.wrongAnswer());
    }, false);
  }

  render() {
    const solution = this.state.showSolution ? (
      <div className="problem-solution">
        The dot product of two vectors is the sum of the component-wise products of each of their entries.
        In this case, the dot product is $5 \cdot (-2) + 1 \cdot 4 + 2 \cdot 3 = 0$.
      </div>
    ) : null;
    const contents = this.state.showContents ? [(
      <div key={0}>
        What is the dot product of the two vectors {"$\\vec{u} = < 5, 1, 2>$"} and {"$\\vec{v} = < -2, 4, 3>$"}?
        {solution}
        <div className="problem-answer">
          <label className={classnames({ "correct-answer-style": this.state.answerStatus === "correct" })}>Answer</label>
          <input type="text" placeholder="Enter your answer here" className={classnames({ "correct-answer-style": this.state.answerStatus === "correct" })} ref="answer" />
        </div>
      </div>
    )] : [];

    return (
      <div className="background">
        <Navbar />
        <div className="box">
          <div className="problem-content">
            <CSSTransitionGroup
              transitionName="contents"
              transitionEnterTimeout={0}
              transitionLeaveTimeout={0}>
              {contents}
            </CSSTransitionGroup>
          </div>
          <div className={classnames({"box-footer": true, "correct-answer": this.state.answerStatus === "correct"})}>
            {this.state.answerStatus === "correct" ? (<div className="answer-status">Correct!</div>) : null}
            <button className="skip-button" onClick={this.reset}>
              Skip
            </button>
            <button className="check-button" onClick={this.state.showSolution ? this.reset : this.check}>
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
