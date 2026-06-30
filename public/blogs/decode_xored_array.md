# Decode XORed Array

There is a hidden integer array `arr` that consists of `n` non-negative integers.

It was encoded into another integer array `encoded` of length `n - 1`, such that `encoded[i] = arr[i] XOR arr[i + 1]`. For example, if `arr = [1,0,2,1]`, then `encoded = [1,2,3]`.

You are given the `encoded` array. You are also given an integer `first`, that is the first element of `arr`, i.e. `arr[0]`.

Return the original array `arr`. It can be proved that the answer exists and is unique.

### Example 1
**Input:** `encoded = [1,2,3]`, `first = 1`
**Output:** `[1,0,2,1]`
**Explanation:** If `arr = [1,0,2,1]`, then `first = 1` and `encoded = [1 XOR 0, 0 XOR 2, 2 XOR 1] = [1,2,3]`

### Example 2
**Input:** `encoded = [6,2,7,3]`, `first = 4`
**Output:** `[4,2,0,7,4]`

### Constraints
- `2 <= n <= 10^4`
- `encoded.length == n - 1`
- `0 <= encoded[i] <= 10^5`
- `0 <= first <= 10^5`

---

## Solution: The Inverse Property of XOR

This problem might look intimidating if you aren't familiar with Bitwise operations, but it relies on one single, magical property of XOR (Exclusive OR, represented by `^` in JavaScript):

**XOR is its own inverse.**

If `A ^ B = C`, then it is mathematically guaranteed that `C ^ A = B` (and `C ^ B = A`). 

The problem tells us how the array was encoded:
`encoded[i] = arr[i] ^ arr[i+1]`

Using the inverse property of XOR, we can simply rearrange this formula to solve for the missing piece (`arr[i+1]`):
`arr[i+1] = arr[i] ^ encoded[i]`

Since we are given `arr[0]` (the `first` variable), we have everything we need to start a chain reaction! We use `arr[0]` and `encoded[0]` to find `arr[1]`. Then we use `arr[1]` and `encoded[1]` to find `arr[2]`, and so on.

### The Code

```javascript
function decode(encoded, first) {
    // The original array will be 1 element larger than the encoded array
    const arr = new Array(encoded.length + 1);
    
    // The first element is explicitly provided
    arr[0] = first;
    
    // Sequentially decode using the XOR property:
    for (let i = 0; i < encoded.length; i++) {
        arr[i + 1] = arr[i] ^ encoded[i];
    }
    
    return arr;
}
```

### Complexity
- **Time Complexity:** **O(n)** because we iterate through the `encoded` array exactly once.
- **Space Complexity:** **O(n)** because we allocate a new array of size `n` to store the decoded result.
