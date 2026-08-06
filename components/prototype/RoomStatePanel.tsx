import React from "react";
import { WorldObjectState } from "@/lib/prototype-types";
import { Home, Layers, Hash, Database } from "lucide-react";

interface RoomStatePanelProps {
  objects: Record<string, WorldObjectState>;
  sequenceNumber: number;
  stateDigest: string;
}

export const RoomStatePanel: React.FC<RoomStatePanelProps> = ({
  objects,
  sequenceNumber,
  stateDigest,
}) => {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-white/70" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white font-semibold">
              Persistent Room (main_room)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-white/50">CANONICAL REALITY</span>
        </div>

        {/* Sequence & Digest Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#050505] border border-white/10 p-2.5 rounded">
            <span className="text-[10px] font-mono text-[#777777] uppercase block flex items-center gap-1 mb-0.5">
              <Hash className="w-3 h-3 text-white/40" /> Sequence Number
            </span>
            <span className="font-mono text-sm text-white font-bold">#{sequenceNumber}</span>
          </div>
          <div className="bg-[#050505] border border-white/10 p-2.5 rounded">
            <span className="text-[10px] font-mono text-[#777777] uppercase block flex items-center gap-1 mb-0.5">
              <Database className="w-3 h-3 text-white/40" /> State Digest
            </span>
            <span className="font-mono text-[11px] text-white/90 truncate block font-semibold" title={stateDigest}>
              {stateDigest ? `${stateDigest.slice(0, 10)}...` : "N/A"}
            </span>
          </div>
        </div>

        {/* Object Surface Positions Table */}
        <div>
          <span className="text-xs font-mono text-[#777777] block mb-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-white/40" /> OBJECT SURFACES (CANONICAL FACTS)
          </span>
          <div className="bg-[#050505] border border-white/10 rounded overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 text-white/60 border-b border-white/10 text-[11px]">
                <tr>
                  <th className="px-3 py-2">Entity ID</th>
                  <th className="px-3 py-2">Surface Position</th>
                  <th className="px-3 py-2">Location Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Object.values(objects).map((obj) => (
                  <tr key={obj.id} className="hover:bg-white/5 transition">
                    <td className="px-3 py-2 font-semibold text-white">{obj.name} ({obj.id})</td>
                    <td className="px-3 py-2 font-bold text-white/90">
                      <span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">
                        {obj.container_surface}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-white/60">{obj.location_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
