import { Metadata } from "next";
import { PrototypeShell } from "@/components/prototype/PrototypeShell";
import { PrototypeErrorBoundary } from "@/components/prototype/PrototypeErrorBoundary";

export const metadata: Metadata = {
  title: "Q-Psi Early Technical Prototype | Persistent World Engine",
  description: "Live functional prototype demonstrating persistent canonical state, separate character beliefs, contradiction rejection, event replay and hash-chain integrity.",
};

export default function PrototypePage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-20 pb-16">
      <PrototypeErrorBoundary>
        <PrototypeShell />
      </PrototypeErrorBoundary>
    </main>
  );
}
