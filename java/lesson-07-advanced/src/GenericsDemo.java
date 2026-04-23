import java.util.*;

// Generic class: works with any type T
class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first  = first;
        this.second = second;
    }

    public A getFirst()  { return first; }
    public B getSecond() { return second; }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

// Generic method: find the maximum in any Comparable list
class Utils {
    public static <T extends Comparable<T>> T max(List<T> list) {
        if (list.isEmpty()) throw new NoSuchElementException("Empty list");
        T result = list.get(0);
        for (T item : list) {
            if (item.compareTo(result) > 0) result = item;
        }
        return result;
    }

    // Wildcard: accepts List<Integer>, List<Double>, etc.
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) total += n.doubleValue();
        return total;
    }
}

public class GenericsDemo {
    public static void main(String[] args) {
        Pair<String, Integer> person = new Pair<>("Alice", 30);
        Pair<Double, Boolean> result = new Pair<>(98.6, true);

        System.out.println("Person: " + person);
        System.out.println("Result: " + result);

        List<Integer> ints = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);
        System.out.println("Max int: " + Utils.max(ints));

        List<String> words = Arrays.asList("banana", "apple", "cherry");
        System.out.println("Max string: " + Utils.max(words));

        List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);
        System.out.println("Sum: " + Utils.sum(doubles));
        System.out.println("Sum (ints): " + Utils.sum(ints));
    }
}
