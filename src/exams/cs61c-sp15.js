import React, { Component } from 'react';
import { Question } from '../components/question';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, sevenspace, eightspace } from '../utils';

const _ = require('lodash');
const examCode = 'cs61cfa15';

const tenspace = _.repeat('&nbsp;', 10);
const twelvespace = _.repeat('&nbsp;', 12);
const sixteenspace = _.repeat('&nbsp;', 16);

const q1_1 =
`
<h3>Q1: Number Representation (10 points)</h3>

1) Convert the following 8-bit two’s-complement numbers from hexadecimal to decimal:
<hr class="s2" />

0x80 = -128
<hr class="s1" />
0xFF = -1
<hr class="s1" />
0x0F = 15

2) For two n-bit numbers, what is the difference between the largest unsigned number and the largest two’s-complement number? In other words, what is <code><b>MAX_UNSIGNED_INT – MAX_SIGNED_INT</b></code>? Write your answer in terms of <code>n</code>.

<hr class="s2" />
2n – 1 – (2n-1 – 1) = 2n-1
<hr class="s2" />

3) Fill in the blanks to return the largest positive number a 32-bit two’s-complement number can
represent.

<code>
unsigned int max_twos() {
<hr class="s1" />
${fourspace}return ((1 << 31) - 1);
<hr class="s1" />
}
</code>

4) Consider a new type of notation for representing signed numbers, biased notation. The formula for obtaining the value from a number written in biased notation is:
<hr class="s1" />
<p align="center"><b>value = value_as_unsigned – b</b></p>
Where <code>b</code> is a constant called the bias. Example with 4 bits and a bias of 4:
<hr class="s2" />
<code>
${eightspace}0b0011 = 3 – 4 = -1
<hr class="s1" />
${eightspace}0b1110 = 14 – 4 = 10
</code>
<hr class="s2" />

If we wanted an n-bit biased system to represent the same range as two’s complement numbers,
what is the value of b?
<hr class="s1" />
The most negative number needs to be ${lx('-2^{n-1}')}. The most negative number in biased notation is 0 – b so our bias is ${lx('2^{n-1}')}.
`;

const q1_1_soln =
`
`;

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
a) *(p+3) =	0x4
<hr class="s1" />
b) p[4]	=	0x3
<hr class="s1" />
c) *(p+5)	+	p[3] = 0x5000
<hr class="s1" />
d) *(int*)(p[1]) = 0xd(13)
<hr class="s1" />
e) *(int*)(*(p+5)) = error(out of bounds)

<hr class="s2" />

2) Consider the following code and its output. Fill in the blanks.
<hr class="s2" />
<code>
void foo1(${blank} a, int n) {
<hr class="s1" />
${fourspace}int i;
<hr class="s1" />
${fourspace}for (i = 0; i < n; i++) {
<hr class="s1" />
${eightspace}(*(a+i)) += 3;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
<hr class="s2" />
void foo2(${blank} p) { p++; }
<hr class="s2" />
int main() {
${fourspace}int x = ${blank};
${fourspace}int a[] = {1, 2, 3, 4, 5};
${fourspace}int *p = &a[1];
${fourspace}foo1(a, sizeof(a) / sizeof(int));
${fourspace}foo2(&p);
${fourspace}printf("%d, %d, %d\n", a[1], *(++p), a[x]);
}
<hr class="s2" />
The output of this code is:
<hr class="s1" />
${blank}, ${blank}, 8
`;

const q2_1_soln =
`
`;

const q3_1 =
`
<h3>Q3: C Memory Model (6 points)</h3>
For each of the following functions, answer the questions below in the corresponding box to the right:
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
${fourspace}char *a = "asdf";
<hr class="s1" />
${fourspace}return a;
<hr class="s1" />
}
<hr class="s2" />
char * get_asdf_string_2() {
<hr class="s1" />
${fourspace}char a[5];
<hr class="s1" />
${fourspace}a[0]='a';
<hr class="s1" />
${fourspace}a[1]='s';
<hr class="s1" />
${fourspace}a[2]='d';
<hr class="s1" />
${fourspace}a[3]='f';
<hr class="s1" />
${fourspace}a[4]='\0';
<hr class="s1" />
return a;
<hr class="s1" />
}
</code>
<hr class="s2" />
char * get_asdf_string_3() {
<hr class="s1" />
${fourspace}char * a = malloc(sizeof(char) * 5);
<hr class="s1" />
${fourspace}a = "asdf";
<hr class="s1" />
${fourspace}return a;
<hr class="s1" />
}
<hr class="s2" />
char * g = "asdf";
<hr class="s1" />
char * get_asdf_string_4() {
${fourspace}return g;
}
`;

const q3_1_soln =
`
`;

const q4_1 =
`
<h3>Linked Lists (12 points)</h3>
1) Fill out the declaration of a singly linked linked-list node below.
<hr class="s1" />
<code>
typedef struct node {
<hr class="s1" />
${fourspace}int value;
<hr class="s1" />
${fourspace}struct node* next; //pointer to the next element
<hr class="s1" />
} sll_node;
</code>
<hr class="s2" />
2) Let's convert the linked list to an array. Fill in the missing code.
<hr class="s1" />
<code>
int * to_array(sll_node *sll int size) {
${fourspace}int i = 0;
<hr class="s1" />
${fourspace}int *arr = ${blank};
<hr class="s1" />
${fourspace}while (sll) {
<hr class="s1" />
${eightspace}arr[i] = ${blank};
<hr class="s1" />
${eightspace}sll = ${blank};
<hr class="s1" />
${eightspace}${blank};
<hr class="s1" />
${fourspace}return arr;
<hr class="s1" />
}
<hr class="s2" />
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
${fourspace}sll_node *temp;
<hr class="s1" />
${fourspace}if (!sll || !sll->next) return;
<hr class="s1" />
${fourspace}temp = ${blank};
<hr class="s1" />
${fourspace}sll->next = ${blank};
<hr class="s1" />
${fourspace}free(${blank});
<hr class="s1" />
${fourspace}delete_even(${blank});
}
</code>
`;

const q4_1_soln =
`
`;

const q5_1 =
`
`;

const q5_1_soln =
`
`;

const q6_1 =
`

const q6_1_soln =
`
`;

const q7_1 =
`
`;

const q7_1_soln =
`
`;

var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Sticky = require('react-stickynode');

class CS61CSp15 extends Component {
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
            <a className="sidetab" href={process.env.PUBLIC_URL + `/exams/${examCode}-soln.pdf`} target="_blank">Solutions PDF</a>
          </div>
        </div>
        <div className="content">
          <div className="content-spacer" />
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
