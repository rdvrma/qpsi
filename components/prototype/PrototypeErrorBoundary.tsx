"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PrototypeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Prototype error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#111111] border border-red-500/30 rounded-lg p-6 my-6 text-center text-[#F5F5F2]">
          <AlertOctagon className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-serif mb-2">Prototype Component Error</h3>
          <p className="text-sm font-mono text-[#777777] mb-4">
            {this.state.error?.message || "An unexpected rendering error occurred inside the prototype shell."}
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-white/10 hover:bg-white/20 text-white rounded transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Prototype Interface
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
