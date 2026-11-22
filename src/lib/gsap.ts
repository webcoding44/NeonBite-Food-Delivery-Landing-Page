import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  gsap.to(window, {
    duration: 1.1,
    ease: "power3.inOut",
    scrollTo: { y: el, offsetY: 80 },
  });
}
