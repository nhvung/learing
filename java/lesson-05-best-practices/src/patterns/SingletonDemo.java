package patterns;

// Thread-safe Singleton using initialization-on-demand holder idiom
class AppConfig {
    private String dbUrl;
    private int maxConnections;

    private AppConfig() {
        // In real code, load from a config file
        this.dbUrl = "jdbc:mysql://localhost:3306/mydb";
        this.maxConnections = 10;
    }

    private static class Holder {
        static final AppConfig INSTANCE = new AppConfig();
    }

    public static AppConfig getInstance() {
        return Holder.INSTANCE;
    }

    public String getDbUrl()        { return dbUrl; }
    public int getMaxConnections()  { return maxConnections; }
}

public class SingletonDemo {
    public static void main(String[] args) {
        AppConfig c1 = AppConfig.getInstance();
        AppConfig c2 = AppConfig.getInstance();

        System.out.println("Same instance? " + (c1 == c2));   // true
        System.out.println("DB URL: " + c1.getDbUrl());
        System.out.println("Max connections: " + c2.getMaxConnections());
    }
}
