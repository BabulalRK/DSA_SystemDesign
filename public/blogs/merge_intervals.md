# Merge Intervals

Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Example 1:
**Input:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`
**Output:** `[[1,6],[8,10],[15,18]]`
**Explanation:** Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.

### Example 2:
**Input:** `intervals = [[1,4],[4,5]]`
**Output:** `[[1,5]]`
**Explanation:** Intervals `[1,4]` and `[4,5]` are considered overlapping.

### Constraints:
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`

---

## Solution: Sorting by a Specific Attribute

When dealing with a messy list of date ranges or time intervals, trying to find overlaps in an unsorted list is a nightmare. You would have to compare every single interval against every other interval, resulting in an incredibly slow `O(n^2)` time complexity.

The elegant trick to this problem is **Sorting**. If we simply sort the entire array of intervals based on their **start times**, a beautiful property emerges: any overlapping intervals are guaranteed to be directly next to each other!

### The Algorithm

1. **Sort the Intervals:** Use the built-in `.sort()` method to arrange the intervals in ascending order based on their first element (`starti`).
2. **Initialize a Result Array:** Create a new array and push the very first interval into it.
3. **Iterate and Merge:** Loop through the rest of the sorted intervals one by one.
   - If the current interval's start time is *less than or equal to* the last merged interval's end time, they overlap! Merge them by taking the maximum end time between the two.
   - If they do not overlap, simply push the current interval into the result array.

### The Code

```javascript
function merge(intervals) {
    // Edge case: if there's only 1 interval, nothing to merge
    if (intervals.length <= 1) return intervals;

    // Step 1: Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Step 2: Initialize our result array
    const merged = [intervals[0]];

    // Step 3: Iterate and merge
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = merged[merged.length - 1];

        // Check for overlap
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Overlap found! Merge by extending the end time
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap. Add it as a new distinct interval
            merged.push(currentInterval);
        }
    }

    return merged;
}
```

### Complexity
- **Time Complexity:** `O(n log n)`. The actual merging loop only takes `O(n)`, but the initial `.sort()` dominates the time complexity, making the total run time `O(n log n)`.
- **Space Complexity:** `O(n)`. In the worst-case scenario where there are absolutely zero overlapping intervals, our `merged` result array will be the exact same size as the input array.
