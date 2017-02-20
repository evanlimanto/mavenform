import React, { Component } from 'react';
import { Question } from '../components/question';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, sevenspace, eightspace } from '../utils';

const _ = require('lodash');
const examCode = 'cs61cfa15';

const tenspace = _.repeat('&nbsp;', 10);
const twelvespace = _.repeat('&nbsp;', 12);
const sixteenspace = _.repeat('&nbsp;', 16);

const clarifications =
`
<h3>Exam Clarifications</h3>
Q3-3. The node should free itself also.
<hr class="s1" />
- If you can traverse to a node through a series of prev and/or next, that node is reachable.
<hr class="s1" />
Q4. If you see a 90 under the “Exit” label, please ignore it.
<hr class="s1" />
beargit redux - In is_commit_msg_ok(), int i is declared before the for loop.
<hr class="s1" />
- If you need to use it, you can use $sp, $ra, $gp, $fp
<hr class="s1" />
Q6-3 - Give the address in hex
<hr class="s1" />
Q6-1 - Instructions are still 32 bits
`;

const q1_1 =
`
<h3>Q1: A dozen ways to ask about bits (10 points)</h3>
1) For a 12-bit integer represented with two’s complement, what is the:
<hr class="s2" />
a) Most positive value (in decimal):
<hr class="s1" />
b) Binary representation of that number:
<hr class="s1" />
c) Most negative value (in decimal):
<hr class="s1" />
d) Hex representation of that number:
<hr class="s1" />
e) In general, for an n-bit, two’s complement integer:
<hr class="s1" />
${fourspace}i) What is the largest value you can represent, in decimal?
<hr class="s1" />
${fourspace}ii) What is the smallest value you can represent, in decimal?
<hr class="s2" />
2) Fill in the blank below so that the function mod16 will return the remainder of x when divided by 16. The first blank should be a <b>bitwise</b> operator, and the second blank should be a single decimal number:
<code>
unsigned int mod16(unsigned int x) {
<hr class="s1" />
${fourspace}return x ________ ________________;
<hr class="s1" />
}
</code>
`;

const q1_1_soln =
`
<h3>Answers</h3>
<h4>Part 1</h4>
<hr class="s1" />
a) 2047
<hr class="s1" />
b) 0b011111111111
<hr class="s1" />
c) -2048
<hr class="s1" />
d) 0x800
<hr class="s1" />
e) i) ${lx('2^{n-1} - 1')}
<hr class="s1" />
e) ii) ${lx('-2^{n-1}')}
<hr class="s1" />
<h4>Part 2</h4>
Answer: &, 15
`;

const q2_1 =
`
<h3>Q2: Wow! If only you could C the main memory (10 points)</h3>

Consider the following C program:
<hr class="s1" />
<code>
void foo(){
<hr class="s1" />
${fourspace}int temp;
<hr class="s1" />
}
<hr class="s1" />
int main()
<hr class="s1" />
{
<hr class="s1" />
${fourspace}int b = 0;
<hr class="s1" />
${fourspace}char* s1 = “cs61c”;
<hr class="s1" />
${fourspace}char s2[] = “cs61c”;
<hr class="s1" />
${fourspace}char* c = malloc(sizeof(char) * 100);
<hr class="s1" />
${fourspace}foo();
<hr class="s1" />
${fourspace}return 0;
<hr class="s1" />
}
</code>
<hr class="s1" />
1) Sort the following values from least to greatest: <b>&b, c, b, &temp, &a</b>.
<hr class="s2" />
2) For each of the following values, state the location in the memory layout where they are stored. Answer with <i>code, static, heap, or stack</i>.
<hr class="s2" />
<b>s1</b>:${eightspace}${longblank}
<hr class="s1" />
<b>s2</b>:${eightspace}${longblank}
<hr class="s1" />
<b>s1[0]</b>:${twospace}${longblank}
<hr class="s1" />
<b>s2[0]</b>:${twospace}${longblank}
<hr class="s1" />
<b>c[0]</b>:${fourspace}${longblank}
`;

const q2_1_soln =
`
<h3>Answers</h3>
1) b < &a < c < &temp < &b
<hr class="s1" />
2) stack, stack, static, stack, heap
`;

const q3_1 =
`
<h3>Q3: Links, Links, and Lists (15 points)</h3>

Here, we have a two-sided linked list, where each node has a reference to both the previous and next
node in the list. The <code>HEAD</code> of the list is defined as the node with a <code>NULL</code> prev pointer, and the <code>TAIL</code> of
the list is defined as the node with a <code>NULL</code> next pointer.

<hr class="s2" />

<code>
struct ll_node {
<hr class="s1" />
${fourspace}unsigned short id;
<hr class="s1" />
${fourspace}struct ll_node *prev;
<hr class="s1" />
${fourspace}struct ll_node *next;
<hr class="s1" />
};
</code>
<hr class="s2" />
For the remainder of the questions, assume that the <code>struct ll_node</code> is tightly-packed (i.e, all its elements are contiguous in memory).
<hr class="s2" />
1) We are given a <code>struct ll_node <b>current_node</b></code>. Assuming that the type <code>unsigned short</code> is 2
bytes wide and that we are working with a 32-bit memory address space, what can we expect the
function call <code><b>sizeof</b>(current_node)</code> to return?

<hr class="s2" />

2) Assume that we have access to <code><b>id_addr</b></code>, the address of the id of <code><b>current_node</b></code> in memory.
Using only <code><b>id_addr</b></code>, fill in the blank line so that <code><b>next_node</b></code> is equivalent to <code><b>current_node.next</b></code>.

<hr class="s2" />

<code>
${fourspace}unsigned short *id_addr = &(current_node.id);
<hr class="s1" />
${fourspace}struct ll_node *next_node = *(${blank});
</code>

<hr class="s2" />

3) Now, fill in the blanks to complete this function that, given a random node in the list, frees all
reachable nodes from that given node. Keep in mind that the node may be the <code>HEAD</code> of the list, the
<code>TAIL</code> of the list, or a node in between the <code>HEAD</code> and <code>TAIL</code>. You may not need every blank.
<hr class="s2" />
<code>
void free_twosided_ll(struct ll_node *node) {
<hr class="s1" />
${fourspace}if (node != NULL) {
<hr class="s1" />
${eightspace}if (node->prev != NULL) {
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${eightspace}if (node->next != NULL) {
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${fourspace}${longblank}
<hr class="s1" />
${fourspace}${longblank}
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
</code>
`;

const q3_1_soln =
`
<h3>Answers</h3>
1) 10
<hr class="s1" />
2) <code>(struct ll_node **) (id_addr + 3)</code>
<hr class="s1" />
3)
<code>
void free_twosided_ll(struct ll_node *node) {
<hr class="s1" />
${fourspace}if (node != NULL) {
<hr class="s1" />
${eightspace}if (node->prev != NULL) {
<hr class="s1" />
${twelvespace}<b>(node->prev)->next = NULL;</b>
<hr class="s1" />
${twelvespace}<b>free_twosided_ll(node->prev);</b>
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${eightspace}if (node->next != NULL) {
<hr class="s1" />
${twelvespace}<b>(node->next)->prev = NULL;</b>
<hr class="s1" />
${twelvespace}<b>free_twosided_ll(node->next);</b>
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${fourspace}<b>free(node);</b>
<hr class="s1" />
}
</code>
`;

const q4_1 =
`
<h3>Q4: beargit redux (15 points)</h3>

From project 1, you may remember the function <code>is_commit_msg_ok()</code> that you needed to implement
in C. Here is a simpler rendition where commit messages are deemed okay <i>if and only if</i> those null-
terminated commit messages exactly match <code>go_bears</code>. Using the <b>fewest number of empty lines</b>
possible, finish writing the code below. You are only allowed to use the registers already provided
<b>and</b> registers <b>$t0-3</b>, and <b>$s0-s2</b> (but you will not need all of them). Assume these registers are
initialized to 0 before the call to ISCOMMITOK.

<hr class="s2" />

<code>
${fourspace}const char* go_bears = "THIS IS BEAR TERRITORY!";
<hr class="s1" />
${fourspace}int is_commit_msg_ok(const char* msg, const char* go_bears) {
<hr class="s1" />
${eightspace}for (int i = 0; msg[i] && go_bears[i]; i++) {
<hr class="s1" />
${twelvespace}if (go_bears[i] != msg[i]) return 0;
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${eightspace}if (!msg[i] && !go_bears[i]) return 1;
<hr class="s1" />
${eightspace}return 0;
<hr class="s1" />
${fourspace}}
<hr class="s2" />
${fourspace}ISCOMMITOK: ________________________
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${sixteenspace}____ $t0   ____($a0)
<hr class="s1" />
${sixteenspace}____ $t1   ____($a1)
<hr class="s1" />
${tenspace}COND: ____and_________________
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${sixteenspace}addiu $a0 $a0 1
<hr class="s1" />
${sixteenspace}addiu $a1 $a1 1
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${tenspace}EXIT: ____ $t2 $t0 $t1
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${sixteenspace}li $v0 1
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${eightspace}FAILED: li $v0 0
<hr class="s1" />
${_.repeat('&nbsp;', 11)}END: ________________________
${sixteenspace}________________________
</code>
`;

const q4_1_soln =
`
<code>
${fourspace}ISCOMMITOK: ________________________
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${sixteenspace}_<b>lb</b>_ $t0   __<b>0</b>_($a0)
<hr class="s1" />
${sixteenspace}_<b>lb</b>_ $t1   __<b>0</b>_($a1)
<hr class="s1" />
${tenspace}COND: ____and <b>$t2 $t0 $t1</b>_____
<hr class="s1" />
${sixteenspace}____<b>beq $t2 $0 EXIT</b>_____
<hr class="s1" />
${sixteenspace}____<b>bne $t0 $t1 FAILED</b>__
<hr class="s1" />
${sixteenspace}addiu $a0 $a0 1
<hr class="s1" />
${sixteenspace}addiu $a1 $a1 1
<hr class="s1" />
${sixteenspace}_____<b>j ISCOMMITOK</b>_______
<hr class="s1" />
${sixteenspace}________________________
<hr class="s1" />
${tenspace}EXIT: _or_ $t2 $t0 $t1
<hr class="s1" />
${sixteenspace}____<b>bne $t2 $0 FAILED</b>___
<hr class="s1" />
${sixteenspace}li $v0 1
<hr class="s1" />
${sixteenspace}____<b>j END</b>________________
<hr class="s1" />
${eightspace}FAILED: li $v0 0
<hr class="s1" />
${_.repeat('&nbsp;', 11)}END: ____<b>jr $ra</b>_______________
</code>
`;

const q5_1 =
`
<h3>5: MIPS Sleuth (15 points)</h3>

<code>mystery</code>, a mysterious MIPS function outlined below, is written without proper calling conventions.
<code>mystery</code> calls a correctly written function, <b>random</b>, that takes an integer <code>i</code> as its only argument, and
returns a random integer in the range <code>[0, i - 1]</code> inclusive.

<hr class="s2" />
<code>
${threespace}1${twospace}mystery:${twospace}addiu $sp $sp ${_.repeat('_', 16)}
<hr class="s1" />
${threespace}2${twelvespace}${longblank}
<hr class="s1" />
${threespace}3${twelvespace}${longblank}
<hr class="s1" />
${threespace}4${twelvespace}${longblank}
<hr class="s1" />
${threespace}5${twelvespace}${longblank}
<hr class="s1" />
${threespace}6${twelvespace}${longblank}
<hr class="s1" />
${threespace}7${twelvespace}addu $s0 $0 $0
<hr class="s1" />
${threespace}8${twelvespace}move $s1 $a0
<hr class="s1" />
${threespace}9${twelvespace}move $s2 $a1
<hr class="s1" />
${twospace}10${twospace}loop:${fivespace}srl $t0 $s0 2
<hr class="s1" />
${twospace}11${twelvespace}beq $t0 $s2 exit
<hr class="s1" />
${twospace}12${twelvespace}subu $a0 $s2 $t0
<hr class="s1" />
${twospace}13${twelvespace}jal random
<hr class="s1" />
${twospace}14${twelvespace}sll $v0 $v0 2
<hr class="s1" />
${twospace}15${twelvespace}addu $v0 $v0 $s0
<hr class="s1" />
${twospace}16${twelvespace}addu $t0 $s1 $s0
<hr class="s1" />
${twospace}17${twelvespace}addu $t1 $s1 $v0
<hr class="s1" />
${twospace}18${twelvespace}lw $t2 0($t0)
<hr class="s1" />
${twospace}19${twelvespace}lw $t3 0($t1)
<hr class="s1" />
${twospace}20${twelvespace}sw $t2 0($t1)
<hr class="s1" />
${twospace}21${twelvespace}sw $t3 0($t0)
<hr class="s1" />
${twospace}22${twelvespace}addiu $s0 $s0 4
<hr class="s1" />
${twospace}23${twelvespace}j loop
<hr class="s1" />
${twospace}24${twospace}exit:${fivespace}${longblank}
<hr class="s1" />
${twospace}25${twelvespace}${longblank}
<hr class="s1" />
${twospace}26${twelvespace}${longblank}
<hr class="s1" />
${twospace}27${twelvespace}${longblank}
<hr class="s1" />
${twospace}28${twelvespace}${longblank}
<hr class="s1" />
${twospace}29${twelvespace}${longblank}
<hr class="s1" />
${twospace}30${twelvespace}${longblank}
</code>

<hr class="s2" />

1) Fill in the prologue and the epilogue of this MIPS function. Assume that <code><b>random</b></code> follows proper
calling conventions, and that it may make its own function calls. You may not need all of the lines.
<hr class="s1" />
2) What operation does this function perform on an integer array? Assume that both the integer array
and the length of the array are passed into the function.

<hr class="s1" />
3) Would this function work as expected if a string was passed into the function instead? Write down
the line numbers of all lines of MIPS code that must be changed (if any at all), so that the function
works correctly on strings. Do not write down any extraneous line numbers.
`;

const q5_1_soln =
`
<h3>Answers</h3>
1)
<code>
${threespace}1${twospace}mystery:${twospace}addiu $sp $sp ________-16_______
<hr class="s1" />
${threespace}2${twelvespace}__________sw $s0 0($sp)__________
<hr class="s1" />
${threespace}3${twelvespace}__________sw $s1 4($sp)__________
<hr class="s1" />
${threespace}4${twelvespace}__________sw $s2 8($sp)__________
<hr class="s1" />
${threespace}5${twelvespace}__________sw $ra 12($sp)_________
<hr class="s1" />
${threespace}6${twelvespace}${longblank}____
<hr class="s1" />
${threespace}7${twelvespace}addu $s0 $0 $0
<hr class="s1" />
${threespace}8${twelvespace}move $s1 $a0
<hr class="s1" />
${threespace}9${twelvespace}move $s2 $a1
<hr class="s1" />
${twospace}10${twospace}loop:${fivespace}srl $t0 $s0 2
<hr class="s1" />
${twospace}11${twelvespace}beq $t0 $s2 exit
<hr class="s1" />
${twospace}12${twelvespace}subu $a0 $s2 $t0
<hr class="s1" />
${twospace}13${twelvespace}jal random
<hr class="s1" />
${twospace}14${twelvespace}sll $v0 $v0 2
<hr class="s1" />
${twospace}15${twelvespace}addu $v0 $v0 $s0
<hr class="s1" />
${twospace}16${twelvespace}addu $t0 $s1 $s0
<hr class="s1" />
${twospace}17${twelvespace}addu $t1 $s1 $v0
<hr class="s1" />
${twospace}18${twelvespace}lw $t2 0($t0)
<hr class="s1" />
${twospace}19${twelvespace}lw $t3 0($t1)
<hr class="s1" />
${twospace}20${twelvespace}sw $t2 0($t1)
<hr class="s1" />
${twospace}21${twelvespace}sw $t3 0($t0)
<hr class="s1" />
${twospace}22${twelvespace}addiu $s0 $s0 4
<hr class="s1" />
${twospace}23${twelvespace}j loop
<hr class="s1" />
${twospace}24${twospace}exit:${fivespace}__________lw $s0 0($sp)__________
<hr class="s1" />
${twospace}25${twelvespace}__________lw $s1 4($sp)__________
<hr class="s1" />
${twospace}26${twelvespace}__________lw $s2 8($sp)__________
<hr class="s1" />
${twospace}27${twelvespace}__________lw $ra 12($sp)_________
<hr class="s1" />
${twospace}28${twelvespace}_________addiu $sp $sp 16________
<hr class="s1" />
${twospace}29${twelvespace}______________jr $ra_____________
<hr class="s1" />
${twospace}30${twelvespace}${longblank}
</code>
<hr class="s1" />
2) The function shuffles the integer array in place.
<hr class="s1" />
3) 10, 14, 18, 19, 20, 21, 22
`;

const imgq6_1 = require('../img/cs61cfa15-6.png');
const q6_1 =
`
<h3>Q6: Registers: bigger is not always better (16 points)</h3>

You decide that instead of having 32, 32-bit registers, you would like to build a machine with 16, 64-bit registers. You also need to make a modified MIPS instruction set for this architecture.
<hr class="s1" />
1) In the box below, specify the size of the fields to best utilize the 32-bit instructions on this new
architecture. Do not modify the size of the opcode.
<hr class="s1" />
<img src=${imgq6_1} class="problem-image" />
<hr class="s1" />
2) How many different R-type instructions can we now have?
<hr class="s1" />
3) If PC = 0x061C, what is the largest address that we can branch to?
<hr class="s1" />
4) Translate the following machine code into MIPS using your new field sizes. Use register numbers
instead of register names, since we’d have to think of a new convention for the names…
<hr class="s1" />
0xAE9FFFF8 = ${longblank}
`;

const imgq6_1_soln = require('../img/cs61cfa15-6_s.png');
const q6_1_soln =
`
1) <img src=${imgq6_1_soln} class="problem-image" />
<hr class="s1" />
2) <b>2^8</b>
3) 0x61c + 4 + (2^17 – 1)*4 = 0x61C + 2^19 = 0x61C + 2^(4*4)*8 = <b>0x8061C</b>
<hr class="s1" />
4) 0xAE9FFFF8 = 101011 | 1010 | 0111 | 111…1000 = <b>sw $7 -8($10)</b>
`;

const q7_1 =
`
<h3>Q7: After this, you’re CALL done! (9 points)</h3>

Connect the definition with the name of the process that describes it.
<hr class="s1" />
${fourspace}a) Compiler
<hr class="s1" />
${fourspace}b) Assembler
<hr class="s1" />
${fourspace}c) Linker
<hr class="s1" />
${fourspace}d) Loader
<hr class="s1" />
1) Outputs code that may still contain pseudoinstructions.
<hr class="s1" />
2) Takes binaries stored on disk and places them in memory to run.
<hr class="s1" />
3) Makes two passes over the code to solve the "forward reference" problem.
<hr class="s1" />
4) Creates a symbol table.
<hr class="s1" />
5) Combines multiple text and data segments.
<hr class="s1" />
6) Generates assembly language code.
<hr class="s1" />
7) Generates machine language code.
<hr class="s1" />
8) Only allows generation of TAL.
<hr class="s1" />
9) Only allows generation of binary machine code.
`;

const q7_1_soln =
`
<h3>Answers</h3>
1) a <hr class="s1" />
2) d <hr class="s1" />
3) b <hr class="s1" />
4) b <hr class="s1" />
5) c <hr class="s1" />
6) a <hr class="s1" />
7) b <hr class="s1" />
8) b <hr class="s1" />
9) c
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Sticky = require('react-stickynode');

class CS61CFa16 extends Component {
  render() {
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
    const problemTitles = [
      'Q1. A dozen ways to ask about bits',
      'Q2. Wow! If only you could C the main memory',
      'Q3. Links, Links, and Lists',
      'Q4. beargit redux',
      'Q5. MIPS Sleuth',
      'Q6. Registers: bigger is not always better',
      'Q7. After, this, you\'re CALL done!'
    ];
    const sidetabContainers = _.map(_.range(problemIDs.length), (index) => {
      const problemID = problemIDs[index];
      const problemTitle = problemTitles[index];
      return (
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to={problemID} spy={true} isDynamic={true} smooth={true} duration={500}>
              {problemTitle}
            </Link>
          </div>
        );
    });

    return (
      <span>
        <h1>CS 61C</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2016 | Stojanovic, Wawrzynek</h5>
        </div>
        <Sticky className="sidebar screen">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          {sidetabContainers}
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-exam.pdf`} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-soln.pdf`} target="_blank">Solutions PDF</a>
          </div>
        </Sticky>
        <div className="sidebar mobile">
          <hr className="s5" />
          <h4>CONTENTS</h4>
          <hr className="s2" />
          {sidetabContainers}
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-exam.pdf`} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/{$examCode}-soln.pdf`} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <div className="content-spacer" />
          <div dangerouslySetInnerHTML={{'__html': clarifications}}></div>
          <Element name="q1">
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} />
          </Element>
          <Element name="q2">
            <hr className="s5" />
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} />
          </Element>
          <Element name="q3">
            <hr className="s5" />
            <Question id={"q3-1"} content={q3_1} solution={q3_1_soln} />
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4-1"} content={q4_1} solution={q4_1_soln} />
          </Element>
          <Element name="q5">
            <hr className="s5" />
            <Question id={"q5-1"} content={q5_1} solution={q5_1_soln} />
          </Element>
          <Element name="q6">
            <hr className="s5" />
            <Question id={"q6-1"} content={q6_1} solution={q6_1_soln} />
          </Element>
          <Element name="q7">
            <hr className="s5" />
            <Question id={"q7-1"} content={q7_1} solution={q7_1_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CFa16;
