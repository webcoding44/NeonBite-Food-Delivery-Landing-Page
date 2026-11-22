import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { gsap, scrollToId } from "../lib/gsap";
import { img } from "../data";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".h-line > span", ".h-fade", ".h-fade-top", ".h-burger", ".h-badge", ".h-ring"], { opacity: 0 });
      gsap.set(".h-line > span", { yPercent: 115, opacity: 1 });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!ready || !root.current) return;
    const el = root.current;
    let move: ((event: MouseEvent) => void) | undefined;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .fromTo(".h-fade-top", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7 })
        .to(".h-line > span", { yPercent: 0, duration: 1.1, stagger: 0.14 }, 0.1)
        .fromTo(".h-ring", { scale: 0.3, opacity: 0, rotate: -120 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: "expo.out" }, 0.2)
        .fromTo(".h-burger", { scale: 0.4, y: 120, opacity: 0, rotate: -12 }, { scale: 1, y: 0, opacity: 1, rotate: 0, duration: 1.4, ease: "back.out(1.4)" }, 0.35)
        .fromTo(".h-badge", { scale: 0, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "elastic.out(1,0.5)" }, 1)
        .fromTo(".h-fade", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, 0.7);

      gsap.to(".h-burger-float", { y: -14, rotate: 2, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".h-badge-float", { y: 10, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".h-pulse", { opacity: 0.55, scale: 1.08, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" });

      gsap.utils.toArray<HTMLElement>(".ember").forEach((ember) => {
        const run = () => {
          const duration = gsap.utils.random(2.4, 4.2);
          const x = gsap.utils.random(-150, 150);
          gsap
            .timeline({ onComplete: run, delay: gsap.utils.random(0, 2) })
            .set(ember, { x, y: gsap.utils.random(-20, 120), opacity: 0, scale: gsap.utils.random(0.5, 1.4) })
            .to(ember, { y: "-=260", x: x + gsap.utils.random(-70, 70), duration, ease: "power1.out" }, 0)
            .to(ember, { opacity: 1, duration: duration * 0.25, ease: "none" }, 0)
            .to(ember, { opacity: 0, duration: duration * 0.5, ease: "none" }, duration * 0.5);
        };
        run();
      });

      const bx = gsap.quickTo(".h-burger-wrap", "x", { duration: 0.8, ease: "power3" });
      const by = gsap.quickTo(".h-burger-wrap", "y", { duration: 0.8, ease: "power3" });
      const rx = gsap.quickTo(".h-ring-wrap", "x", { duration: 1.2, ease: "power3" });
      const ry = gsap.quickTo(".h-ring-wrap", "y", { duration: 1.2, ease: "power3" });
      move = (event: MouseEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        bx(nx * 32);
        by(ny * 24);
        rx(nx * -24);
        ry(ny * -18);
      };
    }, root);
    if (move) el.addEventListener("mousemove", move);
    return () => {
      if (move) el.removeEventListener("mousemove", move);
      ctx.revert();
    };
  }, [ready]);

  return (
    <section ref={root} id="home" className="relative overflow-hidden pb-6 pt-20 md:pt-24">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[700px] opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 md:px-6 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <div className="h-fade-top inline-flex items-center gap-2 rounded-full border border-amber/70 bg-amber/10 px-3 py-1 font-display text-[11px] font-semibold tracking-widest text-amber shadow-[0_0_14px_rgba(255,159,28,0.35)]">
            <Zap size={13} fill="currentColor" /> FAST DELIVERY
          </div>
          <h1 className="font-display mt-5 text-[2.1rem] font-bold uppercase leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-[3.3rem]">
            <span className="h-line mask-line"><span className="block">Delicious Food</span></span>
            <span className="h-line mask-line"><span className="block bg-gradient-to-r from-neon-soft to-neon bg-clip-text text-transparent [filter:drop-shadow(0_0_16px_rgba(255,45,120,0.7))]">Delivered</span></span>
            <span className="h-line mask-line"><span className="block">To Your <span className="text-amber text-glow-amber">Door</span></span></span>
          </h1>
          <p className="h-fade mt-6 max-w-md text-lg leading-snug text-white/75">
            Your favorite meals, fast delivery, best prices and <span className="text-white">100% satisfaction.</span>
          </p>
          <div className="h-fade mt-8 flex flex-wrap gap-4">
            <button onClick={() => scrollToId("menu")} className="btn-neon">Order Now <ArrowRight size={18} /></button>
            <button onClick={() => scrollToId("menu")} className="btn-ghost">Browse Menu <ArrowRight size={18} /></button>
          </div>
        </div>

        <div className="relative z-0 mx-auto aspect-square w-full max-w-[560px] lg:col-span-6 lg:max-w-none xl:col-span-7">
          <div className="h-ring-wrap absolute inset-0">
            <div className="h-ring absolute inset-[6%]">
              <div className="h-pulse absolute inset-0 rounded-full bg-neon/30 blur-3xl" />
              <div className="spin-slow absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, #ff2d78, #ff9f1c, transparent 40%, #ff2d78 70%, transparent)", padding: 4, mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))" }} />
              <div className="absolute inset-3 rounded-full border border-neon/40" />
              {Array.from({ length: 14 }).map((_, index) => (
                <span key={index} className="ember absolute left-1/2 top-[70%] h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_10px_#ff9f1c]" style={{ opacity: 0 }} />
              ))}
            </div>
          </div>
          <div className="h-burger-wrap absolute inset-0">
            <div className="h-burger absolute -inset-x-[2%] -top-[4%] bottom-[2%]">
              <div className="h-burger-float h-full w-full">
                <img src={img.burger} alt="Signature cheeseburger from BiteRush" className="h-full w-full rounded-full object-cover [mask-image:radial-gradient(circle,#000_60%,transparent_72%)] drop-shadow-[0_20px_40px_rgba(255,45,120,0.35)]" />
              </div>
            </div>
          </div>
          <div className="h-badge absolute bottom-[4%] left-[2%] z-10">
            <div className="h-badge-float neon-border grid h-28 w-28 place-items-center rounded-full bg-[#0a0509]/90 text-center backdrop-blur">
              <div>
                <div className="font-display text-[10px] font-semibold tracking-widest text-white/80">UP TO</div>
                <div className="font-display text-3xl font-bold leading-none text-neon text-glow">50%</div>
                <div className="font-display text-[11px] font-semibold tracking-widest text-white">OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
