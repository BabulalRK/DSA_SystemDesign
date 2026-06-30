# Running Sum of 1d Array

Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]…nums[i])`.

Return the running sum of `nums`.

### Example 1
**Input:** `nums = [1,2,3,4]`
**Output:** `[1,3,6,10]`
**Explanation:** Running sum is obtained as follows: `[1, 1+2, 1+2+3, 1+2+3+4]`.

### Example 2
**Input:** `nums = [1,1,1,1,1]`
**Output:** `[1,2,3,4,5]`
**Explanation:** Running sum is obtained as follows: `[1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1]`.

### Example 3
**Input:** `nums = [3,1,2,10,1]`
**Output:** `[3,4,6,16,17]`

### Constraints
- `1 <= nums.length <= 1000`
- `-10^6 <= nums[i] <= 10^6`

---

## The Concept of a Prefix Sum

A "running sum" (often called a "prefix sum" in computer science) simply means that every element in the new array is the sum of all elements that came before it, including itself.

Instead of recalculating the sum from the beginning of the array every single time (which would be very slow, taking `O(n²)` time), we can optimize this! 

Notice that the sum at any index `i` is exactly equal to the **previous sum** at `i-1` plus the **current number** at `i`. This realization allows us to solve the problem in a single pass (`O(n)` Time).

## Solution 1: Non-Mutating (Functional Best Practice)

In modern web development (like React), it is generally considered bad practice to mutate (change) the original array passed into a function because it can cause unexpected side effects in your application state. 

Therefore, the standard approach is to allocate a new array of the exact same size, and fill it up:

```javascript
function runningSum(nums) {
    if (nums.length === 0) return [];
    
    // Allocate a new array of the same size (O(n) Space)
    const result = new Array(nums.length);
    result[0] = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Current Sum = Previous Sum + Current Number
        result[i] = result[i - 1] + nums[i];
    }
    
    return result;
}
```

## Solution 2: In-Place Mutation (Memory Optimized)

If you are strictly in a Data Structures & Algorithms interview and the interviewer asks you to optimize for Memory Space, you can achieve **O(1) Space Complexity** by overwriting the original array directly!

```javascript
function runningSum(nums) {
    // Start at index 1 and modify the array in place (O(1) Space)
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1];
    }
    return nums;
}
```
