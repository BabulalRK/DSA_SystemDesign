export const dsaPatterns = [
  // EASY
  {
    id: 'two-pointers',
    name: '1. Two Pointers',
    summary: 'Iterating through a data structure with two pointers (usually left and right) to search for pairs or optimize space/time.',
    realWorldProblem: 'Gift Card Match: Find two items in a price-sorted catalog that exactly exhaust a $100 gift card.',
    code: `function findGiftCardMatch(prices, giftCardBalance) {
  let left = 0, right = prices.length - 1;
  
  while (left < right) {
    let currentCost = prices[left] + prices[right];
    if (currentCost === giftCardBalance) return [prices[left], prices[right]];
    if (currentCost < giftCardBalance) left++;
    else right--;
  }
  return null;
}`,
    codeExplanation: 'Because the catalog is sorted by price, we can put one finger on the cheapest item and one on the most expensive. If the total is too high, we move the right finger to a cheaper item. If it\'s too low, we move the left finger to a more expensive one.',
    diagram: `Prices = [$10, $20, $35, $50, $80], Balance = $100
L=$10, R=$80 -> Cost=$90 (Too cheap, L++)
L=$20, R=$80 -> Cost=$100 (Perfect Match!)`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Each pointer moves strictly inward, ensuring we scan the list only once. No extra arrays are created.',
    pros: ['Eliminates the need for a nested loop to check all pairs'],
    cons: ['Requires the array to be sorted first (which takes O(N log N))'],
    whenToUse: 'When dealing with sorted arrays or linked lists and you need to find pairs, triplets, or subarrays that satisfy a condition.',
    commonProblems: ['Two Sum II (sorted array)', '3Sum', 'Container With Most Water', 'Valid Palindrome'],
    pitfalls: ['Forgetting that the array MUST be sorted for many two-pointer problems', 'Infinite loops if pointers are not updated correctly'],
    mentalModel: 'Imagine two fingers scanning a line of text. They can start at opposite ends and move inward, or both start at the beginning. You move them based on what you are looking for (e.g., if the sum is too small, move the left finger right to get a bigger number).'
  },
  {
    id: 'sliding-window',
    name: '2. Sliding Window',
    summary: 'A technique used to perform operations on a specific window size. The window moves over the data one step at a time, avoiding redundant calculations.',
    realWorldProblem: 'E-Commerce: Find the highest revenue generated in any consecutive 3-day period.',
    code: `function maxRevenue3Days(sales) {
  let maxRev = 0, currentWindowRev = 0;
  for (let i = 0; i < 3; i++) currentWindowRev += sales[i];
  maxRev = currentWindowRev;
  
  for (let i = 3; i < sales.length; i++) {
    currentWindowRev += sales[i] - sales[i - 3];
    maxRev = Math.max(maxRev, currentWindowRev);
  }
  return maxRev;
}`,
    codeExplanation: 'Instead of recalculating the sum of 3 days over and over, we maintain a running total. When the window slides to the next day, we simply add the new day\'s sales and subtract the sales from the day that just dropped out of our 3-day window.',
    diagram: `Sales: [$200, $150, $500, $100]
Window 1: [$200, $150, $500] -> $850
Window 2: Drop $200, Add $100 -> [$150, $500, $100] -> $750`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'We iterate through the sales data exactly once. We only keep track of two variables (maxRev and currentWindowRev), resulting in constant space.',
    pros: ['Reduces nested loops from O(N^2) to O(N)', 'Extremely memory efficient'],
    cons: ['Only applicable to contiguous subarrays or sequences'],
    whenToUse: 'When you need to find the longest/shortest/optimal contiguous subarray or substring.',
    commonProblems: ['Longest Substring Without Repeating Characters', 'Maximum Sum Subarray of Size K', 'Minimum Window Substring'],
    pitfalls: ['Not shrinking the window correctly when the condition is violated', 'Off-by-one errors when calculating the window size (right - left + 1)'],
    mentalModel: 'Think of a picture frame sliding over a panoramic photo. You only see what\'s inside the frame. Instead of repainting the whole picture every time you move the frame, you just add what entered the frame on the right and remove what left on the left.'
  },
  {
    id: 'prefix-sum',
    name: '3. Prefix Sum',
    summary: 'Precomputing the cumulative sum of an array to answer range queries in O(1) time.',
    realWorldProblem: 'Game Development: Calculating the exact total damage a player took between Level 4 and Level 12 instantly, without iterating through the levels every time.',
    code: `class DamageTracker {
  constructor(damagePerLevel) {
    this.prefixSums = new Array(damagePerLevel.length + 1).fill(0);
    for (let i = 0; i < damagePerLevel.length; i++) {
      this.prefixSums[i + 1] = this.prefixSums[i] + damagePerLevel[i];
    }
  }
  getDamageRange(startLevel, endLevel) {
    return this.prefixSums[endLevel + 1] - this.prefixSums[startLevel];
  }
}`,
    codeExplanation: 'We pre-calculate the running total. If a player wants damage from level 4 to 12, we take the TOTAL damage they took from level 0 to 12, and subtract the TOTAL damage they took from level 0 to 3. This leaves only the damage from 4 to 12.',
    diagram: `Dmg/Level: [10, 20, 5, 15]
PrefixSums: [0, 10, 30, 35, 50]
Dmg taken from Lvl 1 to 2?
PrefixSums[3] - PrefixSums[1] -> 35 - 10 = 25!`,
    timeComplexity: 'O(1) query time (O(N) initialization)',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'Initialization takes O(N) to build the prefix array, but every single query after that takes O(1) constant time.',
    pros: ['Transforms O(N) repetitive calculations into instant O(1) lookups'],
    cons: ['Requires extra memory to store the prefix array', 'Array must be static'],
    whenToUse: 'When you have multiple queries asking for the sum of a contiguous subarray, or you need to compute cumulative sums.',
    commonProblems: ['Range Sum Query - Immutable', 'Subarray Sum Equals K', 'Product of Array Except Self'],
    pitfalls: ['Forgetting to initialize the prefix sum array with an extra 0 at the beginning to handle queries starting at index 0', 'Using it when the array is constantly being updated (use a Fenwick Tree or Segment Tree instead)'],
    mentalModel: 'Like a running bank account balance. If you want to know how much you spent between March and June, you take your total spending up to June and subtract your total spending up to February.'
  },
  {
    id: 'fast-slow-pointers',
    name: '4. Fast & Slow Pointers',
    summary: 'Two pointers moving at different speeds. Often used to detect cycles.',
    realWorldProblem: 'Network Routing: Detect if a network packet is trapped in an infinite routing loop between servers.',
    code: `function hasRoutingLoop(startRouter) {
  let slow = startRouter, fast = startRouter;
  while (fast !== null && fast.nextRouter !== null) {
    slow = slow.nextRouter;            // Moves 1 hop
    fast = fast.nextRouter.nextRouter; // Moves 2 hops
    if (slow === fast) return true; // Loop detected!
  }
  return false;
}`,
    codeExplanation: 'We simulate sending two diagnostic packets. One travels one hop at a time, the other travels two. If there is a circular routing error, the fast packet will continuously circle and eventually collide with the slow packet.',
    diagram: `A -> B -> C -> D
          ^    |
          |____| (Loop!)
Iter 1: Slow=A, Fast=A
Iter 2: Slow=B, Fast=C
Iter 3: Slow=C, Fast=C -> COLLISION!`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'In the worst case, the fast packet loops around the cycle once before catching the slow one. No historical data is stored.',
    pros: ['Detects infinite loops without storing a history of visited nodes'],
    cons: ['Only useful for cycle detection or finding the middle element'],
    whenToUse: 'When dealing with linked lists or cyclic arrays and you need to detect cycles, find the middle element, or find the start of a cycle.',
    commonProblems: ['Linked List Cycle', 'Find the Duplicate Number', 'Middle of the Linked List', 'Palindrome Linked List'],
    pitfalls: ['Not checking for null pointers (e.g., fast.next might be null before checking fast.next.next)', 'Incorrectly calculating the start of the cycle after a collision'],
    mentalModel: 'A track race where one runner is twice as fast as the other. If the track is a loop, the faster runner will eventually lap the slower runner. If it\'s a straight line, the faster runner will finish when the slower one is exactly halfway.'
  },

  // MEDIUM
  {
    id: 'cyclic-sort',
    name: '5. Cyclic Sort',
    summary: 'Placing numbers in an array within a known range into their exact index positions.',
    realWorldProblem: 'Warehouse Inventory: Find the missing box ID in a sequentially numbered shipment (1 to N) where boxes are entirely scrambled.',
    code: `function findMissingBox(boxes) {
  let i = 0;
  while (i < boxes.length) {
    let correctIndex = boxes[i] - 1; 
    if (boxes[i] > 0 && boxes[i] <= boxes.length && boxes[i] !== boxes[correctIndex]) {
      [boxes[i], boxes[correctIndex]] = [boxes[correctIndex], boxes[i]];
    } else {
      i++;
    }
  }
  for (i = 0; i < boxes.length; i++) {
    if (boxes[i] !== i + 1) return i + 1;
  }
  return boxes.length + 1;
}`,
    codeExplanation: 'Instead of doing a full generic sort, we use the fact that Box X belongs at index X-1. We simply pick up a box, look at its ID, and throw it into its correct slot, swapping out whatever was there. The first slot with the wrong box implies the correct box is missing.',
    diagram: `Shipment: [Box3, Box1, Box4, Missing(-1)]
Idx 0: Swap Box3 to Idx 2 -> [Box4, Box1, Box3, -1]
Idx 0: Swap Box4 to Idx 3 -> [-1, Box1, Box3, Box4]
Idx 1: Swap Box1 to Idx 0 -> [Box1, -1, Box3, Box4]
Scan: Idx 1 is missing Box2!`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Each box is swapped at most once into its correct position. We sort the array entirely in place, using zero extra memory.',
    pros: ['Achieves O(N) sort without extra memory', 'Perfect for finding missing/duplicate sequential data'],
    cons: ['Highly specific to range-bounded arrays'],
    whenToUse: 'When dealing with arrays containing numbers in a given range (e.g., 1 to N) and you need to find missing or duplicate numbers.',
    commonProblems: ['Missing Number', 'Find All Duplicates in an Array', 'First Missing Positive'],
    pitfalls: ['Forgetting that the correct index for number X is X - 1 (for 1 to N arrays)', 'Infinite loops if you swap a number with itself or if duplicates aren\'t handled properly'],
    mentalModel: 'Like a postman sorting mail into numbered P.O. boxes. You look at a letter, walk over to the P.O. box with that number, and swap it with whatever letter is currently sitting there. Repeat until every letter is in the right box.'
  },
  {
    id: 'in-place-reversal-ll',
    name: '6. In-place Reversal of a Linked List',
    summary: 'Reversing links between nodes of a linked list in a single pass without using extra memory.',
    realWorldProblem: 'Browser History: Reversing the chronological order of a forward-only navigation history chain so the user can traverse it backwards.',
    code: `function reverseHistory(oldestPage) {
  let prevPage = null, currentPage = oldestPage;
  while (currentPage !== null) {
    let nextPage = currentPage.next; 
    currentPage.next = prevPage;     
    prevPage = currentPage;
    currentPage = nextPage;
  }
  return prevPage;
}`,
    codeExplanation: 'We go page by page. For each page, we remember the next page, then instantly flip its "next" pointer to point to the page we just came from. We continue this until we reach the end.',
    diagram: `NULL <- Google   Facebook -> Amazon -> NULL
          ^        ^
         Prev     Curr
NULL <- Google <- Facebook   Amazon -> NULL
                   ^          ^
                  Prev       Curr`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'One pass through the history chain. No extra page objects are created.',
    pros: ['Very efficient memory usage', 'Never duplicates objects in memory'],
    cons: ['Requires careful pointer manipulation; easy to lose the rest of the list'],
    whenToUse: 'When you need to reverse the links between nodes of a linked list in a single pass without using extra memory.',
    commonProblems: ['Reverse Linked List', 'Reverse Linked List II', 'Palindrome Linked List', 'Reverse Nodes in k-Group'],
    pitfalls: ['Losing track of the "next" node before modifying the current node\'s pointer', 'Returning the wrong node as the new head (it should be the "prev" node)'],
    mentalModel: 'Imagine turning a line of one-way signs to face the opposite direction. You have to walk down the line, and at each sign, remember where the next sign is, turn the current sign around, and then step to the next sign.'
  },
  {
    id: 'bfs',
    name: '7. Tree Breadth-First Search (BFS)',
    summary: 'Traversing a tree level by level using a Queue.',
    realWorldProblem: 'Social Network: Finding all 1st-degree friends, then all 2nd-degree friends (friends of friends) of a user.',
    code: `function getConnectionsByDegree(userNode) {
  if (!userNode) return [];
  const result = [], queue = [userNode];
  let visited = new Set([userNode.id]);
  
  while (queue.length > 0) {
    let degreeSize = queue.length, currentDegree = [];
    for (let i = 0; i < degreeSize; i++) {
      let person = queue.shift();
      currentDegree.push(person.name);
      for (let friend of person.friends) {
        if (!visited.has(friend.id)) {
          visited.add(friend.id); queue.push(friend);
        }
      }
    }
    result.push(currentDegree);
  }
  return result;
}`,
    codeExplanation: 'We put the starting user in a queue. We then pop everyone in the queue, record them as the current "degree" of connection, and push all their unvisited friends into the queue for the next round.',
    diagram: `       You
      /   \\
   Alice  Bob   (1st Degree)
   /       \\
 Dave      Eve  (2nd Degree)
Q: [You] -> pop You, push Alice, Bob
Q: [Alice, Bob] -> pop both, push Dave, Eve`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    complexityExplanation: 'Visits every person (Vertex) and checks every friendship (Edge). The queue and visited set take up to O(V) space.',
    pros: ['Guarantees finding the shortest path between users', 'Explores connections evenly'],
    cons: ['Uses a lot of memory if a person has thousands of friends'],
    whenToUse: 'When finding the shortest path, searching level-by-level, or when you know the target is close to the starting node.',
    commonProblems: ['Binary Tree Level Order Traversal', 'Rotting Oranges', 'Word Ladder', 'Shortest Path in Binary Matrix'],
    pitfalls: ['Forgetting to use a queue (using a stack makes it DFS)', 'Not marking nodes as visited (in graphs) leading to infinite loops'],
    mentalModel: 'Like ripples spreading outward when you drop a stone in a pond. You explore all options 1 step away, then all options 2 steps away, etc. Or like networking at a party: talk to all your friends first, then talk to their friends.'
  },
  {
    id: 'dfs',
    name: '8. Tree Depth-First Search (DFS)',
    summary: 'Going as deep as possible down one path before backtracking.',
    realWorldProblem: 'File System Search: Searching for a specific file deeply nested inside folders and subfolders on a hard drive.',
    code: `function findFile(folder, targetFileName) {
  if (folder.type === 'file' && folder.name === targetFileName) {
    return folder.path;
  }
  if (folder.type === 'directory') {
    for (let item of folder.contents) {
      let result = findFile(item, targetFileName);
      if (result) return result; 
    }
  }
  return null; 
}`,
    codeExplanation: 'We open a folder and look at the first item. If it\'s another folder, we immediately open it and look inside. We keep diving deeper until we hit a dead end, then backtrack to the previous folder and try the next item.',
    diagram: `Root/
 ├─ Documents/
 │   ├─ Work/
 │   │   └─ target.txt (DFS dives straight here first!)
 │   └─ Personal/`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(D)',
    complexityExplanation: 'Visits every file. Space complexity is tied to the maximum Depth (D) of the nested folders due to the recursion stack.',
    pros: ['Very memory efficient for deep, narrow folder structures compared to BFS'],
    cons: ['Can cause a stack overflow if folder structures are insanely deep'],
    whenToUse: 'When you need to search deeply into a tree/graph, find all possible paths, or when memory is a concern (DFS uses less memory than BFS for wide trees).',
    commonProblems: ['Number of Islands', 'Lowest Common Ancestor of a Binary Tree', 'Path Sum', 'Word Search'],
    pitfalls: ['Stack overflow errors on extremely deep trees (if using recursion)', 'Failing to handle cyclic graphs by not keeping a "visited" set'],
    mentalModel: 'Like solving a maze by keeping your hand on the left wall. You go as deep as possible down one path until you hit a dead end, then you backtrack to the last intersection and try the next path.'
  },
  {
    id: 'modified-binary-search',
    name: '9. Modified Binary Search',
    summary: 'Finding elements in sorted or rotated arrays in O(log N) time.',
    realWorldProblem: 'Log Analysis System: Finding an error log at an exact timestamp in a massive database of chronologically sorted server logs without scanning every line.',
    code: `function findLogByTimestamp(logs, targetTime) {
  let left = 0, right = logs.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let logTime = logs[mid].timestamp;
    
    if (logTime === targetTime) return logs[mid];
    if (logTime < targetTime) left = mid + 1;
    else right = mid - 1;
  }
  return null;
}`,
    codeExplanation: 'Instead of reading millions of logs one by one, we jump to the exact middle of the database. Since logs are chronological, if the middle log is from 2PM and we want a log from 4PM, we can safely ignore the entire first half of the database.',
    diagram: `Database: [1PM, 2PM, 3PM, 4PM, 5PM, 6PM, 7PM]
Target: 6PM
Mid: 4PM. 6PM > 4PM, so discard left half!
Search Space: [5PM, 6PM, 7PM]
Mid: 6PM. Match! Found in 2 steps instead of 6.`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Halving the search space each step yields log N time. Iterative approach uses O(1) space.',
    pros: ['Can search databases of millions of items in a fraction of a millisecond'],
    cons: ['Strict prerequisite: data MUST be perfectly sorted'],
    whenToUse: 'When the input array is sorted (or partially sorted/rotated) and you need to find a target value or boundary efficiently (O(log N)).',
    commonProblems: ['Search in Rotated Sorted Array', 'Find Minimum in Rotated Sorted Array', 'Search a 2D Matrix', 'Find Peak Element'],
    pitfalls: ['Off-by-one errors in `while(left <= right)` vs `while(left < right)`', 'Calculating `mid` incorrectly, risking integer overflow (use `left + Math.floor((right - left) / 2)`)'],
    mentalModel: 'Like looking up a word in a physical dictionary. You don\'t read every page; you open it to the middle, see if the word comes before or after, and then rip the book in half, keeping only the relevant half.'
  },
  {
    id: 'merge-intervals',
    name: '10. Merge Intervals',
    summary: 'Sorting and merging overlapping segments/timespans.',
    realWorldProblem: 'Calendar App: Condense a user\'s messy, overlapping meeting schedule into clean blocks of "Busy" time.',
    code: `function mergeBusyTimes(meetings) {
  if (meetings.length < 2) return meetings;
  meetings.sort((a, b) => a.start - b.start);
  
  let busyBlocks = [meetings[0]];
  for (let i = 1; i < meetings.length; i++) {
    let currentBlock = busyBlocks[busyBlocks.length - 1];
    let nextMeeting = meetings[i];
    
    if (nextMeeting.start <= currentBlock.end) {
      currentBlock.end = Math.max(currentBlock.end, nextMeeting.end);
    } else {
      busyBlocks.push(nextMeeting);
    }
  }
  return busyBlocks;
}`,
    codeExplanation: 'First, we order all meetings chronologically. We take the first meeting, then look at the next. If the next meeting starts while we are still in the first one, we extend our "busy block" to encompass both. Otherwise, we start a new busy block.',
    diagram: `Meetings: {1pm-3pm}, {2pm-5pm}, {6pm-7pm}
Sorted: {1-3}, {2-5}, {6-7}
Compare {1-3} & {2-5}: Overlap! Merge to {1-5}
Compare {1-5} & {6-7}: No overlap. 
Result: Busy {1-5} and {6-7}`,
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'Sorting the meetings dominates the time complexity. Space complexity is O(N) to store the merged blocks array.',
    pros: ['Simplifies complex scheduling and overlapping resource allocations'],
    cons: ['Sorting step can be a bottleneck for massive datasets'],
    whenToUse: 'When dealing with overlapping intervals, scheduling, or merging timeframes.',
    commonProblems: ['Merge Intervals', 'Insert Interval', 'Non-overlapping Intervals', 'Meeting Rooms II'],
    pitfalls: ['Forgetting to sort the intervals based on their start times first', 'Incorrectly comparing the end time of the current merged interval with the start time of the next one'],
    mentalModel: 'Like laying down strips of tape on a line. If a new strip overlaps an existing one, they become one continuous, longer strip of tape.'
  },
  {
    id: 'trie',
    name: '11. Trie (Prefix Tree)',
    summary: 'A tree structure used to store strings, ideal for fast autocomplete.',
    realWorldProblem: 'Google Search Autocomplete: Instantly suggesting words as a user types "how to cook...", navigating millions of possibilities in milliseconds.',
    code: `class TrieNode {
  constructor() { this.chars = {}; this.isWord = false; }
}

class SearchAutocomplete {
  constructor() { this.root = new TrieNode(); }
  addSearchTerm(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.chars[char]) node.chars[char] = new TrieNode();
      node = node.chars[char]; 
    }
    node.isWord = true;
  }
  hasPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.chars[char]) return false;
      node = node.chars[char];
    }
    return true;
  }
}`,
    codeExplanation: 'Instead of searching an array of strings, we traverse a tree where each node is a letter. Typing "c-a-t" simply traverses down the "c", then "a", then "t" nodes. It instantly groups words with shared prefixes.',
    diagram: `Add "car" and "cat"
       (root)
         |
         c
         |
         a
        / \\
       r   t
      (W) (W)`,
    timeComplexity: 'O(L) where L is the word length',
    spaceComplexity: 'O(N * L)',
    complexityExplanation: 'Extremely fast O(L) time because you only do as many lookups as the word is long. Takes a lot of space because every letter is an object.',
    pros: ['O(L) lookup is drastically faster than Hash Maps for prefix matching'],
    cons: ['Extremely memory heavy for large datasets without compression techniques'],
    whenToUse: 'When you need to perform fast string matching, autocomplete, or prefix searches among a large set of strings.',
    commonProblems: ['Implement Trie (Prefix Tree)', 'Design Add and Search Words Data Structure', 'Word Search II'],
    pitfalls: ['Forgetting to mark the end of a valid word with a boolean flag `isWord`', 'High memory consumption if not optimized (every character creates a new node/object)'],
    mentalModel: 'Like a physical card catalog in a library or a file cabinet. You open the "A" drawer, then the "P" section, then "P", then "L", then "E".'
  },
  {
    id: 'top-k-elements',
    name: '12. Top K Elements',
    summary: 'Finding the top/most frequent items using a Heap.',
    realWorldProblem: 'Twitter Trending Topics: Finding the Top 10 most frequently used hashtags out of millions of tweets in the last hour.',
    code: `function getTrendingHashtags(tweets, k) {
  let frequencyMap = new Map();
  for (let tweet of tweets) {
    for (let tag of tweet.hashtags) {
      frequencyMap.set(tag, (frequencyMap.get(tag) || 0) + 1);
    }
  }
  
  // Using array sort to simulate Min-Heap behavior
  let trending = [...frequencyMap.keys()]
    .sort((a, b) => frequencyMap.get(b) - frequencyMap.get(a));
  
  return trending.slice(0, k);
}`,
    codeExplanation: 'We first count how many times each hashtag appears. Then, instead of sorting all millions of unique hashtags (which is slow), we use a Min-Heap of size 10. We push tags in, and if the heap grows past 10, we drop the least frequent one.',
    diagram: `Tags: #tech(5), #news(2), #sports(8)
Find Top 2:
Add #tech(5)  -> Heap: [#tech]
Add #news(2)  -> Heap: [#news, #tech]
Add #sports(8)-> Heap: [#news, #tech, #sports] -> Drop smallest (#news)
Heap: [#tech, #sports]`,
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'Counting takes O(N). Pushing into a heap of size K takes log K, done N times.',
    pros: ['Drastically faster than sorting the entire dataset, especially when K is very small'],
    cons: ['Requires extra memory for the frequency map'],
    whenToUse: 'When asked to find the top/smallest/most frequent K elements in an array or data stream.',
    commonProblems: ['Top K Frequent Elements', 'Kth Largest Element in an Array', 'Find K Pairs with Smallest Sums'],
    pitfalls: ['Using a Max-Heap to find the Top K largest elements (you should use a Min-Heap of size K instead!)', 'Sorting the entire array first, which takes O(N log N) instead of O(N log K)'],
    mentalModel: 'Like a VIP bouncer at a club that only fits K people. If the club is full and someone cooler (larger/more frequent) shows up, the least cool person inside gets kicked out.'
  },
  {
    id: 'subsets',
    name: '13. Subsets (Backtracking)',
    summary: 'Generating all possible combinations using Backtracking.',
    realWorldProblem: 'Pizza Customization App: Generating every single possible topping combination a customer could order given a list of available toppings.',
    code: `function generateToppingCombos(toppings) {
  let allCombos = [];
  function buildPizza(startIdx, currentPizza) {
    allCombos.push([...currentPizza]); 
    for (let i = startIdx; i < toppings.length; i++) {
      currentPizza.push(toppings[i]);
      buildPizza(i + 1, currentPizza);
      currentPizza.pop();
    }
  }
  buildPizza(0, []);
  return allCombos;
}`,
    codeExplanation: 'We start with a plain cheese pizza. We decide to add Pepperoni, then explore all combinations with Pepperoni. Then we "backtrack" (take the Pepperoni off) and explore combinations with Mushrooms instead.',
    diagram: `Toppings: [Pepperoni, Onion]
Plain Cheese []
 ├─ Add Pepperoni -> [Pepperoni]
 │   └─ Add Onion -> [Pepperoni, Onion]
 │   <- Remove Onion
 <- Remove Pepperoni
 └─ Add Onion -> [Onion]`,
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'For N toppings, there are 2^N possible pizzas. We spend O(N) time copying the array to save it.',
    pros: ['Generates exhaustive combinations reliably'],
    cons: ['Exponential time makes it crash if there are too many toppings (e.g. > 25)'],
    whenToUse: 'When asked to generate all combinations, permutations, or subsets of a given set, or exploring all paths in a decision tree.',
    commonProblems: ['Subsets', 'Permutations', 'Combination Sum', 'N-Queens'],
    pitfalls: ['Forgetting to "backtrack" (remove the last added element) before exploring the next branch', 'Not passing a copy of the current combination to the result array (passing by reference will cause all results to mutate)'],
    mentalModel: 'Like exploring a "Choose Your Own Adventure" book. You follow a path to the end, write down the ending, then flip back a few pages and make a different choice to see that ending.'
  },
  {
    id: 'topological-sort',
    name: '14. Topological Sort',
    summary: 'Finding a valid order of execution for tasks with dependencies.',
    realWorldProblem: 'Package Manager (npm/yarn): Figuring out the exact installation order of libraries so that dependencies are installed before the packages that rely on them.',
    code: `function installOrder(packages, dependencies) {
  let order = [], inDegree = new Map(), adjList = new Map();
  packages.forEach(pkg => { inDegree.set(pkg, 0); adjList.set(pkg, []); });
  
  dependencies.forEach(([pkg, dep]) => {
    adjList.get(dep).push(pkg); 
    inDegree.set(pkg, inDegree.get(pkg) + 1);
  });
  
  let queue = [];
  inDegree.forEach((count, pkg) => { if (count === 0) queue.push(pkg); }); 
  
  while (queue.length > 0) {
    let curr = queue.shift();
    order.push(curr); 
    adjList.get(curr).forEach(waitingPkg => {
      inDegree.set(waitingPkg, inDegree.get(waitingPkg) - 1);
      if (inDegree.get(waitingPkg) === 0) queue.push(waitingPkg);
    });
  }
  return order.length === packages.length ? order : "Circular Dependency Detected!";
}`,
    codeExplanation: 'We count how many things a package is waiting for (in-degree). Packages waiting for 0 things are installed first. When installed, we tell the packages waiting on them to subtract 1 from their wait count. If their wait count hits 0, they are next in line.',
    diagram: `React depends on JS. Redux depends on React.
JS(Wait:0) -> React(Wait:1) -> Redux(Wait:1)
Install JS. React wait -> 0.
Install React. Redux wait -> 0.
Install Redux. Order: JS, React, Redux.`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    complexityExplanation: 'We process every package (Vertex) and dependency link (Edge) exactly once.',
    pros: ['Automatically detects circular dependencies'],
    cons: ['Only works on Directed Acyclic Graphs (DAGs)'],
    whenToUse: 'When dealing with directed graphs representing dependencies (e.g., scheduling tasks, course prerequisites) and you need to find a valid order.',
    commonProblems: ['Course Schedule', 'Course Schedule II', 'Alien Dictionary'],
    pitfalls: ['Forgetting to check if a valid topological sort is even possible (e.g., if there\'s a cycle, the resulting order length won\'t match the total nodes)', 'Not keeping track of in-degrees correctly'],
    mentalModel: 'Like putting on clothes. You must put on socks before shoes, and underwear before pants. You look at all the clothes you can put on *right now* (0 prerequisites), put them on, and then check what new clothes that unlocks.'
  },

  // HARD
  {
    id: 'two-heaps',
    name: '15. Two Heaps',
    summary: 'Maintains a Max Heap and a Min Heap to instantly find the median of a stream.',
    realWorldProblem: 'Financial Dashboard: Real-time calculation of the median trading price of a stock during rapid market fluctuations.',
    code: `class RealTimeMedianPrice {
  constructor() {
    this.lowerHalf = new MaxHeap(); // Stores cheaper prices
    this.upperHalf = new MinHeap(); // Stores expensive prices
  }
  recordTradePrice(price) {
    if (this.lowerHalf.isEmpty() || price <= this.lowerHalf.peek()) {
      this.lowerHalf.push(price);
    } else {
      this.upperHalf.push(price);
    }
    
    // Balance heaps
    if (this.lowerHalf.size() > this.upperHalf.size() + 1)
      this.upperHalf.push(this.lowerHalf.pop());
    else if (this.lowerHalf.size() < this.upperHalf.size())
      this.lowerHalf.push(this.upperHalf.pop());
  }
  getMedianPrice() {
    if (this.lowerHalf.size() === this.upperHalf.size())
      return (this.lowerHalf.peek() + this.upperHalf.peek()) / 2;
    return this.lowerHalf.peek();
  }
}`,
    codeExplanation: 'We split all incoming trade prices into two piles: cheaper trades and expensive trades. By keeping the piles perfectly balanced in size, the median price is always sitting right at the top of the piles.',
    diagram: `Prices: [$50, $40, $60, $55]
1. $50 -> Lower[$50], Upper[]
2. $40 -> Lower[$40, $50] -> rebalance -> Lower[$40], Upper[$50]
3. $60 -> Lower[$40], Upper[$50, $60] -> rebalance -> Lower[$50, $40], Upper[$60]
Median: Top of Lower ($50)`,
    timeComplexity: 'O(log N) insert, O(1) find',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'Pushing to heaps takes log N time. Finding the median is instant O(1).',
    pros: ['Instant O(1) access to the median of an infinitely growing stream of data'],
    cons: ['Heaps are not natively built into JavaScript, requiring custom implementations'],
    whenToUse: 'When you need to dynamically find the median of a stream of numbers.',
    commonProblems: ['Find Median from Data Stream', 'Sliding Window Median', 'IPO'],
    pitfalls: ['Forgetting to rebalance the heaps when their size difference exceeds 1', 'Not handling cases where the total number of elements is even versus odd properly'],
    mentalModel: 'Like balancing a seesaw. You put the lighter half of the kids on the left side (Max-Heap) and the heavier half on the right side (Min-Heap). The two kids closest to the middle (top of the heaps) are your medians.'
  },
  {
    id: 'k-way-merge',
    name: '16. K-way Merge',
    summary: 'Merging K sorted arrays efficiently.',
    realWorldProblem: 'Uber/Lyft Driver Matching: Merging ETA-sorted lists of available drivers from 5 different geographical zones into one unified sorted list for the rider.',
    code: `// Conceptual MinHeap Implementation
function mergeDriverLists(zones) {
  let unifiedDrivers = [], minHeap = new MinHeap(); 
  
  for (let i = 0; i < zones.length; i++) {
    if (zones[i].length > 0) {
      minHeap.push({ driver: zones[i][0], zoneIdx: i, driverIdx: 0 });
    }
  }
  
  while (!minHeap.isEmpty()) {
    let closest = minHeap.pop();
    unifiedDrivers.push(closest.driver);
    
    let nextIdx = closest.driverIdx + 1;
    if (nextIdx < zones[closest.zoneIdx].length) {
      minHeap.push({ driver: zones[closest.zoneIdx][nextIdx], zoneIdx: closest.zoneIdx, driverIdx: nextIdx });
    }
  }
  return unifiedDrivers;
}`,
    codeExplanation: 'Instead of merging the massive lists all at once, we just take the absolute closest driver from each zone and put them in a tiny Min-Heap. We pull the winner, then replace them with the NEXT driver from their specific zone.',
    diagram: `Zone 1: [2min, 5min]
Zone 2: [1min, 8min]
Heap: [1min(Z2), 2min(Z1)]
Pop 1min -> Unified: [1min]
Push Z2's next -> Heap: [2min(Z1), 8min(Z2)]
Pop 2min -> Unified: [1min, 2min]...`,
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    complexityExplanation: 'N is total drivers. Heap size is never more than K (zones). Extract/Insert takes log K.',
    pros: ['Incredibly efficient for streaming data or massive distributed datasets'],
    cons: ['Overhead is high if K is very small'],
    whenToUse: 'When you need to merge K sorted arrays/linked lists into one sorted list.',
    commonProblems: ['Merge k Sorted Lists', 'Kth Smallest Element in a Sorted Matrix', 'Smallest Range Covering Elements from K Lists'],
    pitfalls: ['Pushing all elements into the heap at once instead of just the first element from each list', 'Forgetting to keep track of which list the popped element came from so you can push the next one'],
    mentalModel: 'Like merging multiple lines of cars into a single lane. You look at the front car of every line, let the fastest one go, and then look at the new front car of that specific line.'
  },
  {
    id: 'monotonic-stack',
    name: '17. Monotonic Stack',
    summary: 'A stack whose elements are strictly increasing or decreasing. Solves "next greater element" problems.',
    realWorldProblem: 'Stock Market Analytics: For every day in the market, find out how many days a trader has to wait until the stock price is strictly higher than today.',
    code: `function daysUntilHigherPrice(prices) {
  let waitDays = Array(prices.length).fill(0);
  let stack = []; 
  
  for (let today = 0; today < prices.length; today++) {
    while (stack.length > 0 && prices[today] > prices[stack[stack.length - 1]]) {
      let pastDay = stack.pop(); 
      waitDays[pastDay] = today - pastDay; 
    }
    stack.push(today); 
  }
  return waitDays;
}`,
    codeExplanation: 'We push days onto a stack. If we see a huge price spike today, we look at the stack and immediately resolve all the previous days that were waiting for a price this high.',
    diagram: `Prices: [$100, $95, $90, $110]
Day 0: push 0 ($100)
Day 1: push 1 ($95)
Day 2: push 2 ($90)
Day 3: $110! > $90(pop 2). > $95(pop 1). > $100(pop 0).
Result: waitDays = [3, 2, 1, 0]`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'Every day is pushed to the stack exactly once and popped exactly once. O(N) instead of O(N^2).',
    pros: ['Transforms terrible O(N^2) nested loop algorithms into hyper-efficient O(N) ones'],
    cons: ['Very tricky to logic out when to pop versus push during an interview'],
    whenToUse: 'When you need to find the "next greater" or "next smaller" element for every item in an array in O(N) time.',
    commonProblems: ['Daily Temperatures', 'Next Greater Element I', 'Largest Rectangle in Histogram', 'Trapping Rain Water'],
    pitfalls: ['Pushing the actual value to the stack instead of its index (pushing indices is usually much more useful)', 'Confusing when to use a strictly increasing vs strictly decreasing stack'],
    mentalModel: 'Like standing in a line of people and looking forward. A tall person (high value) will block your view of everyone shorter behind them. The stack keeps track of people whose view hasn\'t been blocked yet.'
  },
  {
    id: 'union-find',
    name: '18. Disjoint Set (Union-Find)',
    summary: 'Tracks a set of elements partitioned into disjoint subsets. Great for graph connectivity.',
    realWorldProblem: 'Social Network Connectivity: Determining if two users are indirectly connected through mutual friends, or finding isolated "cliques" in the network.',
    code: `class UserNetwork {
  constructor(totalUsers) {
    this.boss = Array.from({length: totalUsers}, (_, i) => i); 
  }
  findSupremeBoss(user) {
    if (this.boss[user] === user) return user;
    // Path Compression
    return this.boss[user] = this.findSupremeBoss(this.boss[user]);
  }
  makeFriends(userA, userB) {
    let bossA = this.findSupremeBoss(userA);
    let bossB = this.findSupremeBoss(userB);
    if (bossA !== bossB) this.boss[bossA] = bossB;
  }
  areConnected(userA, userB) {
    return this.findSupremeBoss(userA) === this.findSupremeBoss(userB);
  }
}`,
    codeExplanation: 'Imagine every group of friends has a designated "leader". When two people become friends, their leaders shake hands, and one leader submits to the other, merging the two groups. To check if two people are connected, just ask if they ultimately report to the same leader.',
    diagram: `Users: 1, 2, 3
makeFriends(1, 2): 1 reports to 2.
makeFriends(2, 3): 2 reports to 3.
areConnected(1, 3)?
Find(1) follows chain to 3. Find(3) is 3. 
Match! Yes.`,
    timeComplexity: 'O(α(N)) ≈ O(1)',
    spaceComplexity: 'O(N)',
    complexityExplanation: 'Path compression flattens the hierarchy tree so much that lookups take almost constant time.',
    pros: ['The absolute fastest way to check connectivity or cycles in undirected graphs'],
    cons: ['Cannot easily handle "unfriending" (removing edges is difficult)'],
    whenToUse: 'When you need to determine if two elements belong to the same group/set, or find the number of connected components in an undirected graph.',
    commonProblems: ['Number of Connected Components in an Undirected Graph', 'Redundant Connection', 'Accounts Merge'],
    pitfalls: ['Forgetting to implement "Path Compression" in the find method, which makes it incredibly fast', 'Not using "Union by Rank/Size", though path compression alone is usually enough'],
    mentalModel: 'Like tracking corporate acquisitions. If Company A buys Company B, Company B\'s CEO now reports to A. If you want to know if two employees work for the same parent company, you just follow the chain of bosses to the top.'
  },
  {
    id: '01-knapsack',
    name: '19. 0/1 Knapsack (DP)',
    summary: 'Selecting items to maximize value without exceeding capacity.',
    realWorldProblem: 'Cloud Computing: Packing tasks onto a virtual machine (VM). Each task has a RAM cost and a Priority Value. Maximize the priority without crashing the VM.',
    code: `function maxVMPriority(tasks, maxRAM) {
  let dp = Array(maxRAM + 1).fill(0);
  for (let i = 0; i < tasks.length; i++) {
    let taskRAM = tasks[i].ram;
    let taskPriority = tasks[i].priority;
    for (let currentRam = maxRAM; currentRam >= taskRAM; currentRam--) {
      dp[currentRam] = Math.max(
        dp[currentRam], 
        taskPriority + dp[currentRam - taskRAM]
      );
    }
  }
  return dp[maxRAM];
}`,
    codeExplanation: 'We create an array representing RAM sizes from 0 to Max. For each task, we check if adding it to a previous optimal configuration gives us a higher total priority than what we currently have.',
    diagram: `Tasks: T1(2GB, Val:10), T2(3GB, Val:15). MaxRAM: 5GB
RAM: 0  1   2   3   4   5
T1 : 0  0  10  10  10  10
T2 : 0  0  10  15  15  25
At 5GB, optimal is T1+T2 = 25.`,
    timeComplexity: 'O(N * Capacity)',
    spaceComplexity: 'O(Capacity)',
    complexityExplanation: 'We iterate over the capacity array for every single task. A 1D array keeps memory low.',
    pros: ['Solves complex resource allocation optimization perfectly'],
    cons: ['Slows down dramatically if the capacity number is extremely high'],
    whenToUse: 'When you are given a set of items, each with a weight and a value, and you need to determine the maximum value you can carry within a specific weight limit.',
    commonProblems: ['Partition Equal Subset Sum', 'Target Sum', 'Ones and Zeroes'],
    pitfalls: ['Iterating the capacity array forwards instead of backwards when using a 1D DP array (which accidentally reuses the same item multiple times)', 'Not identifying the "capacity" and the "items" correctly from the problem description'],
    mentalModel: 'Like a burglar packing a bag with a strict weight limit. For every valuable item, you ask: "If I put this in my bag, will it force me to drop something else? Is the trade-off worth it?"'
  },
  {
    id: 'sliding-window-max',
    name: '20. Sliding Window Maximum',
    summary: 'Finding the max element in a sliding window in O(N) time using a Deque.',
    realWorldProblem: 'Video Streaming Buffer: Finding the maximum network latency spike that occurred in the last 10 seconds of a livestream buffer to adjust video quality.',
    code: `function maxLatencyInWindows(latencies, windowSize) {
  let deque = [], result = [];
  for (let i = 0; i < latencies.length; i++) {
    if (deque.length && deque[0] < i - windowSize + 1) deque.shift();
    while (deque.length && latencies[deque[deque.length - 1]] < latencies[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= windowSize - 1) result.push(latencies[deque[0]]);
  }
  return result;
}`,
    codeExplanation: 'We use a queue to store indices. If a new, massive latency spike occurs, we delete all smaller past spikes from our queue because they can never be the maximum anymore. The highest spike in our window is always safely sitting at the front of the queue.',
    diagram: `Latencies: [20ms, 50ms, 10ms, 5ms], Win=2
i=0 (20): DQ=[0(20ms)]
i=1 (50): 50 > 20. Pop 0. DQ=[1(50ms)] -> Max: 50
i=2 (10): 10 < 50. Push 2. DQ=[1(50ms), 2(10ms)] -> Max: 50
i=3  (5): DQ[0] is out of bounds! Shift. DQ=[2(10ms), 3(5ms)] -> Max: 10`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    complexityExplanation: 'Every latency is added and removed from the deque at most once. Deque size is bounded by window size K.',
    pros: ['Astoundingly fast O(N) optimization for a problem that natively requires O(N*K)'],
    cons: ['Extremely complex logic to visualize and implement correctly under interview pressure'],
    whenToUse: 'When you need to find the maximum (or minimum) element in every sliding window of size K in O(N) time.',
    commonProblems: ['Sliding Window Maximum', 'Constrained Subsequence Sum', 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit'],
    pitfalls: ['Pushing actual values into the deque instead of indices (you need indices to know when an element falls out of the window)', 'Not maintaining the monotonic decreasing property of the deque properly'],
    mentalModel: 'Like a king\'s court. The oldest person (front of queue) is the current king. If a young, stronger person (larger value) arrives, they kick out all the weak people in front of them. When the king gets too old (falls out of the window), they step down.'
  },
];