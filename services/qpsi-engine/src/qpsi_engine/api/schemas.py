from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional


class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "qpsi-engine"
    version: str = "0.1.0"


class CommandRequest(BaseModel):
    actor_id: str = Field(..., description="ID of the character initiating the command")
    command_type: str = Field(..., description="Type of command (e.g. move_object, pick_up_object, enter_room)")
    target_id: Optional[str] = Field(None, description="ID of the target object or character")
    source_location: Optional[str] = Field(None, description="Expected source location/surface")
    destination_location: Optional[str] = Field(None, description="Destination location/surface")
    parameters: Dict[str, Any] = Field(default_factory=dict, description="Additional command parameters")


class CommandResponse(BaseModel):
    valid: bool
    code: str
    error_message: Optional[str] = None
    event_id: Optional[str] = None
    event_hash: Optional[str] = None
    sequence_number: Optional[int] = None


class EventResponse(BaseModel):
    event_id: str
    world_id: str
    sequence_number: int
    timestamp: str
    actor_id: str
    event_type: str
    target_id: Optional[str] = None
    previous_state: Dict[str, Any]
    resulting_state: Dict[str, Any]
    observer_ids: List[str]
    source: str
    command_id: str
    validation_result: Dict[str, Any]
    parent_event_id: Optional[str] = None
    previous_event_hash: str
    event_hash: str


class WorldStateResponse(BaseModel):
    world_id: str
    sequence_number: int
    canonical_state: Dict[str, Any]
    character_beliefs: Dict[str, List[Dict[str, Any]]]
    state_digest: str


class ReplayResponse(BaseModel):
    world_id: str
    replayed_sequence_number: int
    active_digest: str
    replayed_digest: str
    digests_match: bool
    replayed_state: Dict[str, Any]


class IntegrityCheckResponse(BaseModel):
    world_id: str
    integrity_valid: bool
    event_count: int
    errors: List[str]


class DemoResponse(BaseModel):
    world_id: str
    verdict: str
    steps: List[Dict[str, Any]]
