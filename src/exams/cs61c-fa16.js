import React, { Component } from 'react';
import { Question } from '../components/question';
import { lmatrix, lx } from '../utils';

const _ = require('lodash');

const blank = _.repeat('_', 8);

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
255
<hr class="s1" />
-1
`;

const q1_2 =
`
2. What is the range of integers represented by a n-bit binary number? Your answers should
include expressions that use ${lx('2^n')}.

If <b>unsigned</b>,
<hr class="s1" />
smallest: ${blank}
<hr class="s1" />
largest: ${blank}
<hr class="s2"/>
If <b>two’s complement</b>,
<hr class="s1"/>
smallest: ${blank}
<hr class="s1" />
largest: ${blank}
<hr class="s2" />
How many unique integers can be represented in each case?
<hr class="s1"/>
Unsigned: ${blank}
<hr class="s1"/>
Two’s Complement: ${blank}
`;

const q1_2_soln =
`
0
${lx('2^n - 1')}
${lx('-2^{n-1}')}
${lx('2^{n-1} - 1')}
${lx('2^n')}
${lx('2^n')}
`;

const q1_3 =
`
3.  What is the result of the two’s complement negation applied to the most negative binary
number that can be represented in an n-bit two’s complement form?
`;

const q1_3_soln =
`
${lx('-2^{n-1}')}
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

<code>
add  $s0, $zero, $zero  # b = 0;
<hr class="s1" />
add  $s1, $zero, $zero  # i = 0;
<hr class="s1" />
addi $s2, $zero, 10 #
<hr class="s1" />
X:   slt  $t0, $s1, $s2 #
<hr class="s1" />
<b>bne</b> $t0, $zero, Y #
<hr class="s1" />
sll  $t1, $s1, 2 #
<hr class="s1" />
add  $t2, $s3, $t1 #
<hr class="s1" />
sw  $s1, 0($t2) #
<hr class="s1" />
add  $s0, $s0, $s1 #
<hr class="s1" />
addi $s1, $s1, 1 #
<hr class="s1" />
j X #
<hr class="s1" />
Y: #
</code>

Partial credit will be determined, in part, by the quality of your line-by-line comments. Please provide the comments in pseudocode format. The question continues on the next page.
<hr class="s2" />
What is the equivalent C code that is implemented by this MIPS code? Come up with the C
equivalent with the fewest possible lines of code. You might not need all the lines.
`;

const q2_1_soln =
`
# $s2 = const 10;
<hr class="s1"/>
# i < 10?
<hr class="s1"/>
# branch if i < 10
<hr class="s1"/>
# $t1 = i * 4;
<hr class="s1"/>
# $t2 = &a + i * 4 … the address of a[i]
<hr class="s1"/>
# a[i] = i;
<hr class="s1"/>
# b = b + i;
<hr class="s1"/>
# i = i + 1;
<hr class="s1"/>
# loop back to the start
<hr class="s1"/>
# exit:
<hr class="s2"/>
<code>
int i, b, a[10];
<hr class="s1"/>
b = 0;
<hr class="s1"/>
for (i = 0; i >= 10; i++)
<hr class="s1"/>
{
<hr class="s1"/>
   a[i] = i;
<hr class="s1"/>
   b = b + a[i];
<hr class="s1"/>
}
</code>
<hr class="s2"/>
We also accepted the following, though it consists of more lines of code:
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
   a[i] = i;
<hr class="s1"/>
   b = b + a[i];
<hr class="s1"/>
   i = i + 1;
<hr class="s1"/>
}
<hr class="s2"/>

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
<li>1. Misinterpreted the bne conditional and derived the loop limit as <
10. This was a very common mistake.</li>
<li>2. Did not recognize the inherent looping structure (e.g., needs at
least a goto statement) or thought this must be some kind of function
(e.g., uses a return). This is just a code fragment. There is no
function prologue or epilogue, so what is there to return to? There
is no j $ra in this code.</li>
<li>3. Forgot that the order of sources and destination is reversed in
assembly language vs. machine language (e.g., and so did incorrect
things like setting i = a[i] instead of the other way around).</li>
<li>4. Did not understand how array indexing is realized in MIPS assembly
language, e.g., that the index i has to be multiplied by 4 to convert
an integer index into a byte offset from the base of array. Quite a
few students derived statements that had a[i*4] in them.</li>
<li>5. Some thought that b was extraneous to the calculation, and left it
out of their C code altogether. But you can’t do that, as it is
forming the sum of the array elements.</li>
<li>6. Some students forgot to declare and initialize their i and b variables.</li>
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

/* Each item on the stack is represented
   by a pointer to the previous element
   (NULL if none) and its value. */
typedef struct stack_el {
    struct stack_el *prev;
    double val;
} stack_el;

/* PUSH: Push new value to top of stack. Return
   pointer to new top of stack. */
stack_el* push(stack_el *top_of_stack, double v) {

}

/* POPADD: Pop top stack element and add its value
   to the new top’s value. Return new top of stack.
   Free no longer used memory. Do not change
   the stack if it has fewer than 2 elements. */
stack_el* popadd(stack_el *top_of_stack) {

}
`;

const q3_1_soln =
`
stack_el* se = (stack_el*) malloc(sizeof(stack_el));
se->prev = top_of_stack;
se->val = v;
return se;

<hr class="s2" />

if (!top_of_stack || !top_of_stack->prev) {
  return top_of_stack;
}
top_of_stack->prev->val += top_of_stack->val;
stack_el *prev = top_of_stack->prev;
free(top_of_stack);
return prev;
`;

const q4_1 =
`
<h3>Q4: Branches are for N00Bs (15 points)</h3>

Consider the discrete-value function ${lx('f(x)')}, defined on the integers {−3,−2,−1,0,1,2,3}:
<hr class="s2" />
f(−3)	=	6 f(−2)	=	61 f(−1)=	17 f(0)	=	−38
f(1)	=	19 f(2)	=	42 f(3)	=	5
<hr class="s2" />

Your task is to implement this function in MIPS assembly language (including pseudo-instructions), but you
may NOT use ANY conditional branch instructions (that is, no <i>beq, bne, blt, bgt, ble, or bge</i>). To assist in
accomplishing this, we have stored the return values in contiguous words in the program’s data segment.
<hr class="s2" />

You may assume that the input ${lx('x')} is always one of the integers for which the function is defined (between -3 and 3). Assume ${lx('x')} is stored in $a0 and ${lx('f(x)')} is to be returned in $v0. Comment your code for possible partial credit. You may not need all the lines given.
<hr class="s2" />

<code>
.data
output: .word 6 61 17 -38 19 42 5
<hr class="s2" />
.text
f:
${blank}
${blank}
${blank}
${blank}
${blank}
${blank}
</code>
`;

const q4_1_soln =
`
<code>
.data
output: .word 6 61 17 -38 19 42 5
<hr class="s2" />
.text
f:
la $t0, output     // Load the address of “output” from the data segments
addiu $a0 $a0 3     // Shift the argument range to all non-negative integers
sll $a0 $a0 2      // Multiply argument value by 4 to index by word
addu $t0 $t0 $a0    // Add the argument index to the data address
lw $v0 0($t0)      // Load the indexed data address into return val register
jr $ra
</code>

<h3>Alternate Solution</h3>
<code>
.data
output: .word 6 61 17 -38 19 42 5
<hr class="s2" />
.text
la $t0, output     // Load the address of “output” from the data segments
addiu $t0 $t0 12    // Move the output address to index 0
sll $a0 $a0 2      // ultiply argument value by 4 to index by word
addu $t0 $t0 $a0    // Add the argument index to the data address
lw $v0 0($t0)      // Load the indexed data address into return val register
jr $ra
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

const q5_1_soln =
`
16

${lx('2^1 = 2')}  <i>R-type instructions have a 0 opcode.</i>

${lx('463810_{10}')}  <i>PC + 6 = ${lx('1572_{10}')}; largest positive offset in 10 bits = 0b0111111111 = 0x1FF = ${lx('2^9')}-1 = 511
words or 3066 nibbles (6 nibbles per word). So max nibble address is ${lx('1572_{10}')} + ${lx('3066_{10}')} = ${lx('4638_{10}')}</i>

1000 11|00 00|10 01|00 0000 10002 = <b>lw $9, 8($0)</b>
`;

const q6_1 =
`
<h3>Q6: Mishmash, Hodgepodge, Potpourri (5 points)</h3>

The following are some multiple choice questions about CALL. Clearly circle the correct answer:
<hr class="s2" />
A system program that combines separately compiled modules of a program into a form suitable for execution is ${blank}.
<hr class="s2" />
A. Assembler
B. Loader
C. Linker
D. None of the Above
<hr class="s2" />
Which flag would you put in a compilation command to include debugging information?
A. -o
B. -d
C. -g
D. --debug
<hr class="s2" />
At the end of the compiling stage, the symbol table contains the ___ of each symbol.
A. relative address
B. absolute address
C. the stack segment beginning address
D. the global segment beginning address
<hr class="s2" />
beq and bne instructions produce ${blank} and they ${blank}.
A. PC-relative addressing, never relocate
B. PC-relative addressing, always relocate
C. Absolute addressing, never relocate
D. Absolute addressing, always relocate
<hr class="s2" />
j and jal instructions add symbols and ${blank} to ${blank}.
A. instruction addresses, the symbol table
B. symbol addresses, the symbol table
C. instruction addresses, the relocation table
D. symbol addresses, the relocation table
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Sticky = require('react-stickynode');

class CS61CFa16 extends Component {
  render() {
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
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q3" spy={true} isDynamic={true} smooth={true} duration={500}>
              3. Solve It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" spy={true} isDynamic={true} smooth={true} duration={500}>
              4. Invert It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" spy={true} isDynamic={true} smooth={true} duration={500}>
              5. Show It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" spy={true} isDynamic={true} smooth={true} duration={500}>
              6. Null It
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" spy={true} isDynamic={true} smooth={true} duration={500}>
              7. Finding the Bright Cave
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" spy={true} isDynamic={true} smooth={true} duration={500}>
              8. A Tale of Two Cities
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q9" spy={true} isDynamic={true} smooth={true} duration={500}>
              9. Justin Beaver
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-exam.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-soln.pdf'} target="_blank">Solutions PDF</a>
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
              3. Solve It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q4" isDynamic={true} smooth={true} duration={500}>
              4. Invert It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q5" isDynamic={true} smooth={true} duration={500}>
              5. Show It
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q6" isDynamic={true} smooth={true} duration={500}>
              6. Null It
            </Link>
          </div>
          <hr className="s1" />
          <div className="sidetitle">Free-form Problems</div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q7" isDynamic={true} smooth={true} duration={500}>
              7. Finding the Bright Cave
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q8" isDynamic={true} smooth={true} duration={500}>
              8. A Tale of Two Cities
            </Link>
          </div>
          <div className="sidetab-container">
            <Link activeClass="active" className="sidetab" to="q9" isDynamic={true} smooth={true} duration={500}>
              9. Justin Beaver
            </Link>
          </div>
          <hr className="s2" />
          <h4>SOURCES</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-exam.pdf'} target="_blank">Exam PDF</a>
          </div>
          <div className="sidetab-container">
            <a className="sidetab" href={process.env.PUBLIC_URL + '/exams/ee16Afa15-soln.pdf'} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <hr className="s5" />
          <Element name="q1">
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} />
            <hr className="s5" />
            <Question id={"q1-2"} content={q1_2} />
            <hr className="s5" />
            <Question id={"q1-3"} content={q1_3} />
            <hr className="s5" />
            <Question id={"q1-4"} content={q1_4} />
          </Element>
          <Element name="q2">
            <hr className="h5" />
            <Question id={"q2-1"} content={q2_1} />
          </Element>
          <Element name="q3">
            <hr className="h5" />
            <Question id={"q3-1"} content={q3_1} />
          </Element>
          <Element name="q4">
            <hr className="h5" />
            <Question id={"q4-1"} content={q4_1} />
          </Element>
          <Element name="q5">
            <hr className="h5" />
            <Question id={"q5-1"} content={q5_1} />
          </Element>
          <Element name="q6">
            <hr className="h5" />
            <Question id={"q6-1"} content={q6_1} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CFa16;
