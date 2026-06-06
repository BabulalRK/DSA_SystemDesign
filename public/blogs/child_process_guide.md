# Mastering Node.js Child Processes

To truly understand the difference between `exec`, `spawn`, and `fork`, you need to see how they handle data. 

Below are working code examples for all three. You can copy and run these to see exactly how Node.js interacts with your computer's terminal.

---

## 1. `exec()`: The Buffer Approach
`exec` runs a shell command and waits for it to completely finish. Once it is 100% done, it hands you the entire output all at once in a massive string (buffer). 

*Danger:* If the output is larger than 1MB, your Node.js app will crash!

```javascript
// exec_example.js
const { exec } = require('child_process');

console.log('Starting exec...');

// Let's run a quick command to check the Node.js version
exec('node -v', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
    }
    
    // We only get this console.log AFTER the entire command has finished
    console.log(`[EXEC] Command finished! The output is:\n${stdout}`);
});
```

---

## 2. `spawn()`: The Stream Approach
`spawn` runs a shell command but **does not wait** for it to finish. Instead, as the terminal generates output line-by-line, `spawn` immediately streams that data back to your Node.js app in chunks. 

*Benefit:* You can read an infinitely large output (like gigabytes of logs) without ever crashing your server's RAM.

```javascript
// spawn_example.js
const { spawn } = require('child_process');

console.log('Starting spawn...');

// Let's run a 'ping' command. On Windows, this sends 4 packets.
// spawn takes the command ('ping') and an array of arguments (['localhost'])
const pingProcess = spawn('ping', ['localhost']);

// Every time the terminal outputs a line of text, this event fires IMMEDIATELY!
pingProcess.stdout.on('data', (chunk) => {
    console.log(`[SPAWN CHUNK RECEIVED] -> ${chunk.toString().trim()}`);
});

// This fires when the entire command is finally done
pingProcess.on('close', (code) => {
    console.log(`[SPAWN] Process exited with code ${code}`);
});
```

---

## 3. `fork()`: The IPC Tunnel Approach
`fork` is a special version of `spawn`. You use it when you don't want to run a Bash/Windows command, but instead want to spin up a **brand new Node.js process** in the background. 

The magic of `fork` is that it automatically creates a secret communication tunnel (IPC) between the parent file and the child file.

### Step A: The Child File (`child.js`)
First, create the background worker file.
```javascript
// child.js
// This code runs in a completely separate Node.js process!

// Listen for messages from the parent
process.on('message', (msg) => {
    console.log(`[Child Process] I received a message from Parent:`, msg);

    // Let's do some heavy fake work...
    const result = msg.number * 1000;

    // Send the result BACK to the parent using the secret tunnel
    process.send({ status: 'success', data: result });
    
    // Kill this child process so it doesn't run forever
    process.exit(); 
});
```

### Step B: The Parent File (`parent.js`)
Now, create the main server file that spins up the child.
```javascript
// parent.js
const { fork } = require('child_process');

console.log('[Parent Process] Starting up...');

// 1. Fork spins up the child.js file in the background
const childProcess = fork('./child.js');

// 2. We use the secret IPC tunnel to send JSON data to the child
console.log('[Parent Process] Sending work to child...');
childProcess.send({ command: 'calculate', number: 42 });

// 3. We listen for the child to send a message back
childProcess.on('message', (response) => {
    console.log(`[Parent Process] Child replied with:`, response);
});
```

### The Output of `fork()`:
```text
[Parent Process] Starting up...
[Parent Process] Sending work to child...
[Child Process] I received a message from Parent: { command: 'calculate', number: 42 }
[Parent Process] Child replied with: { status: 'success', data: 42000 }
```

---

## 4. `fork()` vs `worker_threads` (The Interview Core)
If an interviewer asks you about `fork()`, their very next question will almost certainly be: *"Why do we use `worker_threads` instead of `fork()` today?"*

It all comes down to **Memory** and **Weight**:

### `fork()` = A Brand New Process (Heavy)
When you use `child_process.fork()`, Node.js asks the operating system to spin up a completely brand new, 100% separate Node.js application. 
*   **The Cost:** It has its own V8 engine, its own memory heap, and its own Event Loop. Because of this, spinning up a `fork` takes about 30MB of RAM and at least 10-30 milliseconds. It is very "heavy".
*   **The Wall:** Because it is a separate process, **it cannot share memory** with the parent. If you want to send a 1GB array to a `fork`, Node.js must convert it to JSON and pipe it through the IPC tunnel, which takes a massive amount of time and doubles your RAM usage.

### `worker_threads` = A Thread Inside the Same Process (Light)
When you use `worker_threads`, Node.js does **not** spin up a new application. Instead, it spins up a new thread *inside* the existing Node.js process.
*   **The Cost:** Because it shares the parent's V8 engine process, it is incredibly lightweight, spins up much faster, and uses far less RAM.
*   **The Superpower:** Because the worker thread lives inside the exact same process as the parent, **they can share physical memory**. This is where the `SharedArrayBuffer` comes in! You can instantly pass a massive array to a `worker_thread` without cloning it or using JSON.

### The Interview Summary
> *"Historically, we used `child_process.fork()` to do background work, but it was heavy and couldn't share memory. Modern Node.js introduced `worker_threads`, which are lightweight threads that live inside the same Node process. Today, I use **`worker_threads`** for heavy CPU computations because they support `SharedArrayBuffer` for zero-copy memory sharing. I only use **`fork()`** if I need to run completely unstable, untrusted code and I want a 100% isolated sandbox so a crash doesn't take down my main server."*
