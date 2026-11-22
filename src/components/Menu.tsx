import { useLayoutEffect, useRef, useState } from 'react';
import { Star, Clock } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { categories, dishes, type Dish } from '../data';
import { SectionHead } from './Bits';
import type { Sel } from '../App';

const tagStyle: Record<Dish['tagColor'], string> = {
  pink: 'bg-neon text-white shadow-[0_0_12px_#ff2d78]',
  amber: 'bg-amber text-black shadow-[0_0_12px_#ff9f1c]',
  violet: 'bg-violet-500 text-white shadow-[0_0_12px_#8b5cf6]',
  green: 'bg-emerald-500 text-black shadow-[0_0_12px_#10b981]',
};

export default function Menu({
  sel,
  onSelect,
}: {
  sel: Sel;
  onSelect: (c: Sel) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = dishes.filter((d) => sel === 'All' || d.cat === sel);
  const list = sel === 'All' && !showAll ? filtered.slice(0, 4) : filtered;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.head-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      gsap.from('.chip', {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: { trigger: '.chips', start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // animate cards whenever the list changes
  useLayoutEffect(() => {
    const cards = grid.current?.querySelectorAll('.dish');
    if (!cards?.length) return;
    const tw = gsap.fromTo(
      cards,
      { y: 70, opacity: 0, rotateX: -25, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: grid.current, start: 'top 85%' },
        clearProps: 'transform',
      },
    );
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [sel, showAll]);

  return (
    <section
      ref={root}
      id='menu'
      className='mx-auto mt-14 max-w-7xl scroll-mt-20 px-4 md:px-6'
    >
      <div className='border-t border-white/10 pt-10'>
        <SectionHead
          title='Popular Dishes'
          action={
            sel === 'All' && !showAll
              ? 'VIEW ALL'
              : sel === 'All'
                ? 'SHOW LESS'
                : 'ALL DISHES'
          }
          onAction={() =>
            sel === 'All' ? setShowAll((s) => !s) : onSelect('All')
          }
        />

        <div className='chips no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0'>
          {(['All', ...categories.map((c) => c.name)] as Sel[]).map((c) => (
            <button
              key={c}
              onClick={() => onSelect(c)}
              className={`chip shrink-0 rounded-full border px-4 py-1.5 font-display text-xs font-semibold tracking-wider transition-all ${
                sel === c
                  ? 'border-neon bg-neon text-white shadow-[0_0_18px_#ff2d78]'
                  : 'border-white/15 text-white/70 hover:border-neon/70 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          ref={grid}
          className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'
          style={{ perspective: 1200 }}
        >
          {list.map((d) => (
            <DishCard
              key={d.id}
              d={d}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DishCard({ d }: { d: Dish }) {
  const imgBox = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const r = card.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card.current, {
      rotateY: px * 10,
      rotateX: -py * 10,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
    });
    gsap.to(imgBox.current, { x: px * 10, y: py * 10, duration: 0.4 });
  };
  const leave = () => {
    gsap.to(card.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'elastic.out(1,0.6)',
    });
    gsap.to(imgBox.current, { x: 0, y: 0, duration: 0.6 });
  };

  return (
    <div className='dish'>
      <div
        ref={card}
        onMouseMove={move}
        onMouseLeave={leave}
        className='neon-border-soft group h-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent p-2.5 transition-shadow hover:shadow-[0_0_30px_rgba(255,45,120,0.35)]'
      >
        <div
          ref={imgBox}
          className='relative overflow-hidden rounded-xl'
        >
          <img
            src={d.img}
            alt={d.name}
            loading='lazy'
            className='aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110'
          />
          <span
            className={`absolute left-2 top-2 rounded px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider ${tagStyle[d.tagColor]}`}
          >
            {d.tag}
          </span>
          <span className='absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs backdrop-blur'>
            <Star
              size={11}
              className='text-amber'
              fill='currentColor'
            />{' '}
            {d.rating}
          </span>
        </div>
        <div className='px-1 pb-1 pt-3'>
          <h3 className='font-display text-base font-semibold'>{d.name}</h3>
          <p className='mt-1 min-h-[2.6rem] text-sm leading-tight text-white/60'>
            {d.desc}
          </p>
          <div className='mt-1 flex items-center gap-1 text-xs text-white/45'>
            <Clock size={12} /> {d.time}
          </div>
          <div className='mt-3 flex items-center justify-end border-t border-white/10 pt-3'>
            <span className='font-display text-2xl font-bold'>
              ${d.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
