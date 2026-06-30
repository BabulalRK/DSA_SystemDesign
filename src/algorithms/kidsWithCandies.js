// Approach 1: Declarative (Modern JavaScript using Map)
export function kidsWithCandiesMap(candies, extraCandies) {
    // Step 1: Find the maximum number of candies any single kid currently has
    const maxCandies = Math.max(...candies);
    
    // Step 2: Check if each kid's candies + extraCandies is >= maxCandies
    return candies.map(candy => candy + extraCandies >= maxCandies);
}

// Approach 2: Imperative (Traditional For Loop)
export function kidsWithCandiesForLoop(candies, extraCandies) {
    let maxCandies = 0;
    
    // Step 1: Find max manually
    for (let i = 0; i < candies.length; i++) {
        if (candies[i] > maxCandies) {
            maxCandies = candies[i];
        }
    }
    
    const result = new Array(candies.length);
    
    // Step 2: Populate boolean array manually
    for (let i = 0; i < candies.length; i++) {
        result[i] = candies[i] + extraCandies >= maxCandies;
    }
    
    return result;
}
