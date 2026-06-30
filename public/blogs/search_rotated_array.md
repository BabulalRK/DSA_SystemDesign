# Search in Rotated Sorted Array

There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **rotated** at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). 

For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

### Example 1:
**Input:** `nums = [4,5,6,7,0,1,2]`, `target = 0`
**Output:** `4`

### Example 2:
**Input:** `nums = [4,5,6,7,0,1,2]`, `target = 3`
**Output:** `-1`

### Constraints:
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are **unique**.
- `nums` is guaranteed to be rotated at some pivot.
- `-10^4 <= target <= 10^4`

---

## Solution: Modified Binary Search

The core constraint of this problem is the runtime: `O(log n)`. The moment you see `O(log n)` required on a searching problem, your brain should immediately jump to **Binary Search**.

However, standard Binary Search only works on a perfectly sorted array. Our array is "rotated," meaning it is essentially split into two distinct sorted halves. 

The brilliant trick to this problem is realizing that **if you split a rotated array perfectly in half, at least one of those halves is guaranteed to be perfectly sorted.**

### The Algorithm

1. Find the `mid` point as usual.
2. Check if the **left half** (`left` to `mid`) is strictly sorted. 
   - If it is sorted, check if our `target` falls mathematically within the boundaries of `nums[left]` and `nums[mid]`. 
   - If it does, discard the right half! If it doesn't, discard the left half!
3. If the left half is NOT sorted, then by definition, the **right half** MUST be sorted.
   - Check if our `target` falls mathematically within the boundaries of `nums[mid]` and `nums[right]`.
   - If it does, discard the left half! If it doesn't, discard the right half!

By constantly identifying which half is cleanly sorted, and checking if our target belongs in that clean half, we can keep cutting our search space in half just like a normal Binary Search.

### The Code

```javascript
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // Found it!
        if (nums[mid] === target) return mid;

        // Condition 1: The Left Half is perfectly sorted
        if (nums[left] <= nums[mid]) {
            // Does the target belong in this sorted left half?
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1; // Yes! Discard the right half
            } else {
                left = mid + 1;  // No! It must be in the messy right half
            }
        } 
        // Condition 2: The Right Half is perfectly sorted
        else {
            // Does the target belong in this sorted right half?
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;  // Yes! Discard the left half
            } else {
                right = mid - 1; // No! It must be in the messy left half
            }
        }
    }

    return -1; // Target is nowhere to be found
}
```

### Complexity
- **Time Complexity:** `O(log n)` because we continuously divide the search space in half.
- **Space Complexity:** `O(1)` because we only use two pointers (`left` and `right`) and allocate no extra memory.
