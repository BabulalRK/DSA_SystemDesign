# Find Pivot Index

Given an array of integers `nums`, calculate the **pivot index** of this array.

The **pivot index** is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is `0` because there are no elements to the left. This also applies to the right edge of the array.

Return the *leftmost* pivot index. If no such index exists, return `-1`.

### Example 1
**Input:** `nums = [1,7,3,6,5,6]`
**Output:** `3`
**Explanation:**
The pivot index is 3.
Left sum = `nums[0] + nums[1] + nums[2]` = 1 + 7 + 3 = 11
Right sum = `nums[4] + nums[5]` = 5 + 6 = 11

### Example 2
**Input:** `nums = [1,2,3]`
**Output:** `-1`
**Explanation:**
There is no index that satisfies the conditions in the problem statement.

### Example 3
**Input:** `nums = [2,1,-1]`
**Output:** `0`
**Explanation:**
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = `nums[1] + nums[2]` = 1 + -1 = 0

### Constraints
- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`

---

### Step-by-Step Walkthrough

Let's trace how we can find the pivot index efficiently using Example 1 (`nums = [1, 7, 3, 6, 5, 6]`).

Instead of recalculating the left and right sums for every single index (which would be slow), we can calculate the **total sum** of the array first. Then, as we iterate, we can maintain a running `leftSum` and easily calculate the `rightSum` on the fly!

1. **Calculate Total Sum:** 
   `Total` = 1 + 7 + 3 + 6 + 5 + 6 = **28**

2. **Iterate through the array (starting with `leftSum` = 0):**
   * **Index 0 (Value: 1):**
     * `rightSum` = Total (28) - `leftSum` (0) - Current Value (1) = **27**
     * Is `leftSum` (0) == `rightSum` (27)? **No**.
     * Update `leftSum`: 0 + 1 = **1**
   * **Index 1 (Value: 7):**
     * `rightSum` = Total (28) - `leftSum` (1) - Current Value (7) = **20**
     * Is `leftSum` (1) == `rightSum` (20)? **No**.
     * Update `leftSum`: 1 + 7 = **8**
   * **Index 2 (Value: 3):**
     * `rightSum` = Total (28) - `leftSum` (8) - Current Value (3) = **17**
     * Is `leftSum` (8) == `rightSum` (17)? **No**.
     * Update `leftSum`: 8 + 3 = **11**
   * **Index 3 (Value: 6):**
     * `rightSum` = Total (28) - `leftSum` (11) - Current Value (6) = **11**
     * Is `leftSum` (11) == `rightSum` (11)? **Yes!**
     * We found our pivot index. Return **3**.

---

## Solution: Prefix Sum

By utilizing the **Prefix Sum** pattern, we avoid nested loops. The formula `rightSum = totalSum - leftSum - nums[i]` allows us to find the right sum in constant `O(1)` time at each step.

This brings our overall time complexity down to **O(n)** because we only iterate through the array twice (once to find the total sum, and once to find the pivot). The space complexity is **O(1)** as we only use two integer variables.

```javascript
function pivotIndex(nums) {
    // 1. Calculate the total sum of the array
    let totalSum = 0;
    for (let num of nums) {
        totalSum += num;
    }
    
    // 2. Initialize leftSum
    let leftSum = 0;
    
    // 3. Iterate through the array to find the pivot
    for (let i = 0; i < nums.length; i++) {
        // The right sum is the total minus the left sum minus the current element
        let rightSum = totalSum - leftSum - nums[i];
        
        // If they are equal, we found the pivot!
        if (leftSum === rightSum) {
            return i;
        }
        
        // Otherwise, add the current element to the leftSum for the next iteration
        leftSum += nums[i];
    }
    
    // 4. If no pivot is found, return -1
    return -1;
}
```
