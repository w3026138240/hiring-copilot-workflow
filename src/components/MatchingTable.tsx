import React from "react";
import { Candidate, CandidateEvaluation, HumanDecision } from "../types";
import { AlertCircle, CheckCircle, Search, Sparkles, User, Filter, AlertTriangle, HelpCircle } from "lucide-react";

interface MatchingTableProps {
  candidates: Candidate[];
  evaluations: Record<string, CandidateEvaluation>;
  decisions: Record<string, HumanDecision>;
  selectedCandidateId: string | null;
  onSelectCandidate: (id: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  recommendationFilter: string;
  onRecommendationFilterChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
}

export default function MatchingTable({
  candidates,
  evaluations,
  decisions,
  selectedCandidateId,
  onSelectCandidate,
  searchTerm,
  onSearchChange,
  recommendationFilter,
  onRecommendationFilterChange,
  statusFilter,
  onStatusFilterChange,
}: MatchingTableProps) {

  // Process rows
  const filteredCandidates = candidates.filter((cand) => {
    const evalData = evaluations[cand.id];
    const decision = decisions[cand.id];

    if (!evalData || !decision) return false;

    // Search term keyword matching
    const searchMatch =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      evalData.briefReason.toLowerCase().includes(searchTerm.toLowerCase());

    // Recommendation filter
    // Note we filter by current decision target recommendation (allows tracking overrides)
    const activeRec = decision.overrideRecommendation;
    const recMatch = recommendationFilter === "All" || activeRec === recommendationFilter;

    // Status filter
    const statusMatch = statusFilter === "All" || decision.status === statusFilter;

    return searchMatch && recMatch && statusMatch;
  });

  const getRecommendationBadge = (rec: "Ready to Submit" | "Validate First" | "Do Not Submit") => {
    switch (rec) {
      case "Ready to Submit":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full px-2.5 py-0.5 text-xs font-medium font-sans">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Ready to Submit
          </span>
        );
      case "Validate First":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full px-2.5 py-0.5 text-xs font-medium font-sans">
            <HelpCircle className="w-3 h-3 text-amber-500" />
            Validate First
          </span>
        );
      case "Do Not Submit":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200/80 rounded-full px-2.5 py-0.5 text-xs font-medium font-sans">
            <AlertTriangle className="w-3 h-3 text-rose-500" />
            Do Not Submit
          </span>
        );
    }
  };

  const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-md px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-md px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider">
            Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-md px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider">
            Pending
          </span>
        );
    }
  };

  const scoreColorClass = (score: number) => {
    if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-rose-700 bg-rose-50 border-rose-200";
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden font-sans" id="matching-table-panel">
      {/* Search and filter toolbar */}
      <div className="p-5 border-b border-gray-100 bg-slate-50/50 space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-sans"
              placeholder="Search by candidate name, skill, or evaluation details..."
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {/* Rec Filter */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">Recommendation:</span>
              <select
                value={recommendationFilter}
                onChange={(e) => onRecommendationFilterChange(e.target.value)}
                className="bg-transparent border-0 py-0 pl-1 pr-6 font-semibold text-slate-800 focus:ring-0 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Ready to Submit">Ready to Submit</option>
                <option value="Validate First">Validate First</option>
                <option value="Do Not Submit">Do Not Submit</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
              <span className="font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="bg-transparent border-0 py-0 pl-1 pr-6 font-semibold text-slate-800 focus:ring-0 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid or Table list */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id="recruitment-grid-table">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100 text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">
              <th className="py-3.5 px-5">Candidate</th>
              <th className="py-3.5 px-4 text-center">Score</th>
              <th className="py-3.5 px-4">AI Rec & Status</th>
              <th className="py-3.5 px-4">Brief Reason</th>
              <th className="py-3.5 px-4">Main Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-sans text-sm">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  No candidates match the specified search or filter query.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((cand) => {
                const evalData = evaluations[cand.id];
                const dec = decisions[cand.id];
                const isSelected = selectedCandidateId === cand.id;

                return (
                  <tr
                    key={cand.id}
                    onClick={() => onSelectCandidate(cand.id)}
                    className={`cursor-pointer transition-colors hover:bg-blue-50/15 ${
                      isSelected ? "bg-blue-50/30 text-blue-900 border-l-4 border-l-blue-600" : ""
                    }`}
                  >
                    {/* Name & Contact */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold ${
                          isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          {cand.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-900 text-sm font-sans flex items-center gap-1.5">
                            {cand.name}
                            {/* Proximity / Outstanding Score Indicator */}
                            {evalData.score >= 95 && (
                              <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" title="Top Competency Match" />
                            )}
                          </p>
                          <p className="text-slate-400 text-[11px] font-sans truncate max-w-[180px]">
                            {cand.education.split(",")[0]}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Numeric Fit Grade */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${scoreColorClass(evalData.score)}`}>
                        {evalData.score}%
                      </span>
                    </td>

                    {/* Rec Badge & Light Status */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        {getRecommendationBadge(dec.overrideRecommendation)}
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400 font-sans">Decision:</span>
                          {getStatusBadge(dec.status)}
                        </div>
                      </div>
                    </td>

                    {/* AI explanation reason */}
                    <td className="py-4 px-4 text-slate-600 font-sans max-w-xs xl:max-w-md">
                      <p className="leading-relaxed whitespace-normal break-words">{evalData.briefReason}</p>
                    </td>

                    {/* Highlight Risk / Gap Flag */}
                    <td className="py-4 px-4 text-slate-600 font-sans max-w-xs">
                      <div className="flex items-start gap-1.5 text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-[11px] text-slate-600 whitespace-normal break-words">{evalData.mainRisk}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
