# Security policy

## Scope

This repository is a small TypeScript/Python educational algorithms reference, not a security-sensitive deployed service or guaranteed-complete algorithms library. The default branch is the active code reference; no long-term support SLA is promised.

## Vulnerability reporting

Do not post secrets, personal data, exploit details or sensitive inputs in public issues. Use **Report a vulnerability** on the GitHub Security page if private vulnerability reporting is enabled. If unavailable, create only a non-sensitive issue requesting a private reporting channel.

## Correctness and resource-safety concerns

Reports about unexpected crashes, unbounded allocations, pathological recursion, denial-of-service behaviour or malformed-input handling are welcome. Include a minimal safe reproduction and explain any computational-complexity implications.

Algorithms should document representation assumptions (for example, this repository's matrix Dijkstra treats zero as no edge), input constraints and worst-case performance. Passing tests is not proof of correctness for all possible inputs.
