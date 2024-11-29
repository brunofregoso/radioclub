export function getRandomCombination<T>(array1: T[], array2: T[]): T[] {
    // Step 1: Combine both arrays
    const combinedArray = [...array1, ...array2];
  
    // Step 2: Shuffle the combined array
    for (let i = combinedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
    }
  
    // Step 3: Select the first half of the shuffled array
    const halfLength = Math.floor(combinedArray.length / 2);
    return combinedArray.slice(0, halfLength);
  }
  
  
  