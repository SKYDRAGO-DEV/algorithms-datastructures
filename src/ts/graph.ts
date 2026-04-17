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
    visited.add(start);

    while (queue.length) {
      const v = queue.shift()!;
      result.push(v);
      for (const neighbor of this.adj.get(v) || []) {
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

    const dfsRecursive = (v: number) => {
      visited.add(v);
      result.push(v);
      for (const neighbor of this.adj.get(v) || []) {
        if (!visited.has(neighbor)) dfsRecursive(neighbor);
      }
    };

    dfsRecursive(start);
    return result;
  }

  topologicalSort(): number[] {
    const visited = new Set<number>();
    const stack: number[] = [];

    const dfs = (v: number) => {
      visited.add(v);
      for (const neighbor of this.adj.get(v) || []) {
        if (!visited.has(neighbor)) dfs(neighbor);
      }
      stack.push(v);
    };

    for (const v of this.adj.keys()) {
      if (!visited.has(v)) dfs(v);
    }

    return stack.reverse();
  }
}

export class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }
    return true;
  }

  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

export function dijkstra(graph: number[][], src: number): number[] {
  const n = graph.length;
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  const visited = new Set<number>();

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (dist[u] === Infinity) break;
    visited.add(u);

    for (let v = 0; v < n; v++) {
      if (graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  return dist;
}

// Tests
const g = new AdjacencyList();
[[0, 1], [0, 2], [1, 3], [1, 4], [2, 4]].forEach(([v, w]) => g.addEdge(v, w));
console.log('BFS:', g.bfs(0));
console.log('DFS:', g.dfs(0));

const uf = new UnionFind(5);
uf.union(0, 2);
uf.union(1, 3);
console.log('UnionFind connected(0,2):', uf.connected(0, 2));
console.log('UnionFind connected(0,3):', uf.connected(0, 3));
