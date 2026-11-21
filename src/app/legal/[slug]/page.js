
import fs from 'fs';
import path from 'path';

import Link from 'next/link';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { notFound } from 'next/navigation';

// Markdown files live in src/content/legal/<slug>.md
const LEGAL_DIR = path.join(process.cwd(), 'src', 'content', 'legal');

const SLUGS = [
  'privacy-policy',
  'terms-and-conditions',
  'cookie-policy',
];



const SLUG_META = {
  'privacy-policy': {
    title: 'Privacy Policy — Dotix Technologies',
    description:
      'Read the Dotix Privacy Policy to understand how we collect, use, and protect your personal data when you use our services and website.',
    keywords: [
      'Dotix privacy policy',
      'data privacy',
      'personal data protection',
      'Dotix data policy',
      'GDPR Dotix',
    ],
  },

  'terms-and-conditions': {
    title: 'Terms and Conditions — Dotix Technologies',
    description:
      'Review the Terms and Conditions governing your use of Dotix services and website. Understand your rights and obligations when working with Dotix.',
    keywords: [
      'Dotix terms and conditions',
      'Dotix terms of service',
      'service agreement Dotix',
      'legal terms Dotix',
    ],
  },

  'cookie-policy': {
    title: 'Cookie Policy — Dotix Technologies',
    description:
      'Learn how Dotix uses cookies and similar tracking technologies on our website. Understand your choices and how to manage cookie preferences.',
    keywords: [
      'Dotix cookie policy',
      'cookies Dotix',
      'tracking technologies',
      'cookie consent Dotix',
    ],
  },
};

/* =========================================
   HELPERS
========================================= */

const fileExists = (slug) =>
  fs.existsSync(path.join(LEGAL_DIR, `${slug}.md`));

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

const slugify = (s) =>
  decode(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Adds IDs to headings for direct linking.
function addHeadingIds(html) {
  const out = html.replace(
    /<h2>([\s\S]*?)<\/h2>/g,
    (_, inner) => {
      const text = decode(
        inner.replace(/<[^>]+>/g, '').trim()
      );

      const id = slugify(text);

      return `<h2 id="${id}">${inner}</h2>`;
    }
  );

  return out;
}

async function getLegalPage(slug) {
  if (!SLUGS.includes(slug) || !fileExists(slug)) {
    return null;
  }

  const raw = fs.readFileSync(
    path.join(LEGAL_DIR, `${slug}.md`),
    'utf8'
  );

  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkHtml)
    .process(content);

  const htmlContent = addHeadingIds(
    processed.toString()
  );

  return {
    frontmatter: data,
    htmlContent,
  };
}

/* =========================================
   NEXT.JS EXPORTS
========================================= */

export function generateStaticParams() {
  return SLUGS
    .filter(fileExists)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!SLUGS.includes(slug)) {
    return {};
  }

  const meta = SLUG_META[slug];

  const canonicalUrl =
    `https://dotix.io/legal/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: 'index, follow',

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'Dotix',
      type: 'website',

      images: [
        {
          url: '/assets/images/og-image.webp',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/assets/images/og-image.webp'],
    },
  };
}

/* =========================================
   STYLES
========================================= */

const CSS = `

html:has(.legal-page) {
  scroll-behavior: smooth;
}

.legal-page {
  --lp-accent: var(
    --color-accent,
    var(
      --color-primary,
      var(--accent, var(--primary, #0ea5e9))
    )
  );

  --lp-accent-soft: color-mix(
    in srgb,
    var(--lp-accent) 12%,
    transparent
  );

  --lp-border: rgba(128, 128, 128, .22);
  --lp-surface: rgba(128, 128, 128, .05);
  --lp-muted: .72;

  color: inherit;
}

.legal-page * {
  box-sizing: border-box;
}

/* =========================================
   CONTAINER
========================================= */

.lp-wrap {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .lp-wrap {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .lp-wrap {
    padding: 0 1.15rem;
  }
}

/* =========================================
   HERO
========================================= */

.lp-hero {
  position: relative;
  padding: 7.5rem 0 3.25rem;
  text-align: center;

  background:
    radial-gradient(
      60% 90% at 50% 0%,
      var(--lp-accent-soft),
      transparent 70%
    );

  border-bottom: 1px solid var(--lp-border);
}

.lp-crumbs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  font-size: .85rem;
  opacity: var(--lp-muted);
  margin-bottom: 1.25rem;
}

.lp-crumbs a {
  color: inherit;
  text-decoration: none;
}

.lp-crumbs a:hover {
  color: var(--lp-accent);
  opacity: 1;
}

/* PAGE TITLE */

.lp-title {
  margin: 1rem 0 .75rem;

  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -.02em;
}

/* DESCRIPTION */

.lp-sub {
  max-width: 640px;
  margin: 0 auto 1.5rem;

  font-size: 1.05rem;
  line-height: 1.7;
  opacity: var(--lp-muted);
}

/* UPDATED DATE */

.lp-updated {
  display: inline-flex;
  align-items: center;
  gap: .5rem;

  padding: .45rem 1rem;
  border-radius: 999px;

  font-size: .9rem;
  font-weight: 500;

  background: var(--lp-surface);
  border: 1px solid var(--lp-border);
}

.lp-updated::before {
  content: "";

  width: .5rem;
  height: .5rem;

  border-radius: 50%;
  background: var(--lp-accent);
}

/* =========================================
   FULL WIDTH CONTENT LAYOUT
========================================= */

.lp-grid {
  display: block;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
}

/* =========================================
   REMOVE SIDEBAR
========================================= */

.lp-toc {
  display: none !important;
}

/* =========================================
   REMOVE CONTENT BOX
========================================= */

.lp-card {
  display: block;

  width: 100%;
  max-width: none;

  padding: 0;
  margin: 0;

  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

/* =========================================
   LEGAL CONTENT
========================================= */

.lp-content {
  width: 100%;
  max-width: none;

  font-size: 1rem;
  line-height: 1.85;

  overflow-wrap: anywhere;
}

.lp-content > *:first-child {
  margin-top: 0;
}

.lp-content > *:last-child {
  margin-bottom: 0;
}

/* SECTION HEADINGS */

.lp-content h2 {
  position: relative;

  scroll-margin-top: 6rem;

  margin: 3rem 0 1rem;
  padding-bottom: .75rem;

  font-size: 1.6rem;
  line-height: 1.3;

  font-weight: 700;
  letter-spacing: -.01em;

  border-bottom: 1px solid var(--lp-border);
}

.lp-content h2::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: -1px;

  width: 3.5rem;
  height: 2px;

  background: var(--lp-accent);
  border-radius: 2px;
}

/* SUBHEADINGS */

.lp-content h3 {
  margin: 2rem 0 .6rem;

  font-size: 1.2rem;
  font-weight: 650;
  line-height: 1.4;

  color: var(--lp-accent);
}

/* PARAGRAPHS */

.lp-content p {
  margin: 0 0 1.1rem;
  opacity: .88;
}

.lp-content strong {
  font-weight: 650;
  opacity: 1;
}

/* LISTS */

.lp-content ul,
.lp-content ol {
  margin: 0 0 1.25rem;
  padding-left: 1.5rem;
}

.lp-content li {
  margin: .5rem 0;
  padding-left: .25rem;
  opacity: .88;
}

.lp-content li > p {
  margin: 0 0 .5rem;
}

.lp-content ul {
  list-style: disc;
}

.lp-content ol {
  list-style: decimal;
}

.lp-content li::marker {
  color: var(--lp-accent);
  font-weight: 600;
}

.lp-content ul ul,
.lp-content ol ul,
.lp-content ul ol,
.lp-content ol ol {
  margin: .5rem 0;
}

.lp-content ul ul {
  list-style: circle;
}

/* LINKS */

.lp-content a {
  color: var(--lp-accent);

  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;

  font-weight: 500;
  word-break: break-word;
}

.lp-content a:hover {
  text-decoration-thickness: 2px;
}

/* BLOCKQUOTES */

.lp-content blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;

  border-left: 3px solid var(--lp-accent);

  background: var(--lp-accent-soft);
  border-radius: 0 .75rem .75rem 0;
}

.lp-content blockquote p:last-child {
  margin-bottom: 0;
}

/* DIVIDERS */

.lp-content hr {
  margin: 2.5rem 0;

  border: 0;
  border-top: 1px solid var(--lp-border);
}

/* INLINE CODE */

.lp-content code {
  padding: .15rem .4rem;

  border-radius: .35rem;
  font-size: .9em;

  background: var(--lp-accent-soft);
}

/* =========================================
   OTHER LEGAL DOCUMENTS
========================================= */

.lp-more {
  padding: 1rem 2rem 5rem;
}

.lp-more-title {
  margin: 0 0 1rem;

  font-size: .8rem;
  font-weight: 700;

  letter-spacing: .1em;
  text-transform: uppercase;

  opacity: .6;
}

.lp-more-list {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .lp-more-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.lp-more-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1.1rem 1.4rem;

  border-radius: 1rem;

  color: inherit;
  text-decoration: none;
  font-weight: 600;

  background: var(--lp-surface);
  border: 1px solid var(--lp-border);

  transition: all .15s ease;
}

.lp-more-link:hover {
  border-color: var(--lp-accent);
  background: var(--lp-accent-soft);

  transform: translateY(-2px);
}

.lp-more-link span:last-child {
  color: var(--lp-accent);
  transition: transform .15s ease;
}

.lp-more-link:hover span:last-child {
  transform: translateX(4px);
}

/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 768px) {

  .lp-hero {
    padding: 6.5rem 0 2.5rem;
  }

  .lp-grid {
    padding: 2rem 1.5rem 1.5rem;
  }

  .lp-content {
    font-size: .96rem;
    line-height: 1.8;
  }

  .lp-content h2 {
    font-size: 1.4rem;
    margin-top: 2.5rem;
  }

  .lp-content h3 {
    font-size: 1.1rem;
  }

  .lp-more {
    padding: 1rem 1.5rem 4rem;
  }
}

@media (max-width: 480px) {

  .lp-hero {
    padding: 5.5rem 0 2rem;
  }

  .lp-title {
    font-size: 2rem;
  }

  .lp-sub {
    font-size: .95rem;
  }

  .lp-grid {
    padding: 1.75rem 1.15rem 1rem;
  }

  .lp-content {
    font-size: .92rem;
    line-height: 1.75;
  }

  .lp-content h2 {
    font-size: 1.3rem;
  }

  .lp-content h3 {
    font-size: 1.05rem;
  }

  .lp-more {
    padding: 1rem 1.15rem 3rem;
  }
}

`;

/* =========================================
   LEGAL PAGE
========================================= */

const LegalPages = async ({ params }) => {
  const { slug } = await params;

  const page = await getLegalPage(slug);

  if (!page) {
    return notFound();
  }

  const { frontmatter, htmlContent } = page;

  // Supports lastUpdated and updated frontmatter fields.
  const updated = String(
    frontmatter.lastUpdated || frontmatter.updated || ''
  )
    .replace(/^Last Updated:\s*/i, '')
    .trim();

  const title =
    frontmatter.title || LABELS[slug] || 'Dotix Legal';

  const description =
    frontmatter.description ||
    SLUG_META[slug]?.description ||
    '';

  const canonicalUrl =
    `https://dotix.io/legal/${slug}`;

  const otherPages = SLUGS.filter(
    (s) => s !== slug && fileExists(s)
  );

  /* =========================================
     STRUCTURED DATA
  ========================================= */

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',

    '@id': `${canonicalUrl}#webpage`,

    url: canonicalUrl,
    name: title,

    description:
      SLUG_META[slug]?.description || '',

    isPartOf: {
      '@type': 'WebSite',
      url: 'https://dotix.io',
      name: 'Dotix',
    },

    breadcrumb: {
      '@type': 'BreadcrumbList',

      itemListElement: [
       
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: canonicalUrl,
        },
      ],
    },
  };

  return (
    <div className="legal-page">

      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =====================================
          HERO
      ===================================== */}

      <header className="lp-hero">

        <div className="lp-wrap">

         

          <h1 className="lp-title">
            {title}
          </h1>

          {description && (
            <p className="lp-sub">
              {description}
            </p>
          )}

          {updated && (
            <span className="lp-updated">
              Last updated: {updated}
            </span>
          )}

        </div>

      </header>

      {/* =====================================
          FULL WIDTH LEGAL CONTENT
          No sidebar or content card
      ===================================== */}

      <main className="lp-wrap lp-grid">

        <article className="lp-card">

          <div
            id="legal"
            className="lp-content"
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          />

        </article>

      </main>

      {/* =====================================
          OTHER LEGAL DOCUMENTS
      ===================================== */}

      {otherPages.length > 0 && (

        <div className="lp-wrap lp-more">

          <p className="lp-more-title">
            More legal documents
          </p>

          <div className="lp-more-list">

            {otherPages.map((s) => (

              <Link
                key={s}
                href={`/legal/${s}`}
                className="lp-more-link"
              >
              

                <span aria-hidden="true">
                  &rarr;
                </span>
              </Link>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

export default LegalPages;
