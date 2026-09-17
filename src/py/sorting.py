"""Sorting and search algorithms in Python."""

from typing import Callable, List, TypeVar

T = TypeVar("T")
Comparator = Callable[[T, T], int]


def _default_compare(a: T, b: T) -> int:
    return (a > b) - (a < b)


def quick_sort(arr: List[T], cmp: Comparator[T] = _default_compare) -> List[T]:
    if len(arr) <= 1:
        return arr[:]
    pivot = arr[len(arr) // 2]
    return (
        quick_sort([x for x in arr if cmp(x, pivot) < 0], cmp)
        + [x for x in arr if cmp(x, pivot) == 0]
        + quick_sort([x for x in arr if cmp(x, pivot) > 0], cmp)
    )


def merge_sort(arr: List[T], cmp: Comparator[T] = _default_compare) -> List[T]:
    if len(arr) <= 1:
        return arr[:]
    mid = len(arr) // 2
    left = merge_sort(arr[:mid], cmp)
    right = merge_sort(arr[mid:], cmp)
    return _merge(left, right, cmp)


def _merge(left: List[T], right: List[T], cmp: Comparator[T]) -> List[T]:
    result: List[T] = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if cmp(left[i], right[j]) <= 0:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]


def heap_sort(arr: List[T], cmp: Comparator[T] = _default_compare) -> List[T]:
    values, n = arr[:], len(arr)

    def heapify(root: int, size: int) -> None:
        largest = root
        left, right = 2 * root + 1, 2 * root + 2
        if left < size and cmp(values[left], values[largest]) > 0:
            largest = left
        if right < size and cmp(values[right], values[largest]) > 0:
            largest = right
        if largest != root:
            values[root], values[largest] = values[largest], values[root]
            heapify(largest, size)

    for i in range(n // 2 - 1, -1, -1):
        heapify(i, n)
    for i in range(n - 1, 0, -1):
        values[0], values[i] = values[i], values[0]
        heapify(0, i)
    return values


def binary_search(
    arr: List[T], target: T, cmp: Comparator[T] = _default_compare
) -> int:
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        comparison = cmp(arr[mid], target)
        if comparison == 0:
            return mid
        if comparison < 0:
            low = mid + 1
        else:
            high = mid - 1
    return -1


def counting_sort(arr: List[int]) -> List[int]:
    """Sort integers, including negative values, without mutating the input."""
    if not arr:
        return []
    if any(isinstance(value, bool) or not isinstance(value, int) for value in arr):
        raise TypeError("counting_sort accepts integers only")

    min_value = min(arr)
    max_value = max(arr)
    counts = [0] * (max_value - min_value + 1)

    for value in arr:
        counts[value - min_value] += 1

    result: List[int] = []
    for offset, count in enumerate(counts):
        result.extend([offset + min_value] * count)
    return result


def two_sum(nums: List[int], target: int) -> List[int]:
    seen: dict[int, int] = {}
    for index, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], index]
        seen[num] = index
    return []
