import random
import numpy as np
from typing import Callable, Tuple, List

class QaoaOptimizer:
    """Robust COBYLA / Coordinate-descent parameter optimizer for QAOA angles."""

    def __init__(self, p: int = 1, max_evals: int = 100, seed: int = 42):
        self.p = p
        self.max_evals = max_evals
        self.seed = seed

    def optimize(
        self,
        cost_evaluator: Callable[[np.ndarray], float],
    ) -> Tuple[np.ndarray, float, List[float]]:
        rng = random.Random(self.seed)
        num_params = 2 * self.p
        best_params = np.array([rng.uniform(0.0, np.pi) for _ in range(num_params)], dtype=np.float64)
        best_cost = cost_evaluator(best_params)
        history: List[float] = [best_cost]

        step_size = 0.2
        eval_count = 1

        while eval_count < self.max_evals and step_size > 1e-4:
            improved = False
            for i in range(num_params):
                for direction in [+1.0, -1.0]:
                    if eval_count >= self.max_evals:
                        break
                    candidate_params = np.copy(best_params)
                    candidate_params[i] = np.clip(candidate_params[i] + direction * step_size, 0.0, np.pi)
                    cost = cost_evaluator(candidate_params)
                    eval_count += 1
                    history.append(float(cost))

                    if cost < best_cost:
                        best_cost = cost
                        best_params = candidate_params
                        improved = True
                        break

            if not improved:
                step_size *= 0.5

        return best_params, float(best_cost), history
