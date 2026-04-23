package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	showGoroutines()
	fmt.Println("---")
	showChannels()
	fmt.Println("---")
	showSelect()
	fmt.Println("---")
	showWaitGroup()
	fmt.Println("---")
	showMutex()
	fmt.Println("---")
	showWorkerPool()
}

// ─── Goroutines ───────────────────────────────────────────────────────────────

func showGoroutines() {
	fmt.Println("=== Goroutines ===")

	done := make(chan bool)

	go func(name string) {
		fmt.Printf("goroutine %s started\n", name)
		time.Sleep(50 * time.Millisecond)
		fmt.Printf("goroutine %s done\n", name)
		done <- true
	}("A")

	go func(name string) {
		fmt.Printf("goroutine %s started\n", name)
		time.Sleep(30 * time.Millisecond)
		fmt.Printf("goroutine %s done\n", name)
		done <- true
	}("B")

	// Wait for both goroutines
	<-done
	<-done
	fmt.Println("both goroutines finished")
}

// ─── Channels ─────────────────────────────────────────────────────────────────

func generator(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func showChannels() {
	fmt.Println("=== Channels ===")

	// Unbuffered channel — synchronizes sender and receiver
	ch := make(chan string)
	go func() {
		ch <- "hello from goroutine"
	}()
	msg := <-ch
	fmt.Println("received:", msg)

	// Buffered channel — sender doesn't block until full
	buf := make(chan int, 3)
	buf <- 1
	buf <- 2
	buf <- 3
	fmt.Println("buffered:", <-buf, <-buf, <-buf)

	// Pipeline: generator → square → print
	nums := generator(1, 2, 3, 4, 5)
	squares := square(nums)
	fmt.Print("squares: ")
	for v := range squares {
		fmt.Printf("%d ", v)
	}
	fmt.Println()
}

// ─── Select ───────────────────────────────────────────────────────────────────

func showSelect() {
	fmt.Println("=== Select ===")

	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)

	go func() {
		time.Sleep(20 * time.Millisecond)
		ch1 <- "one"
	}()
	go func() {
		time.Sleep(10 * time.Millisecond)
		ch2 <- "two"
	}()

	// Receive whichever comes first
	for i := 0; i < 2; i++ {
		select {
		case msg := <-ch1:
			fmt.Println("ch1:", msg)
		case msg := <-ch2:
			fmt.Println("ch2:", msg)
		}
	}

	// Select with timeout
	slow := make(chan int)
	select {
	case v := <-slow:
		fmt.Println("received:", v)
	case <-time.After(50 * time.Millisecond):
		fmt.Println("timeout — no value received in 50ms")
	}

	// Non-blocking select with default
	ch := make(chan int, 1)
	select {
	case v := <-ch:
		fmt.Println("got:", v)
	default:
		fmt.Println("channel empty — default branch")
	}
	ch <- 42
	select {
	case v := <-ch:
		fmt.Println("got:", v)
	default:
		fmt.Println("channel empty — default branch")
	}
}

// ─── WaitGroup ────────────────────────────────────────────────────────────────

func showWaitGroup() {
	fmt.Println("=== WaitGroup ===")

	var wg sync.WaitGroup
	results := make([]string, 5)

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			time.Sleep(time.Duration(5-id) * 10 * time.Millisecond)
			results[id] = fmt.Sprintf("worker-%d-done", id)
		}(i) // pass i as argument to avoid closure capturing loop variable
	}

	wg.Wait()
	fmt.Println("all workers done:", results)
}

// ─── Mutex ────────────────────────────────────────────────────────────────────

type SafeCounter struct {
	mu    sync.Mutex
	count int
}

func (c *SafeCounter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count++
}

func (c *SafeCounter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}

func showMutex() {
	fmt.Println("=== Mutex ===")

	counter := &SafeCounter{}
	var wg sync.WaitGroup

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}

	wg.Wait()
	fmt.Println("counter value (should be 1000):", counter.Value())
}

// ─── Worker Pool ──────────────────────────────────────────────────────────────

func showWorkerPool() {
	fmt.Println("=== Worker Pool ===")

	const numWorkers = 3
	const numJobs = 9

	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// Start workers
	var wg sync.WaitGroup
	for w := 0; w < numWorkers; w++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for job := range jobs {
				// Simulate work
				result := job * job
				fmt.Printf("  worker %d processed job %d → %d\n", workerID, job, result)
				results <- result
			}
		}(w)
	}

	// Send jobs
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	// Close results when all workers finish
	go func() {
		wg.Wait()
		close(results)
	}()

	// Collect results
	total := 0
	for r := range results {
		total += r
	}
	fmt.Println("total:", total) // 1+4+9+16+25+36+49+64+81 = 285
}
