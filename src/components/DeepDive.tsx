import React, { useState } from "react";
import { Candidate, CandidateEvaluation, HumanDecision, JobDescription } from "../types";
import { 
  Sparkles, CheckCircle2, AlertTriangle, MessageSquare, Save, ChevronDown, 
  RefreshCw, FileText, Compass, BadgeAlert, Plus, Trash2, Mail, Phone, Calendar, ClipboardList
} from "lucide-react";

interface DeepDiveProps {
  candidate: Candidate;
  evaluation: CandidateEvaluation;
  decision: HumanDecision;
  jd: JobDescription;
  onUpdateDecision: (candidateId: string, updated: HumanDecision) => void;
  onRunLiveEvaluation: (candidateId: string) => Promise<void>;
  isEvaluating: boolean;
}

// Static pre-mapped expert alignments for the candidates matching target JD
interface AlignmentDetail {
  status: "Met" | "Partial" | "Gap";
  evidence: string;
}

const STATIC_ALIGNMENTS: Record<string, AlignmentDetail[]> = {
  cand_01: [
    { status: "Met", evidence: "Developed StudyBot AI, winning Best Educational Tool at Johns Hopkins Hackathon; used LangGraph Multi-Agent Systems." },
    { status: "Met", evidence: "Proficient in Next.js, Go, Solidity, and Python; orchestrated multi-tier microservices as back-end developer." },
    { status: "Met", evidence: "Served as Head of Product at Chainflow Labs and Luminos Commerce; managed conversions and product roadmaps via Figma & Jira." },
    { status: "Met", evidence: "Led GTM and release sprints at Luminos, scaling traffic to 18k followers with $12,000+ top-line revenue." },
    { status: "Met", evidence: "Experienced at building agent orchestration diagrams and interactive student tool loops with supervisor overrides." }
  ],
  cand_02: [
    { status: "Met", evidence: "PM Intern at ByteDance designing generative LLM prompt pipelines, driving +1.5M incremental search clicks." },
    { status: "Met", evidence: "Founded FitFrame virtual chatbot using React, Node.js, and PostgreSQL database connections." },
    { status: "Met", evidence: "Redesigned OPPO application recommendations, driving +7% metrics; analyzed user conversion funnels at Boston University." },
    { status: "Met", evidence: "Founded FitFrame; tracked development milestones with 93% cross-functional sprint achievement rate." },
    { status: "Met", evidence: "Launched 0-to-1 customer chatbot at Ping An with dialogue-tree framework and human validation logic." }
  ],
  cand_03: [
    { status: "Met", evidence: "Developed 'CareLink AI' telehealth agent using React, Python, and Google Vertex AI endpoints with custom system-prompts." },
    { status: "Met", evidence: "Created multiple interactive student web tools including DocSorter (Flask UI) and MultiChart (React/Express integration)." },
    { status: "Partial", evidence: "Built custom applications with clean user interfaces, but lacks professional industrial PM or company experience." },
    { status: "Met", evidence: "SWE Leader and Fundraising Chair for the Society of Women Engineers, managing budgets and organizing Python workshops." },
    { status: "Met", evidence: "Designed DocSorter utilizing JSON routing logs and custom routing parameters for human verification." }
  ],
  cand_04: [
    { status: "Partial", evidence: "Strong technical mathematics backgrounds, but prompt engineering experience is restricted to text classifiers at JPMC." },
    { status: "Gap", evidence: "Lacks core JS/TS knowledge, CSS/Tailwind layouts, and frontend web framework experience; resume focused entirely on Python analytics." },
    { status: "Gap", evidence: "No history in digital user interface mockups, wireframing, user-experience design, or product launches." },
    { status: "Met", evidence: "Conducted quantitative sentiment audits at China Merchants Bank, self-managing timelines and data validation parameters." },
    { status: "Gap", evidence: "Focused on offline mathematical model extraction and batch data pipelines rather than interactive human-feedback designs." }
  ],
  cand_05: [
    { status: "Met", evidence: "AI Training & Quality Evaluator at Outlier AI, reviewing prompt engineering workflows and logic code blocks daily." },
    { status: "Met", evidence: "Coded React/OpenAI Capstone voice helper. Highly capable across TypeScript, HTML5, PostgreSQL, and Python." },
    { status: "Met", evidence: "Acted as Product Owner and Scrum Master during voice system designs, defining PRDs and user experience flows." },
    { status: "Met", evidence: "Coordinated agile sprints, hosted stakeholder check-ins, and scheduled milestone compliance reviews." },
    { status: "Met", evidence: "Designed real-time voice latency correction loops to coordinate deep-learning models with browser interfaces." }
  ],
  cand_06: [
    { status: "Met", evidence: "Built custom LLM clinical extraction pipelines to scan medical oncology archives and output clinical summaries." },
    { status: "Partial", evidence: "Highly proficient in Python script scrapers and simulation logic, but has zero JS, TypeScript, React, or Vite UI history." },
    { status: "Gap", evidence: "Focus is heavily algebraic (cohort analytics, robotics simulation queue) rather than UI layouts or customer-focused tools." },
    { status: "Met", evidence: "Sourced clinical data parameters independently and delivered oncology matching reports for Zhejiang University hospital." },
    { status: "Partial", evidence: "Handled data filtration semi-automated pipelines but lacks active experience in real-time UI validation tools." }
  ],
  cand_07: [
    { status: "Met", evidence: "Product Intern at Auris Robotics, prototyping task widgets and prompt flows. Highly engaged with LLM chatbot systems." },
    { status: "Met", evidence: "Co-founded Nexbridge, programming core mobile components, calendar configurations, and real-time backend updates." },
    { status: "Met", evidence: "Shipped user-facing startup widgets, onboarding flows, and chatbot interactions by conducting active client user tests." },
    { status: "Met", evidence: "Co-founded Nexbridge scaling tool to 200+ active users; Head of School representing Winchester College debate." },
    { status: "Met", evidence: "Designed Auris customer-onboarding chatbot which allows recruiters to view matching profiles and approve selections." }
  ]
};

const getFallbackAlignment = (reqText: string, resumeText: string): AlignmentDetail => {
  const reqLower = reqText.toLowerCase();
  const resLower = resumeText.toLowerCase();

  let matchedWords = 0;
  const keywords = ["ai", "react", "typescript", "python", "product", "prototype", "prompt", "pm", "communication", "design", "llm"];
  const matchedList: string[] = [];
  
  keywords.forEach(kw => {
    if (reqLower.includes(kw) && resLower.includes(kw)) {
      matchedWords++;
      matchedList.push(kw);
    }
  });

  if (matchedWords >= 3) {
    return {
      status: "Met",
      evidence: `Demonstrates strong keyword convergence (${matchedList.join(", ")}). Resume contains direct related descriptors.`
    };
  } else if (matchedWords >= 1) {
    return {
      status: "Partial",
      evidence: `Partial convergence with keywords: ${matchedList.join(", ")}. Manual screening is advised to qualify competency.`
    };
  } else {
    return {
      status: "Gap",
      evidence: "No direct reference or overlapping keywords were found under candidate profile text."
    };
  }
};

export default function DeepDive({
  candidate,
  evaluation,
  decision,
  jd,
  onUpdateDecision,
  onRunLiveEvaluation,
  isEvaluating,
}: DeepDiveProps) {
  const [activeTab, setActiveTab] = useState<"findings" | "alignment" | "resume">("findings");
  const [notes, setNotes] = useState(decision.recruiterNotes);
  const [editedQuestions, setEditedQuestions] = useState<string[]>(decision.editedQuestions);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [editedSummary, setEditedSummary] = useState(decision.editedSummary);

  // Synchronize state when candidate changes
  React.useEffect(() => {
    setNotes(decision.recruiterNotes);
    setEditedQuestions(decision.editedQuestions);
    setEditedSummary(decision.editedSummary);
  }, [candidate.id, decision]);

  const handleStatusChange = (status: "pending" | "approved" | "rejected") => {
    onUpdateDecision(candidate.id, {
      ...decision,
      status,
    });
  };

  const handleRecommendationOverride = (rec: "Ready to Submit" | "Validate First" | "Do Not Submit") => {
    onUpdateDecision(candidate.id, {
      ...decision,
      overrideRecommendation: rec,
    });
  };

  const handleUpdateNotes = (val: string) => {
    setNotes(val);
    onUpdateDecision(candidate.id, {
      ...decision,
      recruiterNotes: val,
    });
  };

  const handleUpdateSummary = (val: string) => {
    setEditedSummary(val);
    onUpdateDecision(candidate.id, {
      ...decision,
      editedSummary: val,
    });
  };

  const toggleQuestionComplete = (idx: number) => {
    const nextCompleted = { ...decision.validatedQuestionsCompleted };
    nextCompleted[idx] = !nextCompleted[idx];
    onUpdateDecision(candidate.id, {
      ...decision,
      validatedQuestionsCompleted: nextCompleted,
    });
  };

  const deleteQuestion = (idx: number) => {
    const nextQs = editedQuestions.filter((_, i) => i !== idx);
    setEditedQuestions(nextQs);
    onUpdateDecision(candidate.id, {
      ...decision,
      editedQuestions: nextQs,
    });
  };

  const addQuestion = () => {
    if (newQuestionText.trim()) {
      const nextQs = [...editedQuestions, newQuestionText.trim()];
      setEditedQuestions(nextQs);
      setNewQuestionText("");
      onUpdateDecision(candidate.id, {
        ...decision,
        editedQuestions: nextQs,
      });
    }
  };

  const editQuestionInline = (idx: number, val: string) => {
    const nextQs = [...editedQuestions];
    nextQs[idx] = val;
    setEditedQuestions(nextQs);
    onUpdateDecision(candidate.id, {
      ...decision,
      editedQuestions: nextQs,
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden font-sans grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100" id="deep-dive-panel">
      
      {/* LEFT PORTION: Candidate Record (Timeline / Scores / Raw CV) */}
      <div className="lg:col-span-5 p-6 flex flex-col space-y-6 h-full bg-slate-50/20">
        
        {/* Candidate Meta Card */}
        <div className="space-y-3.5 border-b border-gray-100 pb-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-slate-400">Candidate File</span>
              <h2 className="text-2xl font-display font-medium text-slate-950 tracking-tight">{candidate.name}</h2>
              <p className="text-xs text-slate-500 font-medium ">{candidate.education}</p>
            </div>
            
            {/* Live Re-Evaluation Trigger */}
            <button
              onClick={() => onRunLiveEvaluation(candidate.id)}
              disabled={isEvaluating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-105 border border-blue-100 rounded-lg text-xs font-semibold text-blue-700 select-all cursor-pointer disabled:opacity-50 transition-all shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isEvaluating ? "animate-spin" : ""}`} />
              {isEvaluating ? "Analyzing..." : "Re-Score AI"}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-slate-500 text-xs font-sans">
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> {candidate.email}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {candidate.phone}</span>
          </div>

          {/* Core skills tags on CV */}
          <div className="flex flex-wrap gap-1 pt-1.5">
            {candidate.skills.map((skill) => (
              <span key={skill} className="bg-emerald-50 border border-emerald-100/50 rounded-full text-[10px] px-2 py-0.5 text-emerald-800 font-medium lowercase font-sans">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("findings")}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "findings" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            AI Competency
          </button>
          <button
            onClick={() => setActiveTab("alignment")}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "alignment" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            JD Requirements
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "resume" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Raw CV & Timeline
          </button>
        </div>

        {/* Dynamic Left Column Area */}
        {activeTab === "findings" ? (
          <div className="space-y-6">
            
            {/* Visual alignment meter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Alignment Dimensions</h3>
                <span className="text-[11px] text-slate-400 font-sans">Ideal minimum alignment: 70%</span>
              </div>

              <div className="space-y-3.5">
                {/* Tech Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-705">Prompt Engineering & Tech Skills</span>
                    <span className="font-mono font-bold text-slate-500">{evaluation.scores.technical}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${evaluation.scores.technical}%` }} />
                  </div>
                </div>

                {/* Product Thinking Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-705">Product UX & Workflow design</span>
                    <span className="font-mono font-bold text-slate-500">{evaluation.scores.product}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${evaluation.scores.product}%` }} />
                  </div>
                </div>

                {/* Prototyping Speed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-705">Rapid Prototyping Velocity</span>
                    <span className="font-mono font-bold text-slate-500">{evaluation.scores.prototyping}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${evaluation.scores.prototyping}%` }} />
                  </div>
                </div>

                {/* Ownership Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-705">Ownership & Proactive Drive</span>
                    <span className="font-mono font-bold text-slate-500">{evaluation.scores.ownership}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${evaluation.scores.ownership}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* In-Depth matching breakdown description */}
            <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg space-y-2.5 font-sans">
              <h4 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-500" />
                Strategic Matching Alignment
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The AI compared this resume against <strong>{jd.requirements.length} core JD criteria</strong>. 
                Alignment score is <strong>{evaluation.score}%</strong>. Based on competency indicators:
              </p>
              <div className="text-xs space-y-1.5 text-slate-600 pl-1.5 border-l border-blue-200">
                <p>• Must-haves met: {evaluation.score >= 80 ? "Fully Met" : "Gaps Sourced"}</p>
                <p>• Nice-to-haves: {evaluation.score >= 90 ? "Strong Boost" : "Nominal"}</p>
              </div>
            </div>

          </div>
        ) : activeTab === "alignment" ? (
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[480px] pr-1.5 scrollbar-thin">
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Must-Have Alignment Diagnostic</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Exact mapping of target role criteria compared dynamically with candidate achievements.</p>
            </div>

            <div className="space-y-3.5">
              {jd.requirements.map((req, idx) => {
                // Fetch the mapped status and evidence
                const staticCandidateAlignments = STATIC_ALIGNMENTS[candidate.id];
                let detail: AlignmentDetail;
                
                if (staticCandidateAlignments && staticCandidateAlignments[idx]) {
                  detail = staticCandidateAlignments[idx];
                } else {
                  // Fallback for custom requirements or edited sets
                  detail = getFallbackAlignment(req, candidate.resumeText + " " + candidate.skills.join(" "));
                }

                // Status Badge styling
                let badgeClass = "";
                let indicatorText = "";
                if (detail.status === "Met") {
                  badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                  indicatorText = "✓ Met";
                } else if (detail.status === "Partial") {
                  badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
                  indicatorText = "⚠ Partially Met";
                } else {
                  badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
                  indicatorText = "✗ Gap / Missing";
                }

                return (
                  <div key={idx} className="bg-white border border-slate-100 p-3 rounded-lg shadow-2xs space-y-2">
                    <div className="flex items-start justify-between gap-2.5">
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                        <span className="text-blue-600 font-mono text-[10px] mr-1">#{idx + 1}</span> {req}
                      </p>
                      <span className={`shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                        {indicatorText}
                      </span>
                    </div>
                    <div className="bg-slate-50/50 p-2 rounded text-[11px] text-slate-650 leading-relaxed font-sans border-l-2 border-slate-350">
                      <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-0.5">Sourced Evidence:</span>
                      {detail.evidence}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-5 flex-1 overflow-y-auto max-h-[480px] pr-1.5 scrollbar-thin">
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Resume Details
              </h3>
              <p className="text-xs text-slate-500 italic leading-relaxed bg-white border border-slate-100 p-3 rounded-lg">
                &ldquo;{candidate.resumeText}&rdquo;
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Career History & Achievements
              </h3>
              <div className="relative border-l border-slate-200 pl-4.5 ml-1.5 space-y-5">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="space-y-1.5 text-xs relative">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white -left-[24.5px] top-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-[11px] text-slate-400 font-sans font-medium">{exp.company} &bull; {exp.duration}</p>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 font-sans leading-relaxed text-[11px]">
                      {exp.bulletPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RIGHT PORTION: Screener & Evaluation Working Desk */}
      <div className="lg:col-span-7 p-6 flex flex-col space-y-6" id="workflow-board">
        
        {/* Recruiter Controller Desk */}
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-4 shadow-2xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">Recruiter Approval Console</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-slate-400 uppercase">Interactive State</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Override recommendation state selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 font-mono tracking-wide uppercase">Evaluator Recommendation</label>
              <div className="relative">
                <select
                  value={decision.overrideRecommendation}
                  onChange={(e) => handleRecommendationOverride(e.target.value as any)}
                  className="w-full bg-white text-xs border border-slate-200 rounded-lg py-2 pl-3 pr-8 font-sans font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Ready to Submit">Ready to Submit</option>
                  <option value="Validate First">Validate First</option>
                  <option value="Do Not Submit">Do Not Submit</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Approve / Reject buttons */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 font-mono tracking-wide uppercase">Human Decisions Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange("approved")}
                  className={`flex-1 text-xs py-2 px-3 font-semibold rounded-lg border cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                    decision.status === "approved"
                      ? "bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => handleStatusChange("rejected")}
                  className={`flex-1 text-xs py-2 px-3 font-semibold rounded-lg border cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                    decision.status === "rejected"
                      ? "bg-slate-800 text-white border-slate-900 ring-2 ring-slate-400"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            </div>
          </div>

          {/* Quick Screener Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-500 font-mono tracking-wide uppercase">Screener Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => handleUpdateNotes(e.target.value)}
              className="w-full bg-white select-all border border-slate-200 rounded-lg p-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 h-16 resize-y"
              placeholder="Record comments here (e.g., 'Spoke on 5/21, confirmed React skills, very enthusiastic candidate...')"
            />
          </div>
        </div>

        {/* Dynamic Analysis: Strengths and Risks (Strict Evidence Pairing) */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Compass className="w-4 h-4 text-blue-500" /> Competency Evidence Matrix
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Strengths with evidence block */}
            <div className="space-y-3 bg-emerald-50/20 border border-emerald-100/40 p-4.5 rounded-xl">
              <h4 className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Strengths with Evidence
              </h4>
              <div className="space-y-3.2 text-[11px]">
                {evaluation.strengths.map((str, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-bold text-slate-800 leading-tight">{str.point}</p>
                    <p className="text-slate-600 leading-relaxed bg-white/70 p-1.5 rounded border border-slate-100/40 font-mono text-[10px]">
                      &ldquo;{str.evidence}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks with evidence/absence block */}
            <div className="space-y-3 bg-rose-50/20 border border-rose-100/40 p-4.5 rounded-xl">
              <h4 className="text-xs font-semibold text-rose-800 flex items-center gap-1">
                <BadgeAlert className="w-3.5 h-3.5 text-rose-600" />
                Risks & Gaps Sourced
              </h4>
              <div className="space-y-3.2 text-[11px]">
                {evaluation.risks.length === 0 ? (
                  <p className="text-slate-400 pt-3 italic">No matching risks flagged by evaluator.</p>
                ) : (
                  evaluation.risks.map((risk, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="font-bold text-slate-800 leading-tight flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                        {risk.point}
                      </p>
                      <p className="text-slate-600 leading-relaxed bg-white/70 p-1.5 rounded border border-slate-100/40 font-mono text-[10px]">
                        &ldquo;{risk.evidence}&rdquo;
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
            
          </div>
        </div>

        {/* Recruiter Validation Questions (Editable) */}
        <div className="space-y-3 border-t border-gray-100 pt-5">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4" /> Recruiter Validator Questions
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Customize or edit these questions to clear up risks during your human screening call. Check off asked items to track progress.
          </p>

          <div className="space-y-2.5">
            {editedQuestions.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/60 p-3 rounded-lg">
                <input
                  type="checkbox"
                  checked={!!decision.validatedQuestionsCompleted[idx]}
                  onChange={() => toggleQuestionComplete(idx)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                />
                <div className="flex-1 space-y-1">
                  <textarea
                    value={q}
                    onChange={(e) => editQuestionInline(idx, e.target.value)}
                    className="w-full select-all bg-transparent border-0 p-0 text-xs text-slate-700 font-sans leading-relaxed focus:ring-0 resize-none"
                    rows={2}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-sans">
                      {decision.validatedQuestionsCompleted[idx] ? "✓ Checked & Vetted" : "Pending Human Screen"}
                    </span>
                    <button
                      onClick={() => deleteQuestion(idx)}
                      className="text-[10px] text-slate-400 hover:text-red-500 font-medium font-sans cursor-pointer flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick add question form */}
            <div className="flex gap-2.5 pt-1">
              <input
                type="text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addQuestion()}
                className="flex-1 bg-white select-all text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                placeholder="Draft and append a custom screening question..."
              />
              <button
                onClick={addQuestion}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-105 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Client-Ready Candidate Summary (Writeup Editor) */}
        <div className="space-y-3.5 border-t border-gray-100 pt-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-slate-400" /> Client-Ready Candidate Summary
            </h3>
            <span className="text-[11px] text-slate-400 font-sans">3 to 5 sentences &bull; ready for delivery</span>
          </div>

          <div className="space-y-2 font-sans text-xs">
            <textarea
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white select-all rounded-lg p-3.5 text-xs text-slate-700 leading-relaxed font-sans placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 h-28"
              value={editedSummary}
              onChange={(e) => handleUpdateSummary(e.target.value)}
              placeholder="Write a custom professional evaluation..."
            />
            <p className="text-[10px] text-slate-400 leading-normal flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              This summary updates automatically when saved. Access the 'Approved Cabinet' tab to grab your finished submit sheets in one click.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
