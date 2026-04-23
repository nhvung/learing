'use strict';

// Reverse a string. Handles Unicode correctly.
// reverse('hello') → 'olleh'
// reverse('Go 🚀') → '🚀 oG'
function reverse(str) {
  // TODO: spread into array, reverse, join
  return '';
}

// Return true if `str` is a palindrome (case-insensitive, letters only).
// isPalindrome('racecar') → true
// isPalindrome('A man a plan a canal Panama') → true
function isPalindrome(str) {
  // TODO: normalize (lower, remove non-letters), compare with its reverse
  return false;
}

// Count vowels (a, e, i, o, u) case-insensitively.
// countVowels('Hello World') → 3
function countVowels(str) {
  // TODO: filter/reduce
  return 0;
}

// Convert to title case.
// titleCase('the quick brown fox') → 'The Quick Brown Fox'
function titleCase(str) {
  // TODO: split on whitespace, capitalize first letter of each word, join
  return '';
}

// Truncate to maxLen chars. If truncated, end with '...' (counts toward maxLen).
// truncate('hello world', 8) → 'hello...'
// truncate('hi', 8) → 'hi'
function truncate(str, maxLen) {
  // TODO: implement
  return '';
}

module.exports = { reverse, isPalindrome, countVowels, titleCase, truncate };
