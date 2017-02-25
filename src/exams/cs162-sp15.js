import React, { Component } from 'react';
import { Question } from '../components/question';
import { Sidebar } from '../components';
import { lx, longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, eightspace } from '../utils';

// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.
// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.
// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.
// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.
// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.
// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.
// Kevin is transcribing this one very very slowly. Please do not touch for fear
// of merge conflicts! Thanks.

const _ = require('lodash');

const q1_1 =
`
<h3>Problem 1: TRUE/FALSE [18 pts]</h3>
In the following, it is important that you EXPLAIN your answer in TWO SENTENCES OR LESS
(Answers longer than this may not get credit!). Also, answers without an explanation GET NO
CREDIT.
<hr class="s5" />
<b>Problem 1a[2pts]:</b> The kernel on a multiprocessor can use the local disabling of interrupts (within
one CPU) to produce critical sections between the OSs on different CPUs.
`;

const q1_1_soln =
`
<b>False.</b>
<hr class="s1" />
Disabling of interrupts on one CPU does nothing to prevent the execution
of code running on another CPU.
`;

const q1_2 =
`
<b>Problem 1b[2pts]:</b> Simultaneous Multithreading is a hardware mechanism that can switch threads
every cycle. 
`;

const q1_2_soln =
`
<b>True.</b>
<hr class="s1" />
Simultaneous Multithreading switches between threads that are loaded
into the processor and can switch every cycle – in fact, it can even combine instructions
from multiple threads in the same cycle.
`;

const q1_3 =
`
<b>Problem 1c[2pts]:</b> In a multi-process HTTP server (like in HW#2), only the child process is
responsible for closing the client socket (e.g. the file descriptor returned by <code>accept()</code>), since the
parent doesn’t know when the child is done using the socket. 
`;

const q1_3_soln =
`
<b>False.</b>
<hr class="s1" />
The <code>fork()</code> system call duplicates the client socket in both the parent
and child. Consequently, both of them must close their copy of the socket; in fact, the parent
typically closes the client socket immediately after executing the <code>fork()</code> operation.
`;

const q1_4 =
`
<b>Problem 1d[2pts]:</b> A user-level library implements each system call by first executing a “transition
to kernel mode” instruction. The library routine then calls an appropriate subroutine in the kernel.  
`;

const q1_4_soln =
`
<b>False.</b>
<hr class="s1" />
Such a mechanism (transition to kernel mode) would give too much
control to user-level code. Instead, entry into the kernel is carefully controlled through a
system call mechanism that simultaneously transitions into kernel mode while jumping to a
well-defined entry point in the kernel.
`;

const q1_5 =
`
<b>Problem 1e[2pts]:</b> A thread can be blocked on multiple condition variables simultaneously.  
`;

const q1_5_soln =
`
<b>False.</b>
<hr class="s1" />
After the thread calls wait() on the first condition (i.e. while it is still
blocked on the first condition variable), it couldn’t have called the second one yet and
cannot be blocked on the second one.
`;

const q1_6 =
`
<b>Problem 1f[2pts]:</b> Floating point numbers are not used in Pintos because floating point operations
are too slow and have rounding issues.
`;

const q1_6_soln =
`
<b>False.</b>
<hr class="s1" />
Floating point numbers are not used in Pintos simply because floating
point registers are not saved/restored during thread switches
`;

const q1_7 =
`
<b>Problem 1g[2pts]:</b> In Pintos, implementing priority scheduling for semaphores will also take care
of priority scheduling for locks and condition variables. This is because locks and condition
variables are implemented using semaphores.
`;

const q1_7_soln =
`
<b>False.</b>
<hr class="s1" />
Since locks and condition variables use queues of semaphores to hold
blocked threads, priority scheduling within semaphores does not provide priority scheduling to
locks or condition variables.
`;

const q1_8 =
`
<b>Problem 1h[2pts]:</b> The only way to resolve a resource deadlock is to reboot the system
`;

const q1_8_soln =
`
<b>False.</b>
<hr class="s1" />
Resource deadlocks can be resolved in other ways such as transactional
abort (/unrolling transactions).
`;

const q1_9 =
`
<b>Problem 1i[2pts]:</b> Calls to <code>printf()</code> always enter the kernel to perform an output to <code>stdout</code>.
`;

const q1_9_soln =
`
<b>False.</b>
<hr class="s1" />
<code>printf()</code> is a stream operation that buffers its output inside the user level
. Consequently, many calls to <code>printf()</code> exit without ever entering the kernel
`;

const q2_1 =
`
<h3>Problem 2: Short Answer [18pts]</h3>
<b>Problem 2a[3pts]:</b> Name at least two disadvantages of disabling interrupts to serialize access to a
critical section. When does it make sense to use interrupt disable/enable around a critical section? 
`;

const q2_1_soln =
`
Some possible answers include:
<hr class="s2" />
1) Does not work at user-level (i.e. user-level code cannot disable interrupts).
<hr class="s1" />
2) Locks out other hardware interrupts and may cause critical events to be missed.
<hr class="s1" />
3) Is a very coarse-grained method of serializing – there ends up being only one such lock for
the whole machine.
<hr class="s3" />
It makes sense to disable interrupts at the core of the kernel when either the critical section is
very short or when the arrival of interrupts would actually cause incorrect behavior (such as
during context switching or during the entry/exit of interrupt handlers).
`;

const q2_2 =
`
<b>Problem 2b[2pts]:</b> What is the difference between Mesa and Hoare scheduling for monitors? How
does this affect the programming pattern used by programmers (be explicit)? 
`;

const q2_2_soln =
`
With Hoare scheduling, a <code>signal()</code> operation from one thread immediately wakes up a
sleeping thread, hands the lock to the sleeping thread, and starts the sleeping thread executing;
control returns to the signaling thread after the signaled thread attempts to release the lock
(which is then handed back to the signaling thread). With Mesa scheduling, the signaling thread
simply placed the signaled thread on the run queue and continues executing with the lock.
The practical consequence is that Mesa-scheduled monitors require programmers to recheck
conditions after waking (typically with a “while” loop):
<hr class="s2" />
<code>
while (condition not satisfied)
<hr class="s1" />
${fourspace}condition.wait();
</code>
<hr class="s2" />
With Hoare-scheduled monitors, the “while” statement can often be replaced with an “if”
statement.
`;

const q2_3 =
`
<b>Problem 2c[2pts]:</b> What needs to be saved and restored on a context switch between two threads in
the same process? What if we have two different processes?
`;

const q2_3_soln =
`
The registers (integer and floating-point), program counter, condition registers, and any other
execution state for a thread must be saved and restored between context switches. If we are
switching between two different processes, we must additionally save and restore the page table
root pointer and/or segment registers.
`;

const q2_4 =
`
<b>Problem 2d[3pts]:</b> Name three ways in which the processor can transition from user mode to
kernel mode. Can the user execute arbitrary code after the transition? 
`;

const q2_4_soln =
`
The processor transitions from user mode to kernel mode when (1) the user executes a system
call, (2) the processor encounters an synchronous exception such as divide by zero or page
fault, (3) the processor responds to an interrupt. The user cannot execute arbitrary code
because entry into the kernel is through controlled entry points (not under control of the user).
`;

const q2_5 =
`
<b>Problem 2e[2pts]:</b> What is the difference between fork() and exec() on Unix? 
`;

const q2_5_soln =
`
The fork() system call creates a new child process whose address space duplicates that of the
parent. In contrast, the exec() system call throws away the contents of a process’ address space
and replaces it by loading an executable (new program) from the filesystem. 
`;

const q2_6 =
`
<b>Problem 2f[2pts]:</b> List two reasons why overuse of threads is bad (i.e. using too many threads for
different tasks). Be explicit in your answers. 
`;

const q2_6_soln =
`
There are a number of reasons that overuse of threads is bad. Some of them include:
<hr class="s1" />
1) The overhead of switching between too many threads can waste processor cycles such that
overhead outweighs actual computation (i.e. thrashing).
<hr class="s1" />
2) Excessive threading can waste memory for stacks and TCBs
<hr class="s1" />
3) The overhead of splitting tasks into threads (the launching/exit process) may not be offset by
the resulting gain in performance from parallelism. 
`;

const q2_7 =
`
<b>Problem 2g[2pts]:</b> What is the default scheduler in PintOS? 
`;

const q2_7_soln =
`
The default scheduler in PintOS round-robin (with quantum = 4).
`;

const q2_8 =
`
<b>Problem 2h[2pts]:</b> In PintOS, the code for thread_unblock() contains a comment that says
“This function does not preempt the running thread”. Explain why you should not modify
thread_unblock() in a way that could cause it to preempt the running thread
`;

const q2_8_soln =
`
Many functions call thread_unblock with the assumption that it can do so and update other data
structures atomically. Specifically, sema_up and potentially whatever wakes up sleeping
threads
`;

const imgq3_1 = require('../img/cs162sp15-3-1.png');
const q3_1 =
`
<h3>Problem 3: Atomic Synchronization Primitives [24pts] </h3>
In class, we discussed a number of atomic hardware primitives that are available on modern
architectures. In particular, we discussed “test and set” (TSET), SWAP, and “compare and swap”
(CAS). They can be defined as follows (let “expr” be an expression, “&addr” be an address of a
memory location, and “M[addr]” be the actual memory location at address addr): 
<hr class="s1" />
<img src=${imgq3_1} class="problem-image" />
<hr class="s1" />
Both TSET and SWAP return values (from memory), whereas CAS returns either true or false.
Note that our &addr notation is similar to a reference in c++, and means that the &addr argument
must be something that can be stored into (an “lvalue”). For instance, TSET could be used to
implement a spin-lock acquire as follows:
<hr class="s2" />
<code>
int lock = 0; // lock is free
<hr class="s2" />
// Later: acquire lock
<hr class="s1" />
while (TSET(lock)); 
</code>
<hr class="s2" />
CAS is general enough as an atomic operation that it can be used to implement both TSET and
SWAP. For instance, consider the following implementation of TSET with CAS: 
<hr class="s2" />
<code>
TSET(&addr) {
<hr class="s1" />
${fourspace}int temp;
<hr class="s1" />
${fourspace}do {
  <hr class="s1" />
${eightspace}temp = M[addr];
<hr class="s1" />
${fourspace}} while (!CAS(addr,temp,1));
<hr class="s1" />
${fourspace}return temp;
<hr class="s1" />
} 
</code>
<hr class="s5" />
<b>Problem 3a[3pts]:</b>
<hr class="s1" />
Show how to implement a spinlock acquire with a single while loop using CAS instead of TSET.
You must only fill in the arguments to CAS below:
<hr class="s2" />
<code>
// Initialization
<hr class="s1" />
int lock = 0; // Lock is free
<hr class="s2" />
// acquire lock
<hr class="s1" />
while ( !CAS( ___ , ___ , ___ ) );
</code>
`;

const q3_1_soln =
`
<code>
// Initialization
<hr class="s1" />
int lock = 0; // Lock is free
<hr class="s2" />
// acquire lock
<hr class="s1" />
while ( !CAS( lock , 0 , 1 ) );
</code>
`;

const q3_2 =
`
<b>Problem 3b[2pts]:</b>
<hr class="s1" />
Show how SWAP can be implemented using CAS. Don’t forget the return value.
<code>
SWAP(&addr, reg1) {
<hr class="s5" />
}
</code>
`;

const q3_2_soln =
`
<code>
SWAP(&addr, reg1) {
<hr class="s1" />
${fourspace}Object returnvalue;
<hr class="s1" />
${fourspace}do {
<hr class="s1" />
${eightspace}return = M[addr];
<hr class="s1" />
${fourspace}} while (!CAS(addr, returnvalue, reg1));
<hr class="s1" />
${fourspace}Return returnvalue;
<hr class="s1" />
}
</code>
`;

const q3_3 =
`
<b>Problem 3c[2pts]:</b>
<hr class="s1" />
With spinlocks, threads spin in a loop (busy waiting) until the lock is freed. In class we argued that
spinlocks were a bad idea because they can waste a lot of processor cycles. The alternative is to put
a waiting process to sleep while it is waiting for the lock (using a blocking lock). Contrary to what
we implied in class, there are cases in which spinlocks would be more efficient than blocking locks.
Give a circumstance in which this is true and explain why a spinlock is more efficient. 
`;

const q3_3_soln =
`
If the expected wait time of the lock is very short (such as because the lock is rarely contested or the
critical sections are very short), then it is possible that a spin lock will waste many fewer cycles than
putting threads to sleep/waking them up. The important issue is that the expected wait time must be less
than the time to put a thread to sleep and wake it up.
<hr class="s1" />
Short expected wait times are possible to capitalize on, for instance, in a multiprocessor because waiting
threads can be stalled on other processors while the lock-holder makes progress. Spin-locks are much
less useful in a uniprocessor because the lock-holder is sleeping while the waiter is spinning.
<hr class="s1" />
Some people mentioned I/O. However, you would have had to come up with a specific example of locks
in use between a thread and an I/O operation as well as mentioned interrupts for releasing the lock.
<hr class="s1" />
We were looking for mention of (1) expected wait time being important, (2) the length of time for putting
locks to sleep relative to the expected wait time of the lock, (3) a viable scenario such as a
multiprocessor
`;

const q3_4 =
`
An object such as a queue is considered “lock-free” if multiple processes can operate on this object
simultaneously without requiring the use of locks, busy-waiting, or sleeping. In this problem, we
are going to construct a lock-free FIFO queue using the atomic CAS operation. This queue needs
both an Enqueue and Dequeue method.
<hr class="s1" />
We are going to do this in a slightly different way than normally. Rather than Head and Tail
pointers, we are going to have “PrevHead” and Tail pointers. PrevHead will point at the last
object returned from the queue. Thus, we can find the head of the queue (for dequeuing). If we
don’t have to worry about simultaneous Enqueue or Dequeue operations, the code is
straightforward:
<hr class="s2" />
<code>
// Holding cell for an entry
<hr class="s1" />
class QueueEntry {
<hr class="s1" />
${fourspace}QueueEntry next = null;
<hr class="s1" />
${fourspace}Object stored;
<hr class="s1" />
${fourspace}QueueEntry(Object newobject) {
  <hr class="s1" />
${eightspace}stored = newobject;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
<hr class="s1" />
// The actual Queue (not yet lock free!)
<hr class="s1" />
class Queue {
<hr class="s1" />
${fourspace}QueueEntry prevHead = new QueueEntry(null);
<hr class="s1" />
${fourspace}QueueEntry tail = prevHead;
<hr class="s1" />
${fourspace}void Enqueue(Object newobject) {
<hr class="s1" />
${eightspace}QueueEntry newEntry = new QueueEntry(newobject);
<hr class="s1" />
${eightspace}QueneEntry oldtail = tail;
<hr class="s1" />
${eightspace}tail = newEntry;
<hr class="s1" />
${eightspace}oldtail.next = newEntry;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
${fourspace}Object Dequeue() {
<hr class="s1" />
${eightspace}QueueEntry oldprevHead = prevHead;
<hr class="s1" />
${eightspace}QueueEntry nextEntry = oldprevHead.next;
<hr class="s1" />
${eightspace}if (nextEntry == null)
<hr class="s1" />
${eightspace}${fourspace}return null;
<hr class="s1" />
${eightspace}prevHead = nextEntry;
<hr class="s1" />
${eightspace}return nextEntry.stored;
<hr class="s1" />
${fourspace}}
<hr class="s1" />
}
</code>
<hr class="s2" />
<b>Problem 3d[3pts]:</b>
<hr class="s1" />
For this non-multithreaded code, draw the state of a queue with 2 queued items on it: 
`

const imgq3_4 = require('../img/cs162sp15-3-5.png');
const q3_4_soln = 
`
<img src=${imgq3_4} class="problem-image" />
`

const imgq3_5 = require('../img/cs162sp15-3-6.png');
const q3_5 =
`
<b>Problem 3e[3pts]:</b>
<hr class="s1" />
For each of the following potential context switch points, state whether or not a
context switch at that point could cause incorrect behavior of Enqueue(); Explain! 
<img src=${imgq3_5} class="problem-image" />
`

const q3_5_soln =
`
<b>Point 1:</b> No. Construction of a QueueEntry is a purely local operation (and does not touch shared state in
any way).
<hr class="s2" />
<b>Point 2:</b> Yes. An intervening Enqueue() operation will move the shared variable “tail” (and enqueue
another object). As a result, the subsequent “tail=newEntry” will overwrite the other entry.
<hr class="s2" />
<b>Point 3:</b> No. At this point in the execution, only the local thread will ever touch “oldtail.next” (since we have moved the tail). Thus, we can reconnect at will. People who worried that the linked list is
“broken” until this operation can relax. The worse that will happen is that the list appears to be
shorter than it actually is until execution of “oldtail.next=newEntry,” at which point the new entry
becomes available for subsequent dequeue.
`

const q3_6 = 
`
<b>Problem 3f[4pts]:</b> Rewrite code for Enqueue(), using the CAS() operation, such that it will work
for any number of simultaneous Enqueue and Dequeue operations. You should never need to busy
wait. <b>Do not use locking (i.e. don’t use a test-and-set lock).</b> The solution is tricky but can be
done in a few lines. We will be grading on conciseness. Do not use more than one CAS() or more
than 10 lines total (including the function declaration at the beginning). Hint: wrap a do-while
around vulnerable parts of the code identified above.
<hr class="s1" />
<code>
void Enqueue(Object newobject) {
<hr class="s1" />
${fourspace}QueueEntry newEntry = new QueueEntry(newobject);
<hr class="s1" />
${fourspace}// Insert code here
<hr class="s1" />
} 
</code>
`

const q3_6_soln =
`
<code>
void Enqueue(Object newobject) {
<hr class="s1" />
${fourspace}QueueEntry newEntry = new QueueEntry(newobject);
<hr class="s1" />
${fourspace}// Insert code here
<hr class="s1" />
${fourspace}// Here, ‘tail’ is the shared variable that needs to be
<hr class="s1" />
${fourspace}// protected by CAS. We must atomically swap in ‘newEntry’
<hr class="s1" />
${fourspace}// to ‘tail’, giving us the old value so that we can link
<hr class="s1" />
${fourspace}// it to the new item.
<hr class="s1" />
${fourspace}QueueEntry oldtail;
<hr class="s1" />
${fourspace}do {
<hr class="s1" />
${eightspace}oldtail = tail; // Tentative pointer to tail
<hr class="s1" />
${fourspace}} while {!CAS(tail,oldtail,newEntry);}
<hr class="s1" />
${fourspace}oldtail.net = newEntry;
<hr class="s1" />
}  
 </code>
`

const imgq3_7 = require('../img/cs162sp15-3-7.png');
const q3_7 = 
`
<b>Problem 3g[3pts]:</b> For each of the following potential context switch points, state whether or not a
context switch at that point could cause incorrect behavior of Dequeue(); Explain! (Note: Assume
that the queue is not empty when answering this question, since we have removed the null-queue
check from the original code):
<img src=${imgq3_7} class="problem-image" />
`

const q3_7_soln =
`
<b>Point 1:</b> Yes. The problem is that an intervening Dequeue() could end up getting the same entry ‘nextEntry’
that we are returning; consequently we end up dequeing the same entry multiple times.
<hr class="s1" />
<b>Point 2:</b> Yes. The problem is that an intervening Dequeue() could end up getting the same entry ‘nextEntry’
that we are returning; consequently we end up dequeing the same entry multiple times.
<hr class="s1" />
<b>Point 3:</b> No. The nextEntry has already been detached from the queue and is purely local. Thus, all that we
are doing is removing the stored value from nextEntry for returning it. 
`

const q3_8 =
`
<b>Problem 3h[4pts]:</b> Rewrite code for Dequeue(), using the CAS() operation, such that it will work
for any number of simultaneous Enqueue and Dequeue operations. You should never need to busy
wait. <b>Do not use locking (i.e. don’t use a test-and-set lock).</b> The solution can be done in a few
lines. We will be grading on conciseness. Do not use more than one CAS() or more than 10 lines
total (including the function declaration at the beginning). You should correctly handle an empty
queue by returning “null”.
<hr class="s1" />
<i>Hint: wrap a do-while around vulnerable parts of the code identified
above and add back the null-check from the original code.</i>
<hr class="s1" />
<code>
Object Dequeue() {
<hr class="s1" />
${fourspace}// Insert code here 
<hr class="s1" />
}
</code>
`

const q3_8_soln =
`
<code>
Object Dequeue() {
<hr class="s1" />
${fourspace}// Here, ‘prevHead’ is the shared variable that needs to be
<hr class="s1" />
${fourspace}// protected by CAS. We must atomically grab the value of
<hr class="s1" />
${fourspace}// prevHead.next and swap it into prevHead. The CAS lets
<hr class="s1" />
${fourspace}// us do this operation by making sure that prevHead is
<hr class="s1" />
${fourspace}// still equal to oldprevHead at the time that we swap
<hr class="s1" />
${fourspace}// in prevHead.next. Note that we have included a check to
<hr class="s1" />
${fourspace}// handle empty queues (not required for your solution)
<hr class="s1" />
${fourspace}QueueEntry oldprevHead, nextEntry;
<hr class="s1" />
${fourspace}do {
<hr class="s1" />
${eightspace}oldprevHead = prevHead;
<hr class="s1" />
${eightspace}nextEntry = oldprevHead.next;
<hr class="s1" />
${eightspace}if (nextEntry == null) // handle empty queue
<hr class="s1" />
${eightspace}${fourspace}return null;
<hr class="s1" />
${fourspace}} while (!CAS(prevHead, oldprevHead, nextEntry));
<hr class="s1" />
${fourspace}return oldprevHead.stored;
<hr class="s1" />
}
</code>
`

const q4_1 = 
`
<h3>Problem 4: Scheduling and Deadlock [20 pts]</h3>
<b>Problem 4a[2pts]:</b> How could a priority scheduler be used to emulate Earliest Deadline First
(EDF) scheduling? Would computing of priorities be an expensive operation (assume that we
schedule periodic tasks characterized by period T and computational time of C)? Explain.
`

const q4_1_soln =
`
Current tasks must be sorted by deadline (i.e. “earliest deadline first”), then priorities assigned
to these tasks in order of deadline, with a unique priority for each task and highest priority to
the earliest deadline. This process of sorting and priority assignment must happen every time a
new instance of a realtime task arrives (i.e. every T time units for every task’s value of T).
Priorities do not have to be changed when a task finishes
`

const q4_2 = 
`
<b>Problem 4b[2pts]:</b> What is a multi-level feedback scheduler and how can it approximate SRTF? 
`

const q4_2_soln =
`
A multi-level feedback scheduler is one that includes multiple queues sorted in a priority order.
Each queue (except for the highest-priority queue) is fed from the immediate queue of the next
highest priority. New tasks are placed into the highest-priority queue. In addition to scheduling
queues by priority, each queue can have its own scheduling policy or variation of a scheduling
policy (such as round robin with different quantum). When an thread computes for too long
(i.e. its quantum runs out), it is placed on the next lower-priority queue. When a thread
finishes, it either moves up to the next higher-priority queue or into the top-level queue. This
approximates SRTF because long-running tasks tend to get lower priority (and short-running
tasks get higher priority).
`

const q4_3 = 
`
<b>Problem 4c[3pts]:</b> What is priority donation? What sort of information must the OS track to allow
it to perform priority donation? Is priority donation targeted at preventing a deadlock or a
livelock? 
`

const q4_3_soln =
`
Priority donation is a process by which a thread blocked on a synchronization construct (e.g. a
lock) “donates” its priority to the holder of that synchronization construct (in order to make
sure that there is no priority inversion, i.e that the blocking thread does not end up waiting for a
thread of lower priority – which might itself be blocked). The OS must keep track of which
threads are currently holding locks and which others are waiting on locks (of course it must
already do the latter). Priority donation is targeted at preventing a livelock, since there is not
necessarily a cyclic dependency
`

const q4_4 = 
`
<b>Problem 4d[3pts]:</b> Suppose that you utilize a scheme that schedules threads within a process at
user level. Why might a naïve scheduling scheme run into problems when accessing I/O? Can the
operating system help resolve this problem? Explain 
`

const q4_4_soln =
`
Because a naïve scheme would utilize one “kernel” thread for all of the user-level threads.
Then, if any of the threads were to do a system call that blocked on I/O, all other threads would
be blocked as well. One way for the operating system to help would be to return a new kernel
thread to the process for every thread that is put to sleep in the kernel. This idea is typically
called “scheduler activations.” As a result, even if a thread blocks in the kernel, the process
will always retain a running thread which it can be utilized to scheduler user-level thread
`

const q4_5 = 
`
Pwnage Games, a fairly unknown arcade in Downtown Berkeley, decided to purchase Super Smash
Bros. for Wii U -- a popular fighting video game -- in the hope that it would draw customers to the
business. However, due to limited resources, the store could only buy one copy of the game.
Luckily, the owners know Gill Bates -- a Cal EECS undergrad -- who offers her help in exchange
for free arcade credits. Her job is to allow multiple consoles to play the game at the same time.
Thanks to her hacking skills, Gill completes the task in no time, but she is forced to impose some
conditions on the gameplay:
<hr class="s2" />
 - each console only allows for two players to fight at a time;
 <hr class="s1" />
 - the same character cannot be used by more than one player at a time.
 <hr class="s1" />
The enforcement of these conditions is handled after character selection. That is, all fighters appear
available at all times, and the following function loads the fight. Each character has a global
fighter_t* representing it across consoles.
<hr class="s2" />
<code>
void smash (fighter_t* first, fighter_t* second)
<hr class="s1" />
{
<hr class="s1" />
${fourspace}pthread_mutex_lock (&first->lock);
<hr class="s1" />
${fourspace}pthread_mutex_lock (&second->lock);
<hr class="s1" />
${fourspace}fight (first, second);
<hr class="s1" />
${fourspace}pthread_mutex_unlock (&second->lock);
<hr class="s1" />
${fourspace}pthread_mutex_unlock (&first->lock);
<hr class="s1" />
}
</code>
<hr class="s5" />
<b>Problem 4e[4pts]:</b> Despite Gill’s effort, her algorithm has an obvious flaw: it can lead to deadlock!
Present an example of how this can happen. List the four conditions for deadlock and show how
they are satisfied by this example: 
`

const q4_5_soln =
`
Simple case: two consoles request the same two players, but in reverse order. In this case, the
“first” and “second” arguments to <code>smash()</code> at each console are reversed. Consequently, first
console (Console #1) locks Player A and is waiting for Player B while the second console
(Console #2) locks Player B and is waiting for Player A. This is a cycle that will never resolve.
<hr class="s2" />
1) Mutual Exclusion: Each player can be owned by only one console at a time.
<hr class="s1" />
2) Hold and Wait: The <code>smash()</code> function for console #1 in this example is holding one
resource (player A) while it is waiting for another resource (player B). A similar argument
applies to the <code>smash()</code> function for console #2 (with resources in reverse order).
<hr class="s1" />
3) No Premption: Resources are only released by the owner (never preempted).
<hr class="s1" />
4) Circular wait: We have a circular wait since Console #1 (${lx('T_1')}) is waiting for Console #2 (${lx('T_2')}) which is waiting for Console #1 (${lx('T_1')}). 
`

const q4_6 = 
`
<b>Problem 4f[3pts]:</b> Redesign the <code>smash()</code> function to avoid deadlock. Write your new version in
the space below. Which of the four conditions are now missing? Name one downside of your
approach.
`

const q4_6_soln =
`
We can fix this problem by introducing a global lock that is acquired before any players are
acquired:
<hr class="s2" />
<code>
void smash (fighter_t* first, fighter_t* second)
<hr class="s1" />
{
<hr class="s1" />
${fourspace}pthread_mutex_lock (&global_lock);
<hr class="s1" />
${fourspace}pthread_mutex_lock (&first->lock);
<hr class="s1" />
${fourspace}pthread_mutex_lock (&second->lock);
<hr class="s1" />
${fourspace}pthread_mutex_unlock (&global_lock);
<hr class="s1" />
${fourspace}fight (first, second);
<hr class="s1" />
${fourspace}pthread_mutex_unlock (&second->lock);
<hr class="s1" />
${fourspace}pthread_mutex_unlock (&first->lock);
<hr class="s1" />
}
</code>
<hr class="s2" />
This prevents deadlock by removing the circular wait condition: threads only wait for either (1)
the global lock, which means that they are waiting on some thread trying to acquire its players
or (2) the one thread that has acquired the global lock may be waiting to acquire one of its
players which can only be owned by a console that is fighting (and which will eventually release
this player). Consequently, the wait graph is a tree.
<hr class="s1" />
Note that a downside of this “fix” is that it could delay unrelated fights from occurring. For
instance, if one console is playing with Player A and B, a second one is waiting for Player A,
then subsequent consoles are unable to play – even if they are interested in Players C and D
(for instance). One could release the global lock after the last unlock (at the end of the <code>smash()</code>
function), but this would introduce additional waiting.
<hr class="s1" />
Note: solutions involving busywaiting (such as use of <code>trylock()</code>) were not given full credit.
`

const q4_7 = 
`
<b>Problem 4g[3pts]:</b> Explain how the Banker’s algorithm could prevent the deadlock identified in
Problem (4e) and what changes would need to be made to the code to support it. Clearly identify
the behavior that would result, and why the four conditions for deadlock are not simultaneously
satisfied. Would this solution be better or worse than your solution to Problem (4f)? 
`

const q4_7_soln =
`
The bankers algorithm would prevent deadlock because it would never grant either Player A to
Console #1 or Player B to Console #2 if it would result in deadlock. The changes to the code
from (4e) would involve (1) declaring which players a thread was interested in before trying to
acquire them (i.e. at the beginning of <code>smash()</code> ) , changing the mutex_lock code to keep track
of all acquired resources and to perform the Banker’s algorithm before every grant operation
and put a requesting thread to sleep if any proposed acquisition would introduce deadlock. As
already stated, this type of tracking would prevent cycles from forming by preventing the
acquisition of any resource that would form a cycle. This solution would be better than the
solution in (4f), since it would never interfere with acquisition of unrelated players.
`

const imgq5_1 = require('../img/cs162sp15-5-1.png');
const q5_1 = 
`
Consider a multi-level memory management scheme with the following format for virtual
addresses: 
<hr class="s2" />
<table>
  <tbody>
    <tr>
      <td>Virtual Page #<hr class="s1" />(10 bits)</td>
      <td>Virtual Page #<hr class="s1" />(10 bits)</td>
      <td>Offset #<hr class="s1" />(12 bits)</td>
    </tr>
  </tbody>
</table>
<hr class="s2" />
Virtual addresses are translated into physical addresses of the following form:
<hr class="s2" />
<table>
  <tbody>
    <tr>
      <td>Physical Page #<hr class="s1" />(20 bits)</td>
      <td>Virtual Page #<hr class="s1" />(10 bits)</td>
    </tr>
  </tbody>
</table>
<hr class="s2" />
Page table entries (PTE) are 32 bits in the following format, <b>stored in big-endian form</b> in memory
(i.e. the MSB is first byte in memory):
<img src=${imgq5_1} class="problem-image" />
Here, “Valid” means that a translation is valid, “Writeable” means that the page is writeable, “User”
means that the page is accessible by the User (rather than only by the Kernel). Note: the phrase
“page table” in the following questions means the multi-level data structure that maps virtual
addresses to physical addresses.
<hr class="s5" />
<b>Problem 5a[2pts]:</b> How big is a page? Explain.
`

const q5_1_soln =
`
Pages are 4K in size, since the offset is 12 bits (${lx('2^{12} = 4096')}).
`

const q5_2 = 
`
Draw a picture of the page table. What good property(s) result from dividing
the address into three fields in this way (i.e. 32 bits = 10bits + 10bits + 12bits)?
`

const imgq5_2 = require('../img/cs162sp15-5-2.png');
const q5_2_soln =
`
<img src=${imgq5_2} class="problem-image" />
One really nice property resulting from this division (and the size of the PTE) is that every piece of
the page-table is the same size as the pages; consequently, the OS could “page out the page table”
`

const q5_3 = 
`
<b>Problem 5c[2pts]:</b> Suppose that we want an address space with one physical page at the top of the
address space and one physical page at the bottom of the address space. How big would the page
table be (in bytes)? Explain. 
`

const q5_3_soln = 
`
To address a physical page at the top and bottom of the address space, we would need at least 3
page table components (the top-level one, and two second-level page table entries). Thus, the
page table would be 3 × 4096 = 12288 bytes.
`

const q5_4 = 
`
<b>Problem 5d[2pts]:</b> What is the maximum amount of physical memory that can be addressed by this
page table. Explain. 
`

const q5_4_soln = 
`
This page table scheme can address all of physical memory, which is ${lx('2^{32} = 4294967296')} bytes.
For those of you who thought we were talking about the particular page table organization in
(5c), we would also accept an answer of 2 pages = 8192 bytes.
`

const imgq5_5 = require('../img/physical-memory-sp15.png');
const q5_5 = 
`
<b>Problem 5e[10pts]:</b> Assume the memory translation scheme from (5a). Use the Physical Memory
table given at this <b><a href=${imgq5_5} target="_blank">LINK</a></b> to predict what will happen with the following load/store instructions.
Assume that the base table pointer for the current <b>user level process</b> is <code>0x00200000</code>.
<hr class="s1" />
Addresses in the “Instruction” column are virtual. You should translate these addresses to
physical address (i.e. in middle column), then attempt to execute the specified instruction on the
resulting address. The return value for a load is an 8-bit data value or an error, while the return
value for a store is either “<b>ok</b>” or an error. Possible errors are: <b>invalid, read-only, kernel-only.</b>
<hr class="s1" />
<i>Hints: (1) Don’t forget that Hexidecimal digits contain 4 bits! (2) PTEs are 4 bytes!</i>
<hr class="s1" />
<table>
  <thead>
    <tr>
      <th>Instruction</th>
      <th>Physical Address</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Load<hr class="s1" />[0x00001047]</code></td>
      <td><code>0x00002047</code></td>
      <td><code>0x50</code></td>
    </tr>
    <tr>
      <td><code>Store<hr class="s1" />[0x00C07665]</code></td>
      <td><code>0xEEFF0665</code></td>
      <td><code>ok</code></td>
    </tr>
    <tr>
      <td><code>Store<hr class="s1" />[0x00C005FF]</code></td>
      <td><code>0x112205FF</code></td>
      <td><code>ERROR:<hr class="s1" />read-only</code></td>
    </tr>
    <tr>
      <td><code>Load<hr class="s1" />[0x00003012]</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><code>Store<hr class="s1" />[0x02001345]</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><code>Load<hr class="s1" />[0xFF80078F]</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><code>Load<hr class="s1" />[0xFFFFF005]</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><code>Test-And-Set<hr class="s1" />[0xFFFFF006]</code></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
`

const q5_5_soln = 
`
<table>
  <thead>
    <tr>
      <th>Instruction</th>
      <th>Physical Address</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Load<hr class="s1" />[0x00001047]</code></td>
      <td><code>0x00002047</code></td>
      <td><code>0x50</code></td>
    </tr>
    <tr>
      <td><code>Store<hr class="s1" />[0x00C07665]</code></td>
      <td><code>0xEEFF0665</code></td>
      <td><code>ok</code></td>
    </tr>
    <tr>
      <td><code>Store<hr class="s1" />[0x00C005FF]</code></td>
      <td><code>0x112205FF</code></td>
      <td><code>ERROR:<hr class="s1" />read-only</code></td>
    </tr>
    <tr>
      <td><code>Load<hr class="s1" />[0x00003012]</code></td>
      <td><code>0x00004012</code></td>
      <td><code>0x36</code></td>
    </tr>
    <tr>
      <td><code>Store<hr class="s1" />[0x02001345]</code></td>
      <td><code>0x00002345</code></td>
      <td><code>ok</code></td>
    </tr>
    <tr>
      <td><code>Load<hr class="s1" />[0xFF80078F]</code></td>
      <td><code>0x0415078F</code></td>
      <td><code>ERROR:<hr class="s1" />Invalid</code></td>
    </tr>
    <tr>
      <td><code>Load<hr class="s1" />[0xFFFFF005]</code></td>
      <td><code>0x00103005</code></td>
      <td><code>0x66</code></td>
    </tr>
    <tr>
      <td><code>Test-And-Set<hr class="s1" />[0xFFFFF006]</code></td>
      <td><code>0x00103006</code></td>
      <td><code>0x77</code></td>
    </tr>
  </tbody>
</table>
`

const Scroll = require('react-scroll');
var Element = Scroll.Element;
var scrollSpy = Scroll.scrollSpy;

class CS162Sp15 extends Component {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const examCode = 'cs162/mt1-sp15';
    const problemIDs = ['q1', 'q2'];
    const problemTitles = [
      'P1. True/False',
      'P2. Short Answer'
    ];

    return (
      <span>
        <h1>CS 162</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Midterm 1 | Spring 2015 | Kubiatowicz</h5>
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
            <hr className="s5" />
            <Question id={"q3-6"} content={q3_6} solution={q3_6_soln} />
            <hr className="s5" />
            <Question id={"q3-7"} content={q3_7} solution={q3_7_soln} />
            <hr className="s5" />
            <Question id={"q3-8"} content={q3_8} solution={q3_8_soln} />
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
          </Element>
        </div>
      </span>
    );
  }
}

export default CS162Sp15;
