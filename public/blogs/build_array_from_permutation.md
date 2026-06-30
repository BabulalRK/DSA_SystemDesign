# Build Array from Permutation (O(1) Space)

Given a zero-based permutation `nums` (0-indexed), build an array `ans` of the same length where `ans[i] = nums[nums[i]]` for each `0 <= i < nums.length` and return it.

A zero-based permutation `nums` is an array of distinct integers from `0` to `nums.length - 1` (inclusive).

### Example
**Input:** `nums = [5,0,1,2,3,4]`
**Output:** `[4,5,0,1,2,3]`
**Explanation:** The array `ans` is built as follows:
- `ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]`
- `ans = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]`
- `ans = [4,5,0,1,2,3]`

### Constraints
- `1 <= nums.length <= 1000`
- `0 <= nums[i] < nums.length`
- The elements in `nums` are distinct.


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

> **Understanding the Code vs. Formula:**
> The code implements the exact formula `old_value + (new_value % n) * n`.
> - `old_value` is the current number at index `i`: **`nums[i]`**
> - `new_value` is the target number we want: **`nums[nums[i]]`**
> 
> Plugging these in gives `nums[i] + (nums[nums[i]] % n) * n`.
> 
> **Why do we need `% n` on the `new_value`?** 
> As we loop through the array, some values will have already been overwritten with the new "encoded" integers. By doing `% n`, we strip away the encoded part and extract the original value that was there at the start.
> 
> **Order of Arithmetic Operations:**
> To compute `nums[i] + (nums[nums[i]] % n) * n`, JavaScript follows standard order of operations (PEMDAS/BODMAS):
> 1. **Parentheses first `(...)`**: It evaluates `(nums[nums[i]] % n)`. The modulo `%` securely extracts the original, un-encoded target value.
> 2. **Multiplication next `*`**: It multiplies that extracted value by `n`. This shifts the new value into a higher numerical space, out of the bounds of the old value.
> 3. **Addition last `+`**: It adds `nums[i]` (the old value) to the product. 
> 
> The final result is a single integer that perfectly preserves both values without them colliding!

```javascript
function buildArray(nums) {
    const n = nums.length;
    
    // Step 1: Encode both the original value and the new value in the same element
    for (let i = 0; i < n; i++) {
        // nums[nums[i]] % n gets the original value of nums[nums[i]]
        nums[i] = nums[i] + (nums[nums[i]] % n) * n;
    }
    
    // Step 2: Extract the new values by dividing by n
    for (let i = 0; i < n; i++) {
        nums[i] = Math.floor(nums[i] / n);
    }
    
    return nums;
}
```

This trick utilizes modular arithmetic to keep track of the original values (via modulo `% n`) and the new transformed values (via division `/ n`).
