export type Comparator<T> = (a: T, b: T) => number;

const defaultComparator = <T>(a: T, b: T): number => (a < b ? -1 : a > b ? 1 : 0);

export function quickSort<T>(arr: readonly T[], cmp: Comparator<T> = defaultComparator): T[] {
  if (arr.length <= 1) {
    return [...arr];
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((value) => cmp(value, pivot) < 0);
  const equal = arr.filter((value) => cmp(value, pivot) === 0);
  const right = arr.filter((value) => cmp(value, pivot) > 0);

  return [...quickSort(left, cmp), ...equal, ...quickSort(right, cmp)];
}

export function mergeSort<T>(arr: readonly T[], cmp: Comparator<T> = defaultComparator): T[] {
  if (arr.length <= 1) {
    return [...arr];
  }

  const midpoint = Math.floor(arr.length / 2);
  return merge(
    mergeSort(arr.slice(0, midpoint), cmp),
    mergeSort(arr.slice(midpoint), cmp),
    cmp,
  );
}

function merge<T>(left: readonly T[], right: readonly T[], cmp: Comparator<T>): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftValue = left[leftIndex];
    const rightValue = right[rightIndex];

    if (cmp(leftValue, rightValue) <= 0) {
      result.push(leftValue);
      leftIndex += 1;
    } else {
      result.push(rightValue);
      rightIndex += 1;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

export function heapSort<T>(arr: readonly T[], cmp: Comparator<T> = defaultComparator): T[] {
  const values = [...arr];
  const length = values.length;

  const heapify = (size: number, root: number): void => {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && cmp(values[left], values[largest]) > 0) {
      largest = left;
    }
    if (right < size && cmp(values[right], values[largest]) > 0) {
      largest = right;
    }

    if (largest !== root) {
      [values[root], values[largest]] = [values[largest], values[root]];
      heapify(size, largest);
    }
  };

  for (let index = Math.floor(length / 2) - 1; index >= 0; index -= 1) {
    heapify(length, index);
  }

  for (let index = length - 1; index > 0; index -= 1) {
    [values[0], values[index]] = [values[index], values[0]];
    heapify(index, 0);
  }

  return values;
}

export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  cmp: Comparator<T> = defaultComparator,
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const midpoint = Math.floor((low + high) / 2);
    const comparison = cmp(arr[midpoint], target);

    if (comparison === 0) {
      return midpoint;
    }

    if (comparison < 0) {
      low = midpoint + 1;
    } else {
      high = midpoint - 1;
    }
  }

  return -1;
}
