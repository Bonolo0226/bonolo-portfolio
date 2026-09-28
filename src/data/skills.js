// level: "building-with" = actively used in shipped projects
//        "learning"      = currently sharpening, used in progress
//        "familiar"      = exposed to it, comfortable reading/using with reference
export const skillGroups = [
  {
    label: "Programming",
    skills: [
      { name: "Java", level: "building-with" },
      { name: "Python", level: "building-with" },
      { name: "JavaScript", level: "building-with" },
      { name: "Kotlin", level: "learning" },
      { name: "PHP", level: "familiar" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", level: "building-with" },
      { name: "Vite", level: "building-with" },
      { name: "HTML", level: "building-with" },
      { name: "CSS", level: "building-with" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Spring Boot", level: "building-with" },
      { name: "Node.js", level: "building-with" },
      { name: "Express.js", level: "building-with" },
      { name: "Flask", level: "building-with" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", level: "building-with" },
      { name: "MySQL", level: "building-with" },
      { name: "MongoDB", level: "building-with" },
      { name: "SQLite", level: "familiar" },
    ],
  },
  {
    label: "AI",
    skills: [
      { name: "Prompt Engineering", level: "building-with" },
      { name: "Generative AI", level: "building-with" },
      { name: "LangChain", level: "learning" },
      { name: "Ollama", level: "learning" },
    ],
  },
  {
    label: "Tools & Infrastructure",
    skills: [
      { name: "Git", level: "building-with" },
      { name: "GitHub", level: "building-with" },
      { name: "REST APIs", level: "building-with" },
      { name: "Swagger", level: "building-with" },
      { name: "Docker", level: "learning" },
      { name: "Docker Compose", level: "learning" },
      { name: "Redis", level: "learning" },
      { name: "Flyway", level: "learning" },
    ],
  },
];

export const levelLabels = {
  "building-with": "Building With",
  learning: "Learning",
  familiar: "Familiar",
};
