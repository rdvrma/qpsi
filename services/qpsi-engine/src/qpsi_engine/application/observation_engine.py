from typing import List
from qpsi_engine.domain.command import Command
from qpsi_engine.domain.world_state import WorldState


class ObservationEngine:
    @staticmethod
    def get_observers(command: Command, state: WorldState) -> List[str]:
        actor = state.characters.get(command.actor_id)
        if not actor:
            return []

        actor_room = actor.location_id
        observers: List[str] = []

        # Every character present in the same room as the actor observes public events in that room
        for cid, char in state.characters.items():
            if char.location_id == actor_room:
                observers.append(cid)

        # For room movement (enter/leave), characters in destination/source room also observe
        if command.command_type in ["enter_room", "leave_room"]:
            dest_room = command.destination_location
            if dest_room and dest_room in state.rooms:
                for cid, char in state.characters.items():
                    if char.location_id == dest_room and cid not in observers:
                        observers.append(cid)

        return sorted(observers)
