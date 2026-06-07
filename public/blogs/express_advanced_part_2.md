# Advanced Express.js Interview Questions (Part 2/3)

Here are the next 5 advanced Express questions focusing on Security, Performance, Streams, and graceful process management.

---

## 6. Advanced API Security
**Question:** Your Express API is exposed to the public internet. Aside from Authentication, what three critical middlewares must you implement to protect the server?

**The Code Answer:**
1. **Helmet:** Sets critical HTTP security headers (prevents clickjacking, XSS sniffing).
2. **Rate Limiting:** Prevents Brute Force and basic DDoS attacks.
3. **CORS:** Restricts which domains can make browser requests to your API.

```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// 1. Helmet: Automatically secures HTTP Headers
app.use(helmet());

// 2. CORS: Only allow your specific frontend domain to access the API
app.use(cors({
    origin: 'https://my-frontend.com',
    methods: ['GET', 'POST'],
    credentials: true // Allow cookies/authorization headers
}));

// 3. Rate Limiter: Max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

// Apply rate limiting to all /api routes
app.use('/api/', limiter);
```

---

## 7. Memory-Safe File Uploads
**Question:** A user uploads a 5GB video file to your Express server. If you use a standard JSON body parser, your server crashes with an Out Of Memory (OOM) error. How do you handle this safely?

**The Code Answer:**
You must never buffer large files into RAM. You use a streaming middleware like `multer` to stream the incoming chunks directly to the hard drive or to an S3 bucket.

```javascript
const express = require('express');
const multer = require('multer');

const app = express();

// Configure Multer to stream directly to the disk, NOT RAM.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/temp-uploads/'); // Stream chunks to this folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Enforce strict file size limits (e.g., 5GB max)
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 } 
});

// The 'upload.single' middleware intercepts the multi-part stream,
// saves it to disk, and attaches the file metadata to req.file
app.post('/upload', upload.single('video'), (req, res) => {
    res.send(`File safely saved to: ${req.file.path}`);
});
```

---

## 8. Streaming Massive Responses
**Question:** You need to export 10 million database records to a user as a CSV file. How do you send this data using Express without crashing the server?

**The Code Answer:**
Instead of fetching all 10 million records into an array and using `res.send()`, you retrieve a **Stream** from the database and `.pipe()` it directly into the Express `res` object (which is a Writable Stream).

```javascript
const express = require('express');
const { MongoClient } = require('mongodb');

app.get('/export-users', async (req, res) => {
    // 1. Tell the browser we are sending a downloadable CSV
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');

    // 2. Write the CSV Headers
    res.write('ID,Name,Email\n');

    const db = req.dbClient;
    // 3. CRITICAL: Do NOT use .toArray(). Use .stream()
    const cursorStream = db.collection('users').find().stream();

    // 4. As each user is fetched from the DB, instantly send it to the client
    cursorStream.on('data', (user) => {
        // We write the chunk to the HTTP response stream
        res.write(`${user._id},${user.name},${user.email}\n`);
    });

    // 5. Close the HTTP connection when the database finishes
    cursorStream.on('end', () => {
        res.end();
    });
});
```

---

## 9. Graceful Shutdown (Zero Downtime)
**Question:** When you deploy a new version of your Express app, Kubernetes sends a `SIGTERM` signal to kill the old Node.js process. If you just let it die, users mid-request will get disconnected. How do you fix this?

**The Code Answer:**
You must trap the `SIGTERM` signal, tell Express to stop accepting *new* connections, wait for *existing* requests to finish, and cleanly close the database.

```javascript
const express = require('express');
const app = express();

const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Listen for the OS kill signal
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Starting graceful shutdown...');

    // 1. Stop accepting new HTTP requests
    server.close(() => {
        console.log('All HTTP requests finished.');
        
        // 2. Cleanly close Database connections
        Database.closeConnection().then(() => {
            console.log('Database disconnected.');
            
            // 3. Safely kill the process
            process.exit(0);
        });
    });

    // Fallback: If requests take too long (e.g., stuck), force kill after 10 seconds
    setTimeout(() => {
        console.error('Forcing shutdown due to timeout.');
        process.exit(1);
    }, 10000);
});
```

---

## 10. Stateless JWT Authorization
**Question:** How do you implement a highly scalable, stateless authorization middleware using JSON Web Tokens (JWT)?

**The Code Answer:**
A true stateless JWT middleware verifies the cryptographic signature natively, meaning it does **not** need to query a database or Redis to validate the user!

```javascript
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    // 1. Extract the Bearer token from the header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        // 2. Verify the cryptographic signature (CPU-bound, no DB query!)
        // If the token was tampered with, or is expired, this throws an error.
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach the decoded user data (ID, Role) to the Request object
        req.user = decodedPayload;

        // 4. Continue to the actual controller
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

// Usage
app.get('/api/dashboard', requireAuth, (req, res) => {
    res.send(`Welcome to the dashboard, User ID: ${req.user.id}`);
});
```
