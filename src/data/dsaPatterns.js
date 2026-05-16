export const dsaPatterns = [
  // EASY
  {
    id: 'two-pointers',
    name: '1. Two Pointers',
    summary: 'Iterating through a data structure with two pointers (usually left and right) to search for pairs or optimize space/time.',
    leetcodeQuestions: [
      {
        id: 167,
        title: 'Two Sum II - Input Array Is Sorted',
        level: 'Easy',
        question: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
        answer: 'Place a left pointer at the start and a right pointer at the end. Calculate the sum. If the sum is too small, move the left pointer right. If too large, move the right pointer left. Continue until the pointers cross.',
        testCases: [
          { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' },
          { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' }
        ]
      },
      {
        id: 15,
        title: '3Sum',
        level: 'Medium',
        question: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
        answer: 'First, sort the array. Then iterate through each element. For each element, use the Two Pointer technique on the remaining array to find pairs that sum to the negative of the current element. Be sure to skip duplicate elements to avoid duplicate triplets.',
        testCases: [
          { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
          { input: 'nums = [0,1,1]', output: '[]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Using two nested loops to check every possible pair of elements in the array.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Imagine two fingers scanning a line of text. They can start at opposite ends and move inward, or both start at the beginning. You move them based on what you are looking for (e.g., if the sum is too small, move the left finger right to get a bigger number).',
    reference: { name: 'GeeksforGeeks: Two Pointers Technique', url: 'https://www.geeksforgeeks.org/two-pointers-technique/' },
    mermaidCode: `graph LR
    A[Array] --> L(Left Pointer)
    A --> R(Right Pointer)
    L -->|Moves Right| M{Condition}
    R -->|Moves Left| M
    style L fill:#bbf,stroke:#333
    style R fill:#fbb,stroke:#333`
  },
  {
    id: 'sliding-window',
    name: '2. Sliding Window',
    summary: 'A technique used to perform operations on a specific window size. The window moves over the data one step at a time, avoiding redundant calculations.',
    leetcodeQuestions: [
      {
        id: 643,
        title: 'Maximum Average Subarray I',
        level: 'Easy',
        question: 'You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value.',
        answer: 'Calculate the sum of the first K elements. Then, slide the window by one element at a time: subtract the element leaving the window and add the new element entering the window. Keep track of the maximum sum seen.',
        testCases: [
          { input: 'nums = [1,12,-5,-6,50,3], k = 4', output: '12.75000' },
          { input: 'nums = [5], k = 1', output: '5.00000' }
        ]
      },
      {
        id: 3,
        title: 'Longest Substring Without Repeating Characters',
        level: 'Medium',
        question: 'Given a string s, find the length of the longest substring without repeating characters.',
        answer: 'Use a dynamic sliding window with a HashMap to track characters and their indices. Expand the window to the right. If a duplicate character is found, shrink the window from the left until the duplicate is removed, updating the max length at each step.',
        testCases: [
          { input: 's = "abcabcbb"', output: '3' },
          { input: 's = "pwwkew"', output: '3' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Using nested loops to compute the sum or condition for every possible contiguous subarray from scratch.',
      timeComplexity: 'O(N^2) or O(N^3)',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Think of a picture frame sliding over a panoramic photo. You only see what\'s inside the frame. Instead of repainting the whole picture every time you move the frame, you just add what entered the frame on the right and remove what left on the left.',
    reference: { name: 'GeeksforGeeks: Sliding Window', url: 'https://www.geeksforgeeks.org/window-sliding-technique/' },
    mermaidCode: `graph LR
    A[Data Stream/Array] --> W{Window}
    W -->|Expand Right| In(Add to Window)
    W -->|Shrink Left| Out(Remove from Window)
    style W fill:#bfb,stroke:#333`
  },
  {
    id: 'prefix-sum',
    name: '3. Prefix Sum',
    summary: 'Precomputing the cumulative sum of an array to answer range queries in O(1) time.',
    leetcodeQuestions: [
      {
        id: 303,
        title: 'Range Sum Query - Immutable',
        level: 'Easy',
        question: 'Given an integer array nums, handle multiple queries of the following type: Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.',
        answer: 'Precompute a prefix sum array where prefix[k] stores the sum of elements from index 0 to k-1. To find the sum between i and j in O(1) time, calculate prefix[j+1] - prefix[i].',
        testCases: [
          { input: '["NumArray", "sumRange", "sumRange"]\n[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5]]', output: '[null, 1, -1]' }
        ]
      },
      {
        id: 560,
        title: 'Subarray Sum Equals K',
        level: 'Medium',
        question: 'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.',
        answer: 'Keep a running sum while iterating. Use a HashMap to store the frequency of all seen running sums. At each step, check if (running sum - k) exists in the map. If it does, it means a subarray ending at the current index has a sum of k. Add the frequency to your total count.',
        testCases: [
          { input: 'nums = [1,1,1], k = 2', output: '2' },
          { input: 'nums = [1,2,3], k = 3', output: '2' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Iterating from index i to index j and summing the elements every single time a query is made.',
      timeComplexity: 'O(N) per query, O(N * Q) for Q queries',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Like a running bank account balance. If you want to know how much you spent between March and June, you take your total spending up to June and subtract your total spending up to February.',
    reference: { name: 'USACO Guide: Prefix Sums', url: 'https://usaco.guide/silver/prefix-sums' },
    mermaidCode: `graph TD
    A[Original Array: 1, 2, 3] --> B[Prefix Sum Array: 1, 3, 6]
    B --> C{Sum of Range i to j}
    C -->|Calculation| D(Prefix[j] - Prefix[i-1])`
  },
  {
    id: 'fast-slow-pointers',
    name: '4. Fast & Slow Pointers',
    summary: 'Two pointers moving at different speeds. Often used to detect cycles.',
    leetcodeQuestions: [
      {
        id: 141,
        title: 'Linked List Cycle',
        level: 'Easy',
        question: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
        answer: 'Initialize a slow pointer moving 1 step and a fast pointer moving 2 steps. If there is a cycle, the fast pointer will eventually lap and meet the slow pointer. If the fast pointer reaches null, there is no cycle.',
        testCases: [
          { input: 'head = [3,2,0,-4], pos = 1 (cycle exists)', output: 'true' },
          { input: 'head = [1], pos = -1 (no cycle)', output: 'false' }
        ]
      },
      {
        id: 142,
        title: 'Linked List Cycle II',
        level: 'Medium',
        question: 'Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.',
        answer: 'First, use fast and slow pointers to detect the cycle. Once they meet, reset the slow pointer to the head of the list. Move both pointers one step at a time. The node where they meet next is exactly the start of the cycle (based on Floyd\'s cycle-finding algorithm math).',
        testCases: [
          { input: 'head = [3,2,0,-4], pos = 1', output: 'tail connects to node index 1' },
          { input: 'head = [1,2], pos = 0', output: 'tail connects to node index 0' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Keeping track of every visited node in a HashSet to see if you encounter a node you have already seen.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)'
    },
    mentalModel: 'A track race where one runner is twice as fast as the other. If the track is a loop, the faster runner will eventually lap the slower runner. If it\'s a straight line, the faster runner will finish when the slower one is exactly halfway.',
    reference: { name: 'Educative: Fast & Slow Pointers', url: 'https://www.educative.io/courses/grokking-the-coding-interview/fast-and-slow-pointers' },
    mermaidCode: `graph LR
    A((Start)) --> S(Slow: 1 step)
    A --> F(Fast: 2 steps)
    S --> C{Cycle?}
    F --> C
    C -->|Yes| Col((Collision!))
    style Col fill:#f99,stroke:#333`
  },

  // MEDIUM
  {
    id: 'cyclic-sort',
    name: '5. Cyclic Sort',
    summary: 'Placing numbers in an array within a known range into their exact index positions.',
    leetcodeQuestions: [
      {
        id: 268,
        title: 'Missing Number',
        level: 'Easy',
        question: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
        answer: 'Since numbers are exactly from 0 to N, we can place each number at its corresponding index (number `i` goes to index `i`). Then scan the array; the first index that doesn\'t match its value is the missing number.',
        testCases: [
          { input: 'nums = [3,0,1]', output: '2' },
          { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
        ]
      },
      {
        id: 41,
        title: 'First Missing Positive',
        level: 'Hard',
        question: 'Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.',
        answer: 'Ignore negatives and numbers larger than the array size. For valid numbers, swap them into their correct 0-indexed positions (e.g., number 1 goes to index 0, number 5 goes to index 4). Scan the array to find the first index that doesn\'t hold the correct number.',
        testCases: [
          { input: 'nums = [1,2,0]', output: '3' },
          { input: 'nums = [3,4,-1,1]', output: '2' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Using a standard sorting algorithm like Quicksort or Mergesort to sort the array first.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(1) to O(N)'
    },
    mentalModel: 'Like a postman sorting mail into numbered P.O. boxes. You look at a letter, walk over to the P.O. box with that number, and swap it with whatever letter is currently sitting there. Repeat until every letter is in the right box.',
    reference: { name: 'Educative: Cyclic Sort', url: 'https://www.educative.io/courses/grokking-the-coding-interview/cyclic-sort' },
    mermaidCode: `graph TD
    A[Box 3 at Index 0] -->|Swap to Index 2| B[Box 4 at Index 0]
    B -->|Swap to Index 3| C[Box 1 at Index 0]
    C -->|Swap to Index 0| D[Correct Position!]`
  },
  {
    id: 'in-place-reversal-ll',
    name: '6. In-place Reversal of a Linked List',
    summary: 'Reversing links between nodes of a linked list in a single pass without using extra memory.',
    leetcodeQuestions: [
      {
        id: 206,
        title: 'Reverse Linked List',
        level: 'Easy',
        question: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        answer: 'Maintain three pointers: `prev` (initially null), `current` (head), and `next`. Iterate through the list, temporarily storing `current.next`, then updating `current.next` to point backwards to `prev`. Move `prev` and `current` one step forward.',
        testCases: [
          { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
          { input: 'head = [1,2]', output: '[2,1]' }
        ]
      },
      {
        id: 25,
        title: 'Reverse Nodes in k-Group',
        level: 'Hard',
        question: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.',
        answer: 'Count the nodes to see if there are at least k nodes left. If so, reverse just those k nodes using the standard in-place reversal logic. Keep track of the `tail` of the newly reversed section to connect it to the recursive call or the next k-group.',
        testCases: [
          { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
          { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Storing all the values of the linked list in an array, reversing the array, and then creating a brand new linked list.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N) - Extra space for the array'
    },
    mentalModel: 'Imagine turning a line of one-way signs to face the opposite direction. You have to walk down the line, and at each sign, remember where the next sign is, turn the current sign around, and then step to the next sign.',
    reference: { name: 'Educative: In-place Reversal of a Linked List', url: 'https://www.educative.io/courses/grokking-the-coding-interview/in-place-reversal-of-a-linked-list' },
    mermaidCode: `graph LR
    P[Prev] -->|Null initially| C[Current]
    C -->|Points to| N[Next]
    C -.->|New Link| P
    P -.->|Moves to| C
    C -.->|Moves to| N`
  },
  {
    id: 'bfs',
    name: '7. Tree Breadth-First Search (BFS)',
    summary: 'Traversing a tree level by level using a Queue.',
    leetcodeQuestions: [
      {
        id: 102,
        title: 'Binary Tree Level Order Traversal',
        level: 'Medium',
        question: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
        answer: 'Use a Queue. Start by pushing the root. In a while loop, check the queue\'s size (this is the number of nodes in the current level). Loop exactly that many times, popping a node, saving its value, and pushing its children. This isolates values by level.',
        testCases: [
          { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
          { input: 'root = [1]', output: '[[1]]' }
        ]
      },
      {
        id: 994,
        title: 'Rotting Oranges',
        level: 'Medium',
        question: 'You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange.',
        answer: 'This is a multi-source BFS problem. Initially, push all rotten oranges into the queue and count fresh oranges. In a loop, pop rotten oranges, rot their fresh neighbors, push the newly rotten ones to the queue, and decrement the fresh count. Keep track of minutes.',
        testCases: [
          { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
          { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1 (not all oranges can rot)' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Trying to find the shortest path by randomly walking through the graph or using DFS, which might explore extremely long useless paths first.',
      timeComplexity: 'O(V!) in worst case (without tracking visited)',
      spaceComplexity: 'O(V)'
    },
    mentalModel: 'Like ripples spreading outward when you drop a stone in a pond. You explore all options 1 step away, then all options 2 steps away, etc. Or like networking at a party: talk to all your friends first, then talk to their friends.',
    reference: { name: 'GeeksforGeeks: Level Order Traversal', url: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' },
    mermaidCode: `graph TD
    A[Start Node] --> B[Level 1]
    A --> C[Level 1]
    B --> D[Level 2]
    C --> E[Level 2]
    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#bbf,stroke:#333`
  },
  {
    id: 'dfs',
    name: '8. Tree Depth-First Search (DFS)',
    summary: 'Going as deep as possible down one path before backtracking.',
    leetcodeQuestions: [
      {
        id: 112,
        title: 'Path Sum',
        level: 'Easy',
        question: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
        answer: 'Use recursive DFS. Subtract the current node\'s value from targetSum. If the node is a leaf, check if the remaining targetSum equals 0. Otherwise, recursively call DFS on the left and right children.',
        testCases: [
          { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true' },
          { input: 'root = [1,2,3], targetSum = 5', output: 'false' }
        ]
      },
      {
        id: 79,
        title: 'Word Search',
        level: 'Medium',
        question: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
        answer: 'Iterate through every cell. If a cell matches the first letter, trigger a recursive DFS. The DFS should check boundaries, track visited cells (by temporarily altering the cell value to `#`), and check all 4 directions for the next letter in the word. Backtrack by restoring the cell value.',
        testCases: [
          { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
          { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Randomly jumping between nodes without a systematic stack or recursion tracking, risking missing nodes or getting stuck in loops.',
      timeComplexity: 'O(V + E) but functionally worse if disorganized',
      spaceComplexity: 'O(V)'
    },
    mentalModel: 'Like solving a maze by keeping your hand on the left wall. You go as deep as possible down one path until you hit a dead end, then you backtrack to the last intersection and try the next path.',
    reference: { name: 'GeeksforGeeks: DFS Traversal', url: 'https://www.geeksforgeeks.org/dfs-traversal-of-a-tree-using-recursion/' },
    mermaidCode: `graph TD
    A[Root] -->|1| B[Child 1]
    B -->|2| C[Grandchild 1]
    C -.->|Backtrack| B
    B -->|3| D[Grandchild 2]
    A -->|4| E[Child 2]`
  },
  {
    id: 'modified-binary-search',
    name: '9. Modified Binary Search',
    summary: 'Finding elements in sorted or rotated arrays in O(log N) time.',
    leetcodeQuestions: [
      {
        id: 34,
        title: 'Find First and Last Position of Element in Sorted Array',
        level: 'Medium',
        question: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.',
        answer: 'Run Binary Search twice. The first time, when you find the target, don\'t stop—instead, narrow the search to the left half to find the absolute first occurrence. The second time, narrow the search to the right half to find the last occurrence.',
        testCases: [
          { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' },
          { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]' }
        ]
      },
      {
        id: 33,
        title: 'Search in Rotated Sorted Array',
        level: 'Medium',
        question: 'Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
        answer: 'In a rotated sorted array, one half is ALWAYS strictly sorted. Find the mid point. Check if the left half is perfectly sorted. If it is, check if the target falls within the left half\'s range. If so, search left; else, search right. Repeat this logic.',
        testCases: [
          { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
          { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Scanning the array element by element from left to right (Linear Search) until you find the target.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Like looking up a word in a physical dictionary. You don\'t read every page; you open it to the middle, see if the word comes before or after, and then rip the book in half, keeping only the relevant half.',
    reference: { name: 'TopCoder: Binary Search Tutorial', url: 'https://www.topcoder.com/thrive/articles/Binary%20Search' },
    mermaidCode: `graph TD
    A[Sorted Array] --> M{Midpoint}
    M -->|Target > Mid| R[Search Right Half]
    M -->|Target < Mid| L[Search Left Half]
    M -->|Target == Mid| F((Found!))`
  },
  {
    id: 'merge-intervals',
    name: '10. Merge Intervals',
    summary: 'Sorting and merging overlapping segments/timespans.',
    leetcodeQuestions: [
      {
        id: 56,
        title: 'Merge Intervals',
        level: 'Medium',
        question: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
        answer: 'First, sort the intervals based on the start time. Create an output array. Iterate through the intervals, and if the current interval\'s start time is less than or equal to the previous interval\'s end time, merge them by taking the maximum end time.',
        testCases: [
          { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
          { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
        ]
      },
      {
        id: 253,
        title: 'Meeting Rooms II',
        level: 'Medium',
        question: 'Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.',
        answer: 'Extract all start times and all end times into two separate arrays, and sort both independently. Use two pointers: one for starts, one for ends. Iterate through starts. If a start time is before the current end time, you need a new room. If it\'s after, a room just freed up (move the end pointer).',
        testCases: [
          { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' },
          { input: 'intervals = [[7,10],[2,4]]', output: '1' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'For each interval, check every other interval to see if they overlap, merge them if they do, and repeat until no more merges can happen.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Like laying down strips of tape on a line. If a new strip overlaps an existing one, they become one continuous, longer strip of tape.',
    reference: { name: 'Educative: Merge Intervals', url: 'https://www.educative.io/courses/grokking-the-coding-interview/merge-intervals' },
    mermaidCode: `graph TD
    A[Interval 1] -->|Overlaps| B[Interval 2]
    B --> C{Merge}
    C --> D[New Interval: Min Start, Max End]
    A2[Interval 3] -->|No Overlap| C2[Keep Separate]`
  },
  {
    id: 'trie',
    name: '11. Trie (Prefix Tree)',
    summary: 'A tree structure used to store strings, ideal for fast autocomplete.',
    leetcodeQuestions: [
      {
        id: 208,
        title: 'Implement Trie (Prefix Tree)',
        level: 'Medium',
        question: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class.',
        answer: 'Create a TrieNode class with a Hash Map for children and a boolean `isWord`. For insert, traverse/create nodes for each char. For search, traverse and check if the last node has `isWord == true`. For startsWith, just ensure the traversal doesn\'t hit a null node.',
        testCases: [
          { input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]', output: '[null, null, true, false, true, null, true]' }
        ]
      },
      {
        id: 212,
        title: 'Word Search II',
        level: 'Hard',
        question: 'Given an m x n board of characters and a list of strings words, return all words on the board.',
        answer: 'Insert all words into a Trie. Iterate through each cell on the board. If the cell\'s character exists in the Trie\'s root, start a DFS. Pass the current TrieNode along the DFS to instantly know if the current path forms a valid prefix or a complete word.',
        testCases: [
          { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
          { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Storing all strings in a list and doing a linear scan using string matching (e.g. `startsWith()`) for every prefix query.',
      timeComplexity: 'O(N * M) where N is number of words, M is max word length',
      spaceComplexity: 'O(N * M)'
    },
    mentalModel: 'Like a physical card catalog in a library or a file cabinet. You open the "A" drawer, then the "P" section, then "P", then "L", then "E".',
    reference: { name: 'Toptal: The Trie Data Structure', url: 'https://www.toptal.com/java/the-trie-a-neglected-data-structure' },
    mermaidCode: `graph TD
    Root(( )) --> C(c)
    C --> A(a)
    A --> R(r)
    A --> T(t)
    style R fill:#bfb,stroke:#333
    style T fill:#bfb,stroke:#333`
  },
  {
    id: 'top-k-elements',
    name: '12. Top K Elements',
    summary: 'Finding the top/most frequent items using a Heap.',
    leetcodeQuestions: [
      {
        id: 347,
        title: 'Top K Frequent Elements',
        level: 'Medium',
        question: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
        answer: 'Count frequencies using a Hash Map. Then use a Min-Heap of size k, ordered by frequency. Push elements into the heap; if size exceeds k, pop the smallest. The elements left in the heap are the top k most frequent.',
        testCases: [
          { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
          { input: 'nums = [1], k = 1', output: '[1]' }
        ]
      },
      {
        id: 703,
        title: 'Kth Largest Element in a Stream',
        level: 'Easy',
        question: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
        answer: 'Maintain a Min-Heap of size K. For every new element in the stream, if the heap has fewer than K elements, push it. Otherwise, if the new element is larger than the root of the Min-Heap, pop the root and push the new element. The root is always the Kth largest.',
        testCases: [
          { input: '["KthLargest", "add", "add", "add", "add", "add"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]', output: '[null, 4, 5, 5, 8, 8]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Sorting the entire array/stream every time you want to know the top K elements, or repeatedly finding the max K times.',
      timeComplexity: 'O(N log N) or O(N * K)',
      spaceComplexity: 'O(1) to O(N)'
    },
    mentalModel: 'Like a VIP bouncer at a club that only fits K people. If the club is full and someone cooler (larger/more frequent) shows up, the least cool person inside gets kicked out.',
    reference: { name: 'Educative: Top K Elements', url: 'https://www.educative.io/courses/grokking-the-coding-interview/top-k-elements' },
    mermaidCode: `graph TD
    S[Stream/Array] -->|Push| H{Min-Heap size K}
    H -->|If size > K| P[Pop Smallest]
    P -.->|Discard| D((🗑️))
    H -.->|Result| R[Top K Largest elements]`
  },
  {
    id: 'subsets',
    name: '13. Subsets (Backtracking)',
    summary: 'Generating all possible combinations using Backtracking.',
    leetcodeQuestions: [
      {
        id: 78,
        title: 'Subsets',
        level: 'Medium',
        question: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
        answer: 'Use a recursive function that takes the current index and a `currentSubset` array. At each step, push the `currentSubset` to the results. Loop from the current index to the end, adding `nums[i]` to `currentSubset`, recursing, and then popping `nums[i]` (backtracking).',
        testCases: [
          { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
          { input: 'nums = [0]', output: '[[],[0]]' }
        ]
      },
      {
        id: 40,
        title: 'Combination Sum II',
        level: 'Medium',
        question: 'Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.',
        answer: 'Sort the candidates first to easily handle duplicates. Use backtracking. If target == 0, add combo. If target < 0, return. In the loop, if `i > start` and `candidates[i] == candidates[i-1]`, skip to avoid duplicate combos. Backtrack with `target - candidates[i]`.',
        testCases: [
          { input: 'candidates = [10,1,2,7,6,1,5], target = 8', output: '[[1,1,6], [1,2,5], [1,7], [2,6]]' },
          { input: 'candidates = [2,5,2,1,2], target = 5', output: '[[1,2,2], [5]]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Using bit manipulation to generate all possible states (from 0 to 2^N - 1) which is a valid approach but less flexible for complex combinations than backtracking.',
      timeComplexity: 'O(N * 2^N)',
      spaceComplexity: 'O(N * 2^N) to store results'
    },
    mentalModel: 'Like exploring a "Choose Your Own Adventure" book. You follow a path to the end, write down the ending, then flip back a few pages and make a different choice to see that ending.',
    mermaidCode: `graph TD
    A[Empty Set] -->|+1| B[Set 1]
    A -->|+2| C[Set 2]
    B -->|+2| D[Set 1, 2]
    B -.->|-1 Backtrack| A
    C -.->|-2 Backtrack| A`
  },
  {
    id: 'topological-sort',
    name: '14. Topological Sort',
    summary: 'Finding a valid order of execution for tasks with dependencies.',
    leetcodeQuestions: [
      {
        id: 207,
        title: 'Course Schedule',
        level: 'Medium',
        question: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites. Return true if you can finish all courses. Otherwise, return false.',
        answer: 'This is cycle detection in a Directed Graph. Build an adjacency list and an in-degree array. Push all nodes with in-degree 0 to a queue. BFS through them, reducing the in-degree of neighbors. If you processed `numCourses` nodes, return true (no cycle).',
        testCases: [
          { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
          { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' }
        ]
      },
      {
        id: 269,
        title: 'Alien Dictionary',
        level: 'Hard',
        question: 'There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language\'s dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order.',
        answer: 'Compare adjacent words to find the first differing character to establish a directed edge (e.g., "wrt" before "wrf" means t -> f). Build a graph. Run Topological Sort. If there\'s a cycle (e.g., a->b and b->a), or invalid input ("abc" before "ab"), return empty string.',
        testCases: [
          { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
          { input: 'words = ["z","x","z"]', output: '"" (cycle exists)' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Randomly picking tasks and repeatedly checking if all their prerequisites are met by iterating through the entire dependency list.',
      timeComplexity: 'O(V!)',
      spaceComplexity: 'O(V)'
    },
    mentalModel: 'Like putting on clothes. You must put on socks before shoes, and underwear before pants. You look at all the clothes you can put on *right now* (0 prerequisites), put them on, and then check what new clothes that unlocks.',
    reference: { name: 'GeeksforGeeks: Topological Sorting', url: 'https://www.geeksforgeeks.org/topological-sorting/' },
    mermaidCode: `graph LR
    A[Task A] --> C[Task C]
    B[Task B] --> C
    C --> D[Task D]
    style C fill:#f99,stroke:#333
    %% A & B must finish before C. C before D.`
  },

  // HARD
  {
    id: 'two-heaps',
    name: '15. Two Heaps',
    summary: 'Maintains a Max Heap and a Min Heap to instantly find the median of a stream.',
    leetcodeQuestions: [
      {
        id: 295,
        title: 'Find Median from Data Stream',
        level: 'Hard',
        question: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class.',
        answer: 'Maintain two heaps: a Max-Heap for the lower half of numbers, and a Min-Heap for the upper half. Keep their sizes balanced (Max-Heap size >= Min-Heap size). The median is the root of the Max-Heap (if odd) or the average of both roots (if even).',
        testCases: [
          { input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]', output: '[null, null, null, 1.5, null, 2.0]' }
        ]
      },
      {
        id: 480,
        title: 'Sliding Window Median',
        level: 'Hard',
        question: 'The median is the middle value in an ordered integer list. Given an integer array nums and an integer k, return the median array for each window in the original array.',
        answer: 'Combine Two Heaps with a Sliding Window. Because removing an element from a heap is O(N), use "lazy deletion" by keeping a HashMap of elements that have fallen out of the window, and only actually popping them when they reach the root of either heap.',
        testCases: [
          { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]' },
          { input: 'nums = [1,2,3,4,2,3,1,4,2], k = 3', output: '[2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Keeping all numbers in a simple array, and every time you need the median, you sort the array and pick the middle element.',
      timeComplexity: 'O(N log N) per insertion',
      spaceComplexity: 'O(N)'
    },
    mentalModel: 'Like balancing a seesaw. You put the lighter half of the kids on the left side (Max-Heap) and the heavier half on the right side (Min-Heap). The two kids closest to the middle (top of the heaps) are your medians.',
    mermaidCode: `graph TD
    S[Data Stream] -->|Insert| D{Compare with Heaps}
    D -->|<= Max-Heap Top| L[Max-Heap: Lower Half]
    D -->|> Max-Heap Top| U[Min-Heap: Upper Half]
    L <-.->|Rebalance if sizes diff > 1| U
    style L fill:#fbb,stroke:#333
    style U fill:#bbf,stroke:#333`
  },
  {
    id: 'k-way-merge',
    name: '16. K-way Merge',
    summary: 'Merging K sorted arrays efficiently.',
    leetcodeQuestions: [
      {
        id: 23,
        title: 'Merge k Sorted Lists',
        level: 'Hard',
        question: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
        answer: 'Put the head of each of the k lists into a Min-Heap. The heap orders them by value. Pop the smallest node, append it to your result list, and if that node has a `next`, push `node.next` into the heap. Repeat until the heap is empty.',
        testCases: [
          { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
          { input: 'lists = []', output: '[]' }
        ]
      },
      {
        id: 378,
        title: 'Kth Smallest Element in a Sorted Matrix',
        level: 'Medium',
        question: 'Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.',
        answer: 'Treat each row as a sorted list. Push the first element of each row into a Min-Heap (storing its value, row index, and col index). Pop k times. Every time you pop, if there is a next element in that same row, push it into the heap. The kth popped element is your answer.',
        testCases: [
          { input: 'matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8', output: '13' },
          { input: 'matrix = [[-5]], k = 1', output: '-5' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Concatenating all K arrays/lists into one massive array, and then sorting it using a standard sorting algorithm.',
      timeComplexity: 'O(N log N) where N is total elements',
      spaceComplexity: 'O(N)'
    },
    mentalModel: 'Like merging multiple lines of cars into a single lane. You look at the front car of every line, let the fastest one go, and then look at the new front car of that specific line.',
    reference: { name: 'Educative: K-way Merge', url: 'https://www.educative.io/courses/grokking-the-coding-interview/k-way-merge' },
    mermaidCode: `graph TD
    L1[List 1: 1, 4, 5] --> H((Min-Heap))
    L2[List 2: 1, 3, 4] --> H
    L3[List 3: 2, 6] --> H
    H -->|Pop Smallest| R[Result Array]
    R -.->|Push Next from same list| H`
  },
  {
    id: 'monotonic-stack',
    name: '17. Monotonic Stack',
    summary: 'A stack whose elements are strictly increasing or decreasing. Solves "next greater element" problems.',
    leetcodeQuestions: [
      {
        id: 739,
        title: 'Daily Temperatures',
        level: 'Medium',
        question: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
        answer: 'Iterate through temperatures. Maintain a stack of indices. While the current temp is greater than the temp at the index at the top of the stack, pop the stack and calculate the difference in indices. Push the current index.',
        testCases: [
          { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
          { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' }
        ]
      },
      {
        id: 84,
        title: 'Largest Rectangle in Histogram',
        level: 'Hard',
        question: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
        answer: 'Maintain an increasing Monotonic Stack of indices. If a smaller bar is encountered, it means the previous taller bars can\'t extend any further right. Pop them, calculate their maximum area (using the popped bar as height and the distance between the current index and the new stack top as width), and push the current index.',
        testCases: [
          { input: 'heights = [2,1,5,6,2,3]', output: '10' },
          { input: 'heights = [2,4]', output: '4' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'For every single element, running an inner loop that scans to the right until it finds the next greater/smaller element.',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Like standing in a line of people and looking forward. A tall person (high value) will block your view of everyone shorter behind them. The stack keeps track of people whose view hasn\'t been blocked yet.',
    mermaidCode: `graph TD
    S[Stack: waiting for higher price] -->|New Price $110 arrives| C{Price > Stack Top?}
    C -->|Yes| P[Pop Stack Top]
    P -->|Calculate Wait Days| W[Result]
    C -->|No| Push[Push New Price Index]
    P -.->|Repeat until False| C`
  },
  {
    id: 'union-find',
    name: '18. Disjoint Set (Union-Find)',
    summary: 'Tracks a set of elements partitioned into disjoint subsets. Great for graph connectivity.',
    leetcodeQuestions: [
      {
        id: 323,
        title: 'Number of Connected Components in an Undirected Graph',
        level: 'Medium',
        question: 'You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.',
        answer: 'Initialize a Union-Find structure with n independent sets. Iterate through all the edges. For each edge (u, v), perform a Union operation. Every successful Union reduces the total number of components by 1.',
        testCases: [
          { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
          { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' }
        ]
      },
      {
        id: 684,
        title: 'Redundant Connection',
        level: 'Medium',
        question: 'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree of n nodes.',
        answer: 'Iterate through the edges. For each edge (u, v), use the Find operation to check if they are already in the same set. If they are, this edge creates a cycle and is the redundant one. If not, Union them.',
        testCases: [
          { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]' },
          { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Running a full Breadth-First Search (BFS) or Depth-First Search (DFS) on the graph every single time you want to check if two nodes are connected.',
      timeComplexity: 'O(V + E) per query',
      spaceComplexity: 'O(V)'
    },
    mentalModel: 'Like tracking corporate acquisitions. If Company A buys Company B, Company B\'s CEO now reports to A. If you want to know if two employees work for the same parent company, you just follow the chain of bosses to the top.',
    reference: { name: 'Princeton: Union-Find', url: 'https://algs4.cs.princeton.edu/15uf/' },
    mermaidCode: `graph TD
    1((User 1)) --> 2((User 2))
    2 --> 3((User 3 - Root))
    4((User 4)) --> 3
    style 3 fill:#bfb,stroke:#333
    %% 1, 2, 3, 4 are in the same component`
  },
  {
    id: '01-knapsack',
    name: '19. 0/1 Knapsack (DP)',
    summary: 'Selecting items to maximize value without exceeding capacity.',
    leetcodeQuestions: [
      {
        id: 416,
        title: 'Partition Equal Subset Sum',
        level: 'Medium',
        question: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.',
        answer: 'This is a 0/1 Knapsack problem where the capacity is `sum(nums) / 2`. Create a DP array of size `capacity + 1`. For each number, iterate backwards through the DP array updating `dp[i] = dp[i] || dp[i - num]`. Check if `dp[capacity]` becomes true.',
        testCases: [
          { input: 'nums = [1,5,11,5]', output: 'true' },
          { input: 'nums = [1,2,3,5]', output: 'false' }
        ]
      },
      {
        id: 494,
        title: 'Target Sum',
        level: 'Medium',
        question: 'You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols \'+\' and \'-\' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.',
        answer: 'This reduces to partitioning the array into two subsets (P for positive, N for negative) such that `sum(P) - sum(N) = target`. Since `sum(P) + sum(N) = sum(nums)`, we find `sum(P) = (target + sum(nums)) / 2`. This is exactly 0/1 Knapsack: count subsets summing to `sum(P)`.',
        testCases: [
          { input: 'nums = [1,1,1,1,1], target = 3', output: '5' },
          { input: 'nums = [1], target = 1', output: '1' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'Using basic recursion to try every possible combination of including or excluding an item (generating all subsets).',
      timeComplexity: 'O(2^N)',
      spaceComplexity: 'O(N) for call stack'
    },
    mentalModel: 'Like a burglar packing a bag with a strict weight limit. For every valuable item, you ask: "If I put this in my bag, will it force me to drop something else? Is the trade-off worth it?"',
    mermaidCode: `graph TD
    A[Item 1: 2kg, $10] --> B{Include?}
    B -->|Yes| C[Capacity: Max - 2kg, Val: +$10]
    B -->|No| D[Capacity: Max, Val: +$0]
    C --> E[Item 2...]
    D --> E`
  },
  {
    id: 'sliding-window-max',
    name: '20. Sliding Window Maximum',
    summary: 'Finding the max element in a sliding window in O(N) time using a Deque.',
    leetcodeQuestions: [
      {
        id: 239,
        title: 'Sliding Window Maximum',
        level: 'Hard',
        question: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.',
        answer: 'Use a Deque (Double-ended Queue). Store indices. Maintain a monotonically decreasing Deque: before adding a new index, pop all indices from the back whose values are smaller than the new value. Then remove indices from the front that have fallen out of the window. The front is always the max.',
        testCases: [
          { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
          { input: 'nums = [1], k = 1', output: '[1]' }
        ]
      },
      {
        id: 1438,
        title: 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit',
        level: 'Medium',
        question: 'Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.',
        answer: 'Maintain TWO Deques: one monotonically decreasing (for max) and one monotonically increasing (for min). Expand the window. If the difference between the max Deque\'s front and the min Deque\'s front exceeds `limit`, shrink the window from the left by popping out-of-bounds indices from the fronts.',
        testCases: [
          { input: 'nums = [8,2,4,7], limit = 4', output: '2' },
          { input: 'nums = [10,1,2,4,7,2], limit = 5', output: '4' }
        ]
      }
    ],
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
    bruteForce: {
      explanation: 'For every single window of size K, iterating through all K elements to find the maximum.',
      timeComplexity: 'O(N * K)',
      spaceComplexity: 'O(1)'
    },
    mentalModel: 'Like a king\'s court. The oldest person (front of queue) is the current king. If a young, stronger person (larger value) arrives, they kick out all the weak people in front of them. When the king gets too old (falls out of the window), they step down.',
    mermaidCode: `graph TD
    A[New Element] --> B{Deque Empty?}
    B -->|No| C{New > Deque Back?}
    C -->|Yes| D[Pop Deque Back]
    D -.->|Repeat| C
    C -->|No| E[Push New to Back]
    B -->|Yes| E
    E --> F{Front Out of Window?}
    F -->|Yes| G[Shift Deque Front]
    F -->|No| H[Front is Max!]`
  },
];