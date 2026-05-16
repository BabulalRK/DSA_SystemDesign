export const systemDesignConcepts = {
  lld: [
    {
      id: 'singleton',
      name: '1. Singleton Pattern',
      summary: 'A creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.',
      details: 'Often used for managing global states like database connections, logging mechanisms, or configuration managers. In JavaScript, modules act somewhat like singletons naturally.',
      diagram: `+-----------------------+
|      Database         |
|-----------------------|
| - instance: Database  |
|-----------------------|
| - constructor()       |
| + getInstance()       |
+-----------------------+`,
      pros: ['Guaranteed single instance', 'Global access point', 'Lazy initialization'],
      cons: ['Violates Single Responsibility Principle', 'Can mask bad design (acts as global variable)', 'Difficult to test in multi-threaded environments'],
      useCases: ['Logging systems', 'Database connection pools', 'Configuration managers', 'Thread pools'],
      mindMap: {
        analogy: 'The President of a Country. There can only be one at any given time, and there is a global way to reach them.',
        mermaidCode: `graph TD
    A[Client 1] -->|getInstance| C(Singleton Object)
    B[Client 2] -->|getInstance| C
    D[Client 3] -->|getInstance| C
    style C fill:#f9f,stroke:#333,stroke-width:4px`
      }
    },
    {
      id: 'factory',
      name: '2. Factory Method Pattern',
      summary: 'A creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.',
      details: 'Instead of calling a constructor directly, you call a factory method. This encapsulates the creation logic and decouples the client from the concrete classes it needs to instantiate.',
      diagram: `      [Creator]
     /         \\
[ConcreteA] [ConcreteB]
(Returns product based on parameters/conditions)`,
      pros: ['Decouples client from concrete classes', 'Centralizes object creation logic'],
      cons: ['Can complicate code with many small subclasses', 'Might require creating a new creator class for every new product type'],
      useCases: ['UI components libraries (creating buttons, checkboxes)', 'Loggers (FileLogger, ConsoleLogger)', 'Payment gateways (PayPal, Stripe)'],
      mindMap: {
        analogy: 'A Logistics Company. You ask them to deliver a package. You don\'t care if they use a truck, a ship, or an airplane (the concrete products), you just care that the delivery service (the factory) handles the creation of the vehicle.',
        mermaidCode: `graph TD
    A[Client] --> B(Logistics Factory)
    B -->|if Road| C[Truck]
    B -->|if Sea| D[Ship]
    B -->|if Air| E[Airplane]`
      }
    },
    {
      id: 'observer',
      name: '3. Observer Pattern',
      summary: 'A behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.',
      details: 'Heavily used in modern UI frameworks (like React/Vue) and Event-Driven systems. A "Subject" maintains a list of "Observers" and automatically calls a method on them when its state changes.',
      diagram: `[Subject] 
  |-- addObserver(o)
  |-- removeObserver(o)
  |-- notify() --------> [Observer A].update()
               --------> [Observer B].update()`,
      pros: ['Open/Closed Principle (can add new subscribers without altering publisher)', 'Establishes relations at runtime'],
      cons: ['Subscribers are notified in random order', 'Can cause memory leaks if observers aren\'t properly deregistered'],
      useCases: ['Event listeners in DOM (onClick)', 'React State (components re-rendering on state change)', 'Push notifications', 'Stock market tickers'],
      mindMap: {
        analogy: 'A YouTube Channel. When a creator (Subject) uploads a new video, all subscribers (Observers) get notified automatically. Subscribers don\'t constantly ask "is there a new video?" (polling).',
        mermaidCode: `graph LR
    S[Subject / Publisher] -->|notify| O1[Observer 1]
    S -->|notify| O2[Observer 2]
    S -->|notify| O3[Observer 3]
    O4 -.->|subscribe| S
    style S fill:#bbf,stroke:#333,stroke-width:2px`
      }
    },
    {
      id: 'strategy',
      name: '4. Strategy Pattern',
      summary: 'A behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.',
      details: 'Useful when you have multiple ways to perform a task (e.g., sorting arrays, processing payments). The context class delegates the algorithm execution to the strategy object.',
      diagram: `[Context] -> holds reference to -> [Strategy Interface]
                                          |
                        +-----------------+-----------------+
                        |                 |                 |
                  [CreditCard]       [PayPal]          [Crypto]`,
      pros: ['Swap algorithms at runtime', 'Isolate algorithm implementation from code that uses it', 'Replaces massive conditionals (if/else chains)'],
      cons: ['Clients must know the differences between strategies', 'Increases number of objects in the application'],
      useCases: ['Sorting algorithms (merge sort vs quick sort based on data size)', 'Payment processing (Credit Card, PayPal, Apple Pay)', 'Navigation apps (driving, walking, transit routes)'],
      mindMap: {
        analogy: 'Traveling to the Airport. The goal is to get there (Context). You can choose different strategies: Taxi, Bus, or Walk. You can switch strategies depending on your wallet or time.',
        mermaidCode: `graph TD
    C[Context: Route Planner]
    C --> S1[Strategy: Drive]
    C --> S2[Strategy: Walk]
    C --> S3[Strategy: Public Transit]
    style C fill:#dfd,stroke:#333,stroke-width:2px`
      }
    },
    {
      id: 'solid',
      name: '5. SOLID Principles',
      summary: 'The five fundamental principles of object-oriented programming that make software designs more understandable, flexible, and maintainable.',
      details: 'S: Single Responsibility (A class should have one reason to change). O: Open/Closed (Software entities should be open for extension, but closed for modification). L: Liskov Substitution (Subtypes must be substitutable for their base types). I: Interface Segregation (Clients shouldn\'t be forced to depend on interfaces they don\'t use). D: Dependency Inversion (Depend on abstractions, not concretions).',
      diagram: `[High-Level Module]
        | (Depends on)
        v
[Abstraction / Interface]
        ^
        | (Implements)
[Low-Level Module]`,
      pros: ['Highly maintainable code', 'Easy to test', 'Decoupled architecture'],
      cons: ['Can lead to over-engineering', 'Steep learning curve for beginners'],
      useCases: ['Designing enterprise-scale object-oriented systems', 'Refactoring legacy code', 'Building frameworks/libraries'],
      mindMap: {
        analogy: 'A well-organized restaurant. S: Chef cooks, waiter serves. O: Add new menu items without remodeling the kitchen. L: A junior chef can replace a senior chef for basic tasks. I: Don\'t force the dishwasher to learn how to host. D: The manager depends on the role "Cook", not on specifically "John".',
        mermaidCode: `mindmap
  root((SOLID))
    S[Single Responsibility]
    O[Open/Closed]
    L[Liskov Substitution]
    I[Interface Segregation]
    D[Dependency Inversion]`
      }
    }
  ],
  hld: [
    {
      id: 'load-balancing',
      name: '1. Load Balancing',
      summary: 'The process of distributing network traffic across multiple servers to ensure no single server bears too much demand.',
      details: 'Can be hardware or software-based (like Nginx, HAProxy). Works at Layer 4 (Transport - TCP/UDP) or Layer 7 (Application - HTTP). Uses algorithms like Round Robin, Least Connections, or IP Hashing.',
      diagram: `                  /--> [Server 1]
[Client] -> [Load Balancer] -> [Server 2]
                  \\--> [Server 3]`,
      pros: ['Prevents single points of failure', 'Improves application responsiveness and availability', 'Allows seamless horizontal scaling'],
      cons: ['Load balancer itself can become a single point of failure if not clustered', 'Adds network latency'],
      useCases: ['Distributing web traffic across multiple servers', 'API Gateways', 'Preventing DDoS attacks by absorbing traffic'],
      mindMap: {
        analogy: 'A Traffic Cop at a busy intersection. The cop directs cars (requests) to the lanes (servers) that have the least amount of traffic, ensuring no single lane gets completely blocked.',
        mermaidCode: `graph TD
    C[Client] --> LB{Load Balancer}
    LB -->|Round Robin| S1[Server 1]
    LB -->|Least Conn| S2[Server 2]
    LB -->|IP Hash| S3[Server 3]
    style LB fill:#f96,stroke:#333,stroke-width:4px`
      }
    },
    {
      id: 'caching',
      name: '2. Caching Strategies',
      summary: 'Storing copies of frequently accessed data in a temporary, high-speed storage layer (like RAM) to reduce database load and latency.',
      details: 'Common strategies include Cache-Aside (application checks cache, if miss, checks DB and populates cache), Read-Through, Write-Through, and Write-Behind. Popular tools: Redis, Memcached.',
      diagram: `[App] ---> (1. Check Cache) ---> [Redis] (Hit!)
  |
  +---> (2. Miss) ---> [Database] ---> (3. Write to Cache)`,
      pros: ['Drastically reduces latency', 'Reduces load on the primary database', 'Highly cost-effective for read-heavy workloads'],
      cons: ['Cache invalidation is notoriously difficult', 'Data staleness issues', 'Added infrastructure complexity'],
      useCases: ['Storing user sessions', 'Caching database queries (e.g., top 10 products)', 'CDNs for static assets (images, videos)'],
      mindMap: {
        analogy: 'Keeping a glass of water on your desk vs walking to the kitchen. The kitchen (Database) has infinite water, but walking there takes time. The glass on your desk (Cache) gives you instant access to a small amount of water.',
        mermaidCode: `graph LR
    A[Application] -->|1. Request Data| B{Cache}
    B -->|2. Hit| A
    B -.->|3. Miss| C[(Database)]
    C -.->|4. Save| B
    C -.->|5. Return| A
    style B fill:#9f9,stroke:#333,stroke-width:2px`
      }
    },
    {
      id: 'cap-theorem',
      name: '3. CAP Theorem',
      summary: 'States that it is impossible for a distributed data store to simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance.',
      details: 'Since network partitions (P) are unavoidable in distributed systems, architects must choose between Consistency (C) and Availability (A). CP systems return an error if data can\'t be guaranteed to be up-to-date. AP systems always return data, even if it might be stale.',
      diagram: `       Consistency
          /   \\
    CP   /     \\   CA (Rare in distributed sys)
        /       \\
Partition ------- Availability
        \\  AP  /`,
      pros: ['Provides a fundamental framework for evaluating distributed databases'],
      cons: ['Overly simplistic; modern databases offer tunable consistency models'],
      useCases: ['Choosing a database for a specific project (e.g., MongoDB vs Cassandra vs PostgreSQL)', 'Designing distributed systems that handle network failures'],
      mindMap: {
        analogy: 'A group of friends trying to agree on a movie while standing in different rooms (Partition). You can either wait until everyone shouts their answer so you all agree (Consistency, but you might wait forever), or you just pick whatever the people in your room want right now (Availability, but others might be watching a different movie).',
        mermaidCode: `mindmap
  root((CAP))
    Consistency
    Availability
    Partition Tolerance`
      }
    },
    {
      id: 'message-queues',
      name: '4. Message Queues & Event Streaming',
      summary: 'Asynchronous communication mechanisms that decouple services. Producers send messages to a queue, and consumers process them at their own pace.',
      details: 'Tools like RabbitMQ (traditional queue) or Apache Kafka (event streaming log). Critical for handling traffic spikes, decoupling microservices, and background task processing.',
      diagram: `[Producer Service] -> (Publishes) -> [Message Broker (Kafka/RabbitMQ)] -> (Consumes) -> [Consumer Service]`,
      pros: ['Decouples system components', 'Provides buffering for traffic spikes (smooths load)', 'Guaranteed message delivery'],
      cons: ['Adds complexity to the architecture', 'Debugging asynchronous message flows can be difficult'],
      useCases: ['Processing background jobs (video rendering, email sending)', 'Decoupling microservices', 'Real-time analytics (Kafka)'],
      mindMap: {
        analogy: 'An Email Inbox. You (Producer) send an email. The server holds it in an inbox (Queue). The recipient (Consumer) reads it whenever they have free time. You don\'t have to wait for them to read it before you send another one.',
        mermaidCode: `graph LR
    P[Producer] -->|Publish| Q[(Message Broker / Queue)]
    Q -->|Consume| C1[Consumer 1]
    Q -->|Consume| C2[Consumer 2]
    style Q fill:#ffb,stroke:#333,stroke-width:2px`
      }
    },
    {
      id: 'sharding',
      name: '5. Database Sharding',
      summary: 'A method of partitioning data horizontally to split a massive database into smaller, faster, more easily managed parts called data shards.',
      details: 'Instead of scaling up (bigger machine), we scale out. Data is distributed across multiple databases using a Shard Key (e.g., User ID).',
      diagram: `Users A-M ----> [Shard 1 Database]
[App Router]
Users N-Z ----> [Shard 2 Database]`,
      pros: ['Allows infinite horizontal scaling', 'Improves query response times', 'Increases overall system availability'],
      cons: ['Extremely complex to implement and maintain', 'Joining data across shards is slow and complex', 'Rebalancing shards when one gets too full is difficult'],
      useCases: ['Massive social media platforms (users on different shards)', 'Global SaaS products (EU data vs US data)', 'High-throughput trading platforms'],
      mindMap: {
        analogy: 'A Library getting too full. Instead of building one massive, impossibly tall bookshelf (scaling up), you buy 5 smaller bookshelves and put books A-E in the first, F-J in the second, etc. (scaling out / sharding).',
        mermaidCode: `graph TD
    App[App Router] -->|User ID: 1-1000| S1[(Shard 1: US)]
    App -->|User ID: 1001-2000| S2[(Shard 2: EU)]
    App -->|User ID: 2001+| S3[(Shard 3: ASIA)]`
      }
    },
    {
      id: 'microservices',
      name: '6. Microservices Architecture',
      summary: 'An architectural style that structures an application as a collection of loosely coupled, independently deployable services organized around business capabilities.',
      details: 'Contrasts with monolithic architectures. Each service has its own database and communicates over lightweight protocols (HTTP/REST or gRPC).',
      diagram: `[Client App]
     |
[API Gateway]
  /    |    \\
[Auth] [Orders] [Inventory]
 (DB)   (DB)     (DB)`,
      pros: ['Independent deployment and scaling', 'Fault isolation', 'Technology diversity (use the best language for the job)'],
      cons: ['Distributed system complexity', 'Network latency between services', 'Complex data consistency (requires eventual consistency / Sagas)'],
      useCases: ['Complex enterprise applications (Netflix, Uber, Amazon)', 'Teams working independently on different features', 'Systems requiring independent scaling'],
      mindMap: {
        analogy: 'A Hospital. Instead of one doctor trying to treat every single disease (Monolith), you have specialized departments: Cardiology, Neurology, Pediatrics (Microservices). They communicate via the front desk (API Gateway).',
        mermaidCode: `graph TD
    C[Client] --> G[API Gateway]
    G --> A[Auth Service]
    G --> O[Order Service]
    G --> I[Inventory Service]
    A --- DB1[(Auth DB)]
    O --- DB2[(Order DB)]
    I --- DB3[(Inv DB)]`
      }
    }
  ]
};