# Advanced Express.js Interview Questions (Part 3/3)

Here are the final 5 advanced Express questions focusing on Clean Architecture, Background Jobs, Idempotency, and Testing.

---

## 11. The Controller/Service Architecture
**Question:** Why is it considered a bad practice to put your business logic directly inside Express `(req, res)` route handlers? How should you architect it instead?

**The Code Answer:**
Express controllers should ONLY handle HTTP transport logic (parsing `req`, sending `res`). Business logic belongs in **Service Classes**. This makes your code testable, reusable (e.g., calling the same service via a cron job), and framework-agnostic.

```javascript
// 1. The BAD Way (Tightly coupled to Express HTTP)
app.post('/register', async (req, res) => {
    const user = req.body;
    // Business Logic mixed with HTTP
    if(user.age < 18) return res.status(400).send("Too young");
    await db.insert(user);
    await emailSender.send("Welcome!");
    res.status(201).send("Done");
});

// 2. The CLEAN Way (Controller -> Service -> Repository)
// The Service knows NOTHING about req/res!
class UserService {
    async registerUser(userData) {
        if (userData.age < 18) throw new Error("Too young");
        const savedUser = await UserRepository.insert(userData);
        await EmailService.sendWelcome(savedUser);
        return savedUser;
    }
}

// The Controller ONLY handles HTTP
const registerController = async (req, res, next) => {
    try {
        const userService = new UserService();
        // Pass plain JSON to the service
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

app.post('/register', registerController);
```

---

## 12. Asynchronous Background Jobs
**Question:** A user hits an Express route that generates a massive PDF report. This takes 45 seconds. If you run this in the Express route, the HTTP request times out. How do you solve this?

**The Code Answer:**
You must implement a **Message Queue** (like RabbitMQ or Redis BullMQ). The Express route instantly pushes a job to the queue and returns a `202 Accepted` status, while a separate background worker generates the PDF.

```javascript
const Queue = require('bull');
// Connect to Redis queue
const pdfQueue = new Queue('pdf-generation', 'redis://127.0.0.1:6379');

// 1. The Express Route (Fast, non-blocking)
app.post('/generate-report', async (req, res) => {
    const reportData = req.body;
    
    // Add the heavy task to the background queue instantly
    const job = await pdfQueue.add(reportData);

    // Return immediately to the user!
    res.status(202).json({ 
        message: "Report generation started.", 
        jobId: job.id,
        statusUrl: `/reports/status/${job.id}`
    });
});

// 2. The Background Worker (Runs in a separate Node.js process!)
pdfQueue.process(async (job) => {
    console.log(`Processing job ${job.id}...`);
    // Do the 45-second heavy lifting here
    const pdf = await HeavyPdfEngine.generate(job.data);
    await S3.upload(pdf);
    return { success: true, url: "s3://..." };
});
```

---

## 13. Idempotency (Preventing Duplicate Transactions)
**Question:** A user clicks the "Pay $50" button, but their internet lags, so they click it 3 more times. Four identical POST requests hit your Express server. How do you prevent charging them $200?

**The Code Answer:**
You require the client to generate a unique UUID (an Idempotency Key) and send it in the HTTP Headers. Express caches this key in Redis. If the exact same key arrives again within 24 hours, Express rejects it or returns the cached response.

```javascript
const redis = require('redis');
const client = redis.createClient();

const idempotencyMiddleware = async (req, res, next) => {
    // 1. Check for the unique header provided by the frontend
    const idempotencyKey = req.headers['x-idempotency-key'];
    if (!idempotencyKey) {
        return res.status(400).json({ error: "Idempotency key required" });
    }

    // 2. Check Redis to see if we already processed this key
    const isDuplicate = await client.getAsync(idempotencyKey);
    if (isDuplicate) {
        return res.status(409).json({ error: "Duplicate request detected!" });
    }

    // 3. Lock the key in Redis for 24 hours
    await client.setexAsync(idempotencyKey, 86400, "PROCESSING");
    
    next();
};

app.post('/api/pay', idempotencyMiddleware, async (req, res) => {
    await PaymentGateway.charge(50);
    res.json({ success: true, amount: 50 });
});
```

---

## 14. API Versioning
**Question:** You need to completely rewrite the JSON schema returned by your `/users` endpoint. However, older mobile apps still rely on the old schema. How do you architect this in Express?

**The Code Answer:**
You use Route-based versioning. You map different versions of the API to different router instances.

```javascript
const express = require('express');
const app = express();

// 1. Create separate Router modules for each version
const apiV1 = express.Router();
const apiV2 = express.Router();

// 2. Old Route (Returns Legacy Schema)
apiV1.get('/users', (req, res) => {
    res.json({ firstName: "John", lastName: "Doe" });
});

// 3. New Route (Returns Modern Schema)
apiV2.get('/users', (req, res) => {
    res.json({ fullName: "John Doe" }); // Radically different schema
});

// 4. Mount them to the main app
app.use('/api/v1', apiV1);
app.use('/api/v2', apiV2);
```

---

## 15. Integration Testing with Supertest
**Question:** How do you run automated Integration Tests on your Express routes without actually taking up a network port (`app.listen(3000)`)?

**The Code Answer:**
You export the raw `app` object without calling `listen()`, and pass it to a library like **Supertest**. It uses in-memory sockets to route HTTP requests directly into Express, making tests incredibly fast.

```javascript
// --- app.js ---
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" });
});

// CRITICAL: We export the app, we DO NOT call app.listen() here!
module.exports = app; 


// --- app.test.js ---
const request = require('supertest');
const app = require('./app'); // Import the raw Express app

describe('Health Endpoint', () => {
    it('should return 200 OK', async () => {
        // Supertest hooks directly into the Express pipeline
        const response = await request(app).get('/health');
        
        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "OK" });
    });
});
```
