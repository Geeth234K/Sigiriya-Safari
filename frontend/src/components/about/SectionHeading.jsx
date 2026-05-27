export default function SectionHeading({ eyebrow, title, description, align = "left", tone = "dark" }) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const isLight = tone === "light";
  const eyebrowClassName = isLight
    ? "inline-flex items-center gap-2 rounded-full border border-[var(--eyebrow-border)] bg-[var(--eyebrow-bg)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--eyebrow-text)] shadow-[var(--eyebrow-shadow)]"
    : "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100";
  const titleClassName = isLight
    ? "font-display text-3xl text-[var(--text)] sm:text-4xl lg:text-5xl"
    : "font-display text-3xl text-white sm:text-4xl lg:text-5xl";
  const descriptionClassName = isLight
    ? "max-w-2xl text-base leading-relaxed text-[var(--muted)]"
    : "max-w-2xl text-base leading-relaxed text-emerald-100/80";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className={eyebrowClassName}>{eyebrow}</span>
      )}
      <h2 className={titleClassName}>{title}</h2>
      {description && <p className={descriptionClassName}>{description}</p>}
    </div>
  );
}
