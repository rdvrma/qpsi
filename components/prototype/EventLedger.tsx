"use client";

import React, { useState } from "react";
import { EventResponse } from "@/lib/prototype-types";
import { Database, ChevronDown, ChevronRight, Lock, Clock } from "lucide-react";

interface EventLedgerProps {
  events: EventResponse[];
  isConnected: boolean;
  isLocal: boolean;
}

export const EventLedger: React.FC<EventLedgerProps> = ({ events, isConnected, isLocal }) => {
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getLedgerTitle = () => {
    if (!isConnected) return "PROTOTYPE CURRENTLY OFFLINE";
    if (isLocal) return "LOCAL VERIFIED PROTOTYPE LEDGER";
    return "LIVE Q-PSI PROTOTYPE LEDGER";
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 my-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-white/70" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
            {getLedgerTitle()}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"
            }`}
          />
          <span className="font-mono text-[11px] text-white/60 uppercase">
            {events.length} Committed Events
          </span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-[#050505] border border-white/10 p-6 rounded text-center text-xs font-mono text-[#777777]">
          No events committed to ledger yet. Run the 60-second proof or execute a manual action to append events.
        </div>
      ) : (
        <div className="space-y-2 font-mono text-xs">
          {events.map((evt) => {
            const isExpanded = !!expandedEvents[evt.event_id];
            return (
              <div
                key={evt.event_id}
                className="bg-[#050505] border border-white/10 rounded p-3 text-white/90 hover:border-white/20 transition"
              >
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 cursor-pointer"
                  onClick={() => toggleExpand(evt.event_id)}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-white/50 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
                    )}
                    <span className="bg-white/10 text-white px-2 py-0.5 rounded font-bold text-[11px]">
                      #{evt.sequence_number}
                    </span>
                    <span className="text-white font-bold">{evt.event_type}</span>
                    <span className="text-[#777777]">by</span>
                    <span className="text-white/90 font-semibold">{evt.actor_id}</span>
                    {evt.target_id && (
                      <>
                        <span className="text-[#777777]">target:</span>
                        <span className="text-white/90">{evt.target_id}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-white/50">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400/80" />
                      Hash: {evt.event_hash.slice(0, 8)}...
                    </span>
                    <span className="flex items-center gap-1 hidden md:inline-flex">
                      <Clock className="w-3 h-3 text-white/30" />
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2 text-[11px] bg-black/40 p-3 rounded">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/70">
                      <div>
                        <span className="text-[#777777] block text-[10px]">Previous State:</span>
                        <pre className="bg-[#050505] p-2 rounded text-[10px] text-white/80 overflow-x-auto">
                          {JSON.stringify(evt.previous_state, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <span className="text-[#777777] block text-[10px]">Resulting State:</span>
                        <pre className="bg-[#050505] p-2 rounded text-[10px] text-emerald-400/90 overflow-x-auto">
                          {JSON.stringify(evt.resulting_state, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[10px] text-white/60 pt-2 border-t border-white/5">
                      <div>
                        <span className="text-[#777777]">Observer IDs:</span> {evt.observer_ids.join(", ") || "None"}
                      </div>
                      <div>
                        <span className="text-[#777777]">Prev Hash:</span> {evt.previous_event_hash}
                      </div>
                      <div>
                        <span className="text-[#777777]">Full Hash:</span> {evt.event_hash}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
