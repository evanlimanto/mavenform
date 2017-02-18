import React, { Component } from 'react';
import { Question } from '../components/question';

const examCode = 'ee16a-fa15';

const fa15q3 =
`
<h3>3. Solve It</h3>
Solve the following system of linear equations:

$$\\left[
\\begin{array}{ c c }
   1 & 3 \\\\
   -2 & -5
\\end{array} \\right]
\\left[
\\begin{array}{ c }
   x_1 \\\\
   x_2
\\end{array} \\right]
=
\\left[
\\begin{array}{ c }
   4 \\\\
   -6
\\end{array} \\right]$$
`;

const fa15q3_soln =
`
We can solve this by row reducing the augmented system (process omitted for brevity): <br/><br/>

${lmatrix([[1, 3, '\\vdots', 4], [-2, -5, '\\vdots', -6]], false, false)}

which gives

${lmatrix([[1, 0, '\\vdots', -2], [0, 1, '\\vdots', 2]], false, false)}

and yields the solution

${lmatrix([['x_1'], ['x_2']])} = ${lmatrix([[-2], [2]], false, false)}
`;

const fa15q4 =
`
<h3>4. Invert It</h3>

What is the inverse of the matrix?
$$\\left[
\\begin{array}{ c c }
1 & 3 \\\\
−2 & −5 \\\\
\\\end{array} \\right]$$
`;

const fa15q4_soln =
`
We can find the inverse by row reducing the augmented system (process omitted for brevity): <br/><br/>

${lmatrix([[1, 0, '\\vdots,', 1, 3], [0, 1, '\\vdots', -2 -5]])}

which gives

${lmatrix([[-5, -3, '\\vdots', 1, 0], [2, 1, '\\vdots', 0, 1]])}

Thus the inverse is given by

${lmatrix([[-5, -3], [2, 1]], false, false)}

We can check our answer by calculating<br/>

${lmatrix([[1, 3], [-2, -5]])} ${lmatrix([[-5, -3], [2, 1]])} = ${lmatrix([[1, 0,], [0, 1]])}<br/>

You could also have used the equation for the inverse of a 2x2 matrix if you know it<br/>
${lx('\\begin{array}{c c}a & b \\\\ c & d \\\\ \\end{array}^{-1} = \\frac{1}{ad - bc}\\begin{array}{c c}d & -b \\\\ -c & a \\\\ \\end{array}', false)}
${lx('\\begin{array}{c c}1 & 3 \\\\ -2 & -5 \\\\ \\end{array}{-1} = \\frac{1}{1}\\begin{array}{c c}-5 & -3 \\\\ 2 & 1 \\\\ \\end{array}', false)}
`;

const fa15q5 =
`
<h3>5. Show It</h3>

Let \\(n\\) be a positive integer. Let \\(\\{\\vec{v_1}, \\vec{v_2}, . . . , \\vec{v_k}\\}\\) be a set of \\(k\\) linearly dependent vectors in \\(\\mathbb{R}^n\\). Show that for
any (\\(n × n\\)) matrix A, the set \\(\\{\\vec{Av_1}, \\vec{Av_2}, . . . , \\vec{Av_k}\\}\\) is a set of linearly dependent vectors.
`;

const fa15q5_soln =
`
it is given that ${lx('{\\vec{v_1}, \\vec{v-2}, \\dots, \\vec{v_k} | \\vec{v_i} \\in \\mathbb{R}^{n}}')} are linearly dependent. This implies that there exist ${lx('k')} scalars, ${lx('{\\vec{\\alpha_1}, \\vec{\\alpha_2}, \\dots, \\vec{\\alpha_k}}') from ${lx('\\mathbb{R}')} that are <i>not all equal to zero simultaneously</i> (or equivalently <i>at least one of them is not equal to zero</i>), such that<br/>
${lx('\\alpha_1·\\vec{v_1} + \\alpha_2·\\vec{v_2} + \\cdots + \\alpha_k·\\vec{v_k} = \\vec{0}', false)}

By multiplying Equation 9 by ${lx('A')} from the left side, we get
  ${lx('A · (\\alpha_1 · \\vec{v_1} + \\alpha_2 · \\vec{v_2} + \\cdots + \\alpha_k · \\vec{v_k}) = A · \\vec{0}', false)}

First, note that ${lx('A · \\vec{0} = \\vec{0}')}. Moreover, if we distribute we get
  ${lx('A · (\\alpha_1 · \\vec{v_1}) + A · (\\alpha_2 · \\vec{v_2}) + \\cdots + A · (\\alpha_k · \\vec{v_k}) = \\vec{0}', false)}

From associativity of multiplication we get
  ${lx('(A · \\alpha_1) · \\vec{v_1} + (A · \\alpha_2) · \\vec{v_2} + \\cdots + (A · \\alpha_k) · \\vec{v_k} = \\vec{0}', false)}

Since scalar-matrix multiplication is commutative, we get
  ${lx('(\\alpha_1 · A) · \\vec{v_1} + (\\alpha_2 · A) · \\vec{v_2} + \\cdots + (\\alpha_k · A) · \\vec{v_k} = \\vec{0}', false)}

By using associativity of multiplication again, we get
  ${lx('\\alpha_1 · (A · \\vec{v_1}) + \\alpha_2 · (A · \\vec{v_2}) + \\cdots + \\alpha_k · (A · \\vec{v_k}) = \\vec{0}', false)}

Therefore, the same k scalars, ${lx('{\\alpha_1, \\alpha_2, \\dots, \\alpha_k}')} show the linear dependence of the vectors ${lx('{A\\vec{v_1}, A\\vec{v_2}, \\dots, A\\vec{v_k}}')} as requested.<br/>

Note: There are alternative and equivalent implications of linear dependence that can be used in the proof (in place of Equation 9). Here are a few of them:<br/>
(a) The vector ${lx('\\vec{v_k}')} can be represented as a linear combination of the other vectors as follows: There exist scalars ${lx('\\vec{\\alpha_1} + \\vec{\\alpha_2} + \\dots + \\vec{\\alpha_{k-1}}')} such that
${lx('\\alpha_1 · \\vec{v_1} + \\alpha_2 · \\vec{v_2} + \\dots + \\alpha_{k-1} · \\vec{k - 1} = \\vec{k}', false)}
(in this alternative, the scalars may all be zeros, and the linear combination in the left hand side must exclude ${lx('\\vec{v_k}')})<br/>

(b) Some vector ${lx('\\vec{v_j}')} can be represented as a linear combination of the other vectors as follows: There exist scalars ${lx('\\alpha_i, 1 \\le i \\le k, i \\ne j')} such that
${lx('\\sum_{i=1, i \\ne j}^{k} \\alpha_i · \\vec{v_i} = \\vec{v_j}')}

(in this alternative, the scalars may all be zeros, and the linear combination in the left hand side must exclude ${lx('\\vec{v_j}')})

(c) There exists ${lx('1 \\le j \\le k')} such that ${lx('\\vec{v_j}')} can be represented as a linear combination of the ${lx('\\vec{v_1}, \\vec{v_2}, \\dots, \\vec{v_{j-1}}')} as follows: There exist scalars ${lx('\\alpha_1, \\alpha_2, \\dots, \\alpha_{j-1}')} such that
${lx('\\sum_{i=1}^{j-1} \\alpha_i · \\vec{v_i} = \\vec{v_j}')}

(in this alternative, the scalars may all be zeros, and the linear combination in the left hand side must exclude ${lx('\\vec{v_j}')})

For any of these alternatives, the rest of the proof is similar to the one demonstrated above (multiply both sides by ${lx('A')} and then apply the linearity of matrix multiplication to push the ${lx('A')} inside the relevant sum and next to the ${lx('\\vec{v_i}')}) and will result in an equation similar to Equation 14 (that matches the alternative chosen).<br/>
Common mistakes included:
<ul>
<li>When using the definition provided in Equation 9, not indicating that the at least one of scalars needs to be different than zero.</li>
<li>When using the definition provided in Equation 9, stating that all scalars need to be different than zero.</li>
<li>When using any of the alternative implications (a)-(c) above, requiring that at least one scalar be different than zero (or all different than zero).</li>
<li>When using any of the alternative implications (a)-(c) above, not excluding the vector on the right hand side from the linear combination on the left hand side.</li>
</ul>
`;

const fa15q6 = 
`
<h3>6. Null It</h3>

What is the null space of the matrix
\\(\\left[
\\begin{array}{ c c c c }
1 & 1 & −2 & 3 \\\\
0 & 0 & −1 & 2 \\\\
0 & 0 & 3 & -6 \\\\
\\end{array}\\right]\\)
?
`;

const fa15q6_soln =
`
We solve ${lmatrix([[1, 1, -2, 3], [0, 0, -1, 2], [0, 0, 3, -6]])} · ${lmatrix([['x_1'], ['x_2'], ['x_3'], ['x_4']])} = ${lmatrix([[0], [0], [0]])}<br/>

${lmatrix([[1, 1, -2, 3, '\\vdots', 0], [0, 0, -1, 2, '\\vdots', 0], [0, 0, 3, -6, '\\vdots', 0]])} ${lx('\\implies')} ${lmatrix([[1, 1, 0, -1, '\\vdots', 0], [0, 0, 1, -2, '\\vdots', 0], [0, 0, 0, 0, '\\vdots', 0]], false, false)}

Now we can set ${lx('x_2')} and ${lx('x_4')} as free variables and write the following system of equations:<br/>

${lx('x_1 = -a + b', false)}
${lx('x_2 = a', false)}
${lx('x_3 = 2b', false)}
${lx('x_4 = b', false)}

${lmatrix([['x_1'], ['x_2'], ['x_3'], ['x_4']]) = ${lx('a')}${lmatrix([[-1], [1], [0], [0]])} + ${lx('b')}${lmatrix([[1], [0], [2], [1]])}<br/>

Thus the nullspace of the matrix is:
${lx('span \\left{ \\begin{array}{c}-1 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ \\end{array} , \\begin{array}{c}1 \\\\ 0 \\\\ 2 \\\\ 1 \\end{array} \\right}', false)}
`;

const img7a = require('../img/fa16q7-1.png');
const fa15q7a =
`
<h3>7. Finding the Bright Cave <i>(27pts total)</i></h3>

Nara the one-handed druid and Kody the one-handed ranger ﬁnd themselves in dire straits. Before them is a cliff with four cave entrances arranged in a square: two upper caves and two lower caves. Each entrance emits a certain amount of light, and the two wish to ﬁnd exactly the amount of light coming from each cave. Here’s the catch: after contracting a particularly potent strain of ghoul fever, our intrepid heroes are only able to see the total intensity of light before them (so their eyes operate like a single-pixel camera). Kody and Nara are capable adventurers. But they don’t know any linear algebra - and they need your help.<br/><br/>

Kody proposes an imaging strategy where he uses his hand to completely block the light from two caves at a time. He is able to take measurements using the following four masks (black means the light is blocked from that cave):

<img src="${img7a}" class="problem-image" />

<p align="center">Figure 1: Four image masks.</p><br/>

<b>(a)</b> <i>(5pts)</i> Let \\(\\vec{x}\\) be the four-element vector that represents the magnitude of light emanating from the four cave entrances. <b>Write a matrix \\(K\\) that performs the masking process in Fig. 1 on the vector \\(\\vec{x}\\), such that \\(K\\vec{x}\\) is the result of the four measurements.</b>
`;

const fa15q7a_soln =
`
${lx('\\vec{m} = K · \\vec{x}', false)}
${lx('\\begin{array}{c} m_1 \\\\ m_2 \\\\ m_3 \\\\ m_4 \\\\\ \\end{array} = \\begin{array}{c c c c} 1 & 0 & 1 & 0 \\\\ 1 & 1 & 0 & 0 \\\\ 0 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 1 \\\\ \\end{array} \\begin{array}{c} x_1 \\\\ x_2 \\\\ x_3 \\\\ x_4 \\\\ \\end{array}', false)}

Note here that ${lx('\\vec{m}')} is the vector of Kody's measurements. The order of the rows does not matter (as long as you tell us which measurement they each correspond to), but the order of the columns does. Re-arranging the columns results in a different set of masks.
`;

const fa15q7b =
`
<b>(b)</b> <i>(10pts)</i> Does Kody’s set of masks give us a unique solution for all four caves’ light intensities? Why or why not?
`;

const fa15q7b_soln =
`
Nope!<br/>
Two solutions are acceptable:<br/>
1) Notice that the sum of masks 1 and 3 will hvae exactly the same result as sum of masks 2 and 4. So the four rows must be linearly dependent and hence ${lx('K')} has a nontrivial nullspace. Consequently, there would be infinitely valid solutions to any measurements taken.<br/>
2) Perform row reduction to see that the rows (and therefore the columns) do not span ${lx('\\mathbb{R}^4')}; In this case, ${lx('\\mathbb{R}^4')} is equivalent to all possible light intensities of the caves.

${lmatrix([[1, 0, 1, 0], [1, 1, 0, 0], [0, 1, 0, 1], [0, 0, 1, 1]], false, false)}
${lmatrix([[1, 0, 1, 0], [0, 1, -1, 0], [0, 1, 0, 1], [0, 0, 1, 1]], false, false)}
${lmatrix([[1, 0, 1, 0], [0, 1, -1, 0], [0, 0, 1, 1], [0, 0, 1, 1]], false, false)}
${lmatrix([[1, 0, 1, 0], [0, 1, -1, 0], [0, 0, 1, 1], [0, 0, 0, 0]], false, false)}
`;

const fa15q7c =
`
<b>(c)</b> <i>(12pts)</i> Nara, in her inﬁnite wisdom, places her one hand diagonally across the entrances, covering two of the cave entrances. However her hand is not wide enough, letting in 50% of the light from the caves covered and 100% of the light from the caves not covered. The following diagram shows the percentage of light let through from each cave:

$$
\\begin{array}{|c|c|c|c|}
\\hline
50\\% & 100\\% \\\\ \\hline
100\\% & 50\\% \\\\ \\hline
\\end{array}
$$

<b>Does this additional measurement give them enough information to solve the problem? Why or
why not?</b>
`;

const fa15q7c_soln =
`
The answer is yes, the additional measurement does give them enough information to solve the problem. Since Nara’s measurement is linearly independent from the other four, we are now able to solve for all four light intensities uniquely.<br/>
This can be shown using Gaussian elimination with the addition of the following equation:<br/>
${lx('m_5 = \\frac{1}{2}x_1 + x_2 + x_3 + \\frac{1}{2}', false)}

At this point you can either add this equation to make a 5x4 system of equations, or you can remove one of Kody’s masks to make a 4x4 system of equations. Here, we write it as a 5x4 matrix:

${lmatrix([[1, 0, 1, 0], [1, 1, 0, 0], [0, 1, 0, 1], [0, 0, 1, 1], [0.5, 1, 1, 0.5]], false, false)}
${lmatrix([[1, 0, 1, 0], [0, 1, -1, 0], [0, 1, 0, 1], [0, 0, 1, 1], [0, 1, 0.5, 0.5]], false, false)}
${lmatrix([[1, 0, 1, 0], [0, 1, -1, 0], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1.5, 0.5]], false, false)}
${lmatrix([[1, 0, 1, 0], [0, 1, -1, 0], [0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, -1]], false, false)}

Notice here that in spite of the row of zeros, we still have four pivot columns. In other words, we have a system of four unkowns and four linearly independent equations. Therefore, we can uniquely determine all four light intensities given Nara’s added measurement.
`;

const img8a = require('../img/fa16q8-1.png');
const fa15q8a =
`
<h3>8. A Tale of Two Cities <i>(24pts +15pts)</i></h3>

<b>[NOTE: The last two parts of this problem are extra credit. Do them if you have time, but don’t get stuck on them if you don’t.]</b><br/><br/>
There are two isolated cities in the desert. They each have their own network of roads and intersections, as shown in Figure 2. (Note: The arrows are oriented arbitrarily – net trafﬁc can ﬂow in either direction along a road). The citizens of these cities are careful drivers, and consequently, the net trafﬁc ﬂows along roads always obey the ﬂow conservation constraints (net cars per hour into an intersection equals the net cars per hour leaving that intersection).

<img src="${img8a}" class="problem-image" />

<p align="center">Figure 2: The trafﬁc networks of two isolated cities.</p><br/>

<b>(a)</b> <i>(7pts)</i> We know how to model the net trafﬁc ﬂows within each city individually (from the Homework). We would like to jointly model the net trafﬁc ﬂows of both cities. That is, let the net trafﬁc ﬂow (cars/hr) along all roads be described by a vector

$$
\\vec{t} =
\\begin{bmatrix}
t_1 \\\\
t_2 \\\\
t_3 \\\\
t_4 \\\\
t_5 \\\\
t_6 \\\\
\\end{bmatrix}
$$

Find a matrix \\(B\\) such that the set of valid net trafﬁc ﬂows is exactly the nullspace of \\(B\\) (i.e., all \\(\\vec{t}\\) such that \\(B\\vec{t} = \\vec{0}\\)).
`;

const fa15q8a_soln =
`
B is the incidence matrix of the traffic network:
${lx('B = \\begin{array}{c c c c c c} -1 & 0 & +1 & 0 & 0 & 0 \\\\ +1 & -1 & 0 & 0 & 0 & 0 \\\\ 0 & +1 & -1 & 0 & 0 & 0 \\\\ 0 & +1 & -1 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & -1 & 0 & +1 \\\\ 0 & 0 & 0 & +1 & -1 & 0 \\\\ 0 & 0 & 0 & 0 & +1 & -1 \\\\ \\end{array}', false)}

There is one row per node, corresponding to the constraint that the net flow of traffic into the node is 0. In the above ${lx('B')}, we ordered nodes as ${lx('A, B, C, D, E, F')}, and used the convention that a positive value of ${lx('t_i')} means a positive net flow directed along the arrow of ${lx('t_7')}. Any matrix row-equivalent to ${lx('B')} is correct. (In particular, this means the sum of each column of ${lx('B')} must be 0.)
`;

const img8b = require('../img/fa16q8-2.png');
const fa15q8b =
`
<b>(b)</b> <i>(5pts)</i> A new road is constructed between the two cities, as shown in Figure 3.

<img src="${img8b}" class="problem-image" />

<p align="center">Figure 3: The trafﬁc network after a new road is constructed.</p><br/>

Let trafﬁc ﬂows be described by a vector

$$
\\vec{t} =
\\begin{bmatrix}
t_1 \\\\
t_2 \\\\
t_3 \\\\
t_4 \\\\
t_5 \\\\
t_6 \\\\
t_7 \\\\
\\end{bmatrix}
$$

<b>Find a matrix \\(B\\) such that the valid trafﬁc ﬂows are exactly the nullspace of \\(B'\\).</b><br/>
<i>Hint: \\(B'\\) will have the form</i>

$$
B'
=
\\left[
\\begin{array}{c|c}
B & \\vec{b}
\\end{array}
\\right]
$$

<i>as in you only need to add a single column \\(\\vec{b}\\) to the matrix B from the previous part. Feel free to just write down the vector \\(\\vec{b}\\). You don’t have to write out the numbers of B again.</i>
`;

const fa15q8b =
`
The column ${lx('\\vec{b}')} corresponds to the road ${lx('t_7')}, which exits node ${lx('C')} and enters node ${lx('E')}:

${lx('\\vec{b} = \\begin{array}{c} 0 \\\\ 0 \\\\ -1 \\\\ 0 \\\\ +1 \\\\ 0 \\\\ \\end{array}', false)}

(In our ${lx('B')} from the previous part, node ${lx('C')} corresponds to the third row, and node ${lx('E')} corresponds to the fifth row). Note that this must be consistent with the previous part: If you constructed ${lx('B')} using a different ordering of nodes (that is, if the rows of ${lx('B')} were permuted), then the entries in ${lx('\\vec{b}') must be permuted accordingly.<br/>

Written explicitly, ${lx("B'")} is:

${lx('B = \\begin{array}{c c c c c c} -1 & 0 & +1 & 0 & 0 & 0 & 0 \\\\ +1 & -1 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 \\\\ 0 & 0 & 0 & -1 & 0 & +1 & 0 \\\\ 0 & 0 & 0 & +1 & -1 & 0 & +1 \\\\ 0 & 0 & 0 & 0 & +1 & -1 & 0 \\\\ \\end{array}', false)}

Any explicit ${lx("B'")} that is row-equivalent to this is also correct.
`;

const fa15q8c =
`
<b>(c)</b> <i>(12pts)</i> Does adding this additional road change the possible trafﬁc ﬂows of the two cities? That is,
is there any valid ﬂow \\(\\vec{t}\\) for which the additional road has non-zero ﬂow (\\(t_7 \\ne 0\\))? <b>Give an explicit example of such a ﬂow or an argument why one cannot exist.</b><br/><br/>
(<i>Hint: One way of doing this is to recall that each row in the incidence matrix corresponds to the constraint that the total ﬂow into an intersection is zero. Can you interpret the constraint resulting from the sum of all the rows corresponding to intersections in a city?</i>)
`;

const fa15q8c_soln =
`
No, any valid flow ${lx('\\vec{t}')} must have ${lx('t_7 = 0').
There are several ways to see this. First, intuitively: If for example ${lx('t_7 > 0')}, then there is a net flow of cars from the first city to the second. Thus, at least intuitively, some conservation constraint must be violated, because cars are “draining” from the first city and “accumulating” in the second. But our conservation constraints say that this accumulation cannot happen at any single intersection, and so it cannot happen at all within a city (which is a collection of intersections). Development of this intuitive argument received partial credit.<br/><br/>
The formal argument suggested in the hint is: Consider summing all the constraints corresponding to nodes in the first city (that is, the first 3 rows of ${lx("B'")}). Each row corresponds to the constraint that the net flow into an intersection is zero. Summing a set of rows corresponds to the constraint that the net flow into a <i>set of intersections</i> is zero. Thus, summing the first three rows will yield the constraint that the net flow into the first city is zero. But ${lx('t_7')} is the only road out of the first city, so ${lx('t_7 = 0')}.<br/><br/>
Explicitly, any valid ${lx('\\vec{t}')} satisfies
${lx("B'\\vec{t} = \\vec{0}", false)}

Therefore, it must also satisfy:<br/>
${lx("\\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array}B'\\vec{t} = \\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array} \\vec{0}", false)}

Which simplifies to:
${lx("\\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array}B'\\vec{t} = \\vec{0}")}

${lx("\\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array} \\begin{array}{c c c c c c} -1 & 0 & +1 & 0 & 0 & 0 & 0 \\\\ +1 & -1 & 0 & 0 & 0 & 0 & 0 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 \\\\ 0 & 0 & 0 & -1 & 0 & +1 & 0 \\\\ 0 & 0 & 0 & +1 & -1 & 0 & +1 \\\\ 0 & 0 & 0 & 0 & +1 & -1 & 0 \\\\ \\end{array} \\vec{t} = \\vec{0}", false)}

${lx("\\begin{array}{c c c c c c c}0 & 0 & 0 & 0 & 0 & 0 & -1 \\\\ \\end{array} \\vec{t} = 0", false)}

Which is just the constrant ${lx('-t_7 = 0')}.
<i>Remark</i>: Notice that this argument easily generalizes to the case of two arbitrarily-complex isolated cities, connected by a single road.<br/>
<b>Alternate Solutions:</b> Any correct formal argument received full credit. For example, noticing that ${lx('t_1 = t_2 = t_3')}, and therefore ${lx('t_7 = 0')}, by considering the constraint of node ${lx('C')}. It was also possible to row-reduce ${lx("B'")}, find a basis for the nullspace, and argue that all basis vectors have ${lx('t_7 = 0')}.
`;

const img8d = require('../img/fa16q8-3.png');
const fa15q8d =
`
<b>(d)</b> <i>(BONUS 5pts)</i> Now suppose instead that <i>two</i> roads are constructed between the cities, as shown in Figure 4.

<img src="${img8d}" class="problem-image" />

<p align="center">Figure 4: The trafﬁc network after two new roads are constructed.</p><br/>

Let trafﬁc ﬂows be described by a vector \\(\\vec{t} \\in R^8\\).<br/>
Does adding this additional pair of roads change the possible trafﬁc ﬂows of the two cities (beyond the case when the two cities were not connected)? That is, is there any valid ﬂow \\(\\vec{t}\\) for which at least one of the additional roads has non-zero ﬂow (\\(t_7 \\ne 0\\) or \\(t_8 \\ne 0\\))? <b>Give an explicit example of such a ﬂow or an argument why one cannot exist.</b>
`;

const fa15q8d_soln =
`
Yes, there are new flows possible here. For example, the flow around the loop ${lx('C - E - F - B')}:

${lx('\\vec{t} = \\begin{array}{c} 0 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 1 \\\\ 0 \\\\ 1 \\\\ 1 \\\\ \\end{array}', false)}

Any <i>explicit</i> valid flow vector ${lx('\\vec{t}')} with ${lx('t_7 \\ne 0')} received full credit.
`;

const fa15q8e =
`
<b>(e)</b> <i>(BONUS 10pts)</i> Before they were connected, both cities individually had sensors set up to measure their trafﬁc ﬂows. That is, they measured the ﬂows along some set of roads, and were able to re-construct the ﬂows along all roads in their <i>isolated</i> city. After the two new roads of Figure 4 were constructed, the state’s engineers added two additional sensors, one on each road (on \\(t_7\\) and \\(t_8\\)). Using the data from each city’s sensors, and these two new sensors, they were able to recover the ﬂows of all roads in the network.<br/><br/>
However, one day the sensor on \\(t_7\\) breaks. <b>Can they still recover all the ﬂows, using only the remaining sensors? Give an argument for why or why not.</b>
`;

const fa15q8e_soln =
`
Yes. First, we will show that ${lx('t_7')} = ${lx('t_8')} for all valid flows. Therefore, they can recover the value of the broken sensor at ${lx('t_7')}, knowing only the value of ${lx('t_8')}. Now the situation is as if all the sensors were working, so by assumption they can recover all the flows.<br/>
We can show that ${lx('t_7')} = ${lx('t_8')} analogously to the argument for part (c). Intuitively, this is true because the net flow into the first city must be zero. (In fact, our argument from part (c) is exactly how to make this intuition formal).
In this case, the incidence matrix is the following:

${lx('B\'\' = \\begin{array}{c c c c c c} -1 & 0 & +1 & 0 & 0 & 0 & 0 & 0 \\\\ +1 & -1 & 0 & 0 & 0 & 0 & 0 & +1 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 & 0 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & -1 & 0 & +1 & 0 & 0 \\\\ 0 & 0 & 0 & +1 & -1 & 0 & +1 & 0 \\\\ 0 & 0 & 0 & 0 & +1 & -1 & 0 & -1 \\\\ \\end{array}', false)}

(Which has two additional columns over ${lx('B')} from the first part).<br/>
Now, any valid ${lx('\\vec{t}')} satisfies
${lx('B\'\'\\vec{t} = \\vec{0}', false)}

Therefore, it must also satisfy:<br/>
${lx("\\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array}B''\\vec{t} = \\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array} \\vec{0}", false)}

Which simplifies to:
${lx("\\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array}B''\\vec{t} = \\vec{0}")}

${lx("\\begin{array}{c c c c c c}1 & 1 & 1 & 0 & 0 & 0 \\\\ \\end{array} \\begin{array}{c c c c c c} -1 & 0 & +1 & 0 & 0 & 0 & 0 & 0 \\\\ +1 & -1 & 0 & 0 & 0 & 0 & 0 & +1 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 & 0 \\\\ 0 & +1 & -1 & 0 & 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & -1 & 0 & +1 & 0 & 0 \\\\ 0 & 0 & 0 & +1 & -1 & 0 & +1 & 0 \\\\ 0 & 0 & 0 & 0 & +1 & -1 & 0 & -1 \\\\ \\end{array} \\vec{t} = \\vec{0}", false)}

${lx("\\begin{array}{c c c c c c c}0 & 0 & 0 & 0 & 0 & 0 & -1 & +1 \\\\ \\end{array} \\vec{t} = 0", false)}

Which is just the constrant ${lx('-t_7 + t_8 = 0')}.<br/><br/>

<b>Alternate Solutions:</b>
It was also possible to row-reduce ${lx("B''"}), find a basis for the nullspace, and show that all basis vectors have t7 = t8 (and therefore all valid flows must have ${lx('t_7')} = ${lx('t_8')} as well).<br/>
Notice that in this problem, we do not know the exact sensor placements of each city. Solutions which made assumptions about the particular sensor arrangements of the cities received partial credit. (In theory, it was possible to enumerate all possible valid sensor arrangements, and confirm that each one works by the procedure of Homework 3.)<br/>
Some students argued that it is sufficient to have one sensor per “independent loop”. And since the cities already had sensors on their individual loops (necessarily, by assumption), it is sufficient to have one sensor on the new “independent loop” created by adding the two new roads. This is correct intuition. However, the concept of “independent loop” was not defined or developed in this class, so any argument using “independent loops” without definition only received partial credit.
`;

const img9a = require('../img/fa16q9-1.png');
const fa15q9a =
`
<h3>9. Justin Beaver <i>(43pts)</i></h3>

In Homework 3, there was a question about Justin Bieber’s Segway — that was about controlling a multi-dimensional system with one control input. In this problem, we will instead think about a curious and superintelligent beaver watching the water level in a pool — this is implicitly about how many sensors are needed to measure the state of a multi-dimensional system.<br/><br/>
Three superintelligent rodents live in a network of pools. Justin Beaver lives in pool 1. Selena Gopher lives in pool 2. And Mousey Cyrus lives in pool 3. They are sadly not on talking terms, but Justin really wants to know about the other pools.<br/><br/>
Suppose there is a network of pumps connecting the three different pools, given in the ﬁgure. \\(x_1[t]\\), \\(x_2[t]\\), and \\(x_3[t]\\) is the water level in each pool at time step \\(t\\). At each time step, the water from each pool is pumped along the arrows. The water levels are updated according to the matrix

<img src="${img9a}" class="problem-image" />

<b>(a)</b> <i>(5pts)</i> Justin lives in pool 1 so he can watch the water level in this pool. He also knows exactly how the pumps work — i.e., knows the pump matrix A. <b>Can Justin ﬁgure out the initial water levels in all three pools just by watching the water levels in his pool as time goes by? Describe (brieﬂy) in words how to do this. How many times does Justin need to observe the water in his own pool to
ﬁgure this out?</b><br/><br/>
<i>(Hint: No “linear algebra” machinery is needed here. Just think about what Justin observes as time goes by.)</i>
`;

const fa15q9a_soln =
`
Because the water flow from one pool into another is fairly simple in this system, we can figure out intuitively that Justin will be able to figure out the initial water level in each pool. (We will see later that in situations where the system of pumps is more complex, we will need to be much more careful. There are some more complex systems of pumps that will be able to effectively hide information about water levels in the other pools from Justin.)<br/>
In this case, however, Justin’s analysis is straight-forward. At each time step, all the water from pool 1 flows into pool 3, all the water from pool 2 flows into pool 1, and all the water from pool 3 flows into pool 2. Because of the cyclic way in which the water flows, Justin only has to wait 3 time steps in order to figure out the initial water level in each pool. At time step t=0, Justin can measure the initial water level in pool 1. At time t=1, the water level in pool 1 will be equivalent to the initial water level in pool 2, and at time t=2, the water level in pool 1 will be equivalent to the initial water level in pool 3. Thus Justin needs to wait 3 time steps (including the initial time step) – t=0, t=1, and t=2 – in order to figure out the initial water levels in all the pools.
`;

const fa15q9b =
`
<b>(b)</b> <i>(5pts)</i> Consider now a general pump matrix A that is known to Justin, not necessarily the one in the example above. Just for this part, suppose Justin had been told the initial water levels \\(\\vec{x}[0]\\) by someone else. Could he ﬁgure out \\(\\vec{x}[t]\\)? <b>Write an expression for \\(\\vec{x}[t]\\) given the initial levels \\(\\vec{x}[0]\\) and the pump matrix \\(A\\)</b>.
`;

const fa15q9b_soln =
`
If Justin knows ${lx('\\vec{x}[0]')}, he can use what he knows about how the system changes over time (the dynamics of the system) to figure out ${lx('\\vec{x}[t]')}. These dynamics are summarized in the pump matrix ${lx('A')}. ${lx('A')} tells us how ${lx('\\vec{x}')} updates at each time step. Every time we multiple on the left by ${lx('A')}, we figure out what ${lx('\\vec{x}')} will be one time step in the future. Thus we can calculate

${lx('\\vec{x}[1] = A\\vec{x}[0]', false)}
${lx('\\vec{x}[2] = A\\vec{x}[1] = A(A\\vec{x}[0]) = A^2\\vec[0]', false)}
${lx('\\vec{x}[3] = A\\vec{x}[2] = A^3(\\vec{x}[0])', false)},

Thus the general expression for ${lx('\\vec{x}[t]')} in terms of ${lx('A')} and ${lx('\\vec{x}[0]')} is

${lx('\\vec{x}[t] = A^t\\vec{x}[0]', false)}

This expression is useful for calculating the initial water levels (as we will see in part (d)). It is also interesting because it points out that if Justin is able to calculate ${lx('\\vec{x}[0]')} then he really is able to calculate the water level of each pool at any time step in the future using this equation.
`;

const fa15q9c =
`
<b>(c)</b> <i>(5pts)</i> Suppose we use \\(y[t]\\) to denote Justin’s measurement of the water level in pool 1 at time t. We know that \\(y[t] = x_1[t]\\). <b>Find a vector \\(\\vec{c}\\) such that
$$y[t] = \\vec{c}_T\\vec{x}[t]$$
`;

const fa15q9c_soln =
`
In this problem, we want to mathematically describe what Justin is doing when he measures the water level in his pool. He is measuring ${lx('x_1')} which is the first element of the vector ${lx('\\vec{x}')}. We can describe this measuring process as taking the inner product of ${lx('\\vec{c}')} and specific vector ${lx('\\vec{c}')}. That vector ${lx('\\vec{c}')} is given by

${lx('\\vec{c} = \\begin{array}{c} 1 \\\\ 0 \\\\ 0 \\\\ \\end{array}', false)}

Thus we have

${lx('y[t] = <\\vec{c}, \\vec{x}[t]> = \\vec{c}^T\\vec{x}[t] = \\begin{array}{c c c}1 & 0 & 0 \\end{array} \\begin{array}{c} x_1[t] \\\\ x_2[t] \\\\ x_3[t] \\\\ \\end{array} = 1 · x_1[t] + 0 · x_2[t] + 0 · x_3[t] = x_1[t]', false)}

as desired.
`;

const fa15q9d =
`
<b>(d)</b> <i>(5pts)</i> We want to know if tracking the water level in pool 1 is enough to eventually ﬁgure out the initial water level in all the pools. First <b>find a matrix \\(D\\) in terms of \\(c\\) and \\(A\\) (and powers of \\(A\\)) such that</b>

$$
\\begin{bmatrix}
y[0] \\\\
y[1] \\\\
\\vdots \\\\
y[T − 1] \\\\
\\end{bmatrix}
=
\\begin{bmatrix}
D
\\end{bmatrix}
\\begin{bmatrix}
x1[0] \\\\
x2[0] \\\\
x3[0] \\\\
\\end{bmatrix}
$$

<i>(Hint: Think about what the rows of \\(D\\) should be. It sufﬁces to give an expression for the jth row \\(D_j\\) of \\(D\\).)</i><br/><br/>
`;

const fa15q9d_soln =
`
Now we start getting into the heart of the problem. We want to figure out how Justin can calculate the initial water levels even if the pump matrix A is not as simple as in part (a).<br/>
Over time Justin will acquire a bunch of measurements of the water level in his pool,
${lx('y[0], y[1], \\dots , y[t]')}. We want to write these measurements in terms of ${lx('\\vec{c}')}, ${lx('A')}, and ${lx('\\vec{x}[0]')} so that we can write a system of equations that will allow us to solve for ${lx('\\vec{x}[0]')}.

Using the expressions from parts (b) and (c), we can write
${lx('y[t] = \\vec{c}^Tx[t] = \\vec{c}^TA^t\\vec{x}[0]', false)}

Writing each measurement as a row of a mtrix equation we get
${lx('\\begin{array}{c} y[0] \\\\ y[1] \\\\ \\vdots \\\\ y[T - 1] \\\\ \\end{array} = \\begin{array}{c} \\vec{c}^T \\vec{x}[0] \\\\ \\vec{c}^T A\\vec{x}[0] \\\\ \\vdots \\\\ \\vec{c}^T A^{T - 1}\\vec{x}[0] \\end{array} = \\begin{array}{c} \\vec{c}^T \\\\ \\vec{c}^T A \\\\ \\vdots \\\\ \\vec{c}^T A^{T - 1} \\end{array} \\vec{x}[0]', false)}

Thus if you count the first row as row 1, the second row as row 2, etc, then the <i>j</i>th row of D, ${lx('D_j')}, can be written as

${lx('D_j = \\vec{c}^T A^{j-1}', false)}

It was also fine if you counted the first row as row 0, the second row as row 1, etc. In this case, ${lx('D_j')}, is given by

${lx('D_j = \\vec{c}^T A^{j}', false)}
`;

const img9e = require('../img/fa16q9-2.png');
const fa15q9e =
`
<b>(e)</b> <i>(13pts)</i> Now assume we have a speciﬁc network of pumps with a different pump matrix.

<img src="${img9e}" class="problem-image" />

Given this speciﬁc A matrix, <b>how many time steps \\(T\\) of observations in pool 1 will Justin need in order to recover the initial water levels \\(\\vec{x}[0]\\)? Argue why this number of observations is enough.</b>
`;

const fa15q9e_soln =
`
Using the equation from part (d), we can start to see when Justin will be able to recover ${lx('\\vec{x}[0]')} based on a specific ${lx('A')} matrix. In order to find a unique ${lx('\\vec{x}[0]')}, Justin needs to be able to solve the equation

${lx('\\begin{array}{c} y[0] \\\\ y[1] \\\\ \\vdots \\\\ y[T - 1] \\\\ \\end{array} = \\begin{array}{c} \\vec{c}^T \\\\ \\vec{c}^T A \\\\ \\vdots \\\\ \\vec{c}^T A^{T - 1} \\\\ \\end{array} \\vec{x}[0]', false)}


The first thing we notice is that after a few time steps, Justin will have more equations than unknowns. Often times when there are more equations than unknowns the system has no solution. However, in this case since each physical measurement y (the water level in pool 1) is the result of a physical process (water being pumped between pools according to ${lx('A')}) starting from some real initial water level, ${lx('\\vec{x}[0]')}, we know that that real initial water level, ${lx('\\vec{x}[0]')} will be a solution. Thus we know that a solution exists.<br/><br/>

What is not obvious immediately is whether our system of equations gives us enough information to solve for the real solution. It is possible that there will be multiple ${lx('\\vec{x}[0]')}’s that solve this equation. In this case, we won’t be able to figure out the initial water levels.<br/><br/>

To see how this might happen, suppose that all but two of the measurements summarized in the equation above are redundant, i.e. the row vectors ${lx('\\vec{c}^T, \\vec{c}^T A, \\dots, \\vec{c}^T A^{T-1}')} are linearly dependent living in some two dimensional subspace of ${lx('\\mathbb{R}^3')}. In this case if, we row reduce ${lx('D')}, we will end up with zeros in all the rows except 2. This means that we will have only 2 pivots and thus 1 free variable. Therefore, ${lx('D')} has a nullspace that contains more than just ${lx('\\vec{0}')} (${lx('D')} has a non-trivial nullspace).<br/><br/>

This is problematic because multiple different initial water levels will give the same measurements. Consider the true initial water level ${lx('\\vec{x}[0]')} and a vector that lives in the nullspace of ${lx('D, \\vec{x}_{NS}[0]')}. Note that through our measurement process, we won’t be able to tell the difference between ${lx('\\vec{x}[0]')} and ${lx('\\vec{x}[0] + \\vec{x}_{NS}[0]')} since both of them will give the same sequence of measurements ${lx('y[0], y[1], \\dots, y[T - 1]')}.

${lx('\\left[ D \\right] \\left( \\vec{x}[0] + \\vec{x}_{NS}[0] \\right) = \\left[ D \\right] \\vec{x}[0] + \\left[ D \\right] \\vec{x}_{NS}[0] = \\left[ D \\ right]\\vec{x}[0]', false)}

Thus in order to determine ${lx('\\vec{x}[0]')} uniquely we need <b>at least 3 rows of ${lx('D')} to be linearly independent. It turns out that the first three rows ⃗cT ,⃗cT A, and ⃗cT A2 are linearly independent thus Justin needs only 3 time steps (t = 0,t = 1,t = 2) to solve for ⃗x[0]. In order to get full credit on this part, you had to show that the first three rows are linearly independent. The easiest way to show this is by doing Gaussian elimination which we will do when we solve for the answer in part (f). [It is perfectly ok to point to a later problem part when solving a problem.] Note that you could also use three other linearly independent rows to solve for the solution but the first three rows are the easiest to calculate.
  Here we see also why we have to be careful if A is more complicated. For a complicated A, it is difficult to tell if the vectors ⃗cT ,⃗cT A,⃗cT A2 , . . . will span all of R3 until we calculate them out. If they don’t span R3, then D will have a non-trivial nullspace and this nullspace represents a set of initial water levels that are hidden from Justin’s measurements. There is a general condition called observability of A and ⃗c that tells us when this nullspace exists. It has to do with the relationship between ⃗c and the eigenvectors of the matrix A. Maybe we’ll get it to it later in the course or in EE16b.
`;

const fa15q9f =
`
<b>(f)</b> <i>(10pts)</i> For the T chosen in the previous part and the pump matrix \\(A\\) given there, suppose Justin measures

$$
y[t] = 1 \\qquad for \\; t = 0, \\, 1, \\, \\dots, \\, (T − 1)
$$

<b>What was \\(\\vec{x}[0]\\)? (Show work)</b>
`;

var Scroll = require('react-scroll');
var scroller = Scroll.scroller;
var Sticky = require('react-stickynode');

class EE16AFa15 extends Component {
  render() {
    const examCode = 'ee16a-fa15';
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
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q3', {
              duration: 500,
              smooth: true,
            })}>3. Solve It</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q4', {
              duration: 500,
              smooth: true,
            })}>4. Invert It</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q5', {
              duration: 500,
              smooth: true,
            })}>5. Show It</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q6', {
              duration: 500,
              smooth: true,
            })}>6. Null It</a></div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q7a', {
              duration: 500,
              smooth: true,
            })}>7. Finding the Bright Cave</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q8a', {
              duration: 500,
              smooth: true,
            })}>8. A Tale of Two Cities</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q9a', {
              duration: 500,
              smooth: true,
            })}>9. Justin Beaver</a></div>
        </Sticky>
        <div className="sidebar mobile">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Straightforward Questions</div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q3', {
              duration: 500,
              smooth: true,
            })}>3. Solve It</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q4', {
              duration: 500,
              smooth: true,
            })}>4. Invert It</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q5', {
              duration: 500,
              smooth: true,
            })}>5. Show It</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q6', {
              duration: 500,
              smooth: true,
            })}>6. Null It</a></div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q7a', {
              duration: 500,
              smooth: true,
            })}>7. Finding the Bright Cave</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q8a', {
              duration: 500,
              smooth: true,
            })}>8. A Tale of Two Cities</a></div>
          <div><a className="sidetab" onClick={() => scroller.scrollTo('q9a', {
              duration: 500,
              smooth: true,
            })}>9. Justin Beaver</a></div>
        </div>
        <div className="content">
          <hr className="s5" />
          <h2>Straightforward questions <i>(24 points)</i></h2>
          <hr className="s2" />
          <p>Unless told otherwise, you must show work to get credit. There will be very little partial credit given in this section. You get one drop: do 3 out of the following 4 questions. (We will grade all 4 and keep the best 3 scores.) Each problem is worth 8 points. Students who get all 4 questions correct will receive some bonus points (6 points).</p>
          <hr className="s5" />
          <Question id={"q3"} content={fa15q3} variables={['x_1', 'x_2']} image={['q3.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q4"} content={fa15q4} rows={2} cols={2} image={['q4-1.png', 'q4-2.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q5"} content={fa15q5} hasResponse={false} image={['q5-1.png', 'q5-2.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q6"} content={fa15q6} hasResponse={false} image={['q6-1.png', 'q6-2.png']} examCode={examCode} />
          <hr className="s5" />
          <h2>Free-form Problems <i>(94 + 15 points)</i></h2>
          <hr className="s5" />
          <Question id={"q7a"} content={fa15q7a} rows={4} cols={4} image={['q7a.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q7b"} content={fa15q7b} on="Yes" off="No" image={['q7b.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q7c"} content={fa15q7c} on="Yes" off="No" image={['q7c.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q8a"} content={fa15q8a} rows={6} cols={6} image={['q8a.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q8b"} content={fa15q8b} rows={6} cols={1} image={['q8b-1.png', 'q8b-2.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q8c"} content={fa15q8c} hasResponse={false} image={['q8c.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q8d"} content={fa15q8d} hasResponse={false} image={['q8d.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q8e"} content={fa15q8e} on="Yes" off="No" image={['q8e-1.png', 'q8e-2.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q9a"} content={fa15q9a} on="Yes" off="No" image={['q9a.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q9b"} content={fa15q9b} hasResponse={false} image={['q9b.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q9c"} content={fa15q9c} rows={3} cols={1} image={['q9c.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q9d"} content={fa15q9d} hasResponse={false} image={['q9d.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q9e"} content={fa15q9e} hasResponse={true} image={['q9e-1.png', 'q9e-2.png']} examCode={examCode} />
          <hr className="s5" />
          <Question id={"q9f"} content={fa15q9f} rows={3} cols={1} image={['q9f-1.png', 'q9f-2.png']} examCode={examCode} />
        </div>
      </span>
    );
  }
}

export default EE16AFa15;
