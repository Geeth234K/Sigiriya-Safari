import SectionHeading from "./SectionHeading";

export default function GallerySection({ data }) {
  return (
    <section className="relative bg-[#050b08] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((image) => (
            <div
              key={image.image}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/30"
            >
              <img
                src={image.image}
                alt={image.alt}
                className="h-full w-full transform object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-emerald-50 opacity-0 transition duration-300 group-hover:opacity-100">
                {image.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
