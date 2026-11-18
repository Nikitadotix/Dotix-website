'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers3,
} from 'lucide-react';

const projectsList = [
  {
    id: 'duddy',
    name: 'Duddy',
    category: 'SaaS Products',
    logo: '/images/projects/duddy-icon.svg',
    description:
      'AI-enabled no-code builder that creates native Android, iOS and web applications.',
    href: '/projects/duddy',
  },
  {
    id: 'omnibase',
    name: 'Omnibase',
    category: 'SaaS Products',
    logo: '/images/projects/omnibase-icon.svg',
    description:
      'Backend-as-a-service with database, authentication, file storage, payouts, notifications and admin dashboard.',
    href: '/projects/omnibase',
  },
  {
    id: 'rewardhub',
    name: 'RewardHub',
    category: 'SaaS Products',
    logo: '/images/projects/rewardhub-icon.svg',
    description:
      'Rewards and monetisation platform for advertisers, publishers and users.',
    href: '/projects/rewardhub',
  },
  {
    id: 'apploft',
    name: 'Apploft',
    category: 'Business Software',
    logo: '/images/projects/apploft-icon.svg',
    description:
      'App ecosystem for managing internal applications.',
    href: '/projects/apploft',
  },
  {
    id: 'notix',
    name: 'Notix',
    category: 'SaaS Products',
    description:
      'Central service and API for notification channels.',
    logo: '/images/projects/notix-icon.png',
    href: '/projects/notix',
  },
  {
    id: 'buzzr',
    name: 'Buzzr',
    category: 'Mobile Apps',
    description:
      'Influencer marketing and campaign platform with mobile apps, website and admin dashboard.',
    logo: '/images/projects/buzzr-icon.svg',
    href: '/projects/buzzr',
  },
  {
    id: 'madjoy',
    name: 'MadJoy',
    category: 'Mobile Apps',
    description:
      'Platform for buying gift cards and vouchers and earning cashback.',
    logo: '/images/projects/madjoy-icon.svg',
    href: '/projects/madjoy',
  },
  {
    id: 'inloopmedia',
    name: 'InloopMedia',
    category: 'Websites',
    description:
      'Website for a digital marketing agency.',
    logo: '/images/projects/inloop-icon.png',
    href: '/projects/inloopmedia',
  },
  {
    id: 'snackmedia',
    name: 'SnackMedia',
    category: 'Websites',
    description:
      'Website for an influencer marketing agency.',
    logo: '/images/projects/snackmedia-icon.svg',
    href: '/projects/snackmedia',
  },
  {
    id: 'adneo',
    name: 'AdNeo',
    category: 'Websites',
    description:
      'Website for a performance marketing agency.',
    logo: '/images/projects/adneo-icon.svg',
    href: '/projects/adneo',
  },
  {
    id: 'theadzplug',
    name: 'TheAdzPlug',
    category: 'Websites',
    logo: '/images/projects/theadzplug-icon.svg',
    description:
      'Website for a digital marketing agency.',
    href: '/projects/theadzplug',
  },
];

const GAP = 22;
const AUTOPLAY_DELAY = 4000;

const ease = [0.22, 1, 0.36, 1];

function getVisibleCount(width) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

/* =========================================
   PROJECT CARD
========================================= */

function ProjectCard({ project, index }) {
  const reducedMotion = useReducedMotion();

  return (
    <article
      className="group h-full"
    >
      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : { y: -6 }
        }
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="h-full"
      >
        <Link
          href={project.href}
          className="relative flex h-full min-h-[290px] flex-col overflow-hidden border border-border bg-background-card p-6 transition-all duration-500 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/[0.06] sm:min-h-[310px] sm:p-7"
        >
          {/* Hover background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top accent */}
          <div className="absolute left-0 top-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />

          <div className="relative flex flex-1 flex-col">
            {/* Top row */}
            <div className="mb-8 flex items-center justify-between">
              {/* Logo */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-border bg-background-elevated"
              >
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    width={36}
                    height={36}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <Layers3
                    className="h-5 w-5 text-text-muted transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                )}
              </div>

              {/* Project number */}
              <span className="font-mono text-[10px] tracking-[0.16em] text-text-muted">
                PROJECT / {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Category */}
            <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.17em] text-accent">
              {project.category}
            </span>

            {/* Project name */}
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              {project.name}

              <ArrowUpRight
                className="h-4 w-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </h3>

            {/* Description */}
            <p className="max-w-md text-sm leading-[1.8] text-text-secondary">
              {project.description}
            </p>

            {/* Bottom link */}
            <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
              <span className="text-xs font-medium text-text-secondary transition-colors duration-300 group-hover:text-accent">
                View project
              </span>

              <ArrowRight
                size={16}
                className="text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              />
            </div>
          </div>

          {/* Ambient hover glow */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/[0.07] opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
      </motion.div>
    </article>
  );
}

/* =========================================
   MAIN PROJECT CAROUSEL
========================================= */

export function ProjectsPreview() {
  const reducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Measure carousel width and update responsive card count.
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateDimensions = () => {
      const width = container.clientWidth;

      setContainerWidth(width);

      const nextCount = getVisibleCount(width);

      setVisibleCount((previous) =>
        previous === nextCount ? previous : nextCount
      );
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Reset carousel position when responsive layout changes.
  useEffect(() => {
    setSkipAnimation(true);
    setCurrentIndex(visibleCount);

    const frame = requestAnimationFrame(() => {
      setSkipAnimation(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [visibleCount]);

  // Clone items for seamless infinite movement.
  const extendedProjects = [
    ...projectsList.slice(-visibleCount),
    ...projectsList,
    ...projectsList.slice(0, visibleCount),
  ];

  const cardWidth = containerWidth
    ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount
    : 0;

  const step = cardWidth + GAP;

  const goNext = useCallback(() => {
    setCurrentIndex((previous) => previous + 1);
  }, []);

  const goPrevious = useCallback(() => {
    setCurrentIndex((previous) => previous - 1);
  }, []);

  // Handle infinite loop reset.
  const handleAnimationComplete = useCallback(() => {
    if (
      currentIndex >= visibleCount + projectsList.length
    ) {
      setSkipAnimation(true);
      setCurrentIndex(visibleCount);

      requestAnimationFrame(() => {
        setSkipAnimation(false);
      });
    }

    if (currentIndex < visibleCount) {
      setSkipAnimation(true);
      setCurrentIndex(visibleCount + projectsList.length - 1);

      requestAnimationFrame(() => {
        setSkipAnimation(false);
      });
    }
  }, [currentIndex, visibleCount]);

  // Automatic movement.
  useEffect(() => {
    if (
      reducedMotion ||
      isPaused ||
      !containerWidth
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      goNext();
    }, AUTOPLAY_DELAY);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [
    reducedMotion,
    isPaused,
    containerWidth,
    goNext,
  ]);

  // Manual pagination.
  const goToSlide = (index) => {
    setCurrentIndex(visibleCount + index);
  };

  const activeDot =
    ((currentIndex - visibleCount) % projectsList.length +
      projectsList.length) %
    projectsList.length;

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border bg-background-secondary py-16 sm:py-20 lg:py-24"
    >
      {/* Background glow */}
      <div className="ambient-glow pointer-events-none absolute left-1/4 top-1/3 h-[350px] w-[500px] bg-accent/[0.05] blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* =================================
            SECTION HEADER
        ================================= */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Projects built by Dotix
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Production Software{' '}
              <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                Shipped & Scaled.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-[1.8] text-text-secondary sm:text-base">
              Explore the digital products, platforms and
              applications we design and engineer to solve
              real business challenges.
            </p>
          </div>

          {/* Project count */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-2xl font-semibold text-text-primary">
              11
            </span>

            <span className="text-xs leading-relaxed text-text-muted">
              Projects
              <br />
              Delivered
            </span>
          </div>
        </motion.div>

        {/* =================================
            CAROUSEL
        ================================= */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Carousel viewport */}
          <div
            ref={containerRef}
            className="overflow-hidden"
          >
            <motion.div
              className="flex"
              style={{
                gap: `${GAP}px`,
              }}
              animate={{
                x: -(currentIndex * step),
              }}
              transition={
                skipAnimation
                  ? { duration: 0 }
                  : reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.8,
                        ease,
                      }
              }
              onAnimationComplete={handleAnimationComplete}
            >
              {extendedProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="shrink-0"
                  style={{
                    width: cardWidth
                      ? `${cardWidth}px`
                      : `${100 / visibleCount}%`,
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={
                      (index - visibleCount + projectsList.length) %
                      projectsList.length
                    }
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* =================================
              CONTROLS
          ================================= */}
          <div className="mt-8 flex flex-col justify-between gap-6 border-t border-border pt-6 sm:flex-row sm:items-center">
            {/* Pagination indicators */}
            <div className="flex flex-wrap items-center gap-2">
              {projectsList.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to ${project.name}`}
                  aria-current={
                    activeDot === index ? 'true' : undefined
                  }
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeDot === index
                      ? 'w-9 bg-accent'
                      : 'w-2 bg-border hover:bg-text-muted'
                  }`}
                />
              ))}

              <span className="ml-3 font-mono text-[10px] tracking-widest text-text-muted">
                {String(activeDot + 1).padStart(2, '0')} / 11
              </span>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3">
              <span className="mr-2 text-xs text-text-muted">
                Explore projects
              </span>

              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous projects"
                className="flex h-10 w-10 items-center justify-center border border-border text-text-primary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next projects"
                className="flex h-10 w-10 items-center justify-center border border-border text-text-primary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* =================================
            BOTTOM CTA
        ================================= */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="mt-12 flex justify-start sm:mt-14"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 border-b border-accent/50 pb-2 text-sm font-semibold text-text-primary transition-colors duration-300 hover:text-accent"
          >
            Explore all projects

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
