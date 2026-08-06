import React from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

export const PrototypeDisclosure: React.FC = () => {
  return (
    <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5 mb-8 text-sm text-black leading-relaxed">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-black/80 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-black font-bold mb-1">
            Permanent Technical Disclosure & Architectural Scope
          </h4>
          <p className="text-xs text-[#52525B] mb-2 font-mono">
            This prototype demonstrates persistent canonical state, character-specific beliefs, observation-dependent knowledge, contradiction rejection, event replay and integrity verification. It does not yet include production 3D characters, voice, video rendering, autonomous long-form storytelling or proven quantum advantage.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-black/80">
            <span className="bg-black/5 border border-black/10 px-2 py-0.5 rounded font-medium">FUNCTIONAL CLASSICAL PROTOTYPE</span>
            <span className="bg-black/5 border border-black/10 px-2 py-0.5 rounded font-medium">TEXT / STATE BASED</span>
            <span className="bg-black/5 border border-black/10 px-2 py-0.5 rounded font-medium">NO PRODUCTION USERS</span>
            <span className="bg-black/5 border border-black/10 px-2 py-0.5 rounded font-medium">NO QUANTUM ADVANTAGE CLAIM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
