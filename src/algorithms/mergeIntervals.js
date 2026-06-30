/**
 * Merges overlapping intervals.
 * Time Complexity: O(n log n) - dominated by the initial sorting
 * Space Complexity: O(n) - to store the output array (or O(1) if sorting in place and modifying input, but standard is O(n))
 *
 * @param {number[][]} intervals - An array of intervals where interval[i] = [start, end]
 * @return {number[][]} - Array of merged intervals
 */
export function merge(intervals) {
    if (intervals.length <= 1) {
        return intervals;
    }

    // Sort intervals by their starting times
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize the result array with the first interval
    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        const lastMergedInterval = merged[merged.length - 1];

        // Check if there is an overlap
        // An overlap occurs if the current interval starts before or exactly when the last one ends
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Merge them by updating the end time of the last merged interval
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap, simply push the current interval to our result array
            merged.push(currentInterval);
        }
    }

    return merged;
}
