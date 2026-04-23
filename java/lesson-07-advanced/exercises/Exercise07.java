import java.util.*;
import java.util.stream.*;

/**
 * Exercise 7: Transaction Processor (Stream API)
 *
 * Given a list of transactions, use the Stream API to:
 * 1. Find all transactions above $500 and print them sorted by amount (descending)
 * 2. Calculate the total of all transactions
 * 3. Find the highest single transaction
 * 4. Group transactions by category and sum the total per category
 * 5. Get the top 3 categories by total spending
 * 6. Return an Optional<Transaction> for a specific transaction ID, print "not found" if absent
 *
 * Do NOT use any loops — solve everything with streams.
 */
public class Exercise07 {

    record Transaction(String id, String category, double amount) {}

    public static void main(String[] args) {
        List<Transaction> transactions = List.of(
            new Transaction("T001", "Food",          120.50),
            new Transaction("T002", "Electronics",   850.00),
            new Transaction("T003", "Food",            45.20),
            new Transaction("T004", "Travel",        1200.00),
            new Transaction("T005", "Electronics",   320.75),
            new Transaction("T006", "Travel",         95.00),
            new Transaction("T007", "Clothing",      220.00),
            new Transaction("T008", "Food",          310.80),
            new Transaction("T009", "Electronics",   650.00),
            new Transaction("T010", "Clothing",       88.00)
        );

        // TODO: 1. Transactions above $500, sorted descending by amount

        // TODO: 2. Total of all transactions

        // TODO: 3. Highest single transaction

        // TODO: 4. Total spending per category

        // TODO: 5. Top 3 categories by total

        // TODO: 6. Find transaction "T007" — print it; find "T999" — print "not found"
    }
}
