import { FaCameraRetro, FaLeaf, FaTree, FaUsers, FaWater, FaWandMagicSparkles } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

const iconMap = {
  culture: FaWandMagicSparkles,
  wildlife: FaLeaf,
  photography: FaCameraRetro,
  eco: FaTree,
  family: FaUsers,
  landscape: FaWater
};

export default function WhyVisitSection({ data }) {
  return (
    <section className="relative bg-[#050b08] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((reason) => {
            const Icon = iconMap[reason.icon] || FaLeaf;
            return (
              <div
                key={reason.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 backdrop-blur transition duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-100">
                  <Icon className="text-xl" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-50">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/70">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
