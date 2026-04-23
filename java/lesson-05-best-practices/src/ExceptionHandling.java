import java.io.*;

// Custom checked exception
class InsufficientFundsException extends Exception {
    private double amount;

    public InsufficientFundsException(double amount) {
        super("Insufficient funds: need " + amount + " more");
        this.amount = amount;
    }

    public double getShortfall() { return amount; }
}

// Custom unchecked exception
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(int age) {
        super("Invalid age: " + age + ". Must be between 0 and 150.");
    }
}

class Wallet {
    private double balance;

    public Wallet(double initialBalance) {
        this.balance = initialBalance;
    }

    // Checked exception: caller MUST handle it (compile error if not)
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }

    public double getBalance() { return balance; }
}

public class ExceptionHandling {
    public static void main(String[] args) {
        // --- Checked exception handling ---
        Wallet wallet = new Wallet(50.0);
        try {
            wallet.withdraw(30.0);
            System.out.println("Withdrew 30. Balance: " + wallet.getBalance());
            wallet.withdraw(40.0);   // will fail
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.printf("Shortfall: $%.2f%n", e.getShortfall());
        } finally {
            System.out.println("Transaction attempt complete.");   // always runs
        }

        // --- Multiple catch blocks ---
        try {
            String s = null;
            System.out.println(s.length());   // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Caught NPE: " + e.getClass().getSimpleName());
        } catch (Exception e) {
            System.out.println("Caught generic: " + e.getMessage());
        }

        // --- try-with-resources: auto-closes the resource ---
        try (StringReader sr = new StringReader("hello")) {
            System.out.println("Read: " + (char) sr.read());
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        }

        // --- Unchecked exception ---
        try {
            validateAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println("Validation failed: " + e.getMessage());
        }
    }

    static void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException(age);
        }
        System.out.println("Valid age: " + age);
    }
}
