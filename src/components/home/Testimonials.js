'use client';

import { Quote, Sparkles, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials.js';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

// Cursor-following glow, written straight to CSS vars (no re-renders)
const trackGlow = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--gx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--gy', `${event.clientY - rect.top}px`);
};

function TestimonialCard({ item }) {
  return (
    <figure
      onMouseMove={trackGlow}
      className="group relative w-[300px] shrink-0 overflow-hidden rounded-3xl border border-border bg-background-card p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-background-elevated hover:border-accent/40 sm:w-[380px] sm:p-7"
    >
      {/* Glow that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.09), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <Quote
        className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 rotate-12 text-accent/10 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110"
        aria-hidden="true"
      />

      <div
        className="relative mb-4 flex gap-1"
        role="img"
        aria-label={`${item.rating} out of 5 stars`}
      >
        {Array.from({ length: item.rating }, (_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
        ))}
      </div>

      <blockquote className="relative text-sm leading-relaxed text-text-primary sm:text-[15px]">
        &ldquo;{item.content}&rdquo;
      </blockquote>

      <figcaption className="relative mt-6 flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/40 font-mono text-xs font-bold text-background-primary shadow-lg shadow-accent/20"
          role="img"
          aria-label={`${item.name} photo placeholder`}
        >
          {getInitials(item.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-text-primary">{item.name}</p>
          <p className="truncate text-xs text-text-muted">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ items, reverse = false, duration = 55 }) {
  // Repeat until the strip is comfortably wider than any screen, then double for a seamless loop
  const repeats = Math.max(1, Math.ceil(8 / items.length));
  const strip = Array.from({ length: repeats }, () => items).flat();

  return (
    <div
      className="tm-mask group/row flex overflow-hidden py-3"
      aria-hidden={reverse ? 'true' : undefined}
    >
      <div
        className={`tm-track flex w-max gap-5 pr-5 ${reverse ? 'tm-reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-5" aria-hidden={copy === 1 ? 'true' : undefined}>
            {strip.map((item, i) => (
              <TestimonialCard key={`${copy}-${item.id}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-background-primary py-24 sm:py-32"
      id="testimonials"
    >
      <style>{`
        @keyframes tm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tm-pulse {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.9;  transform: translate(-50%, -50%) scale(1.12); }
        }
        @keyframes tm-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tm-track { animation: tm-scroll linear infinite; will-change: transform; }
        .tm-reverse { animation-direction: reverse; }
        .tm-section-hover:hover .tm-track { animation-play-state: paused; }
        .tm-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .tm-glow { animation: tm-pulse 8s ease-in-out infinite; }
        .tm-rise { animation: tm-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .tm-track, .tm-glow, .tm-rise { animation: none; }
        }
      `}</style>

      <div className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-accent/5 blur-[160px]" />
      <div className="tm-glow pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative z-10">
        <div className="tm-rise mx-auto mb-14 max-w-2xl px-4 text-center sm:mb-16">
        
           
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            What our clients say
          </h2>
        </div>

        <div
          className="tm-section-hover space-y-2"
          role="region"
          aria-label="Client testimonials"
        >
          <MarqueeRow items={testimonials} duration={60} />
        </div>
      </div>
    </section>
  );
}