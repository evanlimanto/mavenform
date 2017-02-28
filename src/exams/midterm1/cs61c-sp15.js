import React, { Component } from 'react';

import { Question, Sidebar } from '../../components';
import { lx, longblank, blank } from '../../utils';

const _ = require('lodash');

const twelvespace = _.repeat('&nbsp;', 12);

const q1_1 =
`
<h3>Q1: Number Representation (10 points)</h3>

1) Convert the following 8-bit two’s-complement numbers from hexadecimal to decimal:
<hr class="s2" />

0x80 =
<hr class="s1" />
0xFF =
<hr class="s1" />
0x0F =
`;

const q1_1_soln =
`
0x80 = <b>-128</b>
<hr class="s1" />
0xFF = <b>-1</b>
<hr class="s1" />
0x0F = <b>15</b>
`;

const q1_2 =
`
2) For two n-bit numbers, what is the difference between the largest unsigned number and the largest two’s-complement number? In other words, what is <code><b>MAX_UNSIGNED_INT – MAX_SIGNED_INT</b></code>? Write your answer in terms of <code>n</code>.
`;

const q1_2_soln =
`
${lx('2^n')} – 1 – (${lx('2^{n-1}')} – 1) = ${lx('2^{n-1}')}
`;

const q1_3 =
`
3) Fill in the blanks to return the largest positive number a 32-bit two’s-complement number can
represent.
<hr class="s2" />
<code>
unsigned int max_twos() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return ((1 << ${blank}) - ${blank});
<hr class="s1" />
}
</code>
`;

const q1_3_soln =
`
<code>
unsigned int max_twos() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return ((1 << <b>31</b>) - <b>1</b>);
<hr class="s1" />
}
</code>
`;

const q1_4 =
`
4) Consider a new type of notation for representing signed numbers, biased notation. The formula for obtaining the value from a number written in biased notation is:
<hr class="s1" />
<p align="center"><b>value = value_as_unsigned – b</b></p>
<hr class="s1" />
Where <code>b</code> is a constant called the bias. Example with 4 bits and a bias of 4:
<hr class="s2" />
<code>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0b0011 = 3 – 4 = -1
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0b1110 = 14 – 4 = 10
</code>
<hr class="s2" />

If we wanted an n-bit biased system to represent the same range as two’s complement numbers,
what is the value of b?
`;

const q1_4_soln =
`
The most negative number needs to be ${lx('-2^{n-1}')}. The most negative number in biased notation is 0 – b so our bias is ${lx('2^{n-1}')}.
`;

const imgq2_1 = require('../../img/cs61csp15-2.png');
const q2_1 =
`
<h3>Q2: Pointers and Memory (12 points)</h3>

1) Assume you are given an int array arr, with a pointer p to its beginning:
<hr class="s2" />
<code>
int	arr[] =	{0x61c,	0x5008, 0xd, 0x4,	0x3, 0x4ffc};
<hr class="s1" />
int	*p = arr;
</code>
<hr class="s2" />
Suppose <code>arr</code> is at location <code>0x5000</code> in memory, i.e., the value of <code>p</code> if interpreted as an integer is <code>0x5000</code>. To visualize this scenario:

<hr class="S2" />
<img src=${imgq2_1} class="problem-image" />
<hr class="S2" />

Assume that integers and pointers are both 32 bits. What are the values of the following
expressions? If an expression may cause an error, write “Error” instead.
<hr class="s1" />
a) *(p+3) =
<hr class="s1" />
b) p[4]	=
<hr class="s1" />
c) *(p+5)	+	p[3] =
<hr class="s1" />
d) *(int*)(p[1]) =
<hr class="s1" />
e) *(int*)(*(p+5)) =
`

const q2_1_soln =
`
a) *(p+3) =	<b>0x4</b>
<hr class="s1" />
b) p[4]	=	<b>0x3</b>
<hr class="s1" />
c) *(p+5)	+	p[3] = <b>0x5000</b>
<hr class="s1" />
d) *(int*)(p[1]) = <b>0xd(13)</b>
<hr class="s1" />
e) *(int*)(*(p+5)) = <b>error(out of bounds)</b>
`;

const q2_2 =
`
2) Consider the following code and its output. Fill in the blanks.
<hr class="s2" />
<code>
void foo1(${blank} a, int n) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int i;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i < n; i++) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(*(a+i)) += 3;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;}
<hr class="s1" />
}
<hr class="s2" />
void foo2(${blank} p) { p++; }
<hr class="s2" />
int main() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int x = ${blank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int a[] = {1, 2, 3, 4, 5};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int *p = &a[1];
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;foo1(a, sizeof(a) / sizeof(int));
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;foo2(&p);
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;printf("%d, %d, %d\n", a[1], *(++p), a[x]);
<hr class="s1" />
}
<hr class="s2" />
The output of this code is:
<hr class="s1" />
${blank}, ${blank}, 8
`;

const q2_2_soln =
`
<code><b>int*</b>, <b>int**</b>, <b>5</b>, <b>6</b>
`;

const q3_1 =
`
<h3>Q3: C Memory Model (6 points)</h3>
For each of the following functions, answer the questions below.
<hr class="s2" />
1)  Does this function return a usable pointer to a string containing “asdf”?
<hr class="s1" />
2)  Which area of memory does the returned pointer point to?
<hr class="s1" />
3)  Does this function leak memory?
<hr class="s2" />
You may assume that malloc calls will always return a non-<code>NULL</code> pointer.
<hr class="s2" />
<code>
char * get_asdf_string_1() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;char *a = "asdf";
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return a;
<hr class="s1" />
}
</code>
`;

const q3_1_soln =
`
1)  Does this function return a usable pointer to a string containing “asdf”? <b>Yes</b>
<hr class="s1" />
2)  Which area of memory does the returned pointer point to? <b>Static</b>
<hr class="s1" />
3)  Does this function leak memory? <b>No</b>
`;

const q3_2 =
`
<code>
<hr class="s2" />
char * get_asdf_string_2() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;char a[5];
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;a[0]='a';
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;a[1]='s';
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;a[2]='d';
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;a[3]='f';
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;a[4]='\0';
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return a;
<hr class="s1" />
}
</code>
`

const q3_2_soln =
`
1)  Does this function return a usable pointer to a string containing “asdf”? <b>No</b>
<hr class="s1" />
2)  Which area of memory does the returned pointer point to? <b>Stack</b>
<hr class="s1" />
3)  Does this function leak memory? <b>No</b>
`;

const q3_3 =
`
<code>
char * get_asdf_string_3() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;char * a = malloc(sizeof(char) * 5);
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;a = "asdf";
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return a;
<hr class="s1" />
}
</code>
`;

const q3_3_soln =
`
1)  Does this function return a usable pointer to a string containing “asdf”? <b>Yes</b>
<hr class="s1" />
2)  Which area of memory does the returned pointer point to? <b>Static</b>
<hr class="s1" />
3)  Does this function leak memory? <b>Yes</b>
`;

const q3_4 =
`
<code>
char * g = "asdf";
<hr class="s1" />
char * get_asdf_string_4() {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return g;
<hr class="s1" />
}
</code>
`;

const q3_4_soln =
`
1)  Does this function return a usable pointer to a string containing “asdf”? <b>Yes</b>
<hr class="s1" />
2)  Which area of memory does the returned pointer point to? <b>Static</b>
<hr class="s1" />
3)  Does this function leak memory? <b>No</b>
`;

const q4_1 =
`
<h3>Q4: Linked Lists (12 points)</h3>
1) Fill out the declaration of a singly linked linked-list node below.
<hr class="s1" />
<code>
typedef struct node {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int value;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;${blank} next; //pointer to the next element
<hr class="s1" />
} sll_node;
</code>
`;

const q4_1_soln =
`
<code><b>struct node*</b></code>
`;

const q4_2 =
`
2) Let's convert the linked list to an array. Fill in the missing code.
<hr class="s1" />
<code>
int * to_array(sll_node *sll int size) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int i = 0;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int *arr = ${longblank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;while (sll) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[i] = ${longblank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sll &nbsp;&nbsp; = ${longblank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${longblank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;}
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return arr;
<hr class="s1" />
}
</code>
`;

const q4_2_soln =
`
<code>
int * to_array(sll_node *sll int size) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int i = 0;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int *arr = <b>malloc(size * sizeof(int))</b>;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;while (sll) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[i] = <b>sll->value</b>;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sll &nbsp;&nbsp; = <b>sll->next</b>;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>i++</b>;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;}
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return arr;
<hr class="s1" />
}
</code>
`;

const q4_3 =
`
3) Finally, complete <code>delete_even()</code> that will delete every second element of the list. FOr example, given the lists below:
<hr class="s2" />
<code>
Before: Node 1 -> Node 2 -> Node 3 -> Node 4
<hr class="s1" />
After: Node 1 -> Node 2
</code>
<hr class="s2" />
Calling <code>delete_even()</code> on the list labeled "Before" will change it into the list labeled "After". All list nodes were created via dynamic memory allocation.
<hr class="s2" />
<code>
void delete_even(sll_node *sll) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;sll_node *temp;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;if (!sll || !sll->next) return;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;temp = ${blank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;sll->next = ${blank};
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;free(${blank});
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;delete_even(${blank});
<hr class="s1" />
}
</code>
`;

const q4_3_soln =
`
<code>
void delete_even(sll_node *sll) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;sll_node *temp;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;if (!sll || !sll->next) return;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;temp = <b>sll->next</b>;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;sll->next = <b>temp->next (or sll->next->next)</b>;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;free(<b>temp</b>);
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;delete_even(<b>sll->next</b>);
<hr class="s1" />
}
</code>
`;

const q5_1 =
`
<h3>Q5: MIPS with FUNctions (18 points)</h3>

The function <code><b>countChars(char *str, char *target)</b></code> returns the number of times characters in <code><b>target</b></code> appear in <code><b>str</b></code>. For example:
<hr class="s2" />
<code>
countChars("abc abc abc", "a") = 3
<hr class="s1" />
countChars("abc abc abc", "ab") = 6
<hr class="s1" />
countChars("abc abc abc", "abcd") = 9
</code>
<hr class="s2" />
The C code for <code>countChars</code> is given to you below. The helper function <code><b>isCharInStr(char *target, char)</b></code> returns 1 if <code><b>c</b></code> is present in <code><b>target</b></code> and 0 if not.
<hr class="s2" />
<code>
int countChars(char *str, char *target) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;int count = 0;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;while (*str) {
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count += isCharInStr(target, *str);
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str++;
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;}
<hr class="s1" />
}
</code>
<hr class="s2" />
Finish the implementation of <code>countChars</code> in TAL MIPS below. You may not need every blank.
<hr class="s2" />
<code>
countChars:
<hr class="s1" />
${fivespace}addiu $sp, $sp, ${_.repeat('_', 14)}
<hr class="s1" />
${fivespace}${longblank}&nbsp;# Store onto the stack if needed
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}addiu $s0, $zero, 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# We'll store the count in $s0
<hr class="s1" />
${fivespace}addiu $s1, $a0, 0
<hr class="s1" />
${fivespace}addiu $s2, $a1, 0
<hr class="s1" />
loop:
<hr class="s1" />
${fivespace}addiu $a0, $s0, 0
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}beq ${_.repeat('_', 26)}
<hr class="s1" />
${fivespace}jal isCharInStr
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
done:
<hr class="s1" />
${fivespace}${longblank}&nbsp;&nbsp;# Load from the stack if needed
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}addiu $sp, $sp, ${_.repeat('_', 14)}
<hr class="s1" />
${fivespace}jr $ra
</code>
`;

const q5_1_soln =
`
<code>
countChars:
<hr class="s1" />
${fivespace}addiu $sp, $sp, <b>-16</b>
<hr class="s1" />
${fivespace}<b>sw $ra, 0($sp)</b>${_.repeat('&nbsp;', 11)}# Store onto the stack if needed
<hr class="s1" />
${fivespace}<b>sw $s0, 4($sp)</b>
<hr class="s1" />
${fivespace}<b>sw $s1, 8($sp)</b>
<hr class="s1" />
${fivespace}<b>sw $s2, 12($sp)</b>
<hr class="s1" />
${fivespace}addiu $s0, $zero, 0${sixspace}# We'll store the count in $s0
<hr class="s1" />
${fivespace}addiu $s1, $a0, 0
<hr class="s1" />
${fivespace}addiu $s2, $a1, 0
<hr class="s1" />
loop:
<hr class="s1" />
${fivespace}addiu $a0, $s0, 0
<hr class="s1" />
${fivespace}<b>lb $a1, 0($s1)</b>
<hr class="s1" />
${fivespace}beq <b>$a1, $zero, done</b>
<hr class="s1" />
${fivespace}jal isCharInStr
<hr class="s1" />
${fivespace}<b>addu $s0, $s0, $v0</b>
<hr class="s1" />
${fivespace}<b>addiu $s1, $s1, 1</b>
<hr class="s1" />
${fivespace}<b>j loop</b>
<hr class="s1" />
done:
<hr class="s1" />
${fivespace}<b>addiu $v0, $s0, 0</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Load from the stack if needed
<hr class="s1" />
${fivespace}<b>lw $ra, 0($sp)</b>
<hr class="s1" />
${fivespace}<b>lw $s0, 4($sp)</b>
<hr class="s1" />
${fivespace}<b>lw $s1, 8($sp)</b>
<hr class="s1" />
${fivespace}<b>lw $s2, 12($sp)</b>
<hr class="s1" />
${fivespace}addiu $sp, $sp, <b>16</b>
<hr class="s1" />
${fivespace}jr $ra
</code>
`;

const imgq6_1 = require('../../img/cs61csp15-6.png');
const q6_1 =
`
<h3>Q6: MIPS Instruction Formats (16 points)</h3>

Convert the following TAL MIPS instructions into their machine code representation (binary format) or
vice versa. For rows where you convert instructions to machine code, we’ve provided boxes to the
right that you should fill in with the appropriate fields (in binary):

<hr class="s2" />

<img src=${imgq6_1} class="problem-image" />
<hr class="s2" />
<i>No solution available, since no solution was available on the original PDF.</i>
`;

const q6_1_soln =
`
Super sorry :(
`;

const q7_1 =
`
<h3>Q7: MIPS Addressing Modes (16 points)</h3>

We have a function that, when given a branch instruction, returns the number of bytes that the Program Counter (PC) would change by, i.e. <code><b>(PC_of_branch_target - PC_of_branch_instruction)</b></code>.

<hr class="s2" />

<code>
branchAmount(branch_inst):
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;calculate the instruction offset from branch_inst
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;convert the offset to byte addressing
<hr class="s1" />
&nbsp;&nbsp;&nbsp;&nbsp;return PC_of_branch_target - PC_of_branch_instruction
</code>

<hr class="s2" />

Write <code>branchAmount</code> in TAL MIPS (no pseudoinstructions). You may not need all the blanks. Assume that register <code><b>$a0</b></code> contains a valid branch instruction.

<hr class="s2" />

<code>
branchAmount:
<hr class="s1" />
${fivespace}andi $t0, $a0, 0x8000${_.repeat('&nbsp;', 10)}# Mask out a certain bit
<hr class="s1" />
${fivespace}bne ________, ________, label1
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}j label2
<hr class="s1" />
label1:
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
${fivespace}or $v0, $a0, $t1
<hr class="s1" />
label2:
<hr class="s1" />
${fivespace}sll _______, ______, _________&nbsp;&nbsp;# Convert to byte addressing
<hr class="s1" />
${fivespace}${longblank}
<hr class="s1" />
label3:
<hr class="s1" />
${fivespace}jr $ra
</code>
`;

const q7_1_soln =
`
<code>
branchAmount:
<hr class="s1" />
${fivespace}andi $t0, $a0, 0x8000${fivespace}# Mask out a certain bit
<hr class="s1" />
${fivespace}bne <b>$t0</b>, <b>$zero</b>, label1
<hr class="s1" />
${fivespace}<b>andi $v0, $a0, 0xFFFF</b>
<hr class="s1" />
${fivespace}j label2
<hr class="s1" />
label1:
<hr class="s1" />
${fivespace}<b>lui $t1, 0xFFFF</b>
<hr class="s1" />
${fivespace}or $v0, $a0, $t1
<hr class="s1" />
label2:
<hr class="s1" />
${fivespace}sll <b>$v0</b>, <b>$v0</b>, <b>2</b>${_.repeat('&nbsp;', 11)}# Convert to byte addressing
<hr class="s1" />
${fivespace}<b>addiu $v0, $v0, 4</b>
<hr class="s1" />
label3:
<hr class="s1" />
${fivespace}jr $ra
</code>
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS61CSP15 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs61csp15';
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
    const problemTitles = [
      'Q1. Number Representation',
      'Q2. Pointers and Memory',
      'Q3. C Memory Model',
      'Q4. Linked Lists',
      'Q5. MIPS with FUNctions',
      'Q6. MIPS Instruction Formats',
      'Q7. MIPS Addressing Modes'
    ];

    return (
      <span>
        <h1>CS 61C</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2015 | Asanovic, Stojanovic</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_2} solution={q1_2_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_3} solution={q1_3_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_4} solution={q1_4_soln} examCode={examCode} />
          </Element>
          <Element name="q2">
            <hr className="s5" />
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q2-2"} content={q2_2} solution={q2_2_soln} examCode={examCode} />
          </Element>
          <Element name="q3">
            <hr className="s5" />
            <Question id={"q3-1"} content={q3_1} solution={q3_1_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q3-2"} content={q3_2} solution={q3_2_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q3-3"} content={q3_3} solution={q3_3_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q3-4"} content={q3_4} solution={q3_4_soln} examCode={examCode} />
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4-1"} content={q4_1} solution={q4_1_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q4-2"} content={q4_2} solution={q4_2_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q4-3"} content={q4_3} solution={q4_3_soln} examCode={examCode} />
          </Element>
          <Element name="q5">
            <hr className="s5" />
            <Question id={"q5-1"} content={q5_1} solution={q5_1_soln} examCode={examCode} />
          </Element>
          <Element name="q6">
            <hr className="s5" />
            <Question id={"q6-1"} content={q6_1} solution={q6_1_soln} examCode={examCode} />
          </Element>
          <Element name="q7">
            <hr className="s5" />
            <Question id={"q7-1"} content={q7_1} solution={q7_1_soln} examCode={examCode} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CSP15;