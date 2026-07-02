# Maximum XOR for Each Query

You are given a sorted array `nums` of `n` non-negative integers and an integer `maximumBit`. You want to perform the following query `n` times:

1. Find a non-negative integer `k < 2^maximumBit` such that `nums[0] XOR nums[1] XOR ... XOR nums[nums.length-1] XOR k` is **maximized**. `k` is the answer to the `i`th query.
2. Remove the last element from the current array `nums`.

Return an array `answer`, where `answer[i]` is the answer to the `i`th query.

### Example 1
**Input:** `nums = [0,1,1,3]`, `maximumBit = 2`
**Output:** `[0,3,2,3]`
**Explanation:** 
- 1st query: `nums = [0,1,1,3]`, `k = 0` since `0 XOR 1 XOR 1 XOR 3 XOR 0 = 3`.
- 2nd query: `nums = [0,1,1]`, `k = 3` since `0 XOR 1 XOR 1 XOR 3 = 3`.
- 3rd query: `nums = [0,1]`, `k = 2` since `0 XOR 1 XOR 2 = 3`.
- 4th query: `nums = [0]`, `k = 3` since `0 XOR 3 = 3`.

### Constraints
- `nums.length == n`
- `1 <= n <= 10^5`
- `1 <= maximumBit <= 20`
- `0 <= nums[i] < 2^maximumBit`
- `nums` is sorted in ascending order.

---

### Step-by-Step Walkthrough

To solve this efficiently, we must rely on a few beautiful properties of the **Bitwise XOR (`^`)** operator!

#### 1. The Maximum Possible Value
The problem asks us to find a `k` that is strictly less than `2^maximumBit`. This means `k` can be represented using `maximumBit` bits. The absolute maximum possible number we can ever create with `maximumBit` bits is a number where all bits are set to `1`. 
For example, if `maximumBit = 3`, the maximum possible value is binary `111`, which equals `7`. 
We can easily generate this "mask" of all 1s using a bitwise left shift: `mask = (1 << maximumBit) - 1`.

#### 2. Reversing XOR to find `k`
We want our final result to be as large as possible, which means we want it to equal our `mask`.
Our equation is: `(CumulativeXOR) XOR k = mask`.
Because of the inverse property of XOR (if `A ^ B = C`, then `B = A ^ C`), we can simply rearrange our equation to solve directly for `k`:
`k = CumulativeXOR XOR mask`.

#### 3. Removing Elements Efficiently
The problem asks us to remove the last element of the array for each subsequent query. Recomputing the cumulative XOR of the entire array from scratch would take `O(n^2)` time and cause a Time Limit Exceeded error on large inputs. 
Instead, we can use the self-inverse property of XOR (`A ^ A = 0`). To "remove" the last element from our running total, we simply XOR the total with the element we want to remove!

---

## Solution: Bit Manipulation

With these three concepts combined, our algorithm becomes incredibly fast and simple:
1. Find the cumulative XOR of all elements in the initial array.
2. Calculate the maximum possible value (`mask`).
3. Iterate backwards (to simulate removing the last element). At each step, push `(cumulativeXOR ^ mask)` to our answer array, and then "remove" the current last element by doing `cumulativeXOR ^= nums[i]`.

```javascript
function getMaximumXor(nums, maximumBit) {
    let n = nums.length;
    let result = [];
    
    // 1. Calculate the maximum possible value (a number with 'maximumBit' ones)
    let mask = (1 << maximumBit) - 1;
    
    // 2. Find the cumulative XOR of the entire initial array
    let currentXor = 0;
    for (let num of nums) {
        currentXor ^= num;
    }
    
    // 3. Process queries backwards to simulate removing the last element
    for (let i = n - 1; i >= 0; i--) {
        // The optimal k is simply our current XOR combined with the mask
        result.push(currentXor ^ mask);
        
        // "Remove" the last element for the next query
        currentXor ^= nums[i];
    }
    
    return result;
}
```

This elegant solution runs in exactly **O(n) Time** because we only do two simple linear passes over the data. The auxiliary memory footprint is **O(1)** Space (excluding the space required to return the result array).
