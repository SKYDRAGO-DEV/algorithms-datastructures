import { AdjacencyList, UnionFind, dijkstra } from "./graph";

describe("AdjacencyList", () => {
  test("traverses directed graphs including sink-only vertices", () => {
    const graph = new AdjacencyList();
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.addEdge(1, 3);

    expect(graph.bfs(0)).toEqual([0, 1, 2, 3]);
    expect(graph.dfs(0)).toEqual([0, 1, 3, 2]);
  });

  test("returns a valid topological ordering for a DAG", () => {
    const graph = new AdjacencyList();
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 3);

    const order = graph.topologicalSort();
    const index = new Map(order.map((value, position) => [value, position]));

    expect(order).toHaveLength(4);
    expect(index.get(0)!).toBeLessThan(index.get(1)!);
    expect(index.get(0)!).toBeLessThan(index.get(2)!);
    expect(index.get(1)!).toBeLessThan(index.get(3)!);
    expect(index.get(2)!).toBeLessThan(index.get(3)!);
  });

  test("rejects topological sorting of a cyclic graph", () => {
    const graph = new AdjacencyList();
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(2, 0);

    expect(() => graph.topologicalSort()).toThrow(/cycle/);
  });
});

describe("UnionFind", () => {
  test("tracks connectivity with path compression and union by rank", () => {
    const unionFind = new UnionFind(5);
    expect(unionFind.union(0, 2)).toBe(true);
    expect(unionFind.union(0, 2)).toBe(false);
    expect(unionFind.connected(0, 2)).toBe(true);
    expect(unionFind.connected(0, 3)).toBe(false);
  });

  test("rejects invalid sizes and indices", () => {
    expect(() => new UnionFind(-1)).toThrow(/non-negative integer/);
    const unionFind = new UnionFind(2);
    expect(() => unionFind.find(-1)).toThrow(/out of range/);
    expect(() => unionFind.find(2)).toThrow(/out of range/);
  });
});

describe("dijkstra", () => {
  test("computes shortest paths for a non-negative adjacency matrix", () => {
    expect(
      dijkstra(
        [
          [0, 4, 1],
          [4, 0, 2],
          [1, 2, 0],
        ],
        0,
      ),
    ).toEqual([0, 3, 1]);
  });

  test("validates graph shape, source, and edge weights", () => {
    expect(() => dijkstra([], 0)).toThrow(/non-empty square/);
    expect(() => dijkstra([[0, 1]], 0)).toThrow(/square/);
    expect(() => dijkstra([[0, -1], [-1, 0]], 0)).toThrow(/non-negative/);
    expect(() => dijkstra([[0]], 1)).toThrow(/source index out of range/);
  });
});
