import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import type { Category } from "./data";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Categories from "./components/Categories";
import Menu from "./components/Menu";
import Offers from "./components/Offers";
import Marquee from "./components/Marquee";
import Track from "./components/Track";
import Why from "./components/Why";
import Reviews from "./components/Reviews";
import Download from "./components/Download";
import Footer from "./components/Footer";
import { BackToTop, CursorGlow, ScrollProgress } from "./components/Extras";

export type Sel = Category | "All";

const ticker = ["Fast Delivery", "Fresh & Hot", "50% Off First Order", "Live Order Tracking", "500+ Restaurants", "Free Delivery Above $20"];

export default function App() {
  const [ready, setReady] = useState(false);
  const [sel, setSel] = useState<Sel>("All");

  useEffect(() => {
    if (ready) setTimeout(() => ScrollTrigger.refresh(), 300);
  }, [ready]);

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Preloader onDone={() => setReady(true)} />
      <Navbar ready={ready} />
      <main className="relative z-10">
        <Hero ready={ready} />
        <Stats />
        <Categories sel={sel} onSelect={setSel} />
        <Menu sel={sel} onSelect={setSel} />
        <Offers />
        <Marquee duration={28} className="mt-14 border-y border-neon/30 bg-neon/[0.06] py-4">
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-6 pr-6 font-display text-lg font-bold uppercase tracking-[0.2em] text-white/80">
              {t} <span className="text-neon text-glow">✦</span>
            </span>
          ))}
        </Marquee>
        <Track />
        <Why />
        <Reviews />
        <Download onChooseCategory={setSel} />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
