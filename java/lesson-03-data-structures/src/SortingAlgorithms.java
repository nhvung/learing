import java.util.Arrays;

public class SortingAlgorithms {

    // O(n²) — simple but slow for large arrays
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
    }

    // O(n log n) — divide and conquer
    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] tmp = Arrays.copyOfRange(arr, left, right + 1);
        int i = 0, j = mid - left + 1, k = left;
        while (i <= mid - left && j < tmp.length) {
            arr[k++] = (tmp[i] <= tmp[j]) ? tmp[i++] : tmp[j++];
        }
        while (i <= mid - left) arr[k++] = tmp[i++];
        while (j < tmp.length)  arr[k++] = tmp[j++];
    }

    // O(log n) — requires sorted input
    static int binarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;   // avoids integer overflow
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original:    " + Arrays.toString(data));

        int[] forBubble = data.clone();
        bubbleSort(forBubble);
        System.out.println("Bubble sort: " + Arrays.toString(forBubble));

        int[] forMerge = data.clone();
        mergeSort(forMerge, 0, forMerge.length - 1);
        System.out.println("Merge sort:  " + Arrays.toString(forMerge));

        int target = 25;
        int idx = binarySearch(forMerge, target);
        System.out.println("Binary search for " + target + ": index " + idx);
    }
}
