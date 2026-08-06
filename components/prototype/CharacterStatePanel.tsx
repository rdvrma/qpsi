import React from "react";
import { CharacterState, BeliefState } from "@/lib/prototype-types";
import { User, MapPin, Package, Eye } from "lucide-react";

interface CharacterStatePanelProps {
  character: CharacterState;
  beliefs: BeliefState[];
  title: string;
}

export const CharacterStatePanel: React.FC<CharacterStatePanelProps> = ({
  character,
  beliefs,
  title,
}) => {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white/70" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white font-semibold">
              {character.name}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-white/50">{title}</span>
        </div>

        {/* Location */}
        <div className="mb-4">
          <span className="text-xs font-mono text-[#777777] block mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-white/40" /> CANONICAL LOCATION
          </span>
          <div className="bg-[#050505] border border-white/10 px-3 py-1.5 rounded font-mono text-xs text-white">
            {character.location_id}
          </div>
        </div>

        {/* Inventory */}
        <div className="mb-4">
          <span className="text-xs font-mono text-[#777777] block mb-1 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-white/40" /> INVENTORY
          </span>
          <div className="bg-[#050505] border border-white/10 px-3 py-1.5 rounded font-mono text-xs text-white/80 min-h-[32px] flex items-center flex-wrap gap-1">
            {character.inventory.length > 0 ? (
              character.inventory.map((item) => (
                <span key={item} className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono text-white">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-white/40 italic text-xs">Empty</span>
            )}
          </div>
        </div>

        {/* Subjective Belief Matrix */}
        <div>
          <span className="text-xs font-mono text-[#777777] block mb-1 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-white/40" /> SUBJECTIVE BELIEFS
          </span>
          <div className="bg-[#050505] border border-white/10 rounded p-2 text-xs font-mono max-h-36 overflow-y-auto space-y-1.5">
            {beliefs.length > 0 ? (
              beliefs.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white/5 px-2 py-1 rounded text-[11px]">
                  <span className="text-white/70">{b.entity_id}.{b.property_name}</span>
                  <span className="text-white font-semibold">{String(b.believed_value)}</span>
                </div>
              ))
            ) : (
              <div className="text-white/40 italic text-xs p-1">No belief records</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
