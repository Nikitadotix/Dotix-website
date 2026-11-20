import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import {
  Bot,
  Code2,
  Cpu,
  Globe2,
  PanelsTopLeft,
  PenTool,
  Sparkles,
  Square,
} from 'lucide-react';

const tagIcons = {
  'AI Agent': Bot,
  'AI Automation': Cpu,
  'No-Code': PanelsTopLeft,
  SaaS: Code2,
  'UI/UX': PenTool,
};

function DiamondMarker() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 grid h-5 w-5 shrink-0 grid-cols-2 place-content-center gap-[3px]"
    >
      {[0, 1, 2, 3].map((diamond) => (
        <span
          key={diamond}
          className="h-[7px] w-[7px] rotate-45 bg-white/55"
        />
      ))}
    </span>
  );
}

function SectionHeading({ children, level = 2 }) {
  const Heading = level === 1 ? 'h2' : 'h3';

  return (
    <Heading className="case-study-markdown__heading">
      <Square
        size={level === 1 ? 19 : 15}
        strokeWidth={2.2}
        aria-hidden="true"
        className="shrink-0"
      />
      <span>{children}</span>
    </Heading>
  );
}

const markdownComponents = {
  h1: ({ children }) => <SectionHeading level={1}>{children}</SectionHeading>,
  h2: ({ children }) => <SectionHeading level={1}>{children}</SectionHeading>,
  h3: ({ children }) => <SectionHeading>{children}</SectionHeading>,
  p: ({ children }) => (
    <p className="mb-6 text-[15px] leading-[1.85] text-text-secondary sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-8 space-y-3">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-8 list-decimal space-y-3 pl-6">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-text-secondary">
      <DiamondMarker />
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  ),
  img: ({ src, alt }) =>
    typeof src === 'string' ? (
      <Image
        src={src}
        alt={alt || ''}
        width={1200}
        height={800}
        sizes="(min-width: 1024px) 800px, 100vw"
        className="my-12 h-auto w-full object-contain sm:my-16"
      />
    ) : null,
  a: ({ href, children }) => {
    if (typeof href !== 'string') {
      return <span>{children}</span>;
    }

    if (href.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-hover"
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-hover"
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="my-12 border-white/10 sm:my-16" />,
};

export function CaseStudyTemplate({ caseStudy }) {
  return (
    <article>
      <header className="case-study-hero hero-dark-surface relative flex min-h-[480px] sm:min-h-[580px] lg:min-h-[620px] items-center justify-center overflow-hidden border-b border-white/10 px-4 sm:px-8 py-14 sm:py-20">
        <div aria-hidden="true" className="case-study-hero__grid" />
        <div
          aria-hidden="true"
          className="case-study-hero__orb case-study-hero__orb--one"
        />
        <div
          aria-hidden="true"
          className="case-study-hero__orb case-study-hero__orb--two"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <Image
            src={caseStudy.icon}
            alt={`${caseStudy.title} logo`}
            width={72}
            height={68}
            priority
            className="mx-auto mb-5 sm:mb-7 h-[54px] w-[58px] sm:h-[68px] sm:w-[72px] object-contain"
          />

          <h1 className="mx-auto max-w-5xl text-2xl font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl md:text-5xl">
            {caseStudy.title}
          </h1>

          <p className="mx-auto mt-4 sm:mt-7 max-w-4xl text-sm sm:text-lg leading-relaxed text-white/65">
            {caseStudy.description}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {caseStudy.tags.map((tag) => {
              const Icon = tagIcons[tag] || Sparkles;

              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 sm:gap-2 border border-dashed border-white/35 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white"
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" strokeWidth={1.8} />
                  {tag}
                </span>
              );
            })}
          </div>

          <a
            href={caseStudy.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 sm:mt-10 inline-flex min-h-[50px] sm:min-h-[58px] w-full sm:w-auto min-w-0 max-w-full items-center justify-center gap-3 rounded-full bg-white px-6 sm:px-8 text-sm sm:text-base font-semibold text-[#17151d] transition-transform hover:scale-[1.03]"
          >
            <Globe2 size={18} className="sm:w-5 sm:h-5" strokeWidth={1.7} />
            Visit Website
          </a>
        </div>
      </header>

      <section className="case-study-body hero-dark-surface">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="case-study-markdown">
            <ReactMarkdown components={markdownComponents}>
              {caseStudy.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </article>
  );
}
