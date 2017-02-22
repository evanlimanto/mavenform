import React, { Component } from 'react';
import { Question } from '../components/question';
import { lmatrix, lx } from '../utils';

const _ = require('lodash');

const sp15q1a =
`
<h3>PROBLEM 1. Imaging Circuit <i>(12 points)</i></h3>
In this problem we will return one final time to examining how one might choose the area of a photodetector in order to maximize the measured voltage. This time however, let’s assume that light shines only over a fixed area \\(A_{illuminated}\\).<br/><br/>

(Recall that in the rain analogy, the area of the photodetector is analogous to the area of the bucket, the current is analogous to the amount of water per unit time being captured in the bucket, and the voltage is analogous to the height of the water accumulated within the bucket.)<br/><br/>

(a) <i>(3 pts)</i> Let’s assume that the area of the photodetector is \\(A_{PD}\\), that \\(A_{PD}\\) is smaller than \\(A_{illuminated}\\), and that the photodetector is placed such that it fits entirely within the illuminated region. In this case, can you predict how the current produced by the photodetector \\(I_{PD}\\) would change as a function of \\(A_{PD}\\) and \\(A_{illuminated}\\)?
`;

const sp15q1a_soln =
`
In this case, increasing ${lx('A_{PD}')} captures more light (photons), so:
<hr class="s1" />
${lx('I_{PD} \\propto \\frac{A_{PD}}{A_{illuminated}}', false)}
<hr class="s1" />
(Note that answer with ${lx('I_{PD} \\propto A_{PD}')} will receive full credit as well)
`;

const sp15q1b =
`
(b) <i>(3 pts)</i> Now let’s assume that ${lx('A_{PD}')} is larger than ${lx('A_{illuminated}')} and that the illuminated area is fully captured by the photodetector; how does the current ${lx('I_{PD}')} depend upon on ${lx('A_{PD}')} now?
`;

const sp15q1b_soln =
`
Now increasing ${lx('A_{PD}')} does nothing to change the amount of light that is captured, so:
${lx('I_{PD} \\propto constant', false)}
`;

const sp15q1c =
`
c) <i>(6 pts)</i> Let’s now assume that in order to read out its voltage, we have to connect 
the photodetector device to a circuit with a fixed capacitance, and that we operate 
the photodetector the same way as we did in homework 0. In other words, before 
each measurement, we discharge both the photodetector and the measurement 
circuit (note that you can think of the capacitance of the readout circuit as being 
the measurement bucket from homework 0; remember that the measurement 
bucket is not exposed directly to the rain), let the photodetector charge up over a 
period of time, and then connect it to the readout circuit.<br/><br/>
 
Given your answers to part a) and b), what should you set ${lx('A_{PD}')} equal to in order to 
maximize the measured voltage? Be sure to explain your answer; some equations 
and/or plots showing how the voltage depends on ${lx('A_{PD}')} and ${lx('A_{illuminated}')} may be useful. 
`;

const imgsp15q1c_soln = require('../img/sp15q1_s.png');
const sp15q1c_soln =
`
Just like in the homework, some of the charge collected by the photodetector has to go in to the measurement circuits capacitance. Conceptually, if that circuit had an equivalent area (remember ${lx('capacitance \\propto area')} of ${lx('A_{meas}')}, then for ${lx('A_{PD} < A_{illuminated}')}:

${lx('V_{meas} \\propto \\frac{1}{A_{PD} + A_{meas}} \\cdot \\frac{A_{PD}}{A_{illuminated}}', false)}

However, increasing ${lx('A_{PD}')} above ${lx('A_{illuminated}')} doesn't give us any more charge (since ${lx('I_PD')} is now fixed). So if ${lx('A_{PD} > A_{illuminated}')}:

${lx('V_{meas} \\propto \\frac{A_{illuminated}}{A_{PD} + A_{meas}}', false)}

Putting these together, the point at which we get maximum ${lx('V_{meas}')} is for ${lx('A_{PD} = A_{illuminated}')}; this choice gives us the maximum charge we can get with the smallest total capacitance.

<hr class="s2"/>

For completeness, if you plot ${lx('V_{meas}')} vs ${lx('A_{PD}')}, it should look like:

<img src=${imgsp15q1c_soln} class="problem-image" />
`;

const imgsp15q2_1 = require('../img/sp15q2-1.png');
const imgsp15q2_1_soln = require('../img/sp15q2-1_s.png');
const sp15q2a =
`
<h3>PROBLEM 2. Sparse Images and Vector Geometry <i>(14 pts)</i></h3>
 
So far we've usually represented images as data grids. However, sometimes this can be 
very expensive in cases where most of the image pixels are exactly identical.
example, consider a 5 X 5 image where all the pixels are white, except for the pixel 
position ${lmatrix([[2, 3]])} which is black. Such an image is called a "sparse" image, and it may be much more efficient to represent it by only specifying the location(s) of the white pixel(s).<br/><br/>
 
For example, if we had a 2 x 2 image with a white background, an image comprised of 
the vector ${lmatrix([['x', 'y']], true)} = ${lmatrix([[0, 1]], true)} would have a black pixel in the upper left hand corner of the image. (In other words, in this encoding the vectors correspond to positions in ${lmatrix([[0, 0]], true)} is the origin.) This particular image is shown below. Note that for the rest of the problem, when we ask you to draw an image, rather than you filling in each pixel, we will just be asking you to draw an X at the positions indicated by each vector – this is depicted on the right for the example image.   

<img src=${imgsp15q2_1} className="problem-image" /> 

a) <i>(2 pts)</i> Using the same representation as the example described above, draw the image represented by the vector ${lmatrix([[1], [2]])}.
`;

const sp15q2a_soln =
`
<img src=${imgsp15q2_1_soln} class="problem-image" />
`;

const imgsp15q2b_soln = require('../img/sp15q2-2_s.png');
const sp15q2b =
`
b) <i>(6 pts)</i> Now let’s examine what happens if we have an image with two black 
pixels and perform a transformation on this image. In particular, let’s assume that 
our image consists of the vectors ${lmatrix([[1], [2]])} and ${lmatrix([[1], [1]])}. Draw both the original image and the image created by transforming that image by the matrix ${lmatrix([[1, 2], [2, 4]])}. (Recall that transformation in this context means multiplying each vector by the given matrix.) 
`;

const sp15q2b_soln =
`
<img src=${imgsp15q2b_soln} class="problem-image" />

${lx('\\left[ \\begin{array}{c c}1 & 2 \\\\ 2 & 4 \\\\ \\end{array} \\right] \\cdot \\left[ \\begin{array}{c} 1 \\\\ 2 \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} 5 \\\\ 10 \\\\ \\end{array} \\right]', false)}

${lx('\\left[ \\begin{array}{c c}1 & 2 \\\\ 2 & 4 \\\\ \\end{array} \\right] \\cdot \\left[ \\begin{array}{c} 1 \\\\ 1 \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} 3 \\\\ 6 \\\\ \\end{array} \\right]', false)}
`;

const imgsp15q2c_s = require('../img/sp15q2-3_s.png');
const sp15q2c =
`
c) <i>(6 pts)</i> Now let’s imagine we had an image with black pixels everywhere, and that we transformed this image by the same ${lmatrix([[1, 2], [2, 4]])} matrix as in part b). Sketch the that we transformed this image by the same resulting transformed image. Note that you don’t need to know the exact size of the original image – just indicate what happens to the transformed image as this size is increased. It may help you to consider what happens when you multiply an arbitrary vector ${lmatrix([['x', 'y']], true)} by the transformation matrix. What is property of the transformation matrix makes the resulting image look the way it does? 
`;

const sp15q2c_soln =
`
Notice that after transformation both of the black pixels in part (b) ended up on a single line. We can see this in general because:
${lx('\\left[ \\begin{array}{c c}1 & 2 \\\\ 2 & 4 \\\\ \\end{array} \\right] \\left[ \\begin{array}{c} x \\\\ y \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} x + 2y \\\\ 2x + 4y \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} x + 2y \\\\ 2 \\cdot (x + 2y) \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} a_1 \\\\ 2a_1 \\\\ \\end{array} \\right]', false)}

Therefore, an image with all black pixels will become a line defined by ${lx('y = 2x')}:
<hr class="s2" />

<img src=${imgsp15q2c_s} class="problem-image" />

<hr class="s2" />
The property of the matrix that causes this is that it is <b>non-invertible</b>.
`;

const sp15q3a =
`
<h3>PROBLEM 3. Coding for Storage <i>(13 points)</i></h3>
Alice is a budding young photographer. Given the beautiful weather over the weekend 
she goes up into the Berkeley hills and takes a bunch of gorgeous pictures of San 
Francisco. She’s hoping to sell these pictures to make some extra money, and so she 
wants to make sure she doesn’t lose the data. The images she captures are all square 
images of ${lx('n')} x ${lx('n')} pixels. Each pixel contains a positive number indicating the intensity of light, and for the rest of this problem, you can assume that it takes 3 bytes of memory to store such a number.<br/><br/>

a) <i>(2 pts)</i> Alice is known to be clumsy with her laptop and so she doesn’t want to 
just store all the pictures in one place. Instead, she makes 3 copies of the image, 
and stores each copy on a different USB stick. If Alice wanted to store 1000 
images this way, where each image is 1000 x 1000 pixels (i.e., ${lx('n')} = 1000), how 
many total bytes of memory (including all three USB sticks) would Alice need? 
`;

const sp15q3a_soln =
`
${lx('\\begin{align} N_{bytes} &= 3 copies \\cdot 1000 images \\cdot (1000 \\cdot 1000) pixels \\cdot 3 bytes/pixel \\\\ &= 9 \\cdot 10^9 bytes \\end{align}', false)}
`;

const sp15q3b =
`
b) <i>(5 pts)</i> Alice realizes that if she wants to keep taking pictures, she is going to have to become efficient with her storage, she cannot simply keep replicating the data. 
So she focuses on first understanding how she can efficiently store two images. 
Just like in the lab, we’ll express the images as vectors. 
 
Consider two image vectors ${lx('x')} and ${lx('y')}. Alice applies the following strategy: she 
stores ${lx('x')} on the laptop, ${lx('y')} on the USB stick, and ${lx('x')} on her phone. Alice’s friend Elaine instead suggests that Alice use a different strategy and store ${lx('x + y')} on her 
phone instead (while leaving the data stored on the laptop and USB the same as in Alice’s strategy). Is Elaine’s strategy better than Alice’s strategy? If so, describe at least one scenario where Elaine’s strategy can recover the data but Alice’s cannot. If not, explain why the strategies are equivalent.
`;

const sp15q3b_soln =
`
Elaine's strategy is better; in Alice's strategy, if the USB stick is lost, Alice cannot recover ${lx('y')}. With Elaine's strategy, any one of the storage devices can be lost while still recovering both ${lx('x')} and ${lx('y')}.
`;

const sp15q3c =
`
c) <i>(6 pts)</i> Let’s now consider a more advanced storage strategy that uses 8 storage 
devices to handle four images ${lx('a')}, ${lx('b')}, ${lx('c')}, and ${lx('d')}. If each pixel (which contains a real 
number representing the intensity) in each of the four image vectors is ${lx('a_i')}, ${lx('b_i')}, ${lx('c_i')}, ${lx('d_i')}, 
the information stored in each pixel location of the 8 storage devices will be ${lx('a_i')}, ${lx('b_i')}, 
${lx('c_i')}, ${lx('d_i')}, ${lx('a_i')}+${lx('b_i')}, ${lx('c_i')}+${lx('d_i')}, ${lx('a_i')}
+${lx('c_i')}, ${lx('b_i')}+${lx('d_i')}. If we were to represent the storage action 
happening on each of the pixels as an ${lx('8')}x${lx('4')} matrix multiplying a ${lx('4')}x${lx('1')} vector, what 
would the entries in that ${lx('8')}x${lx('4')} matrix and ${lx('4')}x${lx('1')} vector be? 
`;

const sp15q3c_soln =
`
If the stored information is a vector ${lx('S_i')}:

${lx('\\left[ \\begin{array}{c} S_{i1} \\\\ S_{i2} \\\\ \\vdots \\\\ \\vdots \\\\ \\vdots \\\\ \\vdots \\\\ \\vdots \\\\ S_{i8} \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c c c c} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 1 & 1 & 0 & 0 \\\\ 1 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 1 \\\\ 1 & 0 & 1 & 0 \\\\ 0 & 1 & 0 & 1 \\\\ \\end{array} \\right] \\cdot \\left[ \\begin{array}{c} a_i \\\\ b_i \\\\ c_i \\\\ d_i \\\\ \\end{array} \\right]', false)}

<hr class="s1" />
Define the binary matrix above as ${lx('A_{store}')} for part (d).
`;

const sp15q3d =
`
d) <i>(Bonus: 6 pts)</i> Recalling that ${lx('a')}, ${lx('b')}, ${lx('c')}, and ${lx('d')} are all ${lx('n^2')} x ${lx('1')} vectors, show how you 
could perform a single matrix-matrix multiplication to represent the storage action 
of all of the pixels simultaneously. Hint: what would be the dimensions of a 
matrix composed of ${lmatrix([['a', 'b', 'c', 'd']], true)}? 
`;

const sp15q3d_soln =
`
${lx('{\\left[ \\begin{array}{c c c c} a & b & c & d \\\\ \\end{array} \\right]}^T = \\left[ \\begin{array}{c} a_T \\\\ b_T \\\\ c_T \\\\ d_T \\\\ \\end{array} \\right]', false)}

Since ${lx('A_{store}')} is an 8 x 4 matrix, we can actually multiply the matrix above by ${lx('A_{store}')} and get exactly what we wanted!

${lx('\\left[ \\begin{array}{c} s_1^T \\\\ s_2^T \\\\ \\vdots \\\\ s_8^T \\\\ \\end{array} \\right] = A_{store} \\cdot \\left[ \\begin{array}{c} a_T \\\\ b_T \\\\ c_T \\\\ d_T \\\\ \\end{array} \\right]', false)}
`;

const sp15q4a =
`
<h3>PROBLEM 4. Investment Strategy <i>(10 pts)</i></h3>
 
Alice finally sells some of her photographs and makes a bunch of money. In fact, she is 
so rich that at the beginning of every day she can put $1 of her money into the stock 
market. At the end of the day she sells her stocks and looks at how much money she got 
back. She decides to let a Berkeley-based mutual fund manage the $1 she invests. This 
mutual fund invests in three companies from the area: Friendly Faces Inc., Search and 
Spend Inc., and Delicious Devices Inc.<br/><br/>
 
Each company has a growth ${lx('g_f(i)')}, ${lx('g_s(i)')}, and ${lx('g_d(i)')} on day ${lx('i')}. What this means is that if Alice 
invests $1 in Friendly Faces on day i, then she gets back ${lx('g_f(i)')} dollars at the end of day ${lx('i')}. 
The mutual fund invests fractions ${lx('\\alpha_f')}, ${lx('\\alpha_s')}, and ${lx('\\alpha_d')} of Alice’s money in each of the three  companies; note that these fractions are always the same (i.e., they do not change from one day to the next), and that <b>all of her money is always invested in the market.</b><br/><br/>

a) <i>(3 pts)</i> Using the terms defined above, write an expression using a dot product that would compute how many dollars Alice gets back after the first day.
`;

const sp15q4a_soln =
`
Growth vector ${lx('\\vec{g}(1) = \\left[ \\begin{array}{c} g_f(1) \\\\ g_s(1) \\\\ g_d(1) \\\\ \\end{array} \\right]')}
<hr class="s1" />
Investment vector ${lx('\\vec{\\alpha} = \\left[ \\begin{array}{c} \\alpha_f \\\\ \\alpha_s \\\\ \\alpha_d \\\\ \\end{array} \\right]')}
<hr class="s1" />
Dollars returned after day 1: ${lx('\\vec{g}(1)^T \\cdot \\vec{\\alpha} = g_f(1)\\alpha_f + g_s(1)\\alpha_s + g_d(1)\\alpha_d')}
`;

const sp15q4b =
`
b) <i>(7 pts)</i> Let’s assume that on the first day, Alice got back $1.7 from her $1 investment – i.e., the result of the expression you wrote in part a) is $1.7. Alice is 
quite happy with the increase, and decides to continue investing.<br/><br/>
On the second day, Alice again invests $1 at the beginning of the day, but at the end of the day she finds out that all of her money was lost – i.e., she will be getting $0 back!<br/><br/>
This makes Alice angry and she wants to find out the investment strategy of the 
mutual fund. She goes back and does some research and finds that ${lx('g_f(1)')} = 2, 
${lx('g_s(1)')} = 1, and ${lx('g_d(1)')} = 2, and on the second day ${lx('g_f(2)')} = 2, ${lx('g_s(2)')} = 2, but ${lx('g_d(2)')} = -3.<br/><br/>
Write a matrix equation Alice could use to figure out what the mutual fund’s 
investment strategy was (i.e., to find the values of ${lx('\\alpha_f')}, ${lx('\\alpha_s')}, and ${lx('\\alpha_d')}). 
`;

const sp15q4b_soln =
`
<ul>
<li>
We know that ${lx('\\vec{g}(1)^T \\cdot \\vec{\\alpha} = 1.7')}, and that ${lx('\\vec{g}(2)^T \\cdot \\alpha = 0')}. This however gives us only two equations with 3 unknowns. To get a third equation, we need to remember that ${lx('\\alpha_f + \\alpha_s + \\alpha_d = 1')} (i.e., that all of Alice's money is invested).
</li>
<li>
Writing this in matrix form:
${lx('\\left[ \\begin{array}{c c c} 2 & 1 & 2 \\\\ 2 & 2 & -3 \\\\ 1 & 1 & 1 \\\\ \\end{array} \\right] \\left[ \\begin{array}{c} \\alpha_f \\\\ \\alpha_s \\\\ \\alpha_d \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} 1.7 \\\\ 0 \\\\ 1 \\\\ \\end{array} \\right]', false)}
</li>
<li>
So, assuming the matrix above is invertible (which it is):
${lx('\\left[ \\begin{array}{c} \\alpha_f \\\\ \\alpha_s \\\\ \\alpha_d \\\\ \\end{array} \\right] = {\\left[ \\begin{array}{c c c} 2 & 1 & 2 \\\\ 2 & 2 & -3 \\\\ 1 & 1 & 1 \\\\ \\end{array} \\right]}^{-1} \\cdot \\left[ \\begin{array}{c} 1.7 \\\\ 0 \\\\ 1 \\\\ \\end{array} \\right]', false)}
</li>
</ul>
`;

const imgsp15q5a_s = require('../img/sp15q5-1_s.png');
const sp15q5a =
`
<h3>PROBLEM 5. Berkeley Forever! <i>(16 pts)</i></h3>
 
Berkeley, as we all know, is a great place to live. But sometimes people make silly 
decisions, and move to places on the east coast (say Boston) and get stuck in blizzards. 
But of course once they move to the east coast, they quickly realize the futility of the 
endeavor and try to come back to Berkeley as soon as possible. We would like to 
understand the steady state populations in Beautiful Berkeley versus Blizzardy Boston. 
Let us assume that people only move back and forth between Berkeley and Boston and 
don’t move anywhere else.<br/><br/>
 
Every month, people make the decision to either stay in the same place or move to a new 
place. In a given month, 80% will continue to stay in Berkeley, but there is a 20% chance 
that they will choose to move to Boston. For every person in Boston, there is only a 10% 
chance they will choose to stay in Boston, but 90% will choose to move to Berkeley.<br/><br/>

a) <i>(3 pts)</i> Draw a graph that models this setup. The nodes in the graph are Berkeley 
and Boston, and the arcs between the two nodes should be annotated with the 
probabilities of moving from one node to the other. 
`;

const sp15q5a_soln =
`
<img src=${imgsp15q5a_s} class="problem-image" />
`;

const sp15q5b =
`
b) <i>(4 pts)</i> Now let’s say we set up a vector ${lx('x(i)')} = ${lmatrix([['x_{berkeley}(i)', 'x_{boston}(i)']], true)}, where ${lx('x_{berkeley}(i)')} represents the number of people living in Berkeley at month ${lx('i')} (similarly 
for Boston and ${lx('x_{boston}(i)')}). Write a matrix ${lx('A_{transition}')} that you could multiply by this vector to predict the number of people living in each city at month ${lx('i+1')} (i.e., ${lx('x(i + 1)')} = ${lx('A_{transition}x(i)')})
`;

const sp15q5b_soln =
`
${lx('A_{transition} = \\left[ \\begin{array}{c c} 0.8 & 0.9 \\\\ 0.2 & 0.1 \\\\ \\end{array} \\right]', false)}
`;

const sp15q5c =
`
c) <i>(9 pts)</i> Now let us say the total population stays constant, and we start with half 
the population in Berkeley and the other half in Boston. Use the matrix you wrote 
above to find the steady-state populations in Berkeley and Boston. If the total 
population is 100, calculate the number of people in Berkeley at steady state?
`;

const sp15q5c_soln =
`
<ul>
<li>
Best way to do this is to find the eigenvector of ${lx('A_{transition}')} that has an eigenvalue of 1 (we'll next find that there is one).
</li>
<li>
Let's first find the eigenvalues by setting ${lx('det(A_{transition} - \\lambda I) = 0')}
${lx('\\begin{align} det(A_{transition} - \\lambda I) &= (0.8 - \\lambda)(0.1 - \\lambda) - 0.2 \\cdot 0.9 \\\\ &= 0.08 - 0.9 \\lambda + \\lambda^2 - 0.18 \\\\ &= \\lambda^2 - 0.9\\lambda - 0.1 = 0 \\end{align}', false)}
${lx('\\lambda_{1,2} = \\frac{0.9 \\pm \\sqrt{0.81 + 0.4}}{2} \\implies \\lambda_1 = 1, \\lambda_2 = -0.1', false)}
</li>
<li>
Now let's find the eigenvector:
${lx('A_{transition} \\cdot \\left[ \\begin{array}{c} v_1 \\\\ v_2 \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} v_1 \\\\ v_2 \\\\ \\end{array} \\right]', false)}

${lx('0.8v_1 + 0.9v_2 = v_1', false)}
${lx('0.2v_1 + 0.1v_2 = v_2', false)}
${lx('v_1 = 4.5v_2', false)}

Remember that total population is constant, so we should renormalize the vector such that ${lx('v_1 + v_2 = 1')}.

<hr class="s1" />

Hence ${lx('\\left[ \\begin{array}{c} v_1 \\\\ v_2 \\\\ \\end{array} \\right] = \\left[ \\begin{array}{c} \\frac{4.5}{5.5} \\\\ \\frac{1}{5.5} \\end{array} \\right]', false)}

So if we started with 100 people, we will end up with ~82 people in Berkeley, and ~18 people in Boston.
</li>
</ul>
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;
var Sticky = require('react-stickynode');

class EE16ASp15 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  generateSidetabContainers(is_mobile) {
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5']
    const problemTitles = [
      '1. Imaging Circuit',
      '2. Sparse Images and Vector Geometry',
      '3. Coding for Storage',
      '4. Investment Strategy',
      '5. Berkeley Forever'
    ];
    return _.map(_.range(problemIDs.length), (index) => {
      const problemID = problemIDs[index];
      const problemTitle = problemTitles[index];

      if (problemID.length === 0) {
        return (
          <span><hr className="s1" /><div className="sidetitle">{problemTitle}</div></span>
        );
      }

      return (
        <div className="sidetab-container">
          {
            (is_mobile) ?
            (
              <Link className="sidetab" to={problemID} isDynamic={true} smooth={true} duration={500}>
                {problemTitle}
              </Link>
            ) :
            (
              <Link activeClass="active" className="sidetab" to={problemID} spy={true} isDynamic={true} smooth={true} duration={500}>
                {problemTitle}
              </Link>
            )
          }
        </div>
      );
    });
  }

  render() {
    const webSidetabContainers = this.generateSidetabContainers(false);
    const mobileSidetabContainers = this.generateSidetabContainers(true);

    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2015 | Alon, Ayazifar, Subramanian</h5>
        </div>
        <Sticky className="sidebar screen">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          {webSidetabContainers}
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-sp15.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-sp15-sol.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </Sticky>
        <div className="sidebar mobile">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          {mobileSidetabContainers}
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-sp15.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16a-mt1-sp15-sol.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <Element name="q1" className="first-q">
            <hr className="s5" />
            <Question id={"q1a"} content={sp15q1a} hasResponse={false} solution={sp15q1a_soln} />
            <hr className="s5" />
            <Question id={"q1b"} content={sp15q1b} hasResponse={false} solution={sp15q1b_soln} />
            <hr className="s5" />
            <Question id={"q1c"} content={sp15q1c} hasResponse={false} solution={sp15q1c_soln} />
          </Element>
          <Element name="q2">
            <hr className="s5" />
            <Question id={"q2a"} content={sp15q2a} hasResponse={false} solution={sp15q2a_soln}  />
            <hr className="s5" />
            <Question id={"q2b"} content={sp15q2b} hasResponse={false} solution={sp15q2b_soln}  />
            <hr className="s5" />
            <Question id={"q2c"} content={sp15q2c} hasResponse={false} solution={sp15q2c_soln}  />
          </Element>
          <Element name="q3">
            <hr className="s5" />
            <Question id={"q3a"} content={sp15q3a} hasResponse={false} solution={sp15q3a_soln}  />
            <hr className="s5" />
            <Question id={"q3b"} content={sp15q3b} hasResponse={false} solution={sp15q3b_soln}  />
            <hr className="s5" />
            <Question id={"q3c"} content={sp15q3c} hasResponse={false} solution={sp15q3c_soln}  />
            <hr className="s5" />
            <Question id={"q3d"} content={sp15q3d} hasResponse={false} solution={sp15q3d_soln}  />
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4a"} content={sp15q4a} hasResponse={false} solution={sp15q4a_soln}  />
            <hr className="s5" />
            <Question id={"q4b"} content={sp15q4b} hasResponse={false} solution={sp15q4b_soln}  />
          </Element>
          <Element name="q5">
            <hr className="s5" />
            <Question id={"q5a"} content={sp15q5a} hasResponse={false} solution={sp15q5a_soln}  />
            <hr className="s5" />
            <Question id={"q5b"} content={sp15q5b} hasResponse={false} solution={sp15q5b_soln}  />
            <hr className="s5" />
            <Question id={"q5c"} content={sp15q5c} hasResponse={false} solution={sp15q5c_soln}  />
          </Element>
        </div>
      </span>
    );
  }
}

export default EE16ASp15;
