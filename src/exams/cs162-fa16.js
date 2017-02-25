import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace } from '../utils';

const _ = require('lodash');

const q1_1 =
`
<hr class="s1" />
<h3>Q1: Number Representation (5 points)</h3>
1. Given the binary number <code>0b11111111</code>:
<hr class="s1" />
<ul>
<li>If unsigned, then what is the number in decimal?</li>
<li>If two’s complement, then what is the number in decimal?</li>
</ul>
`;

const q1_1_soln =
`
If unsigned, it is 255.
<hr class="s1" />
If two’s complement, it is -1.
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS162Fa16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs162/mt1-fa16';
    const problemIDs = ['q1'];
    const problemTitles = [
      'Q1. Number Representation',
    ];

    return (
      <span>
        <h1>CS 162</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2016 | Joseph</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS162Fa16;
