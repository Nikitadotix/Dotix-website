
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SectionHeading } from './SectionHeading.js';

export function ProjectFilter({ projects, caseStudySlugs = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'SaaS Products',
    'Business Software',
    'Websites',
    'Mobile Apps',
  ];

  const projectHighlights = {
    buzzr: ['Web App', 'UI/UX', 'Dashboard'],
    madjoy: ['Mobile App', 'UI/UX', 'Animations'],
    inloopmedia: ['Website', 'SEO', 'UI/UX'],
    snackmedia: ['Website', 'Web Development', 'UI/UX'],
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <section className="border-t border-border bg-background-secondary py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* SECTION HEADING */}

        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Our <span className="text-accent">Projects</span>
            </>
          }
          description="A selection of digital experiences and software solutions we’ve created for businesses."
          spacingClassName="mb-10"
          titleClassName="text-white"
          descriptionClassName="mt-3 text-sm leading-7"
        />

        {/* CATEGORY FILTERS */}

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-background-card text-text-secondary hover:border-accent/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PROJECT CARDS */}

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const hasCaseStudy = caseStudySlugs.includes(project.id);

            const href = hasCaseStudy
              ? `/case-studies/${project.id}`
              : project.website || `/projects/${project.id}`;

            const isExternal =
              !hasCaseStudy && /^https?:\/\//i.test(href);

            const websiteLabel = project.website
              ?.replace(/^https?:\/\//i, '')
              .split('/')[0];

            const ProjectCard = isExternal ? 'a' : Link;

            const ctaLabel = hasCaseStudy
              ? 'Read case study'
              : project.website
                ? 'Explore project'
                : 'View project';

            return (
              <article
                key={project.id}
                className="group flex h-full min-h-[260px] flex-col overflow-hidden rounded-lg border border-border bg-background-card shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <ProjectCard
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="flex flex-1 flex-col p-6"
                >

                  {/* PROJECT NAME + LOGO + WEBSITE */}

                  <div className="flex items-center gap-3">
                    {project.logo && (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background-elevated p-2">
                        <Image
                          src={project.logo}
                          alt={`${project.name} logo`}
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                        />
                      </span>
                    )}

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-snug text-text-primary transition-colors duration-200 group-hover:text-accent">
                        {project.name}
                      </h3>

                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="mt-1 inline-flex items-center gap-1 text-[11px] text-text-muted transition-colors hover:text-accent"
                        >
                          {websiteLabel}
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {project.description}
                  </p>

                  {/* PROJECT HIGHLIGHTS */}

                  {(projectHighlights[project.id] || []).length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {projectHighlights[project.id].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-background-elevated px-2 py-1 text-[10px] leading-none text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* TECHNOLOGIES */}

                  {project.tags?.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        Built with
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border bg-background-elevated px-2 py-1 text-[10px] text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BOTTOM CTA */}

                  <div className="mt-auto pt-6">
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-all duration-200 group-hover:gap-2.5">
                      {ctaLabel}
                      <ArrowUpRight size={13} />
                    </div>
                  </div>

                </ProjectCard>
              </article>
            );
          })}
        </div>

        {/* EMPTY STATE */}

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">
              No projects found in this category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
