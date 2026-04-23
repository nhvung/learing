'use strict';

// Exercise 1: Declare a user record using const and destructuring.
// Create an object with name, age, and optional role (default 'guest').
// Print: "Alice (age 30) — role: admin"
function printUser() {
  // TODO: declare user object, destructure, print with template literal
}

// Exercise 2: Write a function that classifies a BMI value.
// < 18.5 → 'Underweight'
// 18.5–24.9 → 'Normal'
// 25–29.9 → 'Overweight'
// >= 30 → 'Obese'
function classifyBMI(bmi) {
  // TODO: implement using if/else if/else
  return '';
}

// Exercise 3: Write a function that safely reads a nested value.
// getCity({ address: { city: 'Hanoi' } }) → 'Hanoi'
// getCity({ address: null }) → 'Unknown'
// getCity(null) → 'Unknown'
function getCity(user) {
  // TODO: use optional chaining and nullish coalescing
  return '';
}

// Exercise 4: Use a for...of loop to count how many numbers in an array
// are even. Return the count.
function countEvens(nums) {
  // TODO: implement
  return 0;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('=== Exercise 1: printUser ===');
printUser();

console.log('\n=== Exercise 2: classifyBMI ===');
console.log(classifyBMI(17));   // Underweight
console.log(classifyBMI(22));   // Normal
console.log(classifyBMI(27));   // Overweight
console.log(classifyBMI(35));   // Obese

console.log('\n=== Exercise 3: getCity ===');
console.log(getCity({ address: { city: 'Hanoi' } })); // Hanoi
console.log(getCity({ address: null }));               // Unknown
console.log(getCity(null));                            // Unknown

console.log('\n=== Exercise 4: countEvens ===');
console.log(countEvens([1, 2, 3, 4, 5, 6])); // 3
console.log(countEvens([1, 3, 5]));           // 0
console.log(countEvens([]));                  // 0
