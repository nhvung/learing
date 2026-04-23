package stringutils

import "testing"

func TestReverse(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{"hello", "olleh"},
		{"Go", "oG"},
		{"", ""},
		{"a", "a"},
		{"abcde", "edcba"},
		{"Hello, 世界", "界世 ,olleH"},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := Reverse(tt.input); got != tt.want {
				t.Errorf("Reverse(%q) = %q; want %q", tt.input, got, tt.want)
			}
		})
	}
}

func TestIsPalindrome(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"racecar", true},
		{"hello", false},
		{"A man a plan a canal Panama", true},
		{"Was it a car or a cat I saw", true},
		{"Not a palindrome", false},
		{"", true},
		{"a", true},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := IsPalindrome(tt.input); got != tt.want {
				t.Errorf("IsPalindrome(%q) = %v; want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestCountVowels(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{"hello", 2},
		{"rhythm", 0},
		{"aeiou", 5},
		{"AEIOU", 5},
		{"Hello World", 3},
		{"", 0},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := CountVowels(tt.input); got != tt.want {
				t.Errorf("CountVowels(%q) = %d; want %d", tt.input, got, tt.want)
			}
		})
	}
}

func TestTitleCase(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{"hello world", "Hello World"},
		{"the quick brown fox", "The Quick Brown Fox"},
		{"go is great", "Go Is Great"},
		{"", ""},
		{"a", "A"},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := TitleCase(tt.input); got != tt.want {
				t.Errorf("TitleCase(%q) = %q; want %q", tt.input, got, tt.want)
			}
		})
	}
}

func TestTruncate(t *testing.T) {
	tests := []struct {
		input  string
		maxLen int
		want   string
	}{
		{"hello world", 8, "hello..."},
		{"hi", 8, "hi"},
		{"hello", 5, "hello"},
		{"hello world", 3, "..."},
		{"go", 2, "go"},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := Truncate(tt.input, tt.maxLen); got != tt.want {
				t.Errorf("Truncate(%q, %d) = %q; want %q", tt.input, tt.maxLen, got, tt.want)
			}
		})
	}
}

func BenchmarkReverse(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Reverse("Hello, Go World!")
	}
}
