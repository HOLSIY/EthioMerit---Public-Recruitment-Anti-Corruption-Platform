import React, { useState } from 'react';
import { Vacancy, CandidateApplication } from '../types';
import { User, CheckCircle2, AlertTriangle, Play, FileText, Lock, Shield, Send, Hash, ArrowRight } from 'lucide-react';

interface CandidatePortalProps {
  vacancies: Vacancy[];
  applications: CandidateApplication[];
  onRegisterCandidate: (data: any) => Promise<any>;
  onStartExam: (application: CandidateApplication) => void;
  selectedVacancyForReg?: Vacancy | null;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({
  vacancies,
  applications,
  onRegisterCandidate,
  onStartExam,
  selectedVacancyForReg
}) => {
  const [activeTab, setActiveTab] = useState<'REGISTER' | 'MY_APPLICATIONS'>('REGISTER');
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(selectedVacancyForReg ? selectedVacancyForReg.id : vacancies[0]?.id || '');

  // Form State
  const [fullName, setFullName] = useState<string>('Kaleb Worku Desta');
  const [email, setEmail] = useState<string>('kaleb.worku@aau.edu.et');
  const [phone, setPhone] = useState<string>('+251 91 123 4567');
  const [degreeField, setDegreeField] = useState<string>('Software Engineering');
  const [university, setUniversity] = useState<string>('Addis Ababa University');
  const [gpa, setGpa] = useState<number>(3.85);
  const [yearsExperience, setYearsExperience] = useState<number>(3);

  const [loading, setLoading] = useState<boolean>(false);
  const [registrationMessage, setRegistrationMessage] = useState<{ type: 'SUCCESS' | 'ERROR'; text: string; details?: any } | null>(null);

  const selectedVacancy = vacancies.find(v => v.id === selectedVacancyId);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationMessage(null);

    try {
      const res = await onRegisterCandidate({
        vacancyId: selectedVacancyId,
        fullName,
        email,
        phone,
        degreeField,
        university,
        gpa,
        yearsExperience
      });

      if (res.error) {
        setRegistrationMessage({
          type: 'ERROR',
          text: res.message || res.error
        });
      } else {
        setRegistrationMessage({
          type: 'SUCCESS',
          text: `Registration successful! Assigned Anonymous Candidate ID: ${res.application.candidateId}`,
          details: res.application
        });
        setActiveTab('MY_APPLICATIONS');
      }
    } catch (err: any) {
      setRegistrationMessage({
        type: 'ERROR',
        text: err.message || 'An unexpected error occurred during registration.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-slate-900">Candidate Gateway</h2>
            <p className="text-xs text-slate-500">Register for public vacancies, track applications, and take merit exams</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('REGISTER')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === 'REGISTER' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Application
          </button>
          <button
            onClick={() => setActiveTab('MY_APPLICATIONS')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === 'MY_APPLICATIONS' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Registrations ({applications.length})
          </button>
        </div>
      </div>

      {activeTab === 'REGISTER' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vacancy Requirement Summary Card */}
          <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" /> Selected Vacancy & Rules
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Vacancy:</label>
              <select
                value={selectedVacancyId}
                onChange={(e) => setSelectedVacancyId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-600"
              >
                {vacancies.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.title} ({v.institution})
                  </option>
                ))}
              </select>
            </div>

            {selectedVacancy && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Institution:</span>
                  <span className="font-bold text-slate-800">{selectedVacancy.institution}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Degree Field Required:</span>
                  <span className="font-bold text-slate-800">{selectedVacancy.requirements.degreeField}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Minimum GPA:</span>
                  <span className="font-bold text-slate-800">{selectedVacancy.requirements.minGpa} / 4.00</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Experience Required:</span>
                  <span className="font-bold text-slate-800">{selectedVacancy.requirements.minYearsExperience} Years</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Exam Quota Seat Status:</span>
                  <span className="font-bold font-mono text-emerald-700">
                    {selectedVacancy.registeredCount} / {selectedVacancy.maxExamCapacity}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <Shield className="w-3.5 h-3.5 text-blue-600" /> Anonymous Identity Protection
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                During examination and evaluation, your name will be masked. Evaluators only see your anonymous candidate token (e.g. <code>ETH-2026-004821</code>) to eliminate subjective bias or favoritism.
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              Candidate Qualification Registration Form
            </h3>

            {registrationMessage && (
              <div className={`p-4 rounded-xl text-xs font-medium border flex items-start gap-3 ${
                registrationMessage.type === 'SUCCESS' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800'
              }`}>
                {registrationMessage.type === 'SUCCESS' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{registrationMessage.text}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abebe Kebede Desta"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. abebe@aau.edu.et"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number (+251) *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Degree Field / Major *</label>
                  <input
                    type="text"
                    required
                    value={degreeField}
                    onChange={(e) => setDegreeField(e.target.value)}
                    placeholder="e.g. Computer Science / Software Engineering"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">University / Institute *</label>
                  <input
                    type="text"
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. Addis Ababa University"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cumulative GPA (Out of 4.00) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="2.0"
                    max="4.0"
                    required
                    value={gpa}
                    onChange={(e) => setGpa(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Years of Relevant Experience *</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    required
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || (selectedVacancy && selectedVacancy.registeredCount >= selectedVacancy.maxExamCapacity)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg text-sm shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying Capacity & Locking Registration...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Candidate Application & Reserve Exam Seat</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* My Applications List */
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Hash className="w-5 h-5 text-emerald-700" /> My Verified Registrations
          </h3>

          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition space-y-3 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
                      Candidate Token: {app.candidateId}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1 font-serif">{app.vacancyTitle}</h4>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                    app.status === 'EXAM_COMPLETED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    app.status === 'ELIGIBLE' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-red-100 text-red-800'
                  }`}>
                    {app.status === 'EXAM_COMPLETED' ? '✅ Exam Completed' : app.status === 'ELIGIBLE' ? '🟢 Eligible - Exam Ready' : '🔴 Ineligible'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-500">Automated Screening Result:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{app.eligibilityReason}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Degree & GPA:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{app.degreeField} (GPA: {app.gpa})</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Cryptographic Receipt Hash:</span>
                    <p className="font-mono text-[10px] text-slate-600 truncate mt-0.5">{app.receiptHash}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs">
                    {app.writtenScore !== undefined ? (
                      <span className="font-bold text-emerald-800 text-sm">
                        Written Exam Score: {app.writtenScore} / 100
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">Exam pending completion</span>
                    )}
                  </div>

                  {app.status === 'ELIGIBLE' && (
                    <button
                      onClick={() => onStartExam(app)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow transition"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Launch Secure Exam Simulator</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
