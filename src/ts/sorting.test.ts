// Sorting algorithms in TypeScript

export function quickSort<T>(arr: T[], cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)): T[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => cmp(x, pivot) < 0);
  const mid = arr.filter(x => cmp(x, pivot) === 0);
  const right = arr.filter(x => cmp(x, pivot) > 0);
  return [...quickSort(left, cmp), ...mid, ...quickSort(right, cmp)];
}

export function mergeSort<T>(arr: T[], cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)): T[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), cmp);
  const right = mergeSort(arr.slice(mid), cmp);
  return merge(left, right, cmp);
}

function merge<T>(left: T[], right: T[], cmp: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(cmp(left[i], right[j]) <= 0 ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

export function heapSort<T>(arr: T[], cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)): T[] {
  const a = [...arr];
  const n = a.length;
  const heapify = (size: number, i: number) => {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && cmp(a[l], a[largest]) > 0) largest = l;
    if (r < size && cmp(a[r], a[largest]) > 0) largest = r;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(size, largest);
    }
  };
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }
  return a;
}

export function binarySearch<T>(arr: T[], target: T, cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const c = cmp(arr[mid], target);
    if (c === 0) return mid;
    c < 0 ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

// Tests
const nums = [5, 2, 8, 1, 9, 3, 7, 4, 6];
console.log('Original:', nums);
console.log('QuickSort:', quickSort([...nums]));
console.log('MergeSort:', mergeSort([...nums]));
console.log('HeapSort:', heapSort([...nums]));
const sorted = heapSort([...nums]);
console.log('BinarySearch 7:', binarySearch(sorted, 7));
