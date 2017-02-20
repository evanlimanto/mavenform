import React, { Component } from 'react';
import { Question } from '../components/question';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace } from '../utils';

const _ = require('lodash');
const examCode = 'cs61cfa16';

const q1_1 =
`
<h3>Q1: Number Representation (5 points)</h3>
1. Given the binary number <code>0b11111111</code>:
<ul>
<li>If unsigned, then what is the number in decimal?</li>
<li>If two’s complement, then what is the number in decimal?</li>
</ul>
`;

const q1_1_soln =
`
Answers:
<hr class="s1" />
Part 1: 255
<hr class="s1" />
Part 2: -1
`;

const q1_2 =
`
2. What is the range of integers represented by a n-bit binary number? Your answers should
include expressions that use ${lx('2^n')}.
<hr class="s1" />
If <b>unsigned</b>,
<hr class="s1" />
Smallest: ${blank}
<hr class="s1" />
Largest: ${blank}
<hr class="s2"/>
If <b>two’s complement</b>,
<hr class="s1"/>
Smallest: ${blank}
<hr class="s1" />
Largest: ${blank}
<hr class="s2" />
How many unique integers can be represented in each case?
<hr class="s1"/>
Unsigned: ${blank}
<hr class="s1"/>
Two’s Complement: ${blank}
`;

const q1_2_soln =
`
Answers:
<hr class="s1" />
Smallest: ${lx('{0}')}
<hr class="s1" />
Largest: ${lx('{2^n - 1}')}
<hr class="s1" />
Smallest: ${lx('{-2^{n-1}}')}
<hr class="s1" />
Largest: ${lx('{2^{n-1} - 1}')}
<hr class="s1" />
Unsigned: ${lx('{2^n}')}
<hr class="s1" />
Two's Complement: ${lx('2^n')}
`;

const q1_3 =
`
3.  What is the result of the two’s complement negation applied to the most negative binary
number that can be represented in an n-bit two’s complement form?
`;

const q1_3_soln =
`
Answer: ${lx('-2^{n-1}')}
`;

const q1_4 =
`
4. Consider we have a base 32 number, with each number position represented by the numerals
0 through 9 plus the letters A (10), B (11), C(12), D(13), E (14), F (15), G (16), H (17), I (18), J (19), K (20), L (21), M (22), N (23), O (24), P (25), Q (26), R (27), S (28), T (29), U (30), and V (31).

Convert ${lx('FUN_{32}')} to:
<hr class="s1" />
Binary: ${blank}
<hr class="s1" />
Hexadecimal: ${blank}
<hr class="s1" />
Decimal: ${blank}
`;

const q1_4_soln =
`
Binary: 011|1111|1101|0111
<hr class="s1" />
Hexadecimal: 0x3fd7
<hr class="s1" />
Decimal: ${lx('3*16^3 + 15*16^2 + 13*16^1 + 7*16^0 = 16343')}
`;

const q2_1 =
`
<h3>Q2: Reverse Engineering (10 points)</h3>

The following MIPS code snippet implements a common coding design pattern in C. Your task is to
reverse engineer the code to determine what this pattern is. Do not be concerned about the MIPS
calling conventions, such as saving registers on the stack.

<hr class="s2" />

Assume the following:
$s0 holds the C integer variable b;
<hr class="s1"/>
$s1 holds the C integer variable i;
<hr class="s1"/>
$s2 holds the C integer constant 10;
<hr class="s1"/>
$s3 holds the C pointer to an array of integers a;

<hr class="s2"/>

The code is as follows, with space for comments following the # sign at the right:
<hr class="s1" />
<code>
${threespace}add  $s0, $zero, $zero  ${onespace} # b = 0;
<hr class="s1" />
${threespace}add  $s1, $zero, $zero  ${onespace} # i = 0;
<hr class="s1" />
${threespace}addi $s2, $zero, 10 ${twospace} #
<hr class="s1" />
X:   slt  $t0, $s1, $s2 ${fourspace} #
<hr class="s1" />
${threespace}<b>bne</b> $t0, $zero, Y ${fourspace} #
<hr class="s1" />
${threespace}sll  $t1, $s1, 2 ${sixspace} #
<hr class="s1" />
${threespace}add  $t2, $s3, $t1 ${fourspace} #
<hr class="s1" />
${threespace}sw  $s1, 0($t2) ${_.repeat('&nbsp;', 7)} #
<hr class="s1" />
${threespace}add  $s0, $s0, $s1 ${fourspace} #
<hr class="s1" />
${threespace}addi $s1, $s1, 1 ${fivespace} #
<hr class="s1" />
${threespace}j X ${_.repeat('&nbsp;', 18)} #
<hr class="s1" />
Y: ${_.repeat('&nbsp;', 22)} #
</code>
<hr class="s2" />
Partial credit will be determined, in part, by the quality of your line-by-line comments. Please provide the comments in pseudocode format. The question continues on the next page.
<hr class="s2" />
What is the equivalent C code that is implemented by this MIPS code? Come up with the C
equivalent with the fewest possible lines of code. You might not need all the lines.
`;

const q2_1_soln =
`
<h3>Part 1</h3>
<code>
${threespace}addi $s2, $zero, 10 # $s2 = const 10;
<hr class="s1" />
X:   slt  $t0, $s1, $s2 ${twospace} # i < 10?
<hr class="s1" />
${threespace}<b>bne</b> $t0, $zero, Y ${twospace} # branch if i < 10
<hr class="s1" />
${threespace}sll  $t1, $s1, 2 ${fourspace} # $t1 = i * 4;
<hr class="s1" />
${threespace}add  $t2, $s3, $t1 ${twospace} # $t2 = &a + i * 4 … the address of a[i]
<hr class="s1" />
${threespace}sw  $s1, 0($t2) ${fivespace} # a[i] = i;
<hr class="s1" />
${threespace}add  $s0, $s0, $s1 ${twospace} # b = b + i;
<hr class="s1" />
${threespace}addi $s1, $s1, 1 ${threespace} # i = i + 1;
<hr class="s1" />
${threespace}j X ${_.repeat('&nbsp;', 16)} # loop back to the start
<hr class="s1" />
${threespace}Y: ${_.repeat('&nbsp;', 17)} # exit:
</code>
<hr class="s2" />
<h3>Part 2</h3>
<code>
int i, b, a[10];
<hr class="s1"/>
b = 0;
<hr class="s1"/>
for (i = 0; i >= 10; i++)
<hr class="s1"/>
{
<hr class="s1"/>
${fourspace} a[i] = i;
<hr class="s1"/>
${fourspace} b = b + a[i];
<hr class="s1"/>
}
</code>
<hr class="s2"/>
We also accepted the following, though it consists of more lines of code:
<code>
<hr class="s1"/>
int i, b, a[10];
<hr class="s1"/>
i = 0;
<hr class="s1"/>
b = 0;
<hr class="s1"/>
while (i >= 10)
<hr class="s1"/>
{
<hr class="s1"/>
${fourspace} a[i] = i;
<hr class="s1"/>
${fourspace} b = b + a[i];
<hr class="s1"/>
${fourspace} i = i + 1;
<hr class="s1"/>
}
<hr class="s2"/>
</code>

Some students recognized that the body of the loop would never execute as
i is not greater than or equal 10 the first time through the loop. While
true, this is perfectly legal code, and may even have been included in the
code to confuse the person attempting to reverse engineer it (this is a
process called <i>code obfuscation</i>). If the student changed the bne
instruction to a beq instruction and annotated what they were doing, they
received credit (assuming the rest of the reverse engineering was
correct).
<hr class="s2" />
Common errors:
<hr class="s1" />
<ol>
<li>Misinterpreted the bne conditional and derived the loop limit as <
10. This was a very common mistake.</li>
<li>Did not recognize the inherent looping structure (e.g., needs at
least a goto statement) or thought this must be some kind of function
(e.g., uses a return). This is just a code fragment. There is no
function prologue or epilogue, so what is there to return to? There
is no j $ra in this code.</li>
<li>Forgot that the order of sources and destination is reversed in
assembly language vs. machine language (e.g., and so did incorrect
things like setting i = a[i] instead of the other way around).</li>
<li>Did not understand how array indexing is realized in MIPS assembly
language, e.g., that the index i has to be multiplied by 4 to convert
an integer index into a byte offset from the base of array. Quite a
few students derived statements that had a[i*4] in them.</li>
<li>Some thought that b was extraneous to the calculation, and left it
out of their C code altogether. But you can’t do that, as it is
forming the sum of the array elements.</li>
<li>Some students forgot to declare and initialize their i and b variables.</li>
</ol>
<hr class="s2" />
There were a good number of students who got the question completely
correct. A very large number of students only made the first error, and
got the rest of the question completely correct.
`;

const q3_1 =
`
<h3>Q3: Number Pushing and Popping (10 points)</h3>
Your task is to implement a simple stack adding machine that uses a stack data structure (this is
independent of the stack for calling/returning from subroutines). For example, Push 2, Push 3,
PopAdd yields 5 in the top of the stack. Following this with Push 1, PopAdd would yield 6. Fill in the
code for functions <b><i>push</i></b> and <b><i>popadd</i></b> so they meet the specifications stated in the comments. Do not
make other code modifications. Calls to <b><i>malloc</i></b> always return a valid address. You may not need all
the lines for your code solution, but do include comments for partial credit consideration.

<hr class="s2" />
<code>
/* Each item on the stack is represented
<hr class="s1" />
${threespace}by a pointer to the previous element
<hr class="s1" />
${threespace}(NULL if none) and its value. */
<hr class="s1" />
typedef struct stack_el {
<hr class="s1" />
${fourspace}struct stack_el *prev;
<hr class="s1" />
${fourspace}double val;
<hr class="s1" />
} stack_el;
<hr class="s2" />
/* PUSH: Push new value to top of stack. Return
<hr class="s1" />
${threespace}pointer to new top of stack. */
<hr class="s1" />
stack_el* push(stack_el *top_of_stack, double v) {
<hr class="s2" />
}
<hr class="s2" />
/* POPADD: Pop top stack element and add its value
<hr class="s1" />
${threespace}to the new top’s value. Return new top of stack.
<hr class="s1" />
${threespace}Free no longer used memory. Do not change
<hr class="s1" />
${threespace}the stack if it has fewer than 2 elements. */
<hr class="s1" />
stack_el* popadd(stack_el *top_of_stack) {
<hr class="s2" />
}
</code>
`;

const q3_1_soln =
`
<code>
stack_el* push(stack_el *top_of_stack, double v) {
<hr class="s1" />
${fourspace}stack_el* se = (stack_el*) malloc(sizeof(stack_el));
<hr class="s1" />
${fourspace}se->prev = top_of_stack;
<hr class="s1" />
${fourspace}se->val = v;
<hr class="s1" />
${fourspace}return se;
<hr class="s1" />
}
</code>

<hr class="s2" />

<code>
stack_el* popadd(stack_el *top_of_stack) {
<hr class="s1" />
${fourspace}if (!top_of_stack || !top_of_stack->prev) {
<hr class="s1" />
${_.repeat('&nbsp;', 8)}return top_of_stack;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}top_of_stack->prev->val += top_of_stack->val;
<hr class="s1" />
${fourspace}stack_el *prev = top_of_stack->prev;
<hr class="s1" />
${fourspace}free(top_of_stack);
<hr class="s1" />
${fourspace}return prev;
<hr class="s1" />
}
</code>
`;

const q4_1 =
`
<h3>Q4: Branches are for N00Bs (15 points)</h3>

Consider the discrete-value function ${lx('f(x)')}, defined on the integers {−3,−2,−1,0,1,2,3}:
<hr class="s2" />
${lx('f(−3)	=	6')} ${fourspace} ${lx('f(−2)	=	61')} ${fourspace} ${lx('f(−1) = 17')} ${fourspace} ${lx('f(0)	=	−38')}
${lx('f(1) = 19')} ${fourspace} ${lx('f(2) = 42')} ${fourspace} ${lx('f(3) =	5')}
<hr class="s2" />

Your task is to implement this function in MIPS assembly language (including pseudo-instructions), but you
may NOT use ANY conditional branch instructions (that is, no <i>beq, bne, blt, bgt, ble, or bge</i>). To assist in
accomplishing this, we have stored the return values in contiguous words in the program’s data segment.
<hr class="s2" />

You may assume that the input ${lx('x')} is always one of the integers for which the function is defined (between -3 and 3). Assume ${lx('x')} is stored in $a0 and ${lx('f(x)')} is to be returned in $v0. Comment your code for possible partial credit. You may not need all the lines given.
<hr class="s2" />

<code>
.data
<hr class="s1" />
output: .word 6 61 17 -38 19 42 5
<hr class="s2" />
.text
<hr class="s1" />
f:
<hr class="s1" />
${longblank}
<hr class="s1" />
${longblank}
<hr class="s1" />
${longblank}
<hr class="s1" />
${longblank}
<hr class="s1" />
${longblank}
<hr class="s1" />
${longblank}
</code>
`;

const q4_1_soln =
`
<code>
.data
<hr class="s1" />
output: .word 6 61 17 -38 19 42 5
<hr class="s2" />
.text
<hr class="s1" />
f:
<hr class="s1" />
<u>${fourspace}la $t0, output${fivespace}</u>     // Load the address of “output” from the data segments
<hr class="s1" />
<u>${fourspace}addiu $a0 $a0 3${fourspace}</u>    // Shift the argument range to all non-negative integers
<hr class="s1" />
<u>${fourspace}sll $a0 $a0 2${sixspace}</u>      // Multiply argument value by 4 to index by word
<hr class="s1" />
<u>${fourspace}addu $t0 $t0 $a0${threespace}</u>   // Add the argument index to the data address
<hr class="s1" />
<u>${fourspace}lw $v0 0($t0)${sixspace}</u>      // Load the indexed data address into return val register
<hr class="s1" />
<u>${fourspace}jr $ra${_.repeat('&nbsp;', 13)}</u>
</code>
<hr class="s2" />

<h3>Alternate Solution</h3>
<code>
<hr class="s2" />
.text
<hr class="s1" />
f:
<hr class="s1" />
<u>${fourspace}la $t0, output${fivespace}</u>     // Load the address of “output” from the data segments
<hr class="s1" />
<u>${fourspace}addiu $t0 $t0 12${threespace}</u>    // Move the output address to index 0
<hr class="s1" />
<u>${fourspace}sll $a0 $a0 2${sixspace}</u>      // Multiply argument value by 4 to index by word
<hr class="s1" />
<u>${fourspace}addu $t0 $t0 $a0${threespace}</u>   // Add the argument index to the data address
<hr class="s1" />
<u>${fourspace}lw $v0 0($t0)${sixspace}</u>      // Load the indexed data address into return val register
<hr class="s1" />
<u>${fourspace}jr $ra${_.repeat('&nbsp;', 13)}</u>
</code>
`;

const imgq5_1 = require('../img/cs61cfa16-5.png');
const q5_1 =
`
<h3>Q5: DIPS ISA (15 points)</h3>

Archeologists uncover an ancient binary machine based on 4-bit entities (called nibbles rather than
bytes) as its fundamental building block. Reverse engineering this machine, engineers discover that it
has words, registers, and instructions consisting of <b>six nibbles (a <i>24 bit word machine</i>)</b>. The
machine is <b>nibble addressed</b>, but instructions and data words always begin at a nibble address that
is a <b>multiple of 6</b> (word 0 is at nibble 0, word 1 at nibble 6, word 2 at nibble 12, and so on). The
machine happens to have <b>10 by 24-bit registers</b>. The discoverers name the machine “DIPS.”
<hr class="s2" />

You are asked to reformat the MIPS 32-bit ISA for the smaller DIPS 24-bit instruction word, which
looks remarkably similar (but not identical) to MIPS in terms of its instruction formats and fields. It is
still nibble addressed with 24-bit words and instructions, but you are not otherwise constrained.
<hr class="s2" />

1)  In the boxes below, specify the sizes of the fields for R- and I-type instructions to best utilize the constrained <b>24-bit</b> instructions in the DIPS ISA.

<img src=${imgq5_1} class="problem-image" />

Given your encoding for the R and I instructions above:
<hr class="s2" />
2) What is the maximum number of registers you can address in the width of your r fields?
<hr class="s2" />
3)  What is the maximum number of distinct operations you can encode in the top instruction format?
<hr class="s2" />
4)  If the PC points to the nibble address 156610, what is the highest (largest) nibble address <b>in decimal</b> you can branch to? (NOTE: 1566 is a multiple of 6 and thus a proper DIPS word
address.)
<hr class="s2" />
5)  Translate the following line of DIPS 24-bit machine code into MIPS assembly language, using
your encoding from above. Use $register_number as your register names (e.g., $0, $1, …), and
assume the same opcodes as in the MIPS ISA. <b>Remember instructions are only 24 bits (6 nibbles/hex digits)!</b>

0x8C2408
`;

const imgq5_1_soln = require('../img/cs61cfa16-5_s.png');
const q5_1_soln =
`
<h3>Answers</h3>
<h4>Part 1</h4>
<img src=${imgq5_1_soln} className="problem-image" />
<hr class="s1" />
<h4>Part 2</h4>
<h4>16</h4>
<hr class="s1" />
<h4>Part 3</h4>
${lx('2^1 = 2')}  <i>R-type instructions have a 0 opcode.</i>
<hr class="s1" />
<h4>Part 4</h4>
${lx('463810_{10}')}  <i>PC + 6 = ${lx('1572_{10}')}; largest positive offset in 10 bits = 0b0111111111 = 0x1FF = ${lx('2^9')}-1 = 511 words or 3066 nibbles (6 nibbles per word).
<hr class="s1" />
So max nibble address is ${lx('1572_{10}')} + ${lx('3066_{10}')} = ${lx('4638_{10}')}</i>
<hr class="s1" />
<h4>Part 5</h4>
${lx('1000 11|00 00|10 01|00 0000 1000_2')} = <b>lw $9, 8($0)</b>
`;

const q6_1 =
`
<h3>Q6: Mishmash, Hodgepodge, Potpourri (5 points)</h3>

The following are some multiple choice questions about CALL. Clearly circle the correct answer:
<hr class="s2" />
A system program that combines separately compiled modules of a program into a form suitable for execution is ${blank}.
<hr class="s2" />
A. Assembler
<hr class="s1" />
B. Loader
<hr class="s1" />
C. Linker
<hr class="s1" />
D. None of the Above
<hr class="s2" />
Which flag would you put in a compilation command to include debugging information?
<hr class="s1" />
A. -o
<hr class="s1" />
B. -d
<hr class="s1" />
C. -g
<hr class="s1" />
D. --debug
<hr class="s2" />
At the end of the compiling stage, the symbol table contains the ___ of each symbol.
<hr class="s1" />
A. relative address
<hr class="s1" />
B. absolute address
<hr class="s1" />
C. the stack segment beginning address
<hr class="s1" />
D. the global segment beginning address
<hr class="s2" />
beq and bne instructions produce ${blank} and they ${blank}.
<hr class="s1" />
A. PC-relative addressing, never relocate
<hr class="s1" />
B. PC-relative addressing, always relocate
<hr class="s1" />
C. Absolute addressing, never relocate
<hr class="s1" />
D. Absolute addressing, always relocate
<hr class="s2" />
j and jal instructions add symbols and ${blank} to ${blank}.
<hr class="s1" />
A. instruction addresses, the symbol table
<hr class="s1" />
B. symbol addresses, the symbol table
<hr class="s1" />
C. instruction addresses, the relocation table
<hr class="s1" />
D. symbol addresses, the relocation table
`;

const q6_1_soln =
`
<h3>Answers</h3>
C
<hr class="s1" />
C
<hr class="s1" />
A
<hr class="s1" />
A
<hr class="s1" />
C
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Sticky = require('react-stickynode');

class CS61CFa16 extends Component {
  render() {
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
    const problemTitles = [
      'Q1. Number Representation',
      'Q2. Reverse Engineering',
      'Q3. Number Pushing and Popping',
      'Q4. Branches are for N00Bs',
      'Q5. DIPS ISA',
      'Q6. Mishmash, Hodgepodge, Potpourri'
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
          <h5>Midterm 1 | Fall 2016 | Boser, Katz</h5>
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
          <Element name="q1">
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} />
            <hr className="s5" />
            <Question id={"q1-2"} content={q1_2} solution={q1_2_soln} />
            <hr className="s5" />
            <Question id={"q1-3"} content={q1_3} solution={q1_3_soln} />
            <hr className="s5" />
            <Question id={"q1-4"} content={q1_4} solution={q1_4_soln} />
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
        </div>
      </span>
    );
  }
}

export default CS61CFa16;
