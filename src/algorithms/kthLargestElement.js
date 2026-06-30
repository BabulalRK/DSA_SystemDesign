/**
 * Finds the Kth Largest Element in an array.
 * 
 * Approach 1: Simple Sorting (O(n log n) Time)
 */
export function findKthLargestSort(nums, k) {
    // Sort descending
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}

/**
 * Approach 2: QuickSelect Algorithm (Average O(n) Time)
 * Best/Average Case: O(n) Time
 * Worst Case: O(n^2) Time (when already sorted and choosing bad pivot)
 */
export function findKthLargestQuickSelect(nums, k) {
    const targetIndex = nums.length - k;

    function quickSelect(left, right) {
        let pivot = nums[right];
        let partitionIndex = left;

        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                // Swap
                [nums[partitionIndex], nums[i]] = [nums[i], nums[partitionIndex]];
                partitionIndex++;
            }
        }
        
        // Swap pivot into its final place
        [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]];

        if (partitionIndex === targetIndex) {
            return nums[partitionIndex]; // Found it!
        } else if (partitionIndex < targetIndex) {
            return quickSelect(partitionIndex + 1, right); // Search right half
        } else {
            return quickSelect(left, partitionIndex - 1); // Search left half
        }
    }

    return quickSelect(0, nums.length - 1);
}
