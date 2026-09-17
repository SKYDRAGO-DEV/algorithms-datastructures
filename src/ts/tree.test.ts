import { MinHeap, Queue, Stack, Trie } from "./tree";

describe("Stack", () => {
  test("uses LIFO ordering", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeUndefined();
    expect(stack.isEmpty).toBe(true);
  });
});

describe("Queue", () => {
  test("uses FIFO ordering and reports logical size", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.size).toBe(3);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size).toBe(1);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty).toBe(true);
  });
});

describe("MinHeap", () => {
  test("extracts values in comparator order", () => {
    const heap = new MinHeap<number>();
    [5, 3, 8, 1, 9].forEach((value) => heap.insert(value));

    expect(heap.min).toBe(1);
    expect([heap.extractMin(), heap.extractMin(), heap.extractMin(), heap.extractMin(), heap.extractMin()]).toEqual([
      1,
      3,
      5,
      8,
      9,
    ]);
    expect(heap.extractMin()).toBeUndefined();
  });
});

describe("Trie", () => {
  test("distinguishes complete words from prefixes", () => {
    const trie = new Trie();
    trie.insert("hello");
    trie.insert("helium");

    expect(trie.search("hello")).toBe(true);
    expect(trie.search("hel")).toBe(false);
    expect(trie.startsWith("hel")).toBe(true);
    expect(trie.startsWith("world")).toBe(false);
  });
});
