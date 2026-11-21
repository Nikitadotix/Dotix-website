'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Cloud,
  Smartphone,
  BrainCircuit,
  Workflow,
  CreditCard,
  Server,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.js';

export function TechStack() {
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    {
      title: 'Frontend & Mobile',
      technologies: [
        { name: 'Next.js', slug: 'nextdotjs', color: '000000' },
        { name: 'React', slug: 'react', color: '61DAFB' },
        { name: 'React Native', icon: Smartphone },
        { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
        { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
        { name: 'Framer Motion', slug: 'framer', color: '0055FF' },
      ],
    },
    {
      title: 'Backend & APIs',
      technologies: [
        { name: 'Go', slug: 'go', color: '00ADD8' },
        { name: 'Node.js', slug: 'nodedotjs', color: '5FA04E' },
        { name: 'Fastify', slug: 'fastify', color: '000000' },
        { name: 'GraphQL', slug: 'graphql', color: 'E10098' },
        { name: 'Socket.IO', slug: 'socketdotio', color: '010101' },
        { name: 'Stripe', icon: CreditCard },
      ],
    },
    {
      title: 'Data & Storage',
      technologies: [
        { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
        { name: 'Redis', slug: 'redis', color: 'FF4438' },
        { name: 'MySQL', slug: 'mysql', color: '4479A1' },
        { name: 'MariaDB', slug: 'mariadb', color: '003545' },
        { name: 'Firebase', slug: 'firebase', color: 'DD2C00' },
        { name: 'Supabase', slug: 'supabase', color: '3FCF8E' },
      ],
    },
    {
      title: 'Cloud & AI',
      technologies: [
        { name: 'Docker', slug: 'docker', color: '2496ED' },
        { name: 'AWS', icon: Cloud },
        { name: 'Cloudflare', slug: 'cloudflare', color: 'F38020' },
        { name: 'GitHub Actions', icon: Workflow },
        { name: 'OpenAI APIs', icon: BrainCircuit },
      ],
    },
  ];

  const technologies = categories.flatMap((category) =>
    category.technologies.map((technology) => ({
      ...technology,
      category: category.title,
    }))
  );

  // Divide technologies into four vertical columns
  const columns = Array.from({ length: 4 }, (_, columnIndex) =>
    technologies.filter((_, index) => index % 4 === columnIndex)
  );

  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden border-t border-border/70 bg-background-secondary py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">

        {/* LEFT CONTENT */}
        <div className="max-w-lg">
          <SectionHeading
            eyebrow="Technologies used"
            title={
              <>
                Key <span className="text-accent">Technologies</span> &amp;{' '}
                <span className="text-accent">Platforms</span>
              </>
            }
            description="We work with leading platforms and technologies that empower digital transformation, accelerate delivery, and drive measurable business results."
            spacingClassName="mb-0"
            titleClassName="max-w-md md:text-5xl"
            descriptionClassName="max-w-md leading-7 text-text-muted sm:text-base"
          />
        </div>

        {/* RIGHT ANIMATED TECHNOLOGY PANEL */}
        <div
          id="tech-stack-grid"
          role="group"
          aria-label="Technologies used by Dotix"
          className="relative min-w-0"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background-card p-3 shadow-sm sm:p-4 lg:p-5">

            {/* Background detail */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent" />

            {/* Vertical scrolling columns */}
           <div className="relative grid h-[400px] grid-cols-4 gap-0 overflow-hidden sm:h-[420px] sm:gap-1 lg:h-[430px]">

              {columns.map((column, columnIndex) => {
                const reverse = columnIndex % 2 !== 0;

                return (
                  <div
                    key={columnIndex}
                    className="relative h-full overflow-hidden"
                  >
                    <motion.div
                      className="flex flex-col gap-2 sm:gap-3"
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? { y: 0 }
                          : {
                              y: reverse
                                ? ['-50%', '0%']
                                : ['0%', '-50%'],
                            }
                      }
                      transition={{
                        duration: 17 + columnIndex * 3,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    >
                      {/* Duplicate items for seamless scrolling */}
                      {[0, 1].map((copy) => (
                        <div
                          key={copy}
                         className="flex shrink-0 flex-col gap-2 sm:gap-2.5"
                          aria-hidden={copy === 1}
                        >
                          {column.map((technology) => {
                            const TechnologyIcon = technology.icon;

                            return (
                              <div
                                key={`${technology.name}-${copy}`}
                                title={technology.name}
                                className="group mx-auto flex aspect-square w-full max-w-[80px] shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background-elevated p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-background-primary"
                              >
                                {TechnologyIcon ? (
                                  <TechnologyIcon
                                    size={30}
                                    strokeWidth={1.7}
                                    className="text-text-primary transition-transform duration-300 group-hover:scale-110"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <img
                                    src={`https://cdn.simpleicons.org/${technology.slug}/${technology.color}`}
                                    alt={copy === 0 ? technology.name : ''}
                                    aria-hidden={copy === 1 ? true : undefined}
                                    loading="lazy"
                                    width="32"
                                    height="32"
                                    className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}