import React from 'react';
import { Vacancy, CandidateApplication } from '../types';
import { ShieldCheck, Users, Lock, Award, Eye, Search, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  vacancies: Vacancy[];
  applications: CandidateApplication[];
  onSelectVacancyForRegistration: (vacancy: Vacancy) => void;
  tamperChainOk: boolean;
}

export const PublicTransparencyDashboard: React.FC<Props> = ({
  vacancies,
  applications,
  onSelectVacancyForRegistration,
  tamperChainOk
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('ALL');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const filteredVacancies = vacancies.filter(v => {
    const matchesCat = selectedCategory === 'ALL' || v.category === selectedCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.institution.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Banner / Value Proposition */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/60 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-600/50 text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Federal Anti-Corruption Public Merit Gateway</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-serif tracking-tight text-white">
              Fair, Transparent & Corruption-Free Public Recruitment
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every Ethiopian university graduate and professional competes purely on merit. Examination capacity limits are strictly enforced by atomic transaction locks, score weights are locked prior to exams, and candidate identities are masked during grading.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-4 rounded-xl flex flex-col items-center justify-center min-w-[200px] text-center shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
              <FileCheck className="w-4 h-4" />
              <span>Audit Chain Status</span>
            </div>
            {tamperChainOk ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>VERIFIED INTACT</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-red-400 font-bold text-lg">
                <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                <span>TAMPER WARNING</span>
              </div>
            )}
            <span className="text-[11px] text-slate-400 mt-1 font-mono">SHA-256 Hash Chained</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search vacancy or institution (e.g. MInT, MOR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['ALL', 'Information Technology', 'Finance & Audit', 'Healthcare & Research'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vacancies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVacancies.map(vacancy => {
          const isCapacityFull = vacancy.registeredCount >= vacancy.maxExamCapacity;
          const pctFull = Math.round((vacancy.registeredCount / vacancy.maxExamCapacity) * 100);

          return (
            <div
              key={vacancy.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 font-mono">
                    {vacancy.id}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    vacancy.status === 'REGISTRATION_OPEN'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {vacancy.status === 'REGISTRATION_OPEN' ? '🟢 Registration Open' : '🔴 Registration Closed'}
                  </span>
                </div>

                {/* Title & Institution */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif line-clamp-1">{vacancy.title}</h3>
                  <p className="text-xs font-medium text-emerald-800 mt-0.5">{vacancy.institution}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{vacancy.description}</p>

                {/* Requirements Summary */}
                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1.5 border border-slate-200/80">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Degree Field:</span>
                    <span className="font-semibold text-slate-800">{vacancy.requirements.degreeField}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Min. GPA:</span>
                    <span className="font-semibold text-slate-800">{vacancy.requirements.minGpa} / 4.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Positions Available:</span>
                    <span className="font-bold text-emerald-700">{vacancy.availablePositions} Posts</span>
                  </div>
                </div>

                {/* Locked Weight Distribution */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-600" /> Locked Weighting Criteria:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
                    <div className="bg-emerald-50 border border-emerald-200 p-1 rounded text-emerald-800">
                      Written: <strong>{vacancy.scoreWeights.writtenExamPercent}%</strong>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-1 rounded text-blue-800">
                      Tech: <strong>{vacancy.scoreWeights.technicalAssessmentPercent}%</strong>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 p-1 rounded text-purple-800">
                      Interview: <strong>{vacancy.scoreWeights.interviewPercent}%</strong>
                    </div>
                  </div>
                </div>

                {/* Registration Capacity Counter */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" /> Exam Seats Registered:
                    </span>
                    <span className={isCapacityFull ? 'text-red-600 font-bold' : 'text-slate-900 font-bold font-mono'}>
                      {vacancy.registeredCount.toLocaleString()} / {vacancy.maxExamCapacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCapacityFull ? 'bg-red-600' : pctFull > 80 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(pctFull, 100)}%` }}
                    ></div>
                  </div>
                  {isCapacityFull && (
                    <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Registration capacity reached. No additional candidate insertions permitted.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Digital Sign: <code className="text-slate-700 font-mono text-[10px]">{vacancy.digitalSignature?.slice(0, 14)}...</code>
                </span>

                <button
                  onClick={() => onSelectVacancyForRegistration(vacancy)}
                  disabled={isCapacityFull}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    isCapacityFull
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow'
                  }`}
                >
                  {isCapacityFull ? 'Capacity Closed' : 'Apply for Exam'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Merit Selection Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Published Transparent Recruitment Results
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Final candidate rankings are automatically derived from pre-locked weighted formulas. Personal identities are masked during evaluation to prevent favoritism.
            </p>
          </div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold px-3 py-1 rounded-full">
            Reproducible Algorithmic Ranking
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3 rounded-l-lg">Rank</th>
                <th className="p-3">Candidate Anonymous ID</th>
                <th className="p-3">Vacancy</th>
                <th className="p-3">Written (50%)</th>
                <th className="p-3">Tech (30%)</th>
                <th className="p-3">Interview (20%)</th>
                <th className="p-3">Final Score</th>
                <th className="p-3 rounded-r-lg">Status Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold font-mono text-slate-900">
                    {app.rank ? `#${app.rank}` : 'N/A'}
                  </td>
                  <td className="p-3 font-mono font-semibold text-emerald-700 bg-emerald-50/50 rounded">
                    {app.candidateId}
                  </td>
                  <td className="p-3 font-medium">{app.vacancyTitle}</td>
                  <td className="p-3 font-mono">{app.writtenScore ? `${app.writtenScore}/100` : '—'}</td>
                  <td className="p-3 font-mono">{app.technicalScore ? `${app.technicalScore}/100` : '—'}</td>
                  <td className="p-3 font-mono">{app.interviewScore ? `${app.interviewScore}/100` : '—'}</td>
                  <td className="p-3 font-bold text-slate-900 font-mono text-sm">
                    {app.weightedScore ? `${app.weightedScore}%` : app.writtenScore ? `${app.writtenScore}%` : '—'}
                  </td>
                  <td className="p-3">
                    {app.status === 'SELECTED' && (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> SELECTED
                      </span>
                    )}
                    {app.status === 'EXAM_COMPLETED' && app.rank && app.rank > 2 && (
                      <span className="bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-2.5 py-1 rounded-full">
                        Merit Waitlist (#${app.rank})
                      </span>
                    )}
                    {app.status === 'INELIGIBLE' && (
                      <span className="bg-red-100 text-red-800 border border-red-200 font-semibold px-2.5 py-1 rounded-full">
                        Ineligible
                      </span>
                    )}
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
