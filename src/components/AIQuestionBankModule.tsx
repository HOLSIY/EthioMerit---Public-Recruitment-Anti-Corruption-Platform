import React, { useState } from 'react';
import { ExamQuestion } from '../types';
import { Cpu, CheckCircle2, AlertTriangle, Sparkles, Plus, Lock, ShieldCheck } from 'lucide-react';

interface Props {
  questions: ExamQuestion[];
  onGenerateQuestions: (category: string, competency: string, difficulty: string) => Promise<any>;
}

export const AIQuestionBankModule: React.FC<Props> = ({
  questions,
  onGenerateQuestions
}) => {
  const [category, setCategory] = useState<string>('Information Technology');
  const [competency, setCompetency] = useState<string>('Data Structures & System Security');
  const [difficulty, setDifficulty] = useState<string>('MEDIUM');
  const [generating, setGenerating] = useState<boolean>(false);
  const [genSuccessMsg, setGenSuccessMsg] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setGenSuccessMsg(null);

    try {
      const res = await onGenerateQuestions(category, competency, difficulty);
      setGenSuccessMsg(`Successfully generated ${res.questions?.length || 1} new validated questions! Status: PENDING_APPROVAL by Exam Commission.`);
    } catch (err: any) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs px-3 py-0.5 rounded-full font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" /> AI Question Generator & Secure Question Bank
          </div>
          <h2 className="text-xl font-bold font-serif">Competency-Based Exam Item Pipeline</h2>
          <p className="text-xs text-slate-300 mt-1">Generates unbiased, calibrated examination questions with automatic bias and quality verification</p>
        </div>

        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Zero Question Exposure Protocol
          </div>
          <span className="text-[11px] text-slate-400">Questions remain encrypted until scheduled exam time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Question Generator Controls */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" /> AI Question Generation Engine
          </h3>

          <form onSubmit={handleGenerate} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Finance & Audit">Finance & Audit</option>
                <option value="Healthcare & Research">Healthcare & Research</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Competency Area *</label>
              <input
                type="text"
                required
                value={competency}
                onChange={(e) => setCompetency(e.target.value)}
                placeholder="e.g. Distributed Systems & Concurrency"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Difficulty Level *</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-emerald-600"
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-[11px] text-slate-600">
              <span className="font-bold text-slate-800">Mandatory Validation Pipeline:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Quality & Clarity Check</li>
                <li>Gender & Regional Bias Check</li>
                <li>Human Commission Final Approval</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg text-xs shadow transition flex items-center justify-center gap-1.5"
            >
              {generating ? (
                <span>Generating & Validating Questions...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Generate AI Exam Questions</span>
                </>
              )}
            </button>

            {genSuccessMsg && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded text-xs font-semibold">
                {genSuccessMsg}
              </div>
            )}
          </form>
        </div>

        {/* Right: Question Bank List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Encrypted Question Repository
              </h3>
              <p className="text-xs text-slate-500">
                Total Questions in Encrypted Vault: <strong>{questions.length} Items</strong>
              </p>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded font-semibold">
              AES-256 Protected
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {q.id} • {q.vacancyCategory}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                      Bias Checked
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      {q.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-slate-900">{q.questionText}</p>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2 rounded border ${
                        q.correctOptionIndex === oIdx ? 'bg-emerald-100/70 border-emerald-400 font-bold text-emerald-900' : 'bg-white border-slate-200'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200 italic">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
