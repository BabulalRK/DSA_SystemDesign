# Find the Highest Altitude

There is a biker going on a road trip. The road trip consists of `n + 1` points at various altitudes. The biker starts his trip on point `0` with altitude equal `0`.

You are given an integer array `gain` of length `n` where `gain[i]` is the net gain in altitude between points `i` and `i + 1` for all `(0 <= i < n)`. Return the highest altitude of a point.

### Example 1
**Input:** `gain = [-5,1,5,0,-7]`
**Output:** `1`
**Explanation:** The altitudes are `[0,-5,-4,1,1,-6]`. The highest is `1`.

### Example 2
**Input:** `gain = [-4,-3,-2,-1,4,3,2]`
**Output:** `0`
**Explanation:** The altitudes are `[0,-4,-7,-9,-10,-6,-3,-1]`. The highest is `0`.

### Constraints
- `n == gain.length`
- `1 <= n <= 100`
- `-100 <= gain[i] <= 100`

---

## Solution: Running Sum

This problem is a classic application of the **Running Sum** (or Prefix Sum) pattern! 

Instead of an array representing absolute heights, we are given an array of *changes* in height (`gain`). To find the absolute altitude at any given point, we just need to maintain a running total of these changes.

Because the problem states that the biker *starts* at altitude `0`, our maximum altitude will always be initialized to at least `0` (as seen in Example 2 where the biker only goes downhill). 

We can solve this efficiently in **O(n) Time** and **O(1) Space** by iterating through the `gain` array exactly once, keeping a running tally of our current altitude, and recording the maximum altitude we encounter along the way.

```javascript
function largestAltitude(gain) {
    let currentAltitude = 0;
    
    // The biker always starts at altitude 0
    let maxAltitude = 0; 
    
    for (let i = 0; i < gain.length; i++) {
        // Add the change in altitude to our current running sum
        currentAltitude += gain[i];
        
        // If our new altitude is the highest we've seen, record it
        if (currentAltitude > maxAltitude) {
            maxAltitude = currentAltitude;
        }
    }
    
    return maxAltitude;
}
```

This elegant approach completely avoids creating a new array to store the absolute altitudes, allowing us to achieve the absolute best possible Memory Space Complexity of `O(1)`.
