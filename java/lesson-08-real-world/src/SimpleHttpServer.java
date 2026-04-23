import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class SimpleHttpServer {

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/hello",    new HelloHandler());
        server.createContext("/api/echo",     new EchoHandler());
        server.createContext("/api/students", new StudentsHandler());

        server.start();
        System.out.println("Server running at http://localhost:8080");
        System.out.println("Try: /api/hello, /api/echo?msg=hi, /api/students");
    }

    static void send(HttpExchange ex, int status, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        ex.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }

    // GET /api/hello
    static class HelloHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange ex) throws IOException {
            if (!"GET".equals(ex.getRequestMethod())) {
                send(ex, 405, "{\"error\":\"Method Not Allowed\"}");
                return;
            }
            send(ex, 200, "{\"message\":\"Hello from Java HTTP Server!\"}");
        }
    }

    // GET /api/echo?msg=yourMessage
    static class EchoHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange ex) throws IOException {
            String query = ex.getRequestURI().getQuery();   // "msg=hello"
            String msg = "";
            if (query != null) {
                for (String param : query.split("&")) {
                    if (param.startsWith("msg=")) {
                        msg = param.substring(4);
                    }
                }
            }
            send(ex, 200, "{\"echo\":\"" + msg + "\"}");
        }
    }

    // GET /api/students — returns a hardcoded JSON array
    static class StudentsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange ex) throws IOException {
            String json = """
                    [
                      {"id":"S001","name":"Alice","gpa":3.8},
                      {"id":"S002","name":"Bob","gpa":3.2},
                      {"id":"S003","name":"Carol","gpa":3.9}
                    ]
                    """;
            send(ex, 200, json);
        }
    }
}
