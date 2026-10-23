import React, { useState } from 'react';
import { Vacancy, CandidateApplication } from '../types';
import { Users, Lock, ShieldCheck, CheckCircle2, AlertCircle, FilePlus, UserCheck, Scale, FileText } from 'lucide-react';

interface Props {
  vacancies: Vacancy[];
  applications: CandidateApplication[];
  onLockWeights: (vacancyId: string, weights: any) => void;
}

export const RecruitmentOfficerDashboard: React.FC<Props> = ({
  vacancies,
  applications,
  onLockWeights
}) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(vacancies[0]?.id || '');
  const [writtenWeight, setWrittenWeight] = useState<number>(50);
  const [techWeight, setTechWeight] = useState<number>(30);
  const [interviewWeight, setInterviewWeight] = useState<number>(20);
  const [lockMsg, setLockMsg] = useState<string | null>(null);

  const selectedVacancy = vacancies.find(v => v.id === selectedVacancyId);
  const filteredApps = applications.filter(a => a.vacancyId === selectedVacancyId);

  const handleLockWeights = (e: React.FormEvent) => {
    e.preventDefault();
    if (writtenWeight + techWeight + interviewWeight !== 100) {
      alert('Total score weight percentages must equal exactly 100%.');
      return;
    }

    onLockWeights(selectedVacancyId, {
      writtenExamPercent: writtenWeight,
      technicalAssessmentPercent: techWeight,
      interviewPercent: interviewWeight
    });

    setLockMsg('Evaluation score weights successfully locked and cryptographically signed. No single officer can alter them after competition opens.');
    setTimeout(() => setLockMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-900/80 border border-purple-600/50 text-purple-300 text-xs px-3 py-0.5 rounded-full font-semibold mb-2">
            <Users className="w-3.5 h-3.5" /> Federal Recruitment & Selection Officer Portal
          </div>
          <h2 className="text-xl font-bold font-serif">Recruitment Lifecycle & Quota Management</h2>
          <p className="text-xs text-slate-300 mt-1">Multi-signature vacancy approval, criteria locking, and automated ranking oversight</p>
        </div>

        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Multi-Person Dual Sign-off Required
          </div>
          <span className="text-[11px] text-slate-400">Officer 1 (MInT) + Officer 2 (Civil Service) Authorized</span>
        </div>
      </div>

      {/* Vacancy Selector & Weight Locking Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Vacancy Controls & Weight Lock Form */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" /> Lock Evaluation Criteria Weights
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Active Vacancy:</label>
            <select
              value={selectedVacancyId}
              onChange={(e) => setSelectedVacancyId(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-600"
            >
              {vacancies.map(v => (
                <option key={v.id} value={v.id}>
                  {v.title} ({v.institution})
                </option>
              ))}
            </select>
          </div>

          {selectedVacancy && (
            <form onSubmit={handleLockWeights} className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
              <p className="text-[11px] text-slate-600">
                Rule: Criteria percentages must be defined and locked BEFORE candidate examination begins.
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Written Exam Weight (%)</label>
                <input
                  type="number"
                  min="10"
                  max="80"
                  value={writtenWeight}
                  onChange={(e) => setWrittenWeight(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technical Assessment Weight (%)</label>
                <input
                  type="number"
                  min="10"
                  max="80"
                  value={techWeight}
                  onChange={(e) => setTechWeight(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interview Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={interviewWeight}
                  onChange={(e) => setInterviewWeight(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>

              <div className="flex justify-between font-bold text-xs pt-1 border-t border-slate-200">
                <span>Total Formula Weight:</span>
                <span className={writtenWeight + techWeight + interviewWeight === 100 ? 'text-emerald-700 font-mono' : 'text-red-600 font-mono'}>
                  {writtenWeight + techWeight + interviewWeight}% / 100%
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg text-xs shadow transition flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Score Formula Pre-Exam</span>
              </button>

              {lockMsg && (
                <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded text-[11px] font-semibold">
                  {lockMsg}
                </div>
              )}
            </form>
          )}
        </div>

        {/* Right: Candidate Screening & Ranking Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Automated Candidate Eligibility & Exam Performance
              </h3>
              <p className="text-xs text-slate-500">
                Showing candidates for <strong className="text-emerald-800">{selectedVacancy?.title}</strong>
              </p>
            </div>

            <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded border border-slate-200 text-slate-700 font-semibold">
              Total Applicants: {filteredApps.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold uppercase text-[11px] border-b border-slate-200">
                  <th className="p-2.5">Candidate Token</th>
                  <th className="p-2.5">Full Name (Admin View)</th>
                  <th className="p-2.5">Degree & GPA</th>
                  <th className="p-2.5">Eligibility Reason</th>
                  <th className="p-2.5">Exam Score</th>
                  <th className="p-2.5">Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="p-2.5 font-mono font-bold text-emerald-700">{app.candidateId}</td>
                    <td className="p-2.5 font-medium text-slate-900">{app.candidateFullName}</td>
                    <td className="p-2.5">{app.degreeField} ({app.gpa})</td>
                    <td className="p-2.5 max-w-xs text-[11px] text-slate-600 line-clamp-2">{app.eligibilityReason}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">
                      {app.writtenScore !== undefined ? `${app.writtenScore}/100` : '—'}
                    </td>
                    <td className="p-2.5 font-mono font-bold">
                      {app.rank ? `#${app.rank}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
