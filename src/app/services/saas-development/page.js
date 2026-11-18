import Link from 'next/link';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'SaaS Development Company | SaaS Platforms, MVPs & Custom Software | Dotix',
  description:
    'Dotix designs and builds SaaS platforms, MVPs, internal tools and CRMs. We run our own products too, so we build with launch, scale and running costs in mind.',
};

const layers = [
  'Database',
  'APIs & logic',
  'Authentication',
  'Payments',
  'Interface',
];

const proof = [
  'Our own products are live today',
  'You own the code and the data',
  'A working build every week or two',
];

const solutions = [
  {
    no: '01',
    title: 'SaaS platforms',
    description:
      'Multi-user products with accounts, roles, subscriptions and the backend to carry them. Built so adding the hundredth customer is no harder than adding the first.',
    tags: 'Multi-tenancy · Authentication · Billing',
  },
  {
    no: '02',
    title: 'MVP development',
    description:
      'The smallest version of your idea that real people can use. We help you decide what to leave out, ship quickly and learn from actual usage before you invest further.',
    tags: 'Product strategy · Prototyping · Development',
  },
  {
    no: '03',
    title: 'Admin panels and internal tools',
    description:
      'Replace spreadsheets, scattered tools and manual follow-ups with one system your team actually wants to open every morning.',
    tags: 'Internal tools · Reporting · Automation',
  },
  {
    no: '04',
    title: 'Custom CRMs',
    description:
      'Leads, customers and pipelines managed the way your sales process really works, not the way a generic tool assumes it does.',
    tags: 'Lead management · Workflows · Reporting',
  },
];

const lifecycle = [
  {
    title: 'Sign up',
    description: 'Short onboarding with email or social login, so people reach the product fast.',
  },
  {
    title: 'Free trial',
    description: 'Trial periods and limits that let users see the value before they pay.',
  },
  {
    title: 'Subscriptions',
    description: 'Plans, upgrades, downgrades and coupons without manual work on your side.',
  },
  {
    title: 'Billing',
    description: 'Invoices, receipts, tax details and failed-payment handling.',
  },
  {
    title: 'Renewal',
    description: 'Automatic renewals, reminders and clean cancellations.',
  },
];

const products = [
  {
    name: 'Omnibase',
    type: 'BACKEND AS A SERVICE',
    description:
      'Database, authentication, storage and payouts brought together on one backend.',
    url: 'https://omnibase.in/',
    image: '/images/products/omnibase-home.png',
    imageAlt: 'Omnibase backend platform',
  },
  {
    name: 'Duddy',
    type: 'AI APP BUILDER',
    description:
      'An AI-enabled builder that creates native Android, iOS and web applications.',
    url: 'https://duddy.io/',
    image: '/images/products/duddy-home.png',
    imageAlt: 'Duddy AI app builder',
  },
  {
    name: 'RewardHub',
    type: 'PERFORMANCE MARKETING',
    description:
      'A platform connecting advertisers, publishers and real users through campaigns.',
    url: 'https://rewardhub.apploft.in/',
    image: '/images/products/rewardhub-home.png',
    imageAlt: 'RewardHub marketing platform',
  },
  {
    name: 'Notix',
    type: 'NOTIFICATION INFRASTRUCTURE',
    description:
      'A centralized notification service and API for multiple communication channels.',
    url: 'https://notix.in/',
    image: '/images/products/notix-home.png',
    imageAlt: 'Notix notification platform',
  },
  {
    name: 'Buzzr',
    type: 'INFLUENCER MARKETING',
    description:
      'A connected platform for influencer campaigns, mobile apps and live tracking.',
    url: 'https://buzzr.media/',
    image: '/images/products/buzzr-home.png',
    imageAlt: 'Buzzr influencer marketing platform',
  },
];

const stages = [
  {
    no: '01',
    title: 'Understand',
    description:
      'We talk to you about the business, the users and the problem. You get a clear scope, a rough timeline and an honest view of what is worth building first.',
    note: 'Discovery · Scope · Roadmap',
  },
  {
    no: '02',
    title: 'Plan & design',
    description:
      'User flows, screens and technical architecture are agreed before heavy development starts, so surprises show up on paper instead of in code.',
    note: 'User flows · UI/UX · Architecture',
  },
  {
    no: '03',
    title: 'Build',
    description:
      'We work in short cycles and share a working version regularly. You see real progress, give feedback early and steer as we go.',
    note: 'Development · Testing · Review',
  },
  {
    no: '04',
    title: 'Launch & support',
    description:
      'We deploy, hand over documentation and stay available for fixes and the next round of improvements.',
    note: 'Deployment · Handover · Support',
  },
];

const faqs = [
  {
    q: 'What is the difference between SaaS, an MVP and a dashboard?',
    a: 'SaaS is software customers use as a product, usually through a subscription. An MVP is the smallest useful version of a product, built to test an idea with real users. A dashboard is a screen or set of screens for monitoring and managing operations. One product can include all three.',
  },
  {
    q: 'How long does it take to build an MVP?',
    a: 'It depends on scope, but a focused MVP usually takes somewhere between 6 and 12 weeks. We agree the feature list and milestones up front so you know what to expect before development begins.',
  },
  {
    q: 'How much will it cost?',
    a: 'Cost follows scope, so we do not quote a number before understanding the product. After a short discovery conversation we share an estimate with clear phases, so you can start small and extend later if it makes sense.',
  },
  {
    q: 'Can you work on an existing product?',
    a: 'Yes. We can review your current codebase, fix problems, improve its structure and keep building from there, focusing on performance, usability and maintainability.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'We choose the stack to fit the product, team and budget rather than the other way round. Our own platforms run on a mix of Next.js, React, Node.js and Go, and we are comfortable working with what you already have.',
  },
  {
    q: 'Will I be able to track development progress?',
    a: 'Yes. You get regular updates and working versions to try, so you can review features, give feedback and stay involved throughout.',
  },
  {
    q: 'Who owns the source code?',
    a: 'You do. The code and data belong to you, and we can work in repositories and cloud accounts that stay under your control.',
  },
  {
    q: 'Do you support the product after launch?',
    a: 'Yes. We can continue with fixes, monitoring, updates and new features after launch, either as ongoing work or whenever you need us.',
  },
];

function Eyebrow({ children }) {
  return <p className="saas-eyebrow">{children}</p>;
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`saas-heading saas-heading-${align}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function SaaSDevelopmentPage() {
  return (
    <main className={`saas-page ${montserrat.className}`}>
      <style>{`
        .saas-page {
          --accent: var(--color-accent, #e9823b);
          --bg: var(--background-primary, #ffffff);
          --section: var(--background-secondary, #f7f7f7);
          --panel: var(--background-card, #ffffff);
          --border: var(--border, rgba(0,0,0,.10));
          --text: var(--text-primary, #171717);
          --secondary: var(--text-secondary, #626262);
          --muted: var(--text-muted, #858585);

          background: var(--bg);
          color: var(--text);
          overflow: clip;
          font-size: 14px;
        }

        .dark .saas-page {
          --accent: var(--color-accent, #ed9658);
          --bg: var(--background-primary, #080a12);
          --section: var(--background-secondary, #0d111c);
          --panel: var(--background-card, #111522);
          --border: var(--border, rgba(255,255,255,.10));
          --text: var(--text-primary, #f5f5f5);
          --secondary: var(--text-secondary, #b0b6c5);
          --muted: var(--text-muted, #9299aa);
        }

        .saas-page * {
          box-sizing: border-box;
        }

        .saas-wrap {
          width: min(1080px, calc(100% - 48px));
          margin: 0 auto;
        }

        .saas-section {
          padding: 88px 0;
        }

        .saas-page h1,
        .saas-page h2,
        .saas-page h3 {
          color: var(--text);
        }

        .saas-page p {
          color: var(--secondary);
        }

        .saas-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 18px;
          color: var(--accent) !important;
          font-family: inherit;
          font-size: 10px;
          font-weight: 650;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .saas-eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--accent);
        }

        .saas-heading {
          max-width: 600px;
          margin-bottom: 44px;
        }

        .saas-heading h2 {
          margin: 0;
          font-size: clamp(24px, 2.8vw, 34px);
          line-height: 1.18;
          letter-spacing: -.045em;
          font-weight: 720;
        }

        .saas-heading > p:last-child {
          max-width: 520px;
          margin-top: 16px;
          font-size: 14px;
          line-height: 1.85;
        }

        .saas-heading-center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .saas-heading-center > p:last-child {
          margin-left: auto;
          margin-right: auto;
        }

        .saas-accent {
          color: var(--accent);
        }

        /* BUTTONS */

        .saas-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 30px;
        }

        .saas-btn {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 650;
          text-decoration: none;
          transition: background .25s ease, color .25s ease,
            border-color .25s ease, transform .25s ease,
            box-shadow .25s ease;
        }

        .saas-btn-primary {
          background: var(--accent);
          color: #fff;
          border: 1px solid var(--accent);
        }

        .saas-btn-primary:hover {
          transform: translateY(-2px);
          background: #d97231;
          border-color: #d97231;
          box-shadow: 0 8px 22px rgba(217,114,49,.18);
        }

        .saas-btn-quiet {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }

        .saas-btn-quiet:hover {
          background: var(--section);
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        /* HERO */

        .saas-hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 560px;
          padding: 88px 0 72px;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .saas-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(var(--border) 1px, transparent 1.4px);
          background-size: 30px 30px;
          -webkit-mask-image: radial-gradient(ellipse at 70% 50%, #000 0%, transparent 70%);
          mask-image: radial-gradient(ellipse at 70% 50%, #000 0%, transparent 70%);
        }

        .saas-hero-inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.02fr .98fr;
          align-items: center;
          gap: 48px;
        }

        .saas-hero-copy {
          max-width: 630px;
        }

        .saas-hero-copy > * {
          animation: saas-appear .85s cubic-bezier(.2,.7,.2,1) both;
        }

        .saas-hero-copy > *:nth-child(1) { animation-delay: .05s; }
        .saas-hero-copy > *:nth-child(2) { animation-delay: .15s; }
        .saas-hero-copy > *:nth-child(3) { animation-delay: .28s; }
        .saas-hero-copy > *:nth-child(4) { animation-delay: .4s; }
        .saas-hero-copy > *:nth-child(5) { animation-delay: .52s; }

        .saas-hero h1 {
          margin: 0;
          font-size: clamp(28px, 3.3vw, 42px);
          line-height: 1.05;
          letter-spacing: -.06em;
          font-weight: 750;
        }

        .saas-hero-lead {
          max-width: 480px;
          margin-top: 22px;
          font-size: 15px;
          line-height: 1.9;
        }

        .saas-proof {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin: 30px 0 0;
          padding: 0;
          list-style: none;
          color: var(--secondary);
          font-size: 14px;
        }

        .saas-proof li {
          position: relative;
          padding-left: 18px;
        }

        .saas-proof li::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          background: var(--accent);
          transform: rotate(45deg);
        }

        /* HERO ANIMATION: layers of a product assembling */

        .saas-scene {
          --size: 200px;
          --gap: 38px;
          position: relative;
          height: 370px;
        }

        .saas-scene-glow {
          position: absolute;
          left: 50%;
          top: 52%;
          width: 300px;
          height: 300px;
          margin: -150px 0 0 -150px;
          border-radius: 50%;
          background: var(--accent);
          opacity: .12;
          filter: blur(80px);
          animation: saas-breathe 8s ease-in-out infinite;
        }

        .saas-scene-shadow {
          position: absolute;
          left: 50%;
          bottom: 6%;
          width: 62%;
          height: 44px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(0,0,0,.32), transparent 70%);
          filter: blur(12px);
          animation: saas-shadow 8s ease-in-out infinite;
        }

        .saas-float {
          position: absolute;
          inset: 0;
          perspective: 1500px;
          animation: saas-float 8s ease-in-out infinite;
        }

        .saas-stack {
          position: absolute;
          left: 50%;
          top: 60%;
          width: var(--size);
          height: var(--size);
          margin: calc(var(--size) / -2) 0 0 calc(var(--size) / -2);
          transform-style: preserve-3d;
          transform: rotateX(58deg) rotateZ(-38deg);
        }

        .saas-plate {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          border: 1px solid color-mix(in srgb, var(--accent) 26%, var(--border));
          background: color-mix(in srgb, var(--panel) 74%, transparent);
          transform: translateZ(calc(var(--i) * var(--gap)));
          animation: saas-plate-in 1.1s cubic-bezier(.2,.8,.2,1) both;
          animation-delay: calc(var(--i) * .16s + .25s);
        }

        .saas-plate::before {
          content: '';
          position: absolute;
          inset: 14px;
          border-radius: 9px;
          background-image: radial-gradient(var(--border) 1px, transparent 1.5px);
          background-size: 18px 18px;
        }

        .saas-plate::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid var(--accent);
          opacity: 0;
          animation: saas-plate-pulse 5s ease-in-out infinite;
          animation-delay: calc(var(--i) * .6s + 2s);
        }

        .saas-plate span {
          position: absolute;
          left: 18px;
          bottom: 14px;
          z-index: 1;
          color: var(--secondary);
          font-family: inherit;
          font-size: 10px;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .saas-plate:last-child {
          border-color: var(--accent);
          background: color-mix(in srgb, var(--accent) 14%, var(--panel));
        }

        .saas-plate:last-child span {
          color: var(--accent);
        }

        /* SOLUTIONS */

        .saas-solutions {
          background: var(--section);
          border-bottom: 1px solid var(--border);
        }

        .saas-solution-list {
          border-top: 1px solid var(--border);
        }

        .saas-solution {
          position: relative;
          display: grid;
          grid-template-columns: 55px 1fr 230px;
          align-items: center;
          gap: 25px;
          padding: 29px 8px;
          border-bottom: 1px solid var(--border);
          transition: padding .3s ease, background .3s ease;
        }

        .saas-solution::before {
          content: '';
          position: absolute;
          left: 0;
          top: 22%;
          bottom: 22%;
          width: 2px;
          border-radius: 4px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform .3s ease;
        }

        .saas-solution:hover {
          padding-left: 18px;
          padding-right: 17px;
          background: color-mix(in srgb, var(--accent) 3%, transparent);
        }

        .saas-solution:hover::before {
          transform: scaleY(1);
        }

        .saas-solution-no {
          color: var(--muted);
          font-size: 11px;
          transition: color .25s ease;
        }

        .saas-solution:hover .saas-solution-no {
          color: var(--accent);
        }

        .saas-solution h3 {
          margin: 0;
          font-size: 19px;
          letter-spacing: -.03em;
          transition: color .25s ease;
        }

        .saas-solution:hover h3 {
          color: var(--accent);
        }

        .saas-solution p {
          max-width: 540px;
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.75;
        }

        .saas-solution small {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
          text-align: right;
        }

        /* LIFECYCLE */

        .saas-lifecycle {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          --cycle: 7.5s;
        }

        .saas-lifecycle-item {
          position: relative;
          padding: 25px 18px 27px 0;
          transition: transform .3s ease;
        }

        .saas-lifecycle-item:hover {
          transform: translateY(-5px);
        }

        .saas-lifecycle-item:not(:last-child) {
          border-right: 1px solid var(--border);
          margin-right: 18px;
        }

        .saas-lifecycle-no {
          color: var(--accent);
          font-size: 10px;
          font-weight: 650;
        }

        .saas-lifecycle-item h3 {
          margin: 18px 0 8px;
          font-size: 15px;
          letter-spacing: -.03em;
        }

        .saas-lifecycle-item p {
          margin: 0;
          font-size: 13px;
          line-height: 1.75;
        }

        /* PRODUCTS: top row of three cards, bottom row of two side-by-side cards */

        .saas-products-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 22px;
        }

        .saas-product {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--panel);
          color: inherit;
          text-decoration: none;
          transition: transform .35s ease, border-color .3s ease;
        }

        .saas-product:nth-child(4),
        .saas-product:nth-child(5) {
          grid-column: span 3;
          flex-direction: row;
        }

        .saas-product:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
        }

        .saas-product-preview {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          background: var(--section);
        }

        .saas-product:nth-child(4) .saas-product-preview,
        .saas-product:nth-child(5) .saas-product-preview {
          flex: 0 0 42%;
          aspect-ratio: auto;
          min-height: 100%;
          border-bottom: 0;
          border-right: 1px solid var(--border);
        }

        .saas-product-preview img {
          object-fit: cover;
          object-position: top center;
          transition: transform .6s cubic-bezier(.2,.7,.2,1);
        }

        .saas-product:hover .saas-product-preview img {
          transform: scale(1.04);
        }

        .saas-product-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          padding: 22px 22px 20px;
        }

        .saas-product-type {
          margin-bottom: 12px;
          color: var(--accent);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .12em;
        }

        .saas-product h3 {
          margin: 0 0 10px;
          font-size: 18px;
          line-height: 1.3;
          letter-spacing: -.03em;
        }

        .saas-product p {
          margin: 0 0 22px;
          font-size: 13px;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .saas-product-bottom {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          color: var(--text);
          font-size: 12px;
          font-weight: 650;
          transition: color .2s ease;
        }

        .saas-product-bottom span {
          display: inline-block;
          transition: transform .25s ease;
        }

        .saas-product:hover .saas-product-bottom {
          color: var(--accent);
        }

        .saas-product:hover .saas-product-bottom span {
          transform: translate(2px, -2px);
        }

        /* EXPERIENCE */

        .saas-experience {
          background: var(--section);
          border-block: 1px solid var(--border);
        }

        .saas-experience-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
        }

        .saas-experience-copy h2 {
          margin: 0;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.12;
          letter-spacing: -.055em;
        }

        .saas-experience-copy > p:last-child {
          max-width: 440px;
          margin-top: 18px;
          font-size: 14px;
          line-height: 1.9;
        }

        .saas-experience-panel {
          padding: 28px;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--panel);
          transition: transform .35s ease, border-color .35s ease;
        }

        .saas-experience-panel:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
        }

        .saas-experience-panel h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -.04em;
        }

        .saas-experience-panel > p {
          margin-top: 14px;
          font-size: 13px;
          line-height: 1.8;
        }

        .saas-experience-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 26px;
        }

        .saas-experience-comparison div {
          padding: 17px;
          background: var(--section);
          border-radius: 9px;
          transition: background .25s ease;
        }

        .saas-experience-comparison div:hover {
          background: color-mix(in srgb, var(--accent) 8%, var(--section));
        }

        .saas-experience-comparison strong {
          display: block;
          font-size: 14px;
          color: var(--text);
        }

        .saas-experience-comparison span {
          display: block;
          margin-top: 7px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
        }

        /* PROCESS */

        .saas-process-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          --cycle: 6s;
        }

        .saas-process-grid::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border);
        }

        .saas-stage {
          position: relative;
          padding: 24px 22px 0 0;
        }

        .saas-stage:not(:last-child) {
          margin-right: 22px;
          border-right: 1px solid var(--border);
        }

        .saas-stage-no {
          color: var(--accent);
          font-size: 11px;
          font-weight: 650;
        }

        .saas-stage h3 {
          margin: 18px 0 12px;
          font-size: 17px;
          letter-spacing: -.04em;
          transition: color .25s ease;
        }

        .saas-stage:hover h3 {
          color: var(--accent);
        }

        .saas-stage p {
          min-height: 120px;
          margin: 0;
          font-size: 13px;
          line-height: 1.8;
        }

        .saas-stage small {
          display: block;
          margin-top: 18px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
        }

        /* FAQ */

        .saas-faq {
          background: var(--section);
          border-top: 1px solid var(--border);
        }

        .saas-faq-layout {
          display: grid;
          grid-template-columns: .75fr 1.25fr;
          gap: 70px;
        }

        .saas-faq-title {
          margin: 0;
          font-size: clamp(24px, 2.8vw, 34px);
          line-height: 1.13;
          letter-spacing: -.05em;
        }

        .saas-faq-intro {
          margin-top: 17px;
          font-size: 14px;
          line-height: 1.8;
        }

        .saas-faq-list {
          border-top: 1px solid var(--border);
        }

        .saas-faq details {
          border-bottom: 1px solid var(--border);
        }

        .saas-faq summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 19px 0;
          color: var(--text);
          font-size: 14px;
          font-weight: 650;
          cursor: pointer;
          list-style: none;
        }

        .saas-faq summary::-webkit-details-marker {
          display: none;
        }

        .saas-faq summary:after {
          content: '+';
          color: var(--accent);
          font-size: 21px;
          font-weight: 400;
          transition: transform .25s ease;
        }

        .saas-faq details[open] summary:after {
          transform: rotate(45deg);
        }

        .saas-faq details p {
          max-width: 620px;
          margin: 0 30px 20px 0;
          font-size: 13px;
          line-height: 1.8;
          animation: saas-faq-reveal .3s ease both;
        }

        /* CTA */

        .saas-cta {
          padding: 80px 0;
        }

        .saas-cta-panel {
          position: relative;
          overflow: hidden;
          padding: clamp(32px, 5vw, 60px);
          border: 1px solid var(--border);
          border-radius: 17px;
          background: var(--section);
        }

        .saas-cta-panel::after {
          content: '';
          position: absolute;
          top: -110px;
          right: -110px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: var(--accent);
          opacity: .07;
          filter: blur(55px);
          pointer-events: none;
          transition: opacity .4s ease, transform .5s ease;
        }

        .saas-cta-panel:hover::after {
          opacity: .12;
          transform: scale(1.2);
        }

        .saas-cta-panel h2 {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin: 0;
          font-size: clamp(26px, 3.2vw, 38px);
          line-height: 1.15;
          letter-spacing: -.055em;
        }

        .saas-cta-panel > p {
          position: relative;
          z-index: 1;
          max-width: 480px;
          margin: 18px 0 0;
          font-size: 14px;
          line-height: 1.8;
        }

        .saas-cta-panel .saas-actions {
          position: relative;
          z-index: 1;
        }

        /* CONNECTED STEPS: a light travels along the line and lights each point */

        .saas-lifecycle,
        .saas-process-grid {
          --step: 1.5s;
        }

        .saas-process-grid::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 0;
          width: 9px;
          height: 9px;
          margin-left: -4.5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent),
            0 0 18px var(--accent);
          pointer-events: none;
          animation: saas-travel var(--cycle) linear infinite;
        }

        .saas-stage::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 0;
          z-index: 1;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--muted);
          animation: saas-node var(--cycle) ease-out infinite;
          animation-delay: calc(var(--n) * var(--step));
        }

        /* LIFECYCLE: each point fills in turn, top bar and title light up */

        .saas-lifecycle-item::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          animation: saas-fill var(--cycle) ease-in-out infinite;
          animation-delay: calc(var(--n) * var(--step));
        }

        .saas-lifecycle-item h3 {
          animation: saas-lit var(--cycle) ease-in-out infinite;
          animation-delay: calc(var(--n) * var(--step));
        }

        /* ANIMATIONS */

        @keyframes saas-travel {
          0% {
            left: 0;
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          97% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes saas-node {
          0% {
            background: var(--accent);
            border-color: var(--accent);
            transform: scale(1.5);
            box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 22%, transparent);
          }
          20% {
            background: var(--accent);
            border-color: var(--accent);
            transform: scale(1.2);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent);
          }
          35%, 100% {
            background: var(--bg);
            border-color: var(--muted);
            transform: scale(1);
            box-shadow: 0 0 0 0 transparent;
          }
        }

        @keyframes saas-fill {
          0% {
            transform: scaleX(0);
            opacity: 1;
          }
          14%, 50% {
            transform: scaleX(1);
            opacity: 1;
          }
          66%, 100% {
            transform: scaleX(1);
            opacity: 0;
          }
        }

        @keyframes saas-lit {
          0%, 66%, 100% {
            color: var(--text);
          }
          10%, 46% {
            color: var(--accent);
          }
        }

        @keyframes saas-appear {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes saas-plate-in {
          from {
            opacity: 0;
            transform: translateZ(calc(var(--i) * var(--gap) + 260px));
          }
        }

        @keyframes saas-plate-pulse {
          0%, 100% {
            opacity: 0;
            box-shadow: 0 0 0 0 transparent;
          }
          12% {
            opacity: 1;
            box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 40%, transparent);
          }
          30% {
            opacity: 0;
            box-shadow: 0 0 0 0 transparent;
          }
        }

        @keyframes saas-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes saas-shadow {
          0%, 100% {
            transform: translateX(-50%) scaleX(1);
            opacity: .9;
          }
          50% {
            transform: translateX(-50%) scaleX(.9);
            opacity: .6;
          }
        }

        @keyframes saas-breathe {
          0%, 100% {
            opacity: .1;
            transform: scale(1);
          }
          50% {
            opacity: .18;
            transform: scale(1.08);
          }
        }

        @keyframes saas-faq-reveal {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reveal on scroll (CSS only, where supported) */

        @supports (animation-timeline: view()) {
          .saas-heading,
          .saas-solution,
          .saas-lifecycle-item,
          .saas-product,
          .saas-stage,
          .saas-experience-panel,
          .saas-faq-list {
            animation: saas-appear linear both;
            animation-timeline: view();
            animation-range: entry 0% entry 30%;
          }
        }

        /* TABLET */

        @media(max-width: 900px) {
          .saas-section {
            padding: 80px 0;
          }

          .saas-hero-inner {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .saas-hero {
            min-height: auto;
          }

          .saas-hero-copy {
            max-width: 700px;
          }

          .saas-scene {
            max-width: 520px;
            width: 100%;
            margin: 0 auto;
            height: 400px;
          }

          .saas-solution {
            grid-template-columns: 45px 1fr;
          }

          .saas-solution small {
            grid-column: 2;
            text-align: left;
          }

          .saas-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }

          .saas-product,
          .saas-product:nth-child(4),
          .saas-product:nth-child(5) {
            grid-column: auto;
            flex-direction: column;
          }

          .saas-product:nth-child(5) {
            grid-column: 1 / -1;
          }

          .saas-product:nth-child(4) .saas-product-preview,
          .saas-product:nth-child(5) .saas-product-preview {
            flex: none;
            width: 100%;
            min-height: 0;
            aspect-ratio: 16 / 9;
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }

          .saas-product:nth-child(5) .saas-product-preview {
            aspect-ratio: 3 / 1;
          }

          .saas-experience-layout {
            gap: 35px;
          }

          .saas-faq-layout {
            gap: 45px;
          }

          .saas-lifecycle {
            grid-template-columns: repeat(3, 1fr);
          }

          .saas-lifecycle-item:nth-child(3) {
            border-right: none;
          }

          .saas-lifecycle,
          .saas-process-grid {
            border-top: 0;
          }

          .saas-process-grid::after,
          .saas-process-grid::before {
            display: none;
          }

          .saas-lifecycle-item,
          .saas-stage {
            border-top: 1px solid var(--border);
          }

          .saas-process-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 40px;
          }

          .saas-stage:nth-child(2) {
            border-right: 0;
            margin-right: 0;
          }

          .saas-stage p {
            min-height: 0;
          }
        }

        /* MOBILE */

        @media(max-width: 640px) {
          .saas-wrap {
            width: calc(100% - 36px);
          }

          .saas-section {
            padding: 65px 0;
          }

          .saas-hero {
            padding: 75px 0 40px;
          }

          .saas-hero h1 {
            font-size: clamp(27px, 7.5vw, 34px);
          }

          .saas-hero-lead {
            font-size: 14px;
          }

          .saas-actions {
            gap: 10px;
          }

          .saas-btn {
            min-height: 44px;
            padding: 0 18px;
            font-size: 12px;
          }

          .saas-scene {
            --size: 160px;
            --gap: 28px;
            height: 280px;
          }

          .saas-solution {
            grid-template-columns: 30px 1fr;
            gap: 10px;
            padding: 21px 0;
          }

          .saas-solution h3 {
            font-size: 16px;
          }

          .saas-solution small {
            grid-column: 2;
            text-align: left;
            font-size: 11px;
          }

          .saas-solution p {
            font-size: 13px;
          }

          .saas-lifecycle {
            grid-template-columns: repeat(2, 1fr);
          }

          .saas-lifecycle-item {
            padding: 19px 12px 19px 0;
            margin-right: 12px;
          }

          .saas-lifecycle-item:not(:last-child) {
            margin-right: 12px;
          }

          .saas-lifecycle-item:nth-child(2),
          .saas-lifecycle-item:nth-child(4) {
            border-right: none;
          }

          .saas-lifecycle-item h3 {
            margin-top: 13px;
          }

          .saas-products-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .saas-product,
          .saas-product:nth-child(4),
          .saas-product:nth-child(5) {
            grid-column: auto;
          }

          .saas-product:nth-child(5) .saas-product-preview {
            aspect-ratio: 16 / 9;
          }

          .saas-product-info {
            padding: 20px;
          }

          .saas-experience-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .saas-experience-panel {
            padding: 23px;
          }

          .saas-process-grid {
            grid-template-columns: 1fr;
            gap: 27px;
          }

          .saas-stage {
            padding: 0 0 0 18px;
            border-top: 0;
            border-left: 1px solid var(--border);
          }

          .saas-stage::before {
            top: 3px;
            left: -5px;
          }

          .saas-stage:not(:last-child),
          .saas-stage:nth-child(2) {
            margin-right: 0;
            border-right: 0;
          }

          .saas-stage h3 {
            margin: 10px 0;
          }

          .saas-stage p {
            min-height: 0;
          }

          .saas-stage small {
            margin-top: 10px;
          }

          .saas-faq-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .saas-faq summary {
            font-size: 14px;
          }

          .saas-cta {
            padding: 60px 0;
          }

          .saas-cta-panel {
            padding: 28px 22px;
            border-radius: 13px;
          }

          .saas-cta-panel h2 {
            font-size: 26px;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .saas-page *,
          .saas-page *:before,
          .saas-page *:after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }

          .saas-process-grid::after {
            display: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="saas-hero">
        <div className="saas-wrap saas-hero-inner">
          <div className="saas-hero-copy">
            <Eyebrow>SaaS &amp; product engineering</Eyebrow>

            <h1>
              Software your business can{' '}
              <span className="saas-accent">run on.</span>
            </h1>

            <p className="saas-hero-lead">
              We design and build SaaS platforms, MVPs and internal
              tools. We also run products of our own, so we plan for what
              happens after launch: users, uptime and the cost of keeping
              it all running.
            </p>

            <div className="saas-actions">
              <Link href="/contact" className="saas-btn saas-btn-primary">
                Tell us about your product
              </Link>

              <Link href="#solutions" className="saas-btn saas-btn-quiet">
                See what we build
              </Link>
            </div>

            <ul className="saas-proof">
              {proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="saas-scene" aria-hidden="true">
            <div className="saas-scene-glow" />
            <div className="saas-scene-shadow" />
            <div className="saas-float">
              <div className="saas-stack">
                {layers.map((layer, i) => (
                  <div className="saas-plate" style={{ '--i': i }} key={layer}>
                    <span>{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      {/* <section className="saas-section saas-solutions" id="solutions">
        <div className="saas-wrap">
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Four things we build{' '}
                <span className="saas-accent">well.</span>
              </>
            }
            description="Most projects start as one of these, and plenty grow into two or three. Whichever you need, we build it around how your business really works."
          />

          <div className="saas-solution-list">
            {solutions.map((item) => (
              <article className="saas-solution" key={item.no}>
                <span className="saas-solution-no">{item.no}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <small>{item.tags}</small>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* PRODUCT LIFECYCLE */}
      <section className="saas-section">
        <div className="saas-wrap">
          <SectionHeading
            eyebrow="Beyond the screens"
            title={
              <>
                Billing, trials and renewals are{' '}
                <span className="saas-accent">part of the product.</span>
              </>
            }
            description="A SaaS product earns its money after the sign-up page. We build the whole customer journey, not just the interface."
          />

          <div className="saas-lifecycle">
            {lifecycle.map((item, i) => (
              <div className="saas-lifecycle-item" style={{ '--n': i }} key={item.title}>
                <span className="saas-lifecycle-no">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="saas-section saas-solutions" id="our-work">
        <div className="saas-wrap">
          <SectionHeading
            eyebrow="Built by Dotix"
            title={
              <>
                Products we've shipped{' '}
                <span className="saas-accent">and still run.</span>
              </>
            }
            description="These are our own platforms, live and in use. Running them taught us how to think about architecture, performance and cost long before a client asks."
          />

          <div className="saas-products-grid">
            {products.map((product) => (
              <a
                className="saas-product"
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                key={product.name}
              >
                <div className="saas-product-preview">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 900px) 50vw, 33vw"
                  />
                </div>

                <div className="saas-product-info">
                  <span className="saas-product-type">{product.type}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="saas-product-bottom">
                    Visit site <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="saas-section saas-experience">
        <div className="saas-wrap saas-experience-layout">
          <div className="saas-experience-copy">
            <Eyebrow>Why it matters</Eyebrow>

            <h2>
              We run what we build,{' '}
              <span className="saas-accent">so we plan for the long run.</span>
            </h2>

            <p>
              Shipping is the easy part. Keeping a product fast, secure and
              affordable once real users arrive is where most projects
              struggle. We deal with the same problems on our own platforms,
              and bring those lessons into yours.
            </p>
          </div>

          <div className="saas-experience-panel">
            <Eyebrow>An example from our own stack</Eyebrow>
            <h3>One foundation instead of five separate tools.</h3>

            <p>
              Omnibase combines database, authentication, storage and
              backend services in a single place. Our products share it,
              which means less duplicated work, fewer moving parts and
              faster launches.
            </p>

            <div className="saas-experience-comparison">
              <div>
                <strong>Separate systems</strong>
                <span>
                  More services to connect, secure and keep updated.
                </span>
              </div>

              <div>
                <strong>Shared foundation</strong>
                <span>
                  Core backend capabilities managed from one place.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="saas-section">
        <div className="saas-wrap">
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                How a project{' '}
                <span className="saas-accent">actually runs.</span>
              </>
            }
            description="A simple process with regular check-ins, so you always know where things stand and can change direction early if you need to."
          />

          <div className="saas-process-grid">
            {stages.map((stage, i) => (
              <article className="saas-stage" style={{ '--n': i }} key={stage.no}>
                <span className="saas-stage-no">
                  Step {stage.no}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <small>{stage.note}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="saas-section saas-faq">
        <div className="saas-wrap saas-faq-layout">
          <div>
            <Eyebrow>Good to know</Eyebrow>

            <h2 className="saas-faq-title">
              Questions before we{' '}
              <span className="saas-accent">start?</span>
            </h2>

            <p className="saas-faq-intro">
              Can't find what you're looking for, or still working out what
              to build? Send us a message and we'll talk it through.
            </p>

            <div className="saas-actions">
              <Link href="/contact" className="saas-btn saas-btn-primary">
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="saas-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="saas-cta">
        <div className="saas-wrap">
          <div className="saas-cta-panel">
            <Eyebrow>Start a project</Eyebrow>

            <h2>
              Got a product in mind?{' '}
              <span className="saas-accent">
                Tell us what you're building.
              </span>
            </h2>

            <p>
              An idea on a napkin, a rough prototype or a product that
              needs a rebuild: we're happy to look at it and tell you
              honestly how we would approach it.
            </p>

            <div className="saas-actions">
              <Link href="/contact" className="saas-btn saas-btn-primary">
                Start a conversation
              </Link>

              <Link href="/projects" className="saas-btn saas-btn-quiet">
                See our projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}