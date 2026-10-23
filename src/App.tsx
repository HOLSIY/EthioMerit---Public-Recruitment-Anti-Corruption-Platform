import React, { useState, useEffect } from 'react';
import { UserRole, Vacancy, CandidateApplication, ExamQuestion, AuditLogEntry, FraudAlert, WhistleblowerReport, AppealCase } from './types';
import { Navbar } from './components/Navbar';
import { PublicTransparencyDashboard } from './components/PublicTransparencyDashboard';
import { CandidatePortal } from './components/CandidatePortal';
import { ExamEngine } from './components/ExamEngine';
import { RecruitmentOfficerDashboard } from './components/RecruitmentOfficerDashboard';
import { AIQuestionBankModule } from './components/AIQuestionBankModule';
import { AntiCorruptionAuditDashboard } from './components/AntiCorruptionAuditDashboard';
import { ConcurrencySimulator } from './components/ConcurrencySimulator';
import { WhistleblowerPortal } from './components/WhistleblowerPortal';
import { ArchitectureDocView } from './components/ArchitectureDocView';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>('PUBLIC');
  const [activeTab, setActiveTab] = useState<string>('transparency');

  // Application State
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [whistleblowerReports, setWhistleblowerReports] = useState<WhistleblowerReport[]>([]);
  const [appeals, setAppeals] = useState<AppealCase[]>([]);

  const [activeExamApplication, setActiveExamApplication] = useState<CandidateApplication | null>(null);
  const [selectedVacancyForReg, setSelectedVacancyForReg] = useState<Vacancy | null>(null);
  const [tamperChainOk, setTamperChainOk] = useState<boolean>(true);

  // Fetch initial data from Express backend
  const fetchData = async () => {
    try {
      const [vRes, aRes, qRes, logRes, fRes, wRes, appRes] = await Promise.all([
        fetch('/api/vacancies').then(r => r.json()),
        fetch('/api/applications').then(r => r.json()),
        fetch('/api/questions').then(r => r.json()),
        fetch('/api/audit/logs').then(r => r.json()),
        fetch('/api/fraud-alerts').then(r => r.json()),
        fetch('/api/whistleblower').then(r => r.json()),
        fetch('/api/appeals').then(r => r.json())
      ]);

      setVacancies(vRes || []);
      setApplications(aRes || []);
      setExamQuestions(qRes || []);
      setAuditLogs(logRes || []);
      setFraudAlerts(fRes || []);
      setWhistleblowerReports(wRes || []);
      setAppeals(appRes || []);
    } catch (err) {
      console.error('Error fetching data from server:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleRegisterCandidate = async (candidateData: any) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateData)
    });
    const data = await res.json();
    if (res.ok) {
      await fetchData();
    }
    return data;
  };

  const handleStartExam = (application: CandidateApplication) => {
    setActiveExamApplication(application);
    setActiveTab('exam-runner');
  };

  const handleSubmitExam = async (applicationId: string, answers: Record<string, number>, timeSpentSeconds: number) => {
    const res = await fetch('/api/exam/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, answers, timeSpentSeconds })
    });
    const data = await res.json();
    await fetchData();
    return data;
  };

  const handleGenerateQuestions = async (category: string, competency: string, difficulty: string) => {
    const res = await fetch('/api/ai/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, competency, difficulty, count: 3 })
    });
    const data = await res.json();
    await fetchData();
    return data;
  };

  const handleLockWeights = (vacancyId: string, weights: any) => {
    setVacancies(prev => prev.map(v => v.id === vacancyId ? { ...v, scoreWeights: { ...v.scoreWeights, ...weights } } : v));
  };

  const handleVerifyIntegrity = async () => {
    const res = await fetch('/api/audit/verify').then(r => r.json());
    setTamperChainOk(res.isChainIntact);
    return res;
  };

  const handleRunSimulator = async (attemptedCount: number, capacityLimit: number) => {
    const res = await fetch('/api/simulator/concurrency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptedCount, capacityLimit })
    }).then(r => r.json());
    return res;
  };

  const handleSubmitWhistleblowerReport = async (reportData: any) => {
    const res = await fetch('/api/whistleblower', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    const data = await res.json();
    await fetchData();
    return data;
  };

  const handleSelectVacancyForReg = (vacancy: Vacancy) => {
    setSelectedVacancyForReg(vacancy);
    setActiveTab('candidate');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
      <Navbar
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tamperChainOk={tamperChainOk}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'transparency' && (
          <PublicTransparencyDashboard
            vacancies={vacancies}
            applications={applications}
            onSelectVacancyForRegistration={handleSelectVacancyForReg}
            tamperChainOk={tamperChainOk}
          />
        )}

        {activeTab === 'candidate' && (
          <CandidatePortal
            vacancies={vacancies}
            applications={applications}
            onRegisterCandidate={handleRegisterCandidate}
            onStartExam={handleStartExam}
            selectedVacancyForReg={selectedVacancyForReg}
          />
        )}

        {activeTab === 'exam-runner' && activeExamApplication && (
          <ExamEngine
            application={activeExamApplication}
            questions={examQuestions.filter(q => q.vacancyCategory === vacancies.find(v => v.id === activeExamApplication.vacancyId)?.category || 'Information Technology')}
            onSubmitExam={handleSubmitExam}
            onBackToPortal={() => {
              setActiveExamApplication(null);
              setActiveTab('candidate');
            }}
          />
        )}

        {activeTab === 'recruitment' && (
          <RecruitmentOfficerDashboard
            vacancies={vacancies}
            applications={applications}
            onLockWeights={handleLockWeights}
          />
        )}

        {activeTab === 'ai-questions' && (
          <AIQuestionBankModule
            questions={examQuestions}
            onGenerateQuestions={handleGenerateQuestions}
          />
        )}

        {activeTab === 'audit' && (
          <AntiCorruptionAuditDashboard
            auditLogs={auditLogs}
            fraudAlerts={fraudAlerts}
            whistleblowerReports={whistleblowerReports}
            tamperChainOk={tamperChainOk}
            onVerifyIntegrity={handleVerifyIntegrity}
          />
        )}

        {activeTab === 'concurrency' && (
          <ConcurrencySimulator
            onRunSimulator={handleRunSimulator}
          />
        )}

        {activeTab === 'whistleblower' && (
          <WhistleblowerPortal
            reports={whistleblowerReports}
            onSubmitReport={handleSubmitWhistleblowerReport}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureDocView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-4 text-center text-xs space-y-2 mt-auto">
        <div className="flex items-center justify-center space-x-2">
          <span className="font-serif text-slate-200 font-bold">EthioMerit Platform</span>
          <span>•</span>
          <span>Federal Democratic Republic of Ethiopia</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Proclamation No. 1064/2017 & No. 1205/2020 Compliant • Zero Secret Administrative Modification • SHA-256 Ledger Audited
        </p>
      </footer>
    </div>
  );
}
