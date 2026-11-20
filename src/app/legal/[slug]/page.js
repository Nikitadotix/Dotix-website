import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { notFound } from 'next/navigation';

// Markdown files live in src/content/legal/<slug>.md
const LEGAL_DIR = path.join(process.cwd(), 'src', 'content', 'legal');

const SLUGS = ['privacy-policy', 'terms-and-conditions', 'cookie-policy'];

const LABELS = {
  'privacy-policy': 'Privacy Policy',
  'terms-and-conditions': 'Terms and Conditions',
  'cookie-policy': 'Cookie Policy',
};

const SLUG_META = {
  'privacy-policy': {
    title: 'Privacy Policy \u2014 Dotix Technologies',
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
    title: 'Terms and Conditions \u2014 Dotix Technologies',
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
    title: 'Cookie Policy \u2014 Dotix Technologies',
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

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const fileExists = (slug) => fs.existsSync(path.join(LEGAL_DIR, `${slug}.md`));

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

// Adds an id to every <h2> and returns the list for the sidebar
function addHeadingIds(html) {
  const toc = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = decode(inner.replace(/<[^>]+>/g, '').trim());
    const id = slugify(text);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

async function getLegalPage(slug) {
  if (!SLUGS.includes(slug) || !fileExists(slug)) return null;

  const raw = fs.readFileSync(path.join(LEGAL_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  const { html, toc } = addHeadingIds(processed.toString());

  return { frontmatter: data, htmlContent: html, toc };
}

/* ------------------------------------------------------------------ */
/* Next.js exports                                                     */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return SLUGS.filter(fileExists).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) return {};

  const meta = SLUG_META[slug];
  const canonicalUrl = `https://dotix.io/legal/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: 'index, follow',
    alternates: { canonical: canonicalUrl },
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

/* ------------------------------------------------------------------ */
/* Styles (scoped to .legal-page, no Tailwind config needed)           */
/* ------------------------------------------------------------------ */

const CSS = `
html:has(.legal-page){scroll-behavior:smooth}

.legal-page{
  /* Uses your site's accent/primary colour if defined, else the fallback hex */
  --lp-accent:var(--color-accent, var(--color-primary, var(--accent, var(--primary, #0ea5e9))));
  --lp-accent-soft:color-mix(in srgb, var(--lp-accent) 12%, transparent);
  --lp-border:rgba(128,128,128,.22);
  --lp-surface:rgba(128,128,128,.05);
  --lp-muted:.72;
  color:inherit;
}
.legal-page *{box-sizing:border-box}

.lp-wrap{width:100%;max-width:1180px;margin:0 auto;padding:0 1.25rem}

/* ---------- Hero ---------- */
.lp-hero{
  position:relative;
  padding:7.5rem 0 3.25rem;
  text-align:center;
  background:
    radial-gradient(60% 90% at 50% 0%, var(--lp-accent-soft), transparent 70%);
  border-bottom:1px solid var(--lp-border);
}
.lp-crumbs{
  display:flex;justify-content:center;align-items:center;gap:.5rem;
  font-size:.85rem;opacity:var(--lp-muted);margin-bottom:1.25rem;
}
.lp-crumbs a{color:inherit;text-decoration:none}
.lp-crumbs a:hover{color:var(--lp-accent);opacity:1}
.lp-badge{
  display:inline-block;padding:.3rem .85rem;border-radius:999px;
  font-size:.75rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;
  color:var(--lp-accent);background:var(--lp-accent-soft);
  border:1px solid color-mix(in srgb, var(--lp-accent) 30%, transparent);
}
.lp-title{
  margin:1rem 0 .75rem;
  font-size:clamp(2rem,5vw,3.5rem);
  line-height:1.15;font-weight:700;letter-spacing:-.02em;
}
.lp-sub{
  max-width:640px;margin:0 auto 1.5rem;
  font-size:1.05rem;line-height:1.7;opacity:var(--lp-muted);
}
.lp-updated{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.45rem 1rem;border-radius:999px;
  font-size:.9rem;font-weight:500;
  background:var(--lp-surface);border:1px solid var(--lp-border);
}
.lp-updated::before{
  content:"";width:.5rem;height:.5rem;border-radius:50%;
  background:var(--lp-accent);
}

/* ---------- Layout ---------- */
.lp-grid{display:block;padding-top:2.5rem;padding-bottom:2rem}
@media (min-width:1024px){
  .lp-grid{display:grid;grid-template-columns:260px minmax(0,1fr);gap:2.5rem;align-items:start}
}

/* ---------- Sidebar ---------- */
.lp-toc{display:none}
@media (min-width:1024px){
  .lp-toc{
    display:block;position:sticky;top:6rem;
    max-height:calc(100vh - 8rem);overflow:auto;
    padding:1.25rem;border-radius:1rem;
    background:var(--lp-surface);border:1px solid var(--lp-border);
  }
}
.lp-toc-title{
  margin:0 0 .75rem;font-size:.75rem;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;opacity:.6;
}
.lp-toc ul{list-style:none;margin:0;padding:0}
.lp-toc li{margin:0}
.lp-toc a{
  display:block;padding:.35rem .75rem;margin-left:-.25rem;
  font-size:.86rem;line-height:1.4;color:inherit;text-decoration:none;
  opacity:.75;border-left:2px solid transparent;border-radius:0 .4rem .4rem 0;
  transition:all .15s ease;
}
.lp-toc a:hover{
  opacity:1;color:var(--lp-accent);
  border-left-color:var(--lp-accent);background:var(--lp-accent-soft);
}

/* ---------- Content card ---------- */
.lp-card{
  padding:2rem 1.25rem;border-radius:1.25rem;
  background:var(--lp-surface);border:1px solid var(--lp-border);
}
@media (min-width:640px){.lp-card{padding:2.5rem 2.5rem}}
@media (min-width:1024px){.lp-card{padding:3rem 3.25rem}}

.lp-content{font-size:1rem;line-height:1.85;overflow-wrap:anywhere}
.lp-content > *:first-child{margin-top:0}
.lp-content > *:last-child{margin-bottom:0}

.lp-content h2{
  position:relative;scroll-margin-top:6rem;
  margin:3rem 0 1rem;padding-bottom:.75rem;
  font-size:1.6rem;line-height:1.3;font-weight:700;letter-spacing:-.01em;
  border-bottom:1px solid var(--lp-border);
}
.lp-content h2::after{
  content:"";position:absolute;left:0;bottom:-1px;
  width:3.5rem;height:2px;background:var(--lp-accent);border-radius:2px;
}
.lp-content h3{
  margin:2rem 0 .6rem;font-size:1.2rem;font-weight:650;line-height:1.4;
  color:var(--lp-accent);
}
.lp-content p{margin:0 0 1.1rem;opacity:.88}
.lp-content strong{font-weight:650;opacity:1}

.lp-content ul,.lp-content ol{margin:0 0 1.25rem;padding-left:1.5rem}
.lp-content li{margin:.5rem 0;padding-left:.25rem;opacity:.88}
.lp-content li > p{margin:0 0 .5rem}
.lp-content ul{list-style:disc}
.lp-content ol{list-style:decimal}
.lp-content li::marker{color:var(--lp-accent);font-weight:600}
.lp-content ul ul,.lp-content ol ul,.lp-content ul ol,.lp-content ol ol{
  margin:.5rem 0 .5rem;
}
.lp-content ul ul{list-style:circle}

.lp-content a{
  color:var(--lp-accent);text-decoration:underline;
  text-decoration-thickness:1px;text-underline-offset:3px;
  font-weight:500;word-break:break-word;
}
.lp-content a:hover{text-decoration-thickness:2px}

.lp-content blockquote{
  margin:1.5rem 0;padding:1rem 1.25rem;
  border-left:3px solid var(--lp-accent);
  background:var(--lp-accent-soft);border-radius:0 .75rem .75rem 0;
}
.lp-content blockquote p:last-child{margin-bottom:0}
.lp-content hr{margin:2.5rem 0;border:0;border-top:1px solid var(--lp-border)}
.lp-content code{
  padding:.15rem .4rem;border-radius:.35rem;font-size:.9em;
  background:var(--lp-accent-soft);
}

/* ---------- Other policies ---------- */
.lp-more{padding:1rem 0 5rem}
.lp-more-title{
  margin:0 0 1rem;font-size:.8rem;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;opacity:.6;
}
.lp-more-list{display:grid;gap:1rem}
@media (min-width:640px){.lp-more-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
.lp-more-link{
  display:flex;align-items:center;justify-content:space-between;gap:1rem;
  padding:1.1rem 1.4rem;border-radius:1rem;
  color:inherit;text-decoration:none;font-weight:600;
  background:var(--lp-surface);border:1px solid var(--lp-border);
  transition:all .15s ease;
}
.lp-more-link:hover{
  border-color:var(--lp-accent);background:var(--lp-accent-soft);
  transform:translateY(-2px);
}
.lp-more-link span:last-child{color:var(--lp-accent);transition:transform .15s ease}
.lp-more-link:hover span:last-child{transform:translateX(4px)}
`;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const LegalPages = async ({ params }) => {
  const { slug } = await params;

  const page = await getLegalPage(slug);
  if (!page) return notFound();

  const { frontmatter, htmlContent, toc } = page;

  // Works with `lastUpdated: "14-10-2024"` or `updated: "Last Updated: 14-10-2024"`
  const updated = String(frontmatter.lastUpdated || frontmatter.updated || '')
    .replace(/^Last Updated:\s*/i, '')
    .trim();

  const title = frontmatter.title || LABELS[slug] || 'Dotix Legal';
  const description = frontmatter.description || SLUG_META[slug]?.description || '';
  const canonicalUrl = `https://dotix.io/legal/${slug}`;

  const otherPages = SLUGS.filter((s) => s !== slug && fileExists(s));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: SLUG_META[slug]?.description || '',
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://dotix.io',
      name: 'Dotix',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dotix.io' },
        { '@type': 'ListItem', position: 2, name: 'Legal', item: 'https://dotix.io/legal' },
        { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
      ],
    },
  };

  return (
    <div className="legal-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <header className="lp-hero">
        <div className="lp-wrap">
          <nav className="lp-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Legal</span>
          </nav>
          <span className="lp-badge">Legal</span>
          <h1 className="lp-title">{title}</h1>
          {description && <p className="lp-sub">{description}</p>}
          {updated && <span className="lp-updated">Last updated: {updated}</span>}
        </div>
      </header>

      {/* Sidebar + content */}
      <div className="lp-wrap lp-grid">
        {toc.length > 0 && (
          <aside className="lp-toc" aria-label="On this page">
            <p className="lp-toc-title">On this page</p>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <article className="lp-card">
          <div
            id="legal"
            className="lp-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>

      {/* Other legal pages */}
      {otherPages.length > 0 && (
        <div className="lp-wrap lp-more">
          <p className="lp-more-title">More legal documents</p>
          <div className="lp-more-list">
            {otherPages.map((s) => (
              <Link key={s} href={`/legal/${s}`} className="lp-more-link">
                <span>{LABELS[s]}</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalPages;