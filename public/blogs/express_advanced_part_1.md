# Advanced Express.js Interview Questions (Part 1/3)

For a Senior/Lead Backend Developer with 12+ years of experience, interviewers will expect you to deeply understand Express.js architecture, error handling at scale, and Node.js process management. Here are the first 5 advanced questions with practical code.

---

## 1. The Global Error Handling Architecture
**Question:** How does Express differentiate between normal middleware and an error handler, and how do you guarantee all errors funnel into a single logging system?

**The Code Answer:**
Express uniquely identifies an Error Handler strictly by its **arity** (it must have exactly 4 arguments). If you use 3 arguments, Express treats it as a normal middleware.

```javascript
const express = require('express');
const app = express();

// 1. Normal Route
app.get('/api/data', (req, res, next) => {
    try {
        throw new Error('Database connection failed');
    } catch (err) {
        // Pass the error to the next() function. 
        // This instantly skips all normal middleware and jumps to the Error Handler.
        next(err);
    }
});

// 2. The Global Error Handler
// CRITICAL: It MUST have exactly 4 parameters: (err, req, res, next)
// Even if you don't use 'next', you must include it in the signature!
app.use((err, req, res, next) => {
    // Log to external system (e.g., Datadog, Sentry, NewRelic)
    console.error(`[CRITICAL ERROR] ${err.message}`);
    
    // Send safe response to the client
    res.status(500).json({ 
        status: 'error', 
        message: 'Internal Server Error' 
    });
});
```

---

## 2. Catching Async Promise Rejections
**Question:** In Express v4, if an `async` route throws an error and you don't catch it, the request hangs forever and can eventually crash the Node process. How do you solve this globally?

**The Code Answer:**
You should wrap your async routes in a higher-order function that automatically catches Promise rejections and forwards them to `next()`. (Note: Express v5 handles this natively, but v4 requires a wrapper).

```javascript
// 1. The Async Wrapper (Higher Order Function)
const catchAsync = (fn) => {
    return (req, res, next) => {
        // Execute the async function, and if it rejects, pipe it directly to next()
        fn(req, res, next).catch(next);
    };
};

// 2. Usage in a Route
// Now you NEVER have to write a try/catch block in your controllers again!
app.post('/users', catchAsync(async (req, res) => {
    // If createUser fails, the error skips straight to the Global Error Handler
    const user = await Database.createUser(req.body); 
    res.status(201).json(user);
}));
```

---

## 3. Advanced Request Validation
**Question:** You are building a public API. How do you validate complex nested JSON payloads to ensure malicious data never reaches your database?

**The Code Answer:**
Do not write manual `if/else` checks. Use a robust schema validation library like **Zod** or **Joi** wrapped inside an Express middleware.

```javascript
const { z } = require('zod');

// 1. Define the strict Schema
const userSchema = z.object({
    email: z.string().email(),
    age: z.number().min(18).max(120),
    role: z.enum(['admin', 'user']).optional()
});

// 2. The Validation Middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Parses the body and strips out any undeclared fields automatically!
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            // Zod throws a detailed Error object if validation fails
            res.status(400).json({ errors: error.errors });
        }
    };
};

// 3. Attach it to the route
app.post('/register', validateRequest(userSchema), (req, res) => {
    // You are mathematically guaranteed that req.body is perfectly typed here
    res.json({ message: "Valid User!" });
});
```

---

## 4. Preventing Memory Leaks in Express
**Question:** A memory leak is slowly crashing your Express server every 48 hours. What is the most common cause of memory leaks in Express, and how do you avoid it?

**The Code Answer:**
The most common cause is storing Request/Response objects in global memory or creating closures that trap the massive `req` object.

```javascript
const activeRequests = []; // THE DANGER ZONE (Global Array)

app.get('/download', (req, res) => {
    // BAD: Pushing the massive 'req' object into a global array. 
    // Even after the response finishes, the Garbage Collector cannot delete 'req' 
    // because the global array still holds a reference to it!
    activeRequests.push(req);

    // FIX: Only store the exact primitive data you need!
    const safeData = {
        userId: req.user.id,
        timestamp: Date.now()
    };
    // Do something with safeData...

    res.send('Downloading...');
});
```

---

## 5. Horizontal Scaling & Clustering
**Question:** Express runs on Node.js, which is single-threaded. If you deploy your app on a server with an 8-core CPU, Express will only use 1 core. How do you scale it to use all 8 cores?

**The Code Answer:**
You use the native Node.js `cluster` module to fork the Express server into multiple worker processes. The Master process acts as a load balancer, distributing incoming HTTP traffic across all available CPU cores.

```javascript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
    // 1. We are the Master Process (Load Balancer)
    const cpuCores = os.cpus().length; // e.g., 8 cores
    console.log(`Master process running on PID: ${process.pid}`);
    console.log(`Forking ${cpuCores} Express workers...`);

    // Fork a worker for every CPU core
    for (let i = 0; i < cpuCores; i++) {
        cluster.fork();
    }

    // Auto-restart workers if they crash
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Spinning up a new one...`);
        cluster.fork();
    });

} else {
    // 2. We are a Worker Process (The actual Express Server)
    const app = express();
    
    app.get('/', (req, res) => {
        res.send(`Hello from Worker PID: ${process.pid}`);
    });

    // Multiple workers can listen on the exact same port (e.g., 3000)
    // The OS magically balances the traffic!
    app.listen(3000, () => {
        console.log(`Express worker ${process.pid} started.`);
    });
}
```
