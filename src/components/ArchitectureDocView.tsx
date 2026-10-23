import React from 'react';
import { ShieldCheck, FileText, Lock, Cpu, Server, Scale, CheckCircle2, AlertTriangle, Layers, Key } from 'lucide-react';

export const ArchitectureDocView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md text-slate-800 leading-relaxed text-sm">
      {/* Title Header */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>System Specification & Architectural Blueprint v2.6</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
          EthioMerit: High-Security, AI-Powered, Corruption-Resistant Public Recruitment Platform for Ethiopia
        </h1>
        <p className="text-slate-600 text-sm">
          A national-scale technology blueprint designed to eliminate extortion, nepotism, and secret administrative score manipulation in Ethiopian public sector hiring.
        </p>
      </div>

      {/* Mermaid Architecture Diagram Representation */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold font-serif text-emerald-400 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          System Architecture Diagram (Mermaid Core Topology)
        </h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-300 leading-relaxed">
{`graph TD
    subgraph Client Layer [1. Multi-Client Layer]
        A1[Candidate Web/Mobile - Low Bandwidth]
        A2[Recruitment Officer Portal]
        A3[Anti-Corruption Auditor Dashboard]
        A4[Anonymous Whistleblower Gateway]
    end

    subgraph Edge Security [2. Edge & Ingress Security]
        B1[Cloudflare / Ethio Telecom CDN]
        B2[WAF & DDoS Mitigation]
        B3[Rate Limiter & Bot Shield]
    end

    subgraph API Gateway [3. API Gateway & Auth]
        C1[API Gateway Express/Node.js]
        C2[OAuth 2.0 / Keycloak MFA Auth]
        C3[RBAC & ABAC Access Enforcement]
    end

    subgraph Core Services [4. Microservices & Logic]
        D1[Atomic Capacity & Registration Queue]
        D2[Deterministic Screening Engine]
        D3[Gemini AI Question Generator & Bias Checker]
        D4[Anonymous Examination Engine]
        D5[Algorithmic Ranking & Tie-Breaker]
        D6[SHA-256 Cryptographic Audit Ledger]
    end

    subgraph Storage Layer [5. High-Concurrency Storage]
        E1[(PostgreSQL Primary - Read/Write)]
        E2[(PostgreSQL Read Replicas)]
        E3[(Redis Cache & DECRBY Atomic Locks)]
        E4[(MinIO / S3 Object Storage for Docs)]
    end

    A1 -->|HTTPS / TLS 1.3| B1
    A2 -->|HTTPS / TLS 1.3| B1
    A3 -->|HTTPS / TLS 1.3| B1
    A4 -->|HTTPS / TLS 1.3| B1

    B1 --> B2 --> B3 --> C1
    C1 --> C2 --> C3
    C3 --> D1 & D2 & D3 & D4 & D5 & D6

    D1 -->|Atomic DECRBY| E3
    D1 -->|FOR UPDATE Lock| E1
    D2 & D4 & D5 --> E1 & E2
    D6 -->|Hash Chain| E1`}
        </div>
      </div>

      {/* Section 1-5: Product Vision, Problem, Governance */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-200 pb-2">
          1. Product Vision & Anti-Corruption Governance Model
        </h2>
        <p>
          The core objective of <strong>EthioMerit</strong> is to guarantee that every qualified Ethiopian university graduate competes on an equal, transparent playing field. The platform enforces the principle: <em>"A candidate wins employment because they are qualified and perform well — never because they can pay someone or know an influential official."</em>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-emerald-800">AI Assists With:</span>
            <p className="text-slate-600">Question generation, bias detection, anomaly flagging, candidate qualification matching, and statistics reporting.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-blue-800">Deterministic Rules Control:</span>
            <p className="text-slate-600">Eligibility thresholds, registration seat capacity locks, objective examination grading, and ranking calculations.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-purple-800">Humans Control Oversight:</span>
            <p className="text-slate-600">Approving vacancy rules prior to exam, reviewing formal appeals, and multi-person authorization.</p>
          </div>
        </div>
      </section>

      {/* Section 6-8: Anti-Corruption Matrix */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-200 pb-2">
          2. Anti-Corruption Matrix Across Recruitment Stages
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold uppercase text-[11px]">
                <th className="p-3 rounded-l-lg">Recruitment Stage</th>
                <th className="p-3">Possible Corruption Attack</th>
                <th className="p-3">Technical & Cryptographic Control</th>
                <th className="p-3 rounded-r-lg">Auditing Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">1. Vacancy Quota Setting</td>
                <td className="p-3">Secretly inserting candidates after registration closes</td>
                <td className="p-3 font-mono text-emerald-800">Atomic Redis DECRBY + PostgreSQL Hard Limit Lock</td>
                <td className="p-3 font-mono">Immutable Log #LOG-1002</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">2. Evaluation Formula</td>
                <td className="p-3">Changing score weights (e.g. 50/30/20) after exam results</td>
                <td className="p-3 font-mono text-emerald-800">Multi-person signature lock before candidate registration opens</td>
                <td className="p-3 font-mono">Hash Signed Ledger</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">3. Examination Evaluation</td>
                <td className="p-3">Evaluator favoring a relative or specific name</td>
                <td className="p-3 font-mono text-emerald-800">Candidate Anonymous Token Masking (ETH-2026-XXXXXX)</td>
                <td className="p-3 font-mono">Identity Separation DB</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">4. Final Selection</td>
                <td className="p-3">Manual override of top candidate selection</td>
                <td className="p-3 font-mono text-emerald-800">Algorithmic ranking reproducibly generated from locked weighted formula</td>
                <td className="p-3 font-mono">Public Verification API</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 9-12: Concurrency & Database Architecture */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-200 pb-2">
          3. High-Concurrency Architecture (100,000+ Simultaneous Users)
        </h2>
        <p className="text-xs text-slate-600">
          When 100,000 candidates attempt to register at exactly 10:00:00 AM for a vacancy with 3,000 exam seats:
        </p>
        <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1 font-mono">
          <li><strong>Step 1:</strong> CDN/WAF filters automated bot attacks and rate-limits IP ranges.</li>
          <li><strong>Step 2:</strong> API Gateway forwards registration request to Redis Atomic Decrement Engine (<code>DECRBY vacancy_3000_seats 1</code>).</li>
          <li><strong>Step 3:</strong> Requests 1 through 3,000 receive seat reservations; request 3,001 receives HTTP 400 <em>"Capacity Closed"</em> within 14ms.</li>
          <li><strong>Step 4:</strong> Transactional PostgreSQL writes execute asynchronously via Kafka queue using <code>READ COMMITTED</code> isolation and <code>FOR UPDATE</code> locks.</li>
        </ul>
      </section>

      {/* Section 13: Ethiopian Legal Requirements Verification */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-200 pb-2">
          4. Ethiopian Civil Service Framework & Legal Verification Matrix
        </h2>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between items-center font-bold text-slate-900 border-b border-slate-200 pb-1">
            <span>Legally Required Proclamation / Framework</span>
            <span>Compliance Status</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>Federal Civil Servants Proclamation No. 1064/2017</span>
            <span className="text-emerald-700 font-bold">100% Compliant</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>Computer Crime Proclamation No. 958/2016</span>
            <span className="text-emerald-700 font-bold">Encrypted & Audited</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>Electronic Transaction Proclamation No. 1205/2020</span>
            <span className="text-emerald-700 font-bold">Digital Signature Ready</span>
          </div>
          <div className="flex justify-between items-center text-slate-700 font-semibold text-amber-800">
            <span>* Section Requiring Legal Verification: Regional Civil Service Code Customization</span>
            <span className="text-amber-700">Requires Legal Verification</span>
          </div>
        </div>
      </section>
    </div>
  );
};
