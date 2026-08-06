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
    <div className="bg-white border border-black/15 shadow-sm rounded-lg p-6 my-6 text-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/10 pb-4 mb-4">
        <div>
          <h3 className="font-mono text-base uppercase tracking-wider text-black font-bold flex items-center gap-2">
            60-Second Automated Proof Scenario
          </h3>
          <p className="text-xs text-[#52525B] font-mono mt-1">
            Executes the 7-step deterministic validation suite live against the Q-Psi engine backend.
          </p>
        </div>

        <button
          onClick={handleRunProof}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-wider bg-black text-white font-bold rounded hover:bg-black/85 disabled:opacity-50 transition shrink-0 border border-black shadow-sm"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              EXECUTING PROOF STEPS...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white fill-white" />
              RUN THE 60-SECOND PROOF
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 p-4 rounded text-xs font-mono text-red-900 mb-4">
          Error executing proof: {errorMsg}
        </div>
      )}

      {proofResult && (
        <div>
          <div className="flex items-center justify-between bg-[#F8F9FA] border border-black/10 p-4 rounded mb-4">
            <span className="font-mono text-xs uppercase text-[#52525B] font-medium">Final Verification Verdict</span>
            <span
              className={`font-mono text-sm font-bold flex items-center gap-2 ${
                proofResult.verdict === "ACCEPTED" ? "text-emerald-800" : "text-red-800"
              }`}
            >
              {proofResult.verdict === "ACCEPTED" ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" /> PROOF PASSED
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-700" /> PROOF FAILED
                </>
              )}
            </span>
          </div>

          {/* Steps List */}
          <div className="space-y-2 max-h-80 overflow-y-auto font-mono text-xs pr-1">
            {proofResult.steps.map((step: ProofStepResult) => (
              <div
                key={step.step}
                className="bg-[#F8F9FA] border border-black/10 rounded p-3 flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-black">
                    Step {step.step}: {step.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      step.status === "PASS"
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-red-100 text-red-900 border border-red-300"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="text-black/80 text-[11px] font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
