/**
 * Wraps a section's content in a large, rounded glass panel that
 * floats on the golden background — the structural building block
 * used across the whole site instead of full-bleed flat sections.
 */
export default function SectionPanel({
  id,
  children,
  className = "",
  strong = false,
}) {
  return (
    <section id={id} className="px-4 py-10 sm:px-6 sm:py-14">
      <div
        className={`glass-sheen-wrap relative mx-auto max-w-6xl overflow-hidden rounded-[32px] p-6 sm:p-10 lg:p-14 ${
          strong ? "glass-strong" : "glass"
        } ${className}`}
      >
        <span className="glass-sheen" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}
