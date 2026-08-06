"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Prototype Route Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center text-[#F5F5F2]">
      <div className="max-w-md bg-[#111111] border border-red-500/30 rounded-lg p-6">
        <AlertOctagon className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h2 className="text-xl font-serif text-white mb-2">Prototype Route Error</h2>
        <p className="text-xs font-mono text-[#777777] mb-6">
          {error.message || "An unexpected error occurred while loading the Q-Psi prototype page."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs bg-white text-black font-bold rounded hover:bg-white/90 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
