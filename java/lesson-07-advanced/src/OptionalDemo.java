import java.util.*;

public class OptionalDemo {

    static Optional<String> findUser(int id) {
        Map<Integer, String> db = Map.of(1, "Alice", 2, "Bob", 3, "Carol");
        return Optional.ofNullable(db.get(id));
    }

    static Optional<String> getEmail(String name) {
        if (name.equals("Alice")) return Optional.of("alice@example.com");
        return Optional.empty();
    }

    public static void main(String[] args) {
        // Basic usage
        Optional<String> user = findUser(1);
        System.out.println("Found: " + user.isPresent());
        System.out.println("Name:  " + user.get());

        // Safe retrieval with defaults
        String name = findUser(99).orElse("Unknown");
        System.out.println("Missing user: " + name);

        String computed = findUser(99).orElseGet(() -> "Generated-" + UUID.randomUUID());
        System.out.println("Computed: " + computed);

        // Chaining: flatMap avoids Optional<Optional<>>
        String email = findUser(1)
                .flatMap(LambdaAndStreams -> getEmail(LambdaAndStreams))
                .orElse("no-email@example.com");
        System.out.println("Email: " + email);

        // map: transform if present
        int length = findUser(2)
                .map(String::length)
                .orElse(0);
        System.out.println("Name length: " + length);

        // ifPresent: run code only if value exists
        findUser(3).ifPresent(u -> System.out.println("Hello, " + u + "!"));

        // orElseThrow
        try {
            findUser(99).orElseThrow(() -> new NoSuchElementException("User 99 not found"));
        } catch (NoSuchElementException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }
    }
}
