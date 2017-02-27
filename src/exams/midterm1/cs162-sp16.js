import React, { Component } from 'react';

import { Question, Sidebar } from '../../components';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, eightspace, twelvespace } from '../../utils';

const _ = require('lodash');

const q1_1 =
`
<h3>1. (18 points total) Short answer</h3>
<h3>a. (9 points) True/False and Why?</h3>

i) If every thread acquires locks in the same order (for example, <hr class="s1" /><code>sema_down(A); sema_down(X); sema_down(Y)</code>), deadlock cannot occur.
`;

const q1_1_soln =
`
<b>TRUE</b>. If all the threads acquire locks in the same order there is no
circular waiting. The correct answer was worth 1 point and the
justification was worth an additional 2 points.
`;

const q1_2 =
`
ii) It is safe to call <code>sema_up()</code> or <code>lock_release()</code> from an interrupt handler in PintOS, because they cannot cause the current thread to sleep.
`;

const q1_2_soln =
`
<b>FALSE</b>. Lock release should only be called by the holder of the lock. The
correct answer was worth 1 points and the justification was worth an
additional 2 points.
`;

const q1_3 =
`
iii) The function <code>getchar()</code>, which reads a character from standard input, can
sometimes run without making any system calls.
`;

const q1_3_soln =
`
<b>TRUE</b></code>. While <code>getchar()</code> returns a single character at a time to its
caller, it may receive multiple characters from the kernel. The correct
answer was worth 1 points and the justification was worth an additional 2
points.
`;

const q1_4 =
`
<h3>b. (6 points) Kernels.</h3>

i) Briefly, in two to three sentences, explain what a kernel panic is and why it
causes a system crash.
`;

const q1_4_soln =
`
A kernel panic occurs when the kernel encounters an internal error or
exception that it cannot recover from, such as a failed assertion or an attempt
to dereference a NULL pointer. Since the system cannot function without the
kernel, and there is nothing to allow the kernel to recover, the system crashes.
`;

const q1_5 =
`
ii) Briefly, in two to three sentences, explain the two mechanisms used by the
Operating System kernel to prevent user programs from overwriting kernel
data structures.
`;

const q1_5_soln =
`
(1) Address spaces prevent user programs from overwriting kernel data structures.
<hr class="s2" />
(2) Dual-Mode Operation prevents user programs from changing the
translation data structures.
<hr class="s2" />
(3) System calls use a dispatch table to control access to kernel routines.
<hr class="s2" />
(4) System calls sanity check their arguments.
`;

const q1_6 =
`
c. (3 points) Briefly, in two to three sentences, explain why the space shuttle failed to
launch on April 10, 1981 – be specific but brief in your answer.
`;

const q1_6_soln =
`
As described in Garman’s “The Bug Heard 'round the World,” paper, due to
software changes, the PASS could with low probability (1 in 67) incorrectly
initialize the system time. This resulted in the PASS being one cycle out of
synchronization with the BFS. This caused the first shuttle launch to abort 20
minutes prior to the scheduled launch. The bug points out the challenges of
building and maintaining real-time systems, even when hundreds of
programmers are involved and hundreds of hours are spent on testing.
We deducted 1.5 points for answers that did not specify that the problem was
a synchronization error between the two sets of computers, and for answers
that included incorrect errors (e.g., priority inversion or deadlock).
`;

const q2_1 =
`
<h3>2. (24 points total) Scheduling.</h3>
Consider the following set of processes, with associated processing times and priorities:

<hr class="s2" />

<table>
<thead><tr><th>Process Name</th><th>Processing Time</th><th>Priority</th></tr></thead>
<tbody>
<tr><td>A</td><td>4</td><td>3</td></tr>
<tr><td>B</td><td>1</td><td>1</td></tr>
<tr><td>C</td><td>2</td><td>3</td></tr>
<tr><td>D</td><td>1</td><td>4</td></tr>
<tr><td>E</td><td>4</td><td>2</td></tr>
</tbody>
</table>

<hr class="s2" />

For each scheduling algorithm, fill in the  table with the process that is running on  the CPU (for timeslice-based algorithms, assume a 1 unit timeslice). Notes:
<ul>
<li>A smaller priority number implies a higher priority.</li>
<li>For RR and Priority, assume that an arriving thread is run at the beginning of its arrival time, if the scheduling policy allows it.</li>
<li>All of the processes arrive at time 0 in the order Process A, B, C, D, E.</li>
<li>Assume the currently running thread is not in the ready queue while it is running.</li>
<li>Turnaround time is defined as the time a process takes to complete after it arrives.</li>
</ul>
<hr class="s2" />
<table>
<thead><tr><th>Time</th><th>FIFO</th><th>RR</th><th>SRTF</th><th>Priority</th></tr></thead>
<tbody>
<tr><td>0</td><td></td><td></td><td></td><td></td></tr>
<tr><td>1</td><td></td><td></td><td></td><td></td></tr>
<tr><td>2</td><td></td><td></td><td></td><td></td></tr>
<tr><td>3</td><td></td><td></td><td></td><td></td></tr>
<tr><td>4</td><td></td><td></td><td></td><td></td></tr>
<tr><td>5</td><td></td><td></td><td></td><td></td></tr>
<tr><td>6</td><td></td><td></td><td></td><td></td></tr>
<tr><td>7</td><td></td><td></td><td></td><td></td></tr>
<tr><td>8</td><td></td><td></td><td></td><td></td></tr>
<tr><td>9</td><td></td><td></td><td></td><td></td></tr>
<tr><td>10</td><td></td><td></td><td></td><td></td></tr>
<tr><td>11</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Average Turnaround Time</td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>
`;

const q2_1_soln =
`
<table>
<thead><tr><th>Time</th><th>FIFO</th><th>RR</th><th>SRTF</th><th>Priority</th></tr></thead>
<tbody>
<tr><td>0</td><td>A</td><td>A</td><td>B</td><td>B</td></tr>
<tr><td>1</td><td>A</td><td>B</td><td>D</td><td>E</td></tr>
<tr><td>2</td><td>A</td><td>C</td><td>C</td><td>E</td></tr>
<tr><td>3</td><td>A</td><td>D</td><td>C</td><td>E</td></tr>
<tr><td>4</td><td>B</td><td>E</td><td>A</td><td>E</td></tr>
<tr><td>5</td><td>C</td><td>A</td><td>A</td><td>A</td></tr>
<tr><td>6</td><td>C</td><td>C</td><td>A</td><td>A</td></tr>
<tr><td>7</td><td>D</td><td>E</td><td>A</td><td>A</td></tr>
<tr><td>8</td><td>E</td><td>A</td><td>E</td><td>A</td></tr>
<tr><td>9</td><td>E</td><td>E</td><td>E</td><td>C</td></tr>
<tr><td>10</td><td>E</td><td>A</td><td>E</td><td>C</td></tr>
<tr><td>11</td><td>E</td><td>E</td><td>E</td><td>D</td></tr>
<tr><td>Average Turnaround Time</td><td>((4-0)+(5-0)+(7-0)+(8-0)+(12-0))/5 = 7.2</td><td>((11-0)+(2-0)+(7-0)+(4-0)+(12-0))5 = 7.2</td><td>(8+1+4+2+12)/5 = 5.4</td><td>(9+1+11+12+5)/5 = 7.6</td></tr>
</tbody>
</table>
<hr class="s2" />
Each column was graded separately with the same breakdown of 6 points. The
sequence was 4 of the 5 points and the turnaround time was 2 of the 5 points.
<hr class="s1" />
-0 Correct
<hr class="s1" />
-4 Major errors in schedule. The answer provided was not one of the common
misinterpretations.
<hr class="s1" />
-2 Minor errors in schedule. The answer provided is one of the common
misinterpretations or has a small mistake in it.
<hr class="s1" />
-2 Incorrect turnaround time. We did not double penalize here. If you provided
the correct turnaround time according to your schedule, you received full credit
for the final two points.
`;

const q3_1 =
`
<h3>3. (27 points total) Synchronization</h3>
a. (5 points) Consider the following procedure written in C:
<hr class="s2" />

<code>
<b>struct X</b> data;
<hr class="s2" />
<b>struct X</b> *getX(<b>const char</b> key[]) {
<hr class="s1" />
${fourspace}computeDatafromKey(key, &data);
<hr class="s1" />
${fourspace}// a value, based on key, is computed
<hr class="s1" />
${fourspace}// and stored in data
<hr class="s1" />
${fourspace}<b>return</b> &data;
<hr class="s1" />
}
</code>
<hr class="s2" />
i) (2 points) In a single-threaded program, one would call <code>getX</code> to obtain an item
of type <code>struct X</code>, based on the value of <code>key</code>. Briefly, in one or two sentences,
explain what problems would occur if one used <code>getX</code> in a multithreaded
program?
`;

const q3_1_soln =
`
Since <code>data</code> is statically allocated, if multiple threads call <code>getX</code> they will
overwrite the value stored in <code>data</code>.
`;

const q3_2 =
`
ii) (3 points) Rewrite getX to address the problem you mentioned in 3.a.i.
`;

const q3_2_soln =
`
<code>
struct X *getX(const char key[]) {
<hr class="s1" />
${fourspace}// The solution is to allocate a structure from the heap:
<hr class="s1" />
${fourspace}struct X *newdata = malloc(sizeof(struct X));
<hr class="s1" />
${fourspace}computeDatafromKey(key, &newdata);
<hr class="s1" />
${eightspace}// value, based on key, is computed
<hr class="s1" />
${eightspace}// and stored in data
<hr class="s1" />
${fourspace}return newdata;
<hr class="s1" />
}
</code>
`;

const q3_3 =
`
b.  (15 points) Consider a multithreaded operating system that includes monitors and condition variables with the following primitives:
<hr class="s2" />
<code>
mon_t *mon_create() ${eightspace} /* Creates a new monitor */
<hr class="s1" />
void mon_lock(mon_t *m) ${fourspace} /* Acquires the monitor's lock */
<hr class="s1" />
void mon_release(mon_t *m) ${onespace} /* Releases the monitor's lock */
<hr class="s2" />
cv_t *cv_create(mon_t *m) ${twospace} /* Creates a condition variable
<hr class="s1" />
${twelvespace}${twelvespace}${eightspace}associated with monitor m */
<hr class="s1" />
void cv_wait(cv_t *cv) ${fivespace} /* Blocks on the condition variable */
<hr class="s1" />
void cv_signal(cv_t *cv) ${threespace} /* Wakes a thread waiting on cv */
<hr class="s1" />
void cv_broadcast(cv_t *cv) ${onespace}/* Wakes all threads waiting on cv */
</code>

<hr class="s2" />

Your task is to implement general purpose semaphores under this system.
<hr class="s2" />
<code>
typedef struct {
<hr class="s1" />
${fourspace}mon_t *m;
<hr class="s1" />
${fourspace}cv_t *c;
<hr class="s1" />
${fourspace}int value;
<hr class="s1" />
} sema_t;
</code>
<hr class="s2" />
You may use these syscalls: <code>malloc(), free(), sbrk(), open(), close(), read(), write()</code>.
`;

const q3_3_soln =
`
<code>
sema_t *sema_create(int initval) {
<hr class="s1" />
${fourspace}sema_t *s;
<hr class="s1" />
${fourspace}if (initval < 0) return NULLL;
<hr class="s1" />
${fourspace}s = (sema_t *) malloc(sizeof(sema_t));
<hr class="s1" />
${fourspace}s->m = mon_create();
<hr class="s1" />
${fourspace}s->c = cv_create(s->m);
<hr class="s1" />
${fourspace}s->value = initavll;
<hr class="s1" />
${fourspace}return s;
<hr class="s1" />
}

<hr class="s2" />

void sema_down(sema_t *s)
<hr class="s1" />
{
<hr class="s1" />
${fourspace}mon_lock(s->m);
<hr class="s1" />
${fourspace}while (s->value <= 0) cv_wait(s->c);
<hr class="s1" />
${fourspace}s->value--;
<hr class="s1" />
${fourspace}mon_release(s->m);
<hr class="s1" />
}

<hr class="s2" />

void sema_up(sema_t *s)
<hr class="s1" />
{
<hr class="s1" />
${fourspace}mon_lock(s->m);
<hr class="s1" />
${fourspace}s->value++;
<hr class="s1" />
${fourspace}cv_signal(s->c);
<hr class="s1" />
${fourspace}mon_release(s->m);
<hr class="s1" />
}
</code>
`;

const q3_4 =
`
c. (7 points)  Consider the following three threads in a concurrent program that uses
semaphores Sem1, Sem2, and Sem3.

<hr class="s2" />

<code>
<u>Thread 1</u>
<hr class="s1" />
L1: sema_down(Sem3);
<hr class="s1" />
${fourspace}print("2");
<hr class="s1" />
${fourspace}sema_up(Sem2);
<hr class="s1" />
${fourspace}goto L1;
<hr class="s2" />
<u>Thread 2</u>
<hr class="s1" />
L2: sema_down(Sem1);
<hr class="s1" />
${fourspace}print("6");
<hr class="s1" />
${fourspace}sema_up(Sem3);
<hr class="s1" />
${fourspace}goto L2;
<hr class="s2" />
<u>Thread 3</u>
<hr class="s1" />
L2: sema_down(Sem2);
<hr class="s1" />
${fourspace}print("1");
<hr class="s1" />
${fourspace}sema_up(Sem1);
<hr class="s1" />
${fourspace}goto L3;
</code>

<hr class="s2" />

i) (4 points) Are there initial values that can be given to the semaphores so that
the threads cooperate to print a string that begins with 16216216216216? If
so, give the initial values (tell which value is to be used for which semaphore).
`;

const q3_4_soln =
`
Yes. Initialize the semaphores as follows: Sem1=0, Sem2=1, Sem3=0
`;

const q3_5 =
`
ii) (3 points) Suppose the initial values are Sem1=2, Sem2=6, Sem3=1. Is it
possible for the threads to cooperate to produce a string that begins with
1122622? Explain your answer.
`;

const q3_5_soln =
`
No. (No explanation given)
`;

const q4_1 =
`
<h3>4. (19 points) Coding questions.</h3>
a. (13 points) We would like to implement the Unix utility, tee, which reads data
from standard input and writes that data to standard output, as well as all of the
files that are passed on the command line. For example, if you run the following
command in bash:
<hr class="s2" />
<code>
$ echo "CS162 is the best!" | tee letter_to_mom.txt personal_motto.txt
</code>
<hr class="s2" />
Then, <code>tee</code> would print out “CS162	is the best!” to the terminal (standard
output), and it would also store "<code>CS162 is the best!</code>" into a file named
"<code>letter_to_mom.txt</code>" and a file named "<code>personal_motto.txt</code>".
<hr class="s2" />
i) (7 points) We have started writing the code for you. Fill in the <b>blank spots</b> in
the following code:
<hr class="s2" />
<code>
char buffer[1024];
<hr class="s1" />
int main(int argc, char **argv) {
<hr class="s1" />
${fourspace}int files[argc];
<hr class="s1" />
${fourspace}files[0] = ${longblank};
<hr class="s1" />
${fourspace}for (int i = 1; i < argc; i++) {
<hr class="s1" />
${eightspace}files[i] = fileno(fopen(argv[i], "w"));
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}while (1) {
<hr class="s1" />
${eightspace}int error = read(${longblank});
<hr class="s1" />
${eightspace}if (error <= 0) break;
<hr class="s1" />
${eightspace}for (int i = 0; i < argc; i++) {
<hr class="s1" />
${twelvespace}write(${longblank});
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}return 0;
<hr class="s1" />
}
</code>
`;

const q4_1_soln =
`
<ul>
<li>stdout</li>
<li>stdin, buffer, 1024</li>
<li>files[i], buffer, error</li>
</ul>
`;

const q4_2 =
`
ii) (2 points) What does this program do if we cannot open one of the destination files?
`;

const q4_2_soln =
`
The program will silently ignore the error.
`;

const q4_3 =
`
iii) (2 points) In our first for loop, what would change if we started the for loop at i = 0?
`;

const q4_3_soln =
`
We would overwrite the application binary(!) and not print the output to stdout.
`;

const q4_4 =
`
iv) (2 points) What does this program do if the same destination file appears more
than once on the command line?
`;

const q4_4_soln =
`
The correct output would appear in the file because each file descriptor has
its own position in the file.
`;

const q4_5 =
`
<h3>b. (6 points) PintOS questions.</h3>
i) (3 points) Will the PintOS implementation of semaphores work on a multiprocessor machine? Explain why they will work, or explain how you could fix them.
`;

const q4_5_soln =
`
No. Disabling interrupts only works with a single processor. We would need
to use atomic instructions like CAS.
`;

const q4_6 =
`
ii) (3 points) In PintOS, how does the <code>thread_current()</code> function find the
address of the currently running thread’s TCB? (If you did not have access to
this function, how could you get the address of the current thread’s TCB?)
`;

const q4_6_soln =
`
Just take the stack pointer and page-align it (mask off the last 12 bits). We
have mentioned several times in class that the thread struct shares a page
with the stack.
`;

const imgq5_1 = require('../../img/cs162sp16-5.png');
const q5_1 =
`
<h3>5. (12 points total) Resource Allocation.</h3>
Suppose we have the following snapshot of a system with five processes (P1, P2, P3,
P4, P5) and 4 resources (R1, R2, R3, R4). There are no outstanding queued
unsatisfied requests.

<hr class="s2" />

<img src=${imgq5_1} class="problem-image" />

<hr class="s2" />

a. (8 points) Is this system currently in a SAFE, UNSAFE, or deadlocked state?
Explain your answer and if possible, give an execution order.
`;

const q5_1_soln =
`
The system is in a SAFE state – P1 can run at any time, so a possible execution
path is P1, P4, P2, P3, P5. We accepted any valid execution order.
`;

const q5_2 =
`
b. (4 points) If a request from process P2 arrives for (0, 4, 2, 0), can the request be
granted immediately? Explain your answer and if possible, give an execution
order.
`;

const q5_2_soln =
`
Yes. P1 can run at any time, one possible execution path is P1, P3, P4, P5, P2.
We accepted any valid execution order.
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS162SP16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs162sp16';
    const problemIDs = ['q1', 'q2', 'q3', 'q4'];
    const problemTitles = [
      'Q1. Short Answer',
      'Q2. Scheduling',
      'Q3. Synchronization',
      'Q4. Coding Questions',
    ];

    return (
      <span>
        <h1>CS 162</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2016 | Joseph</h5>
        </div>
        <Sidebar examCode='cs162/mt1-sp16' problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <h2>General Information</h2>
            <hr className="s2" />
            <p>This is a closed book exam. You are allowed one 2-sided hand-written notes. You have 80 minutes to complete as much of the exam as possible. Make sure to read all of the questions first, as some of the questions are substantially more time consuming.</p>
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} examCode={examCode} />
            <Question id={"q1-2"} content={q1_2} solution={q1_2_soln} examCode={examCode} />
            <Question id={"q1-3"} content={q1_3} solution={q1_3_soln} examCode={examCode} />
            <Question id={"q1-4"} content={q1_4} solution={q1_4_soln} examCode={examCode} />
            <Question id={"q1-5"} content={q1_5} solution={q1_5_soln} examCode={examCode} />
            <Question id={"q1-6"} content={q1_6} solution={q1_6_soln} examCode={examCode} />
          </Element>
          <Element name="q2">
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} examCode={examCode} />
          </Element>
          <Element name="q3">
            <Question id={"q3-1"} content={q3_1} solution={q3_1_soln} examCode={examCode} />
            <Question id={"q3-2"} content={q3_2} solution={q3_2_soln} examCode={examCode} />
            <Question id={"q3-3"} content={q3_3} solution={q3_3_soln} examCode={examCode} />
            <Question id={"q3-4"} content={q3_4} solution={q3_4_soln} examCode={examCode} />
            <Question id={"q3-5"} content={q3_5} solution={q3_5_soln} examCode={examCode} />
          </Element>
          <Element name="q4">
            <Question id={"q4-1"} content={q4_1} solution={q4_1_soln} examCode={examCode} />
            <Question id={"q4-2"} content={q4_2} solution={q4_2_soln} examCode={examCode} />
            <Question id={"q4-3"} content={q4_3} solution={q4_3_soln} examCode={examCode} />
            <Question id={"q4-4"} content={q4_4} solution={q4_4_soln} examCode={examCode} />
            <Question id={"q4-5"} content={q4_5} solution={q4_5_soln} examCode={examCode} />
            <Question id={"q4-6"} content={q4_6} solution={q4_6_soln} examCode={examCode} />
          </Element>
          <Element name="q5">
            <Question id={"q5-1"} content={q5_1} solution={q5_1_soln} examCode={examCode} />
            <Question id={"q5-2"} content={q5_2} solution={q5_2_soln} examCode={examCode} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS162SP16;