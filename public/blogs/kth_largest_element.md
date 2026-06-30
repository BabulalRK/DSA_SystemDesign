# Kth Largest Element in an Array

Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.

Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element. Can you solve it without sorting the entire array?

### Example 1:
**Input:** `nums = [3,2,1,5,6,4]`, `k = 2`
**Output:** `5`

### Example 2:
**Input:** `nums = [3,2,3,1,2,4,5,5,6]`, `k = 4`
**Output:** `4`

### Constraints:
- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Solution 1: The "Lazy" Sorting Approach

The absolute simplest way to solve this problem is to just sort the entire array in descending order, and pick the element at index `k - 1`. 

```javascript
function findKthLargestSort(nums, k) {
    nums.sort((a, b) => b - a); // Sort descending
    return nums[k - 1];
}
```

While this works, it takes **O(n log n) Time**. If you have an array with 10 million elements, fully sorting all 10 million of them just to find the 2nd largest one is a massive waste of CPU cycles! Interviewers will ask you to optimize this.

---

## Solution 2: QuickSelect (The Professional Approach)

To achieve **O(n) Time Complexity**, we can use an algorithm called **QuickSelect**. It is a variation of the famous QuickSort algorithm, but with a massive optimization: we throw away half the array every time!

### How it works:
1. **Pick a Pivot:** Choose a random number in the array (we'll just pick the last one).
2. **Partition:** Move everything smaller than the pivot to the left, and everything larger to the right. 
3. **Check the Pivot's Index:** Because of the partition, the pivot is now in its *absolute final, perfectly sorted position*. 
   - If the pivot's index exactly matches the target index we are looking for (`nums.length - k`), we are done!
   - If the pivot's index is *smaller* than our target, we know our target must be on the right side. We completely ignore the left side and run QuickSelect again.
   - If the pivot's index is *larger*, we ignore the right side and search the left!

### The Code

```javascript
function findKthLargestQuickSelect(nums, k) {
    // If the array is sorted ascending, the Kth largest is at this index:
    const targetIndex = nums.length - k;

    function quickSelect(left, right) {
        let pivot = nums[right];
        let partitionIndex = left;

        // Partition the array
        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                // Swap smaller elements to the left
                [nums[partitionIndex], nums[i]] = [nums[i], nums[partitionIndex]];
                partitionIndex++;
            }
        }
        
        // Swap the pivot into its final resting place
        [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]];

        // Did the pivot land exactly on our target index?
        if (partitionIndex === targetIndex) {
            return nums[partitionIndex];
        } 
        // Search the right side
        else if (partitionIndex < targetIndex) {
            return quickSelect(partitionIndex + 1, right);
        } 
        // Search the left side
        else {
            return quickSelect(left, partitionIndex - 1);
        }
    }

    return quickSelect(0, nums.length - 1);
}
```

### Complexity
- **Time Complexity:** Average **O(n)**. Because we only search one half of the partition each time (unlike QuickSort which searches both), the work decreases rapidly (`N + N/2 + N/4... = 2N`).
- **Space Complexity:** **O(1)** because we are modifying the array in-place. (Note: The call stack memory takes `O(log n)`).
