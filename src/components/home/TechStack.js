
'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function TechStack() {
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    {
      title: 'Frontend & Mobile',
      technologies: [
        { name: 'Next.js', slug: 'nextdotjs', color: 'FFFFFF' },
        { name: 'React', slug: 'react', color: '61DAFB' },
        { name: 'React Native', slug: 'react', color: '61DAFB' },
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
        { name: 'Fastify', slug: 'fastify', color: 'FFFFFF' },
        { name: 'GraphQL', slug: 'graphql', color: 'E10098' },
        { name: 'Socket.IO', slug: 'socketdotio', color: 'FFFFFF' },
        { name: 'Stripe', slug: 'stripe', color: '635BFF' },
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
        { name: 'AWS', slug: 'amazonaws', color: 'FF9900' },
        { name: 'Cloudflare', slug: 'cloudflare', color: 'F38020' },
        { name: 'GitHub Actions', slug: 'githubactions', color: 'FFFFFF' },
        { name: 'OpenAI APIs', slug: 'openai', color: 'FFFFFF' },
      ],
    },
  ];

  const technologies = categories.flatMap((category) =>
    category.technologies.map((technology) => ({
      ...technology,
      category: category.title,
    }))
  );

  const rows = [
    technologies.filter((_, index) => index % 2 === 0),
    technologies.filter((_, index) => index % 2 !== 0),
  ];

  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden border-t border-border/70 bg-background-secondary py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">

        {/* LEFT CONTENT */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Our stack. Your next{' '}
            <span className="text-accent">
              breakthrough.
            </span>
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-text-muted sm:text-base">
            We bring together proven technologies to build reliable,
            scalable, and high-performing digital products.
          </p>
        </div>

        {/* RIGHT TECHNOLOGY LOGOS */}
        <div
          role="group"
          aria-label="Technology stack"
          className="min-w-0 space-y-9 sm:space-y-12 lg:space-y-14"
        >
          {rows.map((row, rowIndex) => {
            const reverse = rowIndex === 1;

            return (
              <div
                key={rowIndex}
                className="overflow-hidden"
                role="group"
                aria-label={`Technology row ${rowIndex + 1}`}
              >
                <motion.div
                  className="flex w-max"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { x: reverse ? '-50%' : '0%' }
                  }
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: reverse
                            ? ['-50%', '0%']
                            : ['0%', '-50%'],
                        }
                  }
                  transition={{
                    duration: reverse ? 38 : 42,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                >
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      className="flex shrink-0 items-center gap-9 pr-9 sm:gap-12 sm:pr-12 lg:gap-14 lg:pr-14"
                      aria-hidden={copy === 1 ? true : undefined}
                    >
                      {row.map((technology) => (
                        <div
                          key={`${technology.name}-${copy}`}
                          title={technology.name}
                          className="group flex h-[76px] w-[76px] shrink-0 items-center justify-center transition-transform duration-300 hover:-translate-y-1 sm:h-[88px] sm:w-[88px]"
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${technology.slug}/${technology.color}`}
                            alt={copy === 0 ? technology.name : ''}
                            aria-hidden={copy === 1 ? true : undefined}
                            loading="lazy"
                            width="42"
                            height="42"
                            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
