'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Code2,
  Cpu,
  Globe2,
  Hammer,
  Layers3,
  Lightbulb,
  LayoutDashboard,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
} from 'lucide-react';

import { SectionHeading } from '../../components/common/SectionHeading.js';

const IMG = {
  sayYes: '/images/about/team-collaboration.png',
  workspace: '/images/about/team-workspace.png',
  team: '/images/about/team-at-work.png',
};

/* =========================================================
   DATA
========================================================= */

const values = [
  {
    number: '01',
    title: 'Ownership',
    description:
      'We never say “that’s not my job.” We act on behalf of the entire company. We think long term and don’t sacrifice long-term value for short-term results.',
    detail: 'We take responsibility from the first idea to the final outcome.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Curiosity',
    description:
      'We question assumptions, explore better approaches, and keep learning. Good ideas can come from anywhere.',
    detail: 'We stay curious, experiment, and keep improving how we build.',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Collaboration',
    description:
      'We work openly, share knowledge, and solve challenges together. Better products come from better teamwork.',
    detail: 'We bring people, ideas, and expertise together.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Impact',
    description:
      'We focus on work that creates real value. Every decision should move the product, the business, or its users forward.',
    detail: 'We measure success by the value our work creates.',
    icon: Target,
  },
];

const circles = [
  {
    title: 'Who',
    description:
      'We are a product development studio with an AI-driven, customer-centric approach.',
  },
  {
    title: 'What',
    description:
      'We build robust, scalable applications that drive growth and create value for modern businesses.',
  },
  {
    title: 'Why',
    description:
      'Our vision is to empower everyone to build things faster.',
  },
];

const pillars = [
  {
    icon: Lightbulb,
    title: 'Product thinking',
    text: 'We understand the problem, the people using the product and the outcome it needs to deliver.',
  },
  {
    icon: Code2,
    title: 'Thoughtful engineering',
    text: 'We build reliable, maintainable software that can evolve as your business grows.',
  },
  {
    icon: Cpu,
    title: 'Smarter workflows',
    text: 'We use modern tools and AI where they genuinely improve the way products are designed and built.',
  },
];

const offerings = [
  {
    icon: Layers3,
    title: 'SaaS platforms & MVPs',
    text: 'From a first validated idea to a scalable product, we build software around the way your business works.',
    href: '/services/saas-development',
    tags: ['MVPs', 'Dashboards', 'Platforms'],
  },
  {
    icon: LayoutDashboard,
    title: 'Business software',
    text: 'Purpose-built admin panels, internal tools and automation that make everyday operations simpler.',
    href: '/services/saas-development',
    tags: ['Admin panels', 'CRMs', 'Automation'],
  },
  {
    icon: Smartphone,
    title: 'Mobile applications',
    text: 'Useful, intuitive mobile experiences designed to work smoothly across devices.',
    href: '/services/mobile-app-development',
    tags: ['Android', 'iOS', 'Cross-platform'],
  },
  {
    icon: Globe2,
    title: 'Websites & experiences',
    text: 'Fast, accessible and search-ready websites that communicate clearly and turn visits into action.',
    href: '/services/web-development',
    tags: ['Web design', 'Next.js', 'SEO'],
  },
];

const process = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    text: 'We understand your goals, users, requirements and constraints before deciding what to build.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Plan & design',
    text: 'We shape the user journey, define the scope and turn ideas into a clear product direction.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build',
    text: 'We develop in focused iterations, sharing progress and working software along the way.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & improve',
    text: 'We prepare for launch, monitor how things work and identify what can be improved next.',
  },
];

const facts = [
  { icon: CalendarDays, label: 'Established', value: 'January 2023' },
  { icon: Globe2, label: 'Headquarters', value: 'New Delhi NCR, India' },
  { icon: Code2, label: 'What we build', value: 'SaaS, web, mobile & business software' },
  { icon: Users, label: 'Who we work with', value: 'Startups, businesses & product teams' },
];

const journey = [
  {
    date: 'January 2023',
    title: 'The beginning',
    text: 'Dotix started as the technology team inside AMS Group. An engineering-focused initiative grew into a team building its own products and working with businesses beyond the group.',
  },
  {
    date: 'Today',
    title: 'Building what comes next',
    text: 'Today, Dotix builds and operates SaaS products while developing custom software for startups, businesses and product teams. We bring product experience and engineering execution together.',
  },
];

const stack = [
  'Next.js',
  'React',
  'Node.js',
  'React Native',
  'TypeScript',
  'PostgreSQL',
  'AWS',
  'Figma',
];

/* =========================================================
   SHARED
========================================================= */

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
const sectionSpace = 'py-20 sm:py-24 lg:py-28';

function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-7 bg-accent" />
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  className = '',
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <h2 className="text-3xl font-semibold leading-[1.13] tracking-tight text-white sm:text-4xl lg:text-[46px]">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function PhotoFrame({
  src,
  alt,
  ratio = 'aspect-[4/5]',
  blocks = [],
  sizes,
  priority = false,
  className = '',
  children,
}) {
  return (
    <div className={`relative ${className}`}>
      {blocks.map((cls, i) => (
        <div
          key={i}
          className={`absolute ${cls}`}
          aria-hidden="true"
        />
      ))}

      <div
        className={`relative ${ratio} overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-background-card to-background-card`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || '(min-width: 1024px) 45vw, 100vw'}
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>

      {children}
    </div>
  );
}

function Caption({ title, text, className = '' }) {
  return (
    <div
      className={`absolute z-10 max-w-[230px] rounded-xl border border-white/10 bg-[#191a1d]/95 px-4 py-3 shadow-xl backdrop-blur-xl ${className}`}
    >
      <p className="text-xs font-semibold text-white">{title}</p>
      <p className="mt-1 text-[11px] leading-5 text-white/50">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-hero relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-border/60 bg-background-primary py-24 sm:min-h-[680px] sm:py-28 lg:min-h-[740px]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src="/dotix-logo.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="about-hero__logo object-contain px-5 opacity-[0.055] sm:px-10"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/15 via-background-primary/45 to-background-primary/35" />

        <div className="absolute -right-40 -top-44 h-[550px] w-[550px] rounded-full bg-accent/[0.12] blur-[150px]" />

        <div className="absolute -bottom-64 left-0 h-[450px] w-[650px] rounded-full bg-accent/[0.06] blur-[150px]" />
      </motion.div>

      <div className={`relative z-10 w-full ${container}`}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            About Dotix, since 2023
          </p>

          <h1 className="mx-auto max-w-4xl text-[30px] font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl lg:text-[68px]">
            We’re building a new way to make software.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
            We design, engineer and operate digital products that solve real
            problems, for our own SaaS products and for the businesses we
            partner with.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(249,115,22,0.22)]"
            >
              Let’s build together

              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent/50 hover:bg-accent/[0.06]"
            >
              Explore our work
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   MAKING IT EASY
========================================================= */

function MakingItEasy() {
  return (
    <section className={`overflow-hidden bg-background-secondary/50 ${sectionSpace}`}>
      <div className={`grid items-center gap-16 lg:grid-cols-2 lg:gap-24 ${container}`}>
        <Reveal>
          <PhotoFrame
            src={IMG.sayYes}
            alt="Product team members collaborating around their workstations"
            ratio="aspect-[4/3]"
            blocks={[
              '-left-6 -top-6 h-3/5 w-3/5 bg-accent/25 sm:-left-10 sm:-top-10',
              '-bottom-6 right-[-1.5rem] h-24 w-24 bg-white/[0.07] sm:-bottom-8',
            ]}
            className="mx-auto max-w-[460px]"
          >
            <Caption
              title="People first. Product always."
              text="We listen before we build."
              className="-right-3 top-10 hidden sm:block lg:-right-10"
            />
          </PhotoFrame>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="max-w-lg text-3xl font-semibold leading-[1.13] tracking-tight text-white sm:text-4xl lg:text-[46px]">
            Making it easy to say{' '}
            <span className="text-accent">“yes”</span> to your next idea.
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-8 text-text-secondary sm:text-base">
            Dotix is a product development studio with an AI-driven,
            customer-centric approach. We work across the complete product
            journey: understanding the challenge, shaping the experience,
            engineering the solution and helping it evolve.
          </p>

          <p className="mt-4 max-w-lg text-sm leading-8 text-text-secondary sm:text-base">
            We believe technology should make things clearer, simpler and
            more useful. That belief guides the products we create and the
            partnerships we build.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              'Product mindset',
              'Clear communication',
              'Long-term thinking',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={13} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   SOLUTIONS
========================================================= */

function ProductVisual() {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-border shadow-2xl">
      <Image
        src="/images/about/developer-workspace-dashboard.png"
        alt="Developer workspace with a laptop, mobile app, and software dashboard"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function Solutions() {
  return (
    <section className={`overflow-hidden bg-background-primary ${sectionSpace}`}>
      <div className={`grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 ${container}`}>
        <Reveal>
          <SectionIntro
            title={<>Solutions built on clarity and simplicity.</>}
            description="Great ideas shouldn’t be held back by complexity. We bring product thinking, engineering and modern technology together to turn possibilities into working software."
          />

          <div className="mt-10 space-y-6">
            {pillars.map((p) => {
              const Icon = p.icon;

              return (
                <div key={p.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>

                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {p.title}
                    </h3>

                    <p className="mt-1 max-w-md text-sm leading-7 text-text-secondary">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-[560px] py-8 pr-6 sm:pr-10">
            <div
              className="absolute right-0 top-0 h-[70%] w-[55%] rounded-2xl bg-accent/20"
              aria-hidden="true"
            />

            <div
              className="absolute bottom-0 left-0 h-[35%] w-[40%] rounded-2xl bg-white/[0.06]"
              aria-hidden="true"
            />

            <div className="relative -ml-2 sm:-ml-6">
              <ProductVisual />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   VALUES TIMELINE (pinned, scroll-driven)
========================================================= */

const STAGE_TIME = 3000;

// Scroll length per value, in viewport heights (smaller = less empty scrolling)
const SCROLL_PER_STAGE = 40;

// Share of the pinned scroll used to step through the 4 values.
// The small remainder is a short hold on the last value before the page moves on.
const STAGE_END = 0.88;

const stageFromProgress = (p) =>
  Math.max(
    0,
    Math.min(values.length - 1, Math.floor((p / STAGE_END) * values.length))
  );

/*
  position: sticky stops working when ANY parent has overflow hidden/auto/scroll.
  This switches every ancestor of the pinned block to `overflow-x: clip`
  (still hides sideways overflow, but keeps sticky working), and applies the
  section height from lg up.
*/
const VALUES_CSS = `
:is(html, body, main, div, section, article):has(.values-sticky){
  overflow-x: clip;
  overflow-y: visible;
}
@media (min-width: 1024px){
  .values-section{ min-height: var(--values-height); }
}
`;

function ValuesTimeline() {
  const [activeValue, setActiveValue] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const lastChange = useRef(0);
  const isDesktop = useRef(false);

  // Track the lg breakpoint in a ref (no hydration mismatch, no re-render)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => {
      isDesktop.current = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // The curved line is fully drawn exactly when the last value is reached
  const lineProgress = useTransform(scrollYProgress, [0, STAGE_END], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // The pinned scroll effect only exists on desktop
    if (!isDesktop.current) return;

    setActiveValue(stageFromProgress(progress));
  });

  useEffect(() => {
    lastChange.current = Date.now();
  }, [activeValue]);

  const scrollToStage = (index) => {
    const section = sectionRef.current;

    if (!section) return;

    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;

    const range = section.offsetHeight - window.innerHeight;

    window.scrollTo({
      top: sectionTop + range * STAGE_END * ((index + 0.5) / values.length),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (reduceMotion) return;

    const markInput = () => {
      lastChange.current = Date.now();
    };

    const events = [
      'wheel',
      'touchstart',
      'touchmove',
      'keydown',
      'pointerdown',
    ];

    events.forEach((e) =>
      window.addEventListener(e, markInput, { passive: true })
    );

    const id = setInterval(() => {
      const section = sectionRef.current;

      if (!section || !isDesktop.current) return;

      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;

      if (range <= 0) return;

      const progress = -rect.top / range;

      if (progress < 0 || progress >= 1) {
        lastChange.current = Date.now();
        return;
      }

      if (Date.now() - lastChange.current < STAGE_TIME) return;

      const current = stageFromProgress(progress);

      if (current >= values.length - 1) return;

      lastChange.current = Date.now();
      scrollToStage(current + 1);
    }, 200);

    return () => {
      clearInterval(id);
      events.forEach((e) =>
        window.removeEventListener(e, markInput)
      );
    };
  }, [reduceMotion]);

  const active = values[activeValue];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="values-section relative border-y border-border bg-background-primary py-16 sm:py-20 lg:py-0"
      // Same value on server and client, so there is no hydration mismatch.
      // The height is only applied from lg up (see VALUES_CSS).
      style={{ '--values-height': `${values.length * SCROLL_PER_STAGE + 100}vh` }}
    >
      <style dangerouslySetInnerHTML={{ __html: VALUES_CSS }} />

      {/* Mobile/Tablet view (< lg) */}
      <div className="lg:hidden mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What guides us"
          title="The principles behind our work."
          description="Four values shape how we work together and with the people we build for."
          spacingClassName="mb-6 text-center"
          titleClassName="text-white text-2xl sm:text-3xl text-center"
          descriptionClassName="mx-auto mt-2 max-w-md text-sm leading-7 text-text-secondary sm:text-base text-center"
          align="center"
        />

        {/* Horizontal selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {values.map((value, index) => {
            const isActive = activeValue === index;
            return (
              <button
                key={value.number}
                type="button"
                onClick={() => setActiveValue(index)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
                  isActive
                    ? 'border-accent bg-accent/15 text-accent font-semibold shadow-sm'
                    : 'border-border bg-background-card text-text-muted hover:border-accent/40'
                }`}
                aria-pressed={isActive}
              >
                <span className="font-bold">{value.number}</span>
                <span>{value.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Value Card */}
        <div className="rounded-2xl border border-border bg-background-card p-5 sm:p-7 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-accent">
            <ActiveIcon className="h-5 w-5" />
            <span className="font-mono text-xs tracking-[0.18em]">
              OUR VALUE / {active.number}
            </span>
          </div>

          <h3 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {active.title}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
            {active.description}
          </p>

          <div className="mt-5 border-t border-border pt-4">
            <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
              {active.detail}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view (>= lg) */}
      <div className="values-sticky hidden lg:flex sticky top-0 h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative flex flex-col items-center justify-center">
            <SectionHeading
              eyebrow="What guides us"
              title="The principles behind our work."
              description="Four values shape how we work together and with the people we build for."
              className="w-full"
              spacingClassName="mb-8"
              titleClassName="max-w-sm text-white"
              descriptionClassName="mt-2 max-w-sm text-sm leading-7 text-text-secondary sm:text-base"
            />

            <div className="relative flex h-[390px] w-full items-center justify-center">
              <svg
                viewBox="0 0 420 540"
                className="absolute h-full w-full max-w-[400px]"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path
                  d="M 70 -40 C 370 100 370 390 70 580"
                  stroke="var(--border)"
                  strokeWidth="28"
                  strokeLinecap="round"
                />

                <motion.path
                  d="M 70 -40 C 370 100 370 390 70 580"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: lineProgress }}
                />
              </svg>

              <div className="relative z-10 flex flex-col items-center gap-3">
                {values.map((value, index) => {
                  const isActive = activeValue === index;

                  return (
                    <button
                      key={value.number}
                      type="button"
                      onClick={() => scrollToStage(index)}
                      className={`flex items-center justify-center rounded-full border font-mono transition-all duration-500 ${
                        isActive
                          ? 'h-[76px] w-[76px] border-accent bg-accent/15 text-accent shadow-[0_0_30px_rgba(120,100,255,0.2)]'
                          : 'h-[58px] w-[58px] border-border bg-background-card text-text-muted opacity-50 hover:border-accent/50'
                      }`}
                      aria-pressed={isActive}
                    >
                      {value.number}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              Scroll to explore
            </p>
          </div>

          <div className="flex min-h-[380px] items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 25 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -20 }
                }
                transition={{ duration: 0.4 }}
                className="max-w-2xl"
              >
                <div className="mb-7 flex items-center gap-3 text-accent">
                  <ActiveIcon className="h-5 w-5" />

                  <span className="font-mono text-xs tracking-[0.18em]">
                    OUR VALUE / {active.number}
                  </span>
                </div>

                <h3 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {active.title}
                </h3>

                <p className="max-w-xl text-base leading-[1.9] text-text-secondary sm:text-lg">
                  {active.description}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm leading-relaxed text-text-muted">
                    {active.detail}
                  </p>
                </div>

                <div className="mt-10 flex gap-2">
                  {values.map((value, index) => (
                    <div
                      key={value.number}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        activeValue === index
                          ? 'w-10 bg-accent'
                          : 'w-4 bg-border'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHO / WHAT / WHY
========================================================= */

function WhoWhatWhy() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden bg-[#151515] text-white ${sectionSpace}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[150px]" />
      </div>

      <div className={`relative ${container}`}>
        <Reveal>
          <SectionHeading
            eyebrow="The Dotix perspective"
            title="Who we are. What we do. Why it matters."
            align="center"
            spacingClassName="mb-0"
          />
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-center gap-6 lg:mt-20 lg:flex-row lg:gap-0">
          {circles.map((circle, index) => (
            <motion.div
              key={circle.title}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.85 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                reduceMotion
                  ? {}
                  : { backgroundColor: 'rgba(255,255,255,0.035)' }
              }
              className={`relative flex aspect-square w-full max-w-[280px] xs:max-w-[320px] shrink-0 flex-col items-center justify-center rounded-full border border-accent/70 p-6 sm:p-10 text-center transition-colors duration-300 sm:max-w-[340px] lg:max-w-[350px] ${
                index !== 0 ? 'lg:-ml-8' : ''
              }`}
            >
              <span className="mb-4 block text-3xl font-semibold tracking-tight sm:text-4xl">
                {circle.title}
              </span>

              <p className="max-w-[240px] text-sm leading-[1.75] text-neutral-300 sm:text-[15px]">
                {circle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHAT WE BUILD
========================================================= */

const BUILD_IMAGES = [
  '/images/about/services/saas-platforms.png',
  '/images/about/services/business-software.png',
  '/images/about/services/mobile-applications.png',
  '/images/about/services/websites-experiences.png',
];

function WhatWeBuild() {
  return (
    <section className={`overflow-hidden bg-background-secondary/35 ${sectionSpace}`}>
      <div className={container}>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                What we build,{' '}
                <span className="text-accent">built around you.</span>
              </>
            }
            description="From the first product idea to the software your business relies on, explore the ways we turn challenges into useful digital experiences."
            align="center"
            className="max-w-3xl"
            spacingClassName="mb-0"
            titleClassName="text-3xl font-semibold sm:text-4xl lg:text-[46px]"
            descriptionClassName="mt-5 max-w-2xl text-sm leading-7 sm:text-base"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {offerings.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={index * 0.07}
                className="h-full"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/[0.07]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
                    <Image
                      src={BUILD_IMAGES[index]}
                      alt={`${item.title} service`}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                      aria-hidden="true"
                    />

                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md">
                      <Icon size={18} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-snug text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {item.text}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-background-secondary/50 px-2.5 py-1 text-[11px] text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={item.href}
                      className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                    >
                      Explore service

                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS (line fills as you scroll, steps light up)
========================================================= */

function ProcessSection() {
  const stepsRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [reached, setReached] = useState(0);

  // Track the steps block itself (not the whole section), with a wide range
  // so the line fills while the steps are actually on screen.
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 85%', 'end 40%'],
  });

  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const updateReached = (p) => {
    let n = 0;
    process.forEach((_, i) => {
      if (p >= i * 0.26 + 0.02) n = i + 1;
    });
    setReached((prev) => (prev === n ? prev : n));
  };

  useMotionValueEvent(scrollYProgress, 'change', updateReached);

  useEffect(() => {
    updateReached(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lit = reduceMotion ? process.length : reached;

  return (
    <section
      className={`border-t border-border/60 bg-background-secondary/50 ${sectionSpace}`}
    >
      <div className={container}>
        <Reveal className="mb-14 lg:mb-20">
          <SectionIntro
            eyebrow="How we work"
            title={
              <>
                A clear path from idea{' '}
                <span className="text-accent">to impact.</span>
              </>
            }
            description="Good products are not built in one giant leap. We break the work into clear stages, keep communication open and make progress visible."
          />
        </Reveal>

        <div ref={stepsRef} className="relative">
          <div className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-border lg:block" />

          <motion.div
            style={{ scaleX: reduceMotion ? 1 : lineScale }}
            className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] origin-left bg-accent lg:block"
          />

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {process.map((step, index) => {
              const Icon = step.icon;
              const active = index < lit;

              return (
                <Reveal key={step.number} delay={index * 0.1}>
                  <div
                    className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full border bg-background-secondary shadow-[0_0_0_7px_var(--background-secondary)] transition-all duration-500 ${
                      active
                        ? 'scale-110 border-accent text-accent'
                        : 'border-border text-text-muted'
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <p
                    className={`font-mono text-[10px] tracking-[0.18em] transition-colors duration-500 ${
                      active ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    STEP {step.number}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-text-secondary">
                    {step.text}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TEAM
========================================================= */

function TeamSection() {
  return (
    <section className={`overflow-hidden bg-background-primary ${sectionSpace}`}>
      <div className={`grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 ${container}`}>
        <Reveal>
          <PhotoFrame
            src={IMG.team}
            alt="The Dotix team working together at a shared table"
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 55vw, 100vw"
            blocks={[
              '-bottom-6 -left-6 h-3/5 w-1/3 bg-[#151515] border border-border sm:-bottom-10 sm:-left-10',
              '-right-4 -top-5 h-16 w-16 bg-accent sm:-right-6 sm:-top-7 sm:h-20 sm:w-20',
            ]}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="max-w-md text-3xl font-semibold leading-[1.13] tracking-tight text-white sm:text-4xl lg:text-[46px]">
            Our team is always growing.
          </h2>

          <p className="mt-6 max-w-md text-sm leading-8 text-text-secondary sm:text-base">
            Dotix started as an engineering-focused team in New Delhi NCR
            and keeps growing around curious people who own their work. If
            you like turning ideas into real products, we’d like to hear
            from you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   JOURNEY + FACTS + STACK
========================================================= */

function Journey() {
  const lineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 75%', 'end 50%'],
  });

  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const updateReached = (p) => {
    let n = 0;
    journey.forEach((_, i) => {
      if (p >= i / journey.length + 0.05) n = i + 1;
    });
    setReached((prev) => (prev === n ? prev : n));
  };

  useMotionValueEvent(scrollYProgress, 'change', updateReached);

  useEffect(() => {
    updateReached(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lit = reduceMotion ? journey.length : reached;

  return (
    <section className={`border-y border-border/60 bg-background-secondary/50 ${sectionSpace}`}>
      <div className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-24 ${container}`}>
        <div>
          <Reveal>
            <Eyebrow>Our journey</Eyebrow>

            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[46px]">
              Built on engineering.{' '}
              <span className="text-accent">Driven by ideas.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
              We have grown by staying close to the work: solving real
              problems, learning with every product and building for what
              comes next.
            </p>
          </Reveal>

          <div ref={lineRef} className="relative mt-12">
            <div className="absolute bottom-8 left-[7px] top-3 w-px bg-border" />

            <motion.div
              style={{ scaleY: reduceMotion ? 1 : fill }}
              className="absolute bottom-8 left-[7px] top-3 w-px origin-top bg-accent"
            />

            <div className="space-y-10">
              {journey.map((item, index) => {
                const active = index < lit;

                return (
                  <Reveal
                    key={item.date}
                    delay={index * 0.12}
                    className="relative pl-10 sm:pl-12"
                  >
                    <span
                      className={`absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-background-secondary transition-colors duration-500 ${
                        active ? 'border-accent' : 'border-border'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                          active ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    </span>

                    <p className="text-xs font-semibold text-accent">
                      {item.date}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary">
                      {item.text}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <PhotoFrame
            src={IMG.workspace}
            alt="A team working together around a table with laptops"
            ratio="aspect-[4/3]"
            blocks={[
              '-bottom-6 -right-6 h-2/5 w-2/5 bg-accent/25 sm:-bottom-8 sm:-right-8',
              '-left-5 -top-5 h-20 w-20 bg-white/[0.07]',
            ]}
            className="mx-auto max-w-[560px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Glance() {
  return (
    <section className={`bg-background-primary ${sectionSpace}`}>
      <div className={container}>
        <Reveal className="mb-12">
          <SectionIntro
            eyebrow="Dotix at a glance"
            title={
              <>
                A little more about{' '}
                <span className="text-accent">who we are.</span>
              </>
            }
            description="The foundations behind our team, our work and the businesses we partner with."
          />
        </Reveal>

        <div className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => {
            const Icon = fact.icon;

            return (
              <Reveal
                key={fact.label}
                delay={index * 0.07}
                className="h-full"
              >
                <div
                  className={`group flex h-full min-h-[180px] flex-col justify-between bg-background-card p-6 transition-colors duration-300 hover:bg-background-secondary sm:p-7 ${
                    index % 2
                      ? 'border-t border-border sm:border-t-0'
                      : ''
                  } ${
                    index
                      ? 'lg:border-l lg:border-t-0 lg:border-border'
                      : ''
                  } ${
                    index === 2
                      ? 'sm:border-l sm:border-border'
                      : ''
                  }`}
                >
                  <Icon
                    size={20}
                    className="text-text-muted transition-colors group-hover:text-accent"
                  />

                  <div className="mt-8">
                    <p className="text-xs font-medium text-text-muted">
                      {fact.label}
                    </p>

                    <p className="mt-2 text-lg font-semibold leading-snug text-white">
                      {fact.value}
                    </p>

                    <div className="mt-5 h-px w-8 bg-accent/70 transition-all duration-300 group-hover:w-14" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
          <p className="shrink-0 text-sm font-medium text-white">
            The tools behind the work
          </p>

          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background-card px-4 py-2 text-xs text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function CTA() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-accent/25 bg-background-card px-6 py-16 text-center sm:px-12 lg:py-24">
          <div className="pointer-events-none absolute -left-24 -top-40 h-80 w-80 rounded-full bg-accent/15 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-48 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let’s make your next{' '}
              <span className="text-accent">big idea real.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
              Tell us what you are thinking about building. We will help
              you find a clear direction, define the next steps and move
              forward with confidence.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(249,115,22,0.25)]"
              >
                Start a conversation

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent/50 hover:bg-accent/[0.06]"
              >
                Explore our work
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  return (
    // overflow-x-clip (not overflow-hidden): hidden turns <main> into a scroll
    // container, which breaks the sticky pinned section in ValuesTimeline.
    <main className="overflow-x-clip bg-background-primary">
      <Hero />
      <MakingItEasy />
      <Solutions />
      <ValuesTimeline />
      <WhoWhatWhy />
      <WhatWeBuild />
      <ProcessSection />
      <TeamSection />
      <Journey />
      <Glance />
      <CTA />
    </main>
  );
}