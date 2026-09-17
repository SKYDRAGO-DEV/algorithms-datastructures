"""Regression tests for sorting and search algorithms."""

import unittest

from sorting import binary_search, counting_sort, heap_sort, merge_sort, quick_sort, two_sum


class SortingTests(unittest.TestCase):
    def test_comparison_sorts_are_correct_and_non_mutating(self) -> None:
        source = [5, 2, 8, 1, 9, 3, 7, 4, 6]
        expected = sorted(source)

        for sort in (quick_sort, merge_sort, heap_sort):
            input_values = source[:]
            self.assertEqual(sort(input_values), expected)
            self.assertEqual(input_values, source)

    def test_counting_sort_supports_negative_values(self) -> None:
        source = [3, -2, 1, -2, 0, 3]
        self.assertEqual(counting_sort(source), [-2, -2, 0, 1, 3, 3])
        self.assertEqual(source, [3, -2, 1, -2, 0, 3])

    def test_counting_sort_rejects_non_integer_values(self) -> None:
        with self.assertRaisesRegex(TypeError, "integers only"):
            counting_sort([1, 2.5, 3])  # type: ignore[list-item]

    def test_binary_search(self) -> None:
        values = [1, 2, 3, 4, 5]
        self.assertEqual(binary_search(values, 4), 3)
        self.assertEqual(binary_search(values, 8), -1)

    def test_two_sum(self) -> None:
        self.assertEqual(two_sum([2, 7, 11, 15], 9), [0, 1])
        self.assertEqual(two_sum([1, 2, 3], 99), [])


if __name__ == "__main__":
    unittest.main()
