
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ============================================
   SERVICES DATA
============================================ */

const SERVICES = [
  {
    id: 'saas-development',
    number: '01',
    category: 'PRODUCT DEVELOPMENT',
    title: 'SaaS Platforms & MVPs',
    link: '/services/saas-development',
    description:
      'We build SaaS products with onboarding, subscriptions, and infrastructure that supports your growth.',
    points: [
      'Multi-tenant architecture',
      'Subscription billing & onboarding',
      'Scalable, secure backend',
    ],
    video: '/videos/saas.mp4',
  },
  {
    id: 'internal-tools',
    number: '02',
    category: 'BUSINESS AUTOMATION',
    title: 'Internal Tools & Automation',
    link: '/services/saas-development',
    description:
      'We create tools that replace repetitive work and give your team a clearer view of daily operations.',
    points: [
      'Workflow automation',
      'Role-based access & reporting',
      'Integrations with your stack',
    ],
    video: '/videos/dashboard.mp4',
  },
  {
    id: 'mobile-apps',
    number: '03',
    category: 'MOBILE DEVELOPMENT',
    title: 'Android & iOS Apps',
    link: '/services/mobile-app-development',
    description:
      'We develop iOS and Android apps with clear interfaces and the features your customers need.',
    points: [
      'One codebase, both platforms',
      'Push notifications & offline mode',
      'App store launch support',
    ],
    video: '/videos/mobile-app.mp4',
  },
  {
    id: 'websites',
    number: '04',
    category: 'WEB DEVELOPMENT',
    title: 'High-Conversion Websites',
    link: '/services/web-development',
    description:
      'We create fast websites that explain your offer clearly and help visitors get in touch.',
    points: [
      'Performance-first build',
      'SEO-ready structure',
      'Analytics & lead capture',
    ],
    video: '/videos/website.mp4',
  },
];

const COUNT = SERVICES.length;

/* ============================================
   SERVICE DETAILS
============================================ */

function DetailPanel({ service, reduced }) {
  return (
    <div className="flex min-h-[330px] flex-col justify-center lg:min-h-[360px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          className="flex flex-1 flex-col"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Service category */}
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs font-semibold tracking-wider text-accent">
              {service.number}
            </span>

            <span className="h-px w-7 bg-border" />

            <span className="text-[10px] font-semibold tracking-[0.15em] text-text-secondary">
              {service.category}
            </span>
          </div>

          {/* Service heading */}
          <h3 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[32px]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mt-4 max-w-md text-sm leading-7 text-text-secondary sm:text-[15px]">
            {service.description}
          </p>

          {/* Service points */}
          <ul className="mt-6 space-y-3">
            {service.points.map((point, index) => (
              <li
                key={point}
                className="flex items-center gap-3 text-sm text-text-secondary"
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-accent/40 text-[9px] font-semibold text-accent">
                  {index + 1}
                </span>

                {point}
              </li>
            ))}
          </ul>

          {/* Learn more */}
          <div className="mt-7">
            <Link
              href={service.link}
              className="group/link inline-flex items-center gap-2 border-b border-accent/40 pb-1.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              Explore this service

              <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================
   SERVICE VIDEO
============================================ */

function ServiceVideo({ service, reduced }) {
  return (
    <div className="relative mx-auto w-full max-h-[260px] max-w-[360px] overflow-hidden rounded-xl border border-white/[0.09] bg-[#111315] shadow-xl shadow-black/20 lg:ml-auto">
      <div className="relative aspect-[3/4] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <video
              key={service.video}
              className="h-full w-full object-cover"
              src={service.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              Your browser does not support embedded videos.
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Subtle bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Video label */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm">
          <span className="text-[11px] font-semibold text-accent">
            {service.number}
          </span>

          <span className="text-[11px] font-medium text-white/90">
            {service.title}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   SERVICES SECTION
============================================ */

export function Services() {
  const reduced = useReducedMotion();
  const wrapperRef = useRef(null);

  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Desktop-only scroll interaction
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');

    const update = () => setPinned(query.matches);

    update();

    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Update active service while scrolling
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!pinned) return;

    const next = Math.min(
      COUNT - 1,
      Math.max(0, Math.floor(value * COUNT))
    );

    setActive((prev) => (prev === next ? prev : next));
  });

  const current = SERVICES[active];

  return (
    <section
      id="services"
      className="relative bg-background-primary"
    >
      <div
        ref={wrapperRef}
        style={
          pinned
            ? { height: `${100 + (COUNT - 1) * 55}vh` }
            : undefined
        }
      >
        <div
          className={
            pinned
              ? 'sticky top-0 flex h-screen items-center pt-14'
              : 'py-14 sm:py-16'
          }
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

            {/* SECTION HEADER */}
            <div className="mb-7 max-w-2xl lg:mb-8">

              <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-accent" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              What we Build
            </span>
          </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Our <span className="text-accent">Expertise</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
                From the first idea to a product ready to scale, we build
                digital solutions that solve real business challenges.
              </p>

            </div>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">

              {/* LEFT CONTENT */}
              <div className="lg:col-span-5">
                <DetailPanel
                  service={current}
                  reduced={reduced}
                />
              </div>

              {/* RIGHT VIDEO */}
              <div className="min-w-0 lg:col-span-7">
                <ServiceVideo
                  service={current}
                  reduced={reduced}
                />
              </div>

            </div>

            {/* PROGRESS INDICATOR */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">

              <div className="flex items-center gap-2">
                {SERVICES.map((service, index) => (
                  <div
                    key={service.id}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      active === index
                        ? 'w-9 bg-accent'
                        : 'w-4 bg-border'
                    }`}
                  />
                ))}
              </div>

              <span className="text-[11px] font-medium tracking-wider text-text-secondary">
                <span className="text-text-primary">
                  0{active + 1}
                </span>
                {' / 0'}
                {COUNT}
              </span>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
