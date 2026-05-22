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
      className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 backdrop-blur transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-emerald-300/40"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200 shadow-inner">
        <Icon className="text-2xl" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-emerald-50">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-emerald-100/70">{feature.description}</p>
    </div>
  );
}

export default function FeatureCards({ data }) {
  return (
    <section className="relative bg-[#050b08] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
