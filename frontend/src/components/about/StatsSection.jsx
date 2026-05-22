import { useEffect, useState } from "react";
import { FaCrown, FaMountain, FaPersonHiking, FaTree } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

const iconMap = {
  heritage: FaCrown,
  height: FaMountain,
  visitors: FaPersonHiking,
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 backdrop-blur transition duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-100">
          <Icon className="text-xl" />
        </div>
        <div>
          <p className="text-3xl font-semibold text-white">
            {count.toLocaleString()}
            {stat.suffix}
          </p>
          <p className="text-sm text-emerald-100/70">{stat.label}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-emerald-100/70">{stat.description}</p>
    </div>
  );
}

export default function StatsSection({ data }) {
  return (
    <section className="relative bg-[#050b08] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
