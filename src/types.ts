export interface JobDescription {
  title: string;
  company: string;
  overview: string;
  requirements: string[]; // Must-haves
  niceToHave: string[];   // Nice-to-haves
  skills: string[];       // Core skills
}

export interface CandidateWorkExperience {
  role: string;
  company: string;
  duration: string;
  bulletPoints: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string[];
  resumeText: string;
  experience: CandidateWorkExperience[];
}

export interface BulletPointWithEvidence {
  point: string;
  evidence: string; // Specific quote or absence from the resume
}

export interface DimensionScores {
  technical: number;   // 0-100: Programming, TS/Python, AI API knowledge
  product: number;     // 0-100: User experience, scoping simple designs
  prototyping: number; // 0-100: Rapid shipping, Streamlit, web development
  ownership: number;   // 0-100: Proactive communication, self-starter
}

export interface CandidateEvaluation {
  candidateId: string;
  score: number; // Overall fit score (0-100)
  recommendation: "Ready to Submit" | "Validate First" | "Do Not Submit";
  briefReason: string;
  mainRisk: string;
  strengths: BulletPointWithEvidence[];
  risks: BulletPointWithEvidence[];
  validationQuestions: string[];
  clientSummary: string; // 3-5 client-ready sentences, professional tone
  scores: DimensionScores;
}

export interface HumanDecision {
  candidateId: string;
  status: "pending" | "approved" | "rejected";
  overrideRecommendation: "Ready to Submit" | "Validate First" | "Do Not Submit";
  editedSummary: string;
  editedQuestions: string[];
  recruiterNotes: string;
  validatedQuestionsCompleted: Record<number, boolean>; // Index -> completed (whether recruiter asked)
}
