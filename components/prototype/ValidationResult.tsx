import React from "react";
import { CommandResponse } from "@/lib/prototype-types";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

interface ValidationResultProps {
  result: CommandResponse | null;
}

export const ValidationResult: React.FC<ValidationResultProps> = ({ result }) => {
  if (!result) return null;

  const isSuccess = result.valid;

  return (
    <div
      className={`border rounded-lg p-4 my-4 font-mono text-xs ${
        isSuccess
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
          : "bg-red-500/10 border-red-500/30 text-red-300"
      }`}
    >
      <div className="flex items-start gap-3">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        )}

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-sm uppercase tracking-wider">
              {isSuccess ? "Command Validated & Committed" : `Command Rejected: ${result.code}`}
            </span>
            {result.sequence_number && (
              <span className="text-[11px] opacity-70">Sequence #{result.sequence_number}</span>
            )}
          </div>

          <p className="opacity-90 leading-relaxed">
            {result.error_message || (isSuccess ? "State transition applied cleanly to canonical reality." : "Validation failed.")}
          </p>

          {!isSuccess && (
            <div className="mt-2 pt-2 border-t border-red-500/20 text-[11px] opacity-80">
              ⚡ <strong>Fail-Safe Rule Enforced</strong>: Canonical state remained 100% unchanged. No event was appended to the immutable ledger.
            </div>
          )}

          {result.event_hash && (
            <div className="mt-2 text-[10px] text-emerald-400/80 truncate">
              Event SHA-256 Hash: {result.event_hash}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
