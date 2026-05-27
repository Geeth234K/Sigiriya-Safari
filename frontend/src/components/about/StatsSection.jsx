import { useEffect, useState } from "react";
import { FaCrown, FaMountain, FaTree, FaUsers } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

const iconMap = {
  heritage: FaCrown,
  height: FaMountain,
  visitors: FaUsers,
  parks: FaTree
};

function useCountUp(target) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1200;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return count;
}

function StatCard({ stat }) {
  const Icon = iconMap[stat.icon] || FaCrown;
  const count = useCountUp(stat.value);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--eyebrow-border)] bg-[var(--primary-soft)] text-[var(--primary)]">
          <Icon className="text-xl" />
        </div>
        <div>
          <p className="text-3xl font-semibold text-[var(--text)]">
            {count.toLocaleString()}
            {stat.suffix}
          </p>
          <p className="text-sm text-[var(--muted)]">{stat.label}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{stat.description}</p>
    </div>
  );
}

export default function StatsSection({ data }) {
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
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
