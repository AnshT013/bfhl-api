// Separate numbers from input
function separateNumbers(arr) {
  return arr.filter(item => !isNaN(item));
}

// Find highest lowercase alphabet
function findHighestLowercase(arr) {
  const lowercaseLetters = arr.filter(item => /^[a-z]$/.test(item));
  if (lowercaseLetters.length === 0) return [];
  return [lowercaseLetters.sort().pop()];
}

module.exports = { separateNumbers, findHighestLowercase };
