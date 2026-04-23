import java.io.*;
import java.nio.file.*;
import java.util.List;

public class FileIODemo {
    public static void main(String[] args) throws IOException {
        Path file = Path.of("demo.txt");

        // --- Writing to a file ---
        // try-with-resources: PrintWriter closed automatically
        try (PrintWriter pw = new PrintWriter(Files.newBufferedWriter(file))) {
            pw.println("Line 1: Hello");
            pw.println("Line 2: Java File I/O");
            pw.println("Line 3: Done");
        }
        System.out.println("File written: " + file.toAbsolutePath());

        // --- Reading all lines at once (good for small files) ---
        List<String> lines = Files.readAllLines(file);
        System.out.println("Read " + lines.size() + " lines:");
        for (String line : lines) {
            System.out.println("  " + line);
        }

        // --- Reading line by line with BufferedReader (memory-efficient for large files) ---
        System.out.println("Streaming:");
        try (BufferedReader br = Files.newBufferedReader(file)) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println("  > " + line);
            }
        }

        // --- File metadata ---
        System.out.println("Size: " + Files.size(file) + " bytes");
        System.out.println("Exists: " + Files.exists(file));

        // --- Cleanup ---
        Files.delete(file);
        System.out.println("Deleted: " + file);
    }
}
