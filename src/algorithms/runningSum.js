// Solution 1: Non-mutating (Functional best practice)
// Time: O(n), Space: O(n)
export function runningSum(nums) {
    if (nums.length === 0) return [];
    
    const result = new Array(nums.length);
    result[0] = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        result[i] = result[i - 1] + nums[i];
    }
    
    return result;
}

// Solution 2: In-place mutation (Memory optimized)
// Time: O(n), Space: O(1)
export function runningSumInPlace(nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1];
    }
    return nums;
}
