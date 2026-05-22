import { useEffect, useState } from "react";
import AboutSection from "../../components/about/AboutSection";
import FeatureCards from "../../components/about/FeatureCards";
import GallerySection from "../../components/about/GallerySection";
import HeroSection from "../../components/about/HeroSection";
import StatsSection from "../../components/about/StatsSection";
import WhyVisitSection from "../../components/about/WhyVisitSection";
import { fetchAboutPage } from "../../services/aboutService";

export default function AboutSigiriya() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadAbout = async () => {
      try {
        const data = await fetchAboutPage();
        if (isMounted) {
          setAboutData(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.error || "Unable to load the About page content right now.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadAbout();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050b08] text-white">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-xl backdrop-blur">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-300/40 border-t-emerald-200" />
          <p className="text-sm text-emerald-100/80">Loading Sigiriya Safari stories...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050b08] text-white">
        <div className="max-w-md rounded-3xl border border-rose-400/30 bg-rose-500/10 px-8 py-10 text-center shadow-xl backdrop-blur">
          <p className="text-lg font-semibold text-rose-100">Something went wrong</p>
          <p className="mt-2 text-sm text-rose-100/80">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#050b08] text-white">
      <HeroSection data={aboutData.hero} />
      <AboutSection data={aboutData.about} />
      <FeatureCards data={aboutData.features} />
      <StatsSection data={aboutData.stats} />
      <GallerySection data={aboutData.gallery} />
      <WhyVisitSection data={aboutData.whyVisit} />
    </main>
  );
}
