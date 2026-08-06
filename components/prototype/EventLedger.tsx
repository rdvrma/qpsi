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
    <div className="bg-white border border-black/15 shadow-sm rounded-lg p-5 my-6 text-black">
      <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-black/70" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-black font-bold">
            {getLedgerTitle()}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-emerald-700 animate-pulse" : "bg-red-600"
            }`}
          />
          <span className="font-mono text-[11px] text-midGray uppercase font-medium">
            {events.length} Committed Events
          </span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-[#F8F9FA] border border-black/10 p-6 rounded text-center text-xs font-mono text-midGray">
          No events committed to ledger yet. Run the 60-second proof or execute a manual action to append events.
        </div>
      ) : (
        <div className="space-y-2 font-mono text-xs">
          {events.map((evt) => {
            const isExpanded = !!expandedEvents[evt.event_id];
            return (
              <div
                key={evt.event_id}
                className="bg-[#F8F9FA] border border-black/10 rounded p-3 text-black hover:border-black/25 transition"
              >
                <div
                  onClick={() => toggleExpand(evt.event_id)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-black text-xs">#{evt.sequence_number}</span>
                    <span className="bg-black/10 px-2 py-0.5 rounded text-[11px] font-bold uppercase text-black">
                      {evt.event_type}
                    </span>
                    <span className="text-midGray hidden sm:inline">actor: <strong className="text-black">{evt.actor_id}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-midGray font-mono truncate max-w-[100px] hidden md:inline" title={evt.event_hash}>
                      {evt.event_hash ? `${evt.event_hash.slice(0, 8)}...` : "—"}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-midGray" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-midGray" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-black/10 space-y-2 text-[11px] text-black/80">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-midGray block font-medium">EVENT ID:</span>
                        <span className="font-mono text-black font-semibold">{evt.event_id}</span>
                      </div>
                      <div>
                        <span className="text-midGray block font-medium">PREVIOUS HASH:</span>
                        <span className="font-mono text-black font-semibold truncate block" title={evt.previous_event_hash || ""}>
                          {evt.previous_event_hash || "GENESIS (0x0000)"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-midGray block mb-1 font-medium">RESULTING STATE DELTA:</span>
                      <pre className="bg-white border border-black/10 p-2 rounded text-[10px] overflow-x-auto text-black font-mono">
                        {JSON.stringify(evt.resulting_state || {}, null, 2)}
                      </pre>
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
