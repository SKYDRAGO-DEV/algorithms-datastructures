"""Graph algorithms in Python"""
from collections import defaultdict, deque
from typing import Dict, List, Set, Optional


class Graph:
    def __init__(self):
        self.adj: Dict[int, List[int]] = defaultdict(list)

    def add_edge(self, v: int, w: int) -> None:
        self.adj[v].append(w)

    def bfs(self, start: int) -> List[int]:
        visited: Set[int] = set()
        result: List[int] = []
        queue = deque([start])
        visited.add(start)

        while queue:
            v = queue.popleft()
            result.append(v)
            for neighbor in self.adj[v]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result

    def dfs(self, start: int) -> List[int]:
        visited: Set[int] = set()
        result: List[int] = []

        def dfs_rec(v: int) -> None:
            visited.add(v)
            result.append(v)
            for neighbor in self.adj[v]:
                if neighbor not in visited:
                    dfs_rec(neighbor)

        dfs_rec(start)
        return result

    def topological_sort(self) -> List[int]:
        visited: Set[int] = set()
        stack: List[int] = []

        def dfs(v: int) -> None:
            visited.add(v)
            for neighbor in self.adj[v]:
                if neighbor not in visited:
                    dfs(neighbor)
            stack.append(v)

        for v in self.adj:
            if v not in visited:
                dfs(v)
        return stack[::-1]


class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)


def dijkstra(graph: List[List[int]], src: int) -> List[int]:
    n = len(graph)
    dist = [float('inf')] * n
    dist[src] = 0
    visited: Set[int] = set()

    for _ in range(n):
        u = -1
        for v in range(n):
            if v not in visited and (u == -1 or dist[v] < dist[u]):
                u = v
        if dist[u] == float('inf'):
            break
        visited.add(u)
        for v in range(n):
            if graph[u][v] and dist[u] + graph[u][v] < dist[v]:
                dist[v] = dist[u] + graph[u][v]
    return dist


if __name__ == "__main__":
    g = Graph()
    for v, w in [(0, 1), (0, 2), (1, 3), (1, 4), (2, 4)]:
        g.add_edge(v, w)
    print("BFS:", g.bfs(0))
    print("DFS:", g.dfs(0))
    print("TopoSort:", g.topological_sort())

    uf = UnionFind(5)
    uf.union(0, 2)
    uf.union(1, 3)
    print("UnionFind connected(0,2):", uf.connected(0, 2))
    print("UnionFind connected(0,3):", uf.connected(0, 3))
