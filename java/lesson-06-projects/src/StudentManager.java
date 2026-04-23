import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class StudentManager {
    private final Map<String, Student> students = new LinkedHashMap<>();
    private final Path dataFile;

    public StudentManager(String filePath) {
        this.dataFile = Path.of(filePath);
    }

    public void addStudent(Student student) {
        if (students.containsKey(student.getId())) {
            throw new IllegalArgumentException("Student ID already exists: " + student.getId());
        }
        students.put(student.getId(), student);
    }

    public void removeStudent(String id) {
        if (students.remove(id) == null) {
            throw new NoSuchElementException("Student not found: " + id);
        }
    }

    public Student findById(String id) {
        Student s = students.get(id);
        if (s == null) throw new NoSuchElementException("Student not found: " + id);
        return s;
    }

    public List<Student> findByName(String name) {
        String lower = name.toLowerCase();
        return students.values().stream()
                .filter(s -> s.getName().toLowerCase().contains(lower))
                .collect(Collectors.toList());
    }

    public List<Student> getAllSortedByGpa() {
        return students.values().stream()
                .sorted(Comparator.comparingDouble(Student::getGpa).reversed())
                .collect(Collectors.toList());
    }

    public void enroll(String studentId, String courseName) {
        findById(studentId).addCourse(courseName);
    }

    public void save() throws IOException {
        try (PrintWriter pw = new PrintWriter(Files.newBufferedWriter(dataFile))) {
            for (Student s : students.values()) {
                pw.println(s.toCsv());
            }
        }
        System.out.println("Saved " + students.size() + " students to " + dataFile);
    }

    public void load() throws IOException {
        if (!Files.exists(dataFile)) return;
        students.clear();
        for (String line : Files.readAllLines(dataFile)) {
            if (!line.isBlank()) {
                Student s = Student.fromCsv(line);
                students.put(s.getId(), s);
            }
        }
        System.out.println("Loaded " + students.size() + " students from " + dataFile);
    }

    public int count() { return students.size(); }
}
