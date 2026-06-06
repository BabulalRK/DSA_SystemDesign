# The Node.js Event Loop Demystified

The Event Loop is simply an endless "While" loop inside Node.js that checks different queues to see if any asynchronous work is ready to be executed. 

There is a strict hierarchy (order of operations) to these queues. If you understand this order, you will master Node.js.

## The Hierarchy of Execution
1.  **Synchronous Code:** Top to bottom, executes immediately.
2.  **Microtasks:** Executed immediately *after* the current synchronous block finishes, before the actual Event Loop starts.
    *   `process.nextTick` (Highest Priority)
    *   `Promises`
3.  **The Event Loop Phases:**
    *   **Phase 1 - Timers:** Executes `setTimeout` and `setInterval` callbacks.
    *   **Phase 2 - Poll (I/O):** Executes database queries, file reads, and incoming network requests.
    *   **Phase 3 - Check:** Executes `setImmediate` callbacks.

---

## The Ultimate Event Loop Test Code

Run this code in your mind before reading the output below. It mixes every type of asynchronous function together.

```javascript
const fs = require('fs');

console.log('1. [SYNC] This runs immediately on the main thread.');

// TIMERS PHASE
setTimeout(() => {
    console.log('5. [MACROTASK] setTimeout callback (Timers Phase)');
}, 0);

// CHECK PHASE
setImmediate(() => {
    console.log('6. [MACROTASK] setImmediate callback (Check Phase)');
});

// MICROTASKS (Highest Async Priority)
Promise.resolve().then(() => {
    console.log('3. [MICROTASK] Promise resolved');
});

process.nextTick(() => {
    console.log('2. [MICROTASK] process.nextTick (Highest priority!)');
});

// POLL PHASE (I/O)
fs.readFile(__filename, () => {
    console.log('----------------------------------------------------');
    console.log('7. [I/O POLL PHASE] File reading has finished!');
    
    // THE INTERVIEW TRICK: What happens inside an I/O callback?
    setTimeout(() => {
        console.log('9. [INSIDE I/O] setTimeout (Runs on the NEXT loop iteration)');
    }, 0);

    setImmediate(() => {
        console.log('8. [INSIDE I/O] setImmediate (Runs IMMEDIATELY in the Check Phase)');
    });
});

console.log('4. [SYNC] Main thread is done processing. Event Loop takes over now.');
```

---

## The Exact Output & Explanation

If you run that file, you will always get this exact output:

```text
1. [SYNC] This runs immediately on the main thread.
4. [SYNC] Main thread is done processing. Event Loop takes over now.
2. [MICROTASK] process.nextTick (Highest priority!)
3. [MICROTASK] Promise resolved
5. [MACROTASK] setTimeout callback (Timers Phase)
6. [MACROTASK] setImmediate callback (Check Phase)
----------------------------------------------------
7. [I/O POLL PHASE] File reading has finished!
8. [INSIDE I/O] setImmediate (Runs IMMEDIATELY in the Check Phase)
9. [INSIDE I/O] setTimeout (Runs on the NEXT loop iteration)
```

### Why does it happen in this order?
1.  **Sync Code Always First:** Node executes all the top-level standard JavaScript first (Logs 1 & 4).
2.  **Microtasks Jump the Line:** Before Node even looks at the Event Loop, it clears out the Microtask queue. `nextTick` always beats `Promises` (Logs 2 & 3).
3.  **The Loop Starts (Timers):** Node enters Phase 1 (Timers) and finds the `setTimeout` ready (Log 5).
4.  **Check Phase:** Node skips the Poll phase because reading the file from the hard drive takes a few milliseconds and isn't ready yet. It hits Phase 3 (Check) and executes `setImmediate` (Log 6).
5.  **The Loop Spins...**
6.  **I/O Finishes:** A few milliseconds later, the hard drive finishes reading the file. Node hits the Poll phase and executes the `fs.readFile` callback (Log 7).
7.  **The Interview Trick:** Inside that `fs.readFile` callback, we queue a Timer and an Immediate. Because we are currently sitting in the **Poll Phase**, the very next phase the loop hits is the **Check Phase**. Therefore, `setImmediate` (Log 8) will **ALWAYS** execute before `setTimeout` (Log 9) when placed inside an I/O callback!
