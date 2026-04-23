// ── Lesson 09 Exercises ───────────────────────────────────────────────────────
// Write the implementation AND the tests in this file.

namespace Exercises;

// ── StringUtils (implement this) ──────────────────────────────────────────────

public static class StringUtils
{
    // TODO: implement Reverse(string s) → reversed string
    public static string Reverse(string s) => throw new NotImplementedException();

    // TODO: implement IsPalindrome(string s) → true if s == s reversed (ignore case)
    public static bool IsPalindrome(string s) => throw new NotImplementedException();

    // TODO: implement WordCount(string s) → number of words (split on whitespace)
    public static int WordCount(string s) => throw new NotImplementedException();

    // TODO: implement Truncate(string s, int maxLen, string ellipsis = "...")
    //       → if s.Length <= maxLen return s, else return s[..maxLen] + ellipsis
    public static string Truncate(string s, int maxLen, string ellipsis = "...") =>
        throw new NotImplementedException();
}

// ── Tests (write these) ───────────────────────────────────────────────────────

public class StringUtilsTests
{
    // Exercise 1: Write [Theory] tests for Reverse with at least 4 cases
    // (empty string, single char, normal word, sentence).
    // TODO

    // Exercise 2: Write [Theory] tests for IsPalindrome.
    // Include "racecar" (true), "hello" (false), "Madam" (true, ignore case).
    // TODO

    // Exercise 3: Write [Fact] tests for WordCount.
    // Test: "", "hello", "hello world", "  lots  of  spaces  ".
    // TODO

    // Exercise 4: Write [Theory] tests for Truncate.
    // Test: short string (no truncation), exact length (no truncation),
    // too long (truncated with "..."), custom ellipsis ("…").
    // TODO

    // Exercise 5: Write a test that verifies Reverse throws ArgumentNullException
    // when passed null. (You'll need to handle this in the implementation too.)
    // TODO
}
