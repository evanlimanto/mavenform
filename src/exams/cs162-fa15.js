import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, eightspace, twelvespace } from '../utils';

const _ = require('lodash');

const q1_1 =
`
<h3>Problem 1: TRUE/FALSE [18 pts]</h3>

In the following, it is important that you EXPLAIN your answer in TWO SENTENCES OR LESS
(Answers  longer  than  this  may  not  get  credit!). Also, answers without an explanation GET NO CREDIT.
<hr class="s2" />
<b>Problem 1a[2pts]</b>: When you type Ctrl+C to quit a program in your terminal, you are actually sending a SIGINT signal to the program, which makes it quit.
`;

const q1_1_soln =
`
<b>True.</b>
<hr class="s1" />
Explain: SIGINT is a vehicle for conveying a Ctrl-C requests from the terminal to
the program.  Assuming that the SIGINT handler has not be redirected, this will cause the
program to quit. Note: we would also take “False” if you explain that the SIGINT handler
might have been redirected.
`;

const q1_2 =
`
<b>Problem 1b[2pts]</b>: The function <code>pthread_intr_disable()</code> is a crude but viable way for user programs to implement an atomic section.
`;

const q1_2_soln =
`
<b>False.</b>
<hr class="s1" />
Explain:  This  function  does  not  exist.  However,  you  cannot  disable  interrupt  at
user  level  in  any  case. A similarly-named  routine  (<code>pthread_setintr()</code>) simply disables  the  delivery  of  signals;  it  does  not  prevent  multiple  threads  from  executing concurrently—thus it could not be used to implement a critical section.
`;

const q1_3 =
`
<b>Problem 1c[2pts]</b>: If the banker's algorithm finds that it's safe to allocate a resource to an existing
thread, then all threads will eventually complete.
`;

const q1_3_soln =
`
<b>False.</b>
<hr class="s1" />
Explain: When the banker's algorithm finds that it's safe to allocate a resource, this
simply means that threads could complete from a resource allocation standpoint. However,
threads could still go into an infinite loop or otherwise fail to complete.
`;

const q1_4 =
`
<b>Problem 1d[2pts]</b>: The lottery scheduler can be utilized to implement strict priority scheduling.
`;

const q1_4_soln =
`
<b>False.</b>
<hr class="s1" />
Explain: Strict priority scheduling would require the ability to have high-priority
threads that receive all CPU time – at the expense of lower priority threads.  The lottery
scheduler will give some CPU time to every thread (except those which have zero tokens).
`;

const q1_5 =
`
<b>Problem 1e[2pts]</b>: Locks can be implemented using semaphores.
`;

const q1_5_soln =
`
<b>True.</b>
<hr class="s1" />
Explain: Initializing a semaphore with the value “1” will cause it to behave like a
lock. <code>Semi.P() -> acquire()</code> and <code>Semi.V() -> release()</code>.
`;

const q1_6 =
`
<b>Problem 1f[2pts]</b>: Two processes can share information by reading and writing from a shared linked list.
`;

const q1_6_soln =
`
<b>True.</b>
<hr class="s1" />
Explain: If a shared page is mapped into the same place in the address space of
two processes, then they can share data structures that utilize pointers as long as they are stored in the shared page and pointers are to structures in the shared page.
`;

const q1_7 =
`
<b>Problem 1g[2pts]</b>: In Pintos, a kernel-level stack can grow as large as it needs to be to perform its functions.
`;

const q1_7_soln =
`
<b>False.</b>
<hr class="s1" />
Explain: Stacks in the Pintos kernel must fit entirely into a 4K page.  In fact, they
share  the 4K page with the corresponding Thread Control Block (TCB).
`;

const q1_8 =
`
<b>Problem 1h[2pts]</b>: Suppose that a shell program wants to execute another program and wait on its
result.  It does this by creating a thread, calling exec from within that thread, then waiting in the original thread.
`;

const q1_8_soln =
`
<b>False.</b>
<hr class="s1" />
Explain: The shell program must create a new process (not thread!) before calling
<code>exec()</code> otherwise, the <code>exec()</code> call will terminate the existing process and start a new process – effectively terminating the shell.
`;

const q1_9 =
`
<b>Problem 1i[2pts]</b>: A network server  in  Linux  works  by  calling <code>bind()</code>  on  a  socket,  and  then
calling <code>listen()</code> on the socket in a loop to wait for new clients.
`;

const q1_9_soln =
`
<b>False.</b>
<hr class="s1" />
Explain: The server calls <code>listen()</code> only once, then <code>accept()</code> multiple times in a loop.
`;

const q2_1 =
`
<h3>Problem 2: Short Answer [18pts]</h3>

<b>Problem 2a[2pts]</b>: How does a modern OS regain control of the CPU from a program stuck in an infinite loop?
`;

const q2_1_soln =
`
Assuming that we are talking about a user-level program (or a kernel thread with interrupts
enabled), the timer interrupt handler (triggered by the timer) will enter the scheduler and
recover the CPU from a program that is stuck in an infinite loop.
`;

const q2_2 =
`
<b>Problem 2b[2pts]</b>: Is it possible for an interrupt handler (code triggered by a hardware interrupt) to
sleep while waiting for another event?  If so, explain how.  If not, explain why not.
`;

const q2_2_soln =
`
There are actually two possible answers to this question.  (1) “NO”: Strictly speaking, an
interrupt  handler  must  not  sleep  while  waiting  for  another  event,  since  it  doesn’t  have  a
thread-control  block  (context)  to  put  onto  a  wait  queue  and  is  operating  with  interrupts
disabled.  However, one could also answer (2) “YES”: an interrupt handler that wants to
sleep must allocate a new kernel thread to finish its work, place the thread on a wait queue,
then return from the interrupt (reenabling interrupts in the process).
`;

const q2_3 =
`
<b>Problem  2c[2pts]</b>:  Why  is  it  important  for  system  calls  to  be  vectored  through  the  syscall  table
(indexed by an integer syscall number) rather than allowing the user to specify a function address to
be called by the kernel after it transitions to kernel mode?
`;

const q2_3_soln =
`
If the user were able to specify an arbitrary address for execution in the kernel, then they
could bypass checking and find many ways to violate protection.  Consequently, the user
must specify a syscall number during the execution of a system call.  The hardware then
atomically raises the hardware level to “kernel level” while executing the system call from
the specified entry point.
`;

const q2_4 =
`
<b>Problem  2d[3pts]</b>:  Name  two  advantages  and  one  disadvantage  of  implementing  a  threading
package at user level (e.g. “green threads”) rather than relying on thread scheduling from within the
kernel.
`;

const q2_4_soln =
`
Advantages  include:  very  fast  context  switch  (all  at  user  level,  no  system  call),  very  low
overhead thread fork, and user-configurable scheduling. One very important disadvantage
is the fact that all threads will get put to sleep when any one thread enters into the kernel
and blocks on I/O.
`;

const q2_5 =
`
<b>Problem 2e[2pts]</b>: List two reasons why overuse of threads is bad (i.e. using too many threads for
different tasks). Be explicit in your answers.
`;

const q2_5_soln =
`
There a number of possible answers (1) Too many threads scheduled simultaneously can
lead  to  excessive  context  switch  overhead.  (2)  Too  many  threads  can  lead  to  memory
overutilization.  (3) Too many threads can cause excessive synchronization overhead (many
locks to handle all the parallelism).
`;

const q2_6 =
`
<b>Problem 2f[2pts]</b>: What was the problem with the Therac-25? Your answer should involve one of
the topics of the class.
`;

const q2_6_soln =
`
The  Therac-25  had  a  number  of  synchronization  problems, including
improper synchronization between the operator console and the turntable mechanism which caused patients to receive the wrong type and dosage of radiation.
`;

const q2_7 =
`
<b>Problem 2g[2pts]</b>: Why is it possible for a web browser (such as Firefox) to have 2 different tabs
opened to the same website (at the same remote IP address and port) without mixing up content directed at each tab?
`;

const q2_7_soln =
`
Because a unique TCP/IP connection consists of a 5-tuple, namely [source IP, source Port,
destination  IP,  destination  Port,  and  protocol]  (where  the  protocol  is  “6”  for  TCP/IP  –
which you didn’t need to know). Consequently, although the web browser might have many
connections with the same source IP address, destination IP address and destination Port,
they will all have unique source ports, allowing them to be unique.
`;

const q2_8 =
`
<b>Problem  2h[3pts]</b>:  What  are  some  of  the  hardware  differences  between  kernel  mode  and  user
mode?  Name at least three.
`;

const q2_8_soln =
`
There are a number of differences: (1) There is at least one status bit (the “kernel mode bit”) which changes between kernel mode and user mode. In an x86 processor, there are 2 bits which change (since there a 4 modes). (2) Additional kernel-mode instructions are available (such as those that modify the page table registers, those that enable and disable interrupts, etc). (3) Pages marked as kernel-mode in their PTEs are only available in kernel mode. (4) Control for I/O devices (such as the timer, interrupt controllers, and device controllers) are typically only available from kernel mode.
`;

const q2_9 =
`
There are a number of differences: (1) There is at least one status bit (the “kernel mode
bit”) which changes between kernel mode and user mode.  In an x86 processor, there are 2
bits  which  change  (since  there  a  4  modes).  (2)  Additional  kernel-mode  instructions  are
available (such as those that modify the page table registers, those that enable and disable
interrupts, etc). (3) Pages marked as kernel-mode in their PTEs are only available in kernel
mode.  (4)  Control  for  I/O  devices  (such  as  the  timer,  interrupt  controllers,  and  device
controllers) are typically only available from kernel mode.
`;

const imgq3_1 = require("../img/cs162fa15-3.png");
const q3_1 =
`
<h3>Problem 3: Boy-Girl Lock [20pts]</h3>

A boy-girl lock is a sort of generalized reader-writer lock: in a reader-writer lock there can be any
number of readers or a single writer (but not both readers and writers at the same time), while in a
boy-girl lock there can be any number of boys or any number of girls (but not both a boy and a girl
at the same time).  Assume that we are going to implement this lock at user level utilizing pThread
monitors (i.e pThread mutexes and condition variables). Note that the assumption here is that we
will put threads to sleep when they attempt to acquire the lock as a Boy when it is already acquired
by one or more Girls and vice-versa. <i>You must implement the behavior using condition variable(s).
Points will be deducted for any spin-waiting behavior.</i>
<hr class="s2" />

Some snippets from POSIX Thread manual pages showing function signatures are shown on this <a href=${imgq3_1} target="_blank"><b>LINK</b></a>. They may or may not be useful.

<hr class="s2" />
Our first take at this lock is going to utilize the following structure and enumeration type:
<hr class="s2" />
<code>
/* The basic structure of a boy-girl lock */
<hr class="s1" />
struct bglock {
<hr class="s1" />
${fourspace}pthread_mutex_t lock;
<hr class="s1" />
${fourspace}pthread_cond_t wait_var;
<hr class="s2" />
${fourspace}// Simple state variable
<hr class="s1" />
${fourspace}int state;
<hr class="s1" />
};
<hr class="s1" />
<hr class="s2" />
<hr class="s1" />
/* Enumeration to indicate type of requested lock */
<hr class="s1" />
enum bglock_type {
<hr class="s1" />
${fourspace}BGLOCK_BOY = 0;
<hr class="s1" />
${fourspace}BGLOCK_GIRL = 1;
<hr class="s1" />
};
<hr class="s1" />
<hr class="s2" />
<hr class="s1" />
/* interface functions: return 0 on success, error code on failure */
<hr class="s1" />
int bglock_init(struct bglock *lock);
<hr class="s1" />
int bglock_lock(struct bglock *lock, enum bglock_type type);
<hr class="s1" />
int bglock_unlock(struct bglock *lock);
</code>
<hr class="s2" />
Note that the lock requestor specifies the type of lock that they want at the time that they make the request:
<hr class="s2" />
<code>
/* Request a Boy lock */
<hr class="s1" />
if (bglock_lock(mylock, BGLOCK_BOY) {
<hr class="s1" />
${fourspace}printf("Lock request failed!");
<hr class="s1" />
${fourspace}exit(1);
<hr class="s1" />
}
<hr class="s1" />
/* . . . Code using lock . . . */
<hr class="s2" />
/* Release your lock */
<hr class="s1" />
bglock_unlock(mylock);
</code>

<hr class="s2" />

<b>Problem  3a[3pts]</b>:  Complete  the  following  sketch  for  the  initialization  function. Note that
initialization should return zero on success and a non-zero error code on failure (e.g.  return the
failure code, if you encounter one, from the various synchronization functions). <i>Hint: the state of the lock is more than just “acquired” or “free”.</i>

<hr class="s2" />

<code>
/* Initialize the BG lock.
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}* Args: pointer to a bglock
<hr class="s1" />
${onespace}* Returns: 0 (success)
<hr class="s1" />
${onespace}*          non-zero (errno code from synchronization functions)
<hr class="s1" />
${onespace}*/
<hr class="s1" />
int bglock_init(struct bglock *lock) {
<hr class="s2" />
<hr class="s2" />
<hr class="s2" />
}
</code>
`;

const q3_1_soln =
`
<code>
/* Initialize the BG lock.
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}* Args: pointer to a bglock
<hr class="s1" />
${onespace}* Returns: 0 (success)
<hr class="s1" />
${onespace}*          non-zero (errno code from synchronization functions)
<hr class="s1" />
${onespace}*/
<hr class="s1" />
int bglock_init(struct bglock *lock) {
<hr class="s1" />
${fourspace}int result;
<hr class="s2" />
${fourspace}lock->state = 0; // No lock holders of any type
<hr class="s2" />
${fourspace}if (result = pthread_mutex_init(&(lock->lock), NULL))
<hr class="s1" />
${eightspace}return result; // Error
<hr class="s2" />
${fourspace}result = pthread_cond_init(&(lock->wait_var), NULL);
<hr class="s1" />
${fourspace}return result;
<hr class="s1" />
}
</code>
`;

const q3_2 =
`
<b>Problem 3b[5pts]</b>: Complete the following sketch for the lock function.  Think carefully about the
state of the lock; when you should wait, when you can grab the lock.
`;

const q3_2_soln =
`
<code>
/* Grab a BG lock.
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}* Args: (pointer to a bglock, enum lock type)
<hr class="s1" />
${onespace}* Returns: 0 (lock acquired)
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}*/
<hr class="s1" />
int bglock_lock(struct bglock *lock, enum bglock_type type) {
<hr class="s1" />
${fourspace}int dir = (type == BGLOCK_BOY) ? 1 : -1; // Direction
<hr class="s1" />
${fourspace}int result;
<hr class="s2" />
${fourspace}// Grab monitor lock
<hr class="s1" />
${fourspace}if (result = pthread_mutex_lock(&(lock->lock)))
<hr class="s1" />
${eightspace}return result; // error
<hr class="s2" />
${fourspace}while (lock->state * dir < 0) {
<hr class="s1" />
${eightspace}// Incompatible threads already have bglock, must sleep
<hr class="s1" />
${eightspace}if (result = pthread_cond_wait(&(lock->wait_var), &(lock->lock)))
<hr class="s1" />
${twelvespace}return result; // error
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}lock->state += dir; // register new bglock holder of this type
<hr class="s2" />
${fourspace}// Release monitor lock
<hr class="s1" />
${fourspace}result = pthread_mutex_unlock(&(lock->lock));
<hr class="s1" />
${fourspace}return result;
<hr class="s1" />
}
</code>
`;

const q3_3 =
`
<b>Problem 3c[5pts]</b>: Complete the following sketch for the unlock function.

<hr class="s2" />

<code>
/* Release a BG lock.
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}* Args: pointer to a bglock
<hr class="s1" />
${onespace}* Returns: 0 (lock acquired)
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}*/
<hr class="s1" />
int bglock_unlock(struct bglock *lock) {
<hr class="s2" />
<hr class="s2" />
<hr class="s2" />
}
</code>
`;

const q3_3_soln =
`
<code>
/* Release a BG lock.
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}* Args: pointer to a bglock
<hr class="s1" />
${onespace}* Returns: 0 (lock acquired)
<hr class="s1" />
${onespace}*
<hr class="s1" />
${onespace}*/
<hr class="s1" />
int bglock_unlock(struct bglock *lock) {
<hr class="s1" />
${fourspace}int result;
<hr class="s2" />
${fourspace}// Grab monitor lock
<hr class="s1" />
${fourspace}if (result = pthread_mutex_locK(&(lock->lock)))
<hr class="s1" />
${eightspace}return result; // error
<hr class="s2" />
${fourspace}// one less bglock holder of this type
<hr class="s1" />
${fourspace}lock->state -= (lock->state > 0) ? 1 : -1; // Direction
<hr class="s2" />
${fourspace}// If returning to neutral status, signal any waiters
<hr class="s1" />
${fourspace}if (lock->state == 0)
<hr class="s1" />
${eightspace}if (result = pthread_cond_broadcast(&(lock->wait_var)))
<hr class="s1" />
${twelvespace}return result; // error
<hr class="s2" />
${fourspace}// Release monitor lock
<hr class="s1" />
${fourspace}result = pthread_mutex_unlock(&(lock->lock));
<hr class="s1" />
${fourspace}return result;
<hr class="s1" />
}
</code>
`;

const q3_4 =
`
<b>Problem 3d[2pts]</b>: Consider a group of “nearly” simultaneous arrivals (i.e. they arrive in a period much quicker than the  time for any one thread that has successfully acquired the BGlock to get
around the <code>bglock_lock()</code>). Assume that they enter the <code>bglock_lock()</code> routine in this order:
${lx('B_1, B_2, G_1, G_2, B_3, G_3, B_4, B_5, B_6, B_7', false)}
How  will  they  be  grouped?    (Place  braces,  namely  “{}”  around  requests  that  will  hold  the  lock
simultaneously).    This  simple  lock  implementation  (with  a  single  state  variable)  is  subject  to
starvation.  Explain.
`;

const q3_4_soln =
`
All of the boy requests will go first, followed by girl requests:
<hr class="s2" />
${lx('\\{ B_1, B_2, B_3, B_4, B_5, B_6, B_7 \\}, \\{ G_1, G_2, G_3 \\}')}
<hr class="s2" />
This implementation experiences starvation because a series of waiting girl lock requests could be arbitrarily held off if there is a stream of boy requests (and vice-versa).
`;

const q3_5 =
`
<b>Problem 3e[5pts]</b>: Suppose that we want to enforce fairness, such that Boy and Girl requests are
divided into phases based on arrival time into the <code>bglock_lock()</code> routine.  Thus, for instance,
an arrival stream of Boys and Girls such as this:
<hr class="s2" />
${lx('B_1, B_2, G_1, G_2, G_3, G_4, B_3, G_5, B_4, B_5', false)}
will get granted in groups such as this:
${lx('\\{B_1, B_2\\}, \\{G_1, G_2, G_3, G_4\\}, \\{B_3\\}, \\{G_5\\}, \\{B_4, B_5\\}', false)}
Explain what the minimum changes are that you would need to make to the bglock structure to meet  these  requirements  and  sketch  out  what  you  would  do  during  <code>bglock_init()</code>  and
<code>bglock_lock()</code> and <code>bglock_unlock()</code> routines.  You do not need to write actual code, but
should be explicit about what your bglock structure would look like and how you would use its
fields to accomplish the desired behavior.
`;

const q3_5_soln =
`
Here,  we  number  phases  starting  from  zero  (with  wraparound).  We  expand  our  state
variable to queue of state variables.  Each incoming thread figures out which phase they are
in and then optionally sleeps (if they are not in the current phase).  Our new bglock looks
like this:
<hr class="s2" />
<code>
struct bglock {
<hr class="s1" />
${fourspace}pthread_mutex_t lock;
<hr class="s1" />
${fourspace}pthread_cond_t wait_var;
<hr class="s2" />
${fourspace}int headphase, tailphase;
<hr class="s1" />
${fourspace}int state[MAX_PHASES+1];
<hr class="s1" />
};
</code>
<hr class="s2" />
<code>bglock_init()</code>: initialize lock and wait_var; headphase=0; tailphase=0; state[x]=0 for all x;
<hr class="s2" />
<code>bglock_lock()</code>: if state[tailphase] doesn’t match request, increment tailphase (with wrapping
– may have to sleep if already have MAX_PHASES phases). In whatever case, increment
state[tailphase]  in  correct  direction  (+1  or  -1)  depending  on  desired  type  of  lock.    Save
current  tailphase  as  your  phase.  Then,  wait  on  condition  variable  until  headphase  ==
current tailphase.
<hr class="s2" />
<code>bglock_unlock()</code>: Decrement state[headphase] in correct direction (-1 or +1) depending on
desired type of lock. If state[headphase]==0, check to see if headphase!=tailphase.  If so,
headphase++, broadcast to wake up everyone on condition variable.
<hr class="s2" />
Note that you can optimize wakeup behavior by adding a queue of condition variables as
well, although this will increase the amount of state in the bglock.
`;

const q4_1 =
`
<h3>Problem 4: Scheduling and Deadlock [24 pts]</h3>

<b>Problem 4a[3pts]</b>: What is priority inversion and why is it an important problem? Present a
priority inversion scenario in which a lower priority process can prevent a higher-priority process
from running (assume that there is no priority donation mechanism):
`;

const q4_1_soln =
`
Priority inversion is a situation in which a lower-priority task is allowed to run over a higher-
priority task. Consider three tasks in priority order: T1, T2, and T3 (i.e. T1 is lowest, T3 is
highest).  Suppose that T1 grabs a lock, T2 starts running, then T3 tries to grab the lock (and
sleeps).  Here, T2 is effectively preventing T3 from running (since T2 is preventing T1 from
running, which is preventing T3 from running).  The result is priority inversion.
`;

const q4_2 =
`
<b>Problem 4b[3pts]</b>: How does the Linux CFS (“Completely Fair Scheduler”) scheduler decide
which thread to run next?  What aspect of its behavior is “fair”?  (You can ignore the presence of
priorities or “nice” values in your answer):
`;

const q4_2_soln =
`
The Linux CFS scheduler computes something called “virtual time” which is a scaled version of
real CPU time.  The scheduler attempts to make sure that every thread has an equal amount of
virtual time.  Thus, to decide which thread to run next, it simply picks the thread with the least
amount of accumulated virtual time. This behavior is considered “fair” because it attempts to
distribute the same total virtual time to every thread.
<hr class="s2" />
<code>
${twospace}void main (void) {
<hr class="s1" />
1 ${fourspace}thread_set_priority(10);
<hr class="s1" />
2 ${fourspace}struct lock a, b, c;
<hr class="s1" />
3 ${fourspace}lock_init(&a);
<hr class="s1" />
4 ${fourspace}lock_init(&b);
<hr class="s1" />
5 ${fourspace}lock_init(&c);
<hr class="s1" />
6 ${fourspace}lock_acquire(&a);
<hr class="s1" />
7 ${fourspace}lock_acquire(&b);
<hr class="s1" />
8 ${fourspace}lock_acquire(&c);
<hr class="s1" />
9 ${fourspace}printf(“1”);
<hr class="s1" />
10${fourspace}thread_create(“a”,15,func,&a);
<hr class="s1" />
11${fourspace}printf(“6”);
<hr class="s1" />
12${fourspace}thread_create(“b”,20,func,&b);
<hr class="s1" />
13${fourspace}printf(“2”);
<hr class="s1" />
14${fourspace}thread_create(“c”,25,func,&c);
<hr class="s1" />
15${fourspace}lock_release(&c);
<hr class="s1" />
16${fourspace}lock_release(&a);
<hr class="s1" />
17${fourspace}lock_release(&b);
<hr class="s1" />
18${fourspace}printf(“!”);
<hr class="s1" />
${twospace}}
<hr class="s2" />
${twospace}void func(void* lock_) {
<hr class="s1" />
19${fourspace}struct lock *lock = lock_;
<hr class="s2" />
20${fourspace}lock_acquire(&lock);
<hr class="s1" />
21${fourspace}lock_release(&lock);
<hr class="s2" />
22${fourspace}printf("%s", thread_current()->name);
<hr class="s2" />
23${fourspace}thread_exit();
<hr class="s1" />
${twospace}}
</code>
`;

const q4_3 =
`
<b>Problem 4c[2pts]</b>: Consider the above PintOS test that exercises your priority scheduler.   Assume
that no priority donation has been implemented.  What does it output to the terminal?   Is the output
affected by priorities in any way?  Explain.
`;

const q4_3_soln =
`
This code will output “162cab!”. This result is not affected by priorities (as long as all threads
running “func()” are higher priority than “main()”, since high-priority threads go to sleep
almost immediately after they start and are released in order by lines #15, #16, and #17.
`;

const q4_4 =
`
<b>Problem 4d[5pts]</b>: Next, assume that the code from (4c) is executed utilizing priority donation.
Fill in the following table to detail execution.  This table includes 7 columns as following:
<hr class="s2" />
1)  The current executing thread
<hr class="s1" />
2)  Which line this thread was executing when it yielded
<hr class="s1" />
3)  To which thread it yielded
<hr class="s1" />
4-7)  The priorities of each thread (N/A if a thread is not created or has exited)

<hr class="s2" />

<table>
<thead>
<tr><th><code>thread_current()</code></th><th>Line at which yielded</th><th>Thread which it yielded to</th><th>Main</th><th>a</th><th>b</th><th>c</th></tr></thead>
<tbody>
<tr><td>main</td><td>10</td><td>a</td><td>10</td><td>15</td><td>N/A</td><td>N/A</td></tr>
${_.repeat('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>', 10)}
</tbody>
</table>
`;

const q4_4_soln =
`
<table>
<thead>
<tr><th><code>thread_current()</code></th><th>Line at which yielded</th><th>Thread which it yielded to</th><th>Main</th><th>a</th><th>b</th><th>c</th></tr></thead>
<tbody>
<tr><td>main</td><td>10</td><td>a</td><td>10</td><td>15</td><td>N/A</td><td>N/A</td></tr>
<tr><td>a</td><td>20</td><td>main</td><td>15</td><td>15</td><td>N/A</td><td>N/A</td></tr>
<tr><td>a</td><td>12</td><td>b</td><td>15</td><td>15</td><td>20</td><td>N/A</td></tr>
<tr><td>a</td><td>20</td><td>main</td><td>20</td><td>15</td><td>20</td><td></td></tr>
<tr><td>a</td><td>14</td><td>c</td><td>20</td><td>15</td><td>20</td><td>25</td></tr>
<tr><td>a</td><td>20</td><td>main</td><td>25</td><td>15</td><td>20</td><td>25</td></tr>
<tr><td>a</td><td>15</td><td>c</td><td>20</td><td>15</td><td>20</td><td>25</td></tr>
<tr><td>a</td><td>23</td><td>main</td><td>20</td><td>15</td><td>20</td><td>N/A</td></tr>
<tr><td>a</td><td>17</td><td>b</td><td>10</td><td>15</td><td>20</td><td>N/A</td></tr>
<tr><td>a</td><td>23</td><td>a</td><td>10</td><td>15</td><td>N/A</td><td>N/A</td></tr>
<tr><td>a</td><td>23</td><td>main</td><td>10</td><td>N/A</td><td>N/A</td><td>N/A</td></tr>
</tbody>
</table>
`;

const q4_5 =
`
<b>Problem 4e[2pts]</b>: What is printed according to the order of execution in (4d)?  Is the output affected by priorities in any way?  Explain.
`;

const q4_5_soln =
`
What is printed is: “162cba!”.  Yes, the output is affected by priorities in that thread “b” gets
to acquire lock “b” before thread “a” acquires lock “a”. The ordering of letters happens in
priority order.
`;

const q4_6 =
`
<h3>Problem 4f[4pts]:</h3>
Suppose  that  we  have  the  following  resources:  A,  B,  C  and  threads  T1,  T2,  T3,  T4.    The  total
number of each resource is:

<hr class="s2" />
<table>
<thead>
<tr><th colspan="3">Total</th></tr>
<tr><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>12</td><td>9</th><td>12</td></tr>
</tbody>
</table>
<hr class="s2" />

Further,  assume  that  the  processes  have  the  following  maximum  requirements  and  current allocations:

<hr class="s2" />

<table>
<thead>
<tr><th rowspan="2">Thread ID</th><th colspan="3">Needed Allocation</th><th colspan="3">Maximum</th></tr>
<tr><th>A</th><th>B</th><th>C</th><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>T1</td><td>2</td><td>1</td><td>3</td><td>4</td><td>9</td><td>4</td></tr>
<tr><td>T2</td><td>1</td><td>2</td><td>3</td><td>5</td><td>3</td><td>3</td></tr>
<tr><td>T3</td><td>5</td><td>4</td><td>3</td><td>6</td><td>4</td><td>3</td></tr>
<tr><td>T4</td><td>2</td><td>1</td><td>2</td><td>4</td><td>8</td><td>2</td></tr>
</tbody>
</table>

<hr class="s2" />

Is the system in a safe state? If "yes", show a non-blocking sequence of thread executions. Otherwise, provide a proof that the system is unsafe. Show your work and justify each step of your answer.
`;

const q4_6_soln =
`
Answer: Yes, this system is in a safe state.
<hr class="s2" />
To prove this, we first compute the currently free allocations:
<hr class="s2" />
<table>
<thead>
<tr><th colspan="3">Available</th></tr>
<tr><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>2</td><td>1</td><td>1</td>
</tbody>
</table>
<hr class="s2" />
Further, we compute the number needed by each thread (Maximum – Current Allocation):
<hr class="s2" />
<table>
<thead>
<tr><th rowspan="2">Thread ID</th><th colspan="3">Needed Allocation</th></tr>
<tr><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>T1</td><td>2</td><td>8</td><td>1</td></tr>
<tr><td>T2</td><td>4</td><td>1</td><td>0</td></tr>
<tr><td>T3</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>T4</td><td>2</td><td>7</td><td>0</td></tr>
</tbody>
</table>
<hr class="s2" />
Thus, we can see that a possible sequence is: T3, T2, T4, T1:
<hr class="s2" />
<table>
<thead>
<tr><th rowspan="2">Thread ID</th><th colspan="3">Needed Allocation</th><th colspan="3">Current Allocation</th><th colspan="3">Available Before</th></tr>
<tr><th>A</th><th>B</th><th>C</th><th>A</th><th>B</th><th>C</th><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>T3</td><td>1</td><td>0</td><td>0</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>1</td></tr>
<tr><td>T2</td><td>4</td><td>1</td><td>0</td><td>1</td><td>2</td><td>3</td><td>7</td><td>5</td><td>4</td></tr>
<tr><td>T4</td><td>2</td><td>7</td><td>0</td><td>2</td><td>1</td><td>2</td><td>8</td><td>7</td><td>7</td></tr>
<tr><td>T1</td><td>2</td><td>8</td><td>1</td><td>2</td><td>1</td><td>3</td><td>10</td><td>8</td><td>9</td></tr>
</tbody>
</table>
`;

const q4_7 =
`
<h3>Problem 4g[3pts]:</h3>
Assume that we start with a system in the state of (4f). Suppose that T1 asks for 2 more copies of
resource A.  Can the system grant this if it wants to avoid deadlock? Explain.
`;

const q4_7_soln =
`
No. This cannot be granted. Assume that T1 gets 2 more of A.
<hr class="s1" />
Then, our available allocation is:
<hr class="s1" />
<table>
<thead>
<tr><th colspan="3">Available</th></tr>
<tr><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>1</td><td>1</td>
</tbody>
</table>
<hr class="s2" />
Then, looking at our needed allocations, we see:
<hr class="s2" />
<table>
<thead>
<tr><th rowspan="2">Thread ID</th><th colspan="3">Needed Allocation</th></tr>
<tr><th>A</th><th>B</th><th>C</th></tr>
</thead>
<tbody>
<tr><td>T1</td><td>0</td><td>8</td><td>1</td></tr>
<tr><td>T2</td><td>4</td><td>1</td><td>0</td></tr>
<tr><td>T3</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>T4</td><td>2</td><td>7</td><td>0</td></tr>
</tbody>
</table>
<hr class="s2" />
At this point, the available allocation is insufficient to start any of the threads, much less find a safe sequence that finishes all of them.
`;

const q4_8 =
`
<b>Problem 4h[2pts]</b>: Assume that a set of threads (${lx('T_1, T_2, \\dots T_n')}) contend for a set of non-
preemptable resources (${lx('R_1, R_2, \\dots R_m')}) that may or may not be unique. Name at least two techniques
to prevent this system from deadlocking:
`;

const q4_8_soln =
`
We discussed several possible ways of preventing deadlock in class.  Possibilities include:
<hr class="s1" />
${fourspace}1)  Pick a fixed order of allocation (say ${lx('R_1')} then ${lx('R_2')} then ... ${lx('R_m')}). All threads should allocate resources in this order.
<hr class="s1" />
${fourspace}2)  Every thread should indicate which resources they want at the beginning of execution.
Then, the thread is not allowed to start until after the requested resources are all
available.
<hr class="s1" />
${fourspace}3)  Use the Bankers algorithm on every allocation request to make sure that the system stays in a safe state.
`;

const imgq5_1 = require('../img/cs162fa15-5-1.png');
const q5_1 =
`
<h3>Problem 5: Address Translation [20 pts]</h3>

<b>Problem 5a[3pts]</b>: In class, we discussed the “magic” address format for a multi-level page table
on a 32-bit machine, namely one that divided the address as follows:
<hr class="s2" />
<table>
<tbody>
<tr><td>Virtual Page # (10 bits)</td><td>Virtual Page # (10 bits)</td><td>Offset (12 bits)</td></tr>
</tbody>
</table>
<hr class="s2" />
You can assume that Page Table Entries (PTEs) are 32-bits in size in the following format:
<img src=${imgq5_1} class="problem-image" />
What is particularly “magic” about this configuration?  Make sure that your answer involves the
size of the page table and explains why this configuration is helpful for an operating system
attempting to deal with limited physical memory.
`;

const q5_1_soln =
`
Each page is 4K in size (12-bit offset -> 2^12 bytes). Because the PTE is 4-bytes long and each
level of the page table has 1024 entries (i.e. 10-bit virtual page #), this means that each level of
the page table is 4K in size, i.e. exactly the same size as a page.  Thus the configuration is
“magic” because every level of the page table takes exactly one page.  This is helpful for an
operating system because it allows the OS to page out parts of the page table to disk.
`;

const q5_2 =
`
<b>Problem 5b[2pts]</b>: Modern processors nominally address 64-bits of address space both virtually
and physically (in reality they provide access to less, but ignore that for now).  Explain why the
page table entries (PTEs) given in (5a) would have to be expanded from 4 bytes and justify how big
they would it need to be.  Assume that pages are the same size and that the new PTE has similar
control bits to the version given in (5a).
`;

const q5_2_soln =
`
Since we are attempting to address 64-bits of physical DRAM and the page offset is 12-bits, this
leaves 52-bits of physical page # that will have to fit into the PTE.  The old PTE had only 20-
bits of space for  physical page #.  In fact, we need another 32-bits of offset -> PTE needs 52-bits
of offset + 12-bits of control bits (to be the same), yielding 64-bits of PTE, or 8-bytes.
`;

const q5_3 =
`
<b>Problem 5c[2pts]</b>: Assuming that we reserve 8-bytes for each PTE in the page table (whether or
not they need all 8 bytes), how would the virtual address be divided for a 64-bit address space?
Make sure that your resulting scheme has a similar “magic” property as in (5a) and that all levels of
the page table are the same size—with the exception of the top-level. How many levels of page
table would this imply?  Explain your answer!
`;

const q5_3_soln =
`
To have the same “magic” property, we would like each level of the page table to be the same
size as a page – so that the OS could page out individual parts of the page table.  Since a PTE is
8-bytes (3-bits in size), this means we need 12-3 = 9-bits of virtual page # at each level.  This
means that the virtual address needs to be divided into groupings of 9-bits (although the top
level be smaller, since we only have 64-bits):
<hr class="s2" />
[7-bits][9-bits][9-bits][9-bits][9-bits][9-bits][12-bits offset]
<hr class="s2" />
Thus, there are 6 levels of page table.
`;

const imgq5_4 = require('../img/cs162fa15-5-2.png');
const q5_4 =
`
Problem 5d[3pts]: Consider a multi-level memory management scheme using the following format
for <i>virtual addresses</i>, including 2 bits worth of segment ID and an 8-bit virtual page number:
<hr class="s2" />
<table>
<tbody><tr><td>Virtual seg # (2 bits)</td><td>Virtual Page # (8 bits)</td><td>Offset (8 bits)</td></tr></tbody>
</table>
<hr class="s2" />
Virtual addresses are translated into 16-bit <i>physical addresses</i> of the following form:
<hr class="s2" />
<table>
<tbody>
<tr><td>Physical Page # (8 bits)</td><td>Offset (8 bits)</td></tr>
</tbody>
</table>
<hr class="s2" />
Page table entries (PTE) are 16 bits in the following format, stored in <i>big-endian form</i> in memory
(i.e. the MSB is first byte in memory):
<img src=${imgq5_4} class="problem-image" />
How big is a page? Explain.
`;

const q5_4_soln =
`
A page is 2^8=256 bytes.
`;

const q5_5 =
`
What is the maximum amount of physical memory supported by this scheme? Explain.
`;

const q5_5_soln =
`
Physical addresses have 16-bits -> 2^16=65536 bytes (i.e. 64K bytes)
`;

const imgq5_6 = require('../img/cs162fa15-5.png');
const q5_6 =
`
<b>Problem  5e[10pts]</b>:  Using  the  scheme  from  (5d)  and  the  Segment  Table  and  Physical  Memory
table at this <a href="${imgq5_6}" target="_blank"><b>LINK</b></a>, state what will happen with the following loads and stores. Addresses below
are virtual, while base addresses in the segment table are physical. If you can translate the address,
make sure to place it in the "<b>Physical Address</b>" column; otherwise state "<b>N/A</b>".
<hr class="s1" />
The return value for a load is an 8-bit data value or an error, while the return value for a store is
either  "<b>ok</b>"  or  an  error.  If  there  is  an  error,  say  which  error.  Possibilities  are:  "<b>bad  segment</b>"
(invalid  segment),  "<b>segment  overflow</b>"  (address  outside  segment),  or  "<b>access  violation</b>"  (page
invalid/attempt to write a read only page).  A few answers are given:

<hr class="s2" />

<table>
<thead><tr><th>Instruction</th><th>Translated Physical Address</th><th>Result (return value)</th></tr></thead>
<tbody>
<tr><td>Load [0x30115]</td><td>0x3115</td><td>0x57</td></tr>
<tr><td>Store [0x10345]</td><td>0x3145</td><td>Access violation</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
</tbody>
</table>
`;

const q5_6_soln =
`
<table>
<thead><tr><th>Instruction</th><th>Translated Physical Address</th><th>Result (return value)</th></tr></thead>
<tbody>
<tr><td>Load [0x30115]</td><td>0x3115</td><td>0x57</td></tr>
<tr><td>Store [0x10345]</td><td>0x3145</td><td>Access violation</td></tr>
<tr><td>Store [0x30316]</td><td>0xF016</td><td>ok</td></tr>
<tr><td>Load [0x01202]</td><td>0xF002</td><td>0x22</td></tr>
<tr><td>Store [0x31231]</td><td>0xE031</td><td>Access violation</td></tr>
<tr><td>Store [0x21202]</td><td>N/A</td><td>Bad segment</td></tr>
<tr><td>Load [0x11213]</td><td>N/A</td><td>Segment overflow</td></tr>
<tr><td>Load [0x01515]</td><td>0x3015 or N/A</td><td>Access violation</td></tr>
</tbody>
</table>
`;

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS162Fa15 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs162/mt1-fa15';
    const problemIDs = ['q1', 'q2', 'q3', 'q4', 'q5'];
    const problemTitles = [
      'Q1. True/False',
      'Q2. Short Answer',
      'Q3. Boy-Girl Lock',
      'Q4. Scheduling and Deadlock',
      'Q5. Address Translation',
    ];

    return (
      <span>
        <h1>CS 162</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Fall 2015 | Kubiatowicz</h5>
        </div>
        <Sidebar examCode={examCode} problemIDs={problemIDs} problemTitles={problemTitles} />
        <div className="content">
          <Element name="q1">
            <div className="content-spacer" />
            <hr className="s5" />
            <h2>General Information</h2>
            <hr className="s2" />
            <p>This is a closed book exam. You are allowed 1 page of hand-written notes (both sides). You have 3 hours to complete as much of the exam as possible. Make sure to read all of the questions first, as some of the questions are substantially more time consuming.</p>
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
            <hr className="s5" />
            <Question id={"q2-4"} content={q2_4} solution={q2_4_soln} />
            <hr className="s5" />
            <Question id={"q2-5"} content={q2_5} solution={q2_5_soln} />
            <hr className="s5" />
            <Question id={"q2-6"} content={q2_6} solution={q2_6_soln} />
            <hr className="s5" />
            <Question id={"q2-7"} content={q2_7} solution={q2_7_soln} />
            <hr className="s5" />
            <Question id={"q2-8"} content={q2_8} solution={q2_8_soln} />
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
          </Element>
          <Element name="q4">
            <hr className="s5" />
            <Question id={"q4-1"} content={q4_1} solution={q4_1_soln} />
            <hr className="s5" />
            <Question id={"q4-2"} content={q4_2} solution={q4_2_soln} />
            <hr className="s5" />
            <Question id={"q4-3"} content={q4_3} solution={q4_3_soln} />
            <hr className="s5" />
            <Question id={"q4-4"} content={q4_4} solution={q4_4_soln} />
            <hr className="s5" />
            <Question id={"q4-5"} content={q4_5} solution={q4_5_soln} />
            <hr className="s5" />
            <Question id={"q4-6"} content={q4_6} solution={q4_6_soln} />
            <hr className="s5" />
            <Question id={"q4-7"} content={q4_7} solution={q4_7_soln} />
            <hr className="s5" />
            <Question id={"q4-8"} content={q4_8} solution={q4_8_soln} />
          </Element>
          <Element name="q5">
            <hr className="s5" />
            <Question id={"q5-1"} content={q5_1} solution={q5_1_soln} />
            <hr className="s5" />
            <Question id={"q5-2"} content={q5_2} solution={q5_2_soln} />
            <hr className="s5" />
            <Question id={"q5-3"} content={q5_3} solution={q5_3_soln} />
            <hr className="s5" />
            <Question id={"q5-4"} content={q5_4} solution={q5_4_soln} />
            <hr className="s5" />
            <Question id={"q5-5"} content={q5_5} solution={q5_5_soln} />
            <hr className="s5" />
            <Question id={"q5-6"} content={q5_6} solution={q5_6_soln} />
          </Element>
        </div>
      </span>
    );
  }
}

export default CS162Fa15;
