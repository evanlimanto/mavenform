import React, { Component } from 'react';
import { VariablesQuestion, MatrixQuestion, ToggleQuestion, FreeFormQuestion } from '../components/question';

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
`

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

const fa15q5 =
`
<h3>5. Show It</h3>

Let \\(n\\) be a positive integer. Let \\(\\{\\vec{v_1}, \\vec{v_2}, . . . , \\vec{v_k}\\}\\) be a set of \\(k\\) linearly dependent vectors in \\(\\mathbb{R}^n\\). Show that for
any (\\(n × n\\)) matrix A, the set \\(\\{\\vec{Av_1}, \\vec{Av_2}, . . . , \\vec{Av_k}\\}\\) is a set of linearly dependent vectors.
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

const fa15q7b =
`
<b>(b)</b> <i>(10pts)</i> Does Kody’s set of masks give us a unique solution for all four caves’ light intensities? Why or why not?
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

const fa15q8c =
`
<b>(c)</b> <i>(12pts)</i> Does adding this additional road change the possible trafﬁc ﬂows of the two cities? That is,
is there any valid ﬂow \\(\\vec{t}\\) for which the additional road has non-zero ﬂow (\\(t_7 \\ne 0\\))? <b>Give an explicit example of such a ﬂow or an argument why one cannot exist.</b><br/><br/>
(<i>Hint: One way of doing this is to recall that each row in the incidence matrix corresponds to the constraint that the total ﬂow into an intersection is zero. Can you interpret the constraint resulting from the sum of all the rows corresponding to intersections in a city?</i>)

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

const fa15q8e =
`
<b>(e)</b> <i>(BONUS 10pts)</i> Before they were connected, both cities individually had sensors set up to measure their trafﬁc ﬂows. That is, they measured the ﬂows along some set of roads, and were able to re-construct the ﬂows along all roads in their <i>isolated</i> city. After the two new roads of Figure 4 were constructed, the state’s engineers added two additional sensors, one on each road (on \\(t_7\\) and \\(t_8\\)). Using the data from each city’s sensors, and these two new sensors, they were able to recover the ﬂows of all roads in the network.<br/><br/>
However, one day the sensor on \\(t_7\\) breaks. <b>Can they still recover all the ﬂows, using only the remaining sensors? Give an argument for why or why not.</b>

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

const fa15q9b =
`
<b>(b)</b> <i>(5pts)</i> Consider now a general pump matrix A that is known to Justin, not necessarily the one in the example above. Just for this part, suppose Justin had been told the initial water levels \\(\\vec{x}[0]\\) by someone else. Could he ﬁgure out \\(\\vec{x}[t]\\)? <b>Write an expression for \\(\\vec{x}[t]\\) given the initial levels \\(\\vec{x}[0]\\) and the pump matrix \\(A\\)</b>.
`;

const fa15q9c =
`
<b>(c)</b> <i>(5pts)</i> Suppose we use \\(y[t]\\) to denote Justin’s measurement of the water level in pool 1 at time t. We  know that \\(y[t] = x_1[t]\\). <b>Find a vector \\(\\vec{c}\\) such that
$$y[t] = \\vec{c}_T\\vec{x}[t]$$
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

const img9e = require('../img/fa16q9-2.png');
const fa15q9e =
`
<b>(e)</b> <i>(13pts)</i> Now assume we have a speciﬁc network of pumps with a different pump matrix.

<img src="${img9e}" class="problem-image" />

Given this speciﬁc A matrix, <b>how many time steps \\(T\\) of observations in pool 1 will Justin need in order to recover the initial water levels \\(\\vec{x}[0]\\)? Argue why this number of observations is enough.</b>
`;

const fa15q9f =
`
<b>(f)</b> <i>(10pts)</i> For the T chosen in the previous part and the pump matrix \\(A\\) given there, suppose Justin measures

$$
y[t] = 1 \\qquad for \\; t = 0, \\, 1, \\, \\dots, \\, (T − 1)
$$

<b>What was \\(\\vec{x}[0]\\)? (Show work)</b>
`;

class EE16AFa15 extends Component {
  render() {
    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2015 | Niknejad, Sahai</h5>
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
          <h2>Straightforward questions <i>(24 points)</i></h2>
          <hr className="s2" />
          <p>Unless told otherwise, you must show work to get credit. There will be very little partial credit given in this section. You get one drop: do 3 out of the following 4 questions. (We will grade all 4 and keep the best 3 scores.) Each problem is worth 8 points. Students who get all 4 questions correct will receive some bonus points (6 points).</p>
          <hr className="s5" />
          <VariablesQuestion id={"q3"} content={fa15q3} variables={['x_1', 'x_2']} image={['q3.png']} />
          <hr className="s5" />
          <MatrixQuestion id={"q4"} content={fa15q4} rows={2} cols={2} image={['q4-1.png', 'q4-2.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q5"} content={fa15q5} hasResponse={false} image={['q5-1.png', 'q5-2.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q6"} content={fa15q6} hasResponse={false} image={['q6-1.png', 'q6-2.png']} />
          <hr className="s5" />
          <h2>Free-form Problems <i>(94 + 15 points)</i></h2>
          <hr className="s5" />
          <MatrixQuestion id={"q7a"} content={fa15q7a} rows={4} cols={4} image={['q7a.png']} />
          <hr className="s5" />
          <ToggleQuestion id={"q7b"} content={fa15q7b} on="Yes" off="No" image={['q7b.png']} />
          <hr className="s5" />
          <ToggleQuestion id={"q7c"} content={fa15q7c} on="Yes" off="No" image={['q7c.png']} />
          <hr className="s5" />
          <MatrixQuestion id={"q8a"} content={fa15q8a} rows={6} cols={6} image={['q8a.png']} />
          <hr className="s5" />
          <MatrixQuestion id={"q8b"} content={fa15q8b} rows={6} cols={1} image={['q8b-1.png', 'q8b-2.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q8c"} content={fa15q8c} hasResponse={false} image={['q8c.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q8d"} content={fa15q8d} hasResponse={false} image={['q8d.png']} />
          <hr className="s5" />
          <ToggleQuestion id={"q8e"} content={fa15q8e} on="Yes" off="No" image={['q8e-1.png', 'q8e-2.png']} />
          <hr className="s5" />
          <ToggleQuestion id={"q9a"} content={fa15q9a} on="Yes" off="No" image={['q9a.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q9b"} content={fa15q9b} hasResponse={false} image={['q9b.png']} />
          <hr className="s5" />
          <MatrixQuestion id={"q9c"} content={fa15q9c} rows={3} cols={1} image={['q9c.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q9d"} content={fa15q9d} hasResponse={false} image={['q9d.png']} />
          <hr className="s5" />
          <FreeFormQuestion id={"q9e"} content={fa15q9e} hasResponse={true} image={['q9e-1.png', 'q9e-2.png']} />
          <hr className="s5" />
          <MatrixQuestion id={"q9f"} content={fa15q9f} rows={3} cols={1} image={['q9f-1.png', 'q9f-2.png']} />
        </div>
      </span>
    );
  }
}

export default EE16AFa15;
