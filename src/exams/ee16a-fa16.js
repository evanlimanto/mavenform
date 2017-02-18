import React, { Component } from 'react';
import { FreeFormQuestion } from '../components/question';
import { lmatrix, lx } from '../utils';

const fa16q3a =
`
<h3>3. True/False (6 points, 1 point for each question)</h3>

Answer each of the following questions by circling True or False. No work is necessary for credit on this
part.<br/>

(a) <b>(True) (False)</b> The pivot columns of matrix \\(A\\) forms a basis for the column space of \\(A\\).<br/>
`;

const fa16q3b =
`
(b) <b>(True) (False)</b> Let \\(A\\) be a \\(2 × 2\\) matrix, where \\(A^2\\) = 0. Then \\(A\\) is the zero matrix.<br/>
`;

const fa16q3c =
`
(c) <b>(True) (False)</b> Let \\(A\\), \\(B\\), \\(C\\) be some arbitrary matrices. Then, \\((AB)C\\) = \\(A(BC)\\).<br/>
`;

const fa16q3d =
`
(d) <b>(True) (False)</b> An \\(M × N\\) matrix has at most \\(N\\) pivots.<br/>
`;

const fa16q3e =
`
(e) <b>(True) (False)</b> \\(AB\\) = \\(BA\\) where \\(A\\) and \\(B\\) are \\(N × N\\) matrices.<br/>
`;

const fa16q3f =
`
(f) <b>(True) (False)</b> Applying any pair of \\(2 × 2\\) rotation matrices to an input vector is a commutative operation.<br/>
`;

const fa16q4a =
`
<h3>4. Proof (7 points)</h3>

(a) Prove that if \\(A\\vec{x}\\) = 0 for some nonzero \\(\\vec{x}\\), then the columns of A are linearly dependent. <br/>
`;

const fa16q4b =
`
(b) Prove that if \\(A^2\\) = 0 where \\(A\\) is an arbitrary square matrix, then the columns of \\(A\\) are linearly dependent.
`;

const fa16q5 =
`
<h3>5. Inverse of a Matrix (5 points)</h3>
Find the inverse of \\(A\\), if it exists. If not, explain why.

\\(A\\) =

\\(\\left[
\\begin{array}{ c c c }
5 & 4 & 2 \\\\
1 & 2 & 1 \\\\
9 & 6 & 3 \\\\
\\end{array}\\right]\\)
`;

const fa16q6a =
`
<h3>6. Directional Shovels (10 points)</h3>

Kody and Nara were found exceptional at taking measurements to ﬁgure out light intensities, and they were both granted admission to a graduate school. Unfortunately, they both supported their new school’s football team while they were playing against Berkeley and angry Berkeley fans found them and left them in a room at an unknown location under the ground. As compassionate people, Berkeley fans left some tools in the room that can help them escape.<br/><br/>

(a) Kody found a shovel in the room and ﬁgured that it can operate in the following directions:

\\(
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
\\)

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

const fa16q6b =
`
(b) While Kody was busy planning his escape to Berkeley, Nara found a pick-axe in the room that can operate in the following directions: 

\\(\\{
\\left[
\\begin{array}{ c }
2 \\\\ 2 \\\\ 0 \\\\
\\end{array}\\right]
\\)
,
\\(
\\left[
\\begin{array}{ c }
1 \\\\ -1 \\\\ 2 \\\\
\\end{array}\\right]
\\)
,
\\(
\\left[
\\begin{array}{ c }
3 \\\\ -2 \\\\ 5 \\\\
\\end{array}\\right]
\\}\\)

Nara is convinced that the axe she found is better, but Kody disagrees. Show that Kody’s shovel can reach anywhere that Nara’s pick-axe can.
`;

const imgfa16q7_1 = require("../img/fa16q7-1.png");
const fa16q7a =
`
<h3>7. Graph Majors (30 points)</h3>

We’d like to understand how engineering undergrads change their majors. For simplicity, there are three majors we’ll look at: EECS, CS, and MechE. Let’s assume that students can only be studying one major at a time, and must be studying one of these three majors. Let’s also assume that once a week, students can choose to switch to another major, or stick with what they’re studying. So, a discrete time step represents one week.<br/>

<img src="${imgfa16q7_1}" className="problem-image" />

At the start of week n, the number of EECS, CS, MechE students are \\(x_e[n]\\), \\(x_c[n]\\), and \\(x_m[n]\\), respectively.<br/>
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

(a) Write the transition matrix, A, such that \\(\\vec{x}[n + 1]\\) = \\(A\\vec{x}[n]\\).
`;

const fa16q7b =
`
<img src="${imgfa16q7_1}" className="problem-image" />

(b) Assume that from one week to the next, no students drop out or are enrolled to the system – in other
words, the total number of students is conserved. Write a system of four linear equations that relate \\(k_1\\), \\(k_2\\), \\(k_3\\), \\(k_4\\).<br/>
<i>Hint: you should use \\(x_e[n]\\), \\(x_c[n]\\), \\(x_m[n]\\), \\(x_e[n + 1]\\), \\(x_c[n + 1]\\), \\(x_m[n + 1]\\) in your answer.
`;

const fa16q7c =
`
<img src="${imgfa16q7_1}" className="problem-image" />

(c) Let \\(\\vec{x}[10]\\) = \\(\\left[\\begin{array}{c}100\\\\200\\\\200\\\\\\end{array}\\right]\\) and \\(\\vec{x}[11]\\) = \\(\\left[\\begin{array}{c}150\\\\100\\\\250\\\\\\end{array}\\right]\\). Rewrite your four linear equations from part (b) in the form \\(T\\vec{k}\\) = \\(\\vec{b}\\), where \\(\\vec{k}\\) is the vector defined above and \\(\\vec{b}\\) is a vector of constants. Do not solve for \\(\\vec{k}\\).
`;

const fa16q7d =
`
(d) Now let us redeﬁne our graph transition matrix \\(A\\) such that<br/>
\\(A\\) = ${lmatrix([[0.6, 0.4, 0.2], [0.3, 0.2, 0.3], [0.1, 0.4, 0.5]])}.

Given \\(\\vec{x}[923]\\), is it possible to find \\(\\vec{x}[2]\\)? Give a mathematical justiﬁcation and a brief explanation of how. Do not make any assumptions derived from previous parts of this problem.
`;

const fa16q7e =
`
(e) Let us redeﬁne \\(A\\) as \\(A\\) =

${lmatrix([[0.2, 0.1, 0.3], [0.4, 0.7, 0.1], [0.4, 0.2, 0.6]])}.

Is \\(\\vec{x}[5]\\) = \\(\\left[\\begin{array}{c}120\\\\120\\\\260\\\\\\end{array}\\right]\\) a valid state for this system? Explain. Assume the states begin with some \\(\\vec{x}[0]\\), where \\(\\vec{x}[0]\\) is not the zero vector \\(\\vec{0}\\). Do not make any assumptions
derived from previous parts of the problem.
`;

const imgfa16q8_1 = require('../img/fa16q8-1.png');
const fa16q8a =
`
<h3>8. Transformation Basketball (15 points)</h3>

Kevin Bancroft just joined the Column Space Warriors. In order to better learn how to cooperate with the team before the season starts, he and his teammates are practicing some basketball drills.

(a) Kevin Bancroft and Draymond Blue-Gold are running a drill where they each have to run from a
starting coordinate to an end coordinate. Kevin starts at point \\(ks\\) = ${lmatrix([[3, 7]], true)} and wants to go to point \\(k_e\\) = ${lmatrix([[-4, 10]], true)}. Draymond starts at point \\(d_s\\) = ${lmatrix([[-6, 1]], true)} and wants to go to point \\(d_e\\) = ${lmatrix([[-7, -5]], true)}.

<img src="${imgfa16q8_1}" className="problem-image" />

Each player must apply the same matrix transformation A on his starting point to reach reach his end point, such that ${lx('Ak_s')} = ${lx('k_e')} and ${lx('Ad_s')} = ${lx('d_e')}. Derive the transformation matrix ${lx('A')}, if possible. We also know that the transformation matrix ${lx('A')} is of the form ${lx('A')} = ${lmatrix([[1, 'a'], ['b', 1]])}, where ${lx('a')}, ${lx('b')} are real numbers.
`;


const fa16q8b =
`
(b) Steph Current noticed Kevin and Draymond running this drill, and decided to join them. For their next move, they will be using transformation matrix<br/>
${lx('B')} = ${lmatrix([[2, 2], [-2, 2]])}.<br/><br/>
Describe what transformation matrix ${lx('B')} performs to an input position in terms of rotations, scaling, and reﬂections.
`;

const imgfa16q8_2 = require('../img/fa16q8-2.png');
const fa16q8c =
`
(c) After a couple of drills, Kevin Bancroft came up with a new idea – he decided to race his teammates across the court to see who is faster. Kevin starts at point ${lx('k_s')} = ${lmatrix([[-2, 1]], true)} and ends at ${lx('k_e')} = ${lmatrix([[3, 2]], true)}. Steph starts at ${lx('s_s')} = ${lmatrix([[0, 0]], true)} and ends at ${lx('s_e')} = ${lmatrix([[-6, -3]], true)}. Can this be represented by a transformation matrix? Brieﬂy justify why or why not.

<img src="${imgfa16q8_2}" className="problem-image" />
`;

class EE16AFa16 extends Component {
  render() {
    const examCode = 'ee16a-fa16';
    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2016 | Ayazifar, Stojanovic</h5>
        </div>
        <div className="sidebar">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Section 1</div>
          <div><a className="sidetab">3. True/False</a></div>
          <div><a className="sidetab">4. Proof</a></div>
          <div><a className="sidetab">5. Inverse of a Matrix</a></div>
          <hr className="s1" />
          <div className="sidetitle">Section 2</div>
          <div><a className="sidetab">6. Directional Shovels</a></div>
          <div><a className="sidetab">7. Graph Majors</a></div>
          <div><a className="sidetab">8. Transformation Basketball</a></div>
        </div>
        <div className="content">
          <hr className="s5" />
          <h2>Section 1 (18 points)</h2>
          <hr className="s2" />
          <FreeFormQuestion id={"q3a"} content={fa16q3a} image={['q3-1.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q3b"} content={fa16q3b} image={['q3-2.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q3c"} content={fa16q3c} image={['q3-1.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q3d"} content={fa16q3d} image={['q3-1.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q3e"} content={fa16q3e} image={['q3-2.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q3f"} content={fa16q3f} image={['q3-1.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q4a"} content={fa16q4a} hasResponse={false} image={['q4a.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q4b"} content={fa16q4b} hasResponse={false} image={['q4b.png']} examCode={examCode} />
          <hr className="s5" />
          <FreeFormQuestion id={"q5"} content={fa16q5} hasResponse={false} image={['q5a.png']} examCode={examCode} />
          <hr className="s5" />
          <h2>Section 2 (55 points)</h2>
          <hr className="s2" />
          <FreeFormQuestion id={"q6a"} content={fa16q6a} hasResponse={false} image={['q6a.png']} examCode={examCode} />
          <hr className="s2" />
          <FreeFormQuestion id={"q6b"} content={fa16q6b} hasResponse={false} image={['q6b.png']} examCode={examCode} />
          <hr className="s2" />
          <FreeFormQuestion id={"q7a"} content={fa16q7a} rows={3} cols={3} image={['q7a.png']} examCode={examCode} />
          <hr className="s2" />
          <FreeFormQuestion id={"q7b"} content={fa16q7b} hasResponse={false} image={['q7b.png']} examCode={examCode} />
          <hr className="s2" />
          <FreeFormQuestion id={"q7c"} content={fa16q7c} hasResponse={false} image={['q7c.png']} examCode={examCode} />
          <hr className="s2" />
          <FreeFormQuestion id={"q7d"} content={fa16q7d} hasResponse={false} image={['q7d.png']} examCode={examCode} />
          <hr className="s3" />
          <FreeFormQuestion id={"q7e"} content={fa16q7e} hasResponse={false} image={['q7e.png']} examCode={examCode} />
          <hr className="s3" />
          <FreeFormQuestion id={"q8a"} content={fa16q8a} rows={2} cols={2} image={['q8a.png']} examCode={examCode} />
          <hr className="s3" />
          <FreeFormQuestion id={"q8b"} content={fa16q8b} hasResponse={false} image={['q8b.png']} examCode={examCode} />
          <hr className="s3" />
          <FreeFormQuestion id={"q8c"} content={fa16q8c} hasResponse={false} image={['q8c.png']} examCode={examCode} />
          <hr className="s5" />
        </div>
      </span>
    );
  }
}

export default EE16AFa16;
