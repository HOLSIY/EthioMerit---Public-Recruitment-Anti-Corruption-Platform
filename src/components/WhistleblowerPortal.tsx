import React, { useState } from 'react';
import { WhistleblowerReport } from '../types';
import { Scale, ShieldCheck, Send, CheckCircle2, Lock, Search, FileText } from 'lucide-react';

interface Props {
  reports: WhistleblowerReport[];
  onSubmitReport: (data: any) => Promise<any>;
}

export const WhistleblowerPortal: React.FC<Props> = ({ reports, onSubmitReport }) => {
  const [allegationType, setAllegationType] = useState<string>('EXTORTION_SOLICITATION');
  const [vacancyTitle, setVacancyTitle] = useState<string>('Senior Software Systems Engineer');
  const [accusedPerson, setAccusedPerson] = useState<string>('Unidentified Telegram contact requesting 100,000 Birr');
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [reportResult, setReportResult] = useState<any>(null);

  const [checkTrackingCode, setCheckTrackingCode] = useState<string>('');
  const [searchReport, setSearchReport] = useState<WhistleblowerReport | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      alert('Please provide details of the corruption attempt.');
      return;
    }

    setLoading(true);
    try {
      const res = await onSubmitReport({
        allegationType,
        vacancyTitle,
        accusedPerson,
        details
      });
      setReportResult(res);
      setDetails('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = () => {
    const found = reports.find(r => r.trackingCode.trim().toUpperCase() === checkTrackingCode.trim().toUpperCase());
    setSearchReport(found || null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-900/80 border border-red-600/50 text-red-300 text-xs px-3 py-0.5 rounded-full font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" /> Anonymous Whistleblower Protection Gateway
          </div>
          <h2 className="text-xl font-bold font-serif">Report Extortion or Recruitment Manipulation</h2>
          <p className="text-xs text-slate-300 mt-1">Protected under the Ethiopian Whistleblower Protection Framework. Zero identity tracking.</p>
        </div>

        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Anonymous Case Tracking Code Issued
          </div>
          <span className="text-[11px] text-slate-400">No account required. Check case progress privately.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Complaint Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-700" /> Secure Anonymous Reporting Form
          </h3>

          {reportResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 text-xs text-emerald-950">
              <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Report Submitted Safely</span>
              </div>
              <p>Your unique anonymous case tracking code is:</p>
              <div className="p-3 bg-white border border-emerald-300 rounded font-mono font-bold text-base text-emerald-800 text-center">
                {reportResult.trackingCode}
              </div>
              <p className="text-[11px] text-slate-600">
                Save this code! You can use it below at any time to check investigation status without logging in.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Allegation Category *</label>
                <select
                  value={allegationType}
                  onChange={(e) => setAllegationType(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-red-600"
                >
                  <option value="EXTORTION_SOLICITATION">Illegal Payment Demand (e.g. 100,000 ETB requested)</option>
                  <option value="FAVORITISM">Favoritism / Connection Abuse</option>
                  <option value="DOCUMENT_FORGERY">Document Forgery / Fake Credentials</option>
                  <option value="EXAM_LEAK">Examination Leak Attempt</option>
                  <option value="SYSTEM_TAMPERING">Attempted Administrative System Alteration</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Related Vacancy Title *</label>
                <input
                  type="text"
                  required
                  value={vacancyTitle}
                  onChange={(e) => setVacancyTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Accused Person / Agency (if known)</label>
              <input
                type="text"
                value={accusedPerson}
                onChange={(e) => setAccusedPerson(e.target.value)}
                placeholder="Name, Telegram handle, or phone number of individual requesting payment"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Description of Incident *</label>
              <textarea
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide details such as message text, payment demands, screenshots, or location..."
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg text-sm shadow transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Encrypted Whistleblower Report</span>
            </button>
          </form>
        </div>

        {/* Anonymous Case Status Checker */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-700" /> Anonymous Case Status Lookup
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Enter Tracking Code:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ETH-SAFE-882190"
                  value={checkTrackingCode}
                  onChange={(e) => setCheckTrackingCode(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-mono uppercase"
                />
                <button
                  onClick={handleLookup}
                  className="bg-emerald-700 text-white font-bold px-3 py-2 rounded text-xs"
                >
                  Check
                </button>
              </div>
            </div>

            {searchReport ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-slate-800">{searchReport.trackingCode}</span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {searchReport.status}
                  </span>
                </div>
                <p className="text-slate-700"><strong>Vacancy:</strong> {searchReport.vacancyTitle}</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  <strong>Investigator Notes:</strong> {searchReport.investigatorNotes || 'Report under review by Anti-Corruption Investigation Panel.'}
                </p>
              </div>
            ) : checkTrackingCode && (
              <p className="text-[11px] text-slate-500 italic">No report found matching that tracking code.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
