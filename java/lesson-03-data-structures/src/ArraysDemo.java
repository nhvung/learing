import java.util.Arrays;

public class ArraysDemo {
    public static void main(String[] args) {
        // --- 1D Array ---
        int[] numbers = {5, 3, 8, 1, 9, 2, 7};
        System.out.println("Original: " + Arrays.toString(numbers));

        Arrays.sort(numbers);
        System.out.println("Sorted:   " + Arrays.toString(numbers));

        // Binary search (array must be sorted first)
        int idx = Arrays.binarySearch(numbers, 8);
        System.out.println("Index of 8: " + idx);

        // --- 2D Array (matrix) ---
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("\nMatrix:");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.printf("%3d", val);
            }
            System.out.println();
        }

        // --- Array copy ---
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        int[] partial = Arrays.copyOfRange(numbers, 2, 5);
        System.out.println("Partial copy: " + Arrays.toString(partial));

        // --- Filling ---
        int[] zeros = new int[5];
        Arrays.fill(zeros, 0);
        System.out.println("Filled: " + Arrays.toString(zeros));
    }
}
