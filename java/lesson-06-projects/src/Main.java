import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        StudentManager manager = new StudentManager("students.csv");

        // Add students
        manager.addStudent(new Student.Builder("S001", "Alice Johnson", "alice@example.com").gpa(3.8).build());
        manager.addStudent(new Student.Builder("S002", "Bob Smith",    "bob@example.com")  .gpa(3.2).build());
        manager.addStudent(new Student.Builder("S003", "Carol Lee",    "carol@example.com").gpa(3.9).build());
        manager.addStudent(new Student.Builder("S004", "David Kim",    "david@example.com").gpa(2.7).build());

        // Enroll in courses
        manager.enroll("S001", "Data Structures");
        manager.enroll("S001", "Algorithms");
        manager.enroll("S002", "Data Structures");
        manager.enroll("S003", "Machine Learning");
        manager.enroll("S003", "Algorithms");

        // Print all sorted by GPA
        System.out.println("=== Students by GPA (highest first) ===");
        for (Student s : manager.getAllSortedByGpa()) {
            System.out.println(s);
        }

        // Search by name
        System.out.println("\n=== Search: 'lee' ===");
        List<Student> found = manager.findByName("lee");
        found.forEach(System.out::println);

        // Save and reload
        manager.save();
        StudentManager reloaded = new StudentManager("students.csv");
        reloaded.load();
        System.out.println("\n=== After reload: " + reloaded.count() + " students ===");
        reloaded.getAllSortedByGpa().forEach(System.out::println);

        // Error handling
        try {
            manager.findById("S999");
        } catch (java.util.NoSuchElementException e) {
            System.out.println("\nExpected error: " + e.getMessage());
        }
    }
}
