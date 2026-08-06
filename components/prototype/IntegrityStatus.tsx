"use client";

import React, { useState } from "react";
import { QPsiApiClient } from "@/lib/prototype-api";
import { IntegrityCheckResponse } from "@/lib/prototype-types";
import { ShieldCheck, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface IntegrityStatusProps {
  worldId: string;
}

export const IntegrityStatus: React.FC<IntegrityStatusProps> = ({ worldId }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntegrityCheckResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerifyIntegrity = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await QPsiApiClient.verifyIntegrity(worldId);
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || "Hash-chain integrity check failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 my-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-white/70" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
            SHA-256 Ledger Hash-Chain Integrity
          </h3>
        </div>

        <button
          onClick={handleVerifyIntegrity}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs bg-white/10 hover:bg-white/20 text-white rounded transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
          Verify SHA-256 Ledger Chain
        </button>
      </div>

      {errorMsg && (
        <div className="text-xs font-mono text-red-300 bg-red-500/10 p-3 rounded mb-3">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="font-mono text-xs space-y-2">
          <div className={`p-3 rounded border flex items-center justify-between ${
            result.integrity_valid
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}>
            <span className="font-semibold">Ledger Hash Chain Status ({result.event_count} Events Checked):</span>
            <span className="font-bold flex items-center gap-1">
              {result.integrity_valid ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> HASH CHAIN VALID
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" /> INTEGRITY CORRUPTED
                </>
              )}
            </span>
          </div>

          {result.errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded space-y-1">
              <span className="font-bold text-red-400 block">Integrity Violation Log:</span>
              {result.errors.map((err, idx) => (
                <div key={idx} className="text-red-300 text-[11px] font-mono">
                  • {err}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
