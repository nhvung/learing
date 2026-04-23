import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // --- ArrayList: resizable array ---
        List<String> list = new ArrayList<>();
        list.add("Banana");
        list.add("Apple");
        list.add("Cherry");
        list.add(0, "Avocado");           // insert at index
        list.remove("Banana");
        Collections.sort(list);
        System.out.println("ArrayList: " + list);

        // --- LinkedList: as Queue (FIFO) ---
        Queue<String> queue = new LinkedList<>();
        queue.offer("First");
        queue.offer("Second");
        queue.offer("Third");
        System.out.println("Queue peek: " + queue.peek());
        System.out.println("Queue poll: " + queue.poll());
        System.out.println("Queue after poll: " + queue);

        // --- Stack (LIFO) ---
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Stack pop: " + stack.pop());
        System.out.println("Stack: " + stack);

        // --- HashMap: key-value pairs ---
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 82);
        scores.put("Carol", 91);
        scores.putIfAbsent("Bob", 100);   // won't overwrite existing
        System.out.println("\nScores: " + scores);
        System.out.println("Alice's score: " + scores.get("Alice"));
        System.out.println("Has Dave? " + scores.containsKey("Dave"));

        // Iterating a Map
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println("  " + entry.getKey() + " -> " + entry.getValue());
        }

        // --- HashSet: unique values, O(1) lookup ---
        Set<String> set = new HashSet<>(Arrays.asList("a", "b", "c", "a", "b"));
        System.out.println("\nSet (no duplicates): " + set);
        System.out.println("Contains 'c': " + set.contains("c"));

        // --- TreeMap: sorted by key ---
        Map<String, Integer> sorted = new TreeMap<>(scores);
        System.out.println("\nSorted by name: " + sorted);
    }
}
