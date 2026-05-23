import React, { useState } from "react";
import { 
  initialJobDescription, 
  initialCandidates, 
  initialEvaluations, 
  initialHumanDecisions 
} from "./data";
import { JobDescription, Candidate, CandidateEvaluation, HumanDecision } from "./types";
import JDViewer from "./components/JDViewer";
import MatchingTable from "./components/MatchingTable";
import DeepDive from "./components/DeepDive";
import SubmissionCabinet from "./components/SubmissionCabinet";
import { 
  Users, Briefcase, ClipboardCheck, BookOpen, AlertCircle, 
  Sparkles, CheckCircle2, Info, Check, RefreshCw
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<"pipeline" | "jd" | "submissions">("pipeline");
  
  // App states
  const [jd, setJd] = useState<JobDescription>(initialJobDescription);
  const [candidates] = useState<Candidate[]>(initialCandidates);
  const [evaluations, setEvaluations] = useState<Record<string, CandidateEvaluation>>(() => {
    const initialMap: Record<string, CandidateEvaluation> = {};
    initialEvaluations.forEach((item) => {
      initialMap[item.candidateId] = item;
    });
    return initialMap;
  });
  const [decisions, setDecisions] = useState<Record<string, HumanDecision>>(initialHumanDecisions);
  
  // Selected candidate state (defaults to first candidate Alex Chen)
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>("cand_01");

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendationFilter, setRecommendationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Gemini loading states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [apiFeedback, setApiFeedback] = useState<string | null>(null);

  // Updates the targeted job-description
  const handleUpdateJD = (updatedJd: JobDescription) => {
    setJd(updatedJd);
    setApiFeedback("Target Job Description updated. To update alignments, run 'Re-Score AI' on candidates.");
    setTimeout(() => setApiFeedback(null), 5000);
  };

  // Human-in-the-Loop decision updates
  const handleUpdateDecision = (candidateId: string, updatedDecision: HumanDecision) => {
    setDecisions((prev) => ({
      ...prev,
      [candidateId]: updatedDecision,
    }));
  };

  // Makes real-time server evaluations using Gemini model API
  const handleRunLiveEvaluation = async (candidateId: string) => {
    const targetCandidate = candidates.find((c) => c.id === candidateId);
    if (!targetCandidate) return;

    setIsEvaluating(true);
    setApiFeedback(`Requesting Gemini model to assess ${targetCandidate.name}...`);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: targetCandidate.resumeText,
          name: targetCandidate.name,
          email: targetCandidate.email,
          phone: targetCandidate.phone,
          education: targetCandidate.education,
          skills: targetCandidate.skills,
          jobDescription: jd,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error code: ${response.status}`);
      }

      const freshEval = (await response.json()) as CandidateEvaluation;
      freshEval.candidateId = candidateId; // ensure id mapping

      // Update evaluation state
      setEvaluations((prev) => ({
        ...prev,
        [candidateId]: freshEval,
      }));

      // Update decisions block to sync summaries/vet questions and reset decision status to pending
      setDecisions((prev) => {
        const next = { ...prev };
        next[candidateId] = {
          candidateId,
          status: "pending",
          overrideRecommendation: freshEval.recommendation,
          editedSummary: freshEval.clientSummary,
          editedQuestions: freshEval.validationQuestions,
          recruiterNotes: prev[candidateId]?.recruiterNotes || "",
          validatedQuestionsCompleted: {},
        };
        return next;
      });

      setApiFeedback(`Gemini evaluation of ${targetCandidate.name} completed successfully.`);
      setTimeout(() => setApiFeedback(null), 4000);
    } catch (err: any) {
      console.error("AI Evaluation failed:", err);
      setApiFeedback(`Evaluation error: ${err.message || "Failed to contact Gemini API. Make sure PORT and KEY setups are valid."}`);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Computed metrics indicators
  const decisionsArray = Object.values(decisions) as HumanDecision[];
  const evaluationsArray = Object.values(evaluations) as CandidateEvaluation[];
  const totalApproved = decisionsArray.filter((d) => d.status === "approved").length;
  const totalInPipeline = candidates.length;
  const avgFitScore = Math.round(
    evaluationsArray.reduce((sum, item) => sum + item.score, 0) / (evaluationsArray.length || 1)
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans" id="recruiting-application">
      
      {/* Top Banner & Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm font-sans shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">OC</div>
              <span className="font-bold text-lg tracking-tight text-slate-850">
                OCBridge <span className="text-blue-600">/ Hiring Copilot</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 pb-0.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Active Workflow: Matching & Scoring
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-xs font-sans">
            {/* Fit Metrics board */}
            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-4">
              <div className="text-center font-sans">
                <span className="text-slate-400 block text-[9px] font-mono uppercase font-semibold">Total Pool</span>
                <span className="text-slate-800 text-sm font-bold font-mono">{totalInPipeline}</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="text-center">
                <span className="text-slate-400 block text-[9px] font-mono uppercase font-semibold">Approved</span>
                <span className="text-emerald-600 text-sm font-bold font-mono">{totalApproved}</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="text-center">
                <span className="text-slate-400 block text-[9px] font-mono uppercase font-semibold">Mean Match</span>
                <span className="text-blue-600 text-sm font-bold font-mono">{avgFitScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global tab manager */}
        <div className="border-t border-slate-200 bg-slate-50/50 py-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 font-sans text-xs font-semibold">
            <button
              onClick={() => setActiveSection("pipeline")}
              className={`py-2 px-3.5 rounded-t-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === "pipeline" ? "bg-white text-blue-600 border-x border-t border-slate-200 font-bold" : "text-slate-550 hover:text-slate-800"
              }`}
            >
              <Users className="w-4 h-4 text-slate-400" /> Vetting Pipeline
            </button>
            <button
              onClick={() => setActiveSection("jd")}
              className={`py-2 px-3.5 rounded-t-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === "jd" ? "bg-white text-blue-600 border-x border-t border-slate-200 font-bold" : "text-slate-550 hover:text-slate-800"
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-400" /> Job Description
            </button>
            <button
              onClick={() => setActiveSection("submissions")}
              className={`py-2 px-3.5 rounded-t-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === "submissions" ? "bg-white text-blue-600 border-x border-t border-slate-200 font-bold" : "text-slate-550 hover:text-slate-800"
              }`}
            >
              <ClipboardCheck className="w-4 h-4 text-slate-400" /> Approved Dispatch
              {totalApproved > 0 && (
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping shrink-0" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Dynamic global warning or informative callout bar */}
        {apiFeedback && (
          <div className="bg-slate-900 text-white font-sans text-xs px-4.5 py-3 rounded-lg flex items-center justify-between border-l-4 border-l-indigo-600 shadow-sm animate-pulse">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{apiFeedback}</span>
            </div>
            <button onClick={() => setApiFeedback(null)} className="text-white hover:text-slate-300 font-bold ml-2">×</button>
          </div>
        )}

        {/* Section View Routing */}
        {activeSection === "pipeline" && (
          <div className="grid grid-cols-1 gap-6">
            
            {/* Top portion candidate list ledger */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-lg font-display font-medium text-slate-950 flex items-center gap-2">
                  <span className="bg-indigo-600/10 text-indigo-700 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold">1</span>
                  Select Sourced Candidate
                </h2>
                <span className="text-xs text-slate-500 font-sans">Click on any candidate record to display the evaluation working desk.</span>
              </div>
              <MatchingTable
                candidates={candidates}
                evaluations={evaluations}
                decisions={decisions}
                selectedCandidateId={selectedCandidateId}
                onSelectCandidate={(id) => setSelectedCandidateId(id)}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                recommendationFilter={recommendationFilter}
                onRecommendationFilterChange={setRecommendationFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </div>

            {/* Bottom portion deep-dive panel */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-lg font-display font-medium text-slate-950 flex items-center gap-2">
                  <span className="bg-indigo-600/10 text-indigo-700 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold">2</span>
                  Deep Assessment Workspace
                </h2>
                <span className="text-xs text-slate-500 font-sans">Evaluate competencies, log interviews, override recommendation classes, and verify evidence.</span>
              </div>

              {selectedCandidateId ? (
                <DeepDive
                  candidate={candidates.find((c) => c.id === selectedCandidateId)!}
                  evaluation={evaluations[selectedCandidateId]!}
                  decision={decisions[selectedCandidateId]!}
                  jd={jd}
                  onUpdateDecision={handleUpdateDecision}
                  onRunLiveEvaluation={handleRunLiveEvaluation}
                  isEvaluating={isEvaluating}
                />
              ) : (
                <div className="bg-white p-12 text-center rounded-xl border border-gray-100 text-slate-400">
                  <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  Select a candidate from the vetting ledger above to operate the workspace controls.
                </div>
              )}
            </div>

          </div>
        )}

        {activeSection === "jd" && (
          <div className="space-y-4">
            <div className="px-1">
              <h2 className="text-lg font-display font-medium text-slate-950">Target Job Requirements Profile</h2>
              <p className="text-xs text-slate-500 mt-0.5">Customize the target role specifications dynamically. Updates will instantly serve as comparison metrics during AI evaluations.</p>
            </div>
            <JDViewer jd={jd} onUpdateJD={handleUpdateJD} />
          </div>
        )}

        {activeSection === "submissions" && (
          <div className="space-y-4">
            <div className="px-1">
              <h2 className="text-lg font-display font-medium text-slate-950">Client Submission Dispatch Desk</h2>
              <p className="text-xs text-slate-500 mt-0.5">Generate, copy, and export polished delivery dossiers for qualified candidates.</p>
            </div>
            <SubmissionCabinet
              candidates={candidates}
              evaluations={evaluations}
              decisions={decisions}
            />
          </div>
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 font-sans text-xs py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 OCBridge Hiring Copilot. All rights reserved.</p>
          <p className="font-mono text-[10px]">Built with Google Gemini 3.5 Flash & Antigravity</p>
        </div>
      </footer>
    </div>
  );
}
