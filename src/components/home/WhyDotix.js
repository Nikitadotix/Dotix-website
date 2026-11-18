'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';

const reasons = [
  {
    title: 'Senior-led teams',
    description:
      'Work directly with experienced engineers from planning through launch.',
  },
  {
    title: 'Steady, visible progress',
    description:
      'See working builds and clear updates throughout every sprint.',
  },
  {
    title: 'You own the work',
    description:
      'Your code, accounts, and intellectual property stay yours.',
  },
  {
    title: 'Built to grow',
    description:
      'Get maintainable software that can evolve with your business.',
  },
];

const ease = [0.22, 1, 0.36, 1];

function Reason({ title, description, index, reduce }) {
  const ref = useRef(null);
  // A row counts as "current" while it sits around the middle of the viewport
  const isCurrent = useInView(ref, { margin: '-40% 0px -40% 0px' });

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease }}
      className="relative py-10 first:pt-2 last:pb-2 sm:py-12"
    >
      {/* Dot sitting on the progress rule */}
      <span
        aria-hidden="true"
        className={`absolute -left-[calc(1.5rem+4.5px)] top-[3.35rem] h-[9px] w-[9px] rounded-full border transition-all duration-500 first:top-[0.9rem] sm:-left-[calc(2.25rem+4.5px)] ${
          isCurrent
            ? 'scale-125 border-accent bg-accent'
            : 'border-border bg-background-secondary'
        }`}
      />

      <p className="mb-2 font-mono text-[11px] tracking-widest text-text-muted">
        ({String(index + 1).padStart(2, '0')})
      </p>
      <h3
        className={`text-2xl font-semibold tracking-tight transition-colors duration-500 sm:text-[1.75rem] ${
          isCurrent ? 'text-text-primary' : 'text-text-muted'
        }`}
      >
        {title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-text-secondary">
        {description}
      </p>
    </motion.li>
  );
}

export function WhyDotix() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);

  // The vertical rule fills in as the reader scrolls through the reasons
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 65%', 'end 55%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section className="relative border-t border-border/70 bg-background-secondary/80 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-8">
        {/* Left: stays put while the reasons scroll past */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-lg"
          >
           <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-accent" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Why Dotix
            </span>
          </div>

            <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem]">
              Software built{' '}
              <span className="relative inline-block whitespace-nowrap">
                with you
                {/* Hand-drawn style underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full overflow-visible text-accent"
                >
                  <motion.path
                    d="M2 8 C 38 2, 70 11, 108 5 S 168 9, 198 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.5, ease: 'easeInOut' }}
                  />
                </svg>
              </span>{' '}
              in mind.
            </h2>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-text-secondary">
              A focused team, a clear process, and products you can confidently own and
              grow.
            </p>
          </motion.div>
        </div>

        {/* Right: reasons along a scroll-driven rule */}
        <div className="relative pl-6 sm:pl-9">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-px bg-border"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
          />

          <ol ref={listRef} className="relative">
            {reasons.map((reason, index) => (
              <Reason key={reason.title} {...reason} index={index} reduce={reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}