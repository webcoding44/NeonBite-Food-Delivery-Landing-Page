import { useLayoutEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { gsap } from "../lib/gsap";
import { SectionHead } from "./Bits";
import Marquee from "./Marquee";

const reviews = [
  { n: "Aarav Sharma", r: "Pizza Lover", t: "Piping hot pizza in 22 minutes. The packaging, the cheese pull — unreal. My new Friday ritual.", a: "A" },
  { n: "Sara Mitchell", r: "Verified Buyer", t: "The live tracking is so smooth I watched my rider the whole way. Burger arrived still crispy!", a: "S" },
  { n: "Kenji Tanaka", r: "Sushi Fan", t: "Fresh, beautifully packed and the HBLOCK50 code saved me a ton. Best delivery app I've used.", a: "K" },
  { n: "Priya Nair", r: "Biryani Addict", t: "Authentic flavours, generous portions and the support team solved my issue in minutes.", a: "P" },
  { n: "Lucas Moreau", r: "Night Owl", t: "24/7 support and midnight deliveries — they saved my study session more than once.", a: "L" },
];

export default function Reviews() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".head-anim", { y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%" } });
      gsap.from(".rev-wrap", { opacity: 0, y: 60, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  const card = (r: (typeof reviews)[number]) => (
    <div key={r.n} className="neon-border-soft mx-3 w-[320px] shrink-0 rounded-2xl bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,45,120,0.3)]">
      <Quote size={22} className="text-neon" />
      <p className="mt-3 min-h-[5.5rem] text-[15px] leading-snug text-white/80">{r.t}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon to-amber font-display font-bold">{r.a}</div>
        <div className="flex-1">
          <div className="font-display text-sm font-bold">{r.n}</div>
          <div className="text-xs text-white/50">{r.r}</div>
        </div>
        <div className="flex text-amber">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}</div>
      </div>
    </div>
  );

  return (
    <section ref={root} className="mt-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHead title="Loved By 25K+ Foodies" />
      </div>
      <div className="rev-wrap [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Marquee duration={45} pauseOnHover>{reviews.map(card)}</Marquee>
      </div>
    </section>
  );
}
