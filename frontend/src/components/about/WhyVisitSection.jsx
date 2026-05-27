import { FaLeaf, FaTree, FaUsers, FaWater, FaWandMagicSparkles } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

const iconMap = {
  culture: FaWandMagicSparkles,
  wildlife: FaLeaf,
  eco: FaTree,
  family: FaUsers,
  landscape: FaWater
};

export default function WhyVisitSection({ data }) {
  return (
    <section className="relative bg-[var(--surface)] py-20 text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          tone="light"
        />
        <div className="mt-4 h-1 w-20 rounded-full bg-emerald-400" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((reason) => {
            const Icon = iconMap[reason.icon] || FaLeaf;
            return (
              <div
                key={reason.title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--eyebrow-border)] bg-[var(--primary-soft)] text-[var(--primary)]">
                  <Icon className="text-xl" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--primary)]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
