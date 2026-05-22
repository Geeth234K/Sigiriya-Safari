export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="max-w-2xl text-base leading-relaxed text-emerald-100/80">{description}</p>}
    </div>
  );
}
