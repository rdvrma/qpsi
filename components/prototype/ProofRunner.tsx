"use client";

import React, { useState } from "react";
import { QPsiApiClient } from "@/lib/prototype-api";
import { ProofResponse, ProofStepResult } from "@/lib/prototype-types";
import { Play, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface ProofRunnerProps {
  worldId: string;
  onProofComplete: () => void;
}

export const ProofRunner: React.FC<ProofRunnerProps> = ({ worldId, onProofComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [proofResult, setProofResult] = useState<ProofResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunProof = async () => {
    setIsRunning(true);
    setErrorMsg(null);
    setProofResult(null);

    try {
      const res = await QPsiApiClient.runProof(worldId);
      setProofResult(res);
      onProofComplete();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to execute 60-second proof scenario against backend.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-6 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
        <div>
          <h3 className="font-mono text-base uppercase tracking-wider text-white font-bold flex items-center gap-2">
            60-Second Automated Proof Scenario
          </h3>
          <p className="text-xs text-[#777777] font-mono mt-1">
            Executes the 7-step deterministic validation suite live against the Q-Psi engine backend.
          </p>
        </div>

        <button
          onClick={handleRunProof}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-wider bg-white text-black font-bold rounded hover:bg-white/90 disabled:opacity-50 transition shrink-0"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              EXECUTING PROOF STEPS...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-black fill-black" />
              RUN THE 60-SECOND PROOF
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded text-xs font-mono text-red-300 mb-4">
          Error executing proof: {errorMsg}
        </div>
      )}

      {proofResult && (
        <div>
          <div className="flex items-center justify-between bg-black/40 border border-white/10 p-4 rounded mb-4">
            <span className="font-mono text-xs uppercase text-[#777777]">Final Verification Verdict</span>
            <span
              className={`font-mono text-sm font-bold flex items-center gap-2 ${
                proofResult.verdict === "ACCEPTED" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {proofResult.verdict === "ACCEPTED" ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> PROOF PASSED
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" /> PROOF FAILED
                </>
              )}
            </span>
          </div>

          {/* Steps List */}
          <div className="space-y-2 max-h-80 overflow-y-auto font-mono text-xs pr-1">
            {proofResult.steps.map((step: ProofStepResult) => (
              <div
                key={step.step}
                className="bg-[#050505] border border-white/10 rounded p-3 flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">
                    Step {step.step}: {step.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      step.status === "PASS"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="text-white/70 text-[11px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
