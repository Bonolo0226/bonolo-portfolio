import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";
import FloatingSkills from "../components/FloatingSkills";

export default function Skills() {
  return (
    <SectionPanel id="skills">
      <ScrollReveal>
        <SectionHeading
          title="Tech Stack"
          description="A living set of tools I'm building with, learning, or comfortable reaching for - hover a logo for details."
        />
      </ScrollReveal>

      <FloatingSkills />
    </SectionPanel>
  );
}
