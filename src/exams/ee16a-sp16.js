import React, { Component } from 'react';
import { Question } from '../components/question';
import { lmatrix, lx } from '../utils';

const sp16q3 =
`
<h3>3. Mechanical Johann</h3>
Invert the following matrix:

${lmatrix([[1, 2, 6], [0, 1, 4], [2, 4, 10]])}
`;

const sp16q4 = 
`
<h3>4. Freedom!</h3>
Let \\(A\\) and \\(B\\) be \\(n × n\\) matrices. Suppose \\(A\\) is invertible, but \\(B\\) is not. <b>Prove that Rank</b>(\\(AB\\)) < <b>Rank</b>(\\(A\\)).<br/><br/>
(That is, show that the number of linearly independent columns in \\(AB\\) is strictly less than the number of
linearly independent columns in \\(A\\)).
`;

const sp16q5a = 
`
<h3>5. True or False?</h3>
You only need to write True or False under each subpart.</br>

(a) There exists an invertible \\(n × n\\) matrix \\(A\\) for which ${lx('A^2')} = 0. 
`;

const sp16q5b = 
`
(b) If \\(A\\) is an invertible \\(n × n\\) matrix, then for all vectors \\(\\vec{b}\\) ∈ ${lx('R^n')}, the system \\(A\\)\\(\\vec{x}\\)=\\(\\vec{b}\\) has a unique solution.
`;

const sp16q5c = 
`
(c) If \\(A\\) and \\(B\\) are invertible \\(n × n\\) matrices, then the product \\(AB\\) is invertible.
`;

const sp16q5d = 
`
(d) The two vectors ${lx('v_1')} = ${lmatrix([[1], [1], [0]])} and ${lx('v_2')} = ${lmatrix([[1], [-1], [0]])} form a basis for the 
subspace Span(${lx('\\{')}${lmatrix([[1], [1], [0]])}, ${lmatrix([[1], [-1], [0]])}${lx('\\}')}).
`;

const sp16q5e = 
`
(e) A set of ${lx('n')} linearly dependent vectors in ${lx('\\mathbb{R}^n')} can span ${lx('\\mathbb{R}^n')}.
`;

const sp16q5f = 
`
(f) For all matrices \\(A\\) and \\(B\\), where \\(A\\) is ${lx('5')}×${lx('5')} and \\(B\\) is ${lx('4')}×${lx('4')}, it is always the case that Rank(\\(A\\)) > Rank(\\(A\\)).
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

const sp16q6b = 
`
(b) From the given information, can you determine how many imps are at each campsite? If so, report
their numbers to help the faeries! If not, explain why not.
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

const sp16q7b =
`
(b) In this part, we’re interested in backward inference of the state vector ${lx('\\vec{s}[n]')} from a future state vector, say ${lx('\\vec{s}[n+1]')}. As you know, this is possible only if a matrix ${lx('A^{−1}')} exists, so that
${lx('\\vec{s}[n]')} = ${lx('A^{−1}\\vec{s}[n + 1]')}.<br/>
Consider a model of the Technocrat migration system described above with ${lx('\\beta')} = ${lx('\\alpha')} = 1/3. Assume ${lx('\\vec{s}[1]')} = ${lx('\\vec{1}')}, where ${lx('\\vec{1}')} denotes the vector of all ones.<br/>
${lx('\\vec{1}')} = ${lmatrix([[1], [1], [1], [1]])}<br/>
For this model of the system described above, either explain why time-reversed inference of the state vector is not possible, or determine ${lx('\\vec{s}[0]')} from ${lx('\\vec{s}[1]')} explicitly by computing ${lx('A^{−1}')} first.
`;

const sp16q7c =
`
For the remainder of the problem, assume ${lx('\\beta')} = ${lx('\\alpha')} = 1/4 and that the state transition matrix ${lx('A')} is:
${lx('A')} = ${lmatrix([[1, '1/4', 0, 0], [0, '1/2', '1/4', 0], [0, '1/4', '1/2', 0], [0, 0, '1/4', 1]])}.<br/>
Recall that the following equation governs ${lx('\\vec{s}[n]')}, the state of the system at time ${lx('n')}, and the initial state ${lx('\\vec{s}[0]')}:
${lx('\\vec{s}[n]')} = ${lx('A^n\\vec{s}[0]')}.<br/>
For each of the remaining parts, assume that a limiting state vector exists, given by
${lx('\\lim\\limits_{n \\to \\infty} \\vec{s}[n]')} = ${lx('\\vec{s}_\\infty')}
(c) Suppose the initial state of the system is given by the vector
${lx('\\vec{s}[0]')} = ${lmatrix([['1/2'], [0], [0], ['1/2']])}.
This means that, initially, 500,000 Technocrats are in San Francisco, and the other 500,000 are in New York City. Without complicated mathematical derivations, determine the state vector ${lx('\\vec{s}[n]')} for all ${lx('n \\geq 1')}.
`;

const sp16q7d =
`
(d) Now suppose the initial state of the system is given by the vector ${lx('\\vec{s}[0]')} = ${lmatrix([[0], ['1/2'], ['1/2'], [0]])}.<br/>
This means that, initially, 500,000 Technocrats are in Denver, and the other 500,000 are in Chicago.<br/>
Without complicated mathematical derivations, determine the limiting state vector ${lx('\\lim\\limits_{n \\to \\infty} \\vec{s}[n]')}
`;

const sp16q7e =
`
(e) Finally, now suppose the initial state of the system is given by the vector
${lx('\\vec{s}[0]')} = ${lmatrix([['1/4'], ['1/4'], ['1/4'], ['1/4']])}.
This means that, initially, the Technocrats are equally distributed among the four Dream Cities. Without complicated mathematical derivations, determine ${lx('\\lim\\limits_{n \\to \\infty} \\vec{s}[n]')}.
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

const sp16q8b =
`
(b) Write the matrix ${lx('A_2')} that applies the transformation ${lx('T_2')}.
`;

const sp16q8c =
`
(c) Leah commands SIXTEEN-AYY to perform ${lx('T_1')} followed by ${lx('T_2')} - find the matrix ${lx('A_{12}')} that captures the effect of this sequence of commands.
`;

const sp16q8d =
`
(d) Being the contrarian that he is, Bob instead wants to command SIXTEEN-AYY to perform ${lx('T_2')} followed by ${lx('T_1')}. Find the matrix ${lx('A_{21}')} that captures the effect of this sequence of commands.
`;

const sp16q8e =
`
(e) If SIXTEEN-AYY started out in the same initial configuration for both Bob and Leah, will its arm end up in the same place after executing Leah’s command as it does after executing Bob’s command?<br/>
Briefly justify why or why not.
`;

const img8f = require('../img/sp16q8-1.png');
const sp16q8f =
`
(f) Now let’s go back to 3-dimensional space, with the position of the end of the robot arm represented as vectors ${lmatrix([['P_x'], ['P_y'], ['P_z']])} ${lx('\\in')} ${lx('\\mathbb{R}^3')}. Suppose the end of the robot’s arm can reach only points in the span of the vectors ${lmatrix([[1], [0], [0]])} and ${lmatrix([[0], [1], [0]])}. Circle the graph below that corresponds to this possible range of motion.

<img src="${img8f}" className="problem-image" />
`;

const img8g = require('../img/sp16q8-2.png');
const sp16q8g =
`
(g) Finally, we’d like to allow the robot to place the end of its arm at a point that is ${lx('\\theta')} radians above the ${lx('x')}-${lx('y')} plane, but as shown below, is still restricted to a two-dimensional plane at that angle. Write the basis
vectors that would correspond to this possible range of motion for a fixed ${lx('\\theta')}.<br/>
(<i>Hint</i>: If you had a point along the ${lx('y')}-axis and wanted to rotate it by an angle of ${lx('\\theta')} radians relative to the ${lx('y')}-axis while remaining on the ${lx('y')}-${lx('z')} plane, what transformation would you apply?)

<img src="${img8g}" className="problem-image" />
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

const sp16q9b =
`
(b) We know that no furballs enter or leave the configuration of tunnels shown above and that during the time you’re observing the behavior, and no furballs die or are born. What constraint does this place on the values of ${lx('p_1')}, ${lx('p_2')}, ${lx('p_3')}? Write your answer in equation form.
`;

const sp16q9c =
`
(c) Suppose we let ${lx('\\vec{p}')} = ${lmatrix([['p_1'], ['p_2'], ['p_3']])}, ${lx('\\vec{x}[n+1]')} = ${lmatrix([['x_f[n+1]'], ['x_s[n+1]'], ['x_p[n+1]']])} and ${lx('\\vec{x}[n]')} = ${lmatrix([['x_f[n]'], ['x_s[n]'], ['x_p[n]']])}, and that we are sure that ${lx('x_p[n]')} is nonzero. Express ${lx('\\vec{p}')} as a function of the numbers in the diagram, ${lx('\\vec{x}[n]')}, and ${lx('\\vec{x}[n+1]')}.<br/>
(<i>Hint</i>: what is the relationship between ${lx('\\vec{x}[n+1]')} and ${lx('\\vec{x}[n]')})
`;

const sp16q9d =
`
(d) Using part (c), solve for ${lx('\\vec{p}')} given that ${lx('\\vec{x}[n+1]')} =
${lmatrix([[22], [30], [48]])} and ${lx('$vec{x}[n]')} = ${lmatrix([[20], [30], [50]])}.
`;

const img9e = require('../img/sp16q9-2.png');
const sp16q9e =
`
(e) You discover a new system of tunnels where furballs live. You know this system has 3 chambers like the last one did, but you do not know how the chambers are connected, or the behavior of this colony of furballs. However, if ${lx('\\vec{x}[n]')} =
${lmatrix([['x_1[n]'], ['x_2[n]'], ['x_3[n]']])} where ${lx('x_i[n]')} represents the number of furballs in chamber ${lx('i')} at timestep ${lx('n')}, where time starts at ${lx('n')} = 0, you observe that ${lx('\\vec{x}[2]')} = ${lmatrix([[60], [24], [16]])}. Which of the following pump
diagrams in Figure 2 represents a possible set of behaviors for this colony?

<img src="${img9e}" className="problem-image" />
`;

class EE16ASp16 extends Component {
  render() {
    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2016 | Alon, Ayazifar</h5>
        </div>
        <div className="sidebar">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          <i>Question 1 and 2 only ask for personal information such as name and hobbies, so they have been omitted.</i>
          <hr className="s1" />
          <div className="sidetitle">Straightforward Questions</div>
          <div><a className="sidetab">3. Mechanical Johann</a></div>
          <div><a className="sidetab">4. Freedom!</a></div>
          <div><a className="sidetab">5. True or False?</a></div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div><a className="sidetab">6. Faerie Battles</a></div>
          <div><a className="sidetab">7. A Tale of a Million Technocrats and the Four Dream Cities</a></div>
          <div><a className="sidetab">8. Ayy - Reflections on SIXTEEN</a></div>
          <div><a className="sidetab">9. Goodness Gracious, Great Balls of Fur!</a></div>
        </div>
        <div className="content">
          <hr className="s5" />
          <h2>Straightforward questions <i>(24 points)</i></h2>
          <hr className="s2" />
          <p>Unless told otherwise, you must show work to get credit. There will be very little partial credit given in this section. Each problem is worth 8 points.</p>
          <hr className="s5" />
          <Question id={"q3"} content={sp16q3} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q4"} content={sp16q4} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q5a"} content={sp16q5a} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q5b"} content={sp16q5b} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q5c"} content={sp16q5c} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q5d"} content={sp16q5d} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q5e"} content={sp16q5e} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q5f"} content={sp16q5f} hasReponse={false}/>
          <hr className="s5" />
          <h2>Free-form Problems <i>(100 points)</i></h2>
          <hr className="s2" />
          <Question id={"q6a"} content={sp16q6a} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q6b"} content={sp16q6b} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q6c"} content={sp16q6c} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q7a"} content={sp16q7a} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q7b"} content={sp16q7b} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q7c"} content={sp16q7c} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q7d"} content={sp16q7d} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q7e"} content={sp16q7e} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8a"} content={sp16q8a} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8b"} content={sp16q8b} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8c"} content={sp16q8c} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8d"} content={sp16q8d} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8e"} content={sp16q8e} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8f"} content={sp16q8f} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q8g"} content={sp16q8g} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q9a"} content={sp16q9a} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q9b"} content={sp16q9b} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q9c"} content={sp16q9c} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q9d"} content={sp16q9d} hasReponse={false}/>
          <hr className="s5" />
          <Question id={"q9e"} content={sp16q9e} hasReponse={false}/>
        </div>
      </span>
    );
  }
}

export default EE16ASp16;
