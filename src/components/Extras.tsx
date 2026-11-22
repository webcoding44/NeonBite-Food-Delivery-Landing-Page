import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, scrollToId } from "../lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const set = gsap.quickSetter(bar.current, "scaleX");
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      set(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-neon via-amber to-neon shadow-[0_0_12px_#ff2d78]" />
    </div>
  );
}

export function CursorGlow() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const x = gsap.quickTo(el.current, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(el.current, "y", { duration: 0.6, ease: "power3" });
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={el}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/[0.09] blur-[80px] md:block"
    />
  );
}

export function BackToTop() {
  const el = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    gsap.set(el.current, { scale: 0, opacity: 0 });
    let shown = false;
    const on = () => {
      const s = window.scrollY > 700;
      if (s !== shown) {
        shown = s;
        gsap.to(el.current, { scale: s ? 1 : 0, opacity: s ? 1 : 0, duration: 0.4, ease: "back.out(2)" });
      }
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button ref={el} onClick={() => scrollToId("home")} aria-label="Back to top" className="neon-border fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#0b0810] text-neon hover:bg-neon hover:text-white">
      <ArrowUp size={20} />
    </button>
  );
}
