import React, { Component } from 'react';
import { Question } from '../components/question';
import { lmatrix, lx } from '../utils';

const sp16q3 =
`
<h3>3. Mechanical Johann</h3>
Invert the following matrix:

${lmatrix([[1, 2, 6], [0, 1, 4], [2, 4, 10]])}
`;

const sp16q3_soln =
`
We can ﬁnd the inverse by row reducing the augmented system (process omitted for brevity): <br/><br/>

${lmatrix([[1, 2, 6, '\\vdots', 1, 0, 0], [0, 1, 4, '\\vdots', 0, 1, 0], [2, 4, 10, '\\vdots', 0, 0, 1]], false, false)}
<br/>

Thus the inverse is given by:<br/>
${lmatrix([[3, -2, -1], [-4, 1, 2], [1, 0, '-1/2']], false, false)}<br/>

We can check our answer by calculating:<br/><br/>
${lx('\\left[ \\begin{array}{c c c} 1 & 2 & 6 \\\\ 0 & 1 & 4 \\\\ 2 & 4 & 10 \\\\ \\end{array} \\right] \\left[ \\begin{array}{c c c} 3 & -2 & -1 \\\\ -4 & 1 & 2 \\\\ 1 & 0 & -1/2 \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c c c} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ \\end{array} \\right]', false)}
`;

const sp16q4 = 
`
<h3>4. Freedom!</h3>
Let \\(A\\) and \\(B\\) be \\(n × n\\) matrices. Suppose \\(A\\) is invertible, but \\(B\\) is not. <b>Prove that Rank</b>(\\(AB\\)) < <b>Rank</b>(\\(A\\)).<br/><br/>
(That is, show that the number of linearly independent columns in \\(AB\\) is strictly less than the number of linearly independent columns in \\(A\\)).
`;

const sp16q4_soln =
`
<h3>Proof 1:</h3>
Since ${lx('B')} is rank deﬁcient, it has linearly dependent columns. This means that there exists a nonzero vector ${lx('\\vec{x}')} such that ${lx('B\\vec{x} = \\vec{0}', false)}

Premultiplying this equation by the matrix ${lx('A')} gives
${lx('A(B\\vec{x}) = A\\vec{0} = \\vec{0}', false)}

But ${lx('A(B\\vec{x}) = (AB)\\vec{x}', false)}

so we've shown that
${lx('(AB)\\vec{x} = \\vec{0}', false)}

for some nonzero vector ${lx('\\vec{x}')}. This proves that the columns of the <i>n x n</i> matrix ${lx('AB')} are linearly dependent, which in turn means that rank(${lx('AB')}) < ${lx('n')}.<br/><br/>

<h3>Proof 2:</h3>
Define the product matrix ${lx('C')} = ${lx('AB')}. Writing the matrix ${lx('B')} in column form, we ﬁnd that

${lx('\\begin{align}C & = AB \\\\ & = A \\begin{bmatrix} \\vec{b_1} & \\cdots & \\vec{b_l} \\cdots & \\vec{b_n} \\end{bmatrix} \\\\ & = \\begin{bmatrix} A\\vec{b_1} & \\cdots & A\\vec{b_l} & \\cdots & A\\vec{b_n} \\end{bmatrix} \\\\ & = \\begin{bmatrix} \\vec{c_1} & \\cdots & \\vec{c_l} & \\cdots & \\vec{c_n} \\end{bmatrix} \\\\ \\end{align}', false)}

where ${lx('\\vec{c_l}')} = ${lx('A\\vec{b_l}')} denotes the ${lx('l_{th}')} column of the matrix ${lx('C')} = ${lx('AB')}.<br/><br/>
Since ${lx('B')} is rank deﬁcient its columns must be linearly dependent. This means that we can write any column of ${lx('B')} as a nontrivial linear combination of the others (by nontrivial we mean that not all the coefﬁcients in the linear combination are zero). For example, let’s write the last column of ${lx('B')} as a linear combination of the first ${lx('n - 1')} columns. That is,

${lx('\\vec{b_n} = \\sum_{l = 1}^{n - 1}{a_l \\vec{b_l}}', false)}

for some set of coefﬁcients ${lx('\\alpha_1, \\cdots ,\\alpha_{n−1}')}, <i>not all zero</i>.
Now let’s look at the last column of the product matrix ${lx('C')} = ${lx('AB')}:

${lx('\\begin{align} \\vec{c_n} & = A\\vec{b_n} \\\\ & = A \\sum_{l = 1}^{n - 1}{a_l\\vec{b_l}} \\\\ & = \\sum_{l = 1}^{n - 1}{a_l \\underbrace{A \\vec{b_l}}_{\\vec{c_l}}} \\\\ & = \\sum_{l = 1}^{n - 1}{a_l\\vec{c_l}} \\\\ \\end{align}', false)}

which shows that the ${lx('n^{th}')} column of ${lx('C')} = ${lx('AB')} is a nontrivial linear combination of the ﬁrst ${lx('n - 1')} columns.<br/>
This means that ${lx('C')} has linearly dependent columns, which in turn implies that ${lx('AB')} is rank deficient.
`;

const sp16q5a = 
`
<h3>5. True or False?</h3>
You only need to write True or False under each subpart.</br>

(a) There exists an invertible \\(n × n\\) matrix \\(A\\) for which ${lx('A^2')} = 0. 
`;

const sp16q5a_soln =
`
<h3>False</h3>

Let’s left multiply and right multiply ${lx('A^2')} by ${lx('A^{-1}')} so we have ${lx('A^{−1} AAA^{−1}')}. By associativity of matrix multiplication, we have ${lx('(A^{−1}A)(AA^{−1})')} = ${lx('I_nI_n')} = ${lx('I_n')} where ${lx('I')} is the identity matrix. However, if ${lx('A^2')} were ${lx('0')}, then ${lx('(A^{−1}A)(AA^{−1})')} = ${lx('A^{−1} A^{2} A^{−1}')} = ${lx('0')} where ${lx('0')} is a matrix of all zeros, hence resulting in a contradiction.
`;

const sp16q5b =
`
(b) If \\(A\\) is an invertible \\(n × n\\) matrix, then for all vectors \\(\\vec{b}\\) ∈ ${lx('R^n')}, the system \\(A\\)\\(\\vec{x}\\)=\\(\\vec{b}\\) has a unique solution.
`;

const sp16q5b_soln =
`
<h3>True</h3>

If ${lx('A')} is invertible, then there is a unique matrix ${lx('A^{-1}')}. Left multiply the equation by ${lx('A^{−1}')}, and we will have ${lx('A^{−1}A\\vec{x}')} = ${lx('A^{−1}\\vec{b} \\implies \\vec{x} = A^{−1}\\vec{b}')}, where ${lx('\\vec{x}')} is a unique vector.
`;

const sp16q5c =
`
(c) If \\(A\\) and \\(B\\) are invertible \\(n × n\\) matrices, then the product \\(AB\\) is invertible.
`;

const sp16q5c_soln =
`
<h3>True</h3>

${lx('(AB)^{−1} = B^{−1}A^{−1}', false)}
Note that ${lx('ABB^{-1}A^{-1}')} = ${lx('I')} and ${lx('B^{-1}A^{-1}AB')} = ${lx('B^{-1}IB')} = ${lx('B^{-1}B')} = ${lx('I')}.
`;

const sp16q5d =
`
(d) The two vectors ${lx('v_1')} = ${lmatrix([[1], [1], [0]])} and ${lx('v_2')} = ${lmatrix([[1], [-1], [0]])} form a basis for the 
subspace Span(${lx('\\{')}${lmatrix([[1], [1], [0]])}, ${lmatrix([[1], [-1], [0]])}${lx('\\}')}).
`;

const sp16q5d_soln =
`
<h3>True.</h3>

Span(${lx('\\{')}${lmatrix([[1], [0], [1]])},${lmatrix([[0], [1], [0]])}${lx('\\}')}) spans the ${lx('x')}-${lx('y')} plane in ${lx('\\mathbb{R}^3')} as well.
`;

const sp16q5e =
`
(e) A set of ${lx('n')} linearly dependent vectors in ${lx('\\mathbb{R}^n')} can span ${lx('\\mathbb{R}^n')}.
`;

const sp16q5e_soln =
`
<h3>False.</h3>

A set of ${lx('n')} linearly dependent vectors span some subspace of dimension ${lx('0')} < dim(${lx('A')}) < ${lx('n')} in ${lx('\\mathbb{R}^n')}.<br/><br/>
<b>Note</b>: It is incorrect to say the set of linearly dependent vectors spans ${lx('\\mathbb{R}^{n−1}')} for two reasons. First, you
don’t know what the dimension is of the subspace it spans, which could be less than ${lx('n')} − ${lx('1')}. Second, there is no such thing as ${lx('\\mathbb{R}^{n−1} \\in \\mathbb{R}^n')}. The vectors are “in” ${lx('\\mathbb{R}^n')} based on how many elements are in the
vector, and a set of vectors spans some subspace (potentially the entire space.)

`;

const sp16q5f =
`
(f) For all matrices \\(A\\) and \\(B\\), where \\(A\\) is ${lx('5')}×${lx('5')} and \\(B\\) is ${lx('4')}×${lx('4')}, it is always the case that Rank(\\(A\\)) > Rank(\\(A\\)).
`;

const sp16q5f_soln =
`
<h3>False.</h3>

Size does not determine rank! For example, if ${lx('A')} was a matrix of all ones rank(${lx('A')}) would be 1. If, on the other hand ${lx('B')} was an identity matrix it would have full rank: rank(${lx('B')}) = ${lx('4')}.
<hr class="s2" />
You can only claim larger size implies larger rank if you assume the matrices are full rank (pivots in every column, all column vectors are linearly independent from the rest.)
`;

const sp16q6a =
`
<h3>6. Faerie Battles <i>(20 points)</i></h3>

In a war of civilizations, the light dragons are fighting for survival against the invading evil imp empire. It
is the night before the deciding battle, and Ela Dalon the Human Hobo has proposed using faerie lights to
determine enemy numbers. There are four enemy camps. </br></br>

The faerie lights begin completely dark and get brighter directly proportional to the number of imps present
around them, i.e. if Camp X has \\(n\\)  imps, any faerie light that visits Camp X will gain \\(n\\)  brightness units.
Unfortunately, faerie lights are notoriously difficult to control, and they are so small that the dragons can
only measure the total brightness of groups of faerie lights. The Human Hobo therefore proposes to send
four groups of faerie lights, and is fortunately able to keep track of how many faerie lights he sent and which
camps these faeries actually visited. This results in the following: </br></br>

Group 1 gained 7 total brightness units</br>
• 1 faerie light visited Camp A </br>
• 5 faerie lights visited Camp B </br>
• 1 faerie light visited Camp C </br></br>

Group 2 gained 26 total brightness units</br>
• 2 faerie lights visited Camp B </br>
• 4 faerie lights visited Camp C </br>
• 6 faerie lights visited Camp D </br></br>

Group 3 gained 10 total brightness unints</br>
• 2 faerie lights visited Camp C </br>
• 2 faerie lights visited Camp D </br></br>

Group 4 gained 9 total brightness units</br>
• 3 faerie lights visited Camp D </br></br>

(a) Write the system of equations that relates the number of imps in each camp to the total measured
brightness units from each group.
`;

const sp16q6a_soln =
`
${lx('\\begin{aligned} A + 5B + C & = 7 \\\\ 2B + 4C + 6D & = 26 \\\\ 2C + 2D & = 10 \\\\ 3D & = 9 \\\\ \\end{aligned}')}
`;

const sp16q6b =
`
(b) From the given information, can you determine how many imps are at each campsite? If so, report
their numbers to help the faeries! If not, explain why not.
`;

const sp16q6b_soln =
`
The matrix is upper triangular, so the matrix’s columns must be linearly independent and
there is enough information to determine exactly how many enemy imps there are at each campsite.<br/>
We can ﬁnd the number of imps at each campsite by row reducing the following augmented system (process omitted for brevity):<br/>

${lmatrix([[1, 5, 1, 0, '\\vdots', 7], [0, 2, 4, 6, '\\vdots', 26], [0, 0, 2, 2, '\\vdots', 10], [0, 0, 0, 3, '\\vdots', 9]], false, false)}
${lx('\\implies', false)}
${lmatrix([[1, 0, 0, 0, '\\vdots', 5], [0, 1, 0, 0, '\\vdots', 0], [0, 0, 1, 0, '\\vdots', 2], [0, 0, 0, 1, '\\vdots', 3]], false, false)}

Thus, we discover that:
<ul><li>Camp A has 5 imps</li><li>Camp B has 0 imps</li><li>Camp C has 2 imps</li><li>Camp D has 3 imps</li></ul><br/>
We can check our answer by substituting our answers into the original equations:

${lx('1·5 + 5·0 + 1·2 = 5 + 2 = 7', false)}
${lx('2·0 + 4·2 + 6·3 = 8 + 18 = 26', false)}
${lx('2·2 + 2·3 = 4 + 6 = 10', false)}
${lx('3·3 = 9', false)}
`;

const sp16q6c =
`
(c) Oh no! You just found out that the evil imps manipulated the faerie lights from Group 1, rendering
their information useless. You send in an emergency group of faeries to make up for the loss. They
gained a total of 10 brightness units, and visited camps as follows:</br></br>
• 1 faerie light visited Camp B</br>
• 2 faerie lights visited Camp C</br>
• 3 faerie lights visited Camp D</br></br>
From this information (together with the information from Groups 2, 3, 4), can you determine how
many imps are at each campsite? If so, report their numbers to help the faeries! If not, explain why
not.
`;

const sp16q6c_soln =
`
No, you cannot determine how many imps are at each campsite.
<ul>
<li>The new team does not pass through Camp A so you have no way of determining the number of imps in Camp A.</li>
<li>The new measurement conﬂicts with an existing measurement. The system of equations is inconsistent, so there is no solution.</li>
<li>The new measurement is a linearly dependent one. Speciﬁcally, it sends half the faerie lights that the second measurement sends. Therefore, we do not have enough linearly independent
measurements to solve for the imps in each camp.</li>
</ul>
`;

const imgsp16q7_1 = require('../img/sp16q7-1.png');
const sp16q7a =
`
<h3>7. A Tale of a Million Technocrats and the Four Dream Cities <i>(24 points)</i></h3>

This problem is a tale of one million Technocrats and four Dream Cities. Listed in order from West to East,
the four cities are (I) San Francisco, (II) Denver, (III) Chicago, and (IV) New York City. </br></br>

The Technocrats don’t die. They don’t reproduce. In other words, their total population size is a constant
from the initial time ${lx('n')} = ${lx('0')} to the end of time as ${lx('n')} → ${lx('\\infty')}. At the strike of each second on a Universal Clock,
each Technocrat chooses to either remain at the city he or she is already in, or move instantaneously to
another of the four Dream Cities, according to the following rules:</br></br>

• Every Technocrat who moves to either San Francisco or New York City will stay in that city forever
(no more moving thereafter!);</br>
• Whether eastward or westward, every Technocrat moves in single hops—so for example, no direct
move from San Francisco to either Chicago or New York City is allowed;</br>
• At each second, the fraction of Technocrats in each city who move eastward legally (e.g. from Denver
to Chicago, or from Chicago to New York City) is ${lx('\\beta')};</br>
• At each second, the fraction of Technocrats in each city who move westward legally (e.g. from Chicago
to Denver, or from Denver to San Francisco) is ${lx('\\alpha')};</br>
• The following inequality must be true: ${lx('\\alpha')} + ${lx('\\beta')} ${lx('\\leq')} 1.</br></br>

The following diagram summarizes these restrictions graphically.
<img src="${imgsp16q7_1}" class="problem-image"/>

Let the state vector for this system be at time \\(n\\) be:
\\(\\vec{s}\\)[\\(n\\)] = ${lmatrix([[('s_1[n]')], [('s_2[n]')], [('s_3[n]')], [('s_4[n]')]])}

,
where ${lx('s_l')}[\\(n\\)] denotes number of Technocrats in City \\(l\\) at time \\(n\\); for example, ${lx('s_3')}[\\(n\\)] denotes the Technocrat
population in Chicago at time \\(n\\).
The state-evolution equation for this system is given by
$$\\vec{s}[n + 1] = A\\vec{s}[n]$$
where ${lx('A')} is the state-transition matrix. </br></br>


(a) Determine the state-transition matrix ${lx('A')}.
`;

const sp16q7a_soln =
`
${lmatrix([[1, '\\alpha', 0, 0], [0, '1 - \\alpha - \\beta', '\\alpha', 0], [0, '\\beta', '1 - \\alpha - \\beta', 0], [0, 0, '\\beta', 1]])}
`;

const sp16q7b =
`
(b) In this part, we’re interested in backward inference of the state vector ${lx('\\vec{s}[n]')} from a future state vector, say ${lx('\\vec{s}[n+1]')}. As you know, this is possible only if a matrix ${lx('A^{−1}')} exists, so that
${lx('\\vec{s}[n] = A^{−1}\\vec{s}[n + 1]', false)}.
<hr class="s1" />
Consider a model of the Technocrat migration system described above with ${lx('\\beta')} = ${lx('\\alpha')} = 1/3. Assume ${lx('\\vec{s}[1]')} = ${lx('\\vec{1}')}, where ${lx('\\vec{1}')} denotes the vector of all ones.
<hr class="s1" />
${lx('\\vec{1} = \\left[ \\begin{array}{c} 1 \\\\ 1 \\\\ 1 \\\\ 1 \\\\ \\end{array} \\right]', false)}
For this model of the system described above, either explain why time-reversed inference of the state vector is not possible, or determine ${lx('\\vec{s}[0]')} from ${lx('\\vec{s}[1]')} explicitly by computing ${lx('A^{−1}')} first.
`;

const sp16q7b_soln =
`
<h3>Model 1</h3>
${lx('A_1 = \\left[ \\begin{array}{c c c c} 1 & 1/3 & 0 & 0 \\\\ 0 & 1/3 & 1/3 & 0 \\\\ 0 & 1/3 & 1/3 & 0 \\\\ 0 & 0 & 1/3 & 1 \\\\ \\end{array} \\right]', false)}

Rows 2 and 3 are identical, so ${lx('A_1')} is not invertible. In other words, the row vectors are linearly dependent and Gaussian Elimination would result in a row of 0’s, which can’t be inverted.<br/><br/>

<h3>Model 2</h3>
${lx('A_1 = \\left[ \\begin{array}{c c c c} 1 & 1/4 & 0 & 0 \\\\ 0 & 1/2 & 1/4 & 0 \\\\ 0 & 1/2 & 1/2 & 0 \\\\ 0 & 0 & 1/4 & 1 \\\\ \\end{array} \\right]', false)}
This is full rank, so it's invertible. In other words, there is a pivot in every row; every row vector is linearly independent from the rest.

${lx('A_2^{-1} = \\left[ \\begin{array}{c c c c} 1 & -2/3 & 1/3 & 0 \\\\ 0 & 8/3 & -4/3 & 0 \\\\ 0 & -4/3 & 8/3 & 0 \\\\ 0 & 1/3 & -2/3 & 1 \\\\ \\end{array} \\right]', false)}

${lx('\\vec{s}[0] = A_2^{-1}\\vec{1} = \\left[ \\begin{array}{c} 2/3 \\\\ 4/3 \\\\ 4/3 \\\\ 2/3 \\end{array} \\right]', false)}
`;

const sp16q7c =
`
For the remainder of the problem, assume ${lx('\\beta')} = ${lx('\\alpha')} = 1/4 and that the state transition matrix ${lx('A')} is:

${lx('A = \\left[ \\begin{array}{c c c c} 1 & 1/4 & 0 & 0 \\\\ 0 & 1/2 & 1/4 & 0 \\\\ 0 & 1/4 & 1/2 & 0 \\\\ 0 & 0 & 1/4 & 1 \\\\ \\end{array} \\right]', false)}

Recall that the following equation governs ${lx('\\vec{s}[n]')}, the state of the system at time ${lx('n')}, and the initial state ${lx('\\vec{s}[0]')}:
${lx('\\vec{s}[n] = A^n\\vec{s}[0]', false)}
For each of the remaining parts, assume that a limiting state vector exists, given by
${lx('\\lim\\limits_{n \\to \\infty} \\vec{s}[n] = \\vec{s}_\\infty', false)}
(c) Suppose the initial state of the system is given by the vector
${lx('\\vec{s}[0] = \\left[ \\begin{array}{c} 1/2 \\\\ 0 \\\\ 0 \\\\ 1/2 \\\\ \\end{array} \\right]', false)}
This means that, initially, 500,000 Technocrats are in San Francisco, and the other 500,000 are in New York City. Without complicated mathematical derivations, determine the state vector ${lx('\\vec{s}[n]')} for all ${lx('n \\geq 1')}.
`;

const sp16q7c_soln =
`
${lx('\\vec{s_\\infty} = \\left[ \\begin{array}{c} 1/2 \\\\ 0 \\\\ 0 \\\\ 1/2 \\\\ \\end{array} \\right] ', false)}
With the given state transition diagram, no technocrats would move so ${lx('\\vec{s_0}')} = ${lx('\\vec{s_t}')} = ${lx('\\vec{s_\\infty}')}.
`;

const sp16q7d =
`
(d) Now suppose the initial state of the system is given by the vector
${lx('\\vec{s}[0] = \\left[ \\begin{array}{c} 0 \\\\ 1/2 \\\\ 1/2 \\\\ 0 \\end{array} \\right]', false)}
This means that, initially, 500,000 Technocrats are in Denver, and the other 500,000 are in Chicago.<br/>
Without complicated mathematical derivations, determine the limiting state vector ${lx('\\lim\\limits_{n \\to \\infty} \\vec{s}[n]')}
`;

const sp16q7d_soln =
`
${lx('\\vec{s_\\infty} = \\left[ \\begin{array}{c} 1/2 \\\\ 0 \\\\ 0 \\\\ 1/2 \\\\ \\end{array} \\right]', false)}
By symmetry, half go to SF and half go to NYC.
`;

const sp16q7e =
`
(e) Finally, now suppose the initial state of the system is given by the vector
${lx('\\vec{s}[0] = \\left[ \\begin{array}{c} 1/2 \\\\ 0 \\\\ 0 \\\\ 1/2 \\\\ \\end{array} \\right]', false)}
This means that, initially, the Technocrats are equally distributed among the four Dream Cities. Without complicated mathematical derivations, determine ${lx('\\lim\\limits_{n \\to \\infty} \\vec{s}[n]')}.
`;

const sp16q7e_soln =
`
${lx('\\vec{s_\\infty} = \\left[ \\begin{array}{c} 1/2 \\\\ 0 \\\\ 0 \\\\ 1/2 \\\\ \\end{array} \\right]', false)}
By symmetry, half go to SF and half go to NYC. In addition, we can think of the state vector in this part as follows:
<hr class="s2" />

${lx('\\left[ \\begin{array}{c} 1/4 \\\\ 1/4 \\\\ 1/4 \\\\ 1/4 \\\\ \\end{array} \\right] = \\frac{1}{2} \\left[ \\begin{array}{c} 1/2 \\\\ 0 \\\\ 0 \\\\ 1/2 \\\\ \\end{array} \\right] + \\frac{1}{2} \\left[ \\begin{array}{c} 0 \\\\ 1/2 \\\\ 1/2 \\\\ 0 \\\\ \\end{array} \\right]', false)}
Where the first vector is from part (c) and the second vector is from part (d). So in the limit ${lx('n \\to \\infty')}, we get the same distribution as before.
`;

const sp16q8a =
`
<h3>8. Ayy - Reflections on SIXTEEN <i>(28 points)</i></h3>
You are involved in the design of a robot called SIXTEEN-AYY that has arms with a certain range of motion and certain operations that the arms can perform.<br/>
For parts (a)–(e) of this problem, we will look at a simplified case where we pretend that the robot’s arm can move only in a 2-dimensional space. Thus, we will represent the position of the end of the robot’s arm with a vector ${lx('\\vec{p}')} = ${lmatrix([['p_x'], ['p_y']])}.
Let’s further assume that the robot will be built to perform two movement commands
determined by the following transformations:<br/><br/>
${lx('T_1')}: Reflects ${lx('\\vec{p}')} about the line ${lx('y')} = ${lx('−x')}.<br/>
${lx('T_2')}: Rotates ${lx('\\vec{p}')} clockwise about the origin by ${lx('45\\circ')}.
(a) Write the matrix ${lx('A_1')} that applies the transformation ${lx('T_1')}.
`;

const sp16q8a_soln =
`
${lx('\\vec{a_1}')} = ${lx('T_1\\left(\\begin{array}{c}1 \\\\ 0 \\\\\ \\end{array}\\right)')} = ${lmatrix([[0], [-1]])}<br/>
${lx('\\vec{a_2}')} = ${lx('T_1\\left(\\begin{array}{c}0 \\\\ 1 \\\\\ \\end{array}\\right)')} = ${lmatrix([[-1], [0]])}<br/>
${lx('A_1')} = ${lmatrix([['\\vec{a_1}', '\\vec{a_2}']])} = ${lmatrix([[0, -1], [-1, 0]])}
`;

const sp16q8b =
`
(b) Write the matrix ${lx('A_2')} that applies the transformation ${lx('T_2')}.
`;

const sp16q8b_soln =
`
${lx('\\theta')} = ${lx('-\\frac{\\pi}{4}')} = ${lx('-45^\\circ')}<br/>
${lx('A_2')} = ${lmatrix([['cos \\theta', '-sin \\theta'], ['sin \\theta', 'cos \\theta']])} = ${lmatrix([['\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}'], ['-\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}']])}
`;

const sp16q8c =
`
(c) Leah commands SIXTEEN-AYY to perform ${lx('T_1')} followed by ${lx('T_2')} - find the matrix ${lx('A_{12}')} that captures the effect of this sequence of commands.
`;

const sp16q8c_soln =
`
${lx('A_{12}')} = ${lx('A_2A_1')} = ${lmatrix([['\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}'], ['-\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}']])}
${lmatrix([[0, -1], [-1, 0]])} = ${lmatrix([['-\\frac{1}{\\sqrt{2}}', '-\\frac{1}{\\sqrt{2}}'], ['-\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}']])}
`;

const sp16q8d =
`
(d) Being the contrarian that he is, Bob instead wants to command SIXTEEN-AYY to perform ${lx('T_2')} followed by ${lx('T_1')}. Find the matrix ${lx('A_{21}')} that captures the effect of this sequence of commands.
`;

const sp16q8d_soln =
`
${lx('A_{21}')} = ${lx('A_1A_2')} = ${lmatrix([[0, -1], [-1, 0]])} ${lmatrix([['\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}'], ['-\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}']])}
 = ${lmatrix([['\\frac{1}{\\sqrt{2}}', '-\\frac{1}{\\sqrt{2}}'], ['-\\frac{1}{\\sqrt{2}}', '\\frac{1}{\\sqrt{2}}']])}
`;

const sp16q8e =
`
(e) If SIXTEEN-AYY started out in the same initial configuration for both Bob and Leah, will its arm end up in the same place after executing Leah’s command as it does after executing Bob’s command?<br/>
Briefly justify why or why not.
`;

const sp16q8e_soln =
`
No, the resulting matrices won't be the same because we've just shown ${lx('A_1A_2 \\ne A_2A_1')}; i.e. matrix multiplication is not commutative.
`;

const img8f = require('../img/sp16q8-1.png');
const sp16q8f =
`
(f) Now let’s go back to 3-dimensional space, with the position of the end of the robot arm represented as vectors ${lmatrix([['P_x'], ['P_y'], ['P_z']])} ${lx('\\in')} ${lx('\\mathbb{R}^3')}. Suppose the end of the robot’s arm can reach only points in the span of the vectors ${lmatrix([[1], [0], [0]])} and ${lmatrix([[0], [1], [0]])}. Circle the graph below that corresponds to this possible range of motion.

<img src="${img8f}" className="problem-image" />
`;

const sp16q8f_soln =
`
The span of the vectors is defined by ${lmatrix([['P_x'], ['P_y'], [0]])}, which is just the xy plane. Thus, our answer is diagram 1.
`;

const img8g = require('../img/sp16q8-2.png');
const sp16q8g =
`
(g) Finally, we’d like to allow the robot to place the end of its arm at a point that is ${lx('\\theta')} radians above the ${lx('x')}-${lx('y')} plane, but as shown below, is still restricted to a two-dimensional plane at that angle. Write the basis
vectors that would correspond to this possible range of motion for a fixed ${lx('\\theta')}.<br/>
(<i>Hint</i>: If you had a point along the ${lx('y')}-axis and wanted to rotate it by an angle of ${lx('\\theta')} radians relative to the ${lx('y')}-axis while remaining on the ${lx('y')}-${lx('z')} plane, what transformation would you apply?)

<img src="${img8g}" className="problem-image" />
`;

const sp16q8g_soln =
`
We notie that a rotation relative to the y-axis maintains the same x-value while rotating our y and z by ${lx('\\theta')} radians. Thus, we can write the transformation matrix as<br/>
${lmatrix([[1, 0, 0], [0, 'cos \\theta', '-sin \\theta'], [0, 'sin \\theta', 'cos \\theta']], false, false)}
Note that since we only had two basis vectors to begin with, the new range of motion also only needs two basis vectors corresponding to the rotation of the x and y unit vectors, so our basis vectors are:

${lx('\\left\\{ \\left[ \\begin{array}{c} 1 \\\\ 0 \\\\ 0 \\\\ \\end{array} \\right], \\left[ \\begin{array}{c} 0 \\\\ cos \\theta \\\\ sin \\theta \\\\ \\end{array} \\right] \\right\\}', false)}

In fact, all rotation matrices in ${lx('n')} dimensions can be decomposed into a series of rotations in 2 dimensions. So all rotations are products of the basic rotation matrix

${lmatrix([['cos \\theta', '-sin \\theta'], ['sin \\theta', 'cos \\theta']], false, false)}

generalized to a larger ${lx('n')} x ${lx('n')} matrix with 1's in the dimensions that aren't being rotated. Read more on <b>Wikipedia!</b>
`;

const img9a = require('../img/sp16q9-1.png');
const sp16q9a =
`
<h3>9. Goodness Gracious, Great Balls of Fur! <i>(28 points)</i></h3>
You are a biologist who has discovered a new species of rodents that live in tunnels underground, and you have named the species "furballs". You have been observing a particular network of tunnels. Figure 1 shows
the network of tunnels with three chambers in it. To document their behavior, you observe the number of
furballs in each chamber at every minute. After observing the furballs’ behavior for a while, you have figured
out that their behavior follows a regular pattern. Each minute, a well defined fraction of the furballs
in a given chamber move to the other chambers. The fractions you have observed are shown in Figure 1.
The fractions of furballs leaving the Play Room could not be determined through your observations, and are shown as the variables ${lx('p_1')}, ${lx('p_2')}, and ${lx('p_3')}.<br/><br/>
<img src="${img9a}" className="problem-image" />
<br/><br/>
(a) Let the number of furballs in the Food Storeroom at time ${lx('n')} be ${lx('x_f[n]')}, the number of furballs in Sleep room at time ${lx('n')} be ${lx('x_s[n]')}, and the number of furballs in the Play Room at time ${lx('n')} be ${lx('x_p[n]')}. We would like to find the transition matrix ${lx('A')} such that ${lmatrix([['x_f[n+1]'], ['x_s[n+1]'], ['x_p[n+1]']])} =
${lx('A')}${lmatrix([['x_f[n]'], ['x_s[n]'], ['x_p[n]']])}. Write ${lx('A')} using the numbers and the variables in the diagram.
`;

const sp16q9a_soln =
`
Write a matrix in which each column corresponds to the outgoing arrows in the diagram from a particular room, and each row corresponds to the incoming arrows to a particular room:

${lmatrix([[0.5, 0.4, 'p_1'], [0.5, 0.5, 'p_2'], [0, 0.1, 'p_3']], false, false)}
`;

const sp16q9b =
`
(b) We know that no furballs enter or leave the configuration of tunnels shown above and that during the time you’re observing the behavior, and no furballs die or are born. What constraint does this place on the values of ${lx('p_1')}, ${lx('p_2')}, ${lx('p_3')}? Write your answer in equation form.
`;

const sp16q9b_soln =
`
If number is conserved, this means each column vector in the matrix sums to 1. Therefore: ${lx('p_1')} + ${lx('p_2')} + ${lx('p_3')} = 1
`;

const sp16q9c =
`
(c) Suppose we let ${lx('\\vec{p}')} = ${lmatrix([['p_1'], ['p_2'], ['p_3']])}, ${lx('\\vec{x}[n+1]')} = ${lmatrix([['x_f[n+1]'], ['x_s[n+1]'], ['x_p[n+1]']])} and ${lx('\\vec{x}[n]')} = ${lmatrix([['x_f[n]'], ['x_s[n]'], ['x_p[n]']])}, and that we are sure that ${lx('x_p[n]')} is nonzero. Express ${lx('\\vec{p}')} as a function of the numbers in the diagram, ${lx('\\vec{x}[n]')}, and ${lx('\\vec{x}[n+1]')}.<br/>
(<i>Hint</i>: what is the relationship between ${lx('\\vec{x}[n+1]')} and ${lx('\\vec{x}[n]')})
`;

const sp16q9c_soln =
`
${lmatrix([[0.5, 0.4, 'p_1'], [0.5, 0.5, 'p_2'], [0, 0.1, 'p_3']])}${lmatrix([['x_f[n]'], ['x_s[n]'], ['x_p[n]']])} = ${lx('\\vec{x}[n + 1]')}
<hr class="s2" />
${lx('x_f[n]')}${lmatrix([[0.5], [0.5], [0]])} + ${lx('x_s[n]')}${lmatrix([[0.4], [0.5], [0.1]])} + ${lx('x_p[n]')}${lmatrix([['p_1'], ['p_2'], ['p_3']])} = ${lx('\\vec{x}[n + 1]')}
<hr class="s2" />
${lx('x_p[n]')}${lmatrix([['p_1'], ['p_2'], ['p_3']])} = ${lx('\\vec{x}[n + 1]')} - ${lx('x_f[n]')}${lmatrix([[0.5], [0.5], [0]])} - ${lx('x_s[n]')}${lmatrix([[0.4], [0.5], [0.1]])}
<hr class="s2" />
${lx('\\vec{p}')} = ${lx('\\frac{1}{x_p[n]}')}${lx('\\left(\\vec{x}[n + 1] - x_f[n]\\begin{array}{c}0.5 \\\\ 0.5 \\\\ 0 \\\\ \\end{array} - x_s[n]\\begin{array}{c}0.4 \\\\ 0.5 \\\\ 0.1 \\\\ \\end{array} \\right)')}
`;

const sp16q9d =
`
(d) Using part (c), solve for ${lx('\\vec{p}')} given that ${lx('\\vec{x}[n+1]')} =
${lmatrix([[22], [30], [48]])} and ${lx('$vec{x}[n]')} = ${lmatrix([[20], [30], [50]])}.
`;

const sp16q9d_soln =
`
${lx('\\vec{p}')} = ${lx('\\frac{1}{50} \\left( \\left[ \\begin{array}{c} 22 \\\\ 30 \\\\ 48 \\\\ \\end{array} \\right] - 20 \\left[ \\begin{array}{c} 0.5 \\\\ 0.5 \\\\ 0 \\\\ \\end{array} \\right] - 30 \\left[ \\begin{array}{c} 0.4 \\\\ 0.5 \\\\ 0.1 \\\\ \\end{array} \\right] \\right)')}
<hr class="s2" />
${lx('\\vec{p}')} = ${lmatrix([[0], [0.1], [0.9]])}
`;

const img9e = require('../img/sp16q9-2.png');
const sp16q9e =
`
(e) You discover a new system of tunnels where furballs live. You know this system has 3 chambers like the last one did, but you do not know how the chambers are connected, or the behavior of this colony of furballs. However, if ${lx('\\vec{x}[n]')} =
${lmatrix([['x_1[n]'], ['x_2[n]'], ['x_3[n]']])} where ${lx('x_i[n]')} represents the number of furballs in chamber ${lx('i')} at timestep ${lx('n')}, where time starts at ${lx('n')} = 0, you observe that ${lx('\\vec{x}[2]')} = ${lmatrix([[60], [24], [16]])}. Which of the following pump
diagrams in Figure 2 represents a possible set of behaviors for this colony?

<img src="${img9e}" className="problem-image" />
`;

const sp16q9e_soln =
`
(i) The third row in ${lx('A_i')} consists of all zeros. This means, at any positive timestep, ${lx('\\vec{x}')} would be forced to have zero as its third entry. Therefore, the given ${lx('\\vec{x}[2]')} is not in the range of this matrix, and this option
do not represent a possible set of behaviors.
<hr class="s2" />

(ii) The ﬁrst two rows in ${lx('A_{ii}')} are the same. This means, at any positive timestep, ${lx('x')} would be forced to
have the same number in its first and second entry. Therefore, the given ${lx('\\vec{x}[2]')} is not in the range of this
matrix, and this option do not represent a possible set of behaviors.
<hr class="s2" />

(iii) The given ${lx('\\vec{x}[2]')} is in the range of ${lx('A_{iii}')}. Therefore, full credit was given for choosing this option.
However, number is not conserved in this option. Since it was ambiguous whether or not number
was meant to be conserved in the question, partial credit was given for excluding this option with this explanation.
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Sticky = require('react-stickynode');

class EE16ASp16 extends Component {
  render() {
    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2016 | Alon, Ayazifar</h5>
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
              3. Mechanical Johann
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" spy={true} isDynamic={true} smooth={true} duration={500}>
              4. Freedom!
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" spy={true} isDynamic={true} smooth={true} duration={500}>
              5. True or False?
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" spy={true} isDynamic={true} smooth={true} duration={500}>
              6. Faerie Battles
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" spy={true} isDynamic={true} smooth={true} duration={500}>
              7. A Tale of a Million Technocrats and the Four Dream Cities
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" spy={true} isDynamic={true} smooth={true} duration={500}>
              8. Ayy - Reflections on SIXTEEN
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q9" spy={true} isDynamic={true} smooth={true} duration={500}>
              9. Goodness Gracious, Great Balls of Fur!
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Asp16-exam.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Asp16-soln.pdf'} target="_blank">Solutions PDF</a>
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
              3. Mechanical Johann
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" isDynamic={true} smooth={true} duration={500}>
              4. Freedom!
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" isDynamic={true} smooth={true} duration={500}>
              5. True or False?
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" isDynamic={true} smooth={true} duration={500}>
              6. Faerie Battles
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" isDynamic={true} smooth={true} duration={500}>
              7. A Tale of a Million Technocrats and the Four Dream Cities
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" isDynamic={true} smooth={true} duration={500}>
              8. Ayy - Reflections on SIXTEEN
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q9" isDynamic={true} smooth={true} duration={500}>
              9. Goodness Gracious, Great Balls of Fur!
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Asp16-exam.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Asp16-soln.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <Element name="q3">
            <hr className="s5" />
            <h2>Straightforward questions <i>(24 points)</i></h2>
            <hr className="s2" />
            <p>Unless told otherwise, you must show work to get credit. There will be very little partial credit given in this section. Each problem is worth 8 points.</p>
            <hr className="s5" />
            <Question id={"q3"} content={sp16q3} hasReponse={false} solution={sp16q3_soln} />
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4"} content={sp16q4} hasReponse={false} solution={sp16q4_soln} />
          </Element>
          <Element name="q5">
            <hr className="s5" />
            <Question id={"q5a"} content={sp16q5a} hasReponse={false} solution={sp16q5a_soln} />
            <hr className="s5" />
            <Question id={"q5b"} content={sp16q5b} hasReponse={false} solution={sp16q5b_soln} />
            <hr className="s5" />
            <Question id={"q5c"} content={sp16q5c} hasReponse={false} solution={sp16q5c_soln} />
            <hr className="s5" />
            <Question id={"q5d"} content={sp16q5d} hasReponse={false} solution={sp16q5d_soln} />
            <hr className="s5" />
            <Question id={"q5e"} content={sp16q5e} hasReponse={false} solution={sp16q5e_soln} />
            <hr className="s5" />
            <Question id={"q5f"} content={sp16q5f} hasReponse={false} solution={sp16q5f_soln} />
          </Element>
          <Element name="q6">
            <hr className="s5" />
            <h2>Free-form Problems <i>(100 points)</i></h2>
            <hr className="s2" />
            <Question id={"q6a"} content={sp16q6a} hasReponse={false} solution={sp16q6a_soln} />
            <hr className="s5" />
            <Question id={"q6b"} content={sp16q6b} hasReponse={false} solution={sp16q6b_soln} />
            <hr className="s5" />
            <Question id={"q6c"} content={sp16q6c} hasReponse={false} solution={sp16q6c_soln} />
          </Element>
          <Element name="q7">
            <hr className="s5" />
            <Question id={"q7a"} content={sp16q7a} hasReponse={false} solution={sp16q7a_soln} />
            <hr className="s5" />
            <Question id={"q7b"} content={sp16q7b} hasReponse={false} solution={sp16q7b_soln} />
            <hr className="s5" />
            <Question id={"q7c"} content={sp16q7c} hasReponse={false} solution={sp16q7c_soln} />
            <hr className="s5" />
            <Question id={"q7d"} content={sp16q7d} hasReponse={false} solution={sp16q7d_soln} />
            <hr className="s5" />
            <Question id={"q7e"} content={sp16q7e} hasReponse={false} solution={sp16q7e_soln} />
          </Element>
          <Element name="q8">
            <hr className="s5" />
            <Question id={"q8a"} content={sp16q8a} hasReponse={false} solution={sp16q8a_soln} />
            <hr className="s5" />
            <Question id={"q8b"} content={sp16q8b} hasReponse={false} solution={sp16q8b_soln} />
            <hr className="s5" />
            <Question id={"q8c"} content={sp16q8c} hasReponse={false} solution={sp16q8c_soln} />
            <hr className="s5" />
            <Question id={"q8d"} content={sp16q8d} hasReponse={false} solution={sp16q8d_soln} />
            <hr className="s5" />
            <Question id={"q8e"} content={sp16q8e} hasReponse={false} solution={sp16q8e_soln} />
            <hr className="s5" />
            <Question id={"q8f"} content={sp16q8f} hasReponse={false} solution={sp16q8f_soln} />
            <hr className="s5" />
            <Question id={"q8g"} content={sp16q8g} hasReponse={false} solution={sp16q8g_soln} />
          </Element>
          <Element name="q9">
            <hr className="s5" />
            <Question id={"q9a"} content={sp16q9a} hasReponse={false} solution={sp16q9a_soln} />
            <hr className="s5" />
            <Question id={"q9b"} content={sp16q9b} hasReponse={false} solution={sp16q9b_soln} />
            <hr className="s5" />
            <Question id={"q9c"} content={sp16q9c} hasReponse={false} solution={sp16q9c_soln} />
            <hr className="s5" />
            <Question id={"q9d"} content={sp16q9d} hasReponse={false} solution={sp16q9d_soln} />
            <hr className="s5" />
            <Question id={"q9e"} content={sp16q9e} hasReponse={false} solution={sp16q9e_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default EE16ASp16;
