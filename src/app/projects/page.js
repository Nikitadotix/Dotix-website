
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

import { projects } from '../../data/projects.js';
import { products } from '../../data/products.js';
import { ProjectFilter } from '../../components/common/ProjectFilter.js';
import { SectionHeading } from '../../components/common/SectionHeading.js';
import HeroCircuit from '../../components/common/HeroCircuit.js';
import { getCaseStudies } from '../../lib/case-studies.js';

export const metadata = {
  title: 'Projects & Products | Dotix',
  description:
    'Explore products built by Dotix and software projects delivered for businesses.',
};

export default function ProjectsPage() {
  const caseStudySlugs = getCaseStudies().map(({ slug }) => slug);

  const featuredProducts = products.filter((product) =>
    ['duddy', 'omnibase', 'rewardhub', 'apploft'].includes(product.id)
  );

  const otherProjects = projects.filter(
    (project) =>
      !['duddy', 'omnibase', 'rewardhub', 'apploft', 'notix'].includes(
        project.id
      )
  );

  /* =========================================
     PRODUCT ICONS
  ========================================= */

  const productIcons = {
    duddy: '/images/projects/duddy-icon.svg',
    omnibase: '/images/projects/omnibase-icon.svg',
    rewardhub: '/images/projects/rewardhub-icon.svg',
    apploft: '/images/projects/apploft-icon.svg',
  };

  /* =========================================
     PRODUCT HIGHLIGHTS
  ========================================= */

  const productHighlights = {
    duddy: ['AI App Builder', 'Web App', 'UI/UX', 'Animations'],
    omnibase: ['Backend', 'API Integration', 'Dashboard', 'Cloud'],
    rewardhub: ['Web App', 'UI/UX', 'Rewards', 'Dashboard'],
    apploft: ['Mobile Apps', 'Android', 'iOS', 'UI/UX'],
  };

  /* =========================================
     PRODUCT BRAND COLORS
  ========================================= */

  const productColors = {
    duddy: '#9333EA',
    omnibase: '#FFFFFF',
    rewardhub: '#172554',
    apploft: '#F04438',
  };

  /* =========================================
     STAGGERED CARD PLACEMENT
  ========================================= */

  const placement = [
    'lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center',
    'lg:col-start-2 lg:row-start-1',
    'lg:col-start-2 lg:row-start-2',
    'lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:self-center',
  ];

  /* =========================================
     HERO CHIPS
  ========================================= */

  const heroChips = featuredProducts.map((product) => ({
    src: productIcons[product.id],
    alt: product.name,
  }));

  return (
    <main>
      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="relative overflow-hidden bg-background-primary py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border,rgba(255,255,255,.12))_1px,transparent_1.4px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_75%_50%,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_at_75%_50%,#000,transparent_70%)]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Our work"
            title={
              <>
                Products we build.
                <span className="text-accent">
                  {' '}Projects we deliver.
                </span>
              </>
            }
            description="From products we’re building ourselves to digital solutions developed for businesses, here’s a look at what we do."
            className="max-w-4xl"
            spacingClassName="mb-0"
            titleClassName="text-4xl leading-tight sm:text-5xl md:text-6xl"
            descriptionClassName="mt-6 max-w-xl text-base leading-7 sm:text-lg"
          />

          <HeroCircuit chips={heroChips} />
        </div>
      </section>

      {/* =========================================
          OUR PRODUCTS SECTION
      ========================================= */}

      <section className="bg-background-primary pb-24 pt-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">

          {/* SECTION HEADING */}
{/* SECTION HEADING */}

<div className="mb-12 flex w-full flex-col items-center text-center">
  <div className="mb-3 flex items-center justify-center gap-3">
    <span className="h-px w-7 bg-accent" />

    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      Built by Dotix
    </p>
  </div>

  <h2 className="text-center text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
    Our <span className="text-accent">Products</span>
  </h2>

  <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-text-secondary">
    Products designed, developed and operated by our team.
  </p>
</div>

          {/* PRODUCT CARDS */}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-8 lg:gap-y-6">
            {featuredProducts.map((product, index) => {
              const hasCaseStudy = caseStudySlugs.includes(product.id);

              const href = hasCaseStudy
                ? `/case-studies/${product.id}`
                : product.website || `/projects/${product.id}`;

              const isExternal =
                !hasCaseStudy && /^https?:\/\//i.test(href);

              const websiteLabel = product.website
                ?.replace(/^https?:\/\//i, '')
                .replace(/\/$/, '');

              const LinkTag = isExternal ? 'a' : Link;

              const linkProps = {
                href,
                target: isExternal ? '_blank' : undefined,
                rel: isExternal ? 'noopener noreferrer' : undefined,
              };

              const ctaLabel = hasCaseStudy
                ? 'Read case study'
                : product.website
                  ? 'Explore product'
                  : 'View project';

              const tags = [
                ...(productHighlights[product.id] || []),
                ...(product.tags || []),
              ].slice(0, 4);

              return (
                <article
                  key={product.id}
                  style={{
                    borderTopColor:
                      productColors[product.id] || 'var(--border)',
                  }}
                  className={`group flex min-h-[230px] flex-col rounded-lg border border-border border-t-4 bg-background-card p-6 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-1 ${
                    placement[index] || ''
                  }`}
                >
                  {/* ICON + NAME + WEBSITE */}

                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background-elevated p-2">
                      <Image
                        src={productIcons[product.id]}
                        alt={`${product.name} logo`}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </span>

                    <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-lg font-semibold leading-snug text-text-primary">
                      <LinkTag
                        {...linkProps}
                        className="transition-colors duration-200 hover:text-accent"
                      >
                        {product.name}
                      </LinkTag>

                      {product.website && (
                        <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-normal text-text-muted transition-colors hover:text-accent"
                        >
                          {websiteLabel}
                          <ExternalLink
                            size={10}
                            className="shrink-0"
                          />
                        </a>
                      )}
                    </h3>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {product.description}
                  </p>

                  {/* PRODUCT TAGS */}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-background-elevated px-2 py-1 text-[10px] leading-none text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CARD FOOTER */}

                  <div className="mt-auto pt-6">
                    <LinkTag
                      {...linkProps}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-all duration-200 hover:gap-2.5"
                    >
                      {ctaLabel}
                      <ArrowUpRight size={13} />
                    </LinkTag>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          OUR PROJECTS SECTION
      ========================================= */}

      <ProjectFilter
        projects={otherProjects}
        caseStudySlugs={caseStudySlugs}
      />
    </main>
  );
}
