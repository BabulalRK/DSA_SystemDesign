/**
 * Searches for a target value within a rotated sorted array.
 * Algorithm: Modified Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums - The rotated sorted array
 * @param {number} target - The value to search for
 * @return {number} - The index of the target, or -1 if not found
 */
export function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if the left half is the strictly sorted half
        if (nums[left] <= nums[mid]) {
            // Is the target located within this sorted left half?
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1; // Target is in the left half
            } else {
                left = mid + 1;  // Target must be in the right half
            }
        } 
        // Otherwise, the right half MUST be the strictly sorted half
        else {
            // Is the target located within this sorted right half?
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;  // Target is in the right half
            } else {
                right = mid - 1; // Target must be in the left half
            }
        }
    }

    return -1; // Target not found
}
