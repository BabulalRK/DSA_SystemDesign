/**
 * Sorts an array of 0s, 1s, and 2s in-place.
 * Algorithm: Dutch National Flag (Three Pointers)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums - Array containing 0s, 1s, and 2s
 * @return {void} - Modifies the array in-place
 */
export function sortColors(nums) {
    let low = 0;           // Pointer for 0s
    let mid = 0;           // Pointer for 1s (and current element)
    let high = nums.length - 1; // Pointer for 2s
    
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap the 0 to the low boundary
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } 
        else if (nums[mid] === 1) {
            // 1 is in the middle, perfectly fine. Just move forward.
            mid++;
        } 
        else if (nums[mid] === 2) {
            // Swap the 2 to the high boundary
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            // We decrement high, but we DO NOT increment mid here.
            // Why? Because the number we just swapped from the high boundary 
            // hasn't been evaluated yet, so we must check it on the next loop!
            high--;
        }
    }
}
