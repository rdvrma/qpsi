'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Check } from 'lucide-react';

interface LedgerEvent {
  step: number;
  time: string;
  actor: string;
  action: string;
  stateHash: string;
}

export function LedgerTimeline() {
  const [events, setEvents] = useState<LedgerEvent[]>([
    { step: 101, time: '16:08:01', actor: 'Engine Init', action: 'Canonical Reality Ledger Instantiated', stateHash: '0x1a8f...904e' },
    { step: 102, time: '16:08:05', actor: 'Actor A (Marcus)', action: 'Committed Intent: "Enter Room 101"', stateHash: '0x94c1...d82a' },
    { step: 103, time: '16:08:12', actor: 'Validator Node', action: 'Identity Vector Verified (Zero Drift)', stateHash: '0xe204...118b' },
    { step: 104, time: '16:08:18', actor: 'Actor B (Elena)', action: 'Observed Actor A entry into Room 101', stateHash: '0x7b5d...339f' },
    { step: 105, time: '16:08:24', actor: 'Object Engine', action: 'Object #409 (Book) locked at X:12.4, Y:4.2', stateHash: '0xf41e...880c' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        const lastStep = prev[prev.length - 1].step;
        const newStep = lastStep + 1;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const actions = [
          { actor: 'Validator Node', action: 'Continuous memory integrity check passed (0 contradictions)', stateHash: `0x${Math.random().toString(16).substring(2, 6)}...` },
          { actor: 'Actor A (Marcus)', action: 'Spoke dialog line to Actor B (Tone vector logged)', stateHash: `0x${Math.random().toString(16).substring(2, 6)}...` },
          { actor: 'Actor B (Elena)', action: 'Updated private belief vector regarding secret keycard', stateHash: `0x${Math.random().toString(16).substring(2, 6)}...` },
          { actor: 'Camera System', action: 'Persisted spatial transform coordinates to scene graph', stateHash: `0x${Math.random().toString(16).substring(2, 6)}...` },
        ];
        const nextAction = actions[Math.floor(Math.random() * actions.length)];
        const newEvt: LedgerEvent = {
          step: newStep,
          time: now,
          actor: nextAction.actor,
          action: nextAction.action,
          stateHash: nextAction.stateHash,
        };
        return [...prev.slice(1), newEvt];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border border-white/14 bg-[#060606] p-4 space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2 text-midGray">
          <Database className="w-3.5 h-3.5 text-white/80" />
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primaryWhite">
            INTERACTIVE ARCHITECTURE SIMULATION
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-midGray">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Illustrative behavior — not live prototype data</span>
        </div>
      </div>

      <div className="space-y-1.5 overflow-hidden">
        {events.map((evt) => (
          <motion.div
            key={`${evt.step}-${evt.time}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-2 bg-[#0C0C0C] border border-white/5 hover:border-white/20 transition-colors text-[11px]"
          >
            <div className="flex items-center space-x-3 text-softWhite">
              <span className="text-midGray font-bold">#{evt.step}</span>
              <span className="text-primaryWhite font-semibold">{evt.actor}:</span>
              <span>{evt.action}</span>
            </div>
            <div className="flex items-center space-x-3 text-midGray text-[10px]">
              <span>Hash: {evt.stateHash}</span>
              <span>{evt.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
