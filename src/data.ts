import { JobDescription, Candidate, CandidateEvaluation, HumanDecision } from "./types";

export const initialJobDescription: JobDescription = {
  title: "Applied AI Product Intern",
  company: "OCBridge / Hiring Copilot",
  overview: "At OCBridge / Hiring Copilot, we are building an AI-native, human-in-the-loop recruiting system that helps execute recruiting workflows and deliver hiring outcomes. Our core belief is that AI should not just assist recruiters; AI should active-execute recruiting workflows, while humans validate quality, apply judgment, and approve important decisions. As an Applied AI Product Intern, you will help design and quickly prototype AI-executed recruiting workflows, aligning LLM capabilities with elegant, user-facing recruiting products.",
  requirements: [
    "Proficiency in prompt engineering and utilizing LLMs (e.g., Gemini, GPT models) to extract details, summarize content, and structure data.",
    "Hands-on prototyping and scripting abilities (Python, Node.js/TypeScript, Streamlit, or comparable UI tooling).",
    "Deep 'product thinking' and user empathy—focusing on creating simple, streamlined workflows rather than bloated features.",
    "High sense of ownership and proactive communication (ability to clarify vague instructions and move fast).",
    "Strong conceptual understanding of Human-in-the-Loop AI design patterns (AI executes, human approves)."
  ],
  niceToHave: [
    "Prior product management internship or tech entrepreneurship experience.",
    "Familiarity with recruitment workflows or building recruitment automation tools.",
    "Contribution to open-source developer tools or conversational AI libraries."
  ],
  skills: [
    "Prompt Engineering",
    "TypeScript",
    "React / Vite",
    "Python",
    "Streamlit",
    "Generative AI APIs",
    "User Empathy & PRD design",
    "Rapid Prototyping"
  ]
};

export const initialCandidates: Candidate[] = [
  {
    id: "cand_01",
    name: "Ryan Chen",
    email: "ryan.chen@jhu.edu",
    phone: "N/A",
    education: "M.Eng., Engineering Management (AI & ML Track), Johns Hopkins University (Aug 2024 – Dec 2025)",
    skills: ["Figma", "LangGraph", "Multi-Agent Systems", "OpenAI API", "Python", "TypeScript", "Next.js", "Go", "Solidity", "Jira"],
    resumeText: "M.Eng. at JHU (AI & ML track). Experienced product manager with engineering depth in AI agents, full-stack platforms, and fintech. Co-founder & Head of Product at Chainflow Labs (Solidity/Next.js/Go) and Luminos Commerce ($12k+ revenue, 81% gross margin). Built StudyBot AI, winning Best Educational Tool at JHU AI Hackathon. Defined LangGraph orchestration roadmaps and UX flows.",
    experience: [
      {
        role: "Co-founder & Head of Product",
        company: "Chainflow Labs",
        duration: "May 2025 - Present",
        bulletPoints: [
          "Drove 4,500+ cross-chain interactions in month 1 and 32% capital retention, leading a 10-week build and defining product requirements across Next.js/TypeScript, Go+gRPC, and Solidity/Solana Anchor.",
          "Designed UI/UX and shipped compliance features (KYC/AML, yield-proof, on-chain audit snapshots) with transparent yield allocation and partner-ready reporting."
        ]
      },
      {
        role: "Co-founder & Head of Product",
        company: "Luminos Commerce",
        duration: "May 2024 - Present",
        bulletPoints: [
          "Engineered the platform and led GTM execution, improving conversion through provider experiments, A/B testing, and cohort analysis, generating $12k+ revenue with 81% gross margin.",
          "Grew brand to 18k+ followers via social content distribution and iterative feedback loops; coordinated a bi-weekly release cycle in Jira."
        ]
      },
      {
        role: "Student Research Assistant",
        company: "Ohio State University (Dept. of Human Sciences)",
        duration: "Aug 2023 - Jan 2024",
        bulletPoints: [
          "Built Vue.js/MySQL/Python web apps for research data management; integrated mobile GIS modules and economic modeling scripts to automate workflows."
        ]
      },
      {
        role: "Back-end Engineer",
        company: "Shenzhen Wellsmart Technology Co., Ltd.",
        duration: "Jan 2022 - Aug 2022",
        bulletPoints: [
          "Improved system throughput by 22% by engineering high-performance Python microservices to streamline IoT data ingestion and analytics pipelines."
        ]
      }
    ]
  },
  {
    id: "cand_02",
    name: "Zhang Ruoxi",
    email: "zhang.ruoxi@bu.edu",
    phone: "+1 (617) 555-0519",
    education: "B.S. in Computer Science and Business Administration, Boston University (Expected May 2027)",
    skills: ["Prompt Engineering", "Python", "SQL", "Java", "JavaScript", "React", "Node.js", "databases", "Jira", "Power BI", "Agile & Scrum"],
    resumeText: "CS and Business undergrad at BU with outstanding PM and AI builder footprints. Product Manager Intern at ByteDance (generative LLM prompts, behaviour-embedding recall, +1.5M suggestions clicks dev), OPPO Growth PM Intern (multi-objective feed optimization), and Ping An (0-1 AI chatbot implementing dialogue framework). Founded FitFrame, a full-stack virtual try-on chatbot platform in React/Node/PostgreSQL.",
    experience: [
      {
        role: "Product Manager Intern",
        company: "ByteDance",
        duration: "Feb 2026 - Apr 2026",
        bulletPoints: [
          "Improved post-search suggestion CTR by 3.8% (approx. 1.5M incremental clicks) by proposing a generative LLM framework with structured prompt design and iterative evaluation.",
          "Increased user engagement by 1.4% by launching a behaviour-embedding-based recall system, delivering more contextually relevant recommendations."
        ]
      },
      {
        role: "Strategy & Growth Program Manager Intern",
        company: "OPPO Technology",
        duration: "Jun 2025 - Sep 2025",
        bulletPoints: [
          "Drove +7% ad revenue and +5% eCPM by redesigning feed ranking with multi-objective optimisation and real-time fatigue-aware ad pacing.",
          "Achieved a 93% milestone completion rate across a 12-week cross-functional sprint by leading requirements tracking."
        ]
      },
      {
        role: "Product Design Intern",
        company: "Boston University IT Services",
        duration: "Jan 2025 - Dec 2025",
        bulletPoints: [
          "Boosted conversion rate by 19% across 3 internal web properties by simplifying navigation via funnel analysis and card-sorting user research.",
          "Achieved 100% WCAG 2.1 AA accessibility compliance across 4 websites."
        ]
      },
      {
        role: "Product Manager Intern",
        company: "Ping An Technology",
        duration: "May 2024 - Aug 2024",
        bulletPoints: [
          "Achieved a 37% self-service resolution rate by launching a 0->1 AI customer service chatbot, designing the LLM reasoning pipeline and multi-turn dialogue framework."
        ]
      }
    ]
  },
  {
    id: "cand_03",
    name: "Priya Raghunathan",
    email: "priya.r@cpp.edu",
    phone: "+1 (909) 555-0261",
    education: "B.S. in Computer Science, California State Polytechnic University, Pomona (Expected Dec 2027)",
    skills: ["Java", "JavaScript", "Python", "React.js", "Express.js", "Flask", "SQL", "Google Sheets API", "Figma"],
    resumeText: "CS student at Cal Poly Pomona (GPA: 3.8). Self-motivated junior developer who created DocSorter (YAML routing pipeline, Flask dashboard), MultiChart Stocks (polling aggregator), and CareLink AI (telehealth agent using React/Express/Google Vertex AI). High proactive drive and student leader.",
    experience: [
      {
        role: "Fundraising Chair & Swe Leader",
        company: "Society of Women Engineers",
        duration: "Aug 2022 - Present",
        bulletPoints: [
          "Developed instructional materials and delivered hands-on Python and web-dev workshops to 25+ students.",
          "Led planning and execution of fundraising events, overseeing budgets and community outreach operations."
        ]
      },
      {
        role: "Summer STEM Teaching Assistant",
        company: "Mathnasium Learning Centre",
        duration: "Jul 2025 - Aug 2025",
        bulletPoints: [
          "Supported instruction for 35+ students in advanced math and provided targeted 1:1 coaching to facilitate problem solving."
        ]
      }
    ]
  },
  {
    id: "cand_04",
    name: "Li Mengqi",
    email: "li.mengqi@bu.edu",
    phone: "+1 (617) 555-0382",
    education: "M.S. in Business Analytics & Data Science, Boston University (Expected May 2027)",
    skills: ["Python", "SQL", "Java", "Tableau", "Excel", "Data Visualization", "Predictive Modeling", "A/B Testing"],
    resumeText: "Data Analytics graduate student at BU with statistics background from Purdue (GPA: 3.71). Built JPMorgan Brand Brandwatch sentiment analysis, designed Tableau dashboards at Estée Lauder, and built EquityTrack (SEC scraper, Streamlit, FinBERT model simulator). Quantitative expert.",
    experience: [
      {
        role: "Business Analytics Assistant",
        company: "Estée Lauder Companies (China)",
        duration: "Sep 2024 - Oct 2024",
        bulletPoints: [
          "Analysed large sales datasets identifying purchasing patterns, customer segmentation, and promotional insights.",
          "Designed Tableau KPI dashboards enabling stakeholders to monitor campaign performance and sales metrics."
        ]
      },
      {
        role: "Data & Market Analysis Intern",
        company: "Greenbrook Capital Partners",
        duration: "Aug 2024 - Aug 2024",
        bulletPoints: [
          "Processed bond-market datasets using Python and Excel to identify yield spreads; produced comparative sector analyses."
        ]
      },
      {
        role: "Business Operations Intern",
        company: "China Merchants Bank",
        duration: "Jun 2024 - Jul 2024",
        bulletPoints: [
          "Supported investment product recommendation; collected client feedback and assisted frontline high-net-worth operations."
        ]
      }
    ]
  },
  {
    id: "cand_05",
    name: "Jordan McCallister",
    email: "jmccallister@pdx.edu",
    phone: "+1 (503) 555-0417",
    education: "M.S. in Computer Science & Software Engineering, Portland State University (Sept 2025 – Dec 2026)",
    skills: ["Python", "JavaScript", "ReactJS", "OpenAI API", "Deepgram Voice AI", "WebSockets", "SQL", "C++", "C#", "Agile Framework"],
    resumeText: "CS Master's student (GPA: 4.0). AI Quality Evaluator under Outlier AI evaluating engineering safety, TS/C++/Python code logic, and prompt chains. Software Intern at Salesforce (REST API & C#). Built real-time multiplayer HTML5 dashboard and capstone Speech Coaching App (React/OpenAI API/Deepgram) acting as Product Owner / Scrum Master.",
    experience: [
      {
        role: "AI Quality Evaluator",
        company: "Outlier AI (Remote)",
        duration: "Apr 2024 - Present",
        bulletPoints: [
          "Evaluated model outputs for factual accuracy, safety, instruction-following and coding correctness across Python, TypeScript, and C++.",
          "Applied prompt engineering techniques to improve model performance and API schemas for diverse client use cases."
        ]
      },
      {
        role: "Software Engineer Intern",
        company: "Salesforce (Tableau)",
        duration: "Summer 2018",
        bulletPoints: [
          "Designed a data-access abstraction layer using C# and the REST API, improving data integration bottlenecks.",
          "Developed a content-transformation utility converting rich-text components into plain-text formats on web dashboards."
        ]
      }
    ]
  },
  {
    id: "cand_06",
    name: "Chen Yuxuan",
    email: "chen.yuxuan@ucdavis.edu",
    phone: "+1 (530) 555-0293",
    education: "B.S. Applied Mathematics & Statistics / Data Science, UC Davis (Expected June 2026)",
    skills: ["Python", "NumPy", "Pandas", "scikit-learn", "Robotics", "SQL", "Airflow Pipelines", "LLMs for NLP coding"],
    resumeText: "Applied Math and Data Science major at UC Davis (GPA: 3.54). Tencent Data Analyst Intern (cohort analysis, RFM modelling); Zhejiang University Medical NLP Intern (advanced clinical parsing using Python scraping, structured LLMs content extractions, knowledge graphs); Ningbo Robotics Intern (6-DoF robotic kinematics, control logic).",
    experience: [
      {
        role: "Data Analyst Intern",
        company: "Tencent Holdings (Remote)",
        duration: "Oct 2025 - Nov 2025",
        bulletPoints: [
          "Conducted user segmentation using RFM model, computing retention rates and building cohort models to track engagement over time.",
          "Performed cohort analysis supporting lifecycle management and produced data visualization reports."
        ]
      },
      {
        role: "Data Analyst Intern",
        company: "Zhejiang University - Institute of Precision Medicine",
        duration: "Jul 2025 - Sep 2025",
        bulletPoints: [
          "Developed an automated pipeline to extract and structure oncology-related guidelines using Python scraping.",
          "Utilised Large Language Models (LLMs) for NLP tasks, analysing unstructured clinical data to build structured knowledge graphs."
        ]
      },
      {
        role: "Robotics Algorithm Intern",
        company: "Ningbo Precision Robotics Institute",
        duration: "May 2025 - Jun 2025",
        bulletPoints: [
          "Built forward/inverse kinematics control logic for a 6-DoF robotic arm using Python Control and NumPy.",
          "Managed experiment logs in Python (Pandas) and engineered real-time deviation filters."
        ]
      }
    ]
  },
  {
    id: "cand_07",
    name: "Alex Pemberton",
    email: "alex.pemberton@yale.edu",
    phone: "+1 (203) 555-0174",
    education: "B.S. Computer Science & Economics, Yale University (Class of 2029)",
    skills: ["Python", "Java", "SQL", "iOS / Web Development", "Chatbot Integrations", "Figma", "Workflows", "Startup GTM"],
    resumeText: "Computer Science and Economics student at Yale. Co-founder of Nexbridge, an active professional coordination platform leading full-stack iOS & web calendar sync and availability engines. Product Intern at Auris Robotics scoping features directly with founders, building surgical robotics platform, and launching custom onboarding chatbot.",
    experience: [
      {
        role: "Co-founder",
        company: "Nexbridge",
        duration: "Jan 2026 - Present",
        bulletPoints: [
          "Co-founded Nexbridge, an ambient coordination platform, leading full-stack iOS/web development including Google/Apple calendar sync and real-time availability signaling.",
          "Defined GTM strategy and pricing model targeting corporate professionals, onboarding 200+ beta users across UK universities."
        ]
      },
      {
        role: "Product Intern",
        company: "Auris Robotics",
        duration: "Feb 2026 - Present",
        bulletPoints: [
          "Designed end-to-end features at an AI robotics startup, working with founders to scope features and build precision task managers for surgical robotics.",
          "Built a customized onboarding chatbot that successfully reduced new-client setup time by 35%."
        ]
      },
      {
        role: "Venture Sourcing Analyst",
        company: "Yale Entrepreneurship Society",
        duration: "Sep 2025 - Present",
        bulletPoints: [
          "Sourced 14 high-potential startups for VC partner networks, focusing on climate tech and enterprise AI investments."
        ]
      }
    ]
  }
];

export const initialEvaluations: CandidateEvaluation[] = [
  {
    candidateId: "cand_01",
    score: 92,
    recommendation: "Ready to Submit",
    briefReason: "Strong co-founder with PM depth, AI agent builds, and rapid hackathon execution.",
    mainRisk: "Venture alignment with Chainflow Labs may limit full-time availability.",
    strengths: [
      {
        point: "Demonstrated MVP velocity",
        evidence: "Designed and shipped an AI study assistant with voice I/O in a single-day Agile hackathon, winning Best Educational Tool."
      },
      {
        point: "Proven 0-1 product leadership",
        evidence: "Co-founded two platforms, executing GTM strategy, designing UI/UX flows, and managing roadmaps using Jira and Agile practices."
      },
      {
        point: "Hands-on engineering foundation",
        evidence: "Direct experience building with React/Next.js, TypeScript, Python, and LangGraph multi-agent systems."
      }
    ],
    risks: [
      {
        point: "Active venture commitment",
        evidence: "Currently a co-founder of Chainflow Labs (Hong Kong) and Luminos Commerce, raising concerns about fractional commitment."
      }
    ],
    validationQuestions: [
      "Since you are currently active as a Co-founder & Head of Product at Chainflow Labs, how do you plan to manage your schedule and commitment for this internship?",
      "In your FlowAI project, you built a modular LangGraph orchestration roadmap. What main challenges did you face with multi-agent orchestration, and how did you resolve them?",
      "Tell us about the 1-day hackathon where you built StudyBot AI—what was your exact role and how did you select which features would make the MVP?"
    ],
    clientSummary: "Ryan is a highly accomplished candidate combining elite tech-product management with hands-on AI prototyping. Having co-founded two platforms where he served as Head of Product, Ryan excels at translating stakeholder vision into prioritized backlog execution in Jira and Figma. He brings deep technical expertise in Next.js, Node.js, and Python, coupled with a proven ability to ship high-speed AI tools, including winning an award for a voice-enabled AI study assistant. He is a self-directed, high-impact builder ideal for high-growth teams.",
    scores: {
      technical: 90,
      product: 94,
      prototyping: 95,
      ownership: 90
    }
  },
  {
    candidateId: "cand_02",
    score: 98,
    recommendation: "Ready to Submit",
    briefReason: "Top AI internships (ByteDance, Ping An) plus coded full-stack chatbot MVP.",
    mainRisk: "Undergrad status with limited long-term industry tenure (Class of 2027).",
    strengths: [
      {
        point: "Elite Generative AI Product Internships",
        evidence: "Formulated structured prompt designs and generative LLM frameworks at ByteDance, resulting in +1.5M incremental user clicks."
      },
      {
        point: "0-1 AI Chatbot Deployment",
        evidence: "Launched a multi-turn LLM reasoning customer service chatbot at Ping An, achieving a 37% self-service resolution rate."
      },
      {
        point: "Independently Shipped MVPs",
        evidence: "Founded and coded FitFrame, a full-stack AI virtual try-on web application in React, Node.js, and PostgreSQL."
      }
    ],
    risks: [
      {
        point: "Early in career",
        evidence: "Undergraduate candidate graduating in 2027; might require structural scaffolding compared to more senior hires."
      }
    ],
    validationQuestions: [
      "At ByteDance, you proposed a generative LLM framework with structured prompts. What was your systematic framework for testing and versioning those prompts?",
      "Could you walk us through the system architecture of your startup, FitFrame? How did you manage image storage orchestration and model API latency?",
      "You have worked at very large companies (ByteDance, Ping An, OPPO) as well as founded your own startup. Which environment do you prefer and why?"
    ],
    clientSummary: "Ruoxi is an exceptional product-builder candidate who possesses a rare combination of formal LLM prompt product management and hands-on full-stack development experience. At ByteDance, she successfully designed and launched generative LLM prompt-chain engines that yielded over 1.5 million incremental monthly clicks. Furthermore, she independently founded and programmed a full-stack AI try-on platform (FitFrame) using React and Node.js. She has a deep understanding of LLM reasoning logic, user conversion optimization, and rapid design-to-prototype workflows.",
    scores: {
      technical: 98,
      product: 98,
      prototyping: 96,
      ownership: 98
    }
  },
  {
    candidateId: "cand_03",
    score: 78,
    recommendation: "Validate First",
    briefReason: "Hands-on student developer with a solid academic record and custom Vertex AI builds.",
    mainRisk: "Lacks formal industrial PM internship or commercial SaaS experience.",
    strengths: [
      {
        point: "Hands-on AI Prototyping",
        evidence: "Led a student team to build CareLink AI integrating Google Vertex AI prompts with React & Express backends."
      },
      {
        point: "Practical Automation Scripting",
        evidence: "Programmed DocSorter, a document routing system driven by an elegant custom YAML rule engine."
      },
      {
        point: "High-Quality Academic Standing",
        evidence: "Holds a 3.8 GPA in Computer Science, featuring in Dean's List and President's Honor Roll."
      }
    ],
    risks: [
      {
        point: "No corporate or industrial experience",
        evidence: "Experience is limited to student volunteer associations (SWE) and academic coaching."
      }
    ],
    validationQuestions: [
      "In your CareLink AI project, how did you configure the prompts for Vertex AI to ensure clinical answers remained accurate and personalised?",
      "How did you design the YAML-based rule structures in DocSorter? What did you do to handle errors or invalid file states?",
      "This role is a fast-paced product internship. Can you describe how you would balance technical speed with fine usability details?"
    ],
    clientSummary: "Priya is a technically grounded Computer Science student from Cal Poly Pomona with a flawless academic record and high-quality AI app builds. She recently led a student engineering team that received accolades in Google's Student AI Challenge for CareLink AI, a web assistant leveraging React, Express, and Google Vertex AI. She has a strong foundation in Python scripting, API integrations, and structured data handling. Her proactive leadership style is demonstrated through delivering Python workshops and organizing outreach pipelines.",
    scores: {
      technical: 82,
      product: 70,
      prototyping: 84,
      ownership: 76
    }
  },
  {
    candidateId: "cand_04",
    score: 45,
    recommendation: "Do Not Submit",
    briefReason: "Data analyst with solid quant skills but lacks software prototyping experience.",
    mainRisk: "No JS/TS frontend coding or user interface design exposure.",
    strengths: [
      {
        point: "Strong Quantitative Background",
        evidence: "Exceptional foundations in statistics, economic analytics, and financial data modelling from Purdue and BU."
      },
      {
        point: "Data Visualization Fluency",
        evidence: "Accomplished builder of Tableau dashboards and data pipelines for Estée Lauder and JPMorgan Chase."
      },
      {
        point: "Structured Text Analysis",
        evidence: "Built Boolean query pipelines and integrated FinBERT sentiment tracking in high-value business analytics setups."
      }
    ],
    risks: [
      {
        point: "Significant Tech Prototyping Gap",
        evidence: "Little exposure to JavaScript/TypeScript, React/Vite development, or interface design required to build product mockups."
      },
      {
        point: "No Product-Owner PM Experience",
        evidence: "Background is entirely data-consumption, statistics, and business intelligence reporting rather than workflow creation."
      }
    ],
    validationQuestions: [
      "Our internship involves personally writing React systems and deploying web products. How comfortable are you transitioning from pure python data scripts into building web interfaces?",
      "At China Merchants Bank, you collected client feedback. How would you translate that qualitative feedback into custom functional product features?",
      "What is your main strategy for learning TypeScript and React quickly from scratch to build client-facing tools?"
    ],
    clientSummary: "Li is an exceptionally capable business analyst and data analytics graduate student with solid skills in Python modeling, sentiment extraction, and database auditing. She has successfully led quantitative analytics projects with organizations like JPMorgan Chase and Estée Lauder, developing complex sentiment classifiers and tracking KPIs. Her deep analytical skills can provide strong data-driven support for business planning and market validation endeavors.",
    scores: {
      technical: 40,
      product: 50,
      prototyping: 30,
      ownership: 60
    }
  },
  {
    candidateId: "cand_05",
    score: 88,
    recommendation: "Ready to Submit",
    briefReason: "CS Master's; built Speech Coaching voice MVP and active AI prompting experience.",
    mainRisk: "No recent traditional in-office software engineering internships since 2018.",
    strengths: [
      {
        point: "Dual Technical & PM Capability",
        evidence: "Coded a Voice AI coaching tool in React and simultaneously acted as Product Owner & Scrum Master."
      },
      {
        point: "Professional Prompt Evaluation",
        evidence: "Conducts deep evaluations of multi-modal AI systems and prompt-chaining workflows at Outlier AI."
      },
      {
        point: "Outstanding Academic Achievement",
        evidence: "Maintained a perfect 4.0 GPA in his Master's at Portland State and 3.97 GPA at SPU."
      }
    ],
    risks: [
      {
        point: "Vague industrial software gaps",
        evidence: "No recent traditional in-office SWE internships (his last standard internship was in Summer 2018 at Salesforce)."
      }
    ],
    validationQuestions: [
      "At Outlier AI, what are the most common prompt engineering mistakes you see that cause language models to produce incorrect JSON or hallucinated outputs?",
      "For your Capstone project, how did you handle the real-time audio latency between Deepgram Voice AI and the React frontend?",
      "You served as both Product Owner and Developer on your capstone. How did you resolve trade-offs between neat code and fast feature delivery?"
    ],
    clientSummary: "Jordan is a highly accomplished Computer Science Graduate student who excels both as a technical developer and a collaborative product coordinator. His experience as an AI Quality Evaluator at Outlier AI gives him specialized, daily knowledge of prompt refinement, LLM evaluations, and code validation. Additionally, he successfully built and launched a real-time Voice AI pronunciation helper using React and the OpenAI API, where he acted as Scrum Master and Product Owner. He is highly technically fluent, organized, and understands how to deliver modern AI features.",
    scores: {
      technical: 92,
      product: 85,
      prototyping: 88,
      ownership: 86
    }
  },
  {
    candidateId: "cand_06",
    score: 70,
    recommendation: "Validate First",
    briefReason: "Math & Data major; built clinical oncology LLM information extraction pipelines.",
    mainRisk: "Zero experience in frontend user interface development or design.",
    strengths: [
      {
        point: "Deep Mathematical & Data Foundations",
        evidence: "Applied Math & Data Science candidate with high-level statistics and statistical inference familiarity."
      },
      {
        point: "Practical LLM Parsing",
        evidence: "Applied LLMs to analyze unstructured clinical oncology notes and build knowledge graphs from raw data."
      },
      {
        point: "Advanced Python Prototyping",
        evidence: "Shipped complex robotic kinematics modules and Airflow data schedules independently."
      }
    ],
    risks: [
      {
        point: "Complete Lack of Frontend UI Focus",
        evidence: "Resume shows no web development (TypeScript, CSS, React) or product mapping experience."
      },
      {
        point: "Highly Technical / Research Leaning",
        evidence: "May be more naturally drawn to data cleaning pipelines rather than sketching and coding everyday recruiter tools."
      }
    ],
    validationQuestions: [
      "In your Zhejiang University internship, how did you instruct LLMs to extract clinical case details consistently, and what did you do to validate accuracy?",
      "Tell us about your Restaurant Operations Simulation setup: how would you transform that backend priority queue python script into an interactive web dashboard?",
      "Are you interested in learning frontend design and building user-facing product features, or do you prefer to stay on server-side python pipelines?"
    ],
    clientSummary: "Yuxuan is an incredibly strong quantitative candidate from UC Davis with a double-focus in Applied Mathematics and Data Science. She has excellent experience engineering technical data pipelines, including training predictive models at Tencent and applying LLMs to parse oncology data reports at Zhejiang University. Yuxuan is highly capable in Python, SQL, and data automation, making her outstandingly qualified to build robust, back-end scraping engines, algorithmic pipelines, or structured text orchestration frameworks.",
    scores: {
      technical: 85,
      product: 50,
      prototyping: 60,
      ownership: 80
    }
  },
  {
    candidateId: "cand_07",
    score: 94,
    recommendation: "Ready to Submit",
    briefReason: "Yale co-founder (Nexbridge) & Product Intern at Auris Robotics shipping workflows.",
    mainRisk: "Very early in academic path (Yale freshman, Class of 2029).",
    strengths: [
      {
        point: "Direct Startup Product Experience",
        evidence: "Served as Product Intern inside Auris Robotics, shipping task managers and custom chatbot integrations directly with founders."
      },
      {
        point: "Proven 0-1 Builder",
        evidence: "Co-founded an active ambient communication tool (Nexbridge), programming mobile sync features and onboarding over 200 users."
      },
      {
        point: "Elite Communications Skills",
        evidence: "Head of School at Winchester, national debate competitor, and active venture sourcing analyst."
      }
    ],
    risks: [
      {
        point: "Very Junior Academic Status",
        evidence: "Yale Freshman (Class of 2029); will have university commitments for several years, which may prevent full-time conversion soon."
      }
    ],
    validationQuestions: [
      "How did you design the calendar sync and availability signaling logic for Nexbridge? What tech stack did you use to support real-time state?",
      "At Auris Robotics, you built an onboarding chatbot. What were the main user bottlenecks you solved, and what LLM prompt strategy did you use?",
      "Given your stellar venture and co-founder experience, how do you see this product internship feeding into your long-term startup ambitions?"
    ],
    clientSummary: "Alex is an exceptionally dynamic and highly driven candidate from Yale University who already possesses remarkable 0-1 product building credentials. As the Co-founder of Nexbridge, he led full-stack development and scaled the platform to over 200 active users. Furthermore, as a Product Intern at Auris Robotics, Alex worked alongside founders to design and ship workflow automations, including building custom client onboarding chatbots. He has superb business sensitivity, excellent communication, and an outstanding capability to turn ideas into functional prototypes.",
    scores: {
      technical: 90,
      product: 95,
      prototyping: 92,
      ownership: 95
    }
  }
];

export const initialHumanDecisions: Record<string, HumanDecision> = {
  cand_01: {
    candidateId: "cand_01",
    status: "pending",
    overrideRecommendation: "Ready to Submit",
    editedSummary: "Ryan is a highly accomplished candidate combining elite tech-product management with hands-on AI prototyping. Having co-founded two platforms where he served as Head of Product, Ryan excels at translating stakeholder vision into prioritized backlog execution in Jira and Figma. He brings deep technical expertise in Next.js, Node.js, and Python, coupled with a proven ability to ship high-speed AI tools, including winning an award for a voice-enabled AI study assistant. He is a self-directed, high-impact builder ideal for high-growth teams.",
    editedQuestions: [
      "Since you are currently active as a Co-founder & Head of Product at Chainflow Labs, how do you plan to manage your schedule and commitment for this internship?",
      "In your FlowAI project, you built a modular LangGraph orchestration roadmap. What main challenges did you face with multi-agent orchestration, and how did you resolve them?",
      "Tell us about the 1-day hackathon where you built StudyBot AI—what was your exact role and how did you select which features would make the MVP?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  },
  cand_02: {
    candidateId: "cand_02",
    status: "pending",
    overrideRecommendation: "Ready to Submit",
    editedSummary: "Ruoxi is an exceptional product-builder candidate who possesses a rare combination of formal LLM prompt product management and hands-on full-stack development experience. At ByteDance, she successfully designed and launched generative LLM prompt-chain engines that yielded over 1.5 million incremental monthly clicks. Furthermore, she independently founded and programmed a full-stack AI try-on platform (FitFrame) using React and Node.js. She has a deep understanding of LLM reasoning logic, user conversion optimization, and rapid design-to-prototype workflows.",
    editedQuestions: [
      "At ByteDance, you proposed a generative LLM framework with structured prompts. What was your systematic framework for testing and versioning those prompts?",
      "Could you walk us through the system architecture of your startup, FitFrame? How did you manage image storage orchestration and model API latency?",
      "You have worked at very large companies (ByteDance, Ping An, OPPO) as well as founded your own startup. Which environment do you prefer and why?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  },
  cand_03: {
    candidateId: "cand_03",
    status: "pending",
    overrideRecommendation: "Validate First",
    editedSummary: "Priya is a technically grounded Computer Science student from Cal Poly Pomona with a flawless academic record and high-quality AI app builds. She recently led a student engineering team that received accolades in Google's Student AI Challenge for CareLink AI, a web assistant leveraging React, Express, and Google Vertex AI. She has a strong foundation in Python scripting, API integrations, and structured data handling. Her proactive leadership style is demonstrated through delivering Python workshops and organizing outreach pipelines.",
    editedQuestions: [
      "In your CareLink AI project, how did you configure the prompts for Vertex AI to ensure clinical answers remained accurate and personalised?",
      "How did you design the YAML-based rule structures in DocSorter? What did you do to handle errors or invalid file states?",
      "This role is a fast-paced product internship. Can you describe how you would balance technical speed with fine usability details?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  },
  cand_04: {
    candidateId: "cand_04",
    status: "pending",
    overrideRecommendation: "Do Not Submit",
    editedSummary: "Li is an exceptionally capable business analyst and data analytics graduate student with solid skills in Python modeling, sentiment extraction, and database auditing. She has successfully led quantitative analytics projects with organizations like JPMorgan Chase and Estée Lauder, developing complex sentiment classifiers and tracking KPIs. Her deep analytical skills can provide strong data-driven support for business planning and market validation endeavors.",
    editedQuestions: [
      "Our internship involves personally writing React systems and deploying web products. How comfortable are you transitioning from pure python data scripts into building web interfaces?",
      "At China Merchants Bank, you collected client feedback. How would you translate that qualitative feedback into custom functional product features?",
      "What is your main strategy for learning TypeScript and React quickly from scratch to build client-facing tools?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  },
  cand_05: {
    candidateId: "cand_05",
    status: "pending",
    overrideRecommendation: "Ready to Submit",
    editedSummary: "Jordan is a highly accomplished Computer Science Graduate student who excels both as a technical developer and a collaborative product coordinator. His experience as an AI Quality Evaluator at Outlier AI gives him specialized, daily knowledge of prompt refinement, LLM evaluations, and code validation. Additionally, he successfully built and launched a real-time Voice AI pronunciation helper using React and the OpenAI API, where he acted as Scrum Master and Product Owner. He is highly technically fluent, organized, and understands how to deliver modern AI features.",
    editedQuestions: [
      "At Outlier AI, what are the most common prompt engineering mistakes you see that cause language models to produce incorrect JSON or hallucinated outputs?",
      "For your Capstone project, how did you handle the real-time audio latency between Deepgram Voice AI and the React frontend?",
      "You served as both Product Owner and Developer on your capstone. How did you resolve trade-offs between neat code and fast feature delivery?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  },
  cand_06: {
    candidateId: "cand_06",
    status: "pending",
    overrideRecommendation: "Validate First",
    editedSummary: "Yuxuan is an incredibly strong quantitative candidate from UC Davis with a double-focus in Applied Mathematics and Data Science. She has excellent experience engineering technical data pipelines, including training predictive models at Tencent and applying LLMs to parse oncology data reports at Zhejiang University. Yuxuan is highly capable in Python, SQL, and data automation, making her outstandingly qualified to build robust, back-end scraping engines, algorithmic pipelines, or structured text orchestration frameworks.",
    editedQuestions: [
      "In your Zhejiang University internship, how did you instruct LLMs to extract clinical case details consistently, and what did you do to validate accuracy?",
      "Tell us about your Restaurant Operations Simulation setup: how would you transform that backend priority queue python script into an interactive web dashboard?",
      "Are you interested in learning frontend design and building user-facing product features, or do you prefer to stay on server-side python pipelines?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  },
  cand_07: {
    candidateId: "cand_07",
    status: "pending",
    overrideRecommendation: "Ready to Submit",
    editedSummary: "Alex is an exceptionally dynamic and highly driven candidate from Yale University who already possesses remarkable 0-1 product building credentials. As the Co-founder of Nexbridge, he led full-stack development and scaled the platform to over 200 active users. Furthermore, as a Product Intern at Auris Robotics, Alex worked alongside founders to design and ship workflow automations, including building custom client onboarding chatbots. He has superb business sensitivity, excellent communication, and an outstanding capability to turn ideas into functional prototypes.",
    editedQuestions: [
      "How did you design the calendar sync and availability signaling logic for Nexbridge? What tech stack did you use to support real-time state?",
      "At Auris Robotics, you built an onboarding chatbot. What were the main user bottlenecks you solved, and what LLM prompt strategy did you use?",
      "Given your stellar venture and co-founder experience, how do you see this product internship feeding into your long-term startup ambitions?"
    ],
    recruiterNotes: "",
    validatedQuestionsCompleted: {}
  }
};
