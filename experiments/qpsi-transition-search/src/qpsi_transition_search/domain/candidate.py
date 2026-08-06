from dataclasses import dataclass, field
from typing import Dict, Any, Optional

@dataclass(frozen=True)
class CandidateAction:
    candidate_id: str  # C0 to C7
    actor_id: str
    command_type: str
    target_id: Optional[str] = None
    source_location: Optional[str] = None
    destination_location: Optional[str] = None
    parameters: Dict[str, Any] = field(default_factory=dict)
    description: str = ""
