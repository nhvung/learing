import java.util.*;
import java.util.concurrent.*;

/**
 * Exercise 10: OCP Practice — bring it all together
 *
 * 1. RECORDS + COMPARABLE
 *    Define a record Product(String name, String category, double price)
 *    that implements Comparable<Product> (natural order: by price ascending).
 *    Add a static Comparator that sorts by category then name.
 *
 * 2. SEALED INTERFACE
 *    Define a sealed interface Discount permits PercentDiscount, FixedDiscount.
 *    - PercentDiscount(double percent) — reduces price by percent%
 *    - FixedDiscount(double amount)    — reduces price by fixed amount (floor at 0)
 *    Use a switch expression to compute the final price for any Discount type.
 *
 * 3. CONCURRENCY
 *    Using CompletableFuture, simulate fetching prices for 3 products in parallel
 *    (each sleeps 100ms), then combine all results and print the total.
 *
 * 4. AUTO-CLOSEABLE
 *    Create a PriceCache class that implements AutoCloseable.
 *    It stores prices in a Map. close() prints "Cache cleared" and empties the map.
 *    Use it in a try-with-resources block.
 *
 * 5. MODERN JAVA
 *    Use var, a text-block JSON string, and pattern matching instanceof
 *    to print a summary of a mixed List<Object> containing Products and Strings.
 */
public class Exercise10 {

    // TODO: 1. Product record + Comparable + Comparator

    // TODO: 2. Discount sealed interface + implementations

    // TODO: 3. computeFinalPrice(Product p, Discount d) using switch expression

    // TODO: 4. PriceCache implements AutoCloseable

    public static void main(String[] args) throws Exception {
        // TODO: 1. Create products, sort by natural order and by category+name

        // TODO: 2. Apply discounts using switch expression

        // TODO: 3. Fetch prices in parallel with CompletableFuture

        // TODO: 4. Use PriceCache in try-with-resources

        // TODO: 5. Mixed list with var + pattern matching instanceof
    }
}
