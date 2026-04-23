import java.util.Scanner;

/**
 * Exercise 1: Simple Calculator
 *
 * Build a calculator that:
 * 1. Reads two numbers from the user
 * 2. Reads an operator (+, -, *, /)
 * 3. Prints the result
 * 4. Handles division by zero gracefully
 * 5. Loops until the user types "exit"
 */
public class Exercise01 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("=== Simple Calculator ===");
        System.out.println("Type 'exit' to quit.");

        while (true) {
            System.out.print("Enter expression (e.g. 5 + 3): ");
            String input = scanner.nextLine().trim();

            if (input.equalsIgnoreCase("exit")) break;

            // TODO: Parse the input into two numbers and an operator
            // Hint: String[] parts = input.split(" ");

            // TODO: Use a switch or if/else to compute the result

            // TODO: Print the result formatted to 2 decimal places

            // TODO: Handle division by zero — print an error message instead of crashing
        }

        System.out.println("Goodbye!");
        scanner.close();
    }
}
