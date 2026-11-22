import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Bike, ChefHat, CircleCheck, Home } from "lucide-react";
import { gsap } from "../lib/gsap";
import { SectionHead } from "./Bits";

const PATH = "M70 320 C150 320 130 220 220 210 S300 120 380 135 S470 230 520 160 S540 90 540 70";
const stages = [
  { icon: CircleCheck, label: "Order Confirmed", sub: "We got your order" },
  { icon: ChefHat, label: "Preparing", sub: "Chef is cooking" },
  { icon: Bike, label: "On The Way", sub: "Rider picked it up" },
  { icon: Home, label: "Delivered", sub: "Enjoy your meal!" },
];

export default function Track() {
  const root = useRef<HTMLElement>(null);
  const route = useRef<SVGPathElement>(null);
  const rider = useRef<SVGGElement>(null);
  const tl = useRef<gsap.core.Tween | null>(null);
  const etaEl = useRef<HTMLSpanElement>(null);
  const [stage, setStage] = useState(-1);
  const [orderId, setOrderId] = useState("HB-48213");
  const [running, setRunning] = useState(false);
  const stageRef = useRef(-1);

  const play = () => {
    const path = route.current!;
    const len = path.getTotalLength();
    tl.current?.kill();
    setRunning(true);
    stageRef.current = -1;
    setStage(-1);
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const o = { p: 0 };
    tl.current = gsap.to(o, {
      p: 1,
      duration: 12,
      ease: "none",
      onUpdate: () => {
        const p = o.p;
        gsap.set(path, { strokeDashoffset: len * (1 - p) });
        const pt = path.getPointAtLength(len * p);
        rider.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        const s = p < 0.12 ? 0 : p < 0.38 ? 1 : p < 1 ? 2 : 3;
        if (s !== stageRef.current) {
          stageRef.current = s;
          setStage(s);
        }
        if (etaEl.current) etaEl.current.textContent = String(Math.max(0, Math.ceil(30 * (1 - p))));
      },
      onComplete: () => setRunning(false),
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".head-anim", { y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%" } });
      gsap.from(".track-card", { x: -80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      gsap.from(".pin", { scale: 0, transformOrigin: "50% 100%", stagger: 0.3, duration: 0.8, ease: "elastic.out(1,0.5)", scrollTrigger: { trigger: root.current, start: "top 70%" } });
      gsap.to(".pulse-ring", { attr: { r: 26 }, opacity: 0, duration: 1.6, repeat: -1, ease: "power1.out" });
      ScrollTriggerOnce(root.current!, play);
    }, root);
    return () => {
      ctx.revert();
      tl.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage < 0) return;
    gsap.fromTo(`.stage-${stage}`, { scale: 0.85 }, { scale: 1, duration: 0.7, ease: "elastic.out(1,0.5)" });
  }, [stage]);

  return (
    <section ref={root} id="track" className="mx-auto mt-14 max-w-7xl scroll-mt-20 px-4 md:px-6">
      <SectionHead title="Track Your Order" action="REPLAY" onAction={play} />
      <div className="grid gap-6">
        <div className="track-card neon-border-soft overflow-hidden rounded-3xl bg-[#08060b]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                play();
              }}
            >
              <input value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-32 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-display text-sm uppercase outline-none focus:border-neon" aria-label="Order ID" />
              <button className="btn-neon !px-4 !py-2 !text-xs">Track</button>
            </form>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Estimated delivery</div>
              <div className="font-display text-2xl font-bold text-neon text-glow"><span ref={etaEl}>30</span> MIN</div>
            </div>
          </div>

          <div className="relative">
            <svg viewBox="0 0 960 460" preserveAspectRatio="none" className="block h-[320px] w-full sm:h-[380px] lg:h-[460px]">
              <defs>
                <pattern id="streets" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0 0H60M0 0V60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
                <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <g transform="scale(1.6 1.21)">
              <rect width="600" height="380" fill="url(#streets)" />
              <path d="M0 120 Q200 90 320 200 T600 250 M120 0 Q150 160 90 380 M350 0 Q380 120 450 380 M0 300 Q260 330 600 330" stroke="rgba(255,255,255,0.07)" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d={PATH} stroke="rgba(255,45,120,0.2)" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
              <path ref={route} d={PATH} stroke="#ff2d78" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#glow)" style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }} />
              <g className="pin" transform="translate(70 320)">
                <circle r="18" fill="#0a0509" stroke="#ff9f1c" strokeWidth="2" />
                <text textAnchor="middle" y="6" fontSize="16">🍔</text>
              </g>
              <g className="pin" transform="translate(540 70)">
                <circle className="pulse-ring" r="14" fill="none" stroke="#ff2d78" strokeWidth="2" />
                <circle r="18" fill="#0a0509" stroke="#ff2d78" strokeWidth="2" />
                <text textAnchor="middle" y="6" fontSize="16">🏠</text>
              </g>
              <g ref={rider} transform="translate(70 320)">
                <circle r="20" fill="#ff2d78" opacity="0.25" filter="url(#glow)" />
                <circle r="16" fill="#ff2d78" />
                <text textAnchor="middle" y="6" fontSize="17">🛵</text>
              </g>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-4 md:grid-cols-4">
            {stages.map((s, i) => {
              const done = stage >= i;
              return (
                <div key={s.label} className={`stage-${i} flex items-center gap-3 rounded-xl border p-3 transition-all duration-500 ${done ? "border-neon bg-neon/10 shadow-[0_0_18px_rgba(255,45,120,0.3)]" : "border-white/10 opacity-50"}`}>
                  <s.icon size={22} className={done ? "text-neon" : "text-white/50"} />
                  <div>
                    <div className="font-display text-[12px] font-bold leading-tight">{s.label}</div>
                    <div className="text-[11px] text-white/55">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {running && stage < 0 && <span className="sr-only">Loading</span>}
        </div>

      </div>
    </section>
  );
}

function ScrollTriggerOnce(el: HTMLElement, fn: () => void) {
  gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", once: true, onEnter: fn } });
}

