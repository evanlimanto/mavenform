import React, { Component } from 'react';
import classnames from 'classnames';
import { Question } from '../components/question';
import { lmatrix, lx } from '../utils';

const fa16q3a =
`
<h3>3. True/False <i>(6 points, 1 point for each question)</i></h3>

Answer each of the following questions by circling True or False. No work is necessary for credit on this part.<br/>
<hr class="s2" />
(a) The pivot columns of matrix \\(A\\) forms a basis for the column space of \\(A\\).<br/>
`;

const fa16q3a_soln =
`
True. (Sorry, there weren't any explanations for any of the True/False questions on the original PDF either; we'll try our best to add some of our own later).
`;

const fa16q3b =
`
(b) Let \\(A\\) be a \\(2 × 2\\) matrix, where \\(A^2\\) = ${lx('0')}. Then \\(A\\) is the zero matrix.<br/>
`;

const fa16q3b_soln =
`
False.
`;

const fa16q3c =
`
(c) Let \\(A\\), \\(B\\), \\(C\\) be some arbitrary matrices. Then, \\((AB)C\\) = \\(A(BC)\\).<br/>
`;

const fa16q3c_soln =
`
True.
`;

const fa16q3d =
`
(d) An \\(M × N\\) matrix has at most \\(N\\) pivots.<br/>
`;

const fa16q3d_soln =
`
True.
`;

const fa16q3e =
`
(e) \\(AB\\) = \\(BA\\) where \\(A\\) and \\(B\\) are \\(N × N\\) matrices.<br/>
`;

const fa16q3e_soln =
`
False.
`;

const fa16q3f =
`
(f) Applying any pair of \\(2 × 2\\) rotation matrices to an input vector is a commutative operation.<br/>
`;

const fa16q3f_soln =
`
True.
`;

const fa16q4a =
`
<h3>4. Proof <i>(7 points)</i></h3>

(a) Prove that if \\(A\\vec{x}\\) = 0 for some nonzero \\(\\vec{x}\\), then the columns of A are linearly dependent. <br/>
`;

const fa16q4a_soln =
`
${lx('A\\vec{x}')} is a linear combination of the columns of A (call these ${lx('\\vec{a}_i')}).
<hr class="s2"/>
Pick the nonzero ${lx('\\vec{x}')} such that ${lx('A\\vec{x}')} = ${lx('0')}, then: ${lx('\\sum_{i}x_i\\vec{a}_i')} = ${lx('0')},
which is proof of the linear dependence of ${lx('\\vec{a}_i')}.
`;

const fa16q4b =
`
(b) Prove that if \\(A^2\\) = 0 where \\(A\\) is an arbitrary square matrix, then the columns of \\(A\\) are linearly dependent.
`;

const fa16q4b_soln =
`
Using the same notation from the previous part, ${lx('A^2')} is ${lx('A')} applied on ${lx('\\vec{a}_i')}.
<hr class="s2"/>
If any ${lx('\\vec{a}_i')} are ${lx('\\vec{0}')}, we know immediately that the columns are linearly dependent.
<hr class="s2"/>
Otherwise, we have that ${lx('A\\vec{a}_i')} = ${lx('0')}, which is proof of linear dependence of the columns from part a.
`;

const fa16q5a =
`
<h3>5. Inverse of a Matrix <i>(5 points)</i></h3>
Find the inverse of \\(A\\), if it exists. If not, explain why.

\\(A\\) =

\\(\\left[
\\begin{array}{ c c c }
5 & 4 & 2 \\\\
1 & 2 & 1 \\\\
9 & 6 & 3 \\\\
\\end{array}\\right]\\)
`;

const fa16q5a_soln =
`
This matrix is <b>singular/noninvertible</b>, and this can be found in a number of ways.
<hr class="s2"/>
One is that the third row is a linear combination of the two other rows - precisely, ${lx('R_3 = 2R_1 − R_2')}. Therefore, by the Invertible Matrix Theorem, this matrix is noninvertible.
<hr class="s2"/>
Alternatively, this could be found by row reducing this matrix alongside an identity matrix, and stopping when the third row is reduced to entirely zeroes. A ${lx('3')} x ${lx('3')} matrix with a row of zeroes is at most of rank ${lx('2')}, and thus not invertible.
`;

const fa16q6a =
`
<h3>6. Directional Shovels <i>(10 points)</i></h3>

Kody and Nara were found exceptional at taking measurements to ﬁgure out light intensities, and they were both granted admission to a graduate school. Unfortunately, they both supported their new school’s football team while they were playing against Berkeley and angry Berkeley fans found them and left them in a room at an unknown location under the ground. As compassionate people, Berkeley fans left some tools in the room that can help them escape.

<hr class="s2"/>

(a) Kody found a shovel in the room and ﬁgured that it can operate in the following directions:

$$
\\{

\\left[
\\begin{array}{ c }
1 \\\\ 0 \\\\ 1 \\\\
\\end{array}\\right]
,
\\left[
\\begin{array}{ c }
0 \\\\ 1 \\\\ -1 \\\\
\\end{array}\\right]

\\}
$$

Is it possible for them to escape to Berkeley by digging in the given directions to a point which is located at 

\\(
\\left[
\\begin{array}{ c }
3 \\\\ -2 \\\\ 5 \\\\
\\end{array}\\right]
\\)
given that they are at point
\\(
\\left[
\\begin{array}{ c }
0 \\\\ 0 \\\\ 0 \\\\
\\end{array}\\right]
\\)

? If so, ﬁnd the scalars that multiply the vectors such that they reach Berkeley.
`;

const fa16q6a_soln =
`
(3, -2). 3 ${lmatrix([[1], [0], [1]])} - 2 ${lmatrix([[0], [1], [-1]])} = ${lmatrix([[3], [-2], [5]])}
`;

const fa16q6b =
`
(b) While Kody was busy planning his escape to Berkeley, Nara found a pick-axe in the room that can operate in the following directions: 

$$\\{
\\left[
\\begin{array}{ c }
2 \\\\ 2 \\\\ 0 \\\\
\\end{array}\\right]

,

\\left[
\\begin{array}{ c }
1 \\\\ -1 \\\\ 2 \\\\
\\end{array}\\right]

,

\\left[
\\begin{array}{ c }
3 \\\\ -2 \\\\ 5 \\\\
\\end{array}\\right]
\\}$$

Nara is convinced that the axe she found is better, but Kody disagrees. Show that Kody’s shovel can reach anywhere that Nara’s pick-axe can.
`;

const fa16q6b_soln =
`
Put these 3 vectors as row vectors in a matrix and row reduce.
<hr class="s2"/>
Notice that it reduces to
${lmatrix([[1, 0, 1], [0, 1, -1], [0, 0, 0]])}.
<hr class="s2"/>
Similar to the proof in the last question of discussion 3A. This shows that row spaces are equivalent.
<hr class="s2"/>
Another solution is show that all of Nara’s directions can be reached by Kody’s vectors. It is easy enough to find the correct linear combinations by inspection: (2, 2), (1, −1), (3, −2)
`;

const imgfa16q7_1 = require("../img/fa16q7-1.png");
const fa16q7a =
`
<h3>7. Graph Majors <i>(30 points)</i></h3>

We’d like to understand how engineering undergrads change their majors. For simplicity, there are three majors we’ll look at: EECS, CS, and MechE. Let’s assume that students can only be studying one major at a time, and must be studying one of these three majors. Let’s also assume that once a week, students can choose to switch to another major, or stick with what they’re studying. So, a discrete time step represents one week.

<hr class="s1"/>

<img src="${imgfa16q7_1}" className="problem-image" />

<hr class="s1"/>

At the start of week n, the number of EECS, CS, MechE students are \\(x_e[n]\\), \\(x_c[n]\\), and \\(x_m[n]\\), respectively.

<hr class="s1"/>

Let \\(\\vec{x}[n]\\) =
\\(
\\left[
\\begin{array}{ c }
x_e[n] \\\\ x_c[n] \\\\ x_m[n] \\\\
\\end{array}\\right]
\\).
Also let \\(\\vec{k}\\) =
\\(
\\left[
\\begin{array}{ c }
k_1 \\\\ k_2 \\\\ k_3 \\\\ k_4 \\\\\
\\end{array}\\right]
\\).

<hr class="s3"/>

(a) Write the transition matrix, A, such that \\(\\vec{x}[n + 1]\\) = \\(A\\vec{x}[n]\\).
`;

const fa16q7a_soln =
`
${lx('A')} = ${lmatrix([[0.5, 0.3, 0.2], ['k_1', 0.4, 'k_2'], ['k_3', 0.3, 'k_4']])}
`;

const fa16q7b =
`
<img src="${imgfa16q7_1}" className="problem-image" />
<hr class="s3"/>
(b) Assume that from one week to the next, no students drop out or are enrolled to the system – in other
words, the total number of students is conserved. Write a system of four linear equations that relate \\(k_1\\), \\(k_2\\), \\(k_3\\), \\(k_4\\).
<hr class="s2"/>
<i>Hint: you should use \\(x_e[n]\\), \\(x_c[n]\\), \\(x_m[n]\\), \\(x_e[n + 1]\\), \\(x_c[n + 1]\\), \\(x_m[n + 1]\\) in your answer.
`;

const fa16q7b_soln =
`
By ${lx('\\vec{x}[n + 1]')} = ${lx('A\\vec{x}[n]')}, we derive the equations:

<hr class="s2"/>

${lx('k_1x_e[n] + 0.4x_c[n] + k_2x_m[n] = x_c[n + 1]')}<hr class="s1"/>
${lx('k_3x_3[n] + 0.3x_c[n] + k_4x_m[n] = x_m[n + 1]')}<hr class="s2"/>

By conservation of students, we derive the equations:

<hr class="s2"/>

0.5 + ${lx('k_1')} + ${lx('k_3')} = 1<hr class="s1"/>
0.2 + ${lx('k_2')} + ${lx('k_4')} = 1
`;

const fa16q7c =
`
<img src="${imgfa16q7_1}" className="problem-image" />

<hr class="s1"/>

(c) Let \\(\\vec{x}[10]\\) = \\(\\left[\\begin{array}{c}100\\\\200\\\\200\\\\\\end{array}\\right]\\) and \\(\\vec{x}[11]\\) = \\(\\left[\\begin{array}{c}150\\\\100\\\\250\\\\\\end{array}\\right]\\). Rewrite your four linear equations from part (b) in the form \\(T\\vec{k}\\) = \\(\\vec{b}\\), where \\(\\vec{k}\\) is the vector defined above and \\(\\vec{b}\\) is a vector of constants. Do not solve for \\(\\vec{k}\\).
`;

const fa16q7c_soln =
`
Plugging in numerical values to the above solution:

<hr class="s2"/>

100${lx('k_1')} + (0.4)(200) + 200${lx('k_2')} = 100<hr class="s1"/>
100${lx('k_3')} + (0.3)(200) + 200${lx('k_4')} = 250<hr class="s1"/>
0.5 + ${lx('k_1')} + ${lx('k_3')} = 1<hr class="s1"/>
0.2 + ${lx('k_2')} + ${lx('k_4')} = 1<hr class="s2"/>

In the form ${lx('T\\vec{k}')} = ${lx('\\vec{b}')}, we have:

<hr class="s2"/>

${lmatrix([[100, 200, 0, 0], [0, 0, 100, 200], [1, 0, 1, 0], [0, 1, 0, 1]])}
${lmatrix([['k_1'], ['k_2'], ['k_3'], ['k_4']])} =
${lmatrix([[20], [190], [0.5], [0.8]])}
`;

const fa16q7d =
`
(d) Now let us redeﬁne our graph transition matrix \\(A\\) such that:
<hr class="s2"/>
\\(A\\) = ${lmatrix([[0.6, 0.4, 0.2], [0.3, 0.2, 0.3], [0.1, 0.4, 0.5]])}
<hr class="s2"/>
Given \\(\\vec{x}[923]\\), is it possible to find \\(\\vec{x}[2]\\)? Give a mathematical justiﬁcation and a brief explanation of how. Do not make any assumptions derived from previous parts of this problem.
`;

const fa16q7d_soln =
`
Yes, because given those values for ${lx('A')}, ${lx('A')} is invertible.
<hr class="s2"/>
This can be shown by row reducing to see that there is a pivot in every row and column of ${lx('A')}:
<hr class="s1"/>
Multiplying each row of ${lx('A')} by ten gives:
<hr class="s1"/>
${lmatrix([[6, 4, 2], [3, 2, 3], [1, 4, 5]], false, false)}
<hr class="s1"/>
Swapping ${lx('R_1')} and ${lx('R_3')} gives:
<hr class="s1"/>
${lmatrix([[1, 4, 5], [6, 4, 2], [3, 2, 3]], false, false)}
<hr class="s1"/>
${lx('R_2')} - ${lx('2 * R_3')} gives:
<hr class="s1"/>
${lmatrix([[1, 4, 5], [0, 0, -4], [3, 2, 3]], false, false)}
<hr class="s1"/>
${lx('R_3')} - ${lx('3 * R_1')} gives:
<hr class="s1"/>
${lmatrix([[1, 4, 5], [0, 0, -4], [0, -10, -12]], false, false)}
<hr class="s2"/>
From here, we see there is a nonzero pivot in every row and column in ${lx('A')}.
Another way to show that ${lx('A')} is invertible would be to calculate ${lx('A^{−1}')}. This can be done by row reducing ${lx('A|I')} (this calculation is more involved). 
<hr class="s2"/>
${lx('A^{−1}')} is found to be:

${lx('A^{-1}')} = ${lmatrix([[0.5, 3, '-2\\frac{1}{3}'], [3, -7, 3], [-2.5, 5, '0\\frac{2}{3}']])}
<hr class="s2"/>
This means you can back infer based on the equation ${lx('A^{-1}\\vec{x}[n + 1]')} = ${lx('\\vec{x}[n]')}.
`;

const fa16q7e =
`
(e) Let us redeﬁne \\(A\\) as \\(A\\) =

${lmatrix([[0.2, 0.1, 0.3], [0.4, 0.7, 0.1], [0.4, 0.2, 0.6]])}.
<hr class="s2"/>
Is \\(\\vec{x}[5]\\) = \\(\\left[\\begin{array}{c}120\\\\120\\\\260\\\\\\end{array}\\right]\\) a valid state for this system?
<hr class="s2"/>
Explain. Assume the states begin with some \\(\\vec{x}[0]\\), where \\(\\vec{x}[0]\\) is not the zero vector \\(\\vec{0}\\). Do not make any assumptions
derived from previous parts of the problem.
`;

const fa16q7e_soln =
`
No, because the third row is two times the first row of ${lx('A')}. Thus, at any state that is not the initial state, ${lx('2∗x_e[t]')} = ${lx('x_m[t]')} must be true by the state transitions. The given ${lx('\\vec{x}[5]')} violates this.
`;

const imgfa16q8_1 = require('../img/fa16q8-1.png');
const fa16q8a =
`
<h3>8. Transformation Basketball <i>(15 points)</i></h3>

Kevin Bancroft just joined the Column Space Warriors. In order to better learn how to cooperate with the team before the season starts, he and his teammates are practicing some basketball drills.

<hr class="s3"/>

(a) Kevin Bancroft and Draymond Blue-Gold are running a drill where they each have to run from a
starting coordinate to an end coordinate. Kevin starts at point \\(ks\\) = ${lmatrix([[3, 7]], true)} and wants to go to point \\(k_e\\) = ${lmatrix([[-4, 10]], true)}. Draymond starts at point \\(d_s\\) = ${lmatrix([[-6, 1]], true)} and wants to go to point \\(d_e\\) = ${lmatrix([[-7, -5]], true)}.
<hr class="s1"/>
<img src="${imgfa16q8_1}" className="problem-image" />
<hr class="s1"/>
Each player must apply the same matrix transformation A on his starting point to reach reach his end point, such that ${lx('Ak_s')} = ${lx('k_e')} and ${lx('Ad_s')} = ${lx('d_e')}. Derive the transformation matrix ${lx('A')}, if possible. We also know that the transformation matrix ${lx('A')} is of the form ${lx('A')} = ${lmatrix([[1, 'a'], ['b', 1]])}, where ${lx('a')}, ${lx('b')} are real numbers.
`;

const fa16q8a_soln =
`
${lmatrix([[1, 'a'], ['b', 1]])}${lmatrix([['x'], ['y']])} = ${lmatrix([['x_1'], ['y_1']])}
<hr class="s2"/>
So we can plug in our known values and solve the system.
<hr class="s2"/>
${lx('3 + 7a = k_ex = -4 \\implies a = -1')}<hr class="s1"/>
${lx('3b + 7 = k_ey = 10 \\implies b = 1')}<hr class="s1"/>
${lx('T')} = ${lmatrix([[1, -1], [1, 1]])}
`;

const fa16q8b =
`
(b) Steph Current noticed Kevin and Draymond running this drill, and decided to join them. For their next move, they will be using transformation matrix:
<hr class="s2"/>
${lx('B')} = ${lmatrix([[2, 2], [-2, 2]])}
<hr class="s2"/>
Describe what transformation matrix ${lx('B')} performs to an input position in terms of rotations, scaling, and reﬂections.
`;

const fa16q8b_soln =
`
After applying the matrix to some sample coordinates such as the standard basis vectors, we can see that the matrix rotates by ${lx('45^{\\circ}')} and scales by ${lx('2\\sqrt{2}')}.
`;

const imgfa16q8_2 = require('../img/fa16q8-2.png');
const fa16q8c =
`
(c) After a couple of drills, Kevin Bancroft came up with a new idea – he decided to race his teammates across the court to see who is faster. Kevin starts at point ${lx('k_s')} = ${lmatrix([[-2, 1]], true)} and ends at ${lx('k_e')} = ${lmatrix([[3, 2]], true)}. Steph starts at ${lx('s_s')} = ${lmatrix([[0, 0]], true)} and ends at ${lx('s_e')} = ${lmatrix([[-6, -3]], true)}. Can this be represented by a transformation matrix? Brieﬂy justify why or why not.
  <hr class="s1"/>
  <img src="${imgfa16q8_2}" className="problem-image" />
`;

const fa16q8c_soln =
`
It cannot because in the case of Steph ${lmatrix([[0, 0]])} goes to a nonzero vector. This transformation cannot be a linear transformation, so there is no matrix representation.
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;
var Sticky = require('react-stickynode');

class EE16AFa16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'ee16a-fa16';

    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2016 | Ayazifar, Stojanovic</h5>
        </div>
        <Sticky className="sidebar screen">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Section 1</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q3" spy={true} isDynamic={true} smooth={true} duration={500} onSetInactive={this.removeActiveClass}>
              3. True/False
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" spy={true} isDynamic={true} smooth={true} duration={500}>
              4. Proof
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" spy={true} isDynamic={true} smooth={true} duration={500}>
              5. Inverse of a Matrix
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Section 2</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" spy={true} isDynamic={true} smooth={true} duration={500}>
              6. Directional Shovels
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" spy={true} isDynamic={true} smooth={true} duration={500}>
              7. Graph Majors
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" spy={true} isDynamic={true} smooth={true} duration={500}>
              8. Transformation Basketball
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-fa16.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-fa16-sol.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </Sticky>
        <div className="sidebar mobile">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Section 1</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q3" isDynamic={true} smooth={true} duration={500}>
              3. True/False
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" isDynamic={true} smooth={true} duration={500}>
              4. Proof
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" isDynamic={true} smooth={true} duration={500}>
              5. Inverse of a Matrix
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Section 2</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" isDynamic={true} smooth={true} duration={500}>
              6. Directional Shovels
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" isDynamic={true} smooth={true} duration={500}>
              7. Graph Majors
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" isDynamic={true} smooth={true} duration={500}>
              8. Transformation Basketball
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-fa16.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-fa16-sol.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <Element name="q3" className="first-q">
            <hr className="s5" />
            <h2>Section 1 <i>(18 points)</i></h2>
            <hr className="s3" />
            <Question id={"q3a"} content={fa16q3a} examCode={examCode} solution={fa16q3a_soln} />
            <hr className="s5" />
            <Question id={"q3b"} content={fa16q3b} examCode={examCode} solution={fa16q3b_soln} />
            <hr className="s5" />
            <Question id={"q3c"} content={fa16q3c} examCode={examCode} solution={fa16q3c_soln} />
            <hr className="s5" />
            <Question id={"q3d"} content={fa16q3d} examCode={examCode} solution={fa16q3d_soln} />
            <hr className="s5" />
            <Question id={"q3e"} content={fa16q3e} examCode={examCode} solution={fa16q3e_soln} />
            <hr className="s5" />
            <Question id={"q3f"} content={fa16q3f} examCode={examCode} solution={fa16q3f_soln} />
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4a"} content={fa16q4a} hasResponse={false} examCode={examCode} solution={fa16q4a_soln} />
            <hr className="s5" />
            <Question id={"q4b"} content={fa16q4b} hasResponse={false} examCode={examCode} solution={fa16q4b_soln} />
          </Element>
          <Element name="q5">
            <hr className="s5" />
            <Question id={"q5a"} content={fa16q5a} hasResponse={false} examCode={examCode} solution={fa16q5a_soln} />
          </Element>
          <Element name="q6">
            <hr className="s5" />
            <h2>Section 2 <i>(55 points)</i></h2>
            <hr className="s3" />
            <Question id={"q6a"} content={fa16q6a} hasResponse={false} examCode={examCode} solution={fa16q6a_soln} />
            <hr className="s5" />
            <Question id={"q6b"} content={fa16q6b} hasResponse={false} examCode={examCode} solution={fa16q6b_soln} />
          </Element>
          <Element name="q7">
            <hr className="s5" />
            <Question id={"q7a"} content={fa16q7a} rows={3} cols={3} examCode={examCode} solution={fa16q7a_soln} />
            <hr className="s5" />
            <Question id={"q7b"} content={fa16q7b} hasResponse={false} examCode={examCode} solution={fa16q7b_soln} />
            <hr className="s5" />
            <Question id={"q7c"} content={fa16q7c} hasResponse={false} examCode={examCode} solution={fa16q7c_soln} />
            <hr className="s5" />
            <Question id={"q7d"} content={fa16q7d} hasResponse={false} examCode={examCode} solution={fa16q7d_soln} />
            <hr className="s5" />
            <Question id={"q7e"} content={fa16q7e} hasResponse={false} examCode={examCode} solution={fa16q7e_soln} />
          </Element>
          <Element name="q8">
            <hr className="s5" />
            <Question id={"q8a"} content={fa16q8a} rows={2} cols={2} examCode={examCode} solution={fa16q8a_soln} />
            <hr className="s5" />
            <Question id={"q8b"} content={fa16q8b} hasResponse={false} examCode={examCode} solution={fa16q8b_soln} />
            <hr className="s5" />
            <Question id={"q8c"} content={fa16q8c} hasResponse={false} examCode={examCode} solution={fa16q8c_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default EE16AFa16;
