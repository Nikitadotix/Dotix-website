
'use client';

import {
  Sparkles,
  Database,
  Flame,
  Gift,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

import Image from 'next/image';

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
    icon: Sparkles,
    image: '/images/products/duddy-home.png',
    description:
      'An AI-enabled, no-code app builder that compiles real native Android, iOS, and web apps — not a website wrapped to look like one.',
    number: '01',
  },
  {
    id: 'apploft',
    name: 'Apploft',
    category: 'Rewards Ecosystem',
    website: '/projects/apploft',
    domain: 'apploft.in',
    icon: Gift,
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
    icon: Database,
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
    icon: Flame,
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
   NATURAL IMAGE DIMENSIONS
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

function ProductShowcase({ product, index }) {
  const Icon = product.icon;
  const reducedMotion = useReducedMotion();

  const isExternal = product.website.startsWith('http');

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
      className="group relative grid overflow-hidden border-t border-border pt-5 sm:pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6"
    >

      {/* IMAGE */}

      <a
        href={product.website}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={`Explore ${product.name}`}
        className="relative block h-fit overflow-hidden border border-border bg-transparent"
      >
        <ProductImage product={product} />

        <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center border border-border bg-background-card text-text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ExternalLink size={14} />
        </div>
      </a>

      {/* INFORMATION */}

      <div className="flex flex-col justify-center py-5 lg:py-2">

        {/* CATEGORY AND NUMBER */}

        <div className="mb-4 flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <Icon
              size={15}
              className="text-accent"
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
              {product.category}
            </span>
          </div>

          <span className="font-mono text-[10px] text-text-muted">
            {product.number}
          </span>

        </div>

        {/* PRODUCT NAME */}

        <h3 className="mb-3 text-2xl font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent">
          {product.name}
        </h3>

        {/* DESCRIPTION */}

        <p className="max-w-md text-sm leading-[1.8] text-text-secondary">
          {product.description}
        </p>

        {/* EXPLORE LINK */}

        <a
          href={product.website}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="mt-6 inline-flex w-fit items-center gap-3 border-b border-border pb-2 text-sm font-medium text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          Explore {product.name}

          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>

      </div>

    </motion.article>
  );
}

/* =========================================
   MAIN SECTION
========================================= */

export function FeaturedProducts() {
  return (
    <section
      id="products"
      className="relative isolate overflow-hidden border-t border-border bg-background-primary py-14 sm:py-16 lg:py-20"
    >

      {/* MAIN CONTAINER */}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}

        <Reveal className="mb-9 max-w-2xl sm:mb-11">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-accent" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Featured Products
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-[42px]">
            Products we{' '}
            <span className="text-accent">
              build and run.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-[1.8] text-text-secondary sm:text-[15px]">
            From intelligent platforms to scalable digital
            products, explore the solutions we design,
            develop, and bring to life.
          </p>

        </Reveal>

        {/* PRODUCTS GRID */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-7">

          {products.map((product, index) => (
            <ProductShowcase
              key={product.id}
              product={product}
              index={index}
            />
          ))}

        </div>

        {/* FOOTER */}

        <Reveal className="mt-10">
          <div className="flex flex-col justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">

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
