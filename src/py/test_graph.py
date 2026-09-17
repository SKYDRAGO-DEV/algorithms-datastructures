"""Regression tests for graph algorithms."""

import unittest

from graph import Graph, UnionFind, dijkstra


class GraphTests(unittest.TestCase):
    def test_traversal_and_sink_vertices(self) -> None:
        graph = Graph()
        graph.add_edge(0, 1)
        graph.add_edge(0, 2)
        graph.add_edge(1, 3)

        self.assertEqual(graph.bfs(0), [0, 1, 2, 3])
        self.assertEqual(graph.dfs(0), [0, 1, 3, 2])

    def test_topological_sort_dag(self) -> None:
        graph = Graph()
        graph.add_edge(0, 1)
        graph.add_edge(0, 2)
        graph.add_edge(1, 3)
        graph.add_edge(2, 3)

        order = graph.topological_sort()
        positions = {value: index for index, value in enumerate(order)}

        self.assertEqual(set(order), {0, 1, 2, 3})
        self.assertLess(positions[0], positions[1])
        self.assertLess(positions[0], positions[2])
        self.assertLess(positions[1], positions[3])
        self.assertLess(positions[2], positions[3])

    def test_topological_sort_rejects_cycles(self) -> None:
        graph = Graph()
        graph.add_edge(0, 1)
        graph.add_edge(1, 2)
        graph.add_edge(2, 0)

        with self.assertRaisesRegex(ValueError, "cycle"):
            graph.topological_sort()


class UnionFindTests(unittest.TestCase):
    def test_connectivity(self) -> None:
        union_find = UnionFind(5)
        self.assertTrue(union_find.union(0, 2))
        self.assertFalse(union_find.union(0, 2))
        self.assertTrue(union_find.connected(0, 2))
        self.assertFalse(union_find.connected(0, 3))

    def test_invalid_size_and_indices(self) -> None:
        with self.assertRaisesRegex(ValueError, "non-negative integer"):
            UnionFind(-1)

        union_find = UnionFind(2)
        with self.assertRaisesRegex(IndexError, "out of range"):
            union_find.find(-1)
        with self.assertRaisesRegex(IndexError, "out of range"):
            union_find.find(2)


class DijkstraTests(unittest.TestCase):
    def test_shortest_paths(self) -> None:
        graph = [
            [0, 4, 1],
            [4, 0, 2],
            [1, 2, 0],
        ]
        self.assertEqual(dijkstra(graph, 0), [0, 3, 1])

    def test_validation(self) -> None:
        with self.assertRaisesRegex(ValueError, "non-empty square"):
            dijkstra([], 0)
        with self.assertRaisesRegex(ValueError, "square"):
            dijkstra([[0, 1]], 0)
        with self.assertRaisesRegex(ValueError, "non-negative"):
            dijkstra([[0, -1], [-1, 0]], 0)
        with self.assertRaisesRegex(IndexError, "source index out of range"):
            dijkstra([[0]], 1)


if __name__ == "__main__":
    unittest.main()
