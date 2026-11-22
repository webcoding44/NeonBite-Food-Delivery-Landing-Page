import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { gsap, ScrollTrigger, scrollToId } from "../lib/gsap";
import { Logo } from "./Bits";

const links = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
  { label: "Offers", id: "offers" },
  { label: "Track Order", id: "track" },
  { label: "About Us", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("home");
  const [mobile, setMobile] = useState(false);
  const [searching, setSearching] = useState(false);

  useLayoutEffect(() => {
    gsap.set(root.current, { yPercent: -100, opacity: 0 });
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.to(root.current, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 });
      gsap.from(".nav-item", { y: -16, opacity: 0, stagger: 0.07, duration: 0.6, delay: 0.5, ease: "power2.out" });
      links.forEach((l) => {
        const el = document.getElementById(l.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(l.id),
        });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 40,
      end: 99999,
      onUpdate: (s) => {
        gsap.to(root.current, {
          backgroundColor: s.scroll() > 40 ? "rgba(5,5,7,0.82)" : "rgba(5,5,7,0)",
          duration: 0.3,
          overwrite: "auto",
        });
        root.current?.classList.toggle("backdrop-blur-xl", s.scroll() > 40);
        root.current?.classList.toggle("border-neon/30", s.scroll() > 40);
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!mobile) return;
    gsap.fromTo(".m-link", { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" });
  }, [mobile]);

  const go = (id: string) => {
    setMobile(false);
    scrollToId(id);
  };

  return (
    <>
    <header ref={root} className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <button onClick={() => go("home")} className="nav-item" aria-label="Home">
          <Logo />
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`nav-item relative py-2 font-display text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-neon ${
                active === l.id ? "text-neon" : "text-white/85"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded bg-neon shadow-[0_0_10px_#ff2d78] transition-transform duration-300 ${
                  active === l.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className={`nav-item hidden items-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all duration-300 md:flex ${searching ? "w-48 px-3" : "w-10 justify-center"}`}>
            <button onClick={() => setSearching((s) => !s)} className="grid h-9 w-9 shrink-0 place-items-center text-white hover:text-neon" aria-label="Search">
              <Search size={18} />
            </button>
            {searching && (
              <input
                autoFocus
                placeholder="Search dishes…"
                onBlur={() => setSearching(false)}
                onKeyDown={(e) => e.key === "Enter" && go("menu")}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            )}
          </div>
          <button className="nav-item neon-border hidden rounded-lg px-5 py-2.5 font-display text-xs font-semibold tracking-[0.14em] text-white transition hover:bg-neon sm:block">
            SIGN IN
          </button>
          <button onClick={() => setMobile(true)} className="grid h-9 w-9 place-items-center text-white lg:hidden" aria-label="Menu">
            <Menu />
          </button>
        </div>
      </div>

    </header>
      {mobile && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#07050a]/95 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setMobile(false)} className="grid h-10 w-10 place-items-center text-white">
              <X />
            </button>
          </div>
          <div className="mt-12 flex flex-col gap-2">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className={`m-link border-b border-white/10 py-4 text-left font-display text-2xl font-bold uppercase tracking-wider ${active === l.id ? "text-neon" : "text-white"}`}>
                {l.label}
              </button>
            ))}
          </div>
          <button className="btn-neon m-link mt-auto">Sign In</button>
        </div>
      )}
    </>
  );
}
