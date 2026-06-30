export function shuffle(nums, n) {
    const ans = new Array(2 * n);
    
    for (let i = 0; i < n; i++) {
        ans[2 * i] = nums[i];         // Place the x element
        ans[2 * i + 1] = nums[i + n]; // Place the y element
    }
    
    return ans;
}
