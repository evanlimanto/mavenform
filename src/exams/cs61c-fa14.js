import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { longblank, blank, onespace, fourspace, sixspace, eightspace } from '../utils';

const _ = require('lodash');

const twelvespace = _.repeat('&nbsp;', 12);

const q1_1 =
`
<h3>Question 1: Running in circles (18 pts)</h3>
A nibble is half of a byte (4 bits). You’d like to implement <code><b>LoadNibble</b></code> in MAL MIPS, a function that
takes one <code>uint32_t</code> argument <code><b>N</b></code> and returns the <b>Nth</b> nibble of memory in the lowest 4 bits of the return
register  (the  other  28  bits  should  be  0).  Note:  The  <b>Nth</b>  nibble  immediately  follows  the  <b>(N-1)-th</b> nibble
without overlapping; see box . The MIPS instruction <code><b>srlv</b></code> (“shift right variable”) might be useful here; it
operates like the shamt-based right-shift, except that its <b>3rd</b> register argument is the variable amount
to shift by.

<hr class="s2" />

a)  What fraction of all the nibbles of memory can you access?
`;

const q1_1_soln =
`
<b>1/2</b>
`;

const imgq1_2 = require('../img/cs61cfa14-1-1.png');
const q1_2 =
`
b)  Implement <code><b>LoadNibble</b></code> by filling in the blanks:

<hr class="s2" />

<img src=${imgq1_2} class="problem-image" />

<code>
LoadNibble: ${blank} $t0 ${blank} ${blank} # figure out which byte contains that nibble
<hr class="s1" />
${twelvespace}${blank} $a1 0(${blank})
<hr class="s1" />
${twelvespace}${blank} $a0 ${blank} ${blank}
<hr class="s1" />
${twelvespace}sll $a0 $a0 2
<hr class="s1" />
gone1:${sixspace}${blank} ${blank} ${blank} ${blank}
<hr class="s1" />
gone2:${sixspace}${blank} ${blank} ${blank} ${blank}
<hr class="s1" />
${twelvespace}jr $ra
</code>
`;

const q1_2_soln =
`
<code>
LoadNibble: <b>srl</b> $t0 <b>$a0</b> <b>1</b> # figure out which byte contains that nibble
<hr class="s1" />
${twelvespace}<b>lbu</b> $a1 0(<b>$t0</b>)
<hr class="s1" />
${twelvespace}<b>andi</b> $a0 <b>$a0</b> <b>0x1</b>
<hr class="s1" />
${twelvespace}sll $a0 $a0 2
<hr class="s1" />
gone1:${sixspace}<b>srlv $v0 $a1 $a0</b>
<hr class="s1" />
gone2:${sixspace}<b>andi $v0 $v0 0xF</b>
<hr class="s1" />
${twelvespace}jr $ra
</code>
`;

const q1_3 =
`
c)  We want to rewrite <code><b>LoadNibble</b></code> to make use of a helper function <code><b>Helper</b></code> that will take two arguments. The first is an index <code><b>i</b></code> from 0-1 and the second is a byte <code><b>B</b></code>. Helper returns the ith
nibble in <code><b>B</b></code> placed in the lowest 4 bits of the return value (the rest 0s).
<hr class="s2" />
E.g., <code><b>Helper(0, 0b01100100) -> 0b0100</b></code> and <code><b>Helper(1, 0b01100100) -> 0b0110</b></code>
<hr class="s2" />
We decide we don’t need the two MIPS instructions labeled “<code><b>gone1</b></code>” and “<code><b>gone2</b></code>”.  What would you
replace these instructions (and the <code>sll</code>) with to call <code><b>Helper</b></code> and implement <code><b>LoadNibble</b></code> successfully?
Write the replacement below. Follow calling conventions and complete it in the fewest lines
possible.
<hr class="s2" />
<code>
${longblank} # this line may not be necessary
<hr class="s1" />
${longblank} # this line may not be necessary
<hr class="s1" />
${longblank} # this line may not be necessary
<hr class="s1" />
${blank} Helper
<hr class="s1" />
${longblank} # this line may not be necessary
<hr class="s1" />
${longblank} # this line may not be necessary
<hr class="s1" />
${longblank} # this line may not be necessary
</code>
`;

const q1_3_soln =
`
<code>
<b>addiu $sp $sp -4</b> ${_.repeat('&nbsp;', 3)} # this line may not be necessary
<hr class="s1" />
<b>sw $ra 0($sp)</b> ${_.repeat('&nbsp;', 6)} # this line may not be necessary
<hr class="s1" />
${_.repeat('_', 20)} # this line may not be necessary
<hr class="s1" />
<b>jal</b> Helper ${_.repeat('&nbsp;', 9)} # j works too, all other lines
<hr class="s1" />
${_.repeat('&nbsp;', 20)} # blank (since $ra = LoadNibble's caller)!
<hr class="s1" />
<b>lw $ra 0($sp)</b> ${_.repeat('&nbsp;', 6)} # this line may not be necessary
<hr class="s1" />
<b>addiu $sp $sp 4</b> ${_.repeat('&nbsp;', 4)} # this line may not be necessary
<hr class="s1" />
${_.repeat('_', 20)} # this line may not be necessary
</code>
`;

const q2_1 =
`
<h3>Question 2: I can C clearly now, the rain is gone... (18 pts)</h3>
A)  Fill in the blank to complete this function that parses a string of octal digits (base 8) into a <code><b>uint64_t</b></code>. For example,
calling <code><b>parse_octal("71")</b></code> should return the number 57. Do not use the comma operator, nested assignment,
prefix/postfix operators, or function calls. You may assume that the given number “fits” into a <code><b>uint64_t</b></code>. (<b>Hint</b>: The backside of the MIPS green sheet may help.)

<hr class="s2" />

<code>
uint64_t parse_octal(char *s) {
<hr class="s1" />
${fourspace}uint64_t r = 0;
<hr class="s1" />
${fourspace}while (*s) {
<hr class="s1" />
${eightspace}r = ${longblank};
<hr class="s1" />
${eightspace}s++;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}return r;
<hr class="s1" />
}
</code>
`;

const q2_1_soln =
`
<code><b>r*8 + (*s - '0');</b></code>
`;

const q2_2 =
`
B)  We have the following data packed tightly (no padding) into the struct <code><b>data</b></code>, and some more code below. Fill in the blanks with an equivalent expression using
only the pointer <code><b>s</b></code>, pointer arithmetic, casting, and the function <code><b>strlen()</b></code>. You may NOT use <code><b>UNKNOWN_LENGTH</b></code>. Assume <code><b>sizeof(char) = 1</b></code>.
<hr class="s2" />
<code>
struct {
<hr class="s1" />
${fourspace}int16_t a;
<hr class="s1" />
${fourspace}char b[2+(UNKNOWN_LENGTH*4)];
<hr class="s1" />
${fourspace}int32_t c;
<hr class="s1" />
${fourspace}int32_t d;
<hr class="s1" />
} data;
<hr class="s2" />
/* ... Some code here that fills in data.b with the longest string possible ... */
<hr class="s2" />
char *s = data.b;
<hr class="s1" />
*( (int16_t *) ${longblank} ) = -1; // data.a = -1;
<hr class="s1" />
*( (int32_t *) ${longblank} ) = -1; // data.d = -1;
</code>
`;

const q2_2_soln =
`
<code>
char *s = data.b; /* s is a char, so it counts by 1 byte by default if in parens */
<hr class="s1" />
*( (int16_t *) <b>(s - 1) /* or (s - 2) */</b> ) = -1; // data.a = -1;
<hr class="s1" />
*( (int32_t *) <b>(s + strlen(s) + 1 + 4)</b> ) = -1;${onespace} // data.d = -1;
</code>
`;

const q2_3 =
`
C)  Here we have a LR-tree, defined as a node with two arrays
of child pointers: two left children and two right children.
Each node also contains a pointer to its parent node, a
unique integer ID value, and a string name field. Root nodes
will have a <code>NULL</code> parent pointer, and leaf nodes will have
arrays of <code>NULL</code> children pointers.
Fill in the blanks to complete this function that frees a LR-
tree if called with the root of the tree. You must free <b>ALL</b>
data associated with this LR-tree! You might not need all of the blanks, in which case use the most minimal number of
blanks possible. Do not use the comma operator, nested assignment, or prefix/postfix operators.
<hr class="s2" />
<code>
struct lr_tree {
<hr class="s1" />
${fourspace}char *name;
<hr class="s1" />
${fourspace}uint64_t ID;
<hr class="s1" />
${fourspace}struct lr_tree *left_children[2];
<hr class="s1" />
${fourspace}struct lr_tree *right_children[2];
<hr class="s1" />
${fourspace}struct lr_tree *parent;
<hr class="s1" />
};
<hr class="s2" />
void free_lr_tree (struct lr_tree *p) {
<hr class="s1" />
${fourspace}if (${longblank}) {
<hr class="s1" />
${eightspace}for (size_t x = 0; x < 2; x++) {
<hr class="s1" />
${twelvespace}${longblank};
<hr class="s1" />
${twelvespace}${longblank};
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${eightspace}${longblank};
<hr class="s1" />
${eightspace}${longblank};
<hr class="s1" />
${eightspace}${longblank};
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
</code>
`;

const q2_3_soln =
`
<code>
void free_lr_tree (struct lr_tree *p) {
<hr class="s1" />
${fourspace}if (<b>p != NULL</b>) {
<hr class="s1" />
${eightspace}for (size_t x = 0; x < 2; x++) {
<hr class="s1" />
${twelvespace}<b>free_lr_tree(p->left_children[x])</b>;
<hr class="s1" />
${twelvespace}<b>free_lr_tree(p->right_children[x])</b>;
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${eightspace}<b>free(p->name)</b>;
<hr class="s1" />
${eightspace}<b>free(p)</b>;
<hr class="s1" />
${eightspace}${longblank};
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
</code>
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS61CFa14 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs61cfa14';
    const problemIDs = ['q1', 'q2'];
    const problemTitles = [
      'Q1. Running in circles',
      'Q2. I can C clearly now, the rain is gone...',
    ];

    return (
      <span>
        <h1>CS 61C</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2014 | Garcia, Lustig</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} />
            <hr className="s5" />
            <Question id={"q1-2"} content={q1_2} solution={q1_2_soln} />
            <hr className="s5" />
            <Question id={"q1-3"} content={q1_3} solution={q1_3_soln} />
          </Element>
          <Element name="q2">
            <hr className="s5" />
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} />
            <hr className="s5" />
            <Question id={"q2-2"} content={q2_2} solution={q2_2_soln} />
            <hr className="s5" />
            <Question id={"q2-3"} content={q2_3} solution={q2_3_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CFa14;
