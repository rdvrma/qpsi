export class PrototypeApiError extends Error {
  public statusCode?: number;
  public code?: string;

  constructor(message: string, statusCode?: number, code?: string) {
    super(message);
    this.name = "PrototypeApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class OfflineError extends PrototypeApiError {
  constructor() {
    super("Q-Psi Engine API is currently offline or unreachable. Please check backend connection.", 503, "API_OFFLINE");
    this.name = "OfflineError";
  }
}
