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
    <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5 my-6 text-black">
      <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-black/70" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-black font-bold">
            SHA-256 Ledger Hash-Chain Integrity
          </h3>
        </div>

        <button
          onClick={handleVerifyIntegrity}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs bg-black/5 hover:bg-black/10 text-black border border-black/15 rounded transition disabled:opacity-50 font-medium"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
          Verify SHA-256 Ledger Chain
        </button>
      </div>

      {errorMsg && (
        <div className="text-xs font-mono text-red-900 bg-red-50 p-3 rounded mb-3 border border-red-200">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="font-mono text-xs space-y-2">
          <div className={`p-3 rounded border flex items-center justify-between ${
            result.integrity_valid
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-red-50 border-red-300 text-red-950"
          }`}>
            <span className="font-semibold">Cryptographic Hash-Chain Integrity:</span>
            <span className="font-bold flex items-center gap-1">
              {result.integrity_valid ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> VERIFIED (ZERO TAMPERING)
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-700" /> CHAIN BROKEN
                </>
              )}
            </span>
          </div>

          <div className="bg-[#F8F9FA] border border-black/10 p-3 rounded space-y-1 text-black">
            <div className="flex justify-between">
              <span className="text-[#52525B] font-medium">Checked Events Count:</span>
              <span className="font-bold">{result.event_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#52525B] font-medium">Validation Errors:</span>
              <span className="font-mono text-black font-semibold">{result.errors.length === 0 ? "0 (Zero Drift)" : `${result.errors.length} Errors Detected`}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
