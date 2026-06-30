# First Bad Version

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

### Example 1:
**Input:** `n = 5`, `bad = 4`
**Output:** `4`
**Explanation:**
- `call isBadVersion(3) -> false`
- `call isBadVersion(5) -> true`
- `call isBadVersion(4) -> true`
- Then 4 is the first bad version.

### Example 2:
**Input:** `n = 1`, `bad = 1`
**Output:** `1`

### Constraints:
- `1 <= bad <= n <= 2^31 - 1`

---

## Solution: Boolean Boundary Binary Search

If we have 10,000 software versions, we could just check version 1, then version 2, then version 3, and so on until we hit a bad one. However, this takes `O(n)` time. If the 9,999th version is the bad one, we just wasted 9,999 API calls! 

Because the versions are strictly ordered (good, good, good, bad, bad, bad), this is a perfect candidate for **Binary Search**.

Instead of finding a specific number, we are looking for a **boolean boundary**—the exact moment where the array flips from `false` (good) to `true` (bad).

### The Algorithm

1. Set your `left` pointer to version `1` and `right` pointer to version `n`.
2. Find the midpoint. *(Note: To prevent integer overflow when dealing with massive numbers near the 32-bit limit, we use `left + Math.floor((right - left) / 2)` instead of `(left + right) / 2`)*.
3. Call the API on the midpoint:
   - **If it is bad (`true`):** We know the first bad version is either this exact version, or one before it. We discard the right half by setting `right = mid`. *(Notice we do not use `mid - 1` like a normal binary search, because `mid` itself might be the answer!)*
   - **If it is good (`false`):** We know this version is fine, and all versions before it are fine. The bad version MUST be after it. We discard the left half by setting `left = mid + 1`.
4. When `left` exactly equals `right`, we have narrowed our search down to a single version. That is our answer!

### The Code

```javascript
var solution = function(isBadVersion) {
    return function(n) {
        let left = 1;
        let right = n;
        
        while (left < right) {
            // Safe midpoint calculation
            let mid = left + Math.floor((right - left) / 2);
            
            if (isBadVersion(mid)) {
                // The current version is bad, so the FIRST bad one is either this or to the left
                right = mid; 
            } else {
                // The current version is good, so the FIRST bad one MUST be strictly to the right
                left = mid + 1;
            }
        }
        
        // When left and right converge, we've found the boundary
        return left;
    };
};
```

### Complexity
- **Time Complexity:** `O(log n)` because the search space is cut in half with every iteration.
- **Space Complexity:** `O(1)` because we only maintain two integer pointers.
