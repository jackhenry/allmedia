/**
 * I admit that I've seen this question before and chose to take the cheeky route.
 * This algorithm has the best possible space and time complexity at O(n).
 * There is also a dynamic programming approach which is O(n^2) that uses memoization.
 */
if (process.argv.length < 3) {
  console.error('Please provide a number as a CLI argument');
  process.exit(0);
}

const number = +process.argv[2];
if (Number.isNaN(number)) {
  console.error('You entered an invalid number. Try again.');
  process.exit(0);
}

const strNumber = `${number}`.split(''); // Convert the number into a string so ascii codes
const s = strNumber.map((t) => t.charCodeAt(0)); // Array of ascii/char codes for the number
const n = s.length; // Number of digits
let k = n;
// Iteratively check if token at position i is less than position of (i - 1)
// If it i < (i - 1), the number cannot be in ascending order.
// Therefore, decrement the ascii code of s[i - 1] and assign k = i
// The k value will be used to determine which numbers will need to be flipped to 9
for (let i = n - 1; i > 0; --i) {
  if (s[i] < s[i - 1]) {
    --s[i - 1];
    k = i;
  }
}

// Starting at k, change the character code to the character code of 9
// for ever element that is located from [k, n]
for (let i = k; i < n; ++i) {
  s[i] = '9'.charCodeAt(0);
}

console.log(`Largest ascending integer: ${+String.fromCharCode(...s)}`);
