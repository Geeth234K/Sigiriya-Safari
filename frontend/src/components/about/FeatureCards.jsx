import { FaMountain, FaPaw, FaPeopleGroup, FaSun } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

const iconMap = {
  lion: FaMountain,
  wildlife: FaPaw,
  village: FaPeopleGroup,
  sunrise: FaSun
};

function FeatureCard({ feature, index }) {
  const Icon = iconMap[feature.icon] || FaMountain;

  return (
    <div
      className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-emerald-300/60"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--eyebrow-border)] bg-[var(--primary-soft)] text-[var(--primary)] shadow-inner">
        <Icon className="text-2xl" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[var(--primary)]">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{feature.description}</p>
    </div>
  );
}

export default function FeatureCards({ data }) {
  return (
    <section className="relative bg-[var(--surface)] py-20 text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          align="center"
          tone="light"
        />
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-400" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
