"""Graph algorithms in Python."""

from collections import defaultdict, deque
import math
from typing import Dict, List, Set


class Graph:
    def __init__(self) -> None:
        self.adj: Dict[int, List[int]] = defaultdict(list)

    def add_vertex(self, v: int) -> None:
        self.adj.setdefault(v, [])

    def add_edge(self, v: int, w: int) -> None:
        self.add_vertex(v)
        self.add_vertex(w)
        self.adj[v].append(w)

    def bfs(self, start: int) -> List[int]:
        visited: Set[int] = {start}
        result: List[int] = []
        queue = deque([start])

        while queue:
            v = queue.popleft()
            result.append(v)
            for neighbor in self.adj.get(v, []):
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
            for neighbor in self.adj.get(v, []):
                if neighbor not in visited:
                    dfs_rec(neighbor)

        dfs_rec(start)
        return result

    def topological_sort(self) -> List[int]:
        state: Dict[int, int] = {}
        result: List[int] = []

        def visit(v: int) -> None:
            current_state = state.get(v, 0)
            if current_state == 1:
                raise ValueError("graph contains a cycle")
            if current_state == 2:
                return

            state[v] = 1
            for neighbor in self.adj.get(v, []):
                visit(neighbor)
            state[v] = 2
            result.append(v)

        # Snapshot the keys so traversal can never invalidate the iteration even
        # if a caller populated the defaultdict directly.
        for v in list(self.adj):
            visit(v)

        result.reverse()
        return result


class UnionFind:
    def __init__(self, n: int) -> None:
        if not isinstance(n, int) or isinstance(n, bool) or n < 0:
            raise ValueError("n must be a non-negative integer")
        self.parent = list(range(n))
        self.rank = [0] * n

    def _validate_index(self, x: int) -> None:
        if not isinstance(x, int) or isinstance(x, bool) or not 0 <= x < len(self.parent):
            raise IndexError(f"index out of range: {x}")

    def find(self, x: int) -> int:
        self._validate_index(x)
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


def _validate_adjacency_matrix(graph: List[List[float]]) -> None:
    if not graph:
        raise ValueError("graph must be a non-empty square adjacency matrix")

    n = len(graph)
    for row in graph:
        if len(row) != n:
            raise ValueError("graph must be a square adjacency matrix")
        for weight in row:
            if isinstance(weight, bool) or not isinstance(weight, (int, float)):
                raise ValueError("graph weights must be numeric")
            if not math.isfinite(weight) or weight < 0:
                raise ValueError("graph weights must be finite and non-negative")


def dijkstra(graph: List[List[float]], src: int) -> List[float]:
    _validate_adjacency_matrix(graph)
    n = len(graph)

    if not isinstance(src, int) or isinstance(src, bool) or not 0 <= src < n:
        raise IndexError(f"source index out of range: {src}")

    dist = [float("inf")] * n
    dist[src] = 0
    visited: Set[int] = set()

    for _ in range(n):
        u = -1
        for v in range(n):
            if v not in visited and (u == -1 or dist[v] < dist[u]):
                u = v

        if u == -1 or dist[u] == float("inf"):
            break

        visited.add(u)
        for v in range(n):
            weight = graph[u][v]
            # This matrix representation uses zero to mean "no edge".
            if weight != 0 and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight

    return dist
