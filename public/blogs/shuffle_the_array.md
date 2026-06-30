# Shuffle the Array

Given the array `nums` consisting of `2n` elements in the form `[x1,x2,...,xn,y1,y2,...,yn]`.

Return the array in the form `[x1,y1,x2,y2,...,xn,yn]`.

### Example 1
**Input:** `nums = [2,5,1,3,4,7], n = 3`
**Output:** `[2,3,5,4,1,7]`
**Explanation:** Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is `[2,3,5,4,1,7]`.

### Example 2
**Input:** `nums = [1,2,3,4,4,3,2,1], n = 4`
**Output:** `[1,4,2,3,3,2,4,1]`

### Example 3
**Input:** `nums = [1,1,2,2], n = 2`
**Output:** `[1,2,1,2]`

### Constraints
- `1 <= n <= 500`
- `nums.length == 2n`
- `1 <= nums[i] <= 10^3`

---

## Solution: Mathematical Indexing

This problem requires us to take an array cut into two halves (the `x` half and the `y` half) and interleave them. Since the array length is `2n`, the first half spans indices `0` to `n-1`, and the second half spans indices `n` to `2n-1`.

We can solve this efficiently in **O(n) Time** and **O(n) Space** by initializing an empty array `ans` of length `2n` and using a single loop to correctly map elements into their new positions. 

Notice the pattern of where the elements go in the new array:
- `x1` goes to index `0`
- `y1` goes to index `1`
- `x2` goes to index `2`
- `y2` goes to index `3`

The mathematical pattern is clear:
- For any step `i` (from `0` to `n-1`), the `x` element belongs at index `2 * i`.
- The corresponding `y` element (located at `i + n` in the original array) belongs at index `2 * i + 1`.

```javascript
function shuffle(nums, n) {
    const ans = new Array(2 * n);
    
    for (let i = 0; i < n; i++) {
        ans[2 * i] = nums[i];         // Place the x element
        ans[2 * i + 1] = nums[i + n]; // Place the y element
    }
    
    return ans;
}
```

This elegant logic eliminates the need to manually track multiple index pointers, making the code incredibly clean, performant, and easy to read.
