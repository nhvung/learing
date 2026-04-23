package main

import (
	"fmt"
	"sort"
)

func main() {
	showArrays()
	fmt.Println("---")
	showSlices()
	fmt.Println("---")
	showMaps()
	fmt.Println("---")
	showSorting()
}

func showArrays() {
	fmt.Println("=== Arrays ===")

	// Fixed-size — size is part of the type
	var arr [3]int = [3]int{1, 2, 3}
	arr2 := [...]string{"Go", "is", "great"} // compiler infers length

	fmt.Println("arr:", arr)
	fmt.Println("arr2:", arr2)
	fmt.Println("arr[0]:", arr[0], "len:", len(arr))

	// Arrays are value types — assignment copies the entire array
	copy := arr
	copy[0] = 99
	fmt.Println("original arr:", arr)  // unchanged
	fmt.Println("copy arr:    ", copy) // modified

	// 2D array
	grid := [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}
	fmt.Println("grid[1][2]:", grid[1][2]) // 6
}

func showSlices() {
	fmt.Println("=== Slices ===")

	// Slice literal
	s := []int{10, 20, 30, 40, 50}
	fmt.Println("slice:", s, "len:", len(s), "cap:", cap(s))

	// make — length and optional capacity
	s2 := make([]int, 3)       // [0 0 0]
	s3 := make([]int, 3, 10)   // len=3, cap=10
	fmt.Println("make(3):", s2, "make(3,10):", s3)

	// append — may allocate new backing array when capacity exceeded
	s = append(s, 60, 70)
	fmt.Println("after append:", s)

	// Reslicing — shares the backing array
	sub := s[1:4] // [20 30 40]
	fmt.Println("s[1:4]:", sub)
	sub[0] = 99
	fmt.Println("s after modifying sub:", s) // s[1] is now 99

	// copy — create independent slice
	dst := make([]int, len(s))
	copy(dst, s)
	dst[0] = 0
	fmt.Println("src:", s, "dst:", dst)

	// Nil slice — valid to range over and append to
	var nilSlice []int
	fmt.Println("nil slice:", nilSlice, "len:", len(nilSlice))
	nilSlice = append(nilSlice, 1, 2, 3)
	fmt.Println("appended:  ", nilSlice)

	// 2D slice
	matrix := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	fmt.Println("matrix[2][1]:", matrix[2][1]) // 8

	// Delete element at index i (order-preserving)
	i := 2
	s4 := []string{"a", "b", "c", "d", "e"}
	s4 = append(s4[:i], s4[i+1:]...)
	fmt.Println("after delete index 2:", s4) // [a b d e]
}

func showMaps() {
	fmt.Println("=== Maps ===")

	// Map literal
	scores := map[string]int{
		"Alice": 95,
		"Bob":   80,
		"Carol": 88,
	}

	// Read — returns zero value (0) if key missing
	fmt.Println("Alice:", scores["Alice"])

	// Existence check
	val, ok := scores["Dave"]
	fmt.Printf("Dave: %d, exists: %v\n", val, ok)

	// Write and delete
	scores["Dave"] = 72
	delete(scores, "Bob")
	fmt.Println("after add Dave, remove Bob:", scores)

	// Iterate — order is NOT guaranteed
	names := make([]string, 0, len(scores))
	for k := range scores {
		names = append(names, k)
	}
	sort.Strings(names)
	fmt.Println("sorted keys:", names)

	for _, name := range names {
		fmt.Printf("  %s: %d\n", name, scores[name])
	}

	// Map of slices
	courses := map[string][]string{
		"Alice": {"Go", "Python"},
		"Bob":   {"Java"},
	}
	courses["Alice"] = append(courses["Alice"], "Rust")
	fmt.Println("courses:", courses)

	// Nil map — reading is safe, writing panics
	var nilMap map[string]int
	fmt.Println("nil map read:", nilMap["key"]) // 0, no panic
	// nilMap["key"] = 1  // would panic — must initialize first
}

func showSorting() {
	fmt.Println("=== Sorting ===")

	// Sort ints
	nums := []int{5, 2, 8, 1, 9, 3}
	sort.Ints(nums)
	fmt.Println("sorted ints:", nums)

	// Sort strings
	words := []string{"banana", "apple", "cherry", "date"}
	sort.Strings(words)
	fmt.Println("sorted strings:", words)

	// Custom sort — sort by length then alphabetically
	sort.Slice(words, func(i, j int) bool {
		if len(words[i]) != len(words[j]) {
			return len(words[i]) < len(words[j])
		}
		return words[i] < words[j]
	})
	fmt.Println("sorted by length:", words)

	// Sort structs
	type Person struct {
		Name string
		Age  int
	}
	people := []Person{
		{"Charlie", 30},
		{"Alice", 25},
		{"Bob", 30},
	}
	sort.Slice(people, func(i, j int) bool {
		if people[i].Age != people[j].Age {
			return people[i].Age < people[j].Age
		}
		return people[i].Name < people[j].Name
	})
	for _, p := range people {
		fmt.Printf("  %s (%d)\n", p.Name, p.Age)
	}

	// Check if sorted
	fmt.Println("is sorted:", sort.IntsAreSorted(nums))

	// Binary search (slice must be sorted)
	idx, found := sort.Find(len(nums), func(i int) int {
		return nums[i] - 5
	})
	fmt.Printf("found 5 at index %d: %v\n", idx, found)
}
