# M3 — CUDA-Q Implementation Details

## Environment & Target

- **Mandatory Baseline Target**: `qpp-cpu` (CPU simulator baseline)
- **Optional Target**: `nvidia` (NVIDIA GPU target when available)
- **APIs**: Official CUDA-Q Python APIs (`cudaq.make_kernel`, `cudaq.spin.z`, `cudaq.observe`, `cudaq.sample`)

## QAOA Circuit Design

- **Qubits**: 8 qubits ($q_0 \dots q_7$)
- **Initial State**: $|+\rangle^{\otimes 8}$ equal superposition
- **Cost Evolution**: $\exp(-i \gamma H_{\text{cost}})$
- **Mixer Evolution**: $\exp(-i \beta H_{\text{mixer}})$ with $H_{\text{mixer}} = \sum X_i$
- **Depths Evaluated**: $p=1$ and $p=2$
- **Shot Count**: 1,000 shots per scenario
