import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.List;

public class ConcurrencyDemo {

    // AtomicInteger: thread-safe counter (no synchronized needed)
    static AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) throws Exception {
        threadAndRunnable();
        executorService();
        completableFuture();
    }

    // --- 1. Thread and Runnable ---
    static void threadAndRunnable() throws InterruptedException {
        System.out.println("=== Thread & Runnable ===");

        Runnable task = () -> {
            String name = Thread.currentThread().getName();
            System.out.println(name + " running, counter = " + counter.incrementAndGet());
        };

        Thread t1 = new Thread(task, "Worker-1");
        Thread t2 = new Thread(task, "Worker-2");
        t1.start();
        t2.start();
        t1.join();   // main thread waits for t1 to finish
        t2.join();
        System.out.println("Both threads done. Counter: " + counter.get());
    }

    // --- 2. ExecutorService: thread pool (preferred over raw threads) ---
    static void executorService() throws InterruptedException {
        System.out.println("\n=== ExecutorService ===");
        ExecutorService pool = Executors.newFixedThreadPool(3);

        List<Callable<String>> tasks = List.of(
            () -> { Thread.sleep(100); return "Task A done"; },
            () -> { Thread.sleep(50);  return "Task B done"; },
            () -> { Thread.sleep(75);  return "Task C done"; }
        );

        try {
            List<Future<String>> futures = pool.invokeAll(tasks);
            for (Future<String> f : futures) {
                try {
                    System.out.println(f.get());
                } catch (ExecutionException e) {
                    System.out.println("Task failed: " + e.getCause().getMessage());
                }
            }
        } finally {
            pool.shutdown();
        }
    }

    // --- 3. CompletableFuture: async/non-blocking (Java 8+) ---
    static void completableFuture() throws Exception {
        System.out.println("\n=== CompletableFuture ===");

        // Chain async steps
        CompletableFuture<String> future = CompletableFuture
            .supplyAsync(() -> {
                System.out.println("Fetching user...");
                return "Alice";
            })
            .thenApplyAsync(user -> {
                System.out.println("Fetching orders for " + user + "...");
                return user + " has 5 orders";
            })
            .thenApply(String::toUpperCase);

        System.out.println("Result: " + future.get());

        // Run two tasks in parallel and combine results
        CompletableFuture<Integer> priceTask  = CompletableFuture.supplyAsync(() -> 100);
        CompletableFuture<Integer> taxTask    = CompletableFuture.supplyAsync(() -> 8);

        CompletableFuture<Integer> total = priceTask.thenCombine(taxTask, Integer::sum);
        System.out.println("Price + Tax: " + total.get());

        // Handle errors gracefully
        CompletableFuture<String> risky = CompletableFuture
            .supplyAsync(() -> { throw new RuntimeException("Service down"); })
            .exceptionally(ex -> "Fallback: " + ex.getMessage());
        System.out.println(risky.get());
    }
}
