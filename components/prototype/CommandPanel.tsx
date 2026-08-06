"use client";

import React, { useState } from "react";
import { QPsiApiClient } from "@/lib/prototype-api";
import { CommandResponse } from "@/lib/prototype-types";
import { Terminal, RefreshCw, ShieldCheck, CornerDownRight, RotateCcw } from "lucide-react";

interface CommandPanelProps {
  worldId: string;
  onStateUpdate: () => void;
  onValidationResult: (res: CommandResponse | null) => void;
}

export const CommandPanel: React.FC<CommandPanelProps> = ({
  worldId,
  onStateUpdate,
  onValidationResult,
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const runCommand = async (
    actionName: string,
    actorId: string,
    commandType: string,
    targetId?: string,
    sourceLoc?: string,
    destLoc?: string,
    params: Record<string, any> = {}
  ) => {
    setLoadingAction(actionName);
    onValidationResult(null);

    try {
      const res = await QPsiApiClient.executeCommand(worldId, {
        actor_id: actorId,
        command_type: commandType,
        target_id: targetId,
        source_location: sourceLoc,
        destination_location: destLoc,
        parameters: params,
      });

      onValidationResult(res);
      await onStateUpdate();
    } catch (err: any) {
      onValidationResult({
        valid: false,
        code: "NETWORK_ERROR",
        error_message: err.message || "Failed to execute command on engine backend.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleResetDemo = async () => {
    setLoadingAction("reset");
    try {
      await QPsiApiClient.resetWorld(worldId);
      onValidationResult({
        valid: true,
        code: "WORLD_RESET",
        error_message: "Demo world successfully reset to seed state.",
      });
      await onStateUpdate();
    } catch (err: any) {
      onValidationResult({
        valid: false,
        code: "RESET_FAILED",
        error_message: err.message || "Failed to reset world.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg p-5 my-6">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
        <Terminal className="w-4 h-4 text-white/70" />
        <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
          Controlled Manual Demo Actions
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 font-mono text-xs">
        <button
          onClick={() => runCommand("elena_leave", "elena", "leave_room", undefined, "main_room", "hallway")}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-white/10 hover:bg-white/10 text-white p-2.5 rounded text-left transition disabled:opacity-50"
        >
          <span className="text-white/50 block text-[10px]">Action 1</span>
          Elena leaves room
        </button>

        <button
          onClick={() => runCommand("move_book", "marcus", "move_object", "book", "shelf", "table")}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-white/10 hover:bg-white/10 text-white p-2.5 rounded text-left transition disabled:opacity-50"
        >
          <span className="text-white/50 block text-[10px]">Action 2</span>
          Move book (shelf→table)
        </button>

        <button
          onClick={() => runCommand("contradiction", "marcus", "pick_up_object", "book", "shelf")}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-red-500/30 hover:bg-red-500/10 text-red-300 p-2.5 rounded text-left transition disabled:opacity-50"
        >
          <span className="text-red-400/60 block text-[10px]">Test Rejection</span>
          Attempt Contradiction
        </button>

        <button
          onClick={() => runCommand("elena_enter", "elena", "enter_room", undefined, undefined, "main_room")}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-white/10 hover:bg-white/10 text-white p-2.5 rounded text-left transition disabled:opacity-50"
        >
          <span className="text-white/50 block text-[10px]">Action 3</span>
          Elena enters room
        </button>

        <button
          onClick={() => runCommand("elena_inspect", "elena", "inspect_object", "book")}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-white/10 hover:bg-white/10 text-white p-2.5 rounded text-left transition disabled:opacity-50"
        >
          <span className="text-white/50 block text-[10px]">Action 4</span>
          Elena inspects book
        </button>

        <button
          onClick={() => onStateUpdate()}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-white/10 hover:bg-white/10 text-white p-2.5 rounded text-left transition disabled:opacity-50"
        >
          <span className="text-white/50 block text-[10px]">Persistence</span>
          Reload from Persistence
        </button>

        <button
          onClick={handleResetDemo}
          disabled={loadingAction !== null}
          className="bg-[#050505] border border-white/10 hover:bg-white/10 text-white p-2.5 rounded text-left transition disabled:opacity-50 col-span-2 sm:col-span-1"
        >
          <span className="text-white/50 block text-[10px]">Reset</span>
          Reset My Demo
        </button>
      </div>
    </div>
  );
};
