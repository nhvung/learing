import java.util.*;

// Implementing Comparable makes the class sortable by default
class Employee implements Comparable<Employee> {
    private final String name;
    private final String department;
    private final double salary;

    public Employee(String name, String department, double salary) {
        this.name       = name;
        this.department = department;
        this.salary     = salary;
    }

    public String getName()       { return name; }
    public String getDepartment() { return department; }
    public double getSalary()     { return salary; }

    // Natural order: by name alphabetically
    @Override
    public int compareTo(Employee other) {
        return this.name.compareTo(other.name);
    }

    @Override
    public String toString() {
        return String.format("%-10s %-12s $%.0f", name, department, salary);
    }
}

public class ComparableDemo {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>(Arrays.asList(
            new Employee("Carol",  "Engineering", 95000),
            new Employee("Alice",  "Marketing",   72000),
            new Employee("Bob",    "Engineering", 88000),
            new Employee("Diana",  "HR",          65000),
            new Employee("Edward", "Marketing",   78000)
        ));

        // Natural order (Comparable — by name)
        Collections.sort(employees);
        System.out.println("=== By Name (natural order) ===");
        employees.forEach(System.out::println);

        // Comparator: by salary descending
        employees.sort(Comparator.comparingDouble(Employee::getSalary).reversed());
        System.out.println("\n=== By Salary (descending) ===");
        employees.forEach(System.out::println);

        // Comparator chaining: by department, then by name within department
        employees.sort(Comparator.comparing(Employee::getDepartment)
                                 .thenComparing(Employee::getName));
        System.out.println("\n=== By Department, then Name ===");
        employees.forEach(System.out::println);

        // Min/Max using Comparator
        Employee highest = Collections.max(employees,
                Comparator.comparingDouble(Employee::getSalary));
        System.out.println("\nHighest paid: " + highest);
    }
}
