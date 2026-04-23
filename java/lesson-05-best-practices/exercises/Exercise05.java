import java.util.*;

/**
 * Exercise 5: Library System
 *
 * Build a mini library system using design patterns:
 *
 * 1. Use the BUILDER pattern for the Book class:
 *    Book has: title (required), author (required), isbn (optional),
 *    yearPublished (optional), genre (optional)
 *
 * 2. Use the OBSERVER pattern for checkout notifications:
 *    - BookListener interface with onCheckout(Book) and onReturn(Book)
 *    - Library notifies all registered listeners when a book is checked out/returned
 *    - Implement two listeners: LogListener (prints to console) and EmailListener (simulates email)
 *
 * 3. Library class:
 *    - addBook(Book), checkout(String title), returnBook(String title)
 *    - Throws BookNotFoundException (custom exception) if title not found
 *    - Throws BookUnavailableException if book is already checked out
 *
 * 4. Main: demonstrate adding books, checking out, returning, and duplicate checkout error
 */
public class Exercise05 {

    // TODO: Book class with Builder pattern

    // TODO: Custom exceptions: BookNotFoundException, BookUnavailableException

    // TODO: BookListener interface and two implementations

    // TODO: Library class with observer registration and notification

    public static void main(String[] args) {
        // TODO: Create library, add books, register listeners, demonstrate checkout/return
    }
}
