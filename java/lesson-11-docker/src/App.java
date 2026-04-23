public class App {
    public static void main(String[] args) {
        String version = System.getenv("APP_VERSION");
        if (version == null) version = "1.0";

        System.out.println("==============================");
        System.out.println("  Java App running in Docker");
        System.out.println("  Version: " + version);
        System.out.println("  Java:    " + System.getProperty("java.version"));
        System.out.println("  OS:      " + System.getProperty("os.name"));
        System.out.println("==============================");
    }
}
