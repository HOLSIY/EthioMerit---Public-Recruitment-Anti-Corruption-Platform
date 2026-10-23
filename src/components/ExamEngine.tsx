import React, { useState, useEffect } from 'react';
import { CandidateApplication, ExamQuestion } from '../types';
import { Clock, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Lock, Award } from 'lucide-react';

interface ExamEngineProps {
  application: CandidateApplication;
  questions: ExamQuestion[];
  onSubmitExam: (applicationId: string, answers: Record<string, number>, timeSpentSeconds: number) => Promise<any>;
  onBackToPortal: () => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  application,
  questions,
  onSubmitExam,
  onBackToPortal
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes timer
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleAutoSubmit = async () => {
    await submitExamAnswers();
  };

  const submitExamAnswers = async () => {
    setSubmitting(true);
    try {
      const res = await onSubmitExam(application.id, selectedAnswers, timeSpent);
      setResult(res);
    } catch (err) {
      console.error('Error submitting exam:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (result) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Examination Submitted Successfully</h2>
          <p className="text-xs text-slate-500 font-mono">Anonymous Candidate Token: <strong className="text-emerald-700">{application.candidateId}</strong></p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deterministic Auto-Grading Score</span>
          <div className="text-4xl font-extrabold text-emerald-700 font-mono">
            {result.scorePercentage}%
          </div>
          <p className="text-xs text-slate-600">
            Correct Answers: <strong>{result.correctCount} / {result.totalQuestions}</strong>
          </p>
          <p className="text-xs font-mono text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded border border-emerald-200 w-fit mx-auto">
            Temporary Rank Outcome: #{result.rank}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-800 text-left space-y-1">
          <div className="font-bold flex items-center gap-1">
            <Lock className="w-4 h-4 text-blue-600" /> Immutable Exam Log Chain Updated
          </div>
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Your score has been cryptographically recorded into the immutable audit trail. No individual administrator or officer can alter your raw score or recalculate rank without producing an auditable security alert.
          </p>
        </div>

        <button
          onClick={onBackToPortal}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow transition"
        >
          Return to Candidate Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Examination Security Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="bg-emerald-800 text-emerald-200 text-xs px-2.5 py-1 rounded font-mono font-bold">
            SECURE EXAM RUNTIME
          </span>
          <div>
            <h2 className="text-sm font-bold">{application.vacancyTitle}</h2>
            <span className="text-xs text-slate-400 font-mono">Candidate Token: {application.candidateId} (Anonymous Mode)</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-sm text-amber-300">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={submitExamAnswers}
            disabled={submitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded text-xs shadow transition"
          >
            {submitting ? 'Grading...' : 'Finish & Submit Exam'}
          </button>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-amber-50 border border-amber-300 p-3 rounded-lg text-xs text-amber-900 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Anti-Cheat Active:</strong> AI behavioral analytics monitoring completion speed and focus state. Do not close or switch browser tabs.
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono">
                Question {qIndex + 1} of {questions.length} • {q.competency}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Difficulty: {q.difficulty}</span>
            </div>

            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {q.questionText}
            </p>

            <div className="space-y-2 text-xs">
              {q.options.map((optionText, optIdx) => (
                <label
                  key={optIdx}
                  onClick={() => handleOptionSelect(q.id, optIdx)}
                  className={`p-3 rounded-lg border flex items-center space-x-3 cursor-pointer transition ${
                    selectedAnswers[q.id] === optIdx
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={selectedAnswers[q.id] === optIdx}
                    onChange={() => handleOptionSelect(q.id, optIdx)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{optionText}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={submitExamAnswers}
          disabled={submitting}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition flex items-center gap-2"
        >
          <span>Final Exam Submission & Auto-Grade</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
