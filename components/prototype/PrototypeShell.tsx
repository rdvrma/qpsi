"use client";

import React, { useEffect, useState, useCallback } from "react";
import { QPsiApiClient } from "@/lib/prototype-api";
import { getStoredSessionId, storeSessionInfo } from "@/lib/prototype-session";
import {
  WorldStateResponse,
  CommandResponse,
  EventResponse,
  BeliefState,
} from "@/lib/prototype-types";
import { CharacterStatePanel } from "./CharacterStatePanel";
import { RoomStatePanel } from "./RoomStatePanel";
import { CommandPanel } from "./CommandPanel";
import { ProofRunner } from "./ProofRunner";
import { EventLedger } from "./EventLedger";
import { ValidationResult } from "./ValidationResult";
import { ReplayComparison } from "./ReplayComparison";
import { IntegrityStatus } from "./IntegrityStatus";
import { PrototypeDisclosure } from "./PrototypeDisclosure";
import { Loader2, Server, Database as DbIcon, ShieldCheck, RefreshCw, AlertTriangle } from "lucide-react";

export const PrototypeShell: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [worldId, setWorldId] = useState<string | null>(null);
  const [worldState, setWorldState] = useState<WorldStateResponse | null>(null);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [validationResult, setValidationResult] = useState<CommandResponse | null>(null);

  const [isApiReachable, setIsApiReachable] = useState<boolean>(false);
  const [isDbReady, setIsDbReady] = useState<boolean>(false);
  const [isLocal, setIsLocal] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchWorldData = useCallback(async (targetWorldId: string) => {
    try {
      const [wState, evts] = await Promise.all([
        QPsiApiClient.getWorld(targetWorldId),
        QPsiApiClient.getEvents(targetWorldId),
      ]);
      setWorldState(wState);
      setEvents(evts);
    } catch (err: any) {
      console.error("Failed to fetch world data:", err);
      setErrorMsg(err.message || "Failed to load state from engine.");
    }
  }, []);

  const initPrototypeSession = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Readiness Check
      const readyRes = await QPsiApiClient.getReady();
      setIsApiReachable(true);
      setIsDbReady(readyRes.database_ready);

      // Check if backend URL is local vs remote
      const engineUrl = process.env.NEXT_PUBLIC_QPSI_ENGINE_URL || "http://localhost:8000";
      setIsLocal(engineUrl.includes("localhost") || engineUrl.includes("127.0.0.1"));

      // 2. Initialize or retrieve isolated visitor session
      const storedSess = getStoredSessionId();
      const sessRes = await QPsiApiClient.initSession(storedSess);

      setSessionId(sessRes.session_id);
      setWorldId(sessRes.world_id);
      storeSessionInfo(sessRes.session_id, sessRes.world_id);

      // 3. Load world state
      await fetchWorldData(sessRes.world_id);
    } catch (err: any) {
      setIsApiReachable(false);
      setIsDbReady(false);
      setErrorMsg(
        err.message || "Failed to connect to Q-Psi Classical State Engine API. Make sure backend service is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, [fetchWorldData]);

  useEffect(() => {
    initPrototypeSession();
  }, [initPrototypeSession]);

  const handleRefresh = async () => {
    if (worldId) {
      await fetchWorldData(worldId);
    } else {
      await initPrototypeSession();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center text-[#F5F5F2]">
        <Loader2 className="w-8 h-8 animate-spin text-white mb-4" />
        <h3 className="font-mono text-sm uppercase tracking-wider font-semibold">
          INITIALIZING ISOLATED PROTOTYPE SESSION...
        </h3>
        <p className="text-xs text-[#777777] font-mono mt-1">
          Connecting to Q-Psi Classical State Engine & loading canonical database snapshot...
        </p>
      </div>
    );
  }

  const marcusBeliefs: BeliefState[] = worldState?.character_beliefs?.["marcus"] || [];
  const elenaBeliefs: BeliefState[] = worldState?.character_beliefs?.["elena"] || [];

  const marcus = worldState?.canonical_state?.characters?.["marcus"] || {
    id: "marcus",
    name: "Marcus",
    location_id: "main_room",
    inventory: [],
  };

  const elena = worldState?.canonical_state?.characters?.["elena"] || {
    id: "elena",
    name: "Elena",
    location_id: "main_room",
    inventory: [],
  };

  const objects = worldState?.canonical_state?.objects || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-[#F5F5F2]">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-white/60 font-bold">
            Q-PSI EARLY TECHNICAL PROTOTYPE
          </span>
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition"
            >
              <RefreshCw className="w-3 h-3" /> Sync State
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mb-2">
          Two characters. One room. Canonical history that survives restart.
        </h1>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/70">
          <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded">FUNCTIONAL CLASSICAL PROTOTYPE</span>
          <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded">TEXT / STATE BASED</span>
          <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded">NO PRODUCTION USERS</span>
          <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded">NO QUANTUM ADVANTAGE CLAIM</span>
        </div>
      </div>

      {/* Compact Technical Status Panel */}
      <div className="bg-[#111111] border border-white/10 rounded-lg p-4 mb-8 font-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-white/80">
        <div className="flex items-center gap-2">
          <Server className={`w-4 h-4 ${isApiReachable ? "text-emerald-400" : "text-red-400"}`} />
          <div>
            <span className="text-[10px] text-[#777777] block">API REACHABLE</span>
            <span className="font-bold">{isApiReachable ? "ONLINE" : "OFFLINE"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DbIcon className={`w-4 h-4 ${isDbReady ? "text-emerald-400" : "text-red-400"}`} />
          <div>
            <span className="text-[10px] text-[#777777] block">DATABASE PERSISTENCE</span>
            <span className="font-bold">{isDbReady ? "READY" : "ERROR"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-white/60" />
          <div>
            <span className="text-[10px] text-[#777777] block">ISOLATED DEMO SESSION</span>
            <span className="font-bold truncate max-w-[100px] block" title={sessionId || ""}>
              {sessionId ? `${sessionId.slice(0, 10)}...` : "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-white/60" />
          <div>
            <span className="text-[10px] text-[#777777] block">CANONICAL SEQUENCE</span>
            <span className="font-bold">#{worldState?.sequence_number ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Error / Offline Alert */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 font-mono text-xs text-red-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm mb-1">Backend Connection Offline</h4>
            <p className="opacity-90">{errorMsg}</p>
            <p className="text-[11px] text-white/60 mt-2">
              Start the Q-Psi engine backend via <code className="bg-black/50 px-1 py-0.5 rounded text-white">powershell ./scripts/run-prototype.ps1</code> or verify <code className="bg-black/50 px-1 py-0.5 rounded text-white">NEXT_PUBLIC_QPSI_ENGINE_URL</code>. Zero fake events or static JSON fallbacks are shown.
            </p>
          </div>
        </div>
      )}

      {/* Main 3-Panel Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CharacterStatePanel
          character={marcus}
          beliefs={marcusBeliefs}
          title="CHARACTER 1"
        />

        <RoomStatePanel
          objects={objects}
          sequenceNumber={worldState?.sequence_number ?? 0}
          stateDigest={worldState?.state_digest ?? ""}
        />

        <CharacterStatePanel
          character={elena}
          beliefs={elenaBeliefs}
          title="CHARACTER 2"
        />
      </div>

      {/* 60-Second Proof Runner */}
      {worldId && (
        <ProofRunner
          worldId={worldId}
          onProofComplete={handleRefresh}
        />
      )}

      {/* Validation Result Output */}
      <ValidationResult result={validationResult} />

      {/* Manual Demo Controls */}
      {worldId && (
        <CommandPanel
          worldId={worldId}
          onStateUpdate={handleRefresh}
          onValidationResult={setValidationResult}
        />
      )}

      {/* Event Ledger */}
      <EventLedger
        events={events}
        isConnected={isApiReachable}
        isLocal={isLocal}
      />

      {/* Replay Engine & Hash-Chain Integrity */}
      {worldId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <ReplayComparison worldId={worldId} />
          <IntegrityStatus worldId={worldId} />
        </div>
      )}

      {/* Permanent Technical Disclosure */}
      <PrototypeDisclosure />
    </div>
  );
};
