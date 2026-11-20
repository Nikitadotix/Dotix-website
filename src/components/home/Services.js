
'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading.js';

/* ============================================
   SERVICES DATA
============================================ */

const SERVICES = [
  {
    id: 'saas-development',
    category: 'Product development',
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
    category: 'Business automation',
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
    category: 'Mobile development',
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
    category: 'Web development',
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

/* ============================================
   SINGLE SERVICE ROW
   Even rows: media left, text right
   Odd rows:  text left, media right
============================================ */

function ServiceRow({ service, index, reduced }) {
  const flipped = index % 2 === 1;

  return (
    <motion.article
      className={`flex flex-col items-center gap-8 py-6 lg:gap-16 lg:py-10 ${
        flipped ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Square media */}
      <div className="relative aspect-square w-full max-w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111315] shadow-xl shadow-black/30 lg:w-[360px] lg:max-w-none">
        <video
          className="h-full w-full object-cover"
          src={service.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div className="w-full max-w-2xl text-left lg:flex-1">
        <p className="mb-3 text-sm font-semibold text-accent">
          {service.category}
        </p>

        <h3 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
          {service.title}
        </h3>

        <p className="mt-4 text-base leading-8 text-text-secondary sm:text-lg">
          {service.description}
        </p>

        <ul className="mt-5 space-y-3">
          {service.points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-3 text-base text-text-secondary"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {point}
            </li>
          ))}
        </ul>

        {/* Text link */}
        <Link
          href={service.link}
          className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 hover:gap-3"
        >
          Explore Service
          <ArrowUpRight
            size={17}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}

/* ============================================
   SERVICES SECTION
============================================ */

export function Services() {
  const reduced = useReducedMotion();

  return (
    <section
      id="services"
      className="relative bg-background-primary py-16 sm:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="What we build"
          title={
            <>
              Our <span className="text-accent">Expertise</span>
            </>
          }
          description="From the first idea to a product ready to scale, we build digital solutions that solve real business challenges."
          spacingClassName="mb-10 max-w-2xl lg:mb-14"
          titleClassName="text-2xl font-extrabold text-white sm:text-3xl"
          descriptionClassName="max-w-xl text-sm leading-6"
        />

        <div className="flex flex-col gap-10 lg:gap-14">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={index}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
