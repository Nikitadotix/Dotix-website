
'use client';

import { Button } from '../common/Button.js';
import { SectionHeading } from '../common/SectionHeading.js';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const trustPoints = [
  '48-hour scope proposal',
  'NDA-protected',
  'Direct access to lead engineers',
  'Full IP & source code ownership',
];

/*
  Two identical wave periods.
  Each wave repeats perfectly when translated by -50%.
*/

const WAVE_PATH =
  'M0 180 C180 120 360 120 540 180 S900 240 1080 180 S1440 120 1620 180 S1980 240 2160 180 S2520 120 2700 180 S3060 240 3240 180 L3240 400 L0 400 Z';

const WAVE_VIEWBOX = '0 0 3240 400';

export function FinalCTA() {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-background-primary py-20 sm:py-24 lg:py-28"
      id="contact-cta"
    >
      <style>{`
        /* =====================================
           SMOOTH WAVE ANIMATIONS
        ===================================== */

        @keyframes fcta-wave-move {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes fcta-orb-one {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(5%, -12%, 0) scale(1.12);
          }
        }

        @keyframes fcta-orb-two {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1.05);
          }
          50% {
            transform: translate3d(-7%, 8%, 0) scale(0.95);
          }
        }

        /* =====================================
           WAVE CONTAINERS
        ===================================== */

        .fcta-wave-wrapper {
          position: absolute;
          inset: auto 0 0;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
          line-height: 0;
        }

        .fcta-wave-track {
          display: flex;
          width: 200%;
          height: 100%;
          will-change: transform;
          animation: fcta-wave-move linear infinite;
        }

        .fcta-wave-svg {
          display: block;
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          overflow: visible;
        }

        .fcta-wave-back {
          height: 65%;
          opacity: 0.7;
        }

        .fcta-wave-middle {
          height: 52%;
          opacity: 0.8;
        }

        .fcta-wave-front {
          height: 40%;
          opacity: 0.9;
        }

        .fcta-wave-back .fcta-wave-track {
          animation-duration: 48s;
        }

        .fcta-wave-middle .fcta-wave-track {
          animation-duration: 62s;
          animation-direction: reverse;
        }

        .fcta-wave-front .fcta-wave-track {
          animation-duration: 78s;
        }

        /* =====================================
           AMBIENT LIGHT
        ===================================== */

        .fcta-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
          will-change: transform;
        }

        .fcta-orb-one {
          animation: fcta-orb-one 18s ease-in-out infinite;
        }

        .fcta-orb-two {
          animation: fcta-orb-two 23s ease-in-out infinite;
        }

        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 640px) {
          .fcta-wave-back {
            height: 48%;
          }

          .fcta-wave-middle {
            height: 38%;
          }

          .fcta-wave-front {
            height: 28%;
          }

          .fcta-orb {
            filter: blur(65px);
          }
        }

        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {
          .fcta-wave-track,
          .fcta-orb {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =====================================
          FULL WIDTH ANIMATED BACKGROUND
      ===================================== */}

      <div
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Ambient light */}

        <div
          className="fcta-orb fcta-orb-one -bottom-[30%] -left-[12%] h-[65%] w-[65%] blur-[120px]"
          style={{
            background: 'var(--accent)',
            opacity: 0.11,
          }}
        />

        <div
          className="fcta-orb fcta-orb-two -bottom-[35%] -right-[12%] h-[70%] w-[65%] blur-[140px]"
          style={{
            background: 'var(--accent)',
            opacity: 0.15,
          }}
        />

        {/* BACK WAVE */}

        <div className="fcta-wave-wrapper fcta-wave-back">
          <div className="fcta-wave-track">
            {[0, 1].map((item) => (
              <svg
                key={item}
                className="fcta-wave-svg"
                viewBox={WAVE_VIEWBOX}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`fcta-back-${item}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.09"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0.015"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={WAVE_PATH}
                  fill={`url(#fcta-back-${item})`}
                />
              </svg>
            ))}
          </div>
        </div>

        {/* MIDDLE WAVE */}

        <div className="fcta-wave-wrapper fcta-wave-middle">
          <div className="fcta-wave-track">
            {[0, 1].map((item) => (
              <svg
                key={item}
                className="fcta-wave-svg"
                viewBox={WAVE_VIEWBOX}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`fcta-middle-${item}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.12"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0.025"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={WAVE_PATH}
                  fill={`url(#fcta-middle-${item})`}
                />
              </svg>
            ))}
          </div>
        </div>

        {/* FRONT WAVE */}

        <div className="fcta-wave-wrapper fcta-wave-front">
          <div className="fcta-wave-track">
            {[0, 1].map((item) => (
              <svg
                key={item}
                className="fcta-wave-svg"
                viewBox={WAVE_VIEWBOX}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`fcta-front-${item}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.15"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0.035"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={WAVE_PATH}
                  fill={`url(#fcta-front-${item})`}
                />
              </svg>
            ))}
          </div>
        </div>

        {/* TOP FADE */}

        <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-background-primary/80 to-transparent" />

        {/* SUBTLE GRID */}

        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--grid-lines) 1px, transparent 0)',
            backgroundSize: '42px 42px',
            maskImage:
              'radial-gradient(ellipse 75% 70% at 50% 65%, black 10%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 70% at 50% 65%, black 10%, transparent 100%)',
          }}
        />

      </div>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-5 text-center sm:px-6">

        <SectionHeading
          eyebrow="Let's build something meaningful"
          title={
            <>
              Ready to turn your vision into{' '}
              <span className="bg-gradient-to-r from-text-primary via-text-secondary to-accent bg-clip-text text-transparent">
                production software?
              </span>
            </>
          }
          description="From the first idea to a production-ready product, work directly with experienced engineers who understand your goals, take ownership, and build software designed to grow with your business."
          align="center"
          spacingClassName="mb-8"
          titleClassName="text-2xl font-extrabold leading-tight text-text-primary sm:text-4xl md:text-[2.75rem]"
          descriptionClassName="max-w-lg text-sm leading-[1.7] sm:text-base"
        />

        {/* CTA BUTTONS */}

        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">

          <Button
            href="/contact"
            variant="primary"
            className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-[13px] font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent/20 sm:w-auto sm:px-7"
          >
            Start Your Project
            
          </Button>

          <Link
            href="/contact?intent=call"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background-card px-6 text-[13px] font-semibold text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-background-elevated sm:w-auto sm:px-7"
          >
            Schedule a Discovery Call
            <ArrowUpRight size={15} />
          </Link>

        </div>

        {/* TRUST POINTS */}

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-1 gap-y-3 text-[11px] font-medium text-text-secondary sm:mt-11 sm:text-xs">

          {trustPoints.map((point, index) => (
            <li
              key={point}
              className={`px-3 sm:px-4 ${
                index !== 0
                  ? 'sm:border-l sm:border-border'
                  : ''
              }`}
            >
              {point}
            </li>
          ))}

        </ul>

      </div>
    </section>
  );
}
