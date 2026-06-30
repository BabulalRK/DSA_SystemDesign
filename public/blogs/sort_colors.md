# Sort Colors (Dutch National Flag)

Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

### Example 1:
**Input:** `nums = [2,0,2,1,1,0]`
**Output:** `[0,0,1,1,2,2]`

### Example 2:
**Input:** `nums = [2,0,1]`
**Output:** `[0,1,2]`

### Constraints:
- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` is either `0`, `1`, or `2`.

---

## Solution: The Three-Pointer Technique

This problem is famous in computer science as the **Dutch National Flag Problem**, proposed by Edsger Dijkstra.

If you use a standard sorting algorithm, it will take `O(n log n)` time. If you use a simple counting sort (count all the 0s, 1s, and 2s, then overwrite the array), it will take two passes over the array. The goal here is to do it in **One Pass (O(n) Time)** and **In-Place (O(1) Space)**.

To do this, we use three pointers to divide the array into four sections:
1. `low`: Tracks the boundary of the `0`s.
2. `mid`: The current element we are evaluating.
3. `high`: Tracks the boundary of the `2`s.

### The Algorithm

We iterate our `mid` pointer through the array. 
- **If we see a `0`:** We swap it with whatever is at our `low` pointer. We then increment both `low` and `mid` to move forward.
- **If we see a `1`:** A `1` belongs in the middle anyway, so we just leave it alone and increment `mid` to move forward.
- **If we see a `2`:** We swap it with whatever is at our `high` pointer, and decrement `high` to expand the `2`s boundary. *Crucially, we do NOT increment `mid` here.* Why? Because the number we just swapped from the `high` end could be a 0, 1, or 2! We need to evaluate it on the next loop iteration.

### The Code

```javascript
function sortColors(nums) {
    let low = 0;           
    let mid = 0;           
    let high = nums.length - 1; 
    
    // We stop when mid crosses high, because everything after high is already a 2!
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap to the front boundary
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } 
        else if (nums[mid] === 1) {
            // Leave it in the middle
            mid++;
        } 
        else if (nums[mid] === 2) {
            // Swap to the back boundary
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--; 
            // Notice mid is NOT incremented here!
        }
    }
}
```

### Complexity
- **Time Complexity:** `O(n)`. We only pass through the array exactly once.
- **Space Complexity:** `O(1)`. We sort the array exactly where it sits in memory without allocating any new arrays.
