import { binarySearch, heapSort, mergeSort, quickSort } from "./sorting";

const sample = [5, 2, 8, 1, 9, 3, 7, 4, 6];
const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe("sorting algorithms", () => {
  test.each([
    ["quickSort", quickSort],
    ["mergeSort", mergeSort],
    ["heapSort", heapSort],
  ] as const)("%s sorts numeric input without mutating the source", (_name, sort) => {
    const input = [...sample];
    const result = sort(input);

    expect(result).toEqual(expected);
    expect(input).toEqual(sample);
  });

  test.each([
    ["quickSort", quickSort],
    ["mergeSort", mergeSort],
    ["heapSort", heapSort],
  ] as const)("%s preserves duplicates", (_name, sort) => {
    expect(sort([3, 1, 2, 3, 1])).toEqual([1, 1, 2, 3, 3]);
  });

  test("custom comparators support descending order", () => {
    const descending = (a: number, b: number): number => b - a;
    expect(quickSort([1, 4, 2, 3], descending)).toEqual([4, 3, 2, 1]);
    expect(mergeSort([1, 4, 2, 3], descending)).toEqual([4, 3, 2, 1]);
    expect(heapSort([1, 4, 2, 3], descending)).toEqual([4, 3, 2, 1]);
  });
});

describe("binarySearch", () => {
  test("finds an existing value in sorted input", () => {
    const index = binarySearch(expected, 7);
    expect(index).toBe(6);
    expect(expected[index]).toBe(7);
  });

  test("returns -1 when the target is absent", () => {
    expect(binarySearch(expected, 10)).toBe(-1);
  });

  test("handles empty input", () => {
    expect(binarySearch([], 1)).toBe(-1);
  });
});
