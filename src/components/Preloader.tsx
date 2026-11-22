import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Logo } from "./Bits";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document.body.classList.add("lock");
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("lock");
        },
      });
      tl.from(".pl-logo", { scale: 0.6, opacity: 0, duration: 0.7, ease: "back.out(2)" })
        .to(".pl-glow", { scale: 1.4, opacity: 0.9, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
            },
          },
          0.1
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .to(".pl-content", { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.9)
        .to(".pl-panel", { yPercent: -100, duration: 0.9, ease: "power4.inOut", stagger: 0.08 }, 2.1)
        .call(onDone, [], 2.3)
        .set(root.current, { display: "none" });
    }, root);
    return () => {
      ctx.revert();
      document.body.classList.remove("lock");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[10000]">
      <div className="pl-panel absolute inset-0 bg-neon" />
      <div className="pl-panel absolute inset-0 bg-[#0a0509]" />
      <div className="pl-content absolute inset-0 z-10 flex flex-col items-center justify-center gap-8">
        <div className="pl-glow absolute h-72 w-72 rounded-full bg-neon/40 opacity-30 blur-[90px]" />
        <div className="pl-logo relative scale-125">
          <Logo />
        </div>
        <div className="relative w-64">
          <div className="h-[3px] overflow-hidden rounded bg-white/10">
            <div className="pl-bar h-full origin-left scale-x-0 bg-gradient-to-r from-neon to-amber shadow-[0_0_14px_#ff2d78]" />
          </div>
          <div className="mt-3 flex justify-between font-display text-xs tracking-[0.3em] text-white/60">
            <span>PREPARING YOUR FEAST</span>
            <span>
              <span ref={num}>00</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
