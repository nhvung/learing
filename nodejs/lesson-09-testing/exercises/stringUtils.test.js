'use strict';

const { reverse, isPalindrome, countVowels, titleCase, truncate } = require('./stringUtils');

describe('reverse', () => {
  test.each([
    ['hello', 'olleh'],
    ['', ''],
    ['a', 'a'],
    ['abcde', 'edcba'],
  ])('reverse(%s) = %s', (input, expected) => {
    expect(reverse(input)).toBe(expected);
  });
});

describe('isPalindrome', () => {
  test.each([
    ['racecar', true],
    ['hello', false],
    ['A man a plan a canal Panama', true],
    ['Was it a car or a cat I saw', true],
    ['', true],
    ['a', true],
  ])('isPalindrome(%s) = %s', (input, expected) => {
    expect(isPalindrome(input)).toBe(expected);
  });
});

describe('countVowels', () => {
  test.each([
    ['hello', 2],
    ['rhythm', 0],
    ['aeiou', 5],
    ['AEIOU', 5],
    ['Hello World', 3],
    ['', 0],
  ])('countVowels(%s) = %i', (input, expected) => {
    expect(countVowels(input)).toBe(expected);
  });
});

describe('titleCase', () => {
  test.each([
    ['hello world', 'Hello World'],
    ['the quick brown fox', 'The Quick Brown Fox'],
    ['', ''],
    ['a', 'A'],
  ])('titleCase(%s) = %s', (input, expected) => {
    expect(titleCase(input)).toBe(expected);
  });
});

describe('truncate', () => {
  test.each([
    ['hello world', 8, 'hello...'],
    ['hi', 8, 'hi'],
    ['hello', 5, 'hello'],
    ['hello world', 3, '...'],
    ['go', 2, 'go'],
  ])('truncate(%s, %i) = %s', (input, maxLen, expected) => {
    expect(truncate(input, maxLen)).toBe(expected);
  });
});
