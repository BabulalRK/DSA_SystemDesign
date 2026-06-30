# Concatenation of Array

Given an integer array `nums` of length `n`, you want to create an array `ans` of length `2n` where `ans[i] == nums[i]` and `ans[i + n] == nums[i]` for `0 <= i < n` (0-indexed).

Specifically, `ans` is the concatenation of two `nums` arrays.

Return the array `ans`.

### Example 1
**Input:** `nums = [1,2,1]`
**Output:** `[1,2,1,1,2,1]`
**Explanation:** The array `ans` is formed as follows:
- `ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]`
- `ans = [1,2,1,1,2,1]`

### Example 2
**Input:** `nums = [1,3,2,1]`
**Output:** `[1,3,2,1,1,3,2,1]`
**Explanation:** The array `ans` is formed as follows:
- `ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]`
- `ans = [1,3,2,1,1,3,2,1]`

### Constraints
- `n == nums.length`
- `1 <= n <= 1000`
- `1 <= nums[i] <= 1000`

---

## Solution 1: Standard Loop

We can solve this problem in `O(n)` time by creating a new array of size `2n` and simply iterating through the original array once. Since we know we need to duplicate the array, we can set `ans[i]` and `ans[i + n]` to the same value in a single loop iteration!

```javascript
function getConcatenation(nums) {
    const n = nums.length;
    const ans = new Array(2 * n);
    
    for (let i = 0; i < n; i++) {
        ans[i] = nums[i];         // Set the first half
        ans[i + n] = nums[i];     // Set the second half
    }
    
    return ans;
}
```

## Solution 2: Spread Operator (Modern JavaScript)

If you are writing modern JavaScript (ES6+), you can achieve this concisely using the spread operator `...`. The spread operator unpacks all elements from an array. By unpacking `nums` twice into a new array, we get the exact concatenated result instantly.

```javascript
function getConcatenation(nums) {
    return [...nums, ...nums];
}
```

Alternatively, you could use the built-in array `.concat()` method:

```javascript
function getConcatenation(nums) {
    return nums.concat(nums);
}
```
