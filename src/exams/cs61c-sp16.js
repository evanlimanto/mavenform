import React, { Component } from 'react'; import { Question } from '../components/question';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, sevenspace, eightspace } from '../utils';

const _ = require('lodash');
const examCode = 'cs61cfa14';

const tenspace = _.repeat('&nbsp;', 10);
const twelvespace = _.repeat('&nbsp;', 12);
const fifteenspace = _.repeat('&nbsp;', 15);
const sixteenspace = _.repeat('&nbsp;', 16);

const q1_1 =
`
<h3>Q1: Instructors keep their students aligned (10 points)</h3>

Consider the C code below. Assume ints and pointers are 4 bytes in size. Remember that C structs
are densely packed, meaning their elements are contiguous in memory, and that structs may include
padding at the end for alignment. Each struct is located at a memory address that is a multiple of the size of its largest element.

<code>
#include <stdio.h>
<hr class="s1" />
#include <stdlib.h>
<hr class="s2" />
typedef struct {
<hr class="s1" />
${fourspace}char *name;
<hr class="s1" />
${fourspace}unsigned int id;
<hr class="s1" />
${fourspace}char grade;
<hr class="s1" />
} Student;
<hr class="s2" />
int main(void) {
<hr class="s1" />
${fourspace}Student *students = malloc(2 * sizeof(Student));
<hr class="s1" />
${fourspace}students[0].name = "Oski Bear";
<hr class="s1" />
${fourspace}students[0].id = 12345;
<hr class="s1" />
${fourspace}students[0].grade = 'A';
<hr class="s1" />
${fourspace}students[1].name = "Ken Thompson";
<hr class="s1" />
${fourspace}students[1].id = 5678;
<hr class="s1" />
${fourspace}students[1].grade = 'A';
<hr class="s2" />
${fourspace}printf("students: %p\n", students);
<hr class="s1" />
${fourspace}printf("Address of students[0]: %p\n", &(students[0]));
<hr class="s1" />
${fourspace}printf("Address of students[0].id: %p\n", &(students[0].id));
<hr class="s2" />
${fourspace}printf("students + 1: %p\n", students + 1);
<hr class="s1" />
${fourspace}printf("Address of students[1].grade: %p\n",
<hr class="s1" />
${twelvespace}&(students[1].grade));
<hr class="s2" />
${fourspace}return 0;
<hr class="s1" />
}
</code>

<hr class="s2" />

a)  Fill in the blanks in the program’s output below. Assume that the region of memory on the heap allocated by the call to malloc starts at address <code>0x1000</code>. Also, remember that C will print pointer values and memory addresses in <b>hexadecimal notation</b>.
<hr class="s2" />
<code>
${fourspace}students: 0x1000
<hr class="s1" />
${fourspace}Address of students[0]: ${blank}
<hr class="s1" />
${fourspace}Address of students[0].id: ${blank}
<hr class="s1" />
${fourspace}students + 1: ${blank}
<hr class="s1" />
${fourspace}Address of students[1].grade: ${blank}
</code>
`;

const q1_2 =
`
b)  <b>True | False</b> - The address of the <code>students</code> pointer is less than its value.
<hr class="s1" />
  i.e. <code>&students < students</code>
`;

const q2_1 =
`
<h3>Q2: This tree question needs acorny pun (10 points)</h3>
Write a function to sum up the values and free a tree of arbitrary size constructed using the
tree_node <code>struct</code> as defined. Each node can have an arbitrary number of children. Assume that there will always be a valid pointer in the location of children.

<hr class="s2" />

<code>
struct tree_node {
${fourspace}int value;
<hr class="s1" />
${fourspace}struct tree_node ** children;
<hr class="s1" />
${fourspace}int num_children;
<hr class="s1" />
}

<hr class="s2" />

int sum_and_free_tree( struct tree_node * root ) {
<hr class="s1" />
${fourspace}int i, sum;
<hr class="s1" />
${fourspace}if ( root == NULL ) { // This is equivalent to being stumped
<hr class="s1" />
${eightspace}return 0;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}sum = _______________________________________________;
<hr class="s1" />
for ( i = ____________;
<hr class="s1" />
${sixspace}____________;
<hr class="s1" />
${sixspace}____________ ) {
<hr class="s1" />
${eightspace}_______________________________________________;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}free( _______________________________________________ );
<hr class="s1" />
${fourspace}free( _______________________________________________ );
<hr class="s1" />
${fourspace}return sum;
<hr class="s1" />
}
`;

const q3_1 =
`
<h3>Q3: A filter in the blank question (20 points)</h3>

Convert the <code>filter_array</code> function, which counts the number of elements greater than <code>min_val</code> in
the array and returns an integer, to MIPS assembly. You may not need all of the lines, but you should
try to use as few lines as possible.

<hr class="s2" />

int filter_array(int* arr, size_t n, int min_val) {
<hr class="s1" />
${fourspace}int count = 0, i;
<hr class="s1" />
${fourspace}for(i=0; i < n; i++){
<hr class="s1" />
${eightspace}if (arr[i] > min_val)
<hr class="s1" />
${twelvespace}count++;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}return count;
<hr class="s1" />
}
<hr class="s2" />
<b>Example:</b>
<hr class="s1" />
int* p = (int*) malloc(sizeof(int)*3)
<hr class="s1" />
p[0] = 1;
<hr class="s1" />
p[1] = 2;
<hr class="s1" />
p[2] = 3;
<hr class="s1" />
printf("%d\n", filter_array(p,3,1))
<hr class="s1" />
<b>Output: 2</b>
<hr class="s2" />

filter_array:
<hr class="s1" />
${fourspace}addiu $sp, $sp, ____
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}addiu $s0, $zero, 0  <b># We’ll store the count in $s0</b>
<hr class="s1" />
${fourspace}addiu $s1, $zero, 0  <b># We'll store i in $s1</b>
<hr class="s1" />
${fourspace}addiu $t0, $a0, 0
<hr class="s1" />
loop:
<hr class="s1" />
${fourspace}beq ____________
<hr class="s1" />
${fourspace}lw $t1, ______
<hr class="s1" />
${fourspace}slt $t2, _____, ____
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}j loop
<hr class="s1" />
done:
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}addiu $sp, $sp, ____
<hr class="s1" />
${fourspace}jr $ra
`;

const q4_1 =
`
<h3>Q4: Have you seen this MIPStery before? (25 points)</h3>

The following is a recursive function that saves its arguments and return address on the stack as it executes.

<hr class="s2" />

<code>
mystery:
<hr class="s1" />
0x4000${fourspace}bne $a0, $0, recurse
<hr class="s1" />
0x4004${fourspace}li $v0, 1
<hr class="s1" />
0x4008${fourspace}jr $ra
<hr class="s1" />
recurse:
<hr class="s1" />
0x400C${fourspace}addiu $sp, $sp, -8
<hr class="s1" />
0x4010${fourspace}sw $ra, 0($sp)
<hr class="s1" />
0x4014${fourspace}sw $a0, 4($sp)
<hr class="s1" />
0x4018${fourspace}addiu $a0, $a0, -1
<hr class="s1" />
0x401C${fourspace}jal mystery
<hr class="s1" />
0x4020${fourspace}lw $ra, 0($sp)
<hr class="s1" />
0x4024${fourspace}lw $a0, 4($sp)
<hr class="s1" />
0x4028${fourspace}addiu $sp, $sp, 8
<hr class="s1" />
0x402C${fourspace}mult $a0, $v0
<hr class="s1" />
0x4030${fourspace}mflo $v0
<hr class="s1" />
0x4034${fourspace}jr $ra
</code>

<hr class="s2" />

a)  If the function is called with the argument <code>$a0</code> set to 5, what values will be in registers <code>$a0</code> and <code>$ra</code> before you return from the base case?
`;

const q4_2 =
`
b)  What does the stack look like at the beginning of the base case?
<hr class="s1" />
Write your answers in the table below. Assume that, when the function is first called, <code>$a0</code> is set to <code>5</code> and <code>$ra</code> is set to <code>0x1000</code>. Remember that the stack starts at the top and expands downward.
Each box is <b>one word</b>, and you only need to fill in the box with the hexadecimal value.

<table>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
<tr><td>${sixteenspace}</td></tr>
</table>
`;

const q4_3 =
`
c) In a sentence, what does this function do? Assume that <code>$a0</code> is unsigned.
`;

const q5_1 =
`
<h3>Q5: MIPS Instructions Per Second (20 points)</h3>

Assume <code>$a0</code> contains some positive integer, and <code>$a1</code> contains the address to the start of an integer
array. The numbers on the left are line numbers; they aren't related to the address of each line, and
the address of the instruction on line 0 is <code>0x00000000</code>. Consider the following MIPS code and its
instruction format representation:
<hr class="s2" />
<code>
0${fifteenspace}add $t0 $a0 $0${eightspace}<=>${eightspace}0x00804020
1${fifteenspace}add $t1 $a1 $0${eightspace}<=>${eightspace}${blank}
2${fourspace}LabelA:${fourspace}add $t2 $0 $0${eightspace}<=>${eightspace}0x00005020
<hr class="s1" />
</code>
<hr class="s2" />
a)  Convert the following lines to their machine code representation. Write your representation in binary. Each of the boxes is divided into 8 sections of 4 bits each; please format your answer
accordingly. Line 1 is given as an example.
<hr class="s2" />
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;
var Sticky = require('react-stickynode');

class CS61CSp16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const problemIDs = ['q1', 'q2', 'q3', 'q4'];
    const problemTitles = [
      'Question 1: Running in circles',
      'Question 2: I can C clearly now, the rain is gone...',
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
          <h5>Midterm 1 | Fall 2014 | Garcia, Lustig</h5>
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
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-soln.pdf`} target="_blank">Solutions PDF</a>
          </div>
        </div>
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

export default CS61CSp16;
