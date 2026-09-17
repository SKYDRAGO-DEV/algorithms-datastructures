# algorithms-datastructures

A compact algorithms and data-structures reference implemented in **TypeScript and Python**.

This repository is supporting engineering work. Documentation intentionally describes only implementations and tests that exist in the current source tree.

## Current contents

### TypeScript

`src/ts/` currently contains:

- directed adjacency-list graph traversal;
- cycle-detecting topological sort;
- Union-Find with boundary validation;
- Dijkstra shortest paths with matrix/source/weight validation;
- quick sort, merge sort, heap sort, and binary search;
- Stack, amortized O(1) Queue, MinHeap, and Trie;
- executable Jest regression tests for sorting, graph logic, and data structures.

### Python

`src/py/` currently contains:

- graph traversal and cycle-detecting topological sort;
- Union-Find with explicit index validation;
- validated Dijkstra shortest paths;
- quick sort, merge sort, heap sort, binary search, counting sort, and two-sum;
- counting sort support for negative integers;
- executable `unittest` regression coverage for graph and sorting edge cases.

## Repository layout

```text
algorithms-datastructures/
├── src/
│   ├── py/
│   │   ├── graph.py
│   │   ├── sorting.py
│   │   ├── test_graph.py
│   │   └── test_sorting.py
│   └── ts/
│       ├── graph.ts
│       ├── graph.test.ts
│       ├── sorting.ts
│       ├── sorting.test.ts
│       ├── tree.ts
│       └── tree.test.ts
├── package.json
├── tsconfig.json
└── .github/workflows/ci.yml
```

## Validation

TypeScript:

```bash
npm install
npm run typecheck
npm test
```

Python:

```bash
python -m compileall -q src/py
python -m unittest discover -s src/py -p "test_*.py" -v
```

GitHub Actions runs TypeScript verification on Node.js 20 and 22 and Python verification on Python 3.12.

## Correctness boundaries

- Topological sort rejects cyclic input rather than returning an invalid order.
- The matrix-based Dijkstra implementation rejects malformed matrices, negative/non-finite weights, and invalid source indices.
- A matrix weight of `0` represents “no edge”; zero-weight edges are therefore outside this implementation's representation.
- Union-Find rejects invalid indices instead of relying on language-specific out-of-bounds behavior.
- Counting sort accepts integer values, including negative integers, and rejects non-integer inputs.

## Scope boundaries

Earlier documentation claimed Go and Rust implementations plus algorithm families that are not present in the repository. Those claims remain excluded.

The current repository is a small educational/reference codebase, not a comprehensive competitive-programming library or a Forex-specific flagship project.

## Portfolio role

The repository demonstrates foundational implementation, edge-case handling, tests, and algorithm/data-structure reasoning. It remains secondary to the account's FX/quantitative systems work.
