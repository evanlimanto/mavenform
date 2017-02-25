import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { longblank, blank, onespace, twospace, threespace, fourspace, sevenspace, eightspace } from '../utils';

const _ = require('lodash');

const twelvespace = _.repeat('&nbsp;', 12);
const fifteenspace = _.repeat('&nbsp;', 15);

const q1_1 =
`
<h3>Q1: Instructors keep their students aligned (10 points)</h3>

Consider the C code below. Assume ints and pointers are 4 bytes in size. Remember that C structs
are densely packed, meaning their elements are contiguous in memory, and that structs <b>may include</b>
padding at the end for alignment. Each struct is located at a memory address that is a <b>multiple of the size of its largest element</b>.
<hr class="s2" />
<code>
#include &lt;stdio.h&gt;
<hr class="s1" />
#include &lt;stdlib.h&gt;
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
students: 0x1000
<hr class="s1" />
Address of students[0]: ${blank}
<hr class="s1" />
Address of students[0].id: ${blank}
<hr class="s1" />
students + 1: ${blank}
<hr class="s1" />
Address of students[1].grade: ${blank}
</code>
`;

const q1_1_soln =
`
<code>
${fourspace}students: 0x1000
<hr class="s1" />
${fourspace}Address of students[0]: <b>0x1000</b>
<hr class="s1" />
${fourspace}Address of students[0].id: <b>0x1004</b>
<hr class="s1" />
${fourspace}students + 1: <b>0x100C</b>
<hr class="s1" />
${fourspace}Address of students[1].grade: <b>0x1014</b>
</code>
`;

const q1_2 =
`
b)  <b>True | False</b> - The address of the <code>students</code> pointer is less than its value.
<hr class="s1" />
i.e. <code>&students < students</code>
`;

const q1_2_soln =
`
<b>False</b>
`;

const q2_1 =
`
<h3>Q2: This tree question needs acorny pun (10 points)</h3>
Write a function to sum up the values and free a tree of arbitrary size constructed using the
tree_node <code>struct</code> as defined. Each node can have an arbitrary number of children. Assume that there will always be a valid pointer in the location of children.

<hr class="s2" />

<code>
struct tree_node {
<hr class="s1" />
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
${fourspace}for ( i = ____________;
<hr class="s1" />
${_.repeat('&nbsp;', 14)}____________;
<hr class="s1" />
${_.repeat('&nbsp;', 14)}____________ ) {
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
</code>
`;

const q2_1_soln =
`
<code>
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
${fourspace}sum = <b>root->value</b>;
<hr class="s1" />
${fourspace}for ( i = <b>0</b>;
<hr class="s1" />
${_.repeat('&nbsp;', 14)}<b>i < root->num_children</b>;
<hr class="s1" />
${_.repeat('&nbsp;', 14)}<b>i++</b> ) {
<hr class="s1" />
${eightspace}<b>sum += sum_and_free_tree((root->children)[i])</b>;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}free( <b>root->children</b> );
<hr class="s1" />
${fourspace}free( <b>root</b> );
<hr class="s1" />
${fourspace}return sum;
<hr class="s1" />
}
</code>
`;

const q3_1 =
`
<h3>Q3: A filter in the blank question (20 points)</h3>

Convert the <code>filter_array</code> function, which counts the number of elements greater than <code>min_val</code> in
the array and returns an integer, to MIPS assembly. You may not need all of the lines, but you should
try to use as few lines as possible.
<hr class="s1" />
Assume <code>$a0 = arr, $a1 = n, $a2 = min_val</code>.

<hr class="s2" />

<code>
int filter_array(int* arr, size_t n, int min_val) {
<hr class="s1" />
${fourspace}int count = 0, i;
<hr class="s1" />
${fourspace}for (i=0; i < n; i++){
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
${fourspace}beq _______________
<hr class="s1" />
${fourspace}lw $t1, ___________
<hr class="s1" />
${fourspace}slt $t2, _____, ___
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
${fourspace}addiu $sp, $sp, ___
<hr class="s1" />
${fourspace}jr $ra
</code>
`;

const q3_1_soln =
`
<code>
filter_array:
<hr class="s1" />
${fourspace}addiu $sp, $sp, <b>-8</b>
<hr class="s1" />
${fourspace}<b>sw $s0, 0($sp)</b>
<hr class="s1" />
${fourspace}<b>sw $s1, 4($sp)</b>
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}addiu $s0, $zero, 0 ${fourspace} <b># We’ll store the count in $s0</b>
<hr class="s1" />
${fourspace}addiu $s1, $zero, 0 ${fourspace} <b># We'll store i in $s1</b>
<hr class="s1" />
${fourspace}addiu $t0, $a0, 0
<hr class="s1" />
loop:
<hr class="s1" />
${fourspace}beq <b>$s1, $a1, done</b>
<hr class="s1" />
${fourspace}lw $t1, <b>0($t0)</b>
<hr class="s1" />
${fourspace}slt $t2, <b>$a2</b>, <b>$t1</b>
<hr class="s1" />
${fourspace}<b>addu $s0, $s0, $t2</b>
<hr class="s1" />
${fourspace}<b>addiu $s1, $s1, 1</b>
<hr class="s1" />
${fourspace}<b>addiu $t0, $t0, 4</b>
<hr class="s1" />
${fourspace}j loop
<hr class="s1" />
done:
<hr class="s1" />
${fourspace}<b>addiu $v0, $s0, 0</b>
<hr class="s1" />
${fourspace}<b>lw $s0, 0($sp)</b>
<hr class="s1" />
${fourspace}<b>lw $s1, 4($sp)</b>
<hr class="s1" />
${fourspace}___________________
<hr class="s1" />
${fourspace}addiu $sp, $sp, <b>8</b>
<hr class="s1" />
${fourspace}jr $ra
</code>
`;

const q4_1 =
`
<h3>Q4: Have you seen this MIPStery before? (25 points)</h3>

The following is a recursive function that saves its arguments and return address on the stack as it executes.

<hr class="s2" />

<code>
${sevenspace}mystery:
<hr class="s1" />
0x4000${fourspace}bne $a0, $0, recurse
<hr class="s1" />
0x4004${fourspace}li $v0, 1
<hr class="s1" />
0x4008${fourspace}jr $ra
<hr class="s1" />
${sevenspace}recurse:
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

const q4_1_soln =
`
<b>$a0 = 0</b>
<hr class="s1" />
<b>$ra = 0x4020</b>
`;

const q4_2 =
`
b)  What does the stack look like at the beginning of the base case?
<hr class="s1" />
Write your answers in the table below. Assume that, when the function is first called, <code>$a0</code> is set to <code>5</code> and <code>$ra</code> is set to <code>0x1000</code>. Remember that the stack starts at the top and expands downward.
Each box is <b>one word</b>, and you only need to fill in the box with the hexadecimal value.

<hr class="s2" />

<table>
<thead><tr><th>Stack Block #</th><th>Value</th></tr></thead>
<tr><td>1</td><td></td></tr>
<tr><td>2</td><td></td></tr>
<tr><td>3</td><td></td></tr>
<tr><td>4</td><td></td></tr>
<tr><td>5</td><td></td></tr>
<tr><td>6</td><td></td></tr>
<tr><td>7</td><td></td></tr>
<tr><td>8</td><td></td></tr>
<tr><td>9</td><td></td></tr>
<tr><td>10</td><td></td></tr>
<tr><td>11</td><td></td></tr>
<tr><td>12</td><td></td></tr>
</table>
`;

const q4_2_soln =
`
<table>
<thead><tr><th>Stack Block #</th><th>Value</th></tr></thead>
<tr><td>1</td><td><b>0x5</b></td></tr>
<tr><td>2</td><td><b>0x1000</b></td></tr>
<tr><td>3</td><td><b>0x4</b></td></tr>
<tr><td>4</td><td><b>0x4020</b></td></tr>
<tr><td>5</td><td><b>0x3</b></td></tr>
<tr><td>6</td><td><b>0x4020</b></td></tr>
<tr><td>7</td><td><b>0x2</b></td></tr>
<tr><td>8</td><td><b>0x4020</b></td></tr>
<tr><td>9</td><td><b>0x1</b></td></tr>
<tr><td>10</td><td><b>0x4020</b></td></tr>
<tr><td>11</td><td><b></b></td></tr>
<tr><td>12</td><td><b></b></td></tr>
</table>
`;

const q4_3 =
`
c) In a sentence, what does this function do? Assume that <code>$a0</code> is unsigned.
`;

const q4_3_soln =
`
<b>Computes the factorial of $a0.</b>
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
<hr class="s1" />
1${fifteenspace}add $t1 $a1 $0${eightspace}<=>${eightspace}${_.repeat('_', 10)}
<hr class="s1" />
2${fourspace}LabelA:${fourspace}add $t2 $0 $0${_.repeat('&nbsp;', 9)}<=>${eightspace}0x00005020
<hr class="s1" />
3${fourspace}LabelB:${fourspace}beq $t0 $0 END${eightspace}<=>${eightspace}${_.repeat('_', 10)}
<hr class="s1" />
4${fourspace}LabelC:${fourspace}addi $t0 $t0 -1${sevenspace}<=>${eightspace}${_.repeat('_', 10)}
<hr class="s1" />
5${fifteenspace}lw $t3 0($t1)${_.repeat('&nbsp;', 9)}<=>${eightspace}${_.repeat('_', 10)}
<hr class="s1" />
6${fifteenspace}${_.repeat('_', 14)}${eightspace}<=>${eightspace}0x014b5020
<hr class="s1" />
7${fifteenspace}addi $t1 $t1 4${eightspace}<=>${eightspace}0x21290004
<hr class="s1" />
8${fifteenspace}${_.repeat('_', 14)}${eightspace}<=>${eightspace}0x08000003
<hr class="s1" />
9${fourspace}END:${sevenspace}add $v0 $t2 $0${eightspace}<=>${eightspace}0x01201020
<hr class="s1" />
</code>
<hr class="s2" />
a)  Convert the following lines to their machine code representation. Write your representation in binary. Each of the boxes is divided into 8 sections of 4 bits each; please format your answer
accordingly. Line 1 is given as an example.
<hr class="s2" />
Line 1:
<hr class="s1" /><table><tbody><tr><td>0000</td><td>0000</td><td>1010</td><td>0000</td><td>0100</td><td>1000</td><td>0010</td><td>0000</td></tr></tbody></table>
<hr class="s1" />
Line 3:
<hr class="s1" />
<table><tbody><tr><td>${fourspace}</td><td>${fourspace}</td><td>${fourspace}</td><td>${fourspace}</td></tr></tbody></table>
<hr class="s1" />
Line 4:
<hr class="s1" />
<table><tbody><tr><td>${fourspace}</td><td>${fourspace}</td><td>${fourspace}</td><td>${fourspace}</td></tr></tbody></table>
Line 5:
<hr class="s1" />
<table><tbody><tr><td>${fourspace}</td><td>${fourspace}</td><td>${fourspace}</td><td>${fourspace}</td></tr></tbody></table>
`;

const q5_1_soln =
`
Line 1:
<hr class="s1" />
<table><tbody><tr><td>0000</td><td>0000</td><td>1010</td><td>0000</td><td>0100</td><td>1000</td><td>0010</td><td>0000</td></tr></tbody></table>
<hr class="s1" />
Line 3:
<hr class="s1" />
<table><tbody><tr><td>0001</td><td>0001</td><td>0000</td><td>0000</td><td>0000</td><td>0000</td><td>0000</td><td>0101</td></tr></tbody></table>
<hr class="s1" />
Line 4:
<hr class="s1" />
<table><tbody><tr><td>0010</td><td>0001</td><td>0000</td><td>1000</td><td>1111</td><td>1111</td><td>1111</td><td>1111</td></tr></tbody></table>
<hr class="s1" />
Line 5:
<hr class="s1" />
<table><tbody><tr><td>1000</td><td>1101</td><td>0010</td><td>1011</td><td>0000</td><td>0000</td><td>0000</td><td>0000</td></tr></tbody></table>
`;

const q5_2 =
`
b) Convert the following lines from machine code into their MIPS instruction.
<hr class="s1" />
Line 6: ${longblank}
<hr class="s1" />
Line 8: ${longblank}
`;

const q5_2_soln =
`
Line 6: <code>add $t2 $t2 $t3</code>
<hr class="s1" />
Line 8: <code>j LabelB</code>
`;

const q5_3 =
`
c) In a sentence or two, describe what this function does.
`;

const q5_3_soln =
`
<b>Adds together the first $a0 elements of the array at $a1 and returns it into $v0.</b>
`;

const q6_1 =
`
<h3>Q6: Mishmash, Hodgepodge, Potpourri (20 points)</h3>

a)  Implement a function that only uses bitwise operations to return true if the most significant byte of
a 16-bit unsigned integer is different from its least significant byte. For example, this function
returns false for <code>0x1A1A</code> but true for <code>0x1A1B</code>. No conditionals or loops are permitted.

<hr class="s2" />
<code>
int f( uint16_t n ) {
<hr class="s1" />
${fourspace}return ${longblank};
<hr class="s1" />
}
</code>
`;

const q6_1_soln =
`
<code>
int f( uint16_t n ) {
<hr class="s1" />
${fourspace}return <b>((n >> 8) ^ n) & 0xFF</b>;
<hr class="s1" />
}
</code>
`;

const q6_2 =
`
b) What is the output of the following snippet of code? <code>%d</code> prints a signed integer and <code>%u</code> prints an unsigned integer.
<hr class="s2" />

<code>
int main(){
<hr class="s1" />
${fourspace}int8_t x = -1;
<hr class="s1"/>
${fourspace}uint8_t y = 255;
<hr class="s2"/>
${fourspace}printf("===begin===\\n");
<hr class="s1" />
${fourspace}printf("i. %u\\n", (uint8_t) x--);
<hr class="s1" />
${fourspace}printf("ii. %u\\n", (uint8_t) x);
<hr class="s1" />
${fourspace}printf("iii. %u\\n", ++y);
<hr class="s1" />
${fourspace}printf("iv. %u\\n", y);
<hr class="s2" />
${fourspace}printf("===break===\\n");
<hr class="s2" />
${fourspace}uint8_t z = 255;
<hr class="s1" />
${fourspace}printf("v. %d\\n", (int8_t) z);
<hr class="s1" />
${fourspace}printf("vi. %u\\n", (uint8_t) z);
<hr class="s2" />
${fourspace}z -= 256;
<hr class="s1" />
${fourspace}printf("vii. %d\\n", z);
<hr class="s1" />
${fourspace}printf("===end===\\n");
<hr class="s1" />
}
</code>

<hr class="s2" />
<b>What is the output?</b>
<hr class="s2" />
===begin===
<hr class="s1" />
i.
<hr class="s1" />
ii.
<hr class="s1" />
iii.
<hr class="s1" />
iv.
<hr class="s1" />
===break===
<hr class="s1" />
v.
<hr class="s1" />
vi.
<hr class="s1" />
vii.
<hr class="s1" />
===end===
`;

const q6_2_soln =
`
===begin===
<hr class="s1" />
i. <b>255</b>
<hr class="s1" />
ii. <b>254</b>
<hr class="s1" />
iii. <b>0</b>
<hr class="s1" />
iv. <b>0</b>
<hr class="s1" />
===break===
<hr class="s1" />
v. <b>-1</b>
<hr class="s1" />
vi. <b>255</b>
<hr class="s1" />
vii. <b>255</b>
<hr class="s1" />
===end===
`;

const q6_3 =
`
c) Fill in the blank cells with the characteristics of each table:
<hr class="s2" />
<table>
<thead><tr><th></th><th>Symbol Table</th><th>Relocation Table</th></tr></thead>
<tbody>
<tr><td>What phase(s) is it written to? Fill in with one of the CALL stages.</td><td></td><td></td></tr>
<tr><td>What phase(s) is it read from? Fill in with one of the CALL stages.</td><td></td><td></td></tr>
<tr><td>Why would you save a label into this table?</td><td></td><td></td></tr>
</tbody>
</table>
`;

const q6_3_soln =
`
<table>
<thead><tr><th></th><th>Symbol Table</th><th>Relocation Table</th></tr></thead>
<tbody>
<tr><td>What phase(s) is it written to? Fill in with one of the CALL stages.</td><td><b>Assembler</b></td><td><b>Assembler</b></td></tr>
<tr><td>What phase(s) is it read from? Fill in with one of the CALL stages.</td><td><b>Linker</b></td><td><b>Linker</b></td></tr>
<tr><td>Why would you save a label into this table?</td><td><b>Labels that can be used by other files</b></td><td><b>Labels needed by this file</b></td></tr>
</tbody>
</table>
`;

const q6_4 =
`
d) The following questions refer to the job of the loader. Circle true or false.
<hr class="s2" />
i. ${threespace} True | False - Creates an address space for the program.
<hr class="s1" />
ii. ${twospace} True | False - Reads the object file to determine the size of text and data segments.
<hr class="s1" />
iii. ${onespace} True | False - Initializes all machine registers to 0.
<hr class="s1" />
iv. ${twospace} True | False - Copies the instructions from the executable file into the stack.
<hr class="s1" />
v. ${threespace} True | False - Is currently implemented as part of the OS.
`;

const q6_4_soln =
`
i. ${threespace} <b>True</b>
<hr class="s1" />
ii. ${twospace} <b>False</b>
<hr class="s1" />
iii. ${onespace} <b>False</b>
<hr class="s1" />
iv. ${twospace}<b>False</b>
<hr class="s1" />
v. ${threespace}<b>True</b>
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS61CSp16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs61csp16';
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
    const problemTitles = [
      'Q1. Instructors keep their students aligned',
      'Q2. This tree question need acory pun',
      'Q3. A filter in the blank question',
      'Q4. Have you seen this MIPStery before?',
      'Q5. MIPS Instructions Per Second',
      'Q6. Mishmash, Hodgepodge, Potpourri'
    ];

    return (
      <span>
        <h1>CS 61C</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2016 | Stojanovic, Weaver</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q1-2"} content={q1_2} solution={q1_2_soln} examCode={examCode} />
          </Element>
          <Element name="q2">
            <hr className="s5" />
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} examCode={examCode} />
          </Element>
          <Element name="q3">
            <hr className="s5" />
            <Question id={"q3-1"} content={q3_1} solution={q3_1_soln} examCode={examCode} />
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
            <hr className="s5" />
            <Question id={"q5-2"} content={q5_2} solution={q5_2_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q5-3"} content={q5_3} solution={q5_3_soln} examCode={examCode} />
          </Element>
          <Element name="q6">
            <hr className="s5" />
            <Question id={"q6-1"} content={q6_1} solution={q6_1_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q6-2"} content={q6_2} solution={q6_2_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q6-3"} content={q6_3} solution={q6_3_soln} examCode={examCode} />
            <hr className="s5" />
            <Question id={"q6-4"} content={q6_4} solution={q6_4_soln} examCode={examCode} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS61CSp16;
