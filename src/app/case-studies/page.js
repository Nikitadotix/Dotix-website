import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { getCaseStudies } from '../../lib/case-studies.js';
import { SectionHeading } from '../../components/common/SectionHeading.js';

export const metadata = {
  title: 'Case Studies | Dotix',
  description: 'Explore products and projects built by Dotix.',
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <section className="min-h-screen bg-background-primary py-20 sm:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        <header className="mb-12 max-w-3xl">
          <SectionHeading
            as="h1"
            eyebrow="Our work"
            title={
              <>
                Case studies<span className="text-accent">.</span>
              </>
            }
            description="A closer look at the products, platforms, and experiences we build."
            spacingClassName="mb-0"
            titleClassName="sm:text-5xl"
            descriptionClassName="text-base sm:text-lg"
          />
        </header>

        {caseStudies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.slug}
                href={`/case-studies/${caseStudy.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-border bg-background-card transition-colors hover:border-accent/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={caseStudy.cover}
                    alt={`${caseStudy.title} cover`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {caseStudy.category}
                  </span>
                  <h2 className="text-xl font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent">
                    {caseStudy.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                    {caseStudy.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5 mt-6">
                    <span className="text-xs text-text-muted">
                      {caseStudy.readingTime} min read
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors group-hover:text-accent">
                      Read case study <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="border border-border bg-background-card p-6 text-text-secondary">
            Case studies are coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
