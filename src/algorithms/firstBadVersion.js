/**
 * Definition for isBadVersion() API.
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 *
 * Example implementation of the API provided by the system:
 * const isBadVersion = function(version) {
 *    return version >= FIRST_BAD_VERSION;
 * };
 */

/**
 * Returns a function that finds the first bad version.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @param {function} isBadVersion()
 * @return {function}
 */
export const solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1;
        let right = n;
        
        // Binary Search to find the boundary
        while (left < right) {
            // Safe way to find midpoint to prevent integer overflow
            // Equivalent to Math.floor((left + right) / 2) but safer in languages with strict 32-bit integers
            let mid = left + Math.floor((right - left) / 2);
            
            if (isBadVersion(mid)) {
                // The mid is bad, so the FIRST bad version is either this one, or somewhere to the left.
                // We do NOT use mid - 1, because `mid` itself might be the very first bad version.
                right = mid;
            } else {
                // The mid is good, so all versions to the left are also good.
                // The first bad version MUST be to the right.
                left = mid + 1;
            }
        }
        
        // When left === right, we have isolated the very first bad version
        return left;
    };
};
