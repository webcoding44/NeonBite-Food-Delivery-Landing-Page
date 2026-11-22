import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { gsap, scrollToId } from "../lib/gsap";
import { img } from "../data";

const offers = [
  { title: "50% OFF", sub: "ON FIRST ORDER", code: "HBLOCK50", img: img.pizza, color: "text-neon", cls: "neon-border-soft" },
  { title: "FLAT 30% OFF", sub: "ON ORDERS ABOVE $15", code: "HBLOCK30", img: img.burger, color: "text-amber", cls: "neon-amber" },
  { title: "FREE DELIVERY", sub: "ON ORDERS ABOVE $20", code: "FREESHIP", img: img.scooter, color: "text-neon", cls: "neon-border-soft" },
];

export default function Offers() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%" } });
      tl.from(".offers-box", { scale: 0.92, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(".offers-title", { y: 20, opacity: 0, letterSpacing: "0.5em", duration: 0.9 }, 0.2)
        .from(".offer", { y: 18, scale: 0.98, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" }, 0.4)
        .from(".offer-img", { scale: 0.3, rotate: -60, opacity: 0, stagger: 0.15, duration: 1, ease: "elastic.out(1,0.6)" }, 0.7);
      gsap.to(".offer-float", { y: -8, rotate: 4, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.4 });
      gsap.to(".offers-glow", { backgroundPosition: "200% 0", duration: 6, repeat: -1, ease: "none" });
    }, root);
    return () => ctx.revert();
  }, []);

  const use = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section ref={root} id="offers" className="mx-auto mt-14 max-w-7xl scroll-mt-20 px-4 md:px-6">
      <div className="offers-box neon-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-neon/10 via-[#0a0509] to-[#0a0509] p-5 pb-10 md:p-7 md:pb-12">
        <div className="offers-glow pointer-events-none absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ff2d78, #ff9f1c, transparent)", backgroundSize: "50% 100%", backgroundRepeat: "repeat-x" }} />
        <div className="mb-4 flex items-center justify-between">
          <span className="w-24" />
          <h2 className="offers-title section-title text-xl text-neon text-glow md:text-2xl">Exclusive Offers For You</h2>
          <button onClick={() => scrollToId("menu")} className="hidden w-24 items-center justify-end gap-2 font-display text-[11px] font-semibold tracking-widest text-amber md:flex">
            ALL OFFERS <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <div key={o.code} className={`offer ${o.cls} group relative flex items-center justify-between overflow-hidden rounded-2xl bg-black/50 p-5 transition-transform hover:-translate-y-1`}>
              <div className="relative z-10">
                <div className={`font-display text-2xl font-bold leading-tight ${o.color}`}>{o.title}</div>
                <div className="font-display text-[11px] font-semibold tracking-widest text-white/80">{o.sub}</div>
                <div className="mt-3 text-sm text-white/60">
                  Use Code: <span className="font-display font-bold text-white">{o.code}</span>
                </div>
                <button onClick={() => use(o.code)} className={`mt-4 inline-flex items-center gap-2 font-display text-[11px] font-bold tracking-widest ${o.color}`}>
                  {copied === o.code ? <><Check size={14} /> COPIED</> : <><Copy size={13} /> COPY CODE</>}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
              <div className="offer-img shrink-0"><img src={o.img} alt="" loading="lazy" className="offer-float h-28 w-28 rounded-full object-cover shadow-[0_0_30px_rgba(255,45,120,0.4)] md:h-32 md:w-32" /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
