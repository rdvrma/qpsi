'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { LicenseModal } from '@/components/capsule/LicenseModal';
import {
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Key,
  Database,
  Layers,
  FileCheck,
  Lock,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
  HardDrive,
  RefreshCw,
  FileText,
  AlertTriangle,
  Building,
  Terminal,
} from 'lucide-react';

export default function CapsulePage() {
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const emailSubject = siteConfig.capsule.emailTemplate.subject;
  const emailBodyTemplate = `Name: 
Organization / Research Group: 
Research Use: 
Workload Description: 
Quantum / Computing Background: 
Support Reference: `;

  const mailtoUrl = `mailto:${siteConfig.capsule.contactEmail}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBodyTemplate)}`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(
      `Subject: ${emailSubject}\n\nTo: ${siteConfig.capsule.contactEmail}\n\n${emailBodyTemplate}`
    );
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="border-b border-border pb-12 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              REMOTE RESEARCH EVALUATION &bull; CAPSULE V1
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary tracking-tight">
              {siteConfig.capsule.title}
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary font-sans leading-relaxed">
              {siteConfig.capsule.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setLicenseModalOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
            >
              <Key className="w-4 h-4" />
              <span>Enter Research License</span>
            </button>

            <a
              href="#support-access"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-surface-raised border border-border text-text-primary font-sans text-xs font-semibold rounded hover:bg-surface-subtle transition-colors shadow-2xs"
            >
              <span>Support &amp; Request Access</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <Link
              href="/capsule/workspace"
              className="inline-flex items-center space-x-2 px-4 py-3 text-text-secondary hover:text-accent font-sans text-xs font-medium transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>Open Workspace Console</span>
            </Link>
          </div>
        </div>

        {/* Pipeline Diagram */}
        <div className="scientific-card p-6 sm:p-10 bg-surface-raised border border-border rounded-lg space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              EVALUATION PIPELINE
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              Remote Compilation Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center font-mono text-xs">
            <div className="p-4 bg-surface border border-border rounded space-y-2 h-full flex flex-col justify-center">
              <FileText className="w-6 h-6 text-accent mx-auto" />
              <div className="font-bold text-text-primary uppercase text-[11px]">
                1. RESEARCH WORKLOAD
              </div>
              <div className="text-[11px] text-text-secondary font-sans leading-snug">
                JSON manifest describing structured search universe
              </div>
            </div>

            <div className="hidden md:flex justify-center text-text-muted font-bold text-base">&rarr;</div>

            <div className="p-4 bg-surface border border-border rounded space-y-2 h-full flex flex-col justify-center">
              <Lock className="w-6 h-6 text-accent mx-auto" />
              <div className="font-bold text-text-primary uppercase text-[11px]">
                2. RESEARCH CAPSULE
              </div>
              <div className="text-[11px] text-text-secondary font-sans leading-snug">
                Isolated evaluation environment with strict runtime boundaries
              </div>
            </div>

            <div className="hidden md:flex justify-center text-text-muted font-bold text-base">&rarr;</div>

            <div className="p-4 bg-surface border border-border rounded space-y-2 h-full flex flex-col justify-center">
              <Cpu className="w-6 h-6 text-accent mx-auto" />
              <div className="font-bold text-text-primary uppercase text-[11px]">
                3. STATE-SPACE COMPILER
              </div>
              <div className="text-[11px] text-text-secondary font-sans leading-snug">
                Private compiler engine transforms universe into candidate states
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center font-mono text-xs pt-1">
            <div className="p-4 bg-surface border border-border rounded space-y-2">
              <Layers className="w-6 h-6 text-accent mx-auto" />
              <div className="font-bold text-text-primary uppercase text-[11px]">
                4. COMPILER RESULTS
              </div>
              <div className="text-[11px] text-text-secondary font-sans leading-snug">
                Candidate space count, reduction metrics, and IR summary
              </div>
            </div>

            <div className="p-4 bg-surface border border-accent/30 rounded space-y-2 bg-accent/5">
              <FileCheck className="w-6 h-6 text-[#15803D] mx-auto" />
              <div className="font-bold text-text-primary uppercase text-[11px]">
                5. SHA256 EVIDENCE BUNDLE
              </div>
              <div className="text-[11px] text-text-secondary font-sans leading-snug">
                Sealed reproducible provenance package for independent auditing
              </div>
            </div>

            <div className="p-4 bg-surface border border-border rounded space-y-2">
              <ShieldCheck className="w-6 h-6 text-accent mx-auto" />
              <div className="font-bold text-text-primary uppercase text-[11px]">
                INTELLECTUAL PROPERTY BOUNDARY
              </div>
              <div className="text-[11px] text-text-secondary font-sans leading-snug">
                Researcher receives full results &amp; evidence; compiler source remains private
              </div>
            </div>
          </div>
        </div>

        {/* Why Remote Research Access */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              SYSTEM DESIGN &amp; MOTIVATION
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">
              Why Remote Research Access?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-xs">
            <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-text-primary text-xs uppercase flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-accent shrink-0" />
                <span>Proprietary Compiler Protection</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                The Q-Psi State-Space Compiler embodies proprietary research innovations and heuristic algorithms that remain closed-source while enabling open evaluation.
              </p>
            </div>

            <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-text-primary text-xs uppercase flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Independent Researcher Evaluation</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Researchers can benchmark their own candidate search domains against Q-Psi without signing restrictive enterprise contracts.
              </p>
            </div>

            <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-text-primary text-xs uppercase flex items-center space-x-1.5">
                <FileCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Reproducible Evidence Generation</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Every execution produces a SHA256-sealed evidence bundle containing execution telemetry and cryptographic verification digests.
              </p>
            </div>

            <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-text-primary text-xs uppercase flex items-center space-x-1.5">
                <HardDrive className="w-4 h-4 text-accent shrink-0" />
                <span>Zero Installation Complexity</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Removes local environment setup, compiler toolchain configuration, or high-performance compute requirements for evaluating workloads.
              </p>
            </div>

            <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-text-primary text-xs uppercase flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Logical Workload Isolation</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Research jobs run in transient, single-tenant containers with memory boundaries and ephemeral storage allocation.
              </p>
            </div>

            <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-text-primary text-xs uppercase flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-accent shrink-0" />
                <span>Controlled Execution Safety</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Strict structured schema validation reduces supply-chain risk and arbitrary code execution vectors on both client and host environments.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Boundary Matrix: What Capsule v1 Does vs Does NOT Do */}
        <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded-lg space-y-6 font-sans">
          <div className="border-b border-border pb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              SPECIFICATION BOUNDARIES
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">
              Capsule v1 Capabilities &amp; Guardrails
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* What it Does */}
            <div className="p-5 bg-surface border border-[#16A34A]/25 rounded space-y-3">
              <div className="flex items-center space-x-2 text-[#15803D] font-mono font-bold uppercase text-[11px]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>WHAT CAPSULE V1 SUPPORTS</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-[#15803D] font-bold">&bull;</span>
                  <span><strong>Bounded Structured Workload Data:</strong> JSON manifests describing discrete candidate spaces, QUBO matrices, and search constraints.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#15803D] font-bold">&bull;</span>
                  <span><strong>Candidate-Space Analysis:</strong> Output state count, candidate-space SHA256 hash, and subspace dimension summaries.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#15803D] font-bold">&bull;</span>
                  <span><strong>Reduction Metrics:</strong> Original vs reduced space size, branch elimination counts, and active qubit requirements.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#15803D] font-bold">&bull;</span>
                  <span><strong>Quantum IR Summaries:</strong> QuantumSearchIR structure and QUBO/Ising matrix translation summaries.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#15803D] font-bold">&bull;</span>
                  <span><strong>SHA256 Evidence Bundle:</strong> Downloadable reproducible ZIP archive containing run artifacts and hash proofs.</span>
                </li>
              </ul>
            </div>

            {/* What it Does NOT Do */}
            <div className="p-5 bg-surface border border-red-200 rounded space-y-3">
              <div className="flex items-center space-x-2 text-red-700 font-mono font-bold uppercase text-[11px]">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>WHAT CAPSULE V1 DOES NOT DO</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">&bull;</span>
                  <span><strong>No Arbitrary Code Execution:</strong> Arbitrary scripts, Python modules, binaries, or unvetted runtimes are blocked.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">&bull;</span>
                  <span><strong>No Shell or Git Access:</strong> No terminal shells, Git repository cloning, or network egress from compilation containers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">&bull;</span>
                  <span><strong>No Physical QPU Submission:</strong> Capsule v1 performs classical state-space compilation and IR generation; physical QPU execution is reserved for audited research campaigns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">&bull;</span>
                  <span><strong>No Guarantee of Advantage:</strong> Compiling a workload does not guarantee quantum computational advantage on custom user problems.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">&bull;</span>
                  <span><strong>No Automatic Commercial Rights:</strong> Evaluation licenses do not grant commercial deployment, distribution, or resale rights.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scientific Claim Boundary & Evidence Reference */}
        <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25 text-[11px] font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SCIENTIFIC CLAIM BOUNDARY</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">
                Historical Benchmark Context
              </h2>
            </div>
            <div className="text-xs font-mono text-text-muted">
              AUDIT VERDICT: <strong className="text-[#15803D]">SUPPORTED</strong>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded space-y-3 font-sans text-xs text-text-secondary leading-relaxed">
            <p>
              <strong>Authoritative Claim Qualifier:</strong> {siteConfig.capsule.claimBoundary}
            </p>
            <p>
              In experiment <strong className="text-text-primary font-mono">{siteConfig.capsule.evidenceReference.experimentId}</strong>, Q-Psi demonstrated compiler-enabled quantum query advantage on physical IBM Quantum hardware (<strong className="text-text-primary font-mono">{siteConfig.capsule.evidenceReference.backend}</strong>) across <strong className="text-text-primary">{siteConfig.capsule.evidenceReference.shots.toLocaleString()} physical shots</strong> with lower effective queries across <strong className="text-text-primary">{siteConfig.capsule.evidenceReference.casesWithAdvantage} cases</strong> and <strong className="text-text-primary">{siteConfig.capsule.evidenceReference.problemSizes} problem sizes</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <Link
              href="/compiler"
              className="text-accent hover:underline font-semibold flex items-center space-x-1"
            >
              <span>View Compiler Benchmark Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-border">&bull;</span>
            <Link
              href="/evidence"
              className="text-accent hover:underline font-semibold flex items-center space-x-1"
            >
              <span>View Reproducible Evidence Register</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Support-Based Research Access Model */}
        <div id="support-access" className="scientific-card p-6 sm:p-10 bg-surface-raised border border-border rounded-lg space-y-8 scroll-mt-24">
          <div className="border-b border-border pb-6 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-border rounded-full text-xs font-mono font-bold text-accent uppercase">
              <span>SUPPORT-BASED RESEARCH ACCESS</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-text-primary">
              Support Q-Psi Research &amp; Request Access
            </h2>
            <p className="text-sm font-sans text-text-secondary max-w-3xl leading-relaxed">
              {siteConfig.capsule.coreCopy}
            </p>
            <div className="p-3.5 bg-surface border border-border rounded text-xs font-mono text-text-primary font-medium">
              {siteConfig.capsule.confirmationNotice}
            </div>
          </div>

          {/* Support Purpose Pillars */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
              WHAT YOUR RESEARCH SUPPORT FUNDS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
              <div className="p-4 bg-surface border border-border rounded space-y-1.5">
                <Cpu className="w-4 h-4 text-accent" />
                <div className="font-mono font-bold text-text-primary text-[11px] uppercase">Research Infrastructure</div>
                <p className="text-text-secondary leading-relaxed text-[11px]">
                  Cloud compiler evaluation hosts, automated verification clusters, and secure sandbox execution.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded space-y-1.5">
                <HardDrive className="w-4 h-4 text-accent" />
                <div className="font-mono font-bold text-text-primary text-[11px] uppercase">Physical QPU Experiments</div>
                <p className="text-text-secondary leading-relaxed text-[11px]">
                  Hardware execution hours on superconducting quantum processors and baseline benchmarking.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded space-y-1.5">
                <RefreshCw className="w-4 h-4 text-accent" />
                <div className="font-mono font-bold text-text-primary text-[11px] uppercase">Reproducibility &amp; Tools</div>
                <p className="text-text-secondary leading-relaxed text-[11px]">
                  Cryptographic evidence sealing, open dataset maintenance, and new quantum research tool development.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded space-y-1.5">
                <FileText className="w-4 h-4 text-accent" />
                <div className="font-mono font-bold text-text-primary text-[11px] uppercase">Open Publication</div>
                <p className="text-text-secondary leading-relaxed text-[11px]">
                  Peer-reviewed open science publishing, scientific monographs, and technical research notes.
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: PayPal Support Action */}
          <div className="p-6 bg-surface border border-border rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-accent uppercase">
                  STEP 1 &bull; SUPPORT THE RESEARCH PROGRAM
                </div>
                <h3 className="text-lg font-serif font-bold text-text-primary">
                  Contribute via Official PayPal Portal
                </h3>
                <p className="text-xs font-sans text-text-secondary max-w-xl leading-relaxed">
                  Support the research program on the hosted PayPal payment portal. Voluntary research support is confirmed manually by the founder.
                </p>
              </div>

              <a
                href={siteConfig.capsule.supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs shrink-0"
              >
                <span>SUPPORT Q-PSI RESEARCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Step 2: Request Email Template */}
          <div className="p-6 bg-surface border border-border rounded-lg space-y-4 font-sans">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-accent uppercase">
                STEP 2 &bull; REQUEST RESEARCH ACCESS
              </div>
              <h3 className="text-lg font-serif font-bold text-text-primary">
                Submit Research Evaluation Request
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                After supporting Q-Psi, email your request to <strong className="text-text-primary font-mono">{siteConfig.capsule.contactEmail}</strong> using the structured template below. Only a high-level summary is needed; do not include confidential workload data.
              </p>
            </div>

            <div className="relative">
              <pre className="p-4 bg-surface-raised border border-border rounded text-xs font-mono text-text-primary leading-relaxed whitespace-pre-wrap select-all">
                {`To: ${siteConfig.capsule.contactEmail}\nSubject: ${emailSubject}\n\n${emailBodyTemplate}`}
              </pre>

              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <button
                  onClick={handleCopyTemplate}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-surface border border-border text-text-primary text-xs font-mono rounded hover:bg-surface-subtle transition-colors shadow-2xs"
                >
                  {copiedTemplate ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803D]" />
                      <span className="text-[#15803D]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href={mailtoUrl}
                className="inline-flex items-center space-x-2 text-xs font-sans text-accent hover:underline font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Email Client</span>
              </a>

              <div className="text-[11px] font-mono text-text-muted">
                Licenses are reviewed and issued manually upon confirmation.
              </div>
            </div>
          </div>

          {/* Future Premium Products Notice */}
          <div className="p-4 bg-surface border border-border rounded text-xs font-sans text-text-secondary leading-relaxed">
            <strong className="text-text-primary font-semibold font-mono uppercase text-[11px]">
              Future Experimental Tools:
            </strong>{' '}
            {siteConfig.capsule.futureProductsNotice}
          </div>
        </div>

        {/* License Flow Steps */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              STEP-BY-STEP OVERVIEW
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">
              Researcher License Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
            <div className="p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-accent text-xs">01. SUPPORT</div>
              <h3 className="font-serif font-bold text-text-primary text-sm">Support Research</h3>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                Support Q-Psi research via the PayPal hosted portal to fund compute and physical hardware time.
              </p>
            </div>

            <div className="p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-accent text-xs">02. REQUEST</div>
              <h3 className="font-serif font-bold text-text-primary text-sm">Submit Request</h3>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                Email your research use case, institution, and payment reference to the founder.
              </p>
            </div>

            <div className="p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-accent text-xs">03. RECEIVE &amp; ENTER</div>
              <h3 className="font-serif font-bold text-text-primary text-sm">Obtain License Key</h3>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                Receive your Research Evaluation License key and authenticate into the secure Capsule workspace.
              </p>
            </div>

            <div className="p-5 bg-surface-raised border border-border rounded space-y-2">
              <div className="font-mono font-bold text-accent text-xs">04. EVALUATE &amp; SEAL</div>
              <h3 className="font-serif font-bold text-text-primary text-sm">Run Workloads</h3>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                Submit eligible manifests, observe compilation progress, inspect results, and download SHA256 evidence.
              </p>
            </div>
          </div>
        </div>

        {/* Commercial Licensing Section */}
        <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded-lg space-y-4 font-sans">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-text-muted uppercase">
            <Building className="w-4 h-4 text-accent" />
            <span>COMMERCIAL USE &amp; ENTERPRISE INTEGRATION</span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Commercial Licensing
          </h2>

          <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
            {siteConfig.capsule.commercialNotice}
          </p>

          <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
            {siteConfig.capsule.commercialSectionCopy}
          </p>

          <div className="pt-2">
            <a
              href={`mailto:${siteConfig.capsule.contactEmail}?subject=Q-Psi%20Commercial%20Licensing%20Inquiry`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface border border-border text-text-primary font-sans text-xs font-semibold rounded hover:bg-surface-subtle transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Commercial Licensing ({siteConfig.capsule.contactEmail})</span>
            </a>
          </div>
        </div>

        {/* Workload Privacy Notice */}
        <div className="p-5 bg-surface border border-border rounded text-xs font-sans text-text-secondary space-y-2">
          <div className="flex items-center space-x-2 text-text-primary font-bold font-mono text-[11px] uppercase">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>WORKLOAD PRIVACY &amp; RETENTION DISCLOSURE</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            {siteConfig.capsule.privacyNotice} Submitted workloads and compilation telemetry are retained ephemerally for execution and evidence bundle generation. Read our{' '}
            <Link href="/privacy" className="text-accent underline font-medium">
              Privacy Policy
            </Link>{' '}
            for complete data processing terms.
          </p>
        </div>
      </main>

      <Footer />

      {/* License Modal */}
      <LicenseModal
        isOpen={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
      />
    </div>
  );
}
