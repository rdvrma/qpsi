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
    <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5 flex flex-col justify-between h-full text-black">
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-black/70" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-black font-bold">
              Persistent Room (main_room)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-midGray font-medium">CANONICAL REALITY</span>
        </div>

        {/* Sequence & Digest Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#F8F9FA] border border-black/10 p-2.5 rounded">
            <span className="text-[10px] font-mono text-[#52525B] uppercase block flex items-center gap-1 mb-0.5 font-medium">
              <Hash className="w-3 h-3 text-black/50" /> Sequence Number
            </span>
            <span className="font-mono text-sm text-black font-bold">#{sequenceNumber}</span>
          </div>
          <div className="bg-[#F8F9FA] border border-black/10 p-2.5 rounded">
            <span className="text-[10px] font-mono text-[#52525B] uppercase block flex items-center gap-1 mb-0.5 font-medium">
              <Database className="w-3 h-3 text-black/50" /> State Digest
            </span>
            <span className="font-mono text-[11px] text-black font-bold truncate block" title={stateDigest}>
              {stateDigest ? `${stateDigest.slice(0, 10)}...` : "N/A"}
            </span>
          </div>
        </div>

        {/* Object Surface Positions Table */}
        <div>
          <span className="text-xs font-mono text-[#52525B] block mb-1 flex items-center gap-1 font-medium">
            <Layers className="w-3.5 h-3.5 text-black/50" /> OBJECT SURFACES (CANONICAL FACTS)
          </span>
          <div className="bg-[#F8F9FA] border border-black/10 rounded overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black/5 text-[#52525B] border-b border-black/10 text-[11px]">
                <tr>
                  <th className="px-3 py-2 font-semibold">Entity ID</th>
                  <th className="px-3 py-2 font-semibold">Surface Position</th>
                  <th className="px-3 py-2 font-semibold">Location Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-black font-medium">
                {Object.values(objects).map((obj) => (
                  <tr key={obj.id} className="hover:bg-black/[0.03]">
                    <td className="px-3 py-2 font-semibold capitalize">{obj.name}</td>
                    <td className="px-3 py-2 text-black/80">{obj.container_surface || obj.location_id || (obj as any).location}</td>
                    <td className="px-3 py-2 text-midGray">main_room</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-black/10 text-[10px] font-mono text-midGray flex items-center justify-between">
        <span>PERSISTENCE GUARANTEE</span>
        <span className="text-emerald-700 font-bold">SQLITE WAL BACKED</span>
      </div>
    </div>
  );
};
