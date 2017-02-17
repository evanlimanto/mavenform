import React, { Component } from 'react';
import { FreeFormQuestion } from '../components/question';
import { lmatrix, lx } from '../utils';

const sp15q1a =
`
<h3>1. Imaging Circuit <i>(12 points)</i></h3>
In this problem we will return one final time to examining how one might choose the area of a photodetector in order to maximize the measured voltage. This time however, let’s assume that light shines only over a fixed area \\(A_{illuminated}\\).<br/><br/>

(Recall that in the rain analogy, the area of the photodetector is analogous to the area of the bucket, the current is analogous to the amount of water per unit time being captured in the bucket, and the voltage is analogous to the height of the water accumulated within the bucket.)

<i>(a) (3 pts)</i> Let’s assume that the area of the photodetector is \\(A_{PD}\\), that \\(A_{PD}\\) is smaller than \\(A_{illuminated}\\), and that the photodetector is placed such that it fits entirely within the illuminated region. In this case, can you predict how the current produced by the photodetector \\(I_{PD}\\) would change as a function of \\(A_{PD}\\) and \\(A_{illuminated}\\)?
`;

const sp15q1b =
`
<b>(b)</b> <i>(3 pts)</i> Now let’s assume that ${lx('A_{PD}')} is larger than ${lx('A_{illuminated}')} and that the illuminated area is fully captured by the photodetector; how does the current ${lx('I_{PD}')} depend upon on ${lx('A_{PD}')} now?
`;

const sp15q1c =
`
c) (6 pts) Let’s now assume that in order to read out its voltage, we have to connect 
the photodetector device to a circuit with a fixed capacitance, and that we operate 
the photodetector the same way as we did in homework 0. In other words, before 
each measurement, we discharge both the photodetector and the measurement 
circuit (note that you can think of the capacitance of the readout circuit as being 
the measurement bucket from homework 0; remember that the measurement 
bucket is not exposed directly to the rain), let the photodetector charge up over a 
period of time, and then connect it to the readout circuit.
 
Given your answers to part a) and b), what should you set ${lx('A_{PD}')} equal to in order to 
maximize the measured voltage? Be sure to explain your answer; some equations 
and/or plots showing how the voltage depends on ${lx('A_{PD}')} and ${lx('A_{illuminated}')} may be useful. 
`;

const imgsp15q2_1 = require('../img/sp15q2-1.png');
const sp15q2a =
`
<h3>PROBLEM 2. (14 pts) Sparse Images and Vector Geometry</h3>
 
So far we've usually represented images as data grids. However, sometimes this can be 
very expensive in cases where most of the image pixels are exactly identical.
example, consider a 5 X 5 image where all the pixels are white, except for the pixel 
position ${lmatrix([[2, 3]])} which is black. Such an image is called a "sparse" image, and it may be much more efficient to represent it by only specifying the location(s) of the wh
pixel(s).
 
For example, if we had a 2 x 2 image with a white background, an image comprised of 
the vector ${lmatrix([['x', 'y']], true)} = ${lmatrix([[0, 1]], true)} would have a black pixel in the upper left hand corner of the image. (In other words, in this encoding the vectors correspond to positions in ${lmatrix([[0, 0]], true)} is the origin.) This particular image is shown below. Note that for the rest of the problem, when we ask you to draw an image, rather than you filling in each pixel, we will just be asking you to draw an X at the positions indicated by each vector – this is depicted on the right for the example image.   

<img src={imgsp15q2_1} className="problem-image" /> 

a)  (2 pts) Using the same representation as the example described above, draw the image represented by the vector ${lmatrix([[1], [2]])}.
`;

class EE16ASp15 extends Component {
  render() {
    return (
      <span>
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2015 | Alon, Ayazifar, Subramanian</h5>
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
        </div>
      </span>
    );
  }
}

export default EE16ASp15;
