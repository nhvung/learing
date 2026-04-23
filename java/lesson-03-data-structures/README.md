# Lesson 3: Data Structures and Algorithms in Java

## Topics Covered
- Arrays and multi-dimensional arrays
- `ArrayList`, `LinkedList`, `Stack`, `Queue` from `java.util`
- `HashMap`, `HashSet`, `TreeMap`
- Sorting: Bubble Sort, Selection Sort, and `Collections.sort()`
- Searching: Linear Search and Binary Search
- Big-O notation basics

## How to Run

```bash
cd src
javac ArraysDemo.java    && java ArraysDemo
javac CollectionsDemo.java && java CollectionsDemo
javac SortingAlgorithms.java && java SortingAlgorithms
```

## Big-O Quick Reference
| Algorithm      | Best  | Average | Worst  |
|----------------|-------|---------|--------|
| Binary Search  | O(1)  | O(log n)| O(log n)|
| Bubble Sort    | O(n)  | O(n²)   | O(n²)  |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) |
| HashMap get/put| O(1)  | O(1)    | O(n)   |

## Exercise
Complete `exercises/Exercise03.java` — given a list of student scores, find the top 3, compute the average, and check if a score exists using binary search.
