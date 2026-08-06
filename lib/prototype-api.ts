import {
  WorldStateResponse,
  CommandRequest,
  CommandResponse,
  EventResponse,
  ReplayResponse,
  IntegrityCheckResponse,
  ProofResponse,
  SessionResponse,
  HealthResponse,
  ReadyResponse,
} from "./prototype-types";
import { PrototypeApiError, OfflineError } from "./prototype-errors";

const getBaseUrl = (): string => {
  if (typeof window !== "undefined" && (window as any)._env_?.NEXT_PUBLIC_QPSI_ENGINE_URL) {
    return (window as any)._env_.NEXT_PUBLIC_QPSI_ENGINE_URL;
  }
  return process.env.NEXT_PUBLIC_QPSI_ENGINE_URL || "http://localhost:8000";
};

async function fetchJson<T>(
  endpoint: string,
  options: RequestInit = {},
  sessionId?: string | null
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl.replace(/\/$/, "")}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (sessionId) {
    headers["X-Demo-Session-ID"] = sessionId;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errDetail = `HTTP ${response.status} ${response.statusText}`;
      try {
        const body = await response.json();
        if (body.detail) errDetail = body.detail;
      } catch {
        // use default HTTP error
      }
      throw new PrototypeApiError(errDetail, response.status);
    }

    return (await response.json()) as T;
  } catch (err: any) {
    if (err instanceof PrototypeApiError) {
      throw err;
    }
    if (err.name === "AbortError") {
      throw err;
    }
    throw new OfflineError();
  }
}

export const QPsiApiClient = {
  async getHealth(signal?: AbortSignal): Promise<HealthResponse> {
    return fetchJson<HealthResponse>("/health", { method: "GET", signal });
  },

  async getReady(signal?: AbortSignal): Promise<ReadyResponse> {
    return fetchJson<ReadyResponse>("/ready", { method: "GET", signal });
  },

  async initSession(sessionId?: string | null, signal?: AbortSignal): Promise<SessionResponse> {
    return fetchJson<SessionResponse>("/sessions", { method: "POST", signal }, sessionId);
  },

  async createOrSeedWorld(worldId: string, signal?: AbortSignal): Promise<WorldStateResponse> {
    return fetchJson<WorldStateResponse>(`/worlds?world_id=${encodeURIComponent(worldId)}`, {
      method: "POST",
      signal,
    });
  },

  async getWorld(worldId: string, signal?: AbortSignal): Promise<WorldStateResponse> {
    return fetchJson<WorldStateResponse>(`/worlds/${encodeURIComponent(worldId)}`, {
      method: "GET",
      signal,
    });
  },

  async executeCommand(
    worldId: string,
    command: CommandRequest,
    signal?: AbortSignal
  ): Promise<CommandResponse> {
    return fetchJson<CommandResponse>(`/worlds/${encodeURIComponent(worldId)}/commands`, {
      method: "POST",
      body: JSON.stringify(command),
      signal,
    });
  },

  async getEvents(worldId: string, signal?: AbortSignal): Promise<EventResponse[]> {
    return fetchJson<EventResponse[]>(`/worlds/${encodeURIComponent(worldId)}/events`, {
      method: "GET",
      signal,
    });
  },

  async runProof(worldId: string, signal?: AbortSignal): Promise<ProofResponse> {
    return fetchJson<ProofResponse>(`/worlds/${encodeURIComponent(worldId)}/demo`, {
      method: "POST",
      signal,
    });
  },

  async replayWorld(worldId: string, signal?: AbortSignal): Promise<ReplayResponse> {
    return fetchJson<ReplayResponse>(`/worlds/${encodeURIComponent(worldId)}/replay`, {
      method: "POST",
      signal,
    });
  },

  async verifyIntegrity(
    worldId: string,
    signal?: AbortSignal
  ): Promise<IntegrityCheckResponse> {
    return fetchJson<IntegrityCheckResponse>(
      `/worlds/${encodeURIComponent(worldId)}/verify-integrity`,
      { method: "POST", signal }
    );
  },

  async resetWorld(worldId: string, signal?: AbortSignal): Promise<WorldStateResponse> {
    return fetchJson<WorldStateResponse>(`/worlds/${encodeURIComponent(worldId)}/reset`, {
      method: "POST",
      signal,
    });
  },
};
