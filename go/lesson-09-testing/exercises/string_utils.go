package stringutils

// Reverse returns the string with its characters reversed.
// Reverse("hello") → "olleh"
// Reverse("Go") → "oG"
func Reverse(s string) string {
	// TODO: implement
	// Hint: convert to []rune to handle Unicode correctly
	return ""
}

// IsPalindrome reports whether s reads the same forwards and backwards.
// Case-insensitive. Ignores non-letter characters.
// IsPalindrome("racecar") → true
// IsPalindrome("A man a plan a canal Panama") → true
// IsPalindrome("hello") → false
func IsPalindrome(s string) bool {
	// TODO: implement
	// Hint: use unicode.IsLetter and unicode.ToLower from the "unicode" package
	return false
}

// CountVowels returns the number of vowels (a, e, i, o, u) in s.
// Case-insensitive.
// CountVowels("hello") → 2
// CountVowels("rhythm") → 0
func CountVowels(s string) int {
	// TODO: implement
	return 0
}

// TitleCase converts a string to title case (first letter of each word uppercase).
// TitleCase("hello world") → "Hello World"
// TitleCase("the quick brown fox") → "The Quick Brown Fox"
func TitleCase(s string) string {
	// TODO: implement
	// Hint: strings.Fields, strings.ToUpper, strings.Join
	return ""
}

// Truncate shortens s to at most maxLen characters.
// If s is longer, append "..." (the "..." counts toward maxLen).
// Truncate("hello world", 8) → "hello..."
// Truncate("hi", 8) → "hi"
func Truncate(s string, maxLen int) string {
	// TODO: implement
	return ""
}
