"""Sorting and search algorithms in Python"""
from typing import TypeVar, List, Callable, Any

T = TypeVar('T')


def quick_sort(arr: List[T], cmp: Callable[[T, T], int] = lambda a, b: (a > b) - (a < b)) -> List[T]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    return (
        quick_sort([x for x in arr if cmp(x, pivot) < 0], cmp)
        + [x for x in arr if cmp(x, pivot) == 0]
        + quick_sort([x for x in arr if cmp(x, pivot) > 0], cmp)
    )


def merge_sort(arr: List[T], cmp: Callable[[T, T], int] = lambda a, b: (a > b) - (a < b)) -> List[T]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid], cmp)
    right = merge_sort(arr[mid:], cmp)
    return _merge(left, right, cmp)


def _merge(left: List[T], right: List[T], cmp: Callable[[T, T], int]) -> List[T]:
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if cmp(left[i], right[j]) <= 0:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]


def heap_sort(arr: List[T], cmp: Callable[[T, T], int] = lambda a, b: (a > b) - (a < b)) -> List[T]:
    a, n = arr[:], len(arr)

    def heapify(k: int, size: int):
        largest = k
        l, r = 2 * k + 1, 2 * k + 2
        if l < size and cmp(a[l], a[largest]) > 0:
            largest = l
        if r < size and cmp(a[r], a[largest]) > 0:
            largest = r
        if largest != k:
            a[k], a[largest] = a[largest], a[k]
            heapify(largest, size)

    for i in range(n // 2 - 1, -1, -1):
        heapify(i, n)
    for i in range(n - 1, 0, -1):
        a[0], a[i] = a[i], a[0]
        heapify(0, i)
    return a


def binary_search(arr: List[T], target: T, cmp: Callable[[T, T], int] = lambda a, b: (a > b) - (a < b)) -> int:
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        c = cmp(arr[mid], target)
        if c == 0:
            return mid
        lo = mid + 1 if c < 0 else lo
        hi = mid - 1 if c > 0 else hi
    return -1


def counting_sort(arr: List[int]) -> List[int]:
    if not arr:
        return []
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for v in arr:
        count[v] += 1
    result = []
    for v, c in enumerate(count):
        result.extend([v] * c)
    return result


def two_sum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


if __name__ == "__main__":
    nums = [5, 2, 8, 1, 9, 3, 7, 4, 6]
    print("Original:", nums)
    print("QuickSort:", quick_sort(nums[:]))
    print("MergeSort:", merge_sort(nums[:]))
    print("HeapSort:", heap_sort(nums[:]))
    print("CountingSort:", counting_sort([3, 1, 4, 1, 5, 9, 2, 6]))
    print("BinarySearch 7:", binary_search(heap_sort(nums[:]), 7))
    print("TwoSum [2,7,11,15] target=9:", two_sum([2, 7, 11, 15], 9))
