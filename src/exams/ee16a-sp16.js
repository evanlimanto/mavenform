import React, { Component } from 'react';
import { VariablesQuestion, MatrixQuestion, FreeFormQuestion, ToggleQuestion } from '../components/question';
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
Let \\(A\\) and \\(B\\) be \\(n × n\\) matrices. Suppose \\(A\\) is invertible, but \\(B\\) is not. <b>Prove that Rank</b>(\\(AB\\)) < <b>Rank</b>(\\(A\\)).
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
subspace Span({${lmatrix([[1], [1], [0]])}, ${lmatrix([[1], [-1], [0]])}}).
`;

const sp16q5e = 
`
(e) A set of n linearly dependent vectors in ${lx('R^n')} can span ${lx('R^n')}.
`;

const sp16q5f = 
`
(f) For all matrices \\(A\\) and \\(B\\), where \\(A\\) is 5×5 and \\(B\\) is 4×4, it is always the case that Rank(\\(A\\)) > Rank(\\(A\\)).
`;

const sp16q6a = 
`
<h3>6. Faerie Battles (20 points)</h3>

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
<h3>7. A Tale of a Million Technocrats and the Four Dream Cities (24 Points)</h3>

This problem is a tale of one million Technocrats and four Dream Cities. Listed in order from West to East,
the four cities are (I) San Francisco, (II) Denver, (III) Chicago, and (IV) New York City. </br></br>

The Technocrats don’t die. They don’t reproduce. In other words, their total population size is a constant
from the initial time n = 0 to the end of time as n → ∞. At the strike of each second on a Universal Clock,
each Technocrat chooses to either remain at the city he or she is already in, or move instantaneously to
another of the four Dream Cities, according to the following rules:</br></br>

• Every Technocrat who moves to either San Francisco or New York City will stay in that city forever
(no more moving thereafter!);</br>
• Whether eastward or westward, every Technocrat moves in single hops—so for example, no direct
move from San Francisco to either Chicago or New York City is allowed;</br>
• At each second, the fraction of Technocrats in each city who move eastward legally (e.g. from Denver
to Chicago, or from Chicago to New York City) is β;</br>
• At each second, the fraction of Technocrats in each city who move westward legally (e.g. from Chicago
to Denver, or from Denver to San Francisco) is α;</br>
• The following inequality must be true: α +β ≤ 1.</br></br>

The following diagram summarizes these restrictions graphically.
<img src="${imgsp16q7_1}" class="problem-image"/>

Let the state vector for this system be at time \\(n\\) be:
\\(\\vec{s}\\)[\\(n\\)] = ${lmatrix([[('s_1[n]')], [('s_2[n]')], [('s_3[n]')], [('s_4[n]')]])}

,
where ${lx('s_l')}[\\(n\\)] denotes number of Technocrats in City \\(l\\) at time \\(n\\); for example, ${lx('s_3')}[\\(n\\)] denotes the Technocrat
population in Chicago at time \\(n\\).
The state-evolution equation for this system is given by
$$\\vec{s}[n + 1] = A\\vec{s}[n]$$
where <b>A</b> is the state-transition matrix. </br></br>


(a) Determine the state-transition matrix <b>A</b>.

`;

class EE16ASp16 extends Component {
  render() {
    return (
      <span>
        <hr className="s5" />
        <h2>Straightforward questions <i>(24 points)</i></h2>
        <hr className="s2" />
        <p>Unless told otherwise, you must show work to get credit. There will be very little partial credit given in this section. Each problem is worth 8 points.</p>
        <hr className="s5" />
        <FreeFormQuestion id={"q3"} content={sp16q3} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q4"} content={sp16q4} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q5a"} content={sp16q5a} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q5b"} content={sp16q5b} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q5c"} content={sp16q5c} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q5d"} content={sp16q5d} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q5e"} content={sp16q5e} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q5f"} content={sp16q5f} hasReponse={false}/>
        <hr className="s5" />
        <h2>Free-form Problems <i>(100 points)</i></h2>
        <hr className="s2" />
        <FreeFormQuestion id={"q6a"} content={sp16q6a} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q6b"} content={sp16q6b} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q6c"} content={sp16q6c} hasReponse={false}/>
        <hr className="s5" />
        <FreeFormQuestion id={"q7"} content={sp16q7a} hasReponse={false}/>
        <hr className="s5" />
      </span>
    );
  }
}

export default EE16ASp16;


// (b) In this part, we’re interested in backward inference of the state vector ~s[n] from a future state vector,
// say~s[n+1]. As you know, this is possible only if a matrix A
// −1
// exists, so that
// ~s[n] = A
// −1
// ~s[n+1].
// Consider a model of the Technocrat migration system described above with β = α = 1/3. Assume
// ~s[1] =~1, where~1 denotes the vector of all ones.
// ~1 =
// 
// 
// 
// 
// 1
// 1
// 1
// 1
// 
// 
// 
// 
// For this model of the system described above, either explain why time-reversed inference of the state
// vector is not possible, or determine~s[0] from~s[1] explicitly by computing A
// −1 first.
// EECS 16A, Spring 2016, Midterm 1 8
// For the remainder of the problem, assume β = α = 1/4 and that the state transition matrix A is:
// A =
// 
// 
// 
// 
// 1 1/4 0 0
// 0 1/2 1/4 0
// 0 1/4 1/2 0
// 0 0 1/4 1
// 
// 
// 
// 
// .
// Recall that the following equation governs~s[n], the state of the system at time n, and the initial state~s[0]:
// ~s[n] = A
// n
// ~s[0].
// For each of the remaining parts, assume that a limiting state vector exists, given by
// lim
// n→∞
// ~s[n] =~s∞.
// (c) Suppose the initial state of the system is given by the vector
// ~s[0] =
// 
// 
// 
// 
// 1/2
// 0
// 0
// 1/2
// 
// 
// 
// 
// .
// This means that, initially, 500,000 Technocrats are in San Francisco, and the other 500,000 are in New
// York City. Without complicated mathematical derivations, determine the state vector~s[n] for all n ≥ 1.
// EECS 16A, Spring 2016, Midterm 1 9
// (d) Now suppose the initial state of the system is given by the vector
// ~s[0] =
// 
// 
// 
// 
// 0
// 1/2
// 1/2
// 0
// 
// 
// 
// 
// .
// This means that, initially, 500,000 Technocrats are in Denver, and the other 500,000 are in Chicago.
// Without complicated mathematical derivations, determine the limiting state vector lim
// n→∞
// ~s[n].
// (e) Finally, now suppose the initial state of the system is given by the vector
// ~s[0] =
// 
// 
// 
// 
// 1/4
// 1/4
// 1/4
// 1/4
// 
// 
// 
// 
// .
// This means that, initially, the Technocrats are equally distributed among the four Dream Cities. Without
// complicated mathematical derivations, determine lim
// n→∞
// ~s[n].
// EECS 16A, Spring 2016, Midterm 1 10
// PRINT your name and student ID:
// 8. Ayy - Reflections on SIXTEEN (28 points)
// You are involved in the design of a robot called SIXTEEN-AYY that has arms with a certain range of motion
// and certain operations that the arms can perform.
// For parts (a)–(e) of this problem, we will look at a simplified case where we pretend that the robot’s arm can
// move only in a 2-dimensional space. Thus, we will represent the position of the end of the robot’s arm with
// a vector ~p =
// 
// px
// py
// 
// . Let’s further assume that the robot will be built to perform two movement commands
// determined by the following transformations:
// T1: Reflects ~p about the line y = −x.
// T2: Rotates ~p clockwise about the origin by 45◦
// (a) Write the matrix A1 that applies the transformation T1.
// (b) Write the matrix A2 that applies the transformation T2.
// EECS 16A, Spring 2016, Midterm 1 11
// (c) Leah commands SIXTEEN-AYY to perform T1 followed by T2 - find the matrix A12 that captures the
// effect of this sequence of commands.
// (d) Being the contrarian that he is, Bob instead wants to command SIXTEEN-AYY to perform T2 followed
// by T1. Find the matrix A21 that captures the effect of this sequence of commands.
// (e) If SIXTEEN-AYY started out in the same initial configuration for both Bob and Leah, will its arm
// end up in the same place after executing Leah’s command as it does after executing Bob’s command?
// Briefly justify why or why not.
// EECS 16A, Spring 2016, Midterm 1 12
// (f) Now let’s go back to 3-dimensional space, with the position of the end of the robot arm represented as
// vectors
// 
// 
// Px
// Py
// Pz
// 
//  ∈ R
// 3
// . Suppose the end of the robot’s arm can reach only points in the span of the vectors
// 
// 
// 1
// 0
// 0
// 
//  and
// 
// 
// 0
// 1
// 0
// 
// . Circle the graph below that corresponds to this possible range of motion.
// (g) Finally, we’d like to allow the robot to place the end of its arm at a point that is θ radians above the x-y
// plane, but as shown below, is still restricted to a two-dimensional plane at that angle. Write the basis
// vectors that would correspond to this possible range of motion for a fixed θ.
// (Hint: If you had a point along the y- axis and wanted to rotate it by an angle of θ radians relative to
// the y-axis while remaining on the y-z plane, what transformation would you apply?)
// EECS 16A, Spring 2016, Midterm 1 13
// PRINT your name and student ID:
// 9. Goodness Gracious, Great Balls of Fur! (28 points)
// You are a biologist who has discovered a new species of rodents that live in tunnels underground, and you
// have named the species "furballs". You have been observing a particular network of tunnels. Figure 1 shows
// the network of tunnels with three chambers in it. To document their behavior, you observe the number of
// furballs in each chamber at every minute. After observing the furballs’ behavior for a while, you have figured
// out that their behavior follows a regular pattern. Each minute, a well defined fraction of the furballs
// in a given chamber move to the other chambers. The fractions you have observed are shown in Figure 1.
// The fractions of furballs leaving the Play Room could not be determined through your observations, and are
// shown as the variables p1, p2, and p3
// Figure 1
// (a) Let the number of furballs in the Food Storeroom at time n be xf
// [n], the number of furballs in Sleep
// room at time n be xs
// [n], and the number of furballs in the Play Room at time n be xp[n]. We would like
// to find the transition matrix A such that,
// 
// 
// xf
// [n+1]
// xs
// [n+1]
// xp[n+1]
// 
//  = A
// 
// 
// xf
// [n]
// xs
// [n]
// xp[n]
// 
// . Write A using the numbers and the
// variables in the diagram.
// EECS 16A, Spring 2016, Midterm 1 14
// (b) We know that no furballs enter or leave the configuration of tunnels shown above and that during the
// time you’re observing the behavior, and no furballs die or are born. What constraint does this place on
// the values of p1, p2, p3? Write your answer in equation form.
// (c) Suppose we let ~p =
// 
// 
// p1
// p2
// p3
// 
// , ~x[n+1] =
// 
// 
// xf
// [n+1]
// xs
// [n+1]
// xp[n+1]
// 
//  and ~x[n] =
// 
// 
// xf
// [n]
// xs
// [n]
// xp[n]
// 
// , and that we are sure that xp[n]
// is nonzero. Express ~p as a function of the numbers in the diagram, ~x[n], and ~x[n+1]. (Hint: what is
// the relationship between~x[n+1] and~x[n])
// EECS 16A, Spring 2016, Midterm 1 15
// (d) Using part (c), solve for ~p given that~x[n+1] =
// 
// 
// 22
// 30
// 48
// 
//  and~x[n] =
// 
// 
// 20
// 30
// 50
// 
// .
// (e) You discover a new system of tunnels where furballs live. You know this system has 3 chambers like
// the last one did, but you do not know how the chambers are connected, or the behavior of this colony
// of furballs. However, if ~x[n] =
// 
// 
// x1[n]
// x2[n]
// x3[n]
// 
//  where xi
// [n] represents the number of furballs in chamber i at
// timestep n, where time starts at n = 0, you observe that ~x[2] =
// 
// 
// 60
// 24
// 16
// 
// . Which of the following pump
// diagrams in Figure 2 represent a possible set of behaviors for this colony?
// Ai =
// 
// 
// 0.5 0.4 0
// 0.5 0.6 1
// 0 0 0
// 
//  Aii =
// 
// 
// 0.4 0.4 0.2
// 0.4 0.4 0.2
// 0.2 0.2 0.6
// 
//  Aiii =
// 
// 
// 1 0.25 0.25
// 0 0.5 0.25
// 0 0 0.5
// 
// 
// Figure 2
// EECS 16A, Spring 2016, Midterm 1 16
// PRINT your name and student ID:
// [If you are want the work on this page be graded, please state CLEARLY which problem(s) this space is
// for. You can also draw us something if you want or give us suggestions or complaints. You can also use this
// page to report anything suspicious that you might have noticed.]
// EECS 16A, Spring 2016, Midterm 1 17ddd

