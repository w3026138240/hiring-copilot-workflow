import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client safely (Lazy Initialization)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. Real-time candidate evaluation will fall back to simulation.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API endpoint: Evaluate candidate with Gemini
app.post("/api/evaluate", async (req, res) => {
  const { resumeText, name, email, phone, education, skills, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing resumeText or jobDescription inside payload." });
  }

  // If there's no real Gemini API key, we simulate the assessment with detailed analytics
  if (!process.env.GEMINI_API_KEY) {
    console.log("Simulating matching and scoring for:", name || "New Candidate");
    // Generate a high-quality simulated evaluation that matches the job requirements
    const wordCount = (resumeText + (skills || []).join(" ")).length;
    const hasAI = /ai|gpt|llm|gemini|nlp|learning/i.test(resumeText);
    const hasCode = /python|typescript|react|javascript|coding|built|prototype/i.test(resumeText);
    const hasProduct = /product|manager|prd|workflow|user|hci|wireframe/i.test(resumeText);

    let score = 50;
    if (hasAI) score += 20;
    if (hasCode) score += 15;
    if (hasProduct) score += 15;
    score = Math.min(Math.max(score, 10), 100);

    let rec: "Ready to Submit" | "Validate First" | "Do Not Submit" = "Validate First";
    if (score >= 85) rec = "Ready to Submit";
    else if (score < 45) rec = "Do Not Submit";

    return res.json({
      score,
      recommendation: rec,
      briefReason: `AI alignment: ${hasAI ? 'Strong AI signals' : 'No direct AI context'}. Prototyping: ${hasCode ? 'Hands-on framework' : 'Needs verification'}.`,
      mainRisk: !hasCode ? "Lacks clear JS/TS prototyping experience." : "Minimal enterprise scale deployment.",
      strengths: [
        {
          point: "AI Exposure & Relevance",
          evidence: hasAI ? "Resume highlights experience with AI concepts or generative technologies." : "General technical alignment is available on the resume."
        },
        {
          point: "Functional Skills matching",
          evidence: `Mentions skills such as ${(skills || []).slice(0, 3).join(", ") || "various engineering backgrounds"}.`
        }
      ],
      risks: [
        {
          point: "Workflow details missing",
          evidence: !hasProduct ? "Lack of clear user workflow design or system orchestration mentions." : "General startup velocity metrics are unevidenced."
        }
      ],
      validationQuestions: [
        `How would you design the user validation step for an AI workflow to ensure quality without overwhelming the user?`,
        `Given the requirements, can you walk me through your personal history with React and TypeScript coding?`
      ],
      clientSummary: `${name || "The candidate"} presents a profile with a fit score of ${score}%. ${hasAI ? 'They have practical exposure to artificial intelligence systems.' : 'They are an analytical builder looking to break into the space.'} ${hasCode ? 'Their technical history shows active scripting abilities.' : 'Their engineering contributions require deeper qualification.'} We recommend scheduling a screener to validate their fit with the team's speedy product delivery cadence.`,
      scores: {
        technical: hasAI ? 85 : 45,
        product: hasProduct ? 80 : 35,
        prototyping: hasCode ? 80 : 40,
        ownership: 75
      }
    });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `
      You are an elite Applied AI Recruiting Analyst executing candidate screening for OCBridge / Hiring Copilot.
      Your task is to analyze a candidate's resume/profile details specifically in the context of our "Applied AI Product Intern" Job Description, scoring their alignment, identifying concrete strengths & risks, formulating recruiter validator questions, and writing a client-ready synopsis.

      --- JOB DESCRIPTION ---
      Title: ${jobDescription.title}
      Company: ${jobDescription.company}
      Role Description is: ${jobDescription.overview}
      Must-Have Requirements:
      ${(jobDescription.requirements || []).map((req: string) => `- ${req}`).join("\n")}
      Nice-To-Have:
      ${(jobDescription.niceToHave || []).map((nth: string) => `- ${nth}`).join("\n")}
      Desired core skills: ${(jobDescription.skills || []).join(", ")}

      --- CANDIDATE DETAILS ---
      Name: ${name || "Unknown"}
      Education: ${education || "N/A"}
      Core Skills: ${(skills || []).join(", ")}
      Resume text / Background context:
      ${resumeText}

      --- INSTRUCTIONS FOR ANALYSIS ---
      1. Score (0-100%): Assign a rigorous fit score based on requirements.
      2. Recommendation. Choose EXACTLY one:
         - "Ready to Submit": Strong alignment on must-have skills, clear evidence of project deployment/prototyping, low risk factors.
         - "Validate First": Promising profile but has minor gaps, ambiguities, or risks that need human validation first.
         - "Do Not Submit": Major mismatch with role requirements or disqualifying lack of product/technical skills.
      3. Brief Reason: Define the matching outcome in a single, extremely brief, concise sentence (under 12 words).
      4. Main Risk: Principal caution. Keep it extremely brief and short (under 10 words).
      5. Strengths with Specific Evidence: List 2 to 3 concrete strengths WITH exact quotes, citations, or explicit pointers from the candidate's experience. Never make general claims.
      6. Risks with Specific Evidence: Find 1 to 2 concrete risks or evidence gaps (such as lack of React familiarity or missing rapid prototyping history) referencing exact details of their background.
      7. Recruiter Validation Questions: Write 2 tailored, high-impact qualifying questions the recruiter should ask this specific candidate during a screener call (e.g. asking to detail a project in their CV).
      8. Client-Ready Candidate Summary: Write a highly structured candidate summary consisting of EXACTLY 3 to 5 sentences. Use a highly polished, professional tone, with NO fluff or flowery modifiers. Detail the candidate's qualifications, alignment with our core LLM/HCI philosophy, and prototype viability.
      9. Scores (0-100) along four key axes:
         - technical: core engineering and API knowledge
         - product: user experience and workflow thinking
         - prototyping: ability to rapidly build and ship UIs (Streamlit, React, etc.)
         - ownership: self-starter, communication, and proactivity

      Respond with a strict JSON format matching the schema rules requested.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "score",
            "recommendation",
            "briefReason",
            "mainRisk",
            "strengths",
            "risks",
            "validationQuestions",
            "clientSummary",
            "scores"
          ],
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Overall candidate fit score from 0 to 100 based strictly on job requirements."
            },
            recommendation: {
              type: Type.STRING,
              description: "Must be exactly one of: 'Ready to Submit', 'Validate First', 'Do Not Submit'."
            },
            briefReason: {
              type: Type.STRING,
              description: "Concise 1-2 sentence match overview."
            },
            mainRisk: {
              type: Type.STRING,
              description: "Primary concern for the recruiter."
            },
            strengths: {
              type: Type.ARRAY,
              description: "List of strengths, each with exact evidence from resume.",
              items: {
                type: Type.OBJECT,
                required: ["point", "evidence"],
                properties: {
                  point: { type: Type.STRING, description: "Strength area name (e.g., 'React Prototyping')." },
                  evidence: { type: Type.STRING, description: "Direct pointer or exact citation of evidence from candidate's resume." }
                }
              }
            },
            risks: {
              type: Type.ARRAY,
              description: "List of risk factors or evidence gaps.",
              items: {
                type: Type.OBJECT,
                required: ["point", "evidence"],
                properties: {
                  point: { type: Type.STRING, description: "Risk area name (e.g., 'No Prompting History')." },
                  evidence: { type: Type.STRING, description: "Direct proof of gap or lack of evidence on the candidate's resume." }
                }
              }
            },
            validationQuestions: {
              type: Type.ARRAY,
              description: "2 or 3 tailored text questions to verify profile gaps.",
              items: { type: Type.STRING }
            },
            clientSummary: {
              type: Type.STRING,
              description: "Perfect professional candidate summary of exactly 3-5 sentences without marketing fluff."
            },
            scores: {
              type: Type.OBJECT,
              required: ["technical", "product", "prototyping", "ownership"],
              properties: {
                technical: { type: Type.INTEGER },
                product: { type: Type.INTEGER },
                prototyping: { type: Type.INTEGER },
                ownership: { type: Type.INTEGER }
              }
            }
          }
        }
      }
    });

    const resultText = response.text;
    res.json(JSON.parse(resultText));
  } catch (err: any) {
    console.error("Gemini recruitment parsing failed:", err);
    res.status(500).json({ error: "Gemini analysis error: " + err.message });
  }
});

// Serve frontend assets
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    // In development, hook up Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

setupVite();
