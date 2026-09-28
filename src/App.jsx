import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import IntroTag from "./sections/IntroTag";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Journey from "./sections/Journey";
import GithubActivity from "./sections/GithubActivity";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-contrast focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <IntroTag />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <GithubActivity />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
