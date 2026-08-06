import numpy as np
from typing import Dict, List, Tuple, Optional
from qpsi_transition_search.domain.scoring import CandidateEvaluation

class BitstringSampler:
    """Decodes sampled bitstrings from QAOA execution, calculates single-hot rates, and ranks candidates."""

    @staticmethod
    def process_sample_counts(
        sample_counts: Dict[str, int],
        evaluations: List[CandidateEvaluation],
    ) -> Dict[str, Any]:
        total_shots = sum(sample_counts.values()) if sample_counts else 1

        single_hot_counts = 0
        invalid_selection_counts = 0
        candidate_votes: Dict[str, int] = {ev.candidate_id: 0 for ev in evaluations}
        eval_map = {ev.candidate_id: ev for ev in evaluations}

        for bitstring, count in sample_counts.items():
            # Standardize bitstring length to 8
            b_str = bitstring.zfill(8)
            # Count ones
            ones = b_str.count("1")
            if ones == 1:
                single_hot_counts += count
                # Bit index 0 is C0, bit index 7 is C7
                idx = b_str.find("1")
                cid = f"C{idx}"
                if cid in candidate_votes:
                    candidate_votes[cid] += count
                    if not eval_map[cid].is_valid:
                        invalid_selection_counts += count

        exactly_one_rate = round(single_hot_counts / total_shots, 4)
        invalid_selection_rate = round(invalid_selection_counts / total_shots, 4)

        # Rank candidates by voted shots among single-hot samples
        sorted_candidates = sorted(candidate_votes.items(), key=lambda item: (-item[1], item[0]))
        selected_cid = sorted_candidates[0][0] if sorted_candidates else "C0"

        selected_eval = eval_map.get(selected_cid, evaluations[0])

        return {
            "total_shots": total_shots,
            "exactly_one_rate": exactly_one_rate,
            "invalid_selection_rate": invalid_selection_rate,
            "candidate_votes": candidate_votes,
            "selected_candidate_id": selected_cid,
            "selected_evaluation": selected_eval,
            "is_valid": selected_eval.is_valid,
            "normalized_utility": selected_eval.normalized_utility,
        }
