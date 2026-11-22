import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tw = gsap.fromTo(
      track.current,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 }
    );
    const st = ScrollTrigger.create({
      onUpdate: (s) => {
        const v = Math.min(Math.abs(s.getVelocity()) / 400, 5);
        gsap.to(tw, { timeScale: 1 + v, duration: 0.2, overwrite: true });
        gsap.to(tw, { timeScale: 1, duration: 1, delay: 0.2, overwrite: false });
      },
    });
    return () => {
      tw.kill();
      st.kill();
    };
  }, [duration, reverse]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && gsap.getTweensOf(track.current).forEach((t) => t.timeScale(0.15))}
      onMouseLeave={() => pauseOnHover && gsap.getTweensOf(track.current).forEach((t) => t.timeScale(1))}
    >
      <div ref={track} className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
