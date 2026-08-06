# M3 — Experimental Limitations

1. **Tiny Problem Scale**: The candidate transition search space is bounded to 8 candidates ($2^8 = 256$ bitstrings). Exhaustive classical search is computationally trivial.
2. **Simulator Execution**: Execution was evaluated via CPU simulator baseline (`qpp-cpu`), not a physical Quantum Processing Unit (QPU).
3. **No Quantum Advantage**: This experiment does NOT claim quantum speedup, quantum advantage, or production utility.
4. **Synthetic Scenarios**: Scenarios use synthetic initial states and controlled candidate sets; they do not represent arbitrary free-text LLM prompts.
5. **Read-Only Candidate Status**: Quantum sampler outputs are treated solely as candidate proposals subject to mandatory classical post-validation.
