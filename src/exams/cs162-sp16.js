import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace } from '../utils';

const _ = require('lodash');

const q1_1 =
`
<hr class="s1" />
<h3>Problem 1: TRUE/FALSE [18 pts]</h3>
<hr class="s1" />
In the following, it is important that you EXPLAIN your answer in TWO SENTENCES OR LESS
(Answers longer than this may not get credit!). Also, answers without an explanation GET NO
CREDIT.
<hr class="s1" />
Problem 1a[2pts]: The kernel on a multiprocessor can use the local disabling of interrupts (within
one CPU) to produce critical sections between the OSs on different CPUs.
`;

const q1_1_soln =
`
<b>False.</b>
<hr class="s1" />
Disabling of interrupts on one CPU does nothing to prevent the execution
of code running on another CPU.
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS162Sp16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs162/mt1-sp16';
    const problemIDs = ['q1'];
    const problemTitles = [
      'Q1. Number Representation',
    ];

    return (
      <span>
        <h1>CS 162</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2016 | Joseph</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <h2>General Information</h2>
            <hr className="s2" />
            <p>This is a closed book exam. You are allowed 1 page of hand-written notes (both sides). You have 3 hours to complete as much of the exam as possible. Make sure to read all of the questions first, as some of the questions are substantially more time consuming.</p>
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS162Sp16;
