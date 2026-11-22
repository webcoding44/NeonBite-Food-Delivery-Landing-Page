import { useLayoutEffect, useRef } from 'react';
import { LayoutGrid } from 'lucide-react';
import { gsap, scrollToId } from '../lib/gsap';
import { categories } from '../data';
import type { Sel } from '../App';

export default function Categories({
  sel,
  onSelect,
}: {
  sel: Sel;
  onSelect: (c: Sel) => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat', {
        y: 50,
        opacity: 0,
        scale: 0.8,
        stagger: { each: 0.07, from: 'start' },
        duration: 0.8,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: root.current, start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const hover = (e: React.MouseEvent<HTMLElement>, over: boolean) => {
    const el = e.currentTarget;
    gsap.to(el, { y: over ? -8 : 0, duration: 0.35, ease: 'power2.out' });
    gsap.to(el.querySelector('img'), {
      scale: over ? 1.18 : 1,
      rotate: over ? 8 : 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const pick = (c: Sel) => {
    onSelect(c);
    scrollToId('menu');
  };

  return (
    <div
      ref={root}
      className='mx-auto mt-8 max-w-7xl px-4 md:px-6'
    >
      <div className='no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-4 pt-2 md:mx-0 md:grid md:grid-cols-8 md:px-0'>
        {categories.map((c) => (
          <button
            key={c.name}
            onMouseEnter={(e) => hover(e, true)}
            onMouseLeave={(e) => hover(e, false)}
            onClick={() => pick(c.name)}
            className={`cat group min-w-[96px] shrink-0 rounded-2xl p-2 text-center transition-colors md:min-w-0 ${sel === c.name ? 'neon-border bg-neon/10' : 'neon-border-soft bg-white/[0.02]'}`}
          >
            <div className='aspect-square overflow-hidden rounded-xl'>
              <img
                src={c.img}
                alt={c.name}
                loading='lazy'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='mt-2 font-display text-[12px] font-semibold tracking-wide'>
              {c.name}
            </div>
          </button>
        ))}
        <button
          onMouseEnter={(e) => hover(e, true)}
          onMouseLeave={(e) => hover(e, false)}
          onClick={() => pick('All')}
          className={`cat min-w-[96px] shrink-0 rounded-2xl p-2 text-center md:min-w-0 ${sel === 'All' ? 'neon-border bg-neon/10' : 'neon-border-soft bg-white/[0.02]'}`}
        >
          <div className='grid aspect-square place-items-center rounded-xl text-amber'>
            <LayoutGrid
              size={34}
              className='drop-shadow-[0_0_10px_#ff9f1c]'
            />
          </div>
          <div className='mt-2 font-display text-[12px] font-semibold tracking-wide'>
            More
          </div>
        </button>
      </div>
    </div>
  );
}
