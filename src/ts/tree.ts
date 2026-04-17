// Data structures in TypeScript

export class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
  get isEmpty(): boolean { return this.items.length === 0; }
}

export class Queue<T> {
  private items: T[] = [];
  enqueue(item: T): void { this.items.push(item); }
  dequeue(): T | undefined { return this.items.shift(); }
  peek(): T | undefined { return this.items[0]; }
  get size(): number { return this.items.length; }
  get isEmpty(): boolean { return this.items.length === 0; }
}

export class MinHeap<T> {
  private heap: T[] = [];
  private cmp: (a: T, b: T) => number;

  constructor(cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.cmp = cmp;
  }

  private parent(i: number): number { return Math.floor((i - 1) / 2); }
  private left(i: number): number { return 2 * i + 1; }
  private right(i: number): number { return 2 * i + 2; }

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
    const l = this.left(i), r = this.right(i);
    if (l < this.heap.length && this.cmp(this.heap[l], this.heap[smallest]) < 0) smallest = l;
    if (r < this.heap.length && this.cmp(this.heap[r], this.heap[smallest]) < 0) smallest = r;
    if (smallest !== i) { this.swap(i, smallest); this.heapifyDown(smallest); }
  }

  insert(item: T): void {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    if (this.heap.length > 0) this.heapifyDown(0);
    return min;
  }

  get min(): T | undefined { return this.heap[0]; }
  get size(): number { return this.heap.length; }
}

export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
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

// Tests
const stack = new Stack<number>();
stack.push(1); stack.push(2); stack.push(3);
console.log('Stack pop:', stack.pop());

const queue = new Queue<number>();
queue.enqueue(1); queue.enqueue(2); queue.enqueue(3);
console.log('Queue dequeue:', queue.dequeue());

const heap = new MinHeap<number>();
[5, 3, 8, 1, 9].forEach(x => heap.insert(x));
console.log('Heap extractMin:', heap.extractMin());

const trie = new Trie();
trie.insert('hello');
trie.insert('world');
console.log('Trie search hello:', trie.search('hello'));
console.log('Trie startsWith hel:', trie.startsWith('hel'));
