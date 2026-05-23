import React from "react";
import { Candidate, CandidateEvaluation, HumanDecision } from "../types";
import { ClipboardCheck, Copy, Download, AlertCircle, FileSpreadsheet, UserCheck, Sparkles } from "lucide-react";

interface SubmissionCabinetProps {
  candidates: Candidate[];
  evaluations: Record<string, CandidateEvaluation>;
  decisions: Record<string, HumanDecision>;
}

export default function SubmissionCabinet({
  candidates,
  evaluations,
  decisions,
}: SubmissionCabinetProps) {

  // Candidates whose human-in-the-loop decision status is set to "approved"
  const approvedCandidates = candidates.filter((cand) => {
    const dec = decisions[cand.id];
    return dec && dec.status === "approved";
  });

  const getCopyableText = () => {
    let text = `==================================================\n`;
    text += `OCBRIDGE / HIRING COPILOT - SUBMISSION DOSSIER\n`;
    text += `==================================================\n\n`;

    if (approvedCandidates.length === 0) {
      return "No candidates have been approved for submission yet. Set status to 'Approved' inside the Deep Assessment workspace to build dossier.";
    }

    approvedCandidates.forEach((cand, idx) => {
      const evalData = evaluations[cand.id];
      const dec = decisions[cand.id];

      text += `Candidate #${idx + 1}: ${cand.name}\n`;
      text += `Education: ${cand.education}\n`;
      text += `AI Fit Score: ${evalData.score}%\n`;
      text += `Submission Class: ${dec.overrideRecommendation}\n`;
      text += `--------------------------------------------------\n`;
      text += `CLIENT-READY CANDIDATE SYNOPSIS:\n`;
      text += `${dec.editedSummary}\n\n`;

      if (dec.editedQuestions.length > 0) {
        text += `KEY SCREENING VETTING LOGS:\n`;
        dec.editedQuestions.forEach((q, qIdx) => {
          const completed = dec.validatedQuestionsCompleted[qIdx] ? "[VETTED]" : "[PENDING SCREEN]";
          text += `${qIdx + 1}. ${completed} Q: ${q}\n`;
        });
        text += `\n`;
      }

      if (dec.recruiterNotes) {
        text += `INTERNAL SCREENER NOTES:\n`;
        text += `${dec.recruiterNotes}\n`;
      }

      text += `==================================================\n\n`;
    });

    return text;
  };

  const handleCopyToClipboard = () => {
    const text = getCopyableText();
    navigator.clipboard.writeText(text);
    alert("Dossier copied to clipboard! You are ready to submit to your clients or Account Manager.");
  };

  const handleDownloadJson = () => {
    const approvedData = approvedCandidates.map((cand) => {
      const evalData = evaluations[cand.id];
      const dec = decisions[cand.id];
      return {
        candidateName: cand.name,
        education: cand.education,
        contact: { email: cand.email, phone: cand.phone },
        evaluationScore: evalData.score,
        targetRecommendation: dec.overrideRecommendation,
        clientSummary: dec.editedSummary,
        screeningQuestions: dec.editedQuestions.map((q, i) => ({
          question: q,
          status: dec.validatedQuestionsCompleted[i] ? "vetted" : "pending"
        })),
        recruiterNotes: dec.recruiterNotes
      };
    });

    const fileData = JSON.stringify(approvedData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "OCBridge_Submitted_Candidates_Report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden font-sans" id="submission-cabinet-panel">
      
      {/* Tab Header Action Bar */}
      <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-display font-medium text-slate-900 tracking-tight flex items-center gap-1.5">
            <ClipboardCheck className="w-5.5 h-5.5 text-blue-600" />
            Approved Submission Dossier
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Curated queue containing candidates ready to be dispatched to Account Managers or Client HR.
          </p>
        </div>

        {approvedCandidates.length > 0 && (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyToClipboard}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white select-all border border-blue-700 cursor-pointer shadow-xs transition-all"
            >
              <Copy className="w-4 h-4" /> Copy Client Dossier
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 cursor-pointer shadow-xs transition-all"
            >
              <Download className="w-4 h-4" /> Export Report (JSON)
            </button>
          </div>
        )}
      </div>

      {approvedCandidates.length === 0 ? (
        <div className="p-12 text-center text-slate-400 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-6 h-6 text-slate-300" />
          </div>
          <h3 className="text-slate-800 font-semibold font-display text-sm">No Approved Candidates Yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed mt-1 font-sans">
            To build a client dossier, navigate through the pipeline table, execute checks on candidates, and toggle their recruitment decision status button to <strong className="text-slate-500">"Approve"</strong>.
          </p>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {approvedCandidates.map((cand) => {
              const evalData = evaluations[cand.id];
              const dec = decisions[cand.id];

              return (
                <div key={cand.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200/65 flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-slate-900 font-sans flex items-center gap-1.5">
                        {cand.name}
                        {evalData.score >= 95 && (
                          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">{cand.education.split(",")[0]}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono tracking-wider">
                        {dec.overrideRecommendation}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{evalData.score}% Match</span>
                    </div>
                  </div>

                  {/* Summary copy-block */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 uppercase">Candidate Synopsis</span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                      {dec.editedSummary}
                    </p>
                  </div>

                  {/* Question vet logs */}
                  {dec.editedQuestions.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 uppercase">Key Vetting Status</span>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {dec.editedQuestions.map((q, qIndex) => {
                          const isVetted = !!dec.validatedQuestionsCompleted[qIndex];
                          return (
                            <div key={qIndex} className="flex items-start gap-1.5">
                              <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                isVetted ? "bg-emerald-500" : "bg-amber-400"
                              }`} />
                              <p className={`text-[11px] leading-snug ${isVetted ? "text-slate-600" : "text-slate-400 italic"}`} title={q}>
                                {isVetted ? "Vetted" : "Pending Screen"} - &ldquo;{q.substring(0, 50)}...&rdquo;
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Internal Recruite Note references */}
                  {dec.recruiterNotes && (
                    <div className="pt-2 border-t border-slate-200/50">
                      <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">Internal Screener Remarks</span>
                      <p className="text-[11px] text-slate-500 italic mt-1 leading-normal">&ldquo;{dec.recruiterNotes}&rdquo;</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>


        </div>
      )}

    </div>
  );
}
