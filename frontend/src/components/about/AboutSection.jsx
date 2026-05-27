import SectionHeading from "./SectionHeading";

export default function AboutSection({ data }) {
  return (
    <section className="relative bg-[var(--surface)] py-20 text-[var(--text)]">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} tone="light" />
          <div className="grid gap-6 sm:grid-cols-2">
            {data.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
              >
                <h3 className="text-lg font-semibold text-[var(--primary)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-strong)]">
            <img src={data.image} alt={data.imageAlt} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b08]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted-strong)] backdrop-blur">
              {data.caption}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
