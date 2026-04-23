import java.util.*;

/**
 * Exercise 3: Student Score Analyzer
 *
 * Given a list of student scores:
 * 1. Find and print the top 3 scores
 * 2. Compute and print the class average
 * 3. Sort the scores, then use binary search to check if a given score exists
 * 4. Group scores into buckets: A (90-100), B (80-89), C (70-79), F (<70)
 *    and print how many students are in each bucket
 *
 * Use ArrayList, Collections utility methods, and your own binarySearch implementation.
 */
public class Exercise03 {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(Arrays.asList(
            88, 72, 95, 61, 83, 79, 92, 55, 87, 74, 96, 68, 81, 77, 90
        ));

        // TODO: Print top 3 scores

        // TODO: Print average score

        // TODO: Sort scores, then binary search for 87 and 60

        // TODO: Count A/B/C/F grades and print the counts
    }
}
