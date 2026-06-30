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

## Understanding the "Hypothetical Twist"

At first glance, it might seem like we just need to find the kid who currently has the maximum number of candies and return `true` for them, and `false` for everyone else. 

However, there is a **hypothetical twist** in this problem! The problem asks: *"If I magically gave ALL of my `extraCandies` to this specific kid, would they NOW tie or beat the kid who currently has the most?"*

Let's break down **Example 1** step-by-step to see this in action:
`candies = [2, 3, 5, 1, 3]`, `extraCandies = 3`

Kid 3 currently has the most candies (`5`). We use this `5` as the target for everyone to beat! Now let's test the hypothetical scenario for every single kid:

1. **Kid 1 (starts with 2):** If we give them the 3 extra candies, they have `2 + 3 = 5`. Because `5` ties the maximum target, Kid 1 gets **`true`**.
2. **Kid 2 (starts with 3):** If we give them the 3 extra candies, they have `3 + 3 = 6`. Because `6` beats the target, Kid 2 gets **`true`**.
3. **Kid 3 (starts with 5):** If we give them the 3 extra candies, they have `5 + 3 = 8`. Because `8` beats the target, Kid 3 gets **`true`**.
4. **Kid 4 (starts with 1):** If we give them the 3 extra candies, they have `1 + 3 = 4`. Because `4` is less than the `5` target, Kid 4 gets **`false`**.
5. **Kid 5 (starts with 3):** If we give them the 3 extra candies, they have `3 + 3 = 6`. Because `6` beats the target, Kid 5 gets **`true`**.

This hypothetical testing is why the final array for Example 1 is `[true, true, true, false, true]`! Every single kid gets a chance to see if the `extraCandies` could push them to the top spot.

---


## Solution 1: Declarative Approach (Map & Math.max)

We can solve this efficiently in **O(n) Time** and **O(n) Space** with a two-step process. *(Note: Even though we iterate through the array twice, making it O(2n) operations, Big-O notation drops constants, so it simplifies to O(n) time!)*:
1. Iterate through the array once to find the maximum number of candies any single kid currently possesses.
2. Iterate through the array a second time, adding `extraCandies` to each kid's amount, and evaluating if that new amount is `>=` the maximum we found in step 1.

By leveraging modern JavaScript features like `Math.max` with the spread operator (`...`) and the `Array.prototype.map()` function, we can write an incredibly clean and expressive solution:

```javascript
function kidsWithCandies(candies, extraCandies) {
    const maxCandies = Math.max(...candies);
    return candies.map(candy => candy + extraCandies >= maxCandies);
}
```

## Solution 2: Imperative Approach (Traditional For-Loops)

If you are interviewing or prefer absolute control over memory and execution, you might want to use traditional `for` loops. While `map` is elegant, traditional loops avoid the overhead of function callbacks and abstract methods. The logic is identical:

```javascript
function kidsWithCandies(candies, extraCandies) {
    let maxCandies = 0;
    
    // 1. Find the max candies manually
    for (let i = 0; i < candies.length; i++) {
        if (candies[i] > maxCandies) {
            maxCandies = candies[i];
        }
    }
    
    // 2. Pre-allocate the result array for speed
    const result = new Array(candies.length);
    
    // 3. Populate the result array manually
    for (let i = 0; i < candies.length; i++) {
        result[i] = candies[i] + extraCandies >= maxCandies;
    }
    
    return result;
}
```

**Which should you use?** 
Solution 1 (Map) is more "Declarative" (you declare *what* you want to do). It is standard in modern web development (like React) because it is concise and easy to read. 
Solution 2 (For-Loop) is more "Imperative" (you declare exactly *how* to do it step-by-step). It is technically slightly faster at a micro-optimization level, making it popular in pure DSA coding interviews.
