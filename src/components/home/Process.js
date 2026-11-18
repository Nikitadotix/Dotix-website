
'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Scope',
    description: 'Align on goals, scope, and architecture.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Map user flows before development.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Ship tested software in two-week sprints.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy, monitor, and maintain.',
  },
];

function TimelineStep({ step, index, total, progress, reduced }) {
  const start = index / (total - 1);

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.15),
      Math.min(1, start + 0.12),
    ],
    [0.4, 1]
  );

  const numberOpacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.08),
      Math.min(1, start + 0.1),
    ],
    [0.35, 1]
  );

  const y = useTransform(
    progress,
    [
      Math.max(0, start - 0.15),
      Math.min(1, start + 0.12),
    ],
    [18, 0]
  );

  const borderColor = useTransform(
    progress,
    [Math.max(0, start), Math.min(1, start + 0.12)],
    ['rgba(255,255,255,0.16)', 'var(--accent)']
  );

  const pulseOpacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.03),
      Math.min(1, start + 0.08),
      Math.min(1, start + 0.2),
    ],
    [0, 0.8, 0]
  );

  const pulseScale = useTransform(
    progress,
    [Math.max(0, start), Math.min(1, start + 0.2)],
    [0.8, 1.5]
  );

  return (
    <motion.article
      style={reduced ? {} : { opacity, y }}
      className="group relative flex min-w-0 flex-col items-start"
    >
      {/* Timeline node */}
      <motion.div
        style={reduced ? {} : { borderColor }}
        className="relative z-10 mb-8 flex h-10 w-10 items-center justify-center rounded-full border bg-background-primary sm:h-11 sm:w-11"
      >
        <motion.span
          style={reduced ? {} : { opacity: numberOpacity }}
          className="font-mono text-[11px] font-normal text-accent sm:text-xs"
        >
          {step.number}
        </motion.span>

        {!reduced && (
          <motion.span
            style={{
              opacity: pulseOpacity,
              scale: pulseScale,
            }}
            className="pointer-events-none absolute inset-[-5px] rounded-full border border-accent"
          />
        )}
      </motion.div>

      {/* Step content */}
      <div className="w-full border-t border-border pt-5 transition-colors duration-300 group-hover:border-accent/50">
        <h3 className="mb-3 text-xl font-medium tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-2xl">
          {step.title}
        </h3>

        <p className="max-w-xs text-[13px] font-normal leading-6 text-text-secondary sm:text-sm">
          {step.description}
        </p>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{
            duration: reduced ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 h-px w-full origin-left bg-accent/60"
        />
      </div>
    </motion.article>
  );
}

export function Process() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 65%', 'end 65%'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.5,
  });

  // Desktop indicator: exact first-to-last node positions
  const movingDotPosition = useTransform(
    progress,
    [0, 1],
    ['0%', '100%']
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-background-primary py-24 sm:py-32"
    >
      {/* Ambient background */}
      <div className="ambient-glow pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section heading */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-accent sm:text-xs">
            Engineering methodology
          </p>

          <h2 className="text-3xl font-medium tracking-[-0.035em] text-text-primary sm:text-5xl">
            From idea to{' '}
            <span className="font-medium text-accent">launch.</span>
          </h2>

          <p className="mt-4 text-sm font-normal leading-7 text-text-secondary sm:text-base">
            Clear milestones. Working software. No surprises.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop timeline background */}
          <div className="absolute left-[5.5px] right-[5.5px] top-5 hidden h-px bg-border md:block" />

          {/* Desktop animated progress line */}
          <motion.div
            className="absolute left-[5.5px] top-5 hidden h-px origin-left bg-accent md:block"
            style={{
              width: 'calc(100% - 11px)',
              scaleX: reduced ? 1 : progress,
            }}
          />

          {/* Desktop moving indicator */}
          {!reduced && (
            <motion.div
              style={{
                left: movingDotPosition,
              }}
              className="absolute top-[16px] z-20 hidden h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)] md:block"
            />
          )}

          {/* Mobile connecting line */}
          <div className="absolute bottom-5 left-5 top-5 w-px bg-border md:hidden" />

          {/* Mobile animated line */}
          <motion.div
            className="absolute left-5 top-5 w-px origin-top bg-accent md:hidden"
            style={{
              height: 'calc(100% - 40px)',
              scaleY: reduced ? 1 : progress,
            }}
          />

          {/* Timeline steps */}
          <div className="grid grid-cols-1 gap-12 pl-0 md:grid-cols-4 md:gap-7">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.number}
                step={step}
                index={index}
                total={steps.length}
                progress={progress}
                reduced={reduced}
              />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 w-fit max-w-full border-t border-border pt-6 text-center"
        >
          <span className="text-xs font-normal leading-6 text-text-secondary sm:text-sm">
            Tested releases, clear updates, and support after launch.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
