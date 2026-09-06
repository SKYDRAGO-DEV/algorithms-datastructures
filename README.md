# algorithms-datastructures

A compact algorithms and data-structures reference implemented in **TypeScript and Python**.

This repository is retained as supporting engineering work. The documentation intentionally describes only implementations that exist in the current source tree.

## Current contents

### TypeScript

`src/ts/` currently contains:

- Graph implementations and traversal-related logic
- Tree data-structure implementations
- Sorting tests

### Python

`src/py/` currently contains:

- Graph algorithms/data structures
- Sorting implementations

## Repository layout

```text
algorithms-datastructures/
├── src/
│   ├── py/
│   │   ├── graph.py
│   │   └── sorting.py
│   └── ts/
│       ├── graph.ts
│       ├── sorting.test.ts
│       └── tree.ts
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

Python source is syntax-checked in CI with `compileall`.

## Scope boundaries

Earlier documentation claimed Go and Rust implementations plus algorithm families that are not present in the repository. Those claims have been removed.

The current repository should be read as a small educational/reference codebase, not as a comprehensive competitive-programming library or a Forex-specific flagship project.

## Portfolio role

The repository demonstrates foundational implementation work relevant to data structures, algorithms, and general engineering. It remains secondary to the account's FX/quantitative systems work.
