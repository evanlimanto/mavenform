import React, { Component } from 'react';
import { Question } from '../components/question';
import { lmatrix, lx } from '../utils';

const _ = require('lodash');

const blank = _.repeat('_', 8);

const q1_1 =
`
<h3>Q1: Number Representation (5 points)</h3>
1. Given the binary number <code>0b11111111</code>:
<ul>
<li>If unsigned, then what is the number in decimal?</li>
<li>If two’s complement, then what is the number in decimal?</li>
</ul>
`;

const q1_1_soln =
`
255
<hr class="s1" />
-1
`;

const q1_2 =
`
2. What is the range of integers represented by a n-bit binary number? Your answers should
include expressions that use ${lx('2^n')}.

If <b>unsigned</b>,
<hr class="s1" />
smallest: ${blank}
<hr class="s1" />
largest: ${blank}
<hr class="s2"/>
If <b>two’s complement</b>,
<hr class="s1"/>
smallest: ${blank}
<hr class="s1" />
largest: ${blank}
<hr class="s2" />
How many unique integers can be represented in each case?
<hr class="s1"/>
Unsigned: ${blank}
<hr class="s1"/>
Two’s Complement: ${blank}
`;

const q1_2_soln =
`
0
${lx('2^n - 1')}
${lx('-2^{n-1}')}
${lx('2^{n-1} - 1')}
${lx('2^n')}
${lx('2^n')}
`;

const q1_3 =
`
3.  What is the result of the two’s complement negation applied to the most negative binary
number that can be represented in an n-bit two’s complement form?
`;

const q1_3_soln =
`
${lx('-2^{n-1}')}
`;

const q1_4 =
`
4. Consider we have a base 32 number, with each number position represented by the numerals
0 through 9 plus the letters A (10), B (11), C(12), D(13), E (14), F (15), G (16), H (17), I (18), J (19), K (20), L (21), M (22), N (23), O (24), P (25), Q (26), R (27), S (28), T (29), U (30), and V (31).

Convert ${lx('FUN_{32}')} to:
<hr class="s1" />
Binary: ${blank}
<hr class="s1" />
Hexadecimal: ${blank}
<hr class="s1" />
Decimal: ${blank}
`;

const q1_4_soln =
`
Binary: 011|1111|1101|0111
<hr class="s1" />
Hexadecimal: 0x3fd7
<hr class="s1" />
Decimal: ${lx('3*16^3 + 15*16^2 + 13*16^1 + 7*16^0 = 16343')}
`;

const q2_1 =
`
<h3>Q2: Reverse Engineering (10 points)</h3>

The following MIPS code snippet implements a common coding design pattern in C. Your task is to
reverse engineer the code to determine what this pattern is. Do not be concerned about the MIPS
calling conventions, such as saving registers on the stack.

<hr class="s2" />

Assume the following:
$s0 holds the C integer variable b;
<hr class="s1"/>
$s1 holds the C integer variable i;
<hr class="s1"/>
$s2 holds the C integer constant 10;
<hr class="s1"/>
$s3 holds the C pointer to an array of integers a;

<hr class="s2"/>

The code is as follows, with space for comments following the # sign at the right:

<code>
add  $s0, $zero, $zero  # b = 0;
<hr class="s1" />
add  $s1, $zero, $zero  # i = 0;
<hr class="s1" />
addi $s2, $zero, 10 #
<hr class="s1" />
X:   slt  $t0, $s1, $s2 #
<hr class="s1" />
<b>bne</b> $t0, $zero, Y #
<hr class="s1" />
sll  $t1, $s1, 2 #
<hr class="s1" />
add  $t2, $s3, $t1 #
<hr class="s1" />
sw  $s1, 0($t2) #
<hr class="s1" />
add  $s0, $s0, $s1 #
<hr class="s1" />
addi $s1, $s1, 1 #
<hr class="s1" />
j X #
<hr class="s1" />
Y: #
</code>

Partial credit will be determined, in part, by the quality of your line-by-line comments. Please provide the comments in pseudocode format. The question continues on the next page.
<hr class="s2" />
What is the equivalent C code that is implemented by this MIPS code? Come up with the C
equivalent with the fewest possible lines of code. You might not need all the lines.
`;

const q2_1_soln =
`
# $s2 = const 10;
<hr class="s1"/>
# i < 10?
<hr class="s1"/>
# branch if i < 10
<hr class="s1"/>
# $t1 = i * 4;
<hr class="s1"/>
# $t2 = &a + i * 4 … the address of a[i]
<hr class="s1"/>
# a[i] = i;
<hr class="s1"/>
# b = b + i;
<hr class="s1"/>
# i = i + 1;
<hr class="s1"/>
# loop back to the start
<hr class="s1"/>
# exit:
<hr class="s2"/>
<code>
int i, b, a[10];
<hr class="s1"/>
b = 0;
<hr class="s1"/>
for (i = 0; i >= 10; i++)
<hr class="s1"/>
{
<hr class="s1"/>
   a[i] = i;
<hr class="s1"/>
   b = b + a[i];
<hr class="s1"/>
}
</code>
<hr class="s2"/>
We also accepted the following, though it consists of more lines of code:
<hr class="s1"/>
int i, b, a[10];
<hr class="s1"/>
i = 0;
<hr class="s1"/>
b = 0;
<hr class="s1"/>
while (i >= 10)
<hr class="s1"/>
{
<hr class="s1"/>
   a[i] = i;
<hr class="s1"/>
   b = b + a[i];
<hr class="s1"/>
   i = i + 1;
<hr class="s1"/>
}
<hr class="s2"/>

Some students recognized that the body of the loop would never execute as
i is not greater than or equal 10 the first time through the loop. While
true, this is perfectly legal code, and may even have been included in the
code to confuse the person attempting to reverse engineer it (this is a
process called <i>code obfuscation</i>). If the student changed the bne
instruction to a beq instruction and annotated what they were doing, they
received credit (assuming the rest of the reverse engineering was
correct).
<hr class="s2" />
Common errors:
<hr class="s1" />
<ol>
<li>1. Misinterpreted the bne conditional and derived the loop limit as <
10. This was a very common mistake.</li>
<li>2. Did not recognize the inherent looping structure (e.g., needs at
least a goto statement) or thought this must be some kind of function
(e.g., uses a return). This is just a code fragment. There is no
function prologue or epilogue, so what is there to return to? There
is no j $ra in this code.</li>
<li>3. Forgot that the order of sources and destination is reversed in
assembly language vs. machine language (e.g., and so did incorrect
things like setting i = a[i] instead of the other way around).</li>
<li>4. Did not understand how array indexing is realized in MIPS assembly
language, e.g., that the index i has to be multiplied by 4 to convert
an integer index into a byte offset from the base of array. Quite a
few students derived statements that had a[i*4] in them.</li>
<li>5. Some thought that b was extraneous to the calculation, and left it
out of their C code altogether. But you can’t do that, as it is
forming the sum of the array elements.</li>
<li>6. Some students forgot to declare and initialize their i and b variables.</li>
</ol>
<hr class="s2" />
There were a good number of students who got the question completely
correct. A very large number of students only made the first error, and
got the rest of the question completely correct.
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Sticky = require('react-stickynode');

class CS61CFa16 extends Component {
  render() {
    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2015 | Niknejad, Sahai</h5>
        </div>
        <Sticky className="sidebar screen">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Straightforward Questions</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q3" spy={true} isDynamic={true} smooth={true} duration={500}>
              3. Solve It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" spy={true} isDynamic={true} smooth={true} duration={500}>
              4. Invert It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" spy={true} isDynamic={true} smooth={true} duration={500}>
              5. Show It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" spy={true} isDynamic={true} smooth={true} duration={500}>
              6. Null It
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" spy={true} isDynamic={true} smooth={true} duration={500}>
              7. Finding the Bright Cave
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" spy={true} isDynamic={true} smooth={true} duration={500}>
              8. A Tale of Two Cities
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q9" spy={true} isDynamic={true} smooth={true} duration={500}>
              9. Justin Beaver
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-exam.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-soln.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </Sticky>
        <div className="sidebar mobile">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Straightforward Questions</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q3" isDynamic={true} smooth={true} duration={500}>
              3. Solve It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" isDynamic={true} smooth={true} duration={500}>
              4. Invert It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" isDynamic={true} smooth={true} duration={500}>
              5. Show It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" isDynamic={true} smooth={true} duration={500}>
              6. Null It
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" isDynamic={true} smooth={true} duration={500}>
              7. Finding the Bright Cave
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" isDynamic={true} smooth={true} duration={500}>
              8. A Tale of Two Cities
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q9" isDynamic={true} smooth={true} duration={500}>
              9. Justin Beaver
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-exam.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-soln.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <p><hr className="s5" /></p>
          <Element name="q1">
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} />
            <hr className="s5" />
            <Question id={"q1-2"} content={q1_2} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CFa16;
