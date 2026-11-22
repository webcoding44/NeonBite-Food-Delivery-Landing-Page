import { useLayoutEffect, useRef } from "react";
import { Store, Timer, Users, Star } from "lucide-react";
import { gsap } from "../lib/gsap";

const stats = [
  { icon: Users, to: 25, suffix: "K+", label: "Happy Customers", dec: 0 },
  { icon: Store, to: 500, suffix: "+", label: "Restaurants", dec: 0 },
  { icon: Timer, to: 30, suffix: " MIN", label: "Fast Delivery", dec: 0 },
  { icon: Star, to: 4.8, suffix: "", label: "Top Rated", dec: 1 },
];

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 90%" },
      });
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const to = Number(el.dataset.to);
        const dec = Number(el.dataset.dec);
        const o = { v: 0 };
        gsap.to(o, {
          v: to,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 90%" },
          onUpdate: () => (el.textContent = o.v.toFixed(dec)),
        });
      });
      gsap.from(".stat-icon", {
        scale: 0,
        rotate: -180,
        stagger: 0.12,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: root.current, start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat flex items-center justify-center gap-3 md:border-r md:border-white/10 md:last:border-0">
            <div className="stat-icon grid h-12 w-12 place-items-center rounded-xl border border-neon/60 text-neon shadow-[0_0_16px_rgba(255,45,120,0.35)]">
              <s.icon size={22} />
            </div>
            <div>
              <div className="font-display text-xl font-bold leading-none md:text-2xl">
                <span className="stat-num" data-to={s.to} data-dec={s.dec}>0</span>
                <span>{s.suffix}</span>
                {s.label === "Top Rated" && <Star size={16} className="mb-1 ml-1 inline text-amber" fill="currentColor" />}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
