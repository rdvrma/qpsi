import React from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

export const PrototypeDisclosure: React.FC = () => {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 mb-8 text-sm text-[#D8D8D2]/90 leading-relaxed">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-1">
            Permanent Technical Disclosure & Architectural Scope
          </h4>
          <p className="text-xs text-[#777777] mb-2">
            This prototype demonstrates persistent canonical state, character-specific beliefs, observation-dependent knowledge, contradiction rejection, event replay and integrity verification. It does not yet include production 3D characters, voice, video rendering, autonomous long-form storytelling or proven quantum advantage.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded">FUNCTIONAL CLASSICAL PROTOTYPE</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded">TEXT / STATE BASED</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded">NO PRODUCTION USERS</span>
            <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded">NO QUANTUM ADVANTAGE CLAIM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
