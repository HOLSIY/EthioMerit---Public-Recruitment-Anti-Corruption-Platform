import React from 'react';
import { UserRole } from '../types';
import { Shield, ShieldAlert, Award, FileText, User, Users, Lock, Cpu, Eye, Scale, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  tamperChainOk: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onRoleChange,
  activeTab,
  onTabChange,
  tamperChainOk
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Banner: Federal Democratic Republic of Ethiopia Branding */}
      <div className="bg-gradient-to-r from-emerald-800 via-yellow-700 to-red-800 text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-600 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">OFFICIAL</span>
          <span>Federal Democratic Republic of Ethiopia — Civil Service Recruitment Authority</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> Proclamation No. 1064/2017 Compliant</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-yellow-400" /> Cryptographic Audit Active</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('transparency')}>
          <div className="w-10 h-10 rounded-lg bg-emerald-700 text-yellow-300 flex items-center justify-center font-bold text-xl shadow-inner border border-emerald-500">
            🇪🇹
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-100 font-serif">EthioMerit</h1>
              <span className="bg-emerald-950 text-emerald-300 text-xs px-2 py-0.5 rounded-full border border-emerald-800 font-mono">v2.6 Zero-Corruption</span>
            </div>
            <p className="text-xs text-slate-400">Fair, Transparent & AI-Audited Public Recruitment</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 text-sm overflow-x-auto py-1">
          <button
            onClick={() => onTabChange('transparency')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'transparency' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Public Results</span>
          </button>

          <button
            onClick={() => onTabChange('candidate')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'candidate' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4 text-blue-400" />
            <span>Candidate Portal</span>
          </button>

          <button
            onClick={() => onTabChange('recruitment')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'recruitment' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Officer Portal</span>
          </button>

          <button
            onClick={() => onTabChange('ai-questions')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'ai-questions' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>AI Question Bank</span>
          </button>

          <button
            onClick={() => onTabChange('audit')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition relative ${
              activeTab === 'audit' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Anti-Corruption Audit</span>
            {!tamperChainOk && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => onTabChange('concurrency')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'concurrency' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span>100k Concurrency Test</span>
          </button>

          <button
            onClick={() => onTabChange('whistleblower')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'whistleblower' ? 'bg-red-900/60 text-red-200 border border-red-700/50' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-red-400" />
            <span>Report Corruption</span>
          </button>

          <button
            onClick={() => onTabChange('architecture')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition ${
              activeTab === 'architecture' ? 'bg-indigo-800 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-300" />
            <span>Full System Spec & Diagram</span>
          </button>
        </nav>

        {/* Role Switcher */}
        <div className="flex items-center space-x-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700 text-xs">
          <span className="text-slate-400 font-medium hidden md:inline">Role View:</span>
          <select
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-900 text-emerald-400 font-semibold px-2.5 py-1 rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="PUBLIC">👤 Public Observer</option>
            <option value="CANDIDATE">🎓 Candidate (Abebe Kebede)</option>
            <option value="RECRUITMENT_OFFICER">🏢 Recruitment Officer</option>
            <option value="EXAM_ADMIN">📝 Examination Admin</option>
            <option value="AUDITOR">⚖️ Anti-Corruption Auditor</option>
            <option value="COMPLIANCE_OFFICER">📜 Legal/Compliance Officer</option>
            <option value="WHISTLEBLOWER">🕵️ Whistleblower</option>
          </select>
        </div>
      </div>
    </header>
  );
};
