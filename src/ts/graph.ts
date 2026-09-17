// Graph algorithms in TypeScript

interface Graph {
  addVertex(v: number): void;
  addEdge(v: number, w: number): void;
  bfs(start: number): number[];
  dfs(start: number): number[];
  topologicalSort(): number[];
}

export class AdjacencyList implements Graph {
  private adj: Map<number, number[]>;

  constructor() {
    this.adj = new Map();
  }

  addVertex(v: number): void {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  addEdge(v: number, w: number): void {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v)!.push(w);
  }

  bfs(start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];
    const queue: number[] = [start];
    let head = 0;
    visited.add(start);

    while (head < queue.length) {
      const v = queue[head];
      head += 1;
      result.push(v);
      for (const neighbor of this.adj.get(v) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  dfs(start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];

    const dfsRecursive = (v: number): void => {
      visited.add(v);
      result.push(v);
      for (const neighbor of this.adj.get(v) ?? []) {
        if (!visited.has(neighbor)) dfsRecursive(neighbor);
      }
    };

    dfsRecursive(start);
    return result;
  }

  topologicalSort(): number[] {
    const state = new Map<number, "visiting" | "visited">();
    const result: number[] = [];

    const visit = (v: number): void => {
      const currentState = state.get(v);
      if (currentState === "visiting") {
        throw new Error("graph contains a cycle");
      }
      if (currentState === "visited") {
        return;
      }

      state.set(v, "visiting");
      for (const neighbor of this.adj.get(v) ?? []) {
        visit(neighbor);
      }
      state.set(v, "visited");
      result.push(v);
    };

    for (const v of this.adj.keys()) {
      visit(v);
    }

    return result.reverse();
  }
}

export class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    if (!Number.isInteger(n) || n < 0) {
      throw new RangeError("n must be a non-negative integer");
    }
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  private assertIndex(x: number): void {
    if (!Number.isInteger(x) || x < 0 || x >= this.parent.length) {
      throw new RangeError(`index out of range: ${x}`);
    }
  }

  find(x: number): number {
    this.assertIndex(x);
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return false;

    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else {
      this.parent[py] = px;
      this.rank[px] += 1;
    }
    return true;
  }

  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

function validateAdjacencyMatrix(graph: readonly (readonly number[])[]): void {
  if (graph.length === 0) {
    throw new Error("graph must be a non-empty square adjacency matrix");
  }

  const n = graph.length;
  for (const row of graph) {
    if (row.length !== n) {
      throw new Error("graph must be a square adjacency matrix");
    }
    for (const weight of row) {
      if (!Number.isFinite(weight) || weight < 0) {
        throw new Error("graph weights must be finite and non-negative");
      }
    }
  }
}

export function dijkstra(graph: readonly (readonly number[])[], src: number): number[] {
  validateAdjacencyMatrix(graph);
  const n = graph.length;

  if (!Number.isInteger(src) || src < 0 || src >= n) {
    throw new RangeError(`source index out of range: ${src}`);
  }

  const dist = new Array<number>(n).fill(Infinity);
  dist[src] = 0;
  const visited = new Set<number>();

  for (let i = 0; i < n; i += 1) {
    let u = -1;
    for (let j = 0; j < n; j += 1) {
      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;
    }

    if (u === -1 || dist[u] === Infinity) break;
    visited.add(u);

    for (let v = 0; v < n; v += 1) {
      const weight = graph[u][v];
      // This matrix representation uses zero to mean "no edge".
      if (weight !== 0 && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }

  return dist;
}
