export function largestAltitude(gain) {
    let currentAltitude = 0;
    let maxAltitude = 0; // The biker always starts at altitude 0
    
    for (let i = 0; i < gain.length; i++) {
        currentAltitude += gain[i];
        
        if (currentAltitude > maxAltitude) {
            maxAltitude = currentAltitude;
        }
    }
    
    return maxAltitude;
}
