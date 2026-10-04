import { Coffee, Network, Sparkles } from "lucide-react";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFlask,
  SiFlyway,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiSqlite,
  SiSwagger,
  SiVite,
} from "react-icons/si";

// Real brand logos where one exists. A couple of entries have no
// official/trademark-free brand mark (Java's coffee-cup logo is
// trademarked, and "REST APIs" / "Prompt Engineering" / "Generative AI"
// are concepts, not products) — those get a fitting generic icon
// instead, called out below.
export const skillIcons = {
  Java: { Icon: Coffee, color: "#8c5a2b" }, // no free brand mark for Java itself
  Python: { Icon: SiPython, color: "#3776AB" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  PHP: { Icon: SiPhp, color: "#777BB4" },

  React: { Icon: SiReact, color: "#61DAFB" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },

  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  "Express.js": { Icon: SiExpress, color: "#5F5F5F" },
  Flask: { Icon: SiFlask, color: "#5F5F5F" },

  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  SQLite: { Icon: SiSqlite, color: "#003B57" },

  "Prompt Engineering": { Icon: Sparkles, color: "#a8792f" }, // concept, not a product
  "Generative AI": { Icon: Sparkles, color: "#a8792f" }, // concept, not a product
  LangChain: { Icon: SiLangchain, color: "#1C3C3C" },
  Ollama: { Icon: SiOllama, color: "#2b2013" },

  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "#2b2013" },
  "REST APIs": { Icon: Network, color: "#a8792f" }, // no single brand mark for REST itself
  Swagger: { Icon: SiSwagger, color: "#85EA2D" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "Docker Compose": { Icon: SiDocker, color: "#2496ED" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  Flyway: { Icon: SiFlyway, color: "#CC0200" },
};
