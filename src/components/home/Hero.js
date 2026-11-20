'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  ArrowUpRight,
  Cloud,
  Globe,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';

import { Button } from '../common/Button.js';

/* ============================================
   CONFIG
============================================ */

const ROTATING_WORDS = [
  'SaaS Platforms',
  'Mobile Apps',
  'AI Products',
  'Internal Tools',
];

const TECH = [
  'React',
  'Next.js',
  'Flutter',
  'React Native',
  'Node.js',
  'Python',
  'PostgreSQL',
  'AWS',
  'OpenAI',
  'Stripe',
  'Docker',
  'TypeScript',
];

const LAYERS = [
  { name: 'Infrastructure', sub: 'Cloud & Security' },
  { name: 'Intelligence', sub: 'APIs, Data & AI' },
  { name: 'Applications', sub: 'Web & Mobile' },
  { name: 'Experience', sub: 'Design & UI/UX' },
];

const LAYER_GAP = 44;
const LIFT = 26;

/* ============================================
   UTILITIES
============================================ */

function CountUp({ to, prefix = '', suffix = '', format = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return undefined;

    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, to, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {format ? val.toLocaleString() : val}
      {suffix}
    </span>
  );
}

function RotatingWord() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;

    const t = setInterval(() => {
      setI((n) => (n + 1) % ROTATING_WORDS.length);
    }, 2800);

    return () => clearInterval(t);
  }, [reduced]);

  return (
    <span className="relative block h-[1.22em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_WORDS[i]}
          initial={{ y: '80%', opacity: 0, filter: 'blur(5px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-80%', opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 text-transparent bg-clip-text
            bg-gradient-to-r from-accent via-accent to-amber-500
            dark:from-orange-300 dark:via-orange-400 dark:to-amber-400"
        >
          {ROTATING_WORDS[i]}
        </motion.span>
      </AnimatePresence>

      <span className="invisible">{ROTATING_WORDS[0]}</span>
    </span>
  );
}

function Float({
  children,
  className = '',
  duration = 6,
  delay = 0,
  y = 7,
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduced ? undefined : { y: [0, -y, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

const glass =
  'border border-accent/35 bg-white/90 backdrop-blur-lg ' +
  'shadow-[0_12px_35px_-14px_rgba(217,119,40,0.5)] ' +
  'dark:border-white/10 dark:bg-[#07110e]/75 ' +
  'dark:shadow-[0_12px_35px_-18px_rgba(0,0,0,0.65)]';

/* ============================================
   LAYER FACES
============================================ */

function ExperienceFace() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 p-3 sm:p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-md bg-accent dark:bg-orange-400/90" />
        <i className="h-1 w-12 rounded bg-accent/60 dark:bg-white/50" />
        <i className="ml-auto h-1 w-7 rounded bg-accent/35 dark:bg-white/25" />
      </div>

      <div className="relative flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-accent to-accent dark:from-orange-400/65 dark:to-orange-800/65">
        {!reduced && (
          <motion.span
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/30"
            animate={{ x: ['-130%', '420%'] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1.5,
            }}
          />
        )}

        <div className="absolute left-3 bottom-3 space-y-1.5">
          <i className="block h-1.5 w-16 rounded bg-white/90" />
          <i className="block h-1 w-10 rounded bg-white/70 dark:bg-white/45" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-7 rounded-md bg-accent/50 dark:bg-white/15"
            animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="h-5 rounded-full bg-accent dark:bg-white/90 flex items-center justify-center">
        <i className="h-1 w-10 rounded bg-white/90 dark:bg-orange-600/60" />
      </div>
    </div>
  );
}

function ApplicationsFace() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 p-3 sm:p-4 flex items-center justify-center gap-2.5">
      <div className="flex-1 h-[80%] rounded-lg border border-accent/70 dark:border-white/35 p-2 space-y-1.5">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-accent/60 dark:bg-white/45"
            />
          ))}
        </div>

        <i className="block h-1 w-3/4 rounded bg-accent/50 dark:bg-white/35" />
        <i className="block h-7 rounded bg-accent/70 dark:bg-orange-400/35" />
        <i className="block h-1 w-1/2 rounded bg-accent/35 dark:bg-white/25" />
        <i className="block h-1 w-2/3 rounded bg-accent/35 dark:bg-white/25" />
      </div>

      <div className="w-[33%] h-[90%] rounded-lg border border-accent/80 dark:border-orange-300/65 p-1.5 space-y-1.5">
        <i className="block mx-auto h-1 w-4 rounded-full bg-accent/60 dark:bg-white/45" />

        <motion.i
          className="block h-8 rounded-md bg-accent/70 dark:bg-orange-400/45"
          animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <i className="block h-1 rounded bg-accent/45 dark:bg-white/30" />
        <i className="block h-1 w-2/3 rounded bg-accent/30 dark:bg-white/20" />
        <i className="block h-1 rounded bg-accent/45 dark:bg-white/30" />
      </div>
    </div>
  );
}

function IntelligenceFace() {
  const reduced = useReducedMotion();

  const nodes = [
    [50, 50],
    [16, 24],
    [84, 20],
    [18, 80],
    [82, 78],
    [50, 10],
    [50, 92],
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full p-3"
    >
      {nodes.slice(1).map(([x, y], i) => (
        <g key={i}>
          <line
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            className="stroke-accent/70 dark:stroke-white/20"
            strokeWidth=".9"
          />

          <motion.line
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            className="stroke-accent dark:stroke-orange-400"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="2 14"
            animate={
              reduced ? undefined : { strokeDashoffset: [0, -32] }
            }
            transition={{
              duration: 3 + i * 0.25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </g>
      ))}

      {nodes.map(([x, y], i) => (
        <g key={i}>
          <motion.circle
            cx={x}
            cy={y}
            r={i === 0 ? 7 : 4}
            fill="none"
            className="stroke-accent dark:stroke-emerald-400"
            strokeWidth="1.2"
            animate={
              reduced
                ? undefined
                : {
                    r: i === 0 ? [7, 10, 7] : [4, 6, 4],
                    opacity: [0.85, 0, 0.85],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.35,
            }}
          />

          <circle
            cx={x}
            cy={y}
            r={i === 0 ? 4.5 : 2.4}
            className={
              i === 0
                ? 'fill-accent dark:fill-white'
                : 'fill-accent dark:fill-emerald-400'
            }
          />
        </g>
      ))}
    </svg>
  );
}

function InfrastructureFace() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-80 dark:opacity-40
          [--dot:rgba(217,119,40,.75)] dark:[--dot:rgba(110,231,183,.4)]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--dot) 1px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      />

      {!reduced && (
        <motion.span
          className="absolute w-16 h-16 rounded-full border border-accent/70 dark:border-orange-300/35"
          animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <span className="absolute w-24 h-24 rounded-full border border-accent/60 dark:border-white/15" />

      <div className="relative w-12 h-12 rounded-xl bg-white border border-accent/50 dark:border-transparent dark:bg-white/95 flex items-center justify-center shadow-[0_0_28px_rgba(217,119,40,.5)] dark:shadow-[0_0_25px_rgba(249,115,22,.25)]">
        <ShieldCheck size={23} className="text-accent dark:text-orange-700" />
      </div>
    </div>
  );
}

const FACES = [
  InfrastructureFace,
  IntelligenceFace,
  ApplicationsFace,
  ExperienceFace,
];

/* ============================================
   ISOMETRIC STACK
============================================ */

function Slab({ index, active, assembled }) {
  const Face = FACES[index];

  const z = index * LAYER_GAP - 90 + (active ? LIFT : 0);

  return (
    <motion.div
      className={`home-stack-slab absolute inset-0 rounded-xl overflow-hidden border transition-[border-color,box-shadow,background] duration-500
        bg-gradient-to-br ${
          active
            ? 'home-stack-slab-active from-accent/30 to-accent/15 border-transparent shadow-[0_0_30px_rgba(217,119,40,0.35)] ' +
              'dark:from-white/15 dark:to-orange-400/10 dark:border-orange-300/60 dark:shadow-[0_0_35px_rgba(249,115,22,0.25)]'
            : 'from-accent/20 to-accent/[0.08] border-transparent shadow-[0_8px_24px_rgba(217,119,40,0.15)] ' +
              'dark:from-white/[0.10] dark:to-orange-400/[0.035] dark:border-white/20 dark:shadow-[0_0_18px_rgba(217,119,40,0.08)]'
        } backdrop-blur-sm`}
      initial={{ z: 320, opacity: 0 }}
      animate={{ z, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 18,
        delay: assembled ? 0 : index * 0.18,
      }}
    >
      <Face />

      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent dark:ring-white/10 pointer-events-none" />
    </motion.div>
  );
}

function StackScene() {
  const reduced = useReducedMotion();

  const [active, setActive] = useState(3);
  const [paused, setPaused] = useState(false);
  const [assembled, setAssembled] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 70, damping: 20 });
  const sy = useSpring(my, { stiffness: 70, damping: 20 });

  const rotateZ = useTransform(
    sx,
    [-0.5, 0.5],
    reduced ? [-42, -42] : [-51, -33]
  );

  const rotateX = useTransform(
    sy,
    [-0.5, 0.5],
    reduced ? [58, 58] : [61, 53]
  );

  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced || paused || !assembled) return undefined;

    const t = setInterval(() => {
      setActive((a) => (a + 3) % 4);
    }, 2800);

    return () => clearInterval(t);
  }, [reduced, paused, assembled]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();

    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const labels = [...LAYERS]
    .map((l, i) => ({ ...l, i }))
    .reverse();

  const LabelList = (
    <>
      {labels.map((l) => {
        const on = active === l.i;

        return (
          <button
            key={l.name}
            type="button"
            onMouseEnter={() => {
              setActive(l.i);
              setPaused(true);
            }}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => {
              setActive(l.i);
              setPaused(true);
            }}
            onBlur={() => setPaused(false)}
            className={`group flex items-center gap-2 sm:gap-2.5 rounded-lg border px-2.5 sm:px-3 py-1.5 sm:py-2 text-left backdrop-blur-lg transition-all duration-300 min-w-0 ${
              on
                ? 'border-accent bg-accent/80 shadow-[0_0_20px_-6px_rgba(217,119,40,.6)] dark:border-orange-300/45 dark:bg-orange-400/[0.08] dark:shadow-[0_0_20px_-8px_rgba(249,115,22,.3)]'
                : 'border-accent/35 bg-white/80 hover:border-accent/60 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-white/20'
            }`}
          >
            <span
              className={`text-[9px] font-bold tabular-nums transition-colors ${
                on
                  ? 'text-accent dark:text-orange-300'
                  : 'text-accent dark:text-white/35'
              }`}
            >
              0{LAYERS.length - l.i}
            </span>

            <span>
              <span
                className={`block text-[11px] font-semibold transition-colors ${
                  on
                    ? 'text-black dark:text-white'
                    : 'text-black/80 dark:text-white/65'
                }`}
              >
                {l.name}
              </span>

              <span className="block text-[9px] text-black/65 dark:text-white/40">
                {l.sub}
              </span>
            </span>

            <span
              className={`ml-auto w-1.5 h-1.5 rounded-full transition-all ${
                on
                  ? 'bg-accent shadow-[0_0_7px_#f97316] dark:bg-orange-300'
                  : 'bg-accent/50 dark:bg-white/20'
              }`}
            />
          </button>
        );
      })}
    </>
  );

  return (
    <div>
      <div
        className="relative mx-auto w-full max-w-[540px] h-[310px] sm:h-[440px] overflow-hidden sm:overflow-visible"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ perspective: 1500 }}
      >
        {/* Ambient light */}
        <div className="absolute left-[8%] sm:left-[2%] top-[12%] w-[280px] h-[280px] rounded-full bg-accent/25 dark:bg-orange-500/10 blur-[100px] pointer-events-none" />

        {/* Scene centre */}
        <div className="absolute left-1/2 sm:left-[37%] top-[47%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[175px] h-[175px] sm:w-[220px] sm:h-[220px]">

            {/* Ground glow */}
            <div className="absolute left-1/2 top-[88%] -translate-x-1/2 w-[250px] h-[60px] rounded-full bg-accent/40 dark:bg-orange-400/12 blur-2xl pointer-events-none" />

            {/* 3D stage */}
            <motion.div
              className="absolute inset-0"
              style={{
                rotateX,
                rotateZ,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Orbit rings */}
              {[300, 390].map((size, i) => (
                <motion.div
                  key={size}
                  className={`absolute left-1/2 top-1/2 rounded-full border border-dashed ${
                    i
                      ? 'border-accent/60 dark:border-white/10'
                      : 'border-accent/70 dark:border-orange-300/20'
                  } ${i ? 'home-stack-orbit' : ''}`}
                  style={{
                    width: size,
                    height: size,
                    marginLeft: -size / 2,
                    marginTop: -size / 2,
                    transform: 'translateZ(-100px)',
                  }}
                  animate={reduced ? undefined : { rotate: i ? -360 : 360 }}
                  transition={{
                    duration: 55 + i * 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <span
                    className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-accent dark:bg-orange-300/80"
                    style={{
                      boxShadow: '0 0 12px 3px rgba(217,119,40,.6)',
                    }}
                  />

                  <span
                    className="absolute bottom-8 -left-1 w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent/80"
                    style={{
                      boxShadow: '0 0 12px 3px rgba(217,119,40,.6)',
                    }}
                  />
                </motion.div>
              ))}

              {LAYERS.map((_, i) => (
                <Slab
                  key={i}
                  index={i}
                  active={active === i}
                  assembled={assembled}
                />
              ))}
            </motion.div>

            {/* Energy beam */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-[25%] h-[125%] w-px pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-accent/70 to-transparent dark:via-orange-300/40" />

              {!reduced &&
                [0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 -ml-[2px] bottom-0 w-1 h-1 rounded-full bg-accent dark:bg-accent"
                    style={{
                      boxShadow: '0 0 10px 2px rgba(217,119,40,.6)',
                    }}
                    animate={{
                      y: [0, -260],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: 'easeOut',
                    }}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Floating technology chips */}
        <Float
          duration={6}
          delay={0.2}
          y={7}
          className="absolute z-20 top-[6%] left-[2%]"
        >
          <div className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${glass}`}>
            <Globe size={12} className="text-accent dark:text-orange-300/80" />
            <span className="text-[9px] font-semibold text-black dark:text-white/80">
              Web Apps
            </span>
          </div>
        </Float>

        <Float
          duration={6.5}
          delay={0.8}
          y={8}
          className="absolute z-20 bottom-[10%] left-[0%]"
        >
          <div className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${glass}`}>
            <Smartphone size={12} className="text-accent dark:text-orange-300/80" />
            <span className="text-[9px] font-semibold text-black dark:text-white/80">
              iOS · Android
            </span>
          </div>
        </Float>

        <Float
          duration={6}
          delay={1.3}
          y={6}
          className="absolute z-20 top-[4%] left-[44%] sm:left-[38%]"
        >
          <div className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${glass}`}>
            <Sparkles size={12} className="text-accent dark:text-white/80" />
            <span className="text-[9px] font-semibold text-black dark:text-white/80">
              AI Ready
            </span>
          </div>
        </Float>

        <Float
          duration={7}
          delay={0.5}
          y={7}
          className="hidden sm:block absolute z-20 bottom-[6%] left-[42%]"
        >
          <div className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${glass}`}>
            <Cloud size={12} className="text-accent dark:text-orange-300/80" />
            <span className="text-[9px] font-semibold text-black dark:text-white/80">
              Scales on cloud
            </span>
          </div>
        </Float>

        {/* Layer legend desktop */}
        <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 w-[165px]">
          {LabelList}
        </div>
      </div>

      {/* Layer legend mobile */}
      <div className="sm:hidden grid grid-cols-2 gap-1.5 mt-2">
        {LabelList}
      </div>
    </div>
  );
}

/* ============================================
   TECH MARQUEE
============================================ */

function TechMarquee() {
  const reduced = useReducedMotion();
  const items = [...TECH, ...TECH];

  return (
    <div
      className="relative mt-2 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <motion.div
        className="flex gap-9 w-max py-3"
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-9 text-xs font-semibold text-text-muted/65 whitespace-nowrap"
          >
            {t}

            <span className="w-1 h-1 rounded-full bg-accent/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================
   HERO
============================================ */

export function Hero() {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);

  const spotlight = useMotionTemplate`
    radial-gradient(480px circle at ${mx}px ${my}px,
    rgba(217,119,40,0.12), transparent 70%)
  `;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, 90]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, 35]
  );

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();

    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      data-scroll-motion-ignore
      className="relative overflow-hidden pt-0 bg-background-primary"
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: orbY }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute -top-40 -left-32 w-[460px] h-[460px] rounded-full bg-accent/30 dark:bg-orange-500/10 blur-[120px]"
            animate={
              reduced
                ? undefined
                : { x: [0, 35, 0], y: [0, 25, 0] }
            }
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute top-[18%] -right-40 w-[420px] h-[420px] rounded-full bg-amber-400/30 dark:bg-amber-400/[0.07] blur-[120px]"
            animate={
              reduced
                ? undefined
                : { x: [0, -30, 0], y: [0, 35, 0] }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-0 left-[35%] w-[320px] h-[320px] rounded-full bg-accent/30 dark:bg-lime-300/[0.045] blur-[120px]"
            animate={
              reduced
                ? undefined
                : { x: [0, 25, 0], y: [0, -20, 0] }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(217,119,40,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,40,.18) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse at 50% 30%, #000 25%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 30%, #000 25%, transparent 75%)',
          }}
        />

        {/* Subtle rising particles */}
        {!reduced &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent dark:bg-orange-300/60"
              style={{
                left: `${6 + ((i * 41) % 88)}%`,
                bottom: `${(i * 17) % 40}%`,
                boxShadow:
                  '0 0 10px 2px rgba(217,119,40,.55)',
              }}
              animate={{
                y: [0, -110 - (i % 4) * 30],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 7 + (i % 5),
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeOut',
              }}
            />
          ))}

        <motion.div
          className="absolute inset-0"
          style={{ background: spotlight }}
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background-primary to-transparent" />
      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-3 items-center min-h-0 lg:min-h-[70vh] pt-8 sm:pt-14 lg:pt-24 pb-8 lg:pb-12">

          {/* LEFT CONTENT */}

          <motion.div
            style={{ y: contentY }}
            className="lg:col-span-5 relative z-20"
          >
            <motion.h1
              {...fade(0.08)}
              className="home-hero-title text-[clamp(1.9rem,4vw,3.65rem)] font-medium tracking-[-0.045em] text-text-primary mb-4 leading-[1.08] [font-family:var(--font-manrope)]"
            >
              We Architect &amp; Build

              <RotatingWord />

              That Scale Into Market Leaders.
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="text-[13px] md:text-[15px] text-text-secondary max-w-xl mb-6 leading-relaxed"
            >
              From high-velocity SaaS platforms and mobile applications to
              intelligent internal tools, Dotix turns ambitious concepts
              into battle-tested production software.
            </motion.p>

            {/* CTA BUTTONS */}

            <motion.div
              {...fade(0.24)}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Button
                href="/contact"
                variant="primary"
                className="group !bg-accent !text-white hover:!bg-accent-hover
                  dark:!bg-white dark:!text-black dark:hover:!bg-orange-50
                  text-xs md:text-sm font-semibold px-5 py-3
                  shadow-md shadow-accent/30 transition-all duration-300"
              >
                Start Your Project
              </Button>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-text-primary/80 hover:text-text-primary transition-colors"
              >
                See our work

                <span className="w-7 h-7 rounded-full border border-accent/60 dark:border-orange-300/25 flex items-center justify-center group-hover:bg-accent/15 group-hover:border-accent dark:group-hover:border-orange-300/45 transition-all">
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </motion.div>

            {/* METRICS */}

            <motion.div
              {...fade(0.32)}
              className="pt-5 border-t border-border/60 grid grid-cols-3 gap-2 sm:gap-5 max-w-xl"
            >
              <div>
                <div className="text-base sm:text-xl font-bold text-text-primary">
                  <CountUp to={90} prefix="< " />{' '}
                  <span className="text-[10px] text-accent dark:text-orange-400/80">
                    Days
                  </span>
                </div>

                <p className="text-[9px] sm:text-[11px] text-text-muted mt-1">
                  Average MVP Launch
                </p>
              </div>

              <div className="border-l border-border/60 pl-2 sm:pl-5">
                <div className="text-base sm:text-xl font-bold text-text-primary">
                  <CountUp to={10000} format suffix="+" />
                </div>

                <p className="text-[9px] sm:text-[11px] text-text-muted mt-1">
                  Active Users Served
                </p>
              </div>

              <div className="border-l border-border/60 pl-2 sm:pl-5">
                <div className="text-base sm:text-xl font-bold text-accent dark:text-orange-400/90">
                  <CountUp to={100} suffix="%" />
                </div>

                <p className="text-[9px] sm:text-[11px] text-text-muted mt-1">
                  Client IP Ownership
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL */}

          <motion.div
            className="lg:col-span-7 relative min-w-0"
            initial={
              reduced
                ? false
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <StackScene />
          </motion.div>
        </div>

        {/* ========================================
            TECH STACK STRIP
        ======================================== */}

        {/* <TechMarquee /> */}
      </div>
    </section>
  );
}