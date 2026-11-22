import { useLayoutEffect, useRef } from "react";
import { Award, BadgePercent, CreditCard, Headphones, Truck } from "lucide-react";
import { gsap } from "../lib/gsap";

const items = [
  { icon: Truck, t: "Fast Delivery", d: "On time, every time" },
  { icon: Award, t: "Best Quality", d: "100% fresh & hygienic" },
  { icon: BadgePercent, t: "Best Offers", d: "Exciting deals & discounts" },
  { icon: CreditCard, t: "Secure Payment", d: "Safe & secure payments" },
  { icon: Headphones, t: "24/7 Support", d: "We are here for you" },
];

export default function Why() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top 80%" };
      gsap.from(".why-box", { opacity: 0, y: 50, duration: 0.9, ease: "power3.out", scrollTrigger: st });
      gsap.from(".why-title span", { yPercent: 120, stagger: 0.04, duration: 0.7, ease: "power3.out", scrollTrigger: st });
      gsap.from(".why-item", { y: 40, opacity: 0, stagger: 0.12, duration: 0.8, delay: 0.3, ease: "power3.out", scrollTrigger: st });
      gsap.from(".why-icon", { scale: 0, rotate: -120, stagger: 0.12, duration: 0.9, delay: 0.4, ease: "back.out(2.2)", scrollTrigger: st });
      gsap.from(".why-line", { scaleY: 0, stagger: 0.12, duration: 0.7, delay: 0.6, scrollTrigger: st });
      gsap.to(".why-icon", { boxShadow: "0 0 30px rgba(255,45,120,0.7)", duration: 1.6, yoyo: true, repeat: -1, stagger: 0.25, ease: "sine.inOut" });
    }, root);
    return () => ctx.revert();
  }, []);

  const hover = (e: React.MouseEvent<HTMLElement>, over: boolean) =>
    gsap.to(e.currentTarget.querySelector(".why-icon"), { rotate: over ? 360 : 0, scale: over ? 1.15 : 1, duration: 0.7, ease: "back.out(1.6)" });

  return (
    <section ref={root} id="about" className="mx-auto mt-14 max-w-7xl scroll-mt-20 px-4 md:px-6">
      <div className="why-box neon-border-soft rounded-3xl bg-white/[0.02] px-5 py-8 md:px-8">
        <h2 className="why-title section-title mb-8 flex justify-center overflow-hidden text-center text-xl tracking-[0.2em] md:text-2xl">
          {"WHY CHOOSE US?".split("").map((c, i) => (
            <span key={i} className="inline-block whitespace-pre">{c}</span>
          ))}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <div key={it.t} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)} className="why-item relative flex items-center gap-4 lg:justify-center">
              <div className="why-icon grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-neon/70 bg-neon/10 text-neon">
                <it.icon size={26} />
              </div>
              <div>
                <div className="font-display text-sm font-bold">{it.t}</div>
                <div className="text-xs text-white/55">{it.d}</div>
              </div>
              {i < items.length - 1 && <span className="why-line absolute -right-3 top-1/2 hidden h-12 w-px origin-center -translate-y-1/2 bg-white/10 lg:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
