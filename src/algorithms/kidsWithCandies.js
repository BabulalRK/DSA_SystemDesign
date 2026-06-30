export function kidsWithCandies(candies, extraCandies) {
    // Step 1: Find the maximum number of candies any single kid currently has
    const maxCandies = Math.max(...candies);
    
    // Step 2: Check if each kid's candies + extraCandies is >= maxCandies
    return candies.map(candy => candy + extraCandies >= maxCandies);
}
