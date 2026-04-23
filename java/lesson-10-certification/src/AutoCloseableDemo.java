// OCP exam topic: implementing AutoCloseable and understanding try-with-resources order

class DatabaseConnection implements AutoCloseable {
    private final String name;
    private boolean open;

    public DatabaseConnection(String name) {
        this.name = name;
        this.open = true;
        System.out.println("[OPEN]  " + name);
    }

    public void query(String sql) {
        if (!open) throw new IllegalStateException(name + " is closed");
        System.out.println("[QUERY] " + name + ": " + sql);
    }

    @Override
    public void close() {
        open = false;
        System.out.println("[CLOSE] " + name);
    }
}

class Transaction implements AutoCloseable {
    private final DatabaseConnection conn;
    private boolean committed = false;

    public Transaction(DatabaseConnection conn) {
        this.conn = conn;
        System.out.println("[TX]    BEGIN");
    }

    public void commit() {
        committed = true;
        System.out.println("[TX]    COMMIT");
    }

    @Override
    public void close() {
        if (!committed) System.out.println("[TX]    ROLLBACK (not committed)");
        else System.out.println("[TX]    closed");
    }
}

public class AutoCloseableDemo {
    public static void main(String[] args) {
        System.out.println("=== Normal flow (committed) ===");
        // Resources are closed in REVERSE declaration order
        try (DatabaseConnection db = new DatabaseConnection("primary");
             Transaction tx = new Transaction(db)) {
            db.query("SELECT * FROM users");
            db.query("UPDATE users SET active = true");
            tx.commit();
        }   // tx.close() first, then db.close()

        System.out.println("\n=== Exception flow (rollback) ===");
        try (DatabaseConnection db = new DatabaseConnection("replica");
             Transaction tx = new Transaction(db)) {
            db.query("DELETE FROM logs");
            if (true) throw new RuntimeException("Disk full");   // simulated error
            tx.commit();   // never reached
        } catch (RuntimeException e) {
            System.out.println("[ERROR] " + e.getMessage());
        }
        // tx was NOT committed → close() triggers rollback
        // db.close() still called even though exception was thrown
    }
}
