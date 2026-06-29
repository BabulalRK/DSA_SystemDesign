# Build Array from Permutation (O(1) Space)

Given a zero-based permutation `nums` (0-indexed), build an array `ans` of the same length where `ans[i] = nums[nums[i]]` for each `0 <= i < nums.length` and return it.

A zero-based permutation `nums` is an array of distinct integers from `0` to `nums.length - 1` (inclusive).

## Solution 1: O(n) Time, O(n) Space

The most straightforward approach is to create a new array `ans` of the same length as `nums` and directly assign `ans[i] = nums[nums[i]]`.

```javascript
function buildArray(nums) {
    const ans = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        ans[i] = nums[nums[i]];
    }
    return ans;
}
```

## Solution 2: O(n) Time, O(1) Extra Space

If you are asked to solve this in **O(1) space** (without creating a new array), you can do it by modifying the original array in-place.

Since the values in the array are bounded by the array length `n` (from `0` to `n-1`), we can store two values in a single element. We can encode the old value and the new value into the same integer using the formula: `encoded_value = old_value + (new_value % n) * n`.

```javascript
function buildArray(nums) {
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
```

This trick utilizes modular arithmetic to keep track of the original values (via modulo `% n`) and the new transformed values (via division `/ n`).
