# Documented QUBO Penalty & Utility Coefficients (qpsi-transition-score-v1)

PENALTY_EXACTLY_ONE = 10.0  # Coefficient A for (sum x_i - 1)^2 exactly-one constraint
PENALTY_INVALID_CANDIDATE = 100.0  # Penalty added to invalid candidate x_i
WEIGHT_UTILITY = 1.0  # Coefficient B for normalized utility reward sum(U_i * x_i)
