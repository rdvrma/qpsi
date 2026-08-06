from qpsi_engine.domain.event import Event
from qpsi_engine.domain.world_state import WorldState


class BeliefEngine:
    @staticmethod
    def update_beliefs_from_event(event: Event, state: WorldState) -> None:
        """Updates character subjective beliefs ONLY for characters in observer_ids."""
        if not event.validation_result.get("valid", False):
            return

        observers = event.observer_ids
        target_id = event.target_id
        res_state = event.resulting_state

        for obs_id in observers:
            if obs_id not in state.characters:
                continue

            # Update belief according to event type
            if event.event_type == "move_object" and target_id and "container_surface" in res_state:
                state.set_character_belief(
                    character_id=obs_id,
                    entity_id=target_id,
                    property_name="location_surface",
                    value=res_state["container_surface"],
                )
                if "location_id" in res_state:
                    state.set_character_belief(
                        character_id=obs_id,
                        entity_id=target_id,
                        property_name="room_id",
                        value=res_state["location_id"],
                    )

            elif event.event_type in ["enter_room", "leave_room"] and "location_id" in res_state:
                state.set_character_belief(
                    character_id=obs_id,
                    entity_id=event.actor_id,
                    property_name="location_id",
                    value=res_state["location_id"],
                )

            elif event.event_type == "pick_up_object" and target_id:
                state.set_character_belief(
                    character_id=obs_id,
                    entity_id=target_id,
                    property_name="location_id",
                    value=event.actor_id,
                )
                state.set_character_belief(
                    character_id=obs_id,
                    entity_id=target_id,
                    property_name="location_surface",
                    value="inventory",
                )

            elif event.event_type == "put_down_object" and target_id and "location_id" in res_state:
                state.set_character_belief(
                    character_id=obs_id,
                    entity_id=target_id,
                    property_name="location_id",
                    value=res_state["location_id"],
                )
                state.set_character_belief(
                    character_id=obs_id,
                    entity_id=target_id,
                    property_name="location_surface",
                    value=res_state.get("container_surface", "floor"),
                )

            elif event.event_type == "inspect_object" and target_id:
                # Direct inspection updates observer's belief to canonical reality
                obj = state.objects.get(target_id)
                if obj:
                    state.set_character_belief(
                        character_id=obs_id,
                        entity_id=target_id,
                        property_name="location_surface",
                        value=obj.container_surface,
                    )
                    state.set_character_belief(
                        character_id=obs_id,
                        entity_id=target_id,
                        property_name="room_id",
                        value=obj.location_id,
                    )
