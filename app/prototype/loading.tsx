import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center text-[#F5F5F2]">
      <Loader2 className="w-8 h-8 animate-spin text-white mb-4" />
      <h3 className="font-mono text-sm uppercase tracking-wider font-semibold">
        LOADING Q-PSI PROTOTYPE INTERFACE...
      </h3>
    </div>
  );
}
