'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AtSign, ArrowUp } from 'lucide-react';

/* ============================================
   DATA
============================================ */

/* lucide has no "X" brand logo (its X is the close icon), so draw it */
function XLogo({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* Newer lucide-react versions removed brand icons, so these are inline SVGs */
function InstagramLogo({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinLogo({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubLogo({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const socials = [
  { label: 'Instagram', href: '#', icon: InstagramLogo },
  { label: 'LinkedIn', href: '#', icon: LinkedinLogo },
  { label: 'X', href: '#', icon: XLogo },
  { label: 'GitHub', href: '#', icon: GithubLogo },
  { label: 'Email', href: 'mailto:hello@dotix.io', icon: AtSign },
];

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Duddy', href: 'https://duddy.io' },
      { label: 'Omnibase', href: 'https://omnibase.in' },
      { label: 'RewardHub', href: 'https://rewardhub.apploft.in' },
      { label: 'Apploft', href: 'https://apploft.in' },
    ],
  },
  {
    heading: 'Service',
    links: [
      { label: 'SaaS', href: '/services/saas-development' },
      { label: 'Website', href: '/services/web-development' },
      { label: 'App', href: '/services/mobile-app-development' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Projects', href: '/projects' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'About', href: '/about' },
      { label: 'Career', href: '/career' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
];

const legalLinks = [
  { label: 'Privacy', href: '/legal/privacy-policy' },
  { label: 'Cookie', href: '/legal/cookie-policy' },
  { label: 'Terms', href: '/legal/terms-and-conditions' },
];

/* Skyline backdrop: [x, width, height], drawn bottom-aligned in a 1600 x 320 box */
const skylineBuildings = [
  [0, 60, 70], [60, 40, 110], [100, 50, 85], [150, 70, 140], [220, 40, 100],
  [255, 45, 120], [345, 55, 150], [400, 45, 95], [445, 60, 170], [505, 40, 120],
  [545, 70, 95], [615, 50, 150], [665, 40, 110], [705, 80, 190], [785, 45, 130],
  [830, 60, 210], [890, 50, 150], [940, 60, 100], [1000, 45, 170], [1045, 40, 120],
  [1085, 70, 230], [1155, 50, 140], [1205, 60, 100], [1265, 45, 180], [1310, 55, 120],
  [1365, 50, 150], [1415, 60, 100], [1475, 50, 130], [1525, 75, 90],
];

/* ============================================
   PIECES
============================================ */

function SkylineBackdrop() {
  return (
    <svg
      viewBox="0 0 1600 320"
      preserveAspectRatio="xMidYMax meet"
      fill="currentColor"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-text-primary/[0.05]"
    >
      {/* Tower */}
      <polygon points="312,320 319,110 321,110 328,320" />
      <ellipse cx="320" cy="128" rx="17" ry="8" />
      <ellipse cx="320" cy="100" rx="5" ry="3" />
      <rect x="319" y="30" width="2" height="75" />

      {/* Buildings */}
      {skylineBuildings.map(([x, width, height]) => (
        <rect key={x} x={x} y={320 - height} width={width} height={height} />
      ))}
    </svg>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

/* ============================================
   FOOTER
============================================ */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-secondary">

      <SkylineBackdrop />

      <div className="relative z-10 mx-auto max-w-[1540px] px-6 pb-8 pt-16 sm:px-8 lg:px-12">

        {/* Top: brand on the left, link columns on the right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* Brand + socials */}
          <div className="flex flex-col justify-between gap-10">

            <div>
              <Link
                href="/"
                aria-label="Dotix home"
                className="inline-flex"
              >
                <Image
                  src="/dotix-logo.svg"
                  alt="Dotix"
                  width={200}
                  height={30}
                  className="site-navbar__logo h-auto w-[150px] sm:w-[165px]"
                />
              </Link>

              <p className="mt-6 max-w-[320px] text-sm leading-relaxed text-text-secondary">
                We design and build SaaS, websites &amp; apps that help
                businesses grow.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-elevated text-text-primary transition-colors duration-200 hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>

          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-20">

            {columns.map((column) => (
              <div key={column.heading}>

                <h3 className="mb-6 text-sm font-semibold leading-6 text-text-primary">
                  {column.heading}
                </h3>

                <ul className="space-y-3">
                  {column.links.map((item) => {
                    const isExternal = item.href.startsWith('http');

                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="text-sm leading-6 text-text-secondary transition-colors duration-200 hover:text-text-primary"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-border/60 pt-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <p className="text-xs text-text-secondary">
              © 2023 - {year} Dotix Technologies Pvt. Ltd. In service since 2023.
              All Rights Reserved.
            </p>

            <div className="flex items-center gap-3 text-xs text-text-secondary">
              {legalLinks.map((item, index) => (
                <span key={item.label} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-[10px]">
                      •
                    </span>
                  )}
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-text-primary"
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

      <ScrollToTop />

    </footer>
  );
}