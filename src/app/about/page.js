
'use client';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';

import { useRef ,useState} from 'react';
import Link from 'next/link';

import {
  Code2,
  Globe2,
  Smartphone,
  LayoutDashboard,
  Database,
  Layers3,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Users,
  Rocket,
  Lightbulb,
  Workflow,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  Clock3,
  Target,
  HeartHandshake,
} from 'lucide-react';

/* =========================================================
   DATA
========================================================= */

const services = [
  {
    number: '01',
    icon: Code2,
    title: 'Custom software',
    description: 'Purpose-built software designed around your business requirements.',
  },
  {
    number: '02',
    icon: Globe2,
    title: 'Web applications',
    description: 'Scalable, high-performance applications built for real users.',
  },
  {
    number: '03',
    icon: Smartphone,
    title: 'Mobile applications',
    description: 'Intuitive mobile experiences that keep your business connected.',
  },
  {
    number: '04',
    icon: Workflow,
    title: 'CRM and business software',
    description: 'Connected systems that simplify operations and workflows.',
  },
  {
    number: '05',
    icon: LayoutDashboard,
    title: 'Dashboards and internal tools',
    description: 'Powerful tools that turn complex operations into clear workflows.',
  },
  {
    number: '06',
    icon: Layers3,
    title: 'SaaS product development',
    description: 'From architecture to launch, we build products designed to scale.',
  },
];

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

const products = [
  {
    number: '01',
    name: 'Omnibase',
    category: 'BACKEND INFRASTRUCTURE',
    description: 'A Backend-as-a-Service platform that simplifies backend development and infrastructure.',
    icon: Database,
    url: 'https://omnibase.in/',
  },
  {
    number: '02',
    name: 'Duddy',
    category: 'AI-POWERED DEVELOPMENT',
    description: 'An AI-enabled no-code app builder that helps turn ideas into applications.',
    icon: Sparkles,
    url: 'https://duddy.io/',
  },
  {
    number: '03',
    name: 'Notix',
    category: 'NOTIFICATION INFRASTRUCTURE',
    description: 'A centralized notification service built to streamline communication.',
    icon: Workflow,
    url: null,
  },
];

const process = [
  {
    number: '01',
    weeks: 'WEEKS 1–2',
    title: 'Scope',
    description: 'Align on goals, requirements, and architecture.',
    icon: Lightbulb,
  },
  {
    number: '02',
    weeks: 'WEEKS 3–4',
    title: 'Design',
    description: 'Map user journeys and plan the experience.',
    icon: Workflow,
  },
  {
    number: '03',
    weeks: 'WEEKS 5–10',
    title: 'Build',
    description: 'Develop and test software in focused sprints.',
    icon: Code2,
  },
  {
    number: '04',
    weeks: 'WEEKS 11–12',
    title: 'Launch',
    description: 'Deploy, monitor, and support the product.',
    icon: Rocket,
  },
];

const facts = [
  {
    icon: CalendarDays,
    label: 'Established',
    value: 'January 2023',
  },
  {
    icon: Globe2,
    label: 'Headquarters',
    value: 'New Delhi NCR, India',
  },
  {
    icon: Code2,
    label: 'What we build',
    value: 'SaaS, Web, Mobile & Business Software',
  },
  {
    icon: Users,
    label: 'Who we work with',
    value: 'Startups, Businesses & Product Teams',
  },
];

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
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

function SectionLabel({ children }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
      <span className="h-px w-7 bg-accent" />
      {children}
    </p>
  );
}

/* =========================================================
   ANIMATED VALUES TIMELINE
========================================================= */



function ValuesTimeline() {
  const [activeValue, setActiveValue] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Divide the timeline into four distinct scroll stages.
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(
      values.length - 1,
      Math.floor(progress * values.length)
    );

    setActiveValue(nextIndex);
  });

  const active = values[activeValue];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-border bg-background-primary"
      style={{
        height: `${values.length * 100}vh`,
      }}
    >
      {/* Pinned timeline viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* LEFT: TIMELINE */}
          <div className="relative flex flex-col items-center justify-center">

            <div className="mb-8 w-full">
              <SectionLabel>WHAT GUIDES US</SectionLabel>

              <h2 className="max-w-sm text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The principles behind our work.
              </h2>
            </div>

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
                  style={{
                    pathLength: scrollYProgress,
                  }}
                />
              </svg>

              <div className="relative z-10 flex flex-col items-center gap-3">

                {values.map((value, index) => {
                  const isActive = activeValue === index;

                  return (
                    <button
                      key={value.number}
                      type="button"
                      onClick={() => {
                        const section = sectionRef.current;
                        if (!section) return;

                        const sectionTop =
                          section.getBoundingClientRect().top +
                          window.scrollY;

                        const stageHeight =
                          section.offsetHeight / values.length;

                        window.scrollTo({
                          top: sectionTop + stageHeight * index,
                          behavior: 'smooth',
                        });
                      }}
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

          {/* RIGHT: ACTIVE VALUE */}
          <div className="flex min-h-[380px] items-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 25 }
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
   WHO / WHAT / WHY DIAGRAM
========================================================= */

function WhoWhatWhy() {
  const reduceMotion = useReducedMotion();

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

  return (
    <section className="relative overflow-hidden bg-[#151515] py-24 text-white sm:py-32">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        <Reveal className="mb-16 text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            THE DOTIX PERSPECTIVE
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Who we are. What we do. Why it matters.
          </h2>
        </Reveal>

        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-0">

          {circles.map((circle, index) => (
            <motion.div
              key={circle.title}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.82,
                      x: index === 0 ? -35 : index === 2 ? 35 : 0,
                    }
              }
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? {} : { backgroundColor: 'rgba(255,255,255,0.035)' }}
              className="relative flex aspect-square w-full max-w-[340px] shrink-0 flex-col justify-center rounded-full border border-accent/80 px-10 transition-colors duration-300 md:-ml-9 md:max-w-[350px] md:px-12 first:md:ml-0"
            >
              <span className="mb-5 block text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {circle.title}
              </span>

              <p className="max-w-[260px] text-sm leading-[1.8] text-neutral-300 sm:text-base">
                {circle.description}
              </p>

              <span className="absolute bottom-9 right-10 font-mono text-[10px] tracking-widest text-accent/70">
                0{index + 1}
              </span>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN ABOUT PAGE
========================================================= */

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-background-primary">

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border/50 bg-background-primary py-24 sm:py-28 lg:py-32">

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-accent/[0.10] blur-[150px]" />
          <div className="absolute bottom-[-35%] left-[10%] h-[400px] w-[600px] rounded-full bg-accent/[0.05] blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:65px_65px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <SectionLabel>ABOUT DOTIX · SINCE 2023</SectionLabel>

            <h1 className="mb-7 text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
              We build software.
              <span className="mt-2 block bg-gradient-to-r from-accent via-accent-hover to-white bg-clip-text text-transparent">
                Our products and yours.
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-[1.85] text-text-secondary sm:text-lg">
              Software for businesses. Products for the world.
              We design, engineer, and operate digital products that
              solve real problems and help businesses move forward.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_10px_35px_rgba(120,100,255,0.25)]"
              >
                Let's Build Together
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent/50 hover:bg-accent/5"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <Reveal delay={0.25} className="mt-16 border-t border-border/70 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Engineering products. Empowering businesses.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Independent product & software engineering team
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-b border-border/60 bg-background-secondary/70 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <Reveal className="mb-11 max-w-2xl">
            <SectionLabel>OUR CAPABILITIES</SectionLabel>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Dotix builds.
            </h2>
            <p className="text-sm leading-[1.8] text-text-secondary sm:text-base">
              From business-critical systems to customer-facing products,
              we build technology that turns ideas into working software.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.number} delay={index * 0.06}>
                  <motion.div
                    whileHover={reduceMotion ? {} : { y: -5 }}
                    className="group relative h-full rounded-xl border border-border/80 bg-background-card p-6 transition-colors hover:border-accent/40"
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-text-muted/60">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-white transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-[1.8] text-text-secondary">
                      {service.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW: ANIMATED VALUES TIMELINE */}
      <ValuesTimeline />

      {/* NEW: WHO WHAT WHY CIRCLE DIAGRAM */}
      <WhoWhatWhy />

      {/* PRODUCTS */}
      {/* <section className="border-b border-border/60 bg-background-secondary/70 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <Reveal className="mb-11 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>OUR OWN PRODUCTS</SectionLabel>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Products built and operated.
              </h2>
              <p className="text-sm leading-[1.8] text-text-secondary sm:text-base">
                We turn our engineering experience into products of our own,
                solving challenges through technology.
              </p>
            </div>

            <span className="w-fit rounded-full border border-accent/20 bg-accent/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-accent">
              BUILT BY DOTIX
            </span>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;

              return (
                <Reveal key={product.number} delay={index * 0.08}>
                  <motion.div
                    whileHover={reduceMotion ? {} : { y: -5 }}
                    className="group flex h-full flex-col rounded-xl border border-border bg-background-card p-7 transition-colors hover:border-accent/40"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background-secondary text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-text-muted/60">
                        {product.number}
                      </span>
                    </div>

                    <p className="mb-3 font-mono text-[10px] font-semibold tracking-[0.15em] text-accent">
                      {product.category}
                    </p>

                    <h3 className="mb-3 text-xl font-bold text-white">
                      {product.name}
                    </h3>

                    <p className="mb-7 flex-1 text-sm leading-[1.8] text-text-secondary">
                      {product.description}
                    </p>

                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent"
                      >
                        Explore product
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-text-secondary">
                        A Dotix product
                      </span>
                    )}
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section> */}


      {/* COMPANY JOURNEY */}
      <section className="border-y border-border/60 bg-background-secondary/70 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          <Reveal>
            <SectionLabel>OUR JOURNEY</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built on engineering.
              <span className="mt-2 block text-text-muted">
                Driven by ideas.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative border-l border-border pl-7 sm:pl-9">

              <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_15px_rgba(120,100,255,0.7)]" />

              <p className="mb-3 font-mono text-xs font-semibold tracking-[0.15em] text-accent">
                JANUARY 2023
              </p>
              <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                Where it all started.
              </h3>
              <p className="text-sm leading-[1.9] text-text-secondary sm:text-base">
                Dotix started in January 2023 as the technology team inside
                AMS Group. What began as an engineering-focused initiative
                evolved into building its own products and working with
                businesses beyond the group.
              </p>

              <div className="my-8 h-px w-full bg-border" />

              <div className="absolute -left-[5px] top-[58%] h-2.5 w-2.5 rounded-full border border-accent bg-background-secondary" />

              <p className="mb-3 font-mono text-xs font-semibold tracking-[0.15em] text-accent">
                TODAY
              </p>
              <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                Building what comes next.
              </h3>
              <p className="text-sm leading-[1.9] text-text-secondary sm:text-base">
                Today, Dotix builds and operates SaaS products while
                developing custom software solutions for startups,
                businesses, and product teams. We bring product experience
                and engineering execution together.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* COMPANY FACTS */}
     
<section className="bg-background-primary py-24 sm:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-8">

    {/* Heading */}
    <Reveal className="mb-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <SectionLabel>AT A GLANCE</SectionLabel>
      </div>

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl">
          The thinking behind
          <br />
          <span className="text-accent">what we build.</span>
        </h2>

        <p className="max-w-sm text-sm leading-7 text-text-muted">
          A few things that define our approach to building
          digital products, meaningful experiences, and
          technology that works.
        </p>
      </div>
    </Reveal>

    {/* Statistics */}
    <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">

      {facts.map((fact, index) => {
        const Icon = fact.icon;

        return (
          <Reveal key={fact.label} delay={index * 0.07}>
            <div className={`group relative flex h-full min-h-[220px] flex-col justify-between border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.015] sm:px-6 lg:border-b-0 lg:py-10 ${
              index !== 0 ? 'lg:border-l lg:border-white/10' : ''
            } ${index % 2 !== 0 ? 'sm:border-l sm:border-white/10 lg:border-l' : ''} ${index === 0 ? 'sm:pl-0' : ''}`}>

              {/* Number and icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-text-muted/60">
                  0{index + 1}
                </span>

                <Icon className="h-[19px] w-[19px] text-text-muted/60 transition-colors duration-300 group-hover:text-accent" />
              </div>

              {/* Main content */}
              <div className="mt-12">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.13em] text-text-muted">
                  {fact.label}
                </p>

                <p className="max-w-[240px] text-2xl font-semibold leading-snug tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-[26px]">
                  {fact.value}
                </p>

                <div className="mt-6 h-px w-8 bg-accent/70 transition-all duration-300 group-hover:w-14" />
              </div>

            </div>
          </Reveal>
        );
      })}

    </div>

  </div>
</section>


      

    </main>
  );
}
