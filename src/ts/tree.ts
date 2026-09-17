// Data structures in TypeScript

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.head >= this.items.length) {
      return undefined;
    }

    const item = this.items[this.head];
    this.head += 1;

    // Compact occasionally so long-lived queues do not retain an ever-growing
    // prefix of already-dequeued elements.
    if (this.head > 1024 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }

    return item;
  }

  peek(): T | undefined {
    return this.items[this.head];
  }

  get size(): number {
    return this.items.length - this.head;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }
}

export class MinHeap<T> {
  private heap: T[] = [];
  private cmp: (a: T, b: T) => number;

  constructor(cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.cmp = cmp;
  }

  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private left(i: number): number {
    return 2 * i + 1;
  }

  private right(i: number): number {
    return 2 * i + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(i: number): void {
    while (i > 0 && this.cmp(this.heap[i], this.heap[this.parent(i)]) < 0) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  private heapifyDown(i: number): void {
    let smallest = i;
    const left = this.left(i);
    const right = this.right(i);

    if (left < this.heap.length && this.cmp(this.heap[left], this.heap[smallest]) < 0) {
      smallest = left;
    }
    if (right < this.heap.length && this.cmp(this.heap[right], this.heap[smallest]) < 0) {
      smallest = right;
    }

    if (smallest !== i) {
      this.swap(i, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(item: T): void {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  get min(): T | undefined {
    return this.heap[0];
  }

  get size(): number {
    return this.heap.length;
  }
}

export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord = false;
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, new TrieNode());
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}
