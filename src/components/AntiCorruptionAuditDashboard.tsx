import React, { useState } from 'react';
import { AuditLogEntry, FraudAlert, WhistleblowerReport } from '../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, Lock, Scale, Hash, Eye, Key } from 'lucide-react';

interface Props {
  auditLogs: AuditLogEntry[];
  fraudAlerts: FraudAlert[];
  whistleblowerReports: WhistleblowerReport[];
  tamperChainOk: boolean;
  onVerifyIntegrity: () => Promise<any>;
}

export const AntiCorruptionAuditDashboard: React.FC<Props> = ({
  auditLogs,
  fraudAlerts,
  whistleblowerReports,
  tamperChainOk,
  onVerifyIntegrity
}) => {
  const [verifying, setVerifying] = useState<boolean>(false);
  const [verifyResult, setVerifyResult] = useState<any>(null);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const res = await onVerifyIntegrity();
      setVerifyResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-900/80 border border-red-600/50 text-red-300 text-xs px-3 py-0.5 rounded-full font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Anti-Corruption & Cryptographic Audit Command Center
          </div>
          <h2 className="text-xl font-bold font-serif">Immutable SHA-256 Ledger & Anomaly Detection</h2>
          <p className="text-xs text-slate-300 mt-1">Guarantees zero secret administrative score alterations, capacity overrides, or candidate insertions</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow flex items-center gap-2 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${verifying ? 'animate-spin' : ''}`} />
            <span>Verify Cryptographic Hash Chain</span>
          </button>
        </div>
      </div>

      {/* Verification Status Card */}
      <div className={`p-5 rounded-xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        tamperChainOk ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-red-50 border-red-300 text-red-950'
      }`}>
        <div className="flex items-start gap-3">
          {tamperChainOk ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-red-600 shrink-0 mt-1" />
          )}
          <div>
            <h3 className="text-base font-bold font-serif">
              {tamperChainOk ? 'Audit Ledger Cryptographically Verified' : 'CRITICAL SECURITY ALERT: Hash Chain Tampering Detected!'}
            </h3>
            <p className="text-xs mt-1 leading-relaxed">
              {tamperChainOk
                ? 'Every recruitment lifecycle transaction (vacancy creation, weight lock, candidate registration, exam grading, selection) is cryptographically chained using SHA-256 digest signatures. No historical records have been modified.'
                : 'A signature discrepancy was detected in historical audit logs. Immediate investigation initiated.'}
            </p>
          </div>
        </div>

        {verifyResult && (
          <div className="bg-white p-3 rounded-lg border border-slate-300 text-xs font-mono shrink-0 space-y-1">
            <div>Chain Length: <strong>{verifyResult.totalLogs} Blocks</strong></div>
            <div>Latest Hash: <code className="text-emerald-700">{verifyResult.latestHash?.slice(0, 16)}...</code></div>
          </div>
        )}
      </div>

      {/* AI Fraud & Anomaly Alerts */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          AI Security Analytics & Anti-Cheat Anomaly Detection ({fraudAlerts.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fraudAlerts.map(alert => (
            <div key={alert.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                  {alert.anomalyType}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Confidence: <strong>{Math.round(alert.confidenceScore * 100)}%</strong>
                </span>
              </div>

              <p className="text-xs font-medium text-slate-800">{alert.description}</p>
              <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                <span>Candidate Token: <code className="font-bold text-slate-700">{alert.candidateId}</code></span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">{alert.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immutable Log Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
              <Hash className="w-5 h-5 text-emerald-700" />
              Cryptographic Audit Log Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Append-only audit ledger recording every sensitive recruitment action
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded font-semibold">
            Genesis Hash Chained
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold uppercase text-[11px]">
                <th className="p-3 rounded-l-lg">Timestamp</th>
                <th className="p-3">Actor & Role</th>
                <th className="p-3">Action Type</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Details</th>
                <th className="p-3">Previous Hash</th>
                <th className="p-3 rounded-r-lg">Current SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3 font-medium text-slate-900">
                    <div>{log.actorName}</div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800">{log.action}</td>
                  <td className="p-3 font-mono text-slate-600">{log.resourceId}</td>
                  <td className="p-3 max-w-xs text-slate-600 leading-relaxed">{log.details}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">
                    {log.previousHash.slice(0, 10)}...
                  </td>
                  <td className="p-3 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50/50 rounded">
                    {log.hash.slice(0, 12)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
