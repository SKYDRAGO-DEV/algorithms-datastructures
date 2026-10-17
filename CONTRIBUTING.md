# Contributing to algorithms-datastructures

This is an educational TypeScript and Python algorithms reference. Contributions should be narrowly scoped, correct, readable and covered by edge-case tests.

## Run tests

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

## Engineering guidelines

- Preserve algorithmic invariants and document time/space complexity.
- Test empty collections, single-element inputs, duplicate values, negative numbers, invalid indices and disconnected/cyclic graph cases as appropriate.
- Explain any non-standard representations or deliberately unsupported inputs.
- Prefer deterministic tests; do not report fabricated benchmark results.
- Do not introduce dependencies for algorithms that are easily demonstrated using standard-language facilities.
- Update [README.md](README.md) when a new algorithm is implemented and tested. Do not list future ideas as existing implementations.
- Keep public issues free of secrets, sensitive data and exploit details; see [SECURITY.md](SECURITY.md).

Contributors should open focused PRs with a problem statement, complexity analysis, tests and any compatibility implications.
