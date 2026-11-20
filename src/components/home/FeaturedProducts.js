
'use client';

import {
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '../common/SectionHeading.js';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

/* =========================================
   PRODUCTS DATA
========================================= */

const products = [
  {
    id: 'duddy',
    name: 'Duddy',
    category: 'AI App Builder',
    website: 'https://duddy.io',
    domain: 'duddy.io',
    caseStudy: '/case-studies/duddy',
    logo: '/images/projects/duddy-icon.svg',
    image: '/images/products/duddy-home.png',
    description:
      'An AI-enabled, no-code app builder that compiles real native Android, iOS, and web apps — not a website wrapped to look like one.',
    number: '01',
  },
  {
    id: 'apploft',
    name: 'Apploft',
    category: 'Rewards Ecosystem',
    website: 'https://apploft.in',
    domain: 'apploft.in',
    caseStudy: '/case-studies/apploft',
    logo: '/images/projects/apploft-icon.svg',
    image: '/images/products/apploft-home.png',
    description:
      'A platform where users play apps and games to earn rewards while publishers grow through campaigns.',
    number: '02',
  },
  {
    id: 'omnibase',
    name: 'Omnibase',
    category: 'Backend Platform',
    website: 'https://omnibase.in',
    domain: 'omnibase.in',
    caseStudy: '/case-studies/omnibase',
    logo: '/images/projects/omnibase-icon.svg',
    image: '/images/products/omnibase-home.png',
    description:
      'One unified backend for databases, authentication, file storage, payouts, and APIs — built to simplify how applications operate.',
    number: '03',
  },
  {
    id: 'rewardhub',
    name: 'RewardHub',
    category: 'Rewards Platform',
    website: 'https://rewardhub.apploft.in',
    domain: 'rewardhub.apploft.in',
    caseStudy: '/case-studies/rewardhub',
    logo: '/images/projects/rewardhub-icon.svg',
    image: '/images/products/rewardhub-home.png',
    description:
      'A rewards platform connecting advertisers with verified users through engaging campaigns and measurable experiences.',
    number: '04',
  },
];

const ease = [0.22, 1, 0.36, 1];

/* =========================================
   REVEAL ANIMATION
========================================= */

function Reveal({ children, delay = 0, className = '' }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 18 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   PRODUCT IMAGE
========================================= */

function ProductImage({ product }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      <motion.div
        initial={false}
        whileHover={
          reducedMotion
            ? undefined
            : { scale: 1.025 }
        }
        transition={{
          duration: 0.6,
          ease,
        }}
        className="relative w-full"
      >
        <Image
          src={product.image}
          alt={`${product.name} product preview`}
          width={1200}
          height={800}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="block h-auto w-full object-contain"
        />
      </motion.div>
    </div>
  );
}

/* =========================================
   PRODUCT SHOWCASE
========================================= */

function ProductShowcase({ product, index, caseStudySlugs }) {
  const reducedMotion = useReducedMotion();

  const hasCaseStudy = caseStudySlugs.includes(product.id);

  const caseStudyHref = hasCaseStudy
    ? `/case-studies/${product.id}`
    : product.caseStudy || product.website;

  const caseStudyIsExternal =
    !hasCaseStudy && /^https?:\/\//i.test(caseStudyHref);

  const CaseStudyLink = caseStudyIsExternal ? 'a' : Link;

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 22 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease,
      }}
      className="group relative grid grid-cols-1 items-start overflow-hidden border-t border-border pt-5 sm:pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-7"
    >

      {/* PRODUCT IMAGE */}

      <div className="flex flex-col">

        <a
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${product.name} website`}
          className="relative block overflow-hidden border border-border bg-transparent"
        >
          <ProductImage product={product} />

          <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center border border-border bg-background-card text-text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink size={14} />
          </div>
        </a>

        {/* WEBSITE LINK */}

        <a
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-fit items-center gap-2 text-xs text-text-muted transition-colors duration-300 hover:text-accent"
        >
          {product.domain}
          <ExternalLink size={12} />
        </a>

      </div>

      {/* PRODUCT INFORMATION */}

      <div className="flex flex-col justify-center py-3 lg:py-1">

        {/* LOGO + PRODUCT NAME */}

        <div className="mb-3 flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background-card p-2">
            <Image
              src={product.logo}
              alt={`${product.name} logo`}
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-1">

            <h3 className="text-xl font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              <CaseStudyLink
                href={caseStudyHref}
                target={caseStudyIsExternal ? '_blank' : undefined}
                rel={caseStudyIsExternal ? 'noopener noreferrer' : undefined}
              >
                {product.name}
              </CaseStudyLink>
            </h3>

            <span className="text-xs font-medium tracking-wide text-text-muted">
              {product.category}
            </span>

          </div>

          <span className="ml-auto shrink-0 font-mono text-[10px] tracking-widest text-text-muted">
            {product.number}
          </span>

        </div>

        {/* DESCRIPTION */}

        <p className="max-w-md text-sm leading-[1.75] text-text-secondary">
          {product.description}
        </p>

        {/* CASE STUDY LINK */}

        <div className="mt-4">
          <CaseStudyLink
            href={caseStudyHref}
            target={caseStudyIsExternal ? '_blank' : undefined}
            rel={caseStudyIsExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-all duration-300 hover:gap-3"
          >
            Read case study
            <ArrowUpRight size={15} />
          </CaseStudyLink>
        </div>

      </div>

    </motion.article>
  );
}

/* =========================================
   MAIN SECTION
========================================= */

export function FeaturedProducts({ caseStudySlugs = [] }) {
  return (
    <section
      id="products"
      className="relative isolate overflow-hidden border-t border-border bg-background-primary py-12 sm:py-14 lg:py-16"
    >

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}

        <Reveal className="max-w-2xl">
          <SectionHeading
            eyebrow="Featured Products"
            title={
              <>
                Products we{' '}
                <span className="text-accent">
                  build and run.
                </span>
              </>
            }
            description="From intelligent platforms to scalable digital products, explore the solutions we design, develop, and bring to life."
            spacingClassName="mb-8"
            titleClassName="lg:text-[42px]"
          />
        </Reveal>

        {/* PRODUCTS GRID */}

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-10">

          {products.map((product, index) => (
            <ProductShowcase
              key={product.id}
              product={product}
              index={index}
              caseStudySlugs={caseStudySlugs}
            />
          ))}

        </div>

        {/* FOOTER */}

        <Reveal className="mt-8">
          <div className="flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">

            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
              Independent products. Built with purpose.
            </span>

            <span className="font-mono text-[9px] tracking-[0.12em] text-text-muted">
              DOTIX / PRODUCT PORTFOLIO
            </span>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
