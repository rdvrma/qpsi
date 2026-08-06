export interface CharacterState {
  id: string;
  name: string;
  location_id: string;
  inventory: string[];
}

export interface RoomState {
  id: string;
  name: string;
  connected_room_ids: string[];
}

export interface WorldObjectState {
  id: string;
  name: string;
  location_id: string;
  container_surface: string;
}

export interface BeliefState {
  character_id: string;
  entity_id: string;
  property_name: string;
  believed_value: any;
  updated_at_step: number;
}

export interface RelationshipState {
  actor_id: string;
  target_character_id: string;
  trust_score: number;
  grievance_score: number;
  shared_secrets: string[];
}

export interface CanonicalState {
  characters: Record<string, CharacterState>;
  rooms: Record<string, RoomState>;
  objects: Record<string, WorldObjectState>;
  relationships: RelationshipState[];
}

export interface WorldStateResponse {
  world_id: string;
  sequence_number: number;
  canonical_state: CanonicalState;
  character_beliefs: Record<string, BeliefState[]>;
  state_digest: string;
}

export interface CommandRequest {
  actor_id: string;
  command_type: string;
  target_id?: string;
  source_location?: string;
  destination_location?: string;
  parameters?: Record<string, any>;
}

export interface CommandResponse {
  valid: boolean;
  code: string;
  error_message?: string;
  event_id?: string;
  event_hash?: string;
  sequence_number?: number;
}

export interface EventResponse {
  event_id: string;
  world_id: string;
  sequence_number: number;
  timestamp: string;
  actor_id: string;
  event_type: string;
  target_id?: string;
  previous_state: Record<string, any>;
  resulting_state: Record<string, any>;
  observer_ids: string[];
  source: string;
  command_id: string;
  validation_result: Record<string, any>;
  parent_event_id?: string;
  previous_event_hash: string;
  event_hash: string;
}

export interface ReplayResponse {
  world_id: string;
  replayed_sequence_number: number;
  active_digest: string;
  replayed_digest: string;
  digests_match: boolean;
  replayed_state: Record<string, any>;
}

export interface IntegrityCheckResponse {
  world_id: string;
  integrity_valid: boolean;
  event_count: number;
  errors: string[];
}

export interface ProofStepResult {
  step: number;
  title: string;
  description: string;
  status: "PASS" | "FAIL";
  [key: string]: any;
}

export interface ProofResponse {
  world_id: string;
  verdict: "ACCEPTED" | "REJECTED";
  steps: ProofStepResult[];
}

export interface SessionResponse {
  session_id: string;
  world_id: string;
  created_at: string;
  is_new: boolean;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}

export interface ReadyResponse {
  status: string;
  service: string;
  database_ready: boolean;
  public_demo_enabled: boolean;
}
