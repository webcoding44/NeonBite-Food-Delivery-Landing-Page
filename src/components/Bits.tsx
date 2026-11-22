import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 56" className="h-8 w-9 drop-shadow-[0_0_10px_rgba(255,45,120,0.8)]" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff2d78" />
            <stop offset="1" stopColor="#7b5cff" />
          </linearGradient>
          <linearGradient id="lg2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#ff2d78" />
          </linearGradient>
        </defs>
        <path
          d="M32 52 C10 36 3 26 3 16 C3 8 9 3 16 3 C22 3 28 6 32 12 C36 6 42 3 48 3 C55 3 61 8 61 16 C61 26 54 36 32 52Z"
          stroke="url(#lg1)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M32 12 V30 M20 20 H44 M32 30 L22 38 M32 30 L42 38" stroke="url(#lg2)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="leading-none">
        <div className="font-display text-base font-bold tracking-wide text-white">BITERUSH</div>
        <div className="mt-1 text-[9px] font-bold tracking-[0.18em] text-neon">
          FRESH. <span className="text-amber">FAST.</span> DELIVERED.
        </div>
      </div>
    </div>
  );
}

export function SectionHead({
  title,
  action,
  onAction,
  children,
  center,
}: {
  title: ReactNode;
  action?: string;
  onAction?: () => void;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`head-anim mb-8 flex items-end gap-4 ${center ? "justify-center text-center" : "justify-between"}`}>
      <div>
        <h2 className="section-title text-2xl text-white md:text-3xl">{title}</h2>
        <div className={`mt-3 h-[3px] w-16 rounded bg-gradient-to-r from-neon to-amber shadow-[0_0_12px_#ff2d78] ${center ? "mx-auto" : ""}`} />
        {children}
      </div>
      {action && (
        <button onClick={onAction} className="group flex items-center gap-2 font-display text-xs font-semibold tracking-widest text-white hover:text-neon">
          {action}
          <span className="text-neon transition-transform group-hover:translate-x-1">→</span>
        </button>
      )}
    </div>
  );
}

export const Instagram = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
export const Facebook = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
    <path d="M14 8V6.5c0-.7.3-1 1.1-1H17V2h-2.6C11.5 2 10 3.7 10 6.2V8H7.5v3.5H10V22h4V11.5h2.7L17 8h-3z" />
  </svg>
);
export const Youtube = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
);
export const Twitter = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
    <path d="M22 5.9c-.7.3-1.5.5-2.4.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7C8.4 8.8 5.4 7.200 3.400 4.700a4.100 4.100 0 0 0 1.300 5.500c-.7 0-1.300-.2-1.900-.5 0 2 1.400 3.700 3.300 4.100-.6.2-1.200.2-1.800.1.500 1.600 2 2.800 3.800 2.800A8.300 8.300 0 0 1 2 18.400 11.700 11.700 0 0 0 8.300 20.200c7.500 0 11.700-6.300 11.700-11.700v-.5c.8-.6 1.500-1.300 2-2.100z" />
  </svg>
);
