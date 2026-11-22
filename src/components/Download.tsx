import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Clock, Flame, Heart, Sparkles, Star } from "lucide-react";
import { gsap, scrollToId } from "../lib/gsap";
import { categories, dishes, type Category } from "../data";

const cravings: { title: string; mood: string; category: Category; icon: typeof Heart }[] = [
  { title: "Comfort food", mood: "Warm and satisfying", category: "Pasta", icon: Heart },
  { title: "Bold and spicy", mood: "Big flavor, real heat", category: "Biryani", icon: Flame },
  { title: "Fresh and light", mood: "Bright, clean flavors", category: "Sushi", icon: Sparkles },
  { title: "Sweet finish", mood: "A little treat", category: "Desserts", icon: Star },
];

export default function Download({ onChooseCategory }: { onChooseCategory: (category: Category) => void }) {
  const root = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("Biryani");
  const activeCraving = cravings.find((craving) => craving.category === activeCategory) ?? cravings[0];
  const activeDish = dishes.find((dish) => dish.cat === activeCategory) ?? dishes[0];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: root.current, start: "top 75%" };
      gsap.from(".dl-box", { opacity: 0, y: 32, duration: 0.8, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(".dl-option", { opacity: 0, y: 18, stagger: 0.08, duration: 0.55, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(".dl-match", { opacity: 0, x: 28, duration: 0.75, delay: 0.15, ease: "power3.out", scrollTrigger: trigger });
    }, root);
    return () => ctx.revert();
  }, []);

  const choose = (category: Category) => {
    setActiveCategory(category);
    onChooseCategory(category);
    scrollToId("menu");
  };

  return (
    <section ref={root} id="discover" className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
      <div className="dl-box neon-border-soft relative overflow-hidden rounded-3xl bg-gradient-to-br from-neon/10 via-[#0a0509] to-[#0a0509] p-5 md:p-8">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-neon/20 blur-[100px]" />
        <div className="relative grid items-center gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 font-display text-[10px] font-bold tracking-[0.18em] text-neon">
              <Sparkles size={13} /> FLAVOR FINDER
            </div>
            <h2 className="section-title mt-4 text-2xl md:text-3xl">What sounds good today?</h2>
            <p className="mt-2 max-w-xl text-sm text-white/60 md:text-base">Pick a craving and get a quick recommendation from our menu.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {cravings.map((craving) => {
                const category = categories.find((item) => item.name === craving.category)!;
                const Icon = craving.icon;
                const selected = activeCategory === craving.category;

                return (
                  <button
                    key={craving.category}
                    type="button"
                    onClick={() => setActiveCategory(craving.category)}
                    aria-pressed={selected}
                    className={`dl-option group relative overflow-hidden rounded-2xl border text-left transition-colors ${selected ? "border-neon bg-neon/10 shadow-[0_0_20px_rgba(255,45,120,0.2)]" : "border-white/10 bg-black/30 hover:border-neon/50"}`}
                  >
                    <div className="relative h-24 overflow-hidden sm:h-28">
                      <img src={category.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-2 left-3 grid h-7 w-7 place-items-center rounded-lg bg-black/60 text-neon"><Icon size={15} /></span>
                    </div>
                    <div className="p-3">
                      <div className="font-display text-sm font-bold">{craving.title}</div>
                      <div className="mt-0.5 text-[11px] text-white/50">{craving.mood}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="dl-match neon-border-soft overflow-hidden rounded-2xl bg-black/50">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={activeDish.img} alt={activeDish.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-neon/50 bg-black/60 px-3 py-1 font-display text-[10px] font-bold tracking-widest text-neon">YOUR MATCH</span>
              <span className="absolute bottom-3 right-4 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs text-amber"><Star size={12} fill="currentColor" /> {activeDish.rating}</span>
            </div>
            <div className="p-5">
              <div className="font-display text-xl font-bold">{activeDish.name}</div>
              <p className="mt-1 min-h-10 text-sm text-white/55">{activeDish.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-neon">${activeDish.price.toFixed(2)}</span>
                <span className="flex items-center gap-1.5 text-xs text-white/55"><Clock size={13} /> {activeDish.time}</span>
              </div>
              <button onClick={() => choose(activeCategory)} className="btn-ghost mt-4 w-full justify-center !py-3 text-xs">
                EXPLORE {activeCraving.category.toUpperCase()} <ArrowRight size={15} />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
