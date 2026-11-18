'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function ProjectFilter({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const categories = ['All', 'SaaS Products', 'Business Software', 'Websites', 'Mobile Apps'];

  return (
    <>
      {/* Filter */}
      <section className="py-8 bg-background-secondary border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-background-card text-text-secondary hover:text-white border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const href = project.website || `/projects/${project.id}`;
              const isExternal = /^https?:\/\//i.test(href);
              const className =
                'group rounded-lg border border-border bg-background-card p-6 transition-all duration-300 hover:border-accent/50 hover:bg-background-elevated';
              const cardContent = (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-border bg-background-elevated">
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-accent">
                      {project.name}
                    </h3>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>

                  <span className="mb-4 inline-block rounded bg-background-elevated px-2 py-1 text-xs text-text-muted">
                    {project.category}
                  </span>

                  <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-text-secondary transition-colors group-hover:text-accent">
                    <span>
                      {project.website
                        ? project.website.replace(/^https?:\/\//i, '').replace(/\/$/, '')
                        : 'View project'}
                    </span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                </>
              );

              return isExternal ? (
                <a
                  key={project.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {cardContent}
                </a>
              ) : (
                <Link
                  key={project.id}
                  href={href}
                  className={className}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
