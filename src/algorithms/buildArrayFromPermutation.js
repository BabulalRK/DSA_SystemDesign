/**
 * Build Array from Permutation
 * 
 * Given a zero-based permutation nums (0-indexed), build an array ans of the same length 
 * where ans[i] = nums[nums[i]] for each 0 <= i < nums.length and return it.
 * 
 * @param {number[]} nums - A zero-based permutation array
 * @return {number[]} - The generated array
 */

// Simple Solution (O(n) Time, O(n) Space)
export function buildArraySimple(nums) {
    const ans = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        ans[i] = nums[nums[i]];
    }
    return ans;
}

// Optimized Solution (O(n) Time, O(1) Extra Space)
export function buildArrayOptimized(nums) {
    const n = nums.length;
    
    // Step 1: Encode both the original value and the new value in the same element
    for (let i = 0; i < n; i++) {
        // nums[nums[i]] % n gets the original value of nums[nums[i]]
        nums[i] = nums[i] + n * (nums[nums[i]] % n);
    }
    
    // Step 2: Extract the new values by dividing by n
    for (let i = 0; i < n; i++) {
        nums[i] = Math.floor(nums[i] / n);
    }
    
    return nums;
}
