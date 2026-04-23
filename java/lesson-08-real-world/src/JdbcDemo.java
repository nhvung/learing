import java.sql.*;

/**
 * JDBC Demo using SQLite (file-based, no server needed).
 * Requires sqlite-jdbc-*.jar on the classpath.
 *
 * Run:
 *   javac -cp sqlite-jdbc.jar JdbcDemo.java
 *   java  -cp .:sqlite-jdbc.jar JdbcDemo
 */
public class JdbcDemo {
    private static final String URL = "jdbc:sqlite:students.db";

    public static void main(String[] args) throws SQLException {
        // try-with-resources: connection is closed automatically
        try (Connection conn = DriverManager.getConnection(URL)) {
            System.out.println("Connected to SQLite: " + URL);

            createTable(conn);
            insertStudents(conn);
            queryStudents(conn);
            updateGpa(conn, "S002", 3.5);
            deleteStudent(conn, "S004");
            queryStudents(conn);
        }
    }

    static void createTable(Connection conn) throws SQLException {
        String sql = """
                CREATE TABLE IF NOT EXISTS students (
                    id    TEXT PRIMARY KEY,
                    name  TEXT NOT NULL,
                    email TEXT,
                    gpa   REAL DEFAULT 0.0
                )
                """;
        // Statement: for DDL (no parameters)
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        }
    }

    static void insertStudents(Connection conn) throws SQLException {
        String sql = "INSERT OR IGNORE INTO students(id, name, email, gpa) VALUES(?,?,?,?)";
        // PreparedStatement: for DML — prevents SQL injection
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            Object[][] data = {
                {"S001", "Alice",  "alice@example.com",  3.8},
                {"S002", "Bob",    "bob@example.com",    3.2},
                {"S003", "Carol",  "carol@example.com",  3.9},
                {"S004", "David",  "david@example.com",  2.7},
            };
            for (Object[] row : data) {
                ps.setString(1, (String) row[0]);
                ps.setString(2, (String) row[1]);
                ps.setString(3, (String) row[2]);
                ps.setDouble(4, (Double) row[3]);
                ps.executeUpdate();
            }
        }
        System.out.println("Inserted students.");
    }

    static void queryStudents(Connection conn) throws SQLException {
        String sql = "SELECT id, name, gpa FROM students ORDER BY gpa DESC";
        try (Statement stmt = conn.createStatement();
             ResultSet rs   = stmt.executeQuery(sql)) {
            System.out.println("--- Students ---");
            while (rs.next()) {
                System.out.printf("  [%s] %-10s GPA: %.1f%n",
                        rs.getString("id"), rs.getString("name"), rs.getDouble("gpa"));
            }
        }
    }

    static void updateGpa(Connection conn, String id, double gpa) throws SQLException {
        String sql = "UPDATE students SET gpa = ? WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setDouble(1, gpa);
            ps.setString(2, id);
            int rows = ps.executeUpdate();
            System.out.println("Updated " + rows + " row(s) for " + id);
        }
    }

    static void deleteStudent(Connection conn, String id) throws SQLException {
        String sql = "DELETE FROM students WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id);
            int rows = ps.executeUpdate();
            System.out.println("Deleted " + rows + " row(s): " + id);
        }
    }
}
