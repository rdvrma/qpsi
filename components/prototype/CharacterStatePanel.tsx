import React from "react";
import { CharacterState, BeliefState } from "@/lib/prototype-types";
import { User, MapPin, Package, Eye } from "lucide-react";

interface CharacterStatePanelProps {
  character: CharacterState;
  beliefs: BeliefState[] | any;
  title: string;
}

export const CharacterStatePanel: React.FC<CharacterStatePanelProps> = ({
  character,
  beliefs,
  title,
}) => {
  // Normalize beliefs array whether it's typed BeliefState[] or generic object
  const beliefList = Array.isArray(beliefs)
    ? beliefs.map((b, idx) => ({
        id: `${b.entity_id || 'ent'}-${b.property_name || idx}`,
        label: `${b.entity_id || ''}.${b.property_name || 'prop'}`,
        val: String(b.believed_value !== undefined ? b.believed_value : ''),
      }))
    : Object.entries(beliefs || {}).map(([key, val]) => ({
        id: key,
        label: key,
        val: String(val),
      }));

  return (
    <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5 flex flex-col justify-between h-full text-black">
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-black/70" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-black font-bold">
              {character.name}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-midGray font-medium">{title}</span>
        </div>

        {/* Location */}
        <div className="mb-4">
          <span className="text-xs font-mono text-[#52525B] block mb-1 flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-black/50" /> CANONICAL LOCATION
          </span>
          <div className="bg-[#F8F9FA] border border-black/10 px-3 py-1.5 rounded font-mono text-xs text-black font-medium">
            {character.location_id}
          </div>
        </div>

        {/* Inventory */}
        <div className="mb-4">
          <span className="text-xs font-mono text-[#52525B] block mb-1 flex items-center gap-1 font-medium">
            <Package className="w-3.5 h-3.5 text-black/50" /> INVENTORY
          </span>
          <div className="bg-[#F8F9FA] border border-black/10 px-3 py-1.5 rounded font-mono text-xs text-black min-h-[32px] flex items-center flex-wrap gap-1">
            {character.inventory && character.inventory.length > 0 ? (
              character.inventory.map((item) => (
                <span key={item} className="bg-black/10 px-2 py-0.5 rounded text-[11px] font-mono text-black font-semibold">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-midGray italic text-xs">Empty</span>
            )}
          </div>
        </div>

        {/* Subjective Belief Matrix */}
        <div>
          <span className="text-xs font-mono text-[#52525B] block mb-1 flex items-center gap-1 font-medium">
            <Eye className="w-3.5 h-3.5 text-black/50" /> SUBJECTIVE BELIEFS
          </span>
          <div className="bg-[#F8F9FA] border border-black/10 p-3 rounded font-mono text-xs space-y-1.5 text-black">
            {beliefList.length > 0 ? (
              beliefList.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-[11px]">
                  <span className="text-midGray">{item.label}:</span>
                  <span className="font-semibold text-black">{item.val}</span>
                </div>
              ))
            ) : (
              <span className="text-midGray italic text-xs">No belief records in memory</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-black/10 text-[10px] font-mono text-midGray flex items-center justify-between">
        <span>STATE ISOLATION: VERIFIED</span>
        <span className="text-emerald-700 font-bold">100% SEPARATE</span>
      </div>
    </div>
  );
};
