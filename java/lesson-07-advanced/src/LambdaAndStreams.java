import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class LambdaAndStreams {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Diana", "Ed", "Fiona");

        // --- Functional interfaces ---
        Predicate<String> longName   = s -> s.length() > 4;
        Function<String, String> shout = String::toUpperCase;   // method reference
        Consumer<String> print       = System.out::println;
        Supplier<List<String>> newList = ArrayList::new;

        // Compose predicates
        Predicate<String> shortName = longName.negate();
        names.stream().filter(shortName).forEach(s -> System.out.print(s + " "));
        System.out.println();

        // --- Stream pipeline ---
        List<String> result = names.stream()
                .filter(longName)           // keep names > 4 chars
                .map(shout)                 // to uppercase
                .sorted()                   // alphabetical
                .collect(Collectors.toList());
        System.out.println("Long names (sorted): " + result);

        // --- map vs flatMap ---
        List<List<Integer>> nested = Arrays.asList(
                Arrays.asList(1, 2, 3),
                Arrays.asList(4, 5),
                Arrays.asList(6, 7, 8, 9)
        );
        List<Integer> flat = nested.stream()
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        System.out.println("Flattened: " + flat);

        // --- reduce ---
        int sum = flat.stream().reduce(0, Integer::sum);
        System.out.println("Sum: " + sum);

        // --- Collectors ---
        Map<Integer, List<String>> byLength = names.stream()
                .collect(Collectors.groupingBy(String::length));
        System.out.println("By length: " + byLength);

        long count = names.stream().filter(longName).count();
        System.out.println("Long name count: " + count);

        // --- Statistics ---
        IntSummaryStatistics stats = flat.stream()
                .mapToInt(Integer::intValue)
                .summaryStatistics();
        System.out.printf("Min=%d Max=%d Avg=%.2f%n", stats.getMin(), stats.getMax(), stats.getAverage());
    }
}
