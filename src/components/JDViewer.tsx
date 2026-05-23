import React, { useState } from "react";
import { JobDescription } from "../types";
import { Briefcase, Edit, Check, X, Award, ChevronRight, Plus, Trash2 } from "lucide-react";

interface JDViewerProps {
  jd: JobDescription;
  onUpdateJD: (updated: JobDescription) => void;
}

export default function JDViewer({ jd, onUpdateJD }: JDViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJd, setEditedJd] = useState<JobDescription>({ ...jd });
  const [newReq, setNewReq] = useState("");
  const [newNice, setNewNice] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    onUpdateJD(editedJd);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedJd({ ...jd });
    setIsEditing(false);
  };

  const addReq = () => {
    if (newReq.trim()) {
      setEditedJd({
        ...editedJd,
        requirements: [...editedJd.requirements, newReq.trim()]
      });
      setNewReq("");
    }
  };

  const removeReq = (index: number) => {
    setEditedJd({
      ...editedJd,
      requirements: editedJd.requirements.filter((_, i) => i !== index)
    });
  };

  const addNice = () => {
    if (newNice.trim()) {
      setEditedJd({
        ...editedJd,
        niceToHave: [...editedJd.niceToHave, newNice.trim()]
      });
      setNewNice("");
    }
  };

  const removeNice = (index: number) => {
    setEditedJd({
      ...editedJd,
      niceToHave: editedJd.niceToHave.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !editedJd.skills.includes(newSkill.trim())) {
      setEditedJd({
        ...editedJd,
        skills: [...editedJd.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setEditedJd({
      ...editedJd,
      skills: editedJd.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden font-sans" id="jd-viewer-panel">
       {/* Header section */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-start rounded-t-xl border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-mono font-medium tracking-wider text-blue-300 uppercase">Target Job Description</span>
          </div>
          {isEditing ? (
            <div className="space-y-2 mt-2">
              <input
                type="text"
                value={editedJd.title}
                onChange={(e) => setEditedJd({ ...editedJd, title: e.target.value })}
                className="bg-white/10 border border-white/20 select-all rounded px-3 py-1 text-xl font-semibold w-full text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 font-display"
                placeholder="Role Title"
              />
              <input
                type="text"
                value={editedJd.company}
                onChange={(e) => setEditedJd({ ...editedJd, company: e.target.value })}
                className="bg-white/10 border border-white/20 select-all rounded px-3 py-1 font-sans text-sm w-full text-blue-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                placeholder="Company Name"
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-display font-medium tracking-tight text-white">{jd.title}</h2>
              <p className="text-sm text-blue-200">{jd.company}</p>
            </>
          )}
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-medium flex items-center gap-1.5 transition-all text-blue-200 hover:text-white cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" /> Edit JD
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Role Overview</h3>
          {isEditing ? (
            <textarea
              value={editedJd.overview}
              onChange={(e) => setEditedJd({ ...editedJd, overview: e.target.value })}
              className="w-full border border-slate-205 rounded-lg p-3 text-sm text-slate-700 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Provide a general overview of the responsibilities and scope..."
            />
          ) : (
            <p className="text-sm text-slate-600 leading-relaxed">{jd.overview}</p>
          )}
        </div>

        {/* Requirements */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Must-Have Alignment Criteria</h3>
          {isEditing ? (
            <div className="space-y-3 text-sm">
              <div className="space-y-2">
                {editedJd.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-xs text-slate-400 font-mono">#{idx + 1}</span>
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => {
                        const next = [...editedJd.requirements];
                        next[idx] = e.target.value;
                        setEditedJd({ ...editedJd, requirements: next });
                      }}
                      className="flex-1 bg-transparent border-0 py-0 focus:ring-0 text-slate-700"
                    />
                    <button onClick={() => removeReq(idx)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newReq}
                  onChange={(e) => setNewReq(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addReq()}
                  className="flex-1 text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a new must-have criteria..."
                />
                <button
                  onClick={addReq}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-2">
              {jd.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nice To Have */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">Nice-To-Have Boosters</h3>
          {isEditing ? (
            <div className="space-y-3 text-sm">
              <div className="space-y-2">
                {editedJd.niceToHave.map((nice, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-xs text-slate-400 font-mono">#{idx + 1}</span>
                    <input
                      type="text"
                      value={nice}
                      onChange={(e) => {
                        const next = [...editedJd.niceToHave];
                        next[idx] = e.target.value;
                        setEditedJd({ ...editedJd, niceToHave: next });
                      }}
                      className="flex-1 bg-transparent border-0 py-0 focus:ring-0 text-slate-700"
                    />
                    <button onClick={() => removeNice(idx)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNice}
                  onChange={(e) => setNewNice(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNice()}
                  className="flex-1 text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a new nice-to-have..."
                />
                <button
                  onClick={addNice}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-2">
              {jd.niceToHave.map((nice, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0 ml-1.5 mr-1" />
                  <span>{nice}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Skills Tag Area */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-slate-400" /> Key Skills Required
          </h3>
          {isEditing ? (
            <div className="space-y-2 text-sm">
              <div className="flex flex-wrap gap-1.5">
                {editedJd.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 text-xs text-blue-700 font-medium font-sans">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-blue-900 font-semibold cursor-pointer text-xs">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1 text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a skill..."
                />
                <button
                  onClick={addSkill}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {jd.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center bg-slate-50 border border-slate-200/60 rounded-full px-3 py-1 text-xs text-slate-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
