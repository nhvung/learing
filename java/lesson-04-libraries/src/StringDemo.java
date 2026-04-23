public class StringDemo {
    public static void main(String[] args) {
        String s = "  Hello, Java World!  ";

        // Common String methods
        System.out.println(s.trim());                    // remove whitespace
        System.out.println(s.trim().toLowerCase());
        System.out.println(s.trim().replace("Java", "Beautiful Java"));
        System.out.println(s.trim().contains("World")); // true
        System.out.println(s.trim().startsWith("Hello"));
        System.out.println(s.trim().substring(7, 11));  // "Java"

        // Splitting
        String csv = "Alice,30,Engineer";
        String[] parts = csv.split(",");
        System.out.println("Name: " + parts[0] + ", Age: " + parts[1]);

        // Joining
        String joined = String.join(" | ", "one", "two", "three");
        System.out.println(joined);

        // Formatting
        System.out.printf("%-10s %5.2f%n", "Price:", 99.9);

        // --- StringBuilder: efficient when building strings in a loop ---
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append("item").append(i);
            if (i < 5) sb.append(", ");
        }
        System.out.println(sb.toString());

        // String comparison — ALWAYS use .equals(), never ==
        String a = new String("hello");
        String b = new String("hello");
        System.out.println(a == b);       // false (different objects)
        System.out.println(a.equals(b));  // true (same content)
    }
}
