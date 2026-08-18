export type LicenseStatus =
  | 'active'
  | 'inactive'
  | 'revoked'
  | 'expired'
  | 'suspended'
  | 'ACTIVE'
  | 'PENDING'
  | 'SUSPENDED'
  | 'REVOKED'
  | 'EXPIRED';

export interface CapsuleLicenseInfo {
  license_id: string;
  license_type: string;
  status: LicenseStatus;
  organization?: string | null;
  issued_at?: string | null;
  expires_at?: string | null;
  max_runtime_seconds?: number;
  rate_limit_rpm?: number;
}

export type JobStatusType =
  | 'QUEUED'
  | 'VALIDATING'
  | 'RUNNING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'RESOURCE_LIMIT_EXCEEDED'
  | 'CANCELLED';

export interface ResearchCapsuleWorkloadV1 {
  schema_version?: string;
  workload_id?: string;
  problem_statement?: string;
  ecosystem?: string;
  repository_files?: string[];
  visible_tests?: string[];
  dependency_manifests?: string[];
  max_candidate_capacity?: number;
  solver_timeout_seconds?: number;
  metadata?: Record<string, any>;
  workload_name: string;
  problem_type?: 'state_space_search' | 'qubo_ising' | 'candidate_space' | 'discrete_optimization' | 'graph_coloring' | 'boolean_sat' | 'custom_manifest' | string;
  input_format?: 'json' | 'raw' | 'graph_adj' | 'matrix' | 'cnf' | 'ast' | string;
  payload?: Record<string, any>;
  compiler_options?: {
    max_candidates?: number;
    target_qubits?: number;
    optimization_level?: 'O0' | 'O1' | 'O2' | 'O3';
    candidate_hash_algorithm?: 'sha256' | 'blake3';
    preserve_intermediates?: boolean;
    reduction_target?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface CapsuleJobStatus {
  job_id: string;
  status: JobStatusType;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
  runtime_seconds?: number | null;
  error_code?: string | null;
  error_message?: string | null;
  compiler_version?: string | null;
  compiler_commit?: string | null;
  workload_name?: string | null;
}

export interface ReductionMetrics {
  original_state_space_size?: number | string;
  reduced_candidate_space_size?: number | string;
  reduction_ratio?: number | string;
  eliminated_branches?: number | string;
  active_qubit_count?: number;
  ancilla_qubit_count?: number;
  circuit_depth?: number;
}

export interface QuantumSearchIRSummary {
  oracle_type?: string;
  state_dimension?: number;
  superposition_prepared?: boolean;
  diffusion_compatible?: boolean;
  phase_inversion_markers?: number;
}

export interface QuboIsingSummary {
  variable_count?: number;
  linear_terms_count?: number;
  quadratic_couplings_count?: number;
  coupling_matrix_density?: number;
  energy_offset?: number;
}

export interface CapsuleCompilerResult {
  job_id: string;
  status: JobStatusType;
  compiler_version: string;
  compiler_commit: string;
  workload_name: string;
  input_sha256: string;
  candidate_state_count: number;
  candidate_space_hash: string;
  reduction_metrics?: ReductionMetrics;
  quantum_search_ir?: QuantumSearchIRSummary;
  qubo_ising?: QuboIsingSummary;
  runtime_seconds: number;
  warnings?: string[];
  evidence_sha256: string;
  evidence_bundle_size_bytes?: number;
  created_at: string;
  completed_at: string;
}

export interface CapsuleSessionData {
  licenseKey: string;
  licenseId: string;
  licenseType: string;
  organization?: string | null;
  expiresAt?: string | null;
  sessionExpiresAt: number;
  createdAt: number;
}

export type CapsuleErrorCode =
  | 'INVALID_WORKLOAD'
  | 'UNAUTHORIZED'
  | 'LICENSE_INACTIVE'
  | 'LICENSE_EXPIRED'
  | 'JOB_NOT_FOUND'
  | 'RATE_LIMITED'
  | 'RESOURCE_LIMIT_EXCEEDED'
  | 'COMPILER_ERROR'
  | 'INTERNAL_ERROR';

export interface CapsuleApiError {
  error_code: CapsuleErrorCode;
  message: string;
  details?: any;
}
