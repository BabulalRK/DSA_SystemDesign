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
      cons: ['Violates Single Responsibility Principle', 'Can mask bad design (acts as global variable)', 'Difficult to test in multi-threaded environments']
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
      cons: ['Can complicate code with many small subclasses', 'Might require creating a new creator class for every new product type']
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
      cons: ['Subscribers are notified in random order', 'Can cause memory leaks if observers aren\'t properly deregistered']
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
      cons: ['Clients must know the differences between strategies', 'Increases number of objects in the application']
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
      cons: ['Can lead to over-engineering', 'Steep learning curve for beginners']
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
      cons: ['Load balancer itself can become a single point of failure if not clustered', 'Adds network latency']
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
      cons: ['Cache invalidation is notoriously difficult', 'Data staleness issues', 'Added infrastructure complexity']
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
      cons: ['Overly simplistic; modern databases offer tunable consistency models']
    },
    {
      id: 'message-queues',
      name: '4. Message Queues & Event Streaming',
      summary: 'Asynchronous communication mechanisms that decouple services. Producers send messages to a queue, and consumers process them at their own pace.',
      details: 'Tools like RabbitMQ (traditional queue) or Apache Kafka (event streaming log). Critical for handling traffic spikes, decoupling microservices, and background task processing.',
      diagram: `[Producer Service] -> (Publishes) -> [Message Broker (Kafka/RabbitMQ)] -> (Consumes) -> [Consumer Service]`,
      pros: ['Decouples system components', 'Provides buffering for traffic spikes (smooths load)', 'Guaranteed message delivery'],
      cons: ['Adds complexity to the architecture', 'Debugging asynchronous message flows can be difficult']
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
      cons: ['Extremely complex to implement and maintain', 'Joining data across shards is slow and complex', 'Rebalancing shards when one gets too full is difficult']
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
      cons: ['Distributed system complexity', 'Network latency between services', 'Complex data consistency (requires eventual consistency / Sagas)']
    }
  ]
};