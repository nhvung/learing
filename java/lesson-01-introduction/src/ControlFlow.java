import java.util.Scanner;

public class ControlFlow {
    public static void main(String[] args) {
        // --- if / else if / else ---
        int score = 72;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }

        // --- switch ---
        String day = "Monday";
        switch (day) {
            case "Saturday":
            case "Sunday":
                System.out.println("Weekend!");
                break;
            default:
                System.out.println("Weekday: " + day);
        }

        // --- for loop ---
        System.out.print("Counting: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // --- while loop ---
        int n = 1;
        System.out.print("Powers of 2: ");
        while (n <= 32) {
            System.out.print(n + " ");
            n *= 2;
        }
        System.out.println();

        // --- for-each loop ---
        String[] fruits = {"Apple", "Banana", "Cherry"};
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }

        // --- break and continue ---
        System.out.print("Odd numbers 1-10: ");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) continue;   // skip even
            System.out.print(i + " ");
        }
        System.out.println();

        // --- Reading user input ---
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        scanner.close();
    }
}
