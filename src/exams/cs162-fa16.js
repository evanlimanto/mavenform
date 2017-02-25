import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { lx, onespace, twospace, fourspace, sixspace, eightspace, twelvespace } from '../utils';

const _ = require('lodash');

const q1_1 =
`
<h3>1. (21 points total) True/False and Why?</h3>
<h3>a. (8 points) True/False and Why?</h3>

i) When a user program performs a system call, it must first put the system call
arguments onto the kernel stack and then run a special instruction to switch to
kernel mode.
`;

const q1_1_soln =
`
<b>FALSE</b>. Arguments are put on the thread’s stack, not kernel stack. The
correct answer was worth 1 point and the justification was worth an
additional 1 point.
`;

const q1_2 =
`
ii) On a system with a single processor core without hyperthreading, you can
speed up a single-threaded program by utilizing multiple threads.
`;

const q1_2_soln =
`
<b>TRUE</b>. Hypertrhreading enables the overlap of I/O and computation. The
correct answer was worth 1 points and the justification was worth an
additional 1 point.
`;

const q1_3 =
`
iii) When a user program successfully calls <code>execv()</code>, its process is replaced with
a new program. Everything about the old process is destroyed, including all of
the CPU registers, program counter, stack, heap, background threads, file
descriptors, and virtual address space.
`;

const q1_3_soln =
`
<b>FALSE</b>. File descriptors are not destroyed by <code>execv()</code>. The correct
answer was worth 1 points and the justification was worth an additional 1
point.
`;

const q1_4 =
`
iv) The only way a user thread can transfer control to kernel mode is through
syscalls, exceptions, and interrupts.
`;

const q1_4_soln =
`
<b>TRUE</b>. For security, threads can only transfer to kernel mode through
voluntary syscalls, and involuntary exceptions and interrupts. The correct
answer was worth 1 points and the justification was worth an additional 1
point.
`;

const q1_5 =
`
<h3>b. (13 points) Short answer.</h3>
i) (4 points) <u>Briefly</u>, in two to three sentences, explain how an Operating System
kernel uses dual mode operation to prevent user programs from overwriting
kernel data structures.
`;

const q1_5_soln =
`
Dual mode operation combined with address translation prevents user
programs from overwriting kernel data structures by limiting the operations
that user programs can perform. In particular, they cannot execute the
privileged instructions that change address translation..
`;

const q1_6 =
`
ii) (3 points) <u>Briefly</u>, in two to three sentences, explain the purpose of the <code>while</code>
loop in the context of Mesa-style condition variables.
`;

const q1_6_soln =
`
With Mesa-style condition variables, the signaler simply places the signaled
thread on the ready queue. Since another thread could run before the signaled
thread and could change the condition that caused the signaled thread to
wait, the signaled thread must check the condition using a <code>while</code> loop.
`;

const q1_7 =
`
iii) (4 points) <u>Briefly</u>, in two to three sentences, explain the problems with the
Therac-25 – be specific but brief in your answer.
`;

const q1_7_soln =
`
Software errors caused the deaths and injuries of several patients. There were
a series of race conditions on shared variables and poor software design that
lead to the machine’s malfunction under certain conditions.
`;

const q1_8 =
`
iv)  (2 points) In a typical OS, one way that a thread can transition from the
‘running’ state to the ‘waiting/blocked’ state is to wait on acquiring a lock.
Other than calling sleep or using semaphores or monitors, what are <b>TWO</b>
other different <i>types</i> of ways that a thread can transition from the ‘running’
state to the ‘waiting/blocked’ state?
`;

const q1_8_soln =
`
By making an I/O call, or calling <code>wait()</code> on a child process.
`;

const q2_1 =
`
<h3>2. (11 points total) C Programming.</h3>
Consider the following C program:
<hr class="s2" />
<code>
int thread_count = 0;
<hr class="s1" />
void *thread_start(void *arg) {
<hr class="s1" />
${fourspace}thread_count++;
<hr class="s1" />
${fourspace}if (thread_count == 3) {
<hr class="s1" />
${eightspace}char *argv[] = {"/bin/ls", NULL};
<hr class="s1" />
${eightspace}execv(*argv, argv);
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}printf("Thread: %d\\n", thread_count);
<hr class="s1" />
${fourspace}return NULL;
<hr class="s1" />
}
<hr class="s2" />
int main(int argc, char *argv[]) {
<hr class="s1" />
${fourspace}int i;
<hr class="s1" />
${fourspace}for (i = 0; i < 10; i++) {
<hr class="s1" />
${eightspace}pthread_t *thread = malloc(sizeof(pthread_t));
<hr class="s1" />
${eightspace}pthread_create(thread, NULL, &thread_start, NULL);
<hr class="s1" />
${eightspace}pthread_join(*thread, NULL);
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}return 0;
<hr class="s1" />
}
</code>

<hr class="s2" />

a. (6 points) When you run the program, what will be the output (assume that all system calls succeed)?
`;

const q2_1_soln =
`
The key part of this question is that exec will replace the current process, so no
more threads will be created. The output will be:
<hr class="s1" />
Thread: 1
<hr class="s1" />
Thread: 2
<hr class="s1" />
(contents of current directory)
`;

const q2_2 =
`
b. (5 points) If we removed the line <code>pthread_join(*thread, NULL)</code>, could the
output change? If so, explicitly describe the way(s) it might differ.
`;

const q2_2_soln =
`
Because the threads are created but aren’t waited for, they will execute in a non-
deterministic order. So, we could get 0 or more printings of:
<hr class="s1" />
Thread: {1…10}
<hr class="s1" />
${twospace}(contents of current directory zero or one times)
`;

const q3_1 =
`
<h3>3. (19 points total) Finite Synchronized Queue using Monitors.</h3>
In lecture we implemented an Infinite Synchronized Queue using a monitor. In this
exam question you will implement a Finite Synchronized Queue (FSQ) using a
monitor. The FSQ has Last-In, First-Out semantics  (like a stack), a fixed maximum
capacity and supports three operations: <code>CreateQueue()</code>, <code>AddToQueue()</code>, and <code>RemoveFromQueue()</code>.
<hr class="s2" />
a. (6 points) What are the correctness constraints for the Finite Synchronized Queue?
`;

const q3_1_soln =
`
1. If the queue is at capacity (full), then <code>AddToQueue()</code> must wait.
<hr class="s1" />
2. If the queue is empty, then <code>RemoveFromQueue()</code> must wait.
<hr class="s1" />
3. Only one thread may manipulate the queue at a time.
`;

const q3_2 =
`
Each element of the FSQ is a node:
<hr class="s2" />
<code>
typedef struct {
<hr class="s1" />
${fourspace}int data;
<hr class="s1" />
${fourspace}node *next;
<hr class="s1" />
} Node;
</code>
<hr class="s2" />

b. (3 points) Modify the <code>FSQ struct</code> to support a Finite Synchronized Queue.
<i>You may assume that you have <code>struct</code> types for the components of a monitor.</i>
`;

const q3_2_soln =
`
<code>
typedef struct {
<hr class="s1" />
${fourspace}Node *head; ${onespace} /* pointer to head of queue */
<hr class="s1" />
${fourspace}int length; ${onespace} /* number of nodes in queue */
<hr class="s1" />
${fourspace}int capacity; /* max size of queue */
<hr class="s1" />
${fourspace}Lock lock;
<hr class="s1" />
${fourspace}Condition dataAvailable;
<hr class="s1" />
${fourspace}Condition spaceAvailable;
<hr class="s1" />
} FSQ;
</code>
`;

const q3_3 =
`
We have implemented the <code>CreateQueue(int size)</code> function for you. You may
assume that the <code>head, length, capacity, and monitor</code> components are initialized.

<hr class="s2" />

c. (5 points) Implement the <code>AddToQueue()</code> function. Feel free to use pseudocode for
monitor operations.
</code>
`;

const q3_3_soln =
`
<code>
void AddToQueue(FSQ *queue, Node *data) {
<hr class="s1" />
${fourspace}LockAcquire(&queue->lock);
<hr class="s1" />
${fourspace}while(queue->length == queue->capacity)
<hr class="s1" />
${eightspace}wait(&queue->spaceAvailable, &queue->lock);
<hr class="s1" />
${fourspace}data->next = queue->head;
<hr class="s1" />
${fourspace}queue->head = data;
<hr class="s1" />
${fourspace}queue->length++;
<hr class="s1" />
${fourspace}signal(&queue->dataAvailable);
<hr class="s1" />
${fourspace}LockRelease(&queue->lock);
<hr class="s1" />
}
</code>
`;

const q3_4 =
`
d. (5 points) Implement the RemoveFromQueue() function. <i>Feel free to use pseudocode for monitor operations.</i>
`;

const q3_4_soln =
`
<code>
Node *RemoveFromQueue(FSQ *queue) {
<hr class="s1" />
${fourspace}Node *data;
<hr class="s1" />
${fourspace}LockAcquire(&queue->lock);
<hr class="s1" />
${fourspace}while(queue‐>length == 0)
<hr class="s1" />
${eightspace}wait(&queue->dataAvailable, &queue->lock);
<hr class="s1" />
${fourspace}data = queue‐>head;
<hr class="s1" />
${fourspace}queue->head = data->next;
<hr class="s1" />
${fourspace}signal(&queue‐>spaceAvailable);
<hr class="s1" />
${fourspace}LockRelease(&queue->lock);
<hr class="s1" />
${fourspace}return data;
<hr class="s1" />
}
</code>
`;

const q4_1 =
`
<h3>4. (22 points total) PintOS questions</h3>

a. (3 points) What is the maximum number of threads you can create in a user process
in PintOS?
`;

const q4_1_soln =
`
One; each process consists of a single thread.
`;

const q4_2 =
`
b. (4 points) How does PintOS preempt the currently running thread in order to
schedule a new thread to run, if the currently running thread never yields?
`;

const q4_2_soln =
`
Timer interrupts occur on each tick which lets the kernel preempt a thread that
has been running too long.
`;

const q4_3 =
`
c. (3 points) What is the purpose of the idle thread in PintOS? Note that simply saying
“the idle thread is the thread that runs when the system is idle” is not an
acceptable answer.
`;

const q4_3_soln =
`
The idle thread is a placeholder thread so the kernel is always running some
thread which allows scheduling logic to be implemented easily OR allows
switch_threads() to still work when there is no thread to switch from.
`;

const q4_4 =
`
d. (4 points) Briefly explain what happens when a timer interrupt occurs while
interrupts are disabled in PintOS.
`;

const q4_4_soln =
`
When interrupts are disabled, timer interrupts will not trigger the corresponding
interrupt handler. Because of this, threads running with interrupts disabled
cannot be context switched. Thus, turning interrupts off allows us to create an
atomic section in our code.
`;

const q4_5 =
`
e. (4 points) How does:
<hr class="s1" />
<code>struct thread *switch_threads (struct thread *cur, struct thread *next)</code>
<hr class="s1" />
work for a thread that has just been created?
`;

const q4_5_soln =
`
Upon creation of the thread, the stack will be initialized with two dummy frames
to make it seem like it has just been context switched away from. This includes the
root frame for the function <code>kernel_thread</code> and the frame for <code>switch_threads</code>.
<hr class="s2" />
The dummy frame for <code>switch_threads</code> includes space for the registers that are
normally saved on the stack when a <code>context_switch</code> is performed.
<hr class="s2" />
<code>
struct switch_threads_frame
<hr class="s1" />
{
<hr class="s1" />
${fourspace}uint32_t edi; ${sixspace} /* 0: Saved %edi. */
<hr class="s1" />
${fourspace}uint32_t esi; ${sixspace} /* 4: Saved %esi. */
<hr class="s1" />
${fourspace}uint32_t ebp; ${sixspace} /* 8: Saved %ebp. */
<hr class="s1" />
${fourspace}uint32_t ebx; ${sixspace} /* 12: Saved %ebx. */
<hr class="s1" />
${fourspace}void (*eip) (void); ${onespace}/* 16: Return address. */
<hr class="s1" />
${fourspace}struct thread *cur; ${onespace}/* 20: switch_threads()'s CUR argument. */
<hr class="s1" />
${fourspace}struct thread *next;${onespace}/* 24: switch_threads()'s NEXT argument. */
<hr class="s1" />
};
</code>
`;

const q4_6 =
`
f. (4 points) Consider the following code for the thread_exit() function in PintOS:
<hr class="s2" />
<code>
void thread_exit (void) {
<hr class="s1" />
${fourspace}ASSERT (!intr_context ());
<hr class="s2" />
#ifdef USERPROG
<hr class="s1" />
${fourspace}process_exit ();
<hr class="s1" />
#endif
<hr class="s2" />
${fourspace}/* Remove thread from all threads list, set our status to
<hr class="s1" />
${sixspace}dying, and schedule another process.That process
<hr class="s1" />
${sixspace}will destroy us when it calls thread_schedule_tail(). */
<hr class="s1" />
${fourspace}intr_disable ();
<hr class="s1" />
${fourspace}list_remove (&thread_current()->allelem);
<hr class="s1" />
${fourspace}thread_current ()->status = THREAD_DYING;
<hr class="s1" />
${fourspace}schedule ();
<hr class="s1" />
${fourspace}NOT_REACHED ();
<hr class="s1" />
}
</code>
<hr class="s2" />
Briefly explain what <code>NOT_REACHED()</code> means and why this happens.
`;

const q4_6_soln =
`
<code>NOT_REACHED()</code> panics the kernel when it is called, so the code should never
reach that point. The reason why it should never reach that point is because
<code>schedule()</code> will eventually remove the dying thread and clean up its memory so
it can never be run again.
`;

const q5_1 =
`
<h3>5. (27 points total) Santa Claus problem (from <i>Operating Systems: Internals and Design
Principles</i>)</h3>

Santa Claus sleeps in his shop and can only be woken up by either:
<hr class="s2" />
${fourspace}(1) all ten reindeer being back from their vacation or
<hr class="s1" />
${fourspace}(2) some of the elves having difficulty making toys.
<hr class="s2" />
The elves can only wake Santa up when 5 of them have a problem. While Santa is
helping the 5 elves with their problems, any other elf who needs to meet Santa must
wait till the other 5 elves have been tended to first.
<hr class="s2" />
If Santa wakes up to 5 elves and all ten reindeer, Santa decides that the elves must
wait and focuses on getting his sled ready. The last (tenth) reindeer to arrive must get
Santa while the others wait before being harnessed to the sled. <i>You can assume that
there are only ten reindeer, but you cannot make assumptions on the number of elves.</i>
<hr class="s2" />
Assume Santa can call these methods: <code>prepareSleigh(), helpElves()</code>
Reindeer call <code>getHitched()</code> and Elves call <code>getHelp()</code> – both <code>getHitched()</code>
and <code>getHelp()</code> are thread safe, and can be called outside of critical sections.
<hr class="s2" />
<b>You MUST implement the problem using semaphores.</b>
<hr class="s2" />
a. (6 points) What are the correctness constraints?
`;

const q5_1_soln =
`
1. After the 10th reindeer arrives, Santa must call <code>prepareSleigh()</code>, then all ten
reindeer must call <code>getHitched()</code>.
<hr class="s2" />
2. After the 5th elf arrives, Santa must invoke <code>helpElves()</code>. All 5 elves should
invoke <code>getHelp()</code>.
<hr class="s2" />
3. All 5 elves must invoke <code>getHelp()</code> before any other elves enter.
`;

const q5_2 =
`
b. (6 points) Initialize the global variables:
`;

const q5_2_soln =
`
<code>
int num_elves = 0;
<hr class="s1" />
int num_reindeer = 0;
<hr class="s2" />
santaSem = Semaphore(0);
<hr class="s1" />
reindeerSem = Semaphore(0);
<hr class="s1" />
elfSem = Semaphore(1);
<hr class="s1" />
lock = Semaphore(1);
</code>
`;

const q5_3 =
`
c. (5 points) Implement the <code>Santa()</code> function:
<hr class="s2" />
<code>
Santa() {
<hr class="s2" />
<hr class="s2" />
<hr class="s2" />
}
</code>
`;

const q5_3_soln =
`
<code>
Santa() {
<hr class="s1" />
${fourspace}while(1) {
<hr class="s1" />
${eightspace}santaSem.P();
<hr class="s1" />
${eightspace}lock.P();
<hr class="s1" />
${eightspace}if (num_reindeer == 10) {
<hr class="s1" />
${twelvespace}prepareSleigh();
<hr class="s1" />
${twelvespace}reindeerSem.V(); // do this 10 times
<hr class="s1" />
${twelvespace}num_reindeer -= 10;
<hr class="s1" />
${eightspace}} else if (num_elves == 5) {
<hr class="s1" />
${twelvespace}helpElves();
<hr class="s1" />
${eightspace}}
<hr class="s1" />
${eightspace}lock.V();
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
</code>

<hr class="s2" />

Santa either has to deal with all the reindeer arriving, or a group of elves who
need help. If ten reindeer are waiting, Santa calls <code>prepareSleigh()</code> then signals
<code>reindeerSem</code> 10 times so that the reindeer can invoke <code>getHitched()</code>. If elves are
waiting, Santa just calls <code>helpElves()</code>. He doesn’t need to worry about
decrementing any counter because the elves do that on their own on their way
out.
`;

const q5_4 =
`
d. (5 points) Implement the <code>ReindeerComesHome()</code> function:
<hr class="s2" />
<code>
ReindeerComesHome() {
<hr class="s2" />
<hr class="s2" />
<hr class="s2" />
}
</code>
`;

const q5_4_soln =
`
<code>
ReindeerComesHome() {
<hr class="s1" />
${fourspace}lock.P();
<hr class="s1" />
${fourspace}num_reindeer += 1;
<hr class="s1" />
${fourspace}if (num_reindeer == 10) {
<hr class="s1" />
${eightspace}santaSem.V();
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}lock.V();
<hr class="s1" />
${fourspace}reindeerSem.P();
<hr class="s1" />
${fourspace}getHitched();
<hr class="s1" />
}
</code>

<hr class="s2" />

The 10th reindeer signals Santa then joins the other reindeer waiting on the <code>reindeerSem</code>. When Santa signals all the waiting reindeer, they execute
<code>getHitched()</code>.
`;

const q5_5 =
`
e. (5 points) Implement the <code>ElfRequestsHelp()</code> function:

<hr class="s2" />
<code>
ElfRequestsHelp() {
<hr class="s2" />
<hr class="s2" />
<hr class="s2" />
}
</code>
`;

const q5_5_soln =
`
<code>
ElfRequestsHelp() {
<hr class="s1" />
${fourspace}elfSem.P();
<hr class="s1" />
${fourspace}lock.P();
<hr class="s1" />
${fourspace}num_elves += 1;
<hr class="s1" />
${fourspace}if (num_elves == 5) {
  <hr class="s1" />
${eightspace}santaSem.V();
<hr class="s1" />
${fourspace}} else {
<hr class="s1" />
${eightspace}elfSem.V();
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}lock.V();
<hr class="s1" />
${fourspace}getHelp();
<hr class="s1" />
${fourspace}lock.P();
<hr class="s1" />
${fourspace}num_elves -= 1;
<hr class="s1" />
${fourspace}if (num_elves == 0) {
  <hr class="s1" />
${eightspace}elfSem.V();
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}lock.V();
<hr class="s1" />
}
</code>

<hr class="s2" />

The first four elves release the <code>elfSem</code> at the same time they release the lock, but
the last elf holds the <code>elfSem</code>, which prevents other elves from entering until all
three elves have invoked <code>getHelp()</code>. The last elf to leave releases the <code>elfSem</code>,
which allows the next group of elves to enter to request help from Santa. 
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS162Fa16 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs162fa16';
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5'];
    const problemTitles = [
      'Q1. True/False and Why?',
      'Q2. C Programming',
      'Q3. Finite Synchronized Queue using Monitors',
      'Q4. PintOS Questions',
      'Q5. Santa Claus problem (from Operating Systems: Internals and Design Principles',
    ];
    return (
      <span>
        <h1>CS 162</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2016 | Joseph</h5>
        </div>
        <Sidebar examCode='cs162/mt1-fa16' problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <Question id={"q1-1"} content={q1_1} solution={q1_1_soln} examCode={examCode} />
            <Question id={"q1-2"} content={q1_2} solution={q1_2_soln} examCode={examCode} />
            <Question id={"q1-3"} content={q1_3} solution={q1_3_soln} examCode={examCode} />
            <Question id={"q1-4"} content={q1_4} solution={q1_4_soln} examCode={examCode} />
            <Question id={"q1-5"} content={q1_5} solution={q1_5_soln} examCode={examCode} />
            <Question id={"q1-6"} content={q1_6} solution={q1_6_soln} examCode={examCode} />
            <Question id={"q1-7"} content={q1_7} solution={q1_7_soln} examCode={examCode} />
            <Question id={"q1-8"} content={q1_8} solution={q1_8_soln} examCode={examCode} />
          </Element>
          <Element name="q2">
            <Question id={"q2-1"} content={q2_1} solution={q2_1_soln} examCode={examCode} />
            <Question id={"q2-2"} content={q2_2} solution={q2_2_soln} examCode={examCode} />
          </Element>
          <Element name="q3">
            <Question id={"q3-1"} content={q3_1} solution={q3_1_soln} examCode={examCode} />
            <Question id={"q3-2"} content={q3_2} solution={q3_2_soln} examCode={examCode} />
            <Question id={"q3-3"} content={q3_3} solution={q3_3_soln} examCode={examCode} />
            <Question id={"q3-4"} content={q3_4} solution={q3_4_soln} examCode={examCode} />
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
            <Question id={"q5-3"} content={q5_3} solution={q5_3_soln} examCode={examCode} />
            <Question id={"q5-4"} content={q5_4} solution={q5_4_soln} examCode={examCode} />
            <Question id={"q5-5"} content={q5_5} solution={q5_5_soln} examCode={examCode} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS162Fa16;
