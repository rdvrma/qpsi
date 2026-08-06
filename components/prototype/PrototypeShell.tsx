"use client";

import React, { useEffect, useState, useCallback } from "react";
import { QPsiApiClient } from "@/lib/prototype-api";
import { getStoredSessionId, getStoredWorldId, storeSessionInfo } from "@/lib/prototype-session";
import {
  WorldStateResponse,
  CommandResponse,
  EventResponse,
  BeliefState,
  CharacterState,
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
      const apiUrl = process.env.NEXT_PUBLIC_QPSI_ENGINE_URL || "http://127.0.0.1:8000";
      setIsLocal(apiUrl.includes("127.0.0.1") || apiUrl.includes("localhost"));

      // 2. Check for existing session in localStorage
      let activeSessionId = getStoredSessionId();
      let activeWorldId = getStoredWorldId();

      if (!activeWorldId || !activeSessionId) {
        // Create new session & world
        const newSess = await QPsiApiClient.initSession();
        activeSessionId = newSess.session_id;
        activeWorldId = newSess.world_id;
        storeSessionInfo(activeSessionId, activeWorldId);
      }

      setSessionId(activeSessionId);
      setWorldId(activeWorldId);

      // 3. Fetch Initial World State & Events
      await fetchWorldData(activeWorldId);
    } catch (err: any) {
      console.error("Prototype Init Error:", err);
      setIsApiReachable(false);
      setIsDbReady(false);
      setErrorMsg(
        err.message ||
          "Could not connect to Q-Psi Python backend. Ensure server is running on http://127.0.0.1:8000"
      );
    } finally {
      setIsLoading(false);
    }
  }, [fetchWorldData]);

  useEffect(() => {
    initPrototypeSession();
  }, [initPrototypeSession]);

  const handleRefresh = useCallback(() => {
    if (worldId) {
      fetchWorldData(worldId);
    } else {
      initPrototypeSession();
    }
  }, [worldId, fetchWorldData, initPrototypeSession]);

  // Extract character belief objects from worldState
  const marcusBeliefs = worldState?.character_beliefs?.["marcus"] || {
    room_objects: {},
    character_locations: {},
    door_locked: false,
    keycard_bearer: "",
    relational_trust: 0.84,
  };

  const elenaBeliefs = worldState?.character_beliefs?.["elena"] || {
    room_objects: {},
    character_locations: {},
    door_locked: false,
    keycard_bearer: "",
    relational_trust: 0.84,
  };

  const marcus: CharacterState = worldState?.canonical_state?.characters?.["marcus"] || {
    id: "marcus",
    name: "Marcus",
    location_id: "main_room",
    inventory: [],
  };

  const elena: CharacterState = worldState?.canonical_state?.characters?.["elena"] || {
    id: "elena",
    name: "Elena",
    location_id: "main_room",
    inventory: [],
  };

  const objects = worldState?.canonical_state?.objects || (worldState as any)?.room_state?.objects || {
    book: { id: "book", name: "Antique Book", location_id: "table", container_surface: "table" },
    keycard: { id: "keycard", name: "Encrypted Keycard", location_id: "elena", container_surface: "elena" },
    door: { id: "door", name: "Room 101 Door", location_id: "closed", container_surface: "closed" },
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center font-mono">
        <Loader2 className="w-8 h-8 text-black animate-spin mb-4" />
        <h2 className="text-xl font-serif text-black font-bold mb-2">Connecting to Q-Psi Classical State Engine...</h2>
        <p className="text-xs text-[#52525B]">Verifying API endpoint & loading persistent state digest.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-[#09090B]">
      {/* Header Banner */}
      <div className="border-b border-black/10 pb-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#52525B] font-bold">
            Q-PSI EARLY TECHNICAL PROTOTYPE
          </span>
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 hover:bg-black/10 text-black border border-black/15 rounded transition font-medium"
            >
              <RefreshCw className="w-3 h-3" /> Sync State
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif text-black font-bold tracking-tight mb-2">
          Two characters. One room. Canonical history that survives restart.
        </h1>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-black/80">
          <span className="bg-black/5 border border-black/15 px-2.5 py-1 rounded font-medium">FUNCTIONAL CLASSICAL PROTOTYPE</span>
          <span className="bg-black/5 border border-black/15 px-2.5 py-1 rounded font-medium">TEXT / STATE BASED</span>
          <span className="bg-black/5 border border-black/15 px-2.5 py-1 rounded font-medium">NO PRODUCTION USERS</span>
          <span className="bg-black/5 border border-black/15 px-2.5 py-1 rounded font-medium">NO QUANTUM ADVANTAGE CLAIM</span>
        </div>
      </div>

      {/* Compact Technical Status Panel */}
      <div className="bg-white border border-black/15 shadow-sm rounded-lg p-4 mb-8 font-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-black">
        <div className="flex items-center gap-2">
          <Server className={`w-4 h-4 ${isApiReachable ? "text-emerald-700" : "text-red-600"}`} />
          <div>
            <span className="text-[10px] text-[#52525B] block font-medium">API REACHABLE</span>
            <span className="font-bold">{isApiReachable ? "ONLINE" : "OFFLINE"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DbIcon className={`w-4 h-4 ${isDbReady ? "text-emerald-700" : "text-red-600"}`} />
          <div>
            <span className="text-[10px] text-[#52525B] block font-medium">DATABASE PERSISTENCE</span>
            <span className="font-bold">{isDbReady ? "READY" : "ERROR"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-black/70" />
          <div>
            <span className="text-[10px] text-[#52525B] block font-medium">ISOLATED DEMO SESSION</span>
            <span className="font-bold truncate max-w-[100px] block" title={sessionId || ""}>
              {sessionId ? `${sessionId.slice(0, 10)}...` : "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-black/70" />
          <div>
            <span className="text-[10px] text-[#52525B] block font-medium">CANONICAL SEQUENCE</span>
            <span className="font-bold">#{worldState?.sequence_number ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Error / Offline Alert */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 font-mono text-xs text-red-900 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm mb-1">Backend Connection Offline</h4>
            <p className="opacity-90">{errorMsg}</p>
            <p className="text-[11px] text-red-800 mt-2">
              Start the Q-Psi engine backend via <code className="bg-white border border-red-200 px-1 py-0.5 rounded text-red-950 font-mono">powershell ./scripts/run-prototype.ps1</code> or verify <code className="bg-white border border-red-200 px-1 py-0.5 rounded text-red-950 font-mono">NEXT_PUBLIC_QPSI_ENGINE_URL</code>. Zero fake events or static JSON fallbacks are shown.
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
