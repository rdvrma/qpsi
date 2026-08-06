'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, PlusCircle, RotateCcw, Check, Lock, Book, UserCheck } from 'lucide-react';

interface LedgerEntry {
  id: string;
  step: number;
  actor: string;
  action: string;
  targetObject: string;
  observer: string;
  canonicalHash: string;
  timestamp: string;
}

export function RoomDiagram() {
  const [stepCount, setStepCount] = useState<number>(3);
  const [bookLocation, setBookLocation] = useState<string>('Table (Coordinates X:12.4, Y:4.2)');
  const [keycardHolder, setKeycardHolder] = useState<string>('Character B (Elena)');
  const [doorLocked, setDoorLocked] = useState<boolean>(false);
  const [trustScore, setTrustScore] = useState<number>(0.84);
  const [lastCommittedEvent, setLastCommittedEvent] = useState<string | null>(null);

  const [ledger, setLedger] = useState<LedgerEntry[]>([
    {
      id: 'evt-1',
      step: 1,
      actor: 'Character A (Marcus)',
      action: 'Entered Room 101',
      targetObject: 'Spatial Bounds (Room 101)',
      observer: 'Character B (Elena)',
      canonicalHash: '0x8f2a...91b4',
      timestamp: '16:04:12',
    },
    {
      id: 'evt-2',
      step: 2,
      actor: 'Character A (Marcus)',
      action: 'Placed Antique Ledger on Center Table',
      targetObject: 'Object #409 (Antique Book)',
      observer: 'Character B (Elena)',
      canonicalHash: '0xc41d...80a2',
      timestamp: '16:04:35',
    },
  ]);

  const handleCommitMoveBook = () => {
    const nextStep = stepCount + 1;
    setStepCount(nextStep);
    setBookLocation('Side Desk (Coordinates X:18.9, Y:8.1)');
    const newEntry: LedgerEntry = {
      id: `evt-${nextStep}`,
      step: nextStep,
      actor: 'Character A (Marcus)',
      action: 'Moved Antique Book to Side Desk',
      targetObject: 'Object #409 (Antique Book)',
      observer: 'Character B (Elena)',
      canonicalHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLedger((prev) => [...prev, newEntry]);
    setLastCommittedEvent(`Event #${nextStep} Committed: Moved Antique Book coordinates updated in spatial transform graph.`);
  };

  const handleCommitHandKeycard = () => {
    const nextStep = stepCount + 1;
    setStepCount(nextStep);
    const newHolder = keycardHolder === 'Character B (Elena)' ? 'Character A (Marcus)' : 'Character B (Elena)';
    setKeycardHolder(newHolder);
    setTrustScore(0.92);
    const newEntry: LedgerEntry = {
      id: `evt-${nextStep}`,
      step: nextStep,
      actor: 'Character B (Elena)',
      action: `Transferred Encrypted Keycard to ${newHolder}`,
      targetObject: 'Object #112 (Keycard)',
      observer: 'Character A (Marcus)',
      canonicalHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLedger((prev) => [...prev, newEntry]);
    setLastCommittedEvent(`Event #${nextStep} Committed: Inventory ownership transferred. Character trust vector increased to 92%.`);
  };

  const handleToggleDoorLock = () => {
    const nextStep = stepCount + 1;
    setStepCount(nextStep);
    const newLockState = !doorLocked;
    setDoorLocked(newLockState);
    const newEntry: LedgerEntry = {
      id: `evt-${nextStep}`,
      step: nextStep,
      actor: 'Character A (Marcus)',
      action: `${newLockState ? 'Locked' : 'Unlocked'} Main Entry Door`,
      targetObject: 'Spatial Portal (Door 101)',
      observer: 'Character B (Elena)',
      canonicalHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLedger((prev) => [...prev, newEntry]);
    setLastCommittedEvent(`Event #${nextStep} Committed: Room 101 spatial portal status updated to ${newLockState ? 'LOCKED' : 'OPEN'}.`);
  };

  const handleResetLedger = () => {
    setStepCount(3);
    setBookLocation('Table (Coordinates X:12.4, Y:4.2)');
    setKeycardHolder('Character B (Elena)');
    setDoorLocked(false);
    setTrustScore(0.84);
    setLastCommittedEvent('Simulation state reset to genesis block #3.');
    setLedger([
      {
        id: 'evt-1',
        step: 1,
        actor: 'Character A (Marcus)',
        action: 'Entered Room 101',
        targetObject: 'Spatial Bounds (Room 101)',
        observer: 'Character B (Elena)',
        canonicalHash: '0x8f2a...91b4',
        timestamp: '16:04:12',
      },
      {
        id: 'evt-2',
        step: 2,
        actor: 'Character A (Marcus)',
        action: 'Placed Antique Ledger on Center Table',
        targetObject: 'Object #409 (Antique Book)',
        observer: 'Character B (Elena)',
        canonicalHash: '0xc41d...80a2',
        timestamp: '16:04:35',
      },
    ]);
  };

  return (
    <div className="w-full border border-black/15 bg-white p-6 sm:p-8 space-y-8 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-black/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-midGray block mb-1 font-medium">
            Interactive Technical Proof Simulation
          </span>
          <h3 className="text-2xl font-serif text-primaryWhite font-bold">
            The Two-Character Atom State Machine
          </h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-midGray">
            Canonical Block Height: <strong className="text-black font-mono font-bold">#{stepCount}</strong>
          </span>
          <button
            onClick={handleResetLedger}
            className="p-2 border border-black/15 text-midGray hover:text-black hover:border-black transition-colors bg-black/[0.02]"
            title="Reset Simulation State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2-Character Room Graphic & State Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Character A */}
        <div className="lg:col-span-4 border border-black/10 bg-[#F8F9FA] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-black" />
              <span className="text-sm font-serif font-bold text-black">Character A — Marcus</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-black/15 text-midGray font-medium">
              Synthetic Adult
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-midGray">Identity Hash:</span>
              <span className="text-black font-medium">0xa9f12...b4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-midGray">Memory Vector:</span>
              <span className="text-black font-medium">{stepCount} Canonical Events</span>
            </div>
            <div className="flex justify-between">
              <span className="text-midGray">Inventory Item:</span>
              <span className="text-black font-semibold">{keycardHolder === 'Character A (Marcus)' ? 'Encrypted Keycard' : 'None'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-midGray">Observed Reality:</span>
              <span className="text-black font-medium">Room 101 (Active)</span>
            </div>
          </div>
        </div>

        {/* Center: Persistent Room State */}
        <div className="lg:col-span-4 border border-black/20 bg-white p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-black" />
              <span className="text-sm font-serif font-bold text-black">Room 101 Canonical State</span>
            </div>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${doorLocked ? 'border-black bg-black text-white font-bold' : 'border-black/20 text-midGray font-medium'}`}>
              {doorLocked ? 'LOCKED' : 'OPEN'}
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-midGray">Book Location:</span>
              <span className="text-black font-medium text-right">{bookLocation}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-midGray">Keycard Bearer:</span>
              <span className="text-black font-medium">{keycardHolder}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-midGray">Relational Trust:</span>
              <span className="text-black font-bold">{(trustScore * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-midGray">Contradiction Rate:</span>
              <span className="text-emerald-800 font-bold">0.00% (Validated)</span>
            </div>
          </div>
        </div>

        {/* Right: Character B */}
        <div className="lg:col-span-4 border border-black/10 bg-[#F8F9FA] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-black" />
              <span className="text-sm font-serif font-bold text-black">Character B — Elena</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-black/15 text-midGray font-medium">
              Synthetic Adult
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-midGray">Identity Hash:</span>
              <span className="text-black font-medium">0x7c4e...18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-midGray">Memory Vector:</span>
              <span className="text-black font-medium">{stepCount} Canonical Events</span>
            </div>
            <div className="flex justify-between">
              <span className="text-midGray">Inventory Item:</span>
              <span className="text-black font-semibold">{keycardHolder === 'Character B (Elena)' ? 'Encrypted Keycard' : 'None'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-midGray">Observed Reality:</span>
              <span className="text-black font-medium">Room 101 (Active)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Action Triggers ("Commit Event") */}
      <div className="p-5 border border-black/12 bg-[#F8F9FA] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-black font-semibold">
            Test State Mutation Triggers (Click "Commit Event")
          </span>
          <span className="text-[11px] font-mono text-midGray">
            Simulates user or autonomous agent actions entering canonical ledger
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleCommitMoveBook}
            className="flex items-center justify-between p-3 border border-black/15 bg-white hover:bg-black/5 hover:border-black transition-all text-xs font-mono text-black text-left shadow-xs"
          >
            <div className="flex items-center space-x-2">
              <Book className="w-3.5 h-3.5 text-midGray" />
              <span className="font-medium">Move Book to Desk</span>
            </div>
            <PlusCircle className="w-3.5 h-3.5 text-midGray" />
          </button>

          <button
            onClick={handleCommitHandKeycard}
            className="flex items-center justify-between p-3 border border-black/15 bg-white hover:bg-black/5 hover:border-black transition-all text-xs font-mono text-black text-left shadow-xs"
          >
            <div className="flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-midGray" />
              <span className="font-medium">Hand Keycard to Actor A</span>
            </div>
            <PlusCircle className="w-3.5 h-3.5 text-midGray" />
          </button>

          <button
            onClick={handleToggleDoorLock}
            className="flex items-center justify-between p-3 border border-black/15 bg-white hover:bg-black/5 hover:border-black transition-all text-xs font-mono text-black text-left shadow-xs"
          >
            <div className="flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-midGray" />
              <span className="font-medium">{doorLocked ? 'Unlock Room Door' : 'Lock Room Door'}</span>
            </div>
            <PlusCircle className="w-3.5 h-3.5 text-midGray" />
          </button>
        </div>

        {/* Confirmation feedback */}
        {lastCommittedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 border border-emerald-300 bg-emerald-50 flex items-center space-x-3 text-xs font-mono text-emerald-950 rounded"
          >
            <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{lastCommittedEvent}</span>
          </motion.div>
        )}
      </div>

      {/* Append-Only Canonical Event Ledger Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-black/70" />
            <span className="text-xs font-mono uppercase tracking-wider text-black font-semibold">
              Canonical Event Ledger Stream (Immutable History)
            </span>
          </div>
          <span className="text-[10px] font-mono text-midGray">
            Append-Only cryptographic logs
          </span>
        </div>

        <div className="border border-black/12 bg-[#F8F9FA] p-4 space-y-2 max-h-48 overflow-y-auto">
          {ledger.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 border-b border-black/5 text-xs font-mono text-black/80 hover:bg-black/[0.03] gap-2"
            >
              <div className="flex items-center space-x-3">
                <span className="text-midGray font-bold">#{entry.step}</span>
                <span className="text-black font-semibold">{entry.actor}</span>
                <span className="text-midGray">→</span>
                <span>{entry.action}</span>
              </div>
              <div className="flex items-center space-x-4 text-[11px] text-midGray">
                <span>Observed by: {entry.observer}</span>
                <span className="hidden md:inline">Hash: {entry.canonicalHash}</span>
                <span>{entry.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
