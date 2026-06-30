export function decode(encoded, first) {
    // The original array will be 1 element larger than the encoded array
    const arr = new Array(encoded.length + 1);
    
    // The first element is explicitly provided
    arr[0] = first;
    
    // Sequentially decode using the XOR property:
    // If a ^ b = c, then a ^ c = b
    for (let i = 0; i < encoded.length; i++) {
        arr[i + 1] = arr[i] ^ encoded[i];
    }
    
    return arr;
}
