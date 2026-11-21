'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from 'framer-motion';

import { Button } from '../../../components/common/Button.js';
import { FAQAccordion } from '../../../components/common/FAQAccordion.js';
import { SectionHeading } from '../../../components/common/SectionHeading.js';
import { projects } from '../../../data/projects.js';

const EASE = [0.22, 1, 0.36, 1];

const buttonClass =
  'bg-accent text-black text-sm font-semibold px-7 py-3.5';


/* ============================================
   DATA
============================================ */

const serviceCards = [
  {
    label: 'Business websites',
    title: 'Websites that build trust and grow your business',
    description:
      'Professional, responsive websites that communicate your value, showcase your expertise, and make it easy for customers to get in touch.',
  },
  {
    label: 'Landing pages',
    title: 'Landing pages that turn visitors into leads',
    description:
      'Focused pages with one clear message that guide visitors towards signing up, enquiring, or taking action.',
  },
  {
    label: 'Content websites',
    title: 'Content websites that build authority',
    description:
      'Blogs and resource hubs with intuitive navigation, CMS integration, and a search-friendly structure that makes publishing easy.',
  },
  {
    label: 'E-commerce',
    title: 'Online stores built to sell',
    description:
      'Streamlined shopping experiences from product discovery to checkout, with payments and order management built in.',
  },
];

const strengths = [
  {
    title: 'Fast by default',
    text: 'Optimized assets and performance-conscious code for pages that load quickly.',
  },
  {
    title: 'SEO-ready',
    text: 'Semantic markup, clean metadata, and a search-friendly structure from day one.',
  },
  {
    title: 'Responsive',
    text: 'Consistent experiences across phones, tablets, laptops, and desktops.',
  },
  {
    title: 'Goal-driven',
    text: 'Pages and features chosen for your business goals, without unnecessary complexity.',
  },
];

const executionSteps = [
  {
    title: 'Understand and design',
    desc: 'We learn your business, audience, and goals, then define the site structure, user journeys, and design direction.',
  },
  {
    title: 'Develop and optimize',
    desc: 'We build with clean code, responsive layouts, technical SEO foundations, and performance optimization.',
  },
  {
    title: 'Launch and improve',
    desc: 'After thorough testing we launch, then help you maintain, monitor, and improve the site as your business grows.',
  },
];

const serviceFAQs = [
  {
    question: 'What is the difference between a static and dynamic website?',
    answer:
      'A static website displays fixed content and is ideal for business websites, portfolios, and landing pages. A dynamic website supports features such as user accounts, databases, dashboards, and frequently updated content. We recommend the right approach based on your business requirements.',
  },
  {
    question: 'Will my website be optimized for Google search?',
    answer:
      'Yes. We follow technical SEO best practices, including semantic HTML, optimized metadata, mobile responsiveness, logical heading structures, and performance optimization. We also consider structured data and search-friendly content architecture. Actual rankings depend on competition, content quality, backlinks, and ongoing SEO efforts.',
  },
  {
    question: 'Can you redesign my existing website without affecting its SEO?',
    answer:
      'Yes. We approach redesigns with SEO preservation in mind. This includes reviewing existing URLs, maintaining important metadata, implementing appropriate redirects, and preserving valuable content wherever possible.',
  },
  {
    question: 'How long does website development take?',
    answer:
      'Timelines depend on the complexity and functionality of the project. A straightforward landing page may take 1–2 weeks, while a larger business website may take approximately 4–8 weeks. We define the scope and delivery milestones before development begins.',
  },
  {
    question: 'Do you provide website maintenance after launch?',
    answer:
      'Yes. We can support your website after launch through technical updates, security improvements, content changes, bug fixes, and performance optimization.',
  },
];

const ROTATING = ['look great.', 'load fast.', 'rank higher.', 'convert.'];
const SCORES = ['Performance', 'Accessibility', 'Best practices', 'SEO'];


/* ============================================
   HELPERS
============================================ */

function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, delay = 0 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.textContent = String(to);
      return;
    }

    const controls = animate(0, to, {
      duration: 1.8,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [to, delay, reduced]);

  return <span ref={ref}>0</span>;
}

function getProjectUrl(project) {
  const toUrl = (v, strict) => {
    if (typeof v !== 'string') return null;
    const t = v.trim();
    if (/\.(png|jpe?g|svg|webp|gif|avif)(\?.*)?$/i.test(t)) return null;
    if (/^https?:\/\//i.test(t)) return t;
    if (/^www\./i.test(t)) return `https://${t}`;
    if (!strict && /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(t)) return `https://${t}`;
    return null;
  };

  const keys = [
    'url', 'link', 'href', 'liveUrl', 'liveLink', 'live', 'website',
    'site', 'siteUrl', 'projectUrl', 'projectLink', 'demo', 'visit',
  ];
  for (const k of keys) {
    const u = toUrl(project[k], false);
    if (u) return u;
  }
  for (const v of Object.values(project)) {
    const u = toUrl(v, true);
    if (u) return u;
  }
  return null;
}

function ProjectMarquee({ items, speed = 0.7 }) {
  const reduced = useReducedMotion();
  const scrollerRef = useRef(null);
  const interactingRef = useRef(false);
  const releaseRef = useRef(null);
  const pendingRef = useRef(0);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const row = reduced ? items : [...items, ...items];

  const holdInteraction = (ms = 700) => {
    interactingRef.current = true;
    clearTimeout(releaseRef.current);
    releaseRef.current = setTimeout(() => {
      interactingRef.current = false;
    }, ms);
  };

  // Always-on auto movement (right to left)
  useEffect(() => {
    const node = scrollerRef.current;
    if (!node || reduced) return;

    let raf;
    let last = performance.now();
    let pos = node.scrollLeft;

    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const half = node.scrollWidth / 2;

      if (interactingRef.current || dragRef.current.active) {
        pos = node.scrollLeft;
      } else if (half > 0) {
        if (Math.abs(node.scrollLeft - pos) > 2) pos = node.scrollLeft;

        let move = (speed * dt) / 16;
        if (pendingRef.current) {
          let part = pendingRef.current * 0.12;
          pendingRef.current -= part;
          if (Math.abs(pendingRef.current) < 0.5) {
            part += pendingRef.current;
            pendingRef.current = 0;
          }
          move += part;
        }

        pos += move;
        if (pos >= half) pos -= half;
        if (pos < 0) pos += half;
        node.scrollLeft = pos;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(releaseRef.current);
    };
  }, [reduced, speed]);

  const scrollByCard = (dir) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector('article');
    const step = card ? card.offsetWidth + 20 : 320;
    if (reduced) {
      node.scrollBy({ left: dir * step, behavior: 'smooth' });
    } else {
      pendingRef.current += dir * step;
    }
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    const node = scrollerRef.current;
    dragRef.current = { active: true, moved: false, startX: e.clientX, startLeft: node.scrollLeft };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const node = scrollerRef.current;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    const half = node.scrollWidth / 2;
    let next = d.startLeft - dx;
    if (!reduced && half > 0) next = ((next % half) + half) % half;
    node.scrollLeft = next;
  };

  const endDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <>
      <div
        ref={scrollerRef}
        className="overflow-x-auto cursor-grab select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          if (dragRef.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            dragRef.current.moved = false;
          }
        }}
        onTouchStart={() => holdInteraction(4000)}
        onTouchEnd={() => holdInteraction(700)}
        onWheel={() => holdInteraction(700)}
      >
        <div className="flex w-max gap-5 pr-5">
          {row.map((project, i) => {
            const url = getProjectUrl(project);
            return (
              <article
                key={`${project.id}-${i}`}
                className="flex w-[290px] sm:w-[380px] shrink-0 flex-col rounded-2xl border border-border bg-background-card p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  {project.logo && (
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-background-elevated p-2">
                      <Image
                        src={project.logo}
                        alt=""
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium text-accent tabular-nums">
                    0{(i % items.length) + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-text-primary tracking-[-0.03em]">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className="mt-auto pt-6 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    Visit website ↗
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 flex justify-end gap-3">
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => scrollByCard(-1)}
          className="w-11 h-11 rounded-full border border-border text-text-primary text-lg flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => scrollByCard(1)}
          className="w-11 h-11 rounded-full border border-border text-text-primary text-lg flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
        >
          →
        </button>
      </div>
    </>
  );
}


/* ============================================
   HERO PIECES
============================================ */

function RotatingWord() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative block h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {ROTATING[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Aurora() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-lines) 1px, transparent 1px), linear-gradient(90deg, var(--grid-lines) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <motion.div
        className="absolute -top-32 left-[8%] w-[520px] h-[520px] rounded-full bg-accent/20 blur-[130px]"
        animate={reduced ? undefined : { x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-10 right-[6%] w-[460px] h-[460px] rounded-full bg-orange-400/15 blur-[130px]"
        animate={reduced ? undefined : { x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[260px] rounded-full bg-cyan-400/10 blur-[120px]"
        animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;

function ScoreRing({ label, delay }) {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[76px] h-[76px]">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r={RING_R} stroke="var(--border)" strokeWidth="4" fill="none" />
          <motion.circle
            cx="32"
            cy="32"
            r={RING_R}
            className="text-accent"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={RING_C}
            initial={{ strokeDashoffset: reduced ? 0 : RING_C }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay, duration: 1.8, ease: EASE }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-text-primary">
          <CountUp to={100} delay={delay} />
        </span>
      </div>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}


/* ============================================
   PAGE
============================================ */

export default function WebDevelopmentPage() {
  const featuredProjects = projects.filter((p) =>
    [
      'Duddy',
      'SnackMedia',
      'AdNeo',
      'TheAdzPlug',
      'InloopMedia',
      'Apploft',
      'RewardHub',
    ].includes(p.name)
  );


  return (
    <main className="overflow-x-clip">

      {/* HERO */}
      <section className="relative bg-background-primary pt-20 sm:pt-32 pb-12 sm:pb-16 lg:pt-44 lg:pb-20">
        <Aurora />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="-mt-2 sm:-mt-6 lg:-mt-8 text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary tracking-[-0.05em] leading-[1.08]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            <span className="block">Websites that</span>
            <RotatingWord />
          </motion.h1>

          <motion.p
            className="mt-5 sm:mt-7 text-xs sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            We design and build fast, SEO-ready websites that earn trust,
            reach the right audience, and turn visitors into customers.
          </motion.p>

          <motion.div
            className="mt-7 sm:mt-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            <Button
              href="/contact"
              variant="primary"
              className="bg-white-button-bg text-white-button-text text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 sm:py-3.5 shadow-lg shadow-accent/20 hover:opacity-90 transition-all duration-300"
            >
              Start your website
            </Button>
          </motion.div>

          {/* Quality targets */}
          <motion.div
            className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-xs text-text-muted mb-5 sm:mb-7">
              The standard every site we build is held to
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {SCORES.map((label, i) => (
                <ScoreRing key={label} label={label} delay={1 + i * 0.2} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE BUILD: sticky intro + numbered list */}
      <section className="bg-background-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionHeading
                  eyebrow="What we build"
                  title={
                    <>
                      The right website starts with the{' '}
                      <span className="text-accent">right purpose.</span>
                    </>
                  }
                  description="Whether you want to establish your brand, generate leads, publish content, or sell products, we build around what you want to achieve."
                  spacingClassName="mb-0"
                  titleClassName="text-text-primary sm:text-5xl"
                  descriptionClassName="max-w-md text-sm text-text-secondary sm:text-base"
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 border-t border-border">
            {serviceCards.map((card, index) => (
              <Reveal key={card.label}>
                <article className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4.5rem_1fr] gap-2 py-10 border-b border-border">
                  <span className="text-sm font-medium text-accent tabular-nums pt-1.5">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                      {card.label}
                    </p>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-text-primary tracking-[-0.03em] leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-lg">
                      {card.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY: statement + 2x2 grid */}
      <section className="bg-background-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why us"
              title={
                <>
                  Built to perform,{' '}
                  <span className="text-accent">not just to launch.</span>
                </>
              }
              description="We build reliable, scalable software that delivers lasting value as your business grows."
              spacingClassName="mb-0"
              titleClassName="max-w-3xl text-text-primary sm:text-5xl"
              descriptionClassName="max-w-md text-sm text-text-secondary sm:text-base"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
            {strengths.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full p-8 sm:p-10 border-r border-b border-border">
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-sm">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS: auto-scrolling cards */}
      <section className="bg-background-secondary py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Websites we’ve <span className="text-accent">shipped.</span>
                </>
              }
              description="A few of the digital products and websites we’ve brought to life."
              spacingClassName="mb-0"
              titleClassName="text-text-primary sm:text-5xl"
              descriptionClassName="text-sm text-text-secondary sm:text-base"
            />
          </Reveal>
        </div>

        <div className="mt-14">
          <ProjectMarquee items={featuredProjects} />
        </div>
      </section>

      {/* PROCESS: three columns */}
      <section className="bg-background-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our process"
              title={
                <>
                  From first idea to a site{' '}
                  <span className="text-accent">ready for the real world.</span>
                </>
              }
              description="We turn your ideas into polished, responsive websites built for performance, usability, and growth."
              spacingClassName="mb-0"
              titleClassName="max-w-3xl text-text-primary sm:text-5xl"
              descriptionClassName="max-w-md text-sm text-text-secondary sm:text-base"
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {executionSteps.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.12}>
                <div>
                  <div className="h-px bg-accent" />
                  <span className="mt-6 block text-2xl sm:text-3xl font-bold leading-none tracking-[-0.05em] text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                title={
                  <>
                    Questions before you <span className="text-accent">start?</span>
                  </>
                }
                description="Answers on SEO, timelines, redesigns, and maintenance."
                spacingClassName="mb-0"
                titleClassName="text-text-primary sm:text-5xl"
                descriptionClassName="text-sm text-text-secondary sm:text-base"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <FAQAccordion faqs={serviceFAQs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/15 via-background-card to-background-card p-8 sm:p-14 lg:p-16">
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <SectionHeading
                  eyebrow="Start a website project"
                  title={
                    <>
                      Your next big idea deserves a{' '}
                      <span className="text-accent">better website.</span>
                    </>
                  }
                  description="Tell us what you’re building and we’ll help you launch a fast, engaging site that moves your business forward."
                  className="lg:col-span-8"
                  spacingClassName="mb-0"
                  titleClassName="text-4xl text-text-primary sm:text-6xl"
                  descriptionClassName="max-w-xl text-sm text-text-secondary sm:text-base"
                />

                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  <Button href="/contact" variant="primary" className={buttonClass}>
                    Talk about your project
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}