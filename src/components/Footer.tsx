import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Facebook, Instagram, Logo, Twitter, Youtube } from "./Bits";

const cols = [
  { h: "Company", l: ["About Us", "Careers", "Blog", "Press"] },
  { h: "Customer Care", l: ["Help Center", "FAQs", "Terms & Conditions", "Privacy Policy"] },
  { h: "Partner With Us", l: ["Become a Partner", "Restaurant Login", "Delivery Partner"] },
];
const socials = [
  { i: Instagram, c: "#e1306c" },
  { i: Facebook, c: "#1877f2" },
  { i: Youtube, c: "#ff0000" },
  { i: Twitter, c: "#1da1f2" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top 92%" };
      gsap.from(".ft-col", { y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: st });
      gsap.from(".ft-line", { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "power3.inOut", scrollTrigger: st });
      gsap.from(".ft-soc", { scale: 0, rotate: -90, stagger: 0.1, duration: 0.7, delay: 0.4, ease: "back.out(2.5)", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="contact" className="mx-auto mt-14 max-w-7xl scroll-mt-20 px-4 pb-8 md:px-6">
      <div className="ft-line mb-8 h-px bg-gradient-to-r from-neon via-amber to-transparent shadow-[0_0_12px_#ff2d78]" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="ft-col">
          <Logo />
          <p className="mt-5 text-sm text-white/45">© 2026 BiteRush. All Rights Reserved.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h} className="ft-col lg:border-l lg:border-white/10 lg:pl-6">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest">{c.h}</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              {c.l.map((x) => (
                <li key={x}><a href="#" onClick={(e) => e.preventDefault()} className="inline-block transition-all hover:translate-x-1 hover:text-neon">{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div className="ft-col lg:border-l lg:border-white/10 lg:pl-6">
          <h4 className="font-display text-xs font-bold uppercase tracking-widest">Follow Us</h4>
          <div className="mt-4 flex gap-3">
            {socials.map(({ i: I, c }, k) => (
              <a
                key={k}
                href="#"
                onClick={(e) => e.preventDefault()}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -6, scale: 1.12, boxShadow: `0 0 20px ${c}`, borderColor: c, color: c, duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: "0 0 0 transparent", borderColor: "rgba(255,45,120,0.7)", color: "#ff2d78", duration: 0.4 })}
                className="ft-soc neon-border-soft grid h-10 w-10 place-items-center rounded-lg text-neon"
              >
                <I className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
