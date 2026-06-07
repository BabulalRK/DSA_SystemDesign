# System Design in Practice (With Code)

In a System Design interview, drawing boxes and arrows on a whiteboard is only half the battle. At a senior level (12+ years of experience), interviewers want to know if you actually understand how those "boxes" work under the hood.

Here are 5 core System Design concepts translated directly into Node.js code so you can deeply understand the mechanics behind them.

---

## 1. Rate Limiting (The Token Bucket Algorithm)
**The Concept:** 
When you put an API Gateway (like Kong or AWS API Gateway) in front of your service, it limits how many requests a user can make to prevent DDoS attacks. The industry standard is the **Token Bucket Algorithm**.

**The Code Implementation:**
We use Redis because it is blazing fast and acts as a single source of truth across multiple Node.js servers.

```javascript
const redis = require('redis');
const client = redis.createClient();

async function tokenBucketRateLimiter(req, res, next) {
    const userId = req.user.id;
    const bucketKey = `rate_limit:${userId}`;
    const maxTokens = 10;
    const refillRatePerSecond = 1;

    // 1. Get the user's current bucket
    let bucket = await client.hgetallAsync(bucketKey);

    if (!bucket) {
        // First time user: give them a full bucket
        await client.hmsetAsync(bucketKey, 'tokens', maxTokens - 1, 'lastRefill', Date.now());
        return next();
    }

    // 2. Calculate how many tokens to add based on the time passed
    const now = Date.now();
    const timePassedSeconds = (now - parseInt(bucket.lastRefill)) / 1000;
    const tokensToAdd = Math.floor(timePassedSeconds * refillRatePerSecond);
    
    // 3. Update token count (cap at maxTokens)
    let currentTokens = Math.min(parseInt(bucket.tokens) + tokensToAdd, maxTokens);

    if (currentTokens > 0) {
        // Consume 1 token and update the bucket
        await client.hmsetAsync(bucketKey, 'tokens', currentTokens - 1, 'lastRefill', now);
        next();
    } else {
        res.status(429).send("Too Many Requests. Please wait.");
    }
}
```

---

## 2. Distributed Locking (Preventing Race Conditions)
**The Concept:**
Imagine you have 5 instances of your Express server running. A user clicks "Checkout" twice very quickly. If both requests hit different servers simultaneously, both servers might deduct $50 from the database. A **Distributed Lock** ensures only ONE server can execute the code at a time.

**The Code Implementation:**
We use Redis `SETNX` (Set if Not Exists) to create a lock. 

```javascript
const { v4: uuidv4 } = require('uuid');

async function processCheckoutWithLock(userId, amount) {
    const lockKey = `lock:checkout:${userId}`;
    const lockValue = uuidv4(); // Unique ID for this specific server's lock
    const lockTTL = 5000; // Lock expires in 5 seconds (deadlock prevention)

    // 1. Try to acquire the lock (SETNX)
    const lockAcquired = await client.setAsync(lockKey, lockValue, 'NX', 'PX', lockTTL);

    if (!lockAcquired) {
        throw new Error("Checkout is already in progress. Please wait.");
    }

    try {
        // 2. We have the lock! Perform the highly critical database transaction
        console.log(`Server processing payment for ${userId}...`);
        await Database.deductBalance(userId, amount);
        
    } finally {
        // 3. Release the lock, but ONLY if we are the one who locked it!
        // We check the UUID to ensure we don't accidentally delete someone else's lock
        const currentValue = await client.getAsync(lockKey);
        if (currentValue === lockValue) {
            await client.delAsync(lockKey);
        }
    }
}
```

---

## 3. Database Sharding (Consistent Hashing)
**The Concept:**
When your MongoDB database gets too large (e.g., 5 Terabytes), you split it into 3 separate servers (Shards). But when a user logs in, how does your Node.js app know *which* of the 3 databases holds their data?

**The Code Implementation:**
A naive approach is `userId % 3`. But if you add a 4th database, all the math changes and you have to move 100% of your data! The solution is **Consistent Hashing**.

```javascript
const crypto = require('crypto');

class ConsistentHashRing {
    constructor(nodes) {
        this.nodes = nodes; // e.g., ['db-shard-1', 'db-shard-2', 'db-shard-3']
    }

    // We convert strings into a massive integer on a "ring"
    hash(key) {
        return parseInt(crypto.createHash('md5').update(key).digest('hex').substring(0, 8), 16);
    }

    getShard(userId) {
        const userHash = this.hash(userId);
        
        // Find the first Database Shard whose hash is GREATER than the User's hash
        for (let node of this.nodes) {
            const nodeHash = this.hash(node);
            if (nodeHash >= userHash) {
                return node;
            }
        }
        
        // If we reach the end of the array, loop back around the "ring" to the first node
        return this.nodes[0];
    }
}

// Usage:
const router = new ConsistentHashRing(['mongodb://shard-A', 'mongodb://shard-B', 'mongodb://shard-C']);
const targetDB = router.getShard("user_9921_babulal");
console.log(`Route this query to: ${targetDB}`);
```

---

## 4. The Circuit Breaker Pattern
**The Concept:**
Your Microservice A calls Microservice B to get user data. Microservice B crashes. Now, Microservice A hangs for 30 seconds waiting for B to respond, and eventually A crashes too. This is a **Cascading Failure**. A Circuit Breaker detects that B is down and instantly returns an error (or cached data) without even trying to call B, giving B time to recover.

**The Code Implementation:**

```javascript
class CircuitBreaker {
    constructor(requestFunction, failureThreshold = 3, retryTimeout = 10000) {
        this.requestFunction = requestFunction;
        this.failureThreshold = failureThreshold;
        this.retryTimeout = retryTimeout;
        
        this.state = 'CLOSED'; // CLOSED = Normal, OPEN = Failing
        this.failureCount = 0;
        this.nextAttemptTime = 0;
    }

    async fire(...args) {
        if (this.state === 'OPEN') {
            if (Date.now() > this.nextAttemptTime) {
                this.state = 'HALF_OPEN'; // Time to test if the service is back up!
            } else {
                throw new Error("Circuit is OPEN. Fast-failing the request.");
            }
        }

        try {
            // Attempt the network request
            const response = await this.requestFunction(...args);
            this.reset();
            return response;
        } catch (error) {
            this.recordFailure();
            throw error;
        }
    }

    recordFailure() {
        this.failureCount += 1;
        if (this.failureCount >= this.failureThreshold) {
            this.state = 'OPEN'; // Trip the breaker!
            this.nextAttemptTime = Date.now() + this.retryTimeout;
        }
    }

    reset() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
}

// Usage: Wrap your dangerous HTTP calls in the breaker
const fetchUserBreaker = new CircuitBreaker(axios.get);

app.get('/user/:id', async (req, res) => {
    try {
        const data = await fetchUserBreaker.fire(`http://microservice-b/users/${req.params.id}`);
        res.json(data);
    } catch (e) {
        res.status(503).json({ error: "Service B is currently unavailable (Circuit Open)." });
    }
});
```

---

## 5. Idempotent Message Processing (Dead Letter Queues)
**The Concept:**
In an Event-Driven Architecture (e.g., using Kafka or RabbitMQ), a message might be delivered twice. If the message is "Charge $10", your system must be designed to safely process it multiple times without actually charging the user twice.

**The Code Implementation:**
You maintain a table of `ProcessedMessageIds`. If a job fails repeatedly, it gets moved to a "Dead Letter Queue" for manual review.

```javascript
const MAX_RETRIES = 3;

async function processKafkaEvent(event) {
    const { messageId, payload } = event;

    // 1. Idempotency Check
    const alreadyProcessed = await Database.query(`SELECT 1 FROM processed_events WHERE id = ?`, [messageId]);
    if (alreadyProcessed) return; // Safely ignore the duplicate!

    let attempts = 0;
    while (attempts < MAX_RETRIES) {
        try {
            // 2. Attempt the risky operation
            await HeavyProcessor.run(payload);
            
            // 3. Mark as processed in the same database transaction!
            await Database.query(`INSERT INTO processed_events (id) VALUES (?)`, [messageId]);
            return; 
            
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed.`);
        }
    }

    // 4. Dead Letter Queue
    // If it fails 3 times, we don't crash. We save it to a separate queue so 
    // engineers can look at it manually tomorrow.
    await Database.query(`INSERT INTO dead_letter_queue (message_id, payload) VALUES (?, ?)`, [messageId, payload]);
}
```
