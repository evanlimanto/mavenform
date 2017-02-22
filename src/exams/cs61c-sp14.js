import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, sevenspace, eightspace } from '../utils';

const _ = require('lodash');

const tenspace = _.repeat('&nbsp;', 10);
const twelvespace = _.repeat('&nbsp;', 12);
const sixteenspace = _.repeat('&nbsp;', 16);

const q1_1 =
`
<h3>Q1: What’s that funky smell?! Oh yeah, it’s potpourri... (30 pts)</h3>
a)  The unsigned distance between two bit patterns is
the absolute value of the difference of their values,
interpreted as unsigned numbers.  Rank the following
according to the unsigned distance between -1 and 0
(+0 if a representation has multiple zeros) in that
representation. You should assign a rank of 1 to the
representation with the <b><u>smallest</u></b> unsigned distance
between -1 and 0.

<hr class="s2" />
int64_t:
<hr class="s1" />
64-bit One's Complement:
<hr class="s1" />
64-bit Sign and Magnitude:
<hr class="s1" />
64-bit Bias notation:
<hr class="s1" />
double:
`;

const q1_1_soln =
`
int64_t: <b>5</b>
<hr class="s1" />
64-bit One's Complement: <b>4</b>
<hr class="s1" />
64-bit Sign and Magnitude: <b>2</b>
<hr class="s1" />
64-bit Bias notation: <b>1</b>
<hr class="s1" />
double: <b>3</b>
`;

const q1_2 =
`
b)  As defined in IEEE 754-2008 standard, <u>half-precision floating point</u> (FP) is a 16-bit FP
representation: 1 sign bit, 5 exponent bits, and 10 significand bits. The exponent bias of 15. What is the binary representation of the <i>smallest half-precision float which is strictly larger than 1</i>? What is its value? Leave your answer in terms of powers of two.
<hr class="s2" />
0b<code>${longblank}</code> = ${blank}
`;

const q1_2_soln =
`
0b <b>0${threespace}01111${threespace}0000000001</b> = <b>1 + ${lx('2^{-10}')}</b>
`;

const q1_3 =
`
c)  How would J-type instructions be affected (in terms of their “reach”) if we relaxed the requirement
that instructions be placed on word boundaries, and instead required them to be placed on <i>half-word</i> boundaries.
`;

const q1_3_soln =
`
The range over which we can jump would be cut in half.
`;

const q1_4 =
`
d)  Building on the idea from the previous question, give a minor tweak to the MIPS ISA to allow us to
use <i>true absolute addressing</i> (i.e., maximal “reach”) for all J-type instructions.
`;

const q1_4_soln =
`
Only allow jumps to addresses which are multiples of ${lx('2^6')}.
`;

const q1_5 =
`
e)  Assume a request for 100 Bytes on either the <b>Stack</b> and <b>Heap</b> would succeed.
In the worst case, <i>how many clock cycles</i> would it take to <b>allocate</b> 100 Bytes in each area & <i>why</i>?
(“How many” should be answered with one of: {1, tens, thousands+})
<hr class="s2" />
<b>Stack:</b>${blank} because ${longblank}
<hr class="s1" />
<b>Heap:</b>${blank} because ${longblank}
`;

const q1_5_soln =
`
<b>Stack:</b> <b>1</b> because <b>it's just addiu $sp $sp -100</b>.
<hr class="s1" />
<b>Heap:</b> <b>Thousands+</b> because <b>the freelist might contain lots of slivers to check</b>.
`;

const q1_6 =
`
You have a program that can achieve almost a 20x speedup with millions of processors, so what is the percent of the parallel portion of its code?
`;

const q1_6_soln =
`
95
`;

const q1_7 =
`
g)  Suppose the assembler knew the file line numbers of all labels before it began its first pass over a

file, and that every line in the file contains an instruction. Then the assembler would need ${blank}
pass(es) to translate a MAL file, and ${blank} pass(es) to translate a TAL file. These numbers differ
because of <code>${longblank}</code> (write n/a if they don't differ).
`;

const q1_7_soln =
`
2, 1, pseudoinstructions
`;

const q1_8 =
`
Complete the code below, using <i>only one TAL instruction</i>, so that it returns true iff <b>$a0</b> is an I-type instruction or a J-type instruction, and then translate the instruction into binary then hexadecimal.
<hr class="s2" />
<code>
IJ-instr: ${blank} -> 0b${longblank} -> 0x${blank}
<hr class="s1" />
${_.repeat(' ', 10)}jr $ra
</code>
`;

const q1_8_soln =
`
<code>IJ-instr: <b>srl $v0 $a0 26</b></code>
<hr class="s2" />
<code>0b <b>0000|00 00|000 0|0100 0001|0 110|10 00|0010</b></code>
<hr class="s2" />
<code>0x <b>0004 1682</b></code>

`

const q1_9 =
`
What is one thing Google did to increase their Power Usage Efficiency (PUE)?
`;

const q1_9_soln =
`
Careful airflow handling, elevated cold aisle temp, use free cooling, per-server ups.
`;

const q2_1 =
`
<h3>Question 2: Running in circles (15 pts)</h3>
a)  Recall the exercise <code><b>ll_cycle</b></code> from lab 2, in which we checked if a linked list contained a cycle using the tortoise and hare algorithm.  We’ve provided you with most of a simple <i>recursive</i> implementation in the space below. Fill in the base cases.

<hr class="s2" />
<code>
int ll_has_cycle(node *ptr) {
<hr class="s1" />
${fourspace}if (!ptr)
<hr class="s1" />
${eightspace}return 0;
<hr class="s1" />
${fourspace}return has_cycle(ptr, ptr->next);
<hr class="s1" />
}
<hr class="s2" />
int has_cycle(node *tortoise, node *hare) {
<hr class="s1" />
${fourspace}if (${longblank})
<hr class="s1" />
${eightspace}return 1;
<hr class="s1" />
${fourspace}if (${longblank})
<hr class="s1" />
${eightspace}return 0;
<hr class="s1" />
${fourspace}return has_cycle(tortoise->next, hare->next->next);
<hr class="s1" />
}
</code>
`;

const q2_1_soln =
`
<code>
hare == tortoise
<hr class="s1" />
!hare || !hare->next
</code>
`;

const q2_2 =
`
b)  Now that you've warmed up on the C version of this code, let’s convert has_cycle into recursive MAL MIPS. Assume that the fields of the structs are not permuted from the struct definition. You may use fewer lines than we provide you, but do not add any more than the space provided.

<hr class="s2" />
<code>
# $a0 contains the pointer to the tortoise.
<hr class="s1" />
# $a1 contains the pointer to the hare.
<hr class="s2" />
has_cycle: ${twospace}li $v0 1
<hr class="s1" />
${twelvespace}beq $a0 $a1 done
<hr class="s1" />
${twelvespace}li $v0 0
<hr class="s1" />
${twelvespace}beq ${_.repeat('_', 10)} ${_.repeat('_', 10)} done
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}beq ${_.repeat('_', 10)} ${_.repeat('_', 10)} done
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}addiu ${_.repeat('_', 7)} ${_.repeat('_', 7)} ${_.repeat('_', 8)}
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}${longblank}
<hr class="s1" />
${twelvespace}addiu ${_.repeat('_', 7)} ${_.repeat('_', 7)} ${_.repeat('_', 8)}
<hr class="s1" />
done: ${sixspace}jr return a
</code>
`;

const q2_2_soln =
`
<code>
# $a0 contains the pointer to the tortoise.
<hr class="s1" />
# $a1 contains the pointer to the hare.
<hr class="s2" />
has_cycle: ${onespace}li $v0 1
<hr class="s1" />
${twelvespace}beq $a0 $a1 done
<hr class="s1" />
${twelvespace}li $v0 0
<hr class="s1" />
${twelvespace}beq <b>$a1</b> <b>$0</b> done
<hr class="s1" />
${twelvespace}<b>lw $a1 4($a1)</b>
<hr class="s1" />
${twelvespace}beq <b>$a1</b> <b>$0</b> done
<hr class="s1" />
${twelvespace}<b>lw $a0 4($a0)</b>
<hr class="s1" />
${twelvespace}<b>lw $a1 4($a1)</b>
<hr class="s1" />
${twelvespace}addiu <b>$sp</b> <b>$sp</b> <b>-4</b>
<hr class="s1" />
${twelvespace}<b>sw $ra 0($sp)</b>
<hr class="s1" />
${twelvespace}<b>jal has_cycle</b>
<hr class="s1" />
${twelvespace}<b>lw $ra 0($sp)</b>
<hr class="s1" />
${twelvespace}addiu <b>$sp</b> <b>$sp</b> <b>4</b>
<hr class="s1" />
done: ${sixspace}jr $ra
</code>
`;

const q2_3 =
`
c) You want to change this to be an <i>iterative</i> MIPS solution, but you want to <i>change the fewest lines</I> you can. Circle those lines you would change to make the program work <i>iteratively</i>.
`;

const q2_3_soln = `
<code>
# $a0 contains the pointer to the tortoise.
<hr class="s1" />
# $a1 contains the pointer to the hare.
<hr class="s2" />
has_cycle: ${onespace}li $v0 1
<hr class="s1" />
${twelvespace}beq $a0 $a1 done
<hr class="s1" />
${twelvespace}li $v0 0
<hr class="s1" />
${twelvespace}beq <b>$a1</b> <b>$0</b> done
<hr class="s1" />
${twelvespace}<b>lw $a1 4($a1)</b>
<hr class="s1" />
${twelvespace}beq <b>$a1</b> <b>$0</b> done
<hr class="s1" />
${twelvespace}<b>lw $a0 4($a0)</b>
<hr class="s1" />
${twelvespace}<b>lw $a1 4($a1)</b>
<hr class="s1" />
${twelvespace}addiu <b>$sp</b> <b>$sp</b> <b>-4</b> ${onespace}<i><- circled, changed to nop</i>
<hr class="s1" />
${twelvespace}<b>sw $ra 0($sp)</b> ${threespace} <i><- circled, changed to nop</i>
<hr class="s1" />
${twelvespace}<b>jal has_cycle</b> ${threespace} <i><- change to j has_cycle</i>
<hr class="s1" />
${twelvespace}<b>lw $ra 0($sp)</b>
<hr class="s1" />
${twelvespace}addiu <b>$sp</b> <b>$sp</b> <b>4</b>
<hr class="s1" />
done: ${sixspace}jr $ra
</code>
`;

const q3_1 =
`
<h3>Question 3: Our band is called 1023MiB... We haven’t had any gigs yet. (15 pts)</h3>

We have a standard 32-bit byte-addressed MIPS machine with a 1KiB direct-mapped write-back
cache and 16B block size.
<hr class="s2" />

a)  How many bits are used for the:
<hr class="s1" />
Tag? ${blank}
<hr class="s1" />
Index? ${blank}
<hr class="s1" />
Offset? ${blank}
`;

const q3_1_soln =
`
Tag: <b>22</b>
<hr class="s1" />
Index: <b>6</b>
<hr class="s1" />
Offset: <b>4</b>
`;

const q3_2 =
`
Consider the following C code, and answer the questions below. <code><b>d</b></code> and <code><b>s</b></code> are pointers to 8-bit unsigned integer arrays, of the same size (a multiple of the cache size) that are aligned on 16-byte
boundaries. The arrays contain only one <code><b>0x00</b></code>, in the last byte.<code><b>d</b></code> and <code><b>s</b></code> are not necessarily distinct.

<hr class="s2" />

<code>
void our_strcpy(uint8_t *d, uint8_t *s) {
<hr class="s1" />
${fourspace}char c;
<hr class="s1" />
${fourspace}do {
<hr class="s1" />
${eightspace}c = *s;
<hr class="s1" />
${eightspace}*d = c;
<hr class="s1" />
${eightspace}s++; d++;
<hr class="s1" />
${fourspace}} while (c);
<hr class="s1" />
}
</code>

<hr class="s2" />
b) What is the <i>lowest</i> possible cache hit rate for <code><b>our_strcpy</b></code>?
`;

const q3_2_soln =
`
<b>0</b>
`;

const q3_3 =
`
c) What <i>types</i> of misses are there?
`;

const q3_3_soln =
`
<b>Compulsory and conflict</b>
`;

const q3_4 =
`
d) What is the <i>smallest possible</i> value of <code>(d - s)</code> that would get this hit rate?
`;

const q3_4_soln =
`
<b>1 KiB</b>
`;

const q3_5 =
`
e) What is the <i>highest</i> possible cache hit rate for <code><b>our_strcpy</b></code>?
`;

const q3_5_soln =
`
<b>31/32</b>
`;

const q3_6 =
`
f) What is one possible value of <code><b>(d - s)</b></code> where we would get this hit rate?
`;

const q3_6_soln =
`
<h3>0</h3>
<hr class="s1" />
<i>2 misses per block * 2^6 blocks/cache * 2^13 caches = 2^20 misses</i>
`;

const q3_7 =
`
g) If we ran <code><b>our_strcpy</b></code> with a 4-way set-associative LRU cache, and the sizes of both <code><b>d</b></code> and <code><b>s</b></code> are 8MiB, what is the <i>most # of misses</i> possible?
`;

const q3_7_soln =
`
<b>1 Mebi</b>
`;

const q4_1 =
`
<h3>Question 4: A bad case of Not Invented Here Syndrome... (15 pts)</h3>
<hr class="s1" />
a) A colleague of yours has implemented some homebrew C99 string manipulation functions, while

steadfastly refusing to use any standard libraries, but they’re buggy!  We've marked each
potentially problematic line with <code>// <number></code>.  Your job is to fill in a correct replacement line in the
corresponding row of the following table, or write <i>'OK' if there is nothing wrong</i>.  DO NOT LEAVE ANY FIELDS BLANK, or we will assume you just didn't get to this part of the exam.

<hr class="s2" />

<table>
<thead><tr><th width="2">Line number</th><th>Replacement Code</th></tr></thead>
<tbody>
<tr><td>1</td><td></td></tr>
<tr><td>2</td><td></td></tr>
<tr><td>3</td><td></td></tr>
<tr><td>4</td><td></td></tr>
<tr><td>5</td><td></td></tr>
</tbody>
</table>

<hr class="s2" />

<code>
/** Converts the string S to lowercase */
<hr class="s1" />
void string_to_lowercase(char *s) {
<hr class="s1" />
${fourspace}for (char c = *s; c != '\\0'; s++) { ${sixspace} // 1
<hr class="s1" />
${eightspace}if (c >= 'A' && c <= 'S') {
<hr class="s1" />
${twelvespace}s += 'a' - 'A';${_.repeat('&nbsp;', 17)} // 2
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
<hr class="s2" />
/** Returns the number of bytes in S before, but not counting, the null terminator. */
<hr class="s1" />
size_t string_length(char *s) {
<hr class="s1" />
${fourspace}char *s2 = s;
<hr class="s1" />
${fourspace}while (*s2++); ${_.repeat('&nbsp;', 25)} // 3
<hr class="s1" />
${fourspace}return s2 - s - 1; ${_.repeat('&nbsp;', 21)} // 4
<hr class="s1" />
}
<hr class="s2" />
/** Return the number of odd numbers in a number array */
<hr class="s1" />
uint32_t number_odds(uint32_t *numbers, uint32_t size) {
<hr class="s1" />
${fourspace}uint32_t odds = 0;
<hr class="s1" />
${fourspace}for (uint32_t i = 0; i < size; i++)
<hr class="s1" />
${eightspace}odds += *numbers+i && 1; ${_.repeat('&nbsp;', 11)} // 5
<hr class="s1" />
${fourspace}return odds;
<hr class="s1" />
}
</code>
`;

const q4_1_soln =
`
<table class="special-table">
<thead><tr><th width="1">Line number</th><th>Replacement Code</th></tr></thead>
<tbody>
<tr><td>1</td><td><code>for (char c = *s; (c = *s) != '\\0'; s++) {</code></td></tr>
<tr><td>2</td><td><code>*s += 'a' - 'A';</code></td></tr>
<tr><td>3</td><td><code>OK</code></td></tr>
<tr><td>4</td><td><code>OK</code></td></tr>
<tr><td>5</td><td><code>odds += numbers[i] & 1${twospace}...${twospace}odds += *(numbers+i) & 1</code></td></tr>
</tbody>
</table>
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS61CSp14 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs61csp14';
    const problemIDs = ['q1', 'q2', 'q3', 'q4'];
    const problemTitles = [
      'Q1. What\'s that funky smell?! Oh yeah, it\'s popourri..',
      'Q2. Running in circles',
      'Q3. Our band is called 1023MiB... We haven\'t had any gigs yet.',
      'Q4. A bad case of Not Invented Here Syndrome...'
    ];

    return (
      <span>
        <h1>CS 61C</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2014 | Garcia</h5>
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
            <hr className="s5" />
            <Question id={"q1-4"} content={q1_4} solution={q1_4_soln} />
            <hr className="s5" />
            <Question id={"q1-5"} content={q1_5} solution={q1_5_soln} />
            <hr className="s5" />
            <Question id={"q1-6"} content={q1_6} solution={q1_6_soln} />
            <hr className="s5" />
            <Question id={"q1-7"} content={q1_7} solution={q1_7_soln} />
            <hr className="s5" />
            <Question id={"q1-8"} content={q1_8} solution={q1_8_soln} />
            <hr className="s5" />
            <Question id={"q1-9"} content={q1_9} solution={q1_9_soln} />
          </Element>
          <Element name="q2">
            <hr className="s5" />
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} />
            <hr className="s5" />
            <Question id={"q2-2"} content={q2_2} solution={q2_2_soln} />
            <hr className="s5" />
            <Question id={"q2-3"} content={q2_3} solution={q2_3_soln} />
          </Element>
          <Element name="q3">
            <hr className="s5" />
            <Question id={"q3-1"} content={q3_1} solution={q3_1_soln} />
            <hr className="s5" />
            <Question id={"q3-2"} content={q3_2} solution={q3_2_soln} />
            <hr className="s5" />
            <Question id={"q3-3"} content={q3_3} solution={q3_3_soln} />
            <hr className="s5" />
            <Question id={"q3-4"} content={q3_4} solution={q3_4_soln} />
            <hr className="s5" />
            <Question id={"q3-5"} content={q3_5} solution={q3_5_soln} />
            <hr className="s5" />
            <Question id={"q3-6"} content={q3_6} solution={q3_6_soln} />
            <hr className="s5" />
            <Question id={"q3-7"} content={q3_7} solution={q3_7_soln} />
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4-1"} content={q4_1} solution={q4_1_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CSp14;
