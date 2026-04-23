import java.util.ArrayList;
import java.util.List;

public class Student {
    private final String id;
    private final String name;
    private final String email;
    private double gpa;
    private final List<String> courses;

    private Student(Builder b) {
        this.id      = b.id;
        this.name    = b.name;
        this.email   = b.email;
        this.gpa     = b.gpa;
        this.courses = new ArrayList<>();
    }

    public String getId()           { return id; }
    public String getName()         { return name; }
    public String getEmail()        { return email; }
    public double getGpa()          { return gpa; }
    public List<String> getCourses(){ return List.copyOf(courses); }

    public void setGpa(double gpa)          { this.gpa = gpa; }
    public void addCourse(String course)    { courses.add(course); }
    public void removeCourse(String course) { courses.remove(course); }

    public String toCsv() {
        return String.join(",", id, name, email, String.valueOf(gpa),
                String.join(";", courses));
    }

    public static Student fromCsv(String line) {
        String[] p = line.split(",", 5);
        Student s = new Builder(p[0], p[1], p[2])
                .gpa(Double.parseDouble(p[3]))
                .build();
        if (p.length == 5 && !p[4].isEmpty()) {
            for (String course : p[4].split(";")) {
                s.addCourse(course);
            }
        }
        return s;
    }

    @Override
    public String toString() {
        return String.format("[%s] %s (GPA: %.2f) - Courses: %s", id, name, gpa, courses);
    }

    public static class Builder {
        private final String id, name, email;
        private double gpa = 0.0;

        public Builder(String id, String name, String email) {
            this.id    = id;
            this.name  = name;
            this.email = email;
        }

        public Builder gpa(double gpa) { this.gpa = gpa; return this; }
        public Student build()          { return new Student(this); }
    }
}
