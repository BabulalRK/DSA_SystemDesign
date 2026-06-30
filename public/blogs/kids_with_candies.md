# Kids With the Greatest Number of Candies

There are `n` kids with candies. You are given an integer array `candies`, where each `candies[i]` represents the number of candies the `i`th kid has, and an integer `extraCandies`, denoting the number of extra candies that you have.

Return a boolean array `result` of length `n`, where `result[i]` is `true` if, after giving the `i`th kid all the `extraCandies`, they will have the greatest number of candies among all the kids, or `false` otherwise.

Note that multiple kids can have the greatest number of candies.

### Example 1
**Input:** `candies = [2,3,5,1,3], extraCandies = 3`
**Output:** `[true,true,true,false,true]`
**Explanation:** If you give all extraCandies to:
- Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
- Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
- Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
- Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
- Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.

### Example 2
**Input:** `candies = [4,2,1,1,2], extraCandies = 1`
**Output:** `[true,false,false,false,false]`
**Explanation:** There is only 1 extra candy. Kid 1 will always have the greatest number of candies, even if a different kid is given the extra candy.

### Example 3
**Input:** `candies = [12,1,12], extraCandies = 10`
**Output:** `[true,false,true]`

### Constraints
- `n == candies.length`
- `2 <= n <= 100`
- `1 <= candies[i] <= 100`
- `1 <= extraCandies <= 50`

---

## Solution: Find Max & Map

This is a straightforward logical problem. For a kid to have the greatest number of candies after receiving the extra ones, their new total (`candies[i] + extraCandies`) must be greater than or equal to the kid who *currently* has the maximum number of candies.

We can solve this efficiently in **O(n) Time** and **O(n) Space** with a two-step process:
1. Iterate through the array once to find the maximum number of candies any single kid currently possesses.
2. Iterate through the array a second time, adding `extraCandies` to each kid's amount, and evaluating if that new amount is `>=` the maximum we found in step 1.

```javascript
function kidsWithCandies(candies, extraCandies) {
    // Step 1: Find the maximum number of candies any single kid currently has
    const maxCandies = Math.max(...candies);
    
    // Step 2: Check if each kid's candies + extraCandies is >= maxCandies
    return candies.map(candy => candy + extraCandies >= maxCandies);
}
```

By leveraging modern JavaScript features like `Math.max` with the spread operator (`...`) and the `Array.prototype.map()` function, we can write an incredibly clean and expressive solution!
