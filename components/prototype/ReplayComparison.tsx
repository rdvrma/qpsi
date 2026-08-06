"use client";

import React, { useState } from "react";
import { QPsiApiClient } from "@/lib/prototype-api";
import { ReplayResponse } from "@/lib/prototype-types";
import { RotateCcw, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface ReplayComparisonProps {
  worldId: string;
}

export const ReplayComparison: React.FC<ReplayComparisonProps> = ({ worldId }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReplayResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunReplay = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await QPsiApiClient.replayWorld(worldId);
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || "Replay engine execution failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 my-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-white/70" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
            Deterministic Event Replay Engine
          </h3>
        </div>

        <button
          onClick={handleRunReplay}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs bg-white/10 hover:bg-white/20 text-white rounded transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
          Replay Ledger into Fresh Projection
        </button>
      </div>

      {errorMsg && (
        <div className="text-xs font-mono text-red-300 bg-red-500/10 p-3 rounded mb-3">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="font-mono text-xs space-y-3">
          <div className="flex items-center justify-between bg-[#050505] p-3 rounded border border-white/10">
            <span className="text-white/70">Replayed Sequence Steps:</span>
            <span className="font-bold text-white">#{result.replayed_sequence_number}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#050505] border border-white/10 p-3 rounded">
              <span className="text-[10px] text-[#777777] block uppercase mb-1">Active World State Digest</span>
              <span className="text-[11px] text-white font-mono break-all">{result.active_digest}</span>
            </div>
            <div className="bg-[#050505] border border-white/10 p-3 rounded">
              <span className="text-[10px] text-[#777777] block uppercase mb-1">Replayed State Digest</span>
              <span className="text-[11px] text-white font-mono break-all">{result.replayed_digest}</span>
            </div>
          </div>

          <div className={`p-3 rounded border flex items-center justify-between ${
            result.digests_match
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}>
            <span className="font-semibold">Bit-Exact Digest Equality Match:</span>
            <span className="font-bold flex items-center gap-1">
              {result.digests_match ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> BIT-EXACT MATCH
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" /> DIGEST MISMATCH
                </>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
