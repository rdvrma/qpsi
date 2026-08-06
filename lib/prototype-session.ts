const STORAGE_KEY = "qpsi_demo_session_id";
const WORLD_KEY = "qpsi_demo_world_id";

export function getStoredSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function getStoredWorldId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(WORLD_KEY);
}

export function storeSessionInfo(sessionId: string, worldId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, sessionId);
  localStorage.setItem(WORLD_KEY, worldId);
}

export function clearStoredSessionInfo(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(WORLD_KEY);
}
