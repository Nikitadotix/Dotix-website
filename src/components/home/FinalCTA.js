'use client';

import { Button } from '../common/Button.js';
import { SectionHeading } from '../common/SectionHeading.js';
import Link from 'next/link';

const trustPoints = [
  '48-hour scope proposal',
  'NDA-protected',
  'Direct access to lead engineers',
  'Full IP & source code ownership',
];

/* One wave period is 1440 wide; the path repeats twice so a -50% translate loops seamlessly. */
const WAVE_PATH =
  'M0 200 C240 120 480 120 720 200 S1200 280 1440 200 C1680 120 1920 120 2160 200 S2640 280 2880 200 V400 H0 Z';

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-background-primary py-20 sm:py-24"
      id="contact-cta"
    >
      <style>{`
        @keyframes fcta-drift-left  { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @keyframes fcta-drift-right { from { transform: translate3d(-50%,0,0); } to { transform: translate3d(0,0,0); } }
        @keyframes fcta-float-a {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(8%, -10%, 0) scale(1.15); }
        }
        @keyframes fcta-float-b {
          0%, 100% { transform: translate3d(0,0,0) scale(1.1); }
          50%      { transform: translate3d(-10%, 8%, 0) scale(0.95); }
        }
        .fcta-wave { position: absolute; left: 0; bottom: 0; width: 200%; will-change: transform; }
        .fcta-wave-1 { height: 62%; animation: fcta-drift-left 38s linear infinite; }
        .fcta-wave-2 { height: 48%; animation: fcta-drift-right 52s linear infinite; }
        .fcta-wave-3 { height: 36%; animation: fcta-drift-left 70s linear infinite; }
        .fcta-orb-a  { animation: fcta-float-a 16s ease-in-out infinite; }
        .fcta-orb-b  { animation: fcta-float-b 20s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fcta-wave, .fcta-orb-a, .fcta-orb-b { animation: none; }
        }
      `}</style>

      {/* ANIMATED BACKGROUND */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Soft drifting light */}
        <div className="fcta-orb-a absolute -left-[10%] bottom-[-30%] h-[70%] w-[55%] rounded-full bg-accent/[0.08] blur-[110px]" />
        <div className="fcta-orb-b absolute -right-[8%] bottom-[-35%] h-[75%] w-[50%] rounded-full bg-accent/20 blur-[130px]" />

        {/* Layered waves */}
        <svg className="fcta-wave fcta-wave-3" viewBox="0 0 2880 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fcta-g3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={WAVE_PATH} fill="url(#fcta-g3)" />
        </svg>
        <svg className="fcta-wave fcta-wave-2" viewBox="0 0 2880 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fcta-g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path d={WAVE_PATH} fill="url(#fcta-g2)" />
        </svg>
        <svg className="fcta-wave fcta-wave-1" viewBox="0 0 2880 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fcta-g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path d={WAVE_PATH} fill="url(#fcta-g1)" />
        </svg>

        {/* Fade the top so the text area stays clean and blends into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-background-primary/70 to-transparent" />

        {/* Faint grid, masked to the centre */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--grid-lines) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <SectionHeading
          eyebrow="Let’s build something meaningful"
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
          titleClassName="text-2xl sm:text-4xl md:text-[2.75rem] font-extrabold text-white"
          descriptionClassName="max-w-lg text-sm leading-[1.7] sm:text-base"
        />

        {/* CTA BUTTONS */}
        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button
            href="/contact"
            variant="primary"
            className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white/90 px-5 sm:px-7 text-[13px] font-semibold text-background-primary shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white hover:shadow-accent/20 sm:w-auto text-center"
          >
            Start Your Project
          </Button>

          <Link
            href="/contact?intent=call"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-background-card px-5 sm:px-7 text-[13px] font-semibold text-text-primary transition-all duration-300 hover:border-accent/60 hover:bg-background-elevated sm:w-auto text-center"
          >
            Schedule a Discovery Call
          </Link>
        </div>

        {/* TRUST POINTS */}
        <ul className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-y-2 text-[11px] sm:text-xs font-medium text-text-secondary">
          {trustPoints.map((point, i) => (
            <li
              key={point}
              className={`px-2.5 sm:px-4 ${i !== 0 ? 'sm:border-l sm:border-border' : ''}`}
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}