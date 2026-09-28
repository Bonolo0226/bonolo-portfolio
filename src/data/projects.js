export const projects = [
  {
    id: "openex",
    name: "OpenEx 3.0",
    tagline: "Simulated Crypto Exchange & AI Trading Terminal",
    description:
      "A simulated cryptocurrency exchange and AI-powered trading terminal, built as a full-stack, microservice-style application across a 3-week bootcamp sprint.",
    featured: true,
    categories: ["full-stack", "ai", "backend"],
    technologies: [
      "Kotlin",
      "Spring Boot",
      "PostgreSQL",
      "Flyway",
      "React",
      "Vite",
      "Python",
      "Flask",
      "LangChain",
      "Ollama",
      "Redis",
      "Docker",
    ],
    features: [
      "Order matching engine for limit and market orders",
      "Double-entry ledger for accurate balance tracking",
      "Market data service feeding live prices to the frontend",
      "AI trading assistant for market context and explanations",
      "React dashboard consuming REST APIs",
      "Docker-based, microservice-style architecture",
    ],
    caseStudy: {
      problem:
        "Simulating a working exchange means more than a price feed and a buy button - it means orders have to match fairly, balances have to reconcile exactly, and an AI assistant layered on top has to reason about real state without corrupting it.",
      solution:
        "I split the system into services with clear boundaries: a Spring Boot/Kotlin service owns the matching engine and the ledger, a Python/Flask service handles the AI trading assistant via LangChain and Ollama, and a React dashboard talks to both over REST. PostgreSQL is the source of truth, versioned with Flyway migrations, and Redis sits in front of the hottest market-data reads.",
      role: "Sole developer - architecture, backend services, database design, AI integration, and the frontend dashboard.",
      architecture:
        "Matching Engine (Kotlin/Spring Boot) ↔ PostgreSQL (ledger + orders) ↔ Redis (market data cache) ↔ AI Assistant (Python/Flask + LangChain/Ollama) ↔ React/Vite dashboard, containerized with Docker.",
      challenges: [
        "Keeping the ledger consistent under concurrent order matching, so two trades can never double-spend the same balance.",
        "Getting an AI assistant to answer questions about live trading data without it inventing numbers that weren't actually in the ledger.",
        "Coordinating three separately-runnable services (Kotlin, Python, React) into one coherent local Docker setup.",
      ],
      learnings:
        "This project pushed me to think in terms of service boundaries and data ownership rather than one big application - and to be deliberate about where an AI component is allowed to act versus only allowed to read and explain.",
    },
    github: "https://github.com/Bonolo0226/openex",
    live: "",
  },
  {
    id: "deskflow",
    name: "DeskFlow",
    tagline: "IT Service Request Portal",
    description:
      "A full-stack internal IT service request platform that streamlines how employees log issues and how IT staff triage and manage tickets.",
    featured: true,
    categories: ["full-stack", "web"],
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Axios",
      "Swagger",
    ],
    features: [
      "Employee ticket creation with department-based routing",
      "Role-based interfaces for employees vs. IT staff",
      "Ticket status management and workflow",
      "Authentication flow for both user roles",
      "Documented REST API via Swagger",
      "A concept for AI-assisted ticket classification",
    ],
    caseStudy: {
      problem:
        "Internal IT requests are often scattered across email and chat, with no shared view of what's open, who owns it, or how urgent it is.",
      solution:
        "DeskFlow gives employees a simple form to raise a request against a department, and gives IT staff a dedicated interface to see, claim, and update tickets — backed by a documented Express/MongoDB API that a mobile client or Slack bot could plug into later.",
      role: "Sole developer - data modeling, Express API, MongoDB schema design, React frontend, and API documentation.",
      architecture:
        "React/Vite frontend ↔ Axios ↔ Express REST API ↔ Mongoose ↔ MongoDB, with Swagger documenting every endpoint.",
      challenges: [
        "Designing a ticket schema flexible enough for different departments without becoming a pile of optional fields.",
        "Separating employee and IT-staff views cleanly while sharing most of the underlying components.",
        "Writing API documentation that stayed accurate as the endpoints changed during the sprint.",
      ],
      learnings:
        "Built within a 5-day sprint assessment, this project sharpened how quickly I can go from a data model to a working, documented API — and reinforced why documenting endpoints as you build them beats doing it at the end.",
    },
    github: "",
    live: "https://desk-flow-cyan.vercel.app",
    apiDocs: "https://deskflow-rr2o.onrender.com/api-docs",
  },
  {
    id: "timetracker-pro",
    name: "TimeTracker Pro",
    tagline: "Employee Clock In / Clock Out System",
    description:
      "A PHP/MySQL attendance management system that records employee clock-in and clock-out activity and gives administrators reporting on worked time.",
    featured: false,
    categories: ["full-stack", "web"],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Separate employee and admin authentication",
      "Clock in / clock out flow",
      "Attendance tracking and history",
      "Employee management for admins",
      "Worked-time calculations and attendance reports",
      "Dashboard analytics for admins",
    ],
    caseStudy: {
      problem:
        "Small teams often track attendance manually, which makes worked-hours reporting slow and error-prone.",
      solution:
        "TimeTracker Pro gives employees a simple clock-in/clock-out flow and gives admins a dashboard that calculates worked time and surfaces attendance reports automatically from the same records.",
      role: "Sole developer - database schema, PHP backend logic, and the admin/employee interfaces.",
      architecture:
        "PHP handles server-side logic and session-based authentication, querying a MySQL database of employees and attendance records; the frontend is server-rendered HTML/CSS with JavaScript for interactivity.",
      challenges: [
        "Calculating worked hours correctly across edge cases like a missed clock-out.",
        "Keeping employee and admin authentication cleanly separated in a framework-free PHP setup.",
      ],
      learnings:
        "A good reminder that a practical business tool doesn't need a heavy framework - clear schema design and careful server-side logic go a long way.",
    },
    github: "",
    live: "",
  },
  {
    id: "budgetbot",
    name: "BudgetBot Money Mentor",
    tagline: "AI-Powered Budgeting Assistant",
    description:
      "An AI-powered budgeting and financial guidance concept, exploring how a prompt-driven assistant can help someone think through everyday money decisions.",
    featured: false,
    categories: ["ai", "web"],
    technologies: ["Generative AI", "Prompt Engineering"],
    features: [
      "Conversational, prompt-driven financial guidance",
      "User-focused, approachable interface",
      "Applied prompt engineering for a specific, practical use case",
    ],
    caseStudy: {
      problem:
        "Generic AI chatbots are impressive but rarely useful for a specific, everyday task like budgeting.",
      solution:
        "BudgetBot narrows the scope to one job - helping someone reason through a budgeting question - through carefully constrained prompts and a simple, focused interface.",
      role: "Designed the concept, the interaction flow, and the prompts driving the assistant.",
      architecture:
        "A prompt-driven AI interaction layered over a lightweight user interface.",
      challenges: [
        "Keeping the assistant's guidance genuinely useful rather than generic, without it overstepping into formal financial advice.",
      ],
      learnings:
        "Good prompt engineering is mostly about scope - deciding what the assistant should refuse to do is as important as what it should help with.",
    },
    github: "",
    live: "https://budgetbot-money-mentor.lovable.app",
  },
  {
    id: "ai-content-generator",
    name: "AI Content Generator",
    tagline: "Generative AI Writing Tool",
    description:
      "A generative AI tool exploring prompt-driven content generation workflows and how to shape raw model output into something usable.",
    featured: false,
    categories: ["ai", "web"],
    technologies: ["Generative AI", "Prompt Engineering"],
    features: [
      "Prompt-driven content generation",
      "Applied generative AI workflow",
      "AI-powered user interaction",
    ],
    caseStudy: {
      problem:
        "Raw generative AI output is often unfocused unless the prompting and workflow around it are deliberately designed.",
      solution:
        "This project experiments with structuring prompts and the surrounding interface so the generated content stays on-task and usable.",
      role: "Designed the prompt workflow and the interface around it.",
      architecture: "A prompt-engineering layer driving a generative AI workflow.",
      challenges: [
        "Getting consistent, on-topic output from prompt design alone, without fine-tuning a model.",
      ],
      learnings:
        "Reinforced how much of an AI product's quality comes from prompt structure rather than the underlying model itself.",
    },
    github: "",
    live: "https://prompt-forgesa.lovable.app",
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis Tool",
    tagline: "Python Sentiment Analysis with Streamlit",
    description:
      "A Python data analysis project applying sentiment analysis techniques to text data, with a Streamlit interface for exploring the results.",
    featured: false,
    categories: ["ai", "data"],
    technologies: ["Python", "Streamlit"],
    features: [
      "Text sentiment classification",
      "Interactive Streamlit interface for exploring results",
      "Applied data analysis and AI/ML concepts",
    ],
    caseStudy: {
      problem:
        "Sentiment in text is easy to eyeball on a handful of examples but hard to assess at any scale without tooling.",
      solution:
        "This tool runs sentiment analysis over a dataset and surfaces the results through an interactive Streamlit interface, rather than a static script output.",
      role: "Built the analysis logic and the Streamlit interface.",
      architecture: "Python sentiment-analysis pipeline surfaced through a Streamlit app.",
      challenges: [
        "Presenting analysis results in a way that's actually explorable, not just a wall of numbers.",
      ],
      learnings:
        "A useful hands-on introduction to applied data analysis and how quickly Streamlit can turn a script into something interactive.",
    },
    github: "",
    live: "",
  },
];

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "full-stack", label: "Full-Stack" },
  { key: "ai", label: "AI" },
  { key: "backend", label: "Backend" },
  { key: "web", label: "Web" },
  { key: "data", label: "Data" },
];
