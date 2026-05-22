export default function HeroSection({ data }) {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#050b08] text-white">
      <div className="absolute inset-0">
        <img
          src={data.backgroundImage}
          alt="Sigiriya rock at sunrise"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050b08]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <span className="animate-fade-in rounded-full border border-emerald-200/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">
          {data.badge}
        </span>
        <h1
          className="animate-fade-up font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {data.title}
        </h1>
        <p
          className="animate-fade-up max-w-3xl text-base leading-relaxed text-emerald-50/80 sm:text-lg"
          style={{ animationDelay: "220ms" }}
        >
          {data.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-emerald-100/80">
          {data.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
