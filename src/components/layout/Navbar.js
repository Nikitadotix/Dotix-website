
'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ArrowUpRight,
  Layers3,
  FolderKanban,
  Code2,
  Newspaper,
  Building2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../common/Button.js';

const themeChangeEvent = 'dotix-theme-change';

function subscribeToTheme(onChange) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme || 'light';
}

function getServerThemeSnapshot() {
  return 'light';
}

const dropdownIcons = {
  Products: Layers3,
  Projects: FolderKanban,
  Services: Code2,
};

const navLinks = [
  {
    label: 'Products',
    hasDropdown: true,
    description: 'Explore our digital products',
    items: [
      {
        label: 'Duddy',
        description: 'AI-powered website creation',
        href: 'https://duddy.io',
      },
      {
        label: 'Omnibase',
        description: 'Explore Omnibase',
        href: 'https://omnibase.in',
      },
      {
        label: 'RewardHub',
        description: 'Rewards and engagement platform',
        href: 'https://rewardhub.apploft.in',
      },
      {
        label: 'Apploft',
        description: 'Explore Apploft',
        href: '#',
      },
      {
        label: 'Notix',
        description: 'Explore Notix',
        href: '#',
      },
    ],
  },
  {
    label: 'Projects',
    hasDropdown: true,
    description: 'Discover what we have built',
    items: [
      {
        label: 'All Projects',
        description: 'Explore our complete portfolio',
        href: '/projects',
      },
      {
        label: 'Featured Projects',
        description: 'A selection of our best work',
        href: '/projects',
      },
      {
        label: 'Case Studies',
        description: 'See the results behind our work',
        href: '/case-studies',
      },
    ],
  },
  {
    label: 'Services',
    hasDropdown: true,
    description: 'Technology built around your business',
    items: [
      {
        label: 'SaaS Development',
        description: 'Scalable software and platforms',
        href: '/services/saas-development',
      },
      {
        label: 'Website Development',
        description: 'High-performance business websites',
        href: '/services/web-development',
      },
      {
        label: 'Mobile App Development',
        description: 'Powerful mobile experiences',
        href: '/services/mobile-app-development',
      },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: Newspaper,
  },
  {
    label: 'About',
    href: '/about',
    icon: Building2,
  },
];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.045,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 7,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dotix-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.dataset.theme = savedTheme;
      window.dispatchEvent(new Event(themeChangeEvent));
    }
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('dotix-theme', nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  const toggleDropdown = (label) => {
    setOpenDropdown((current) => current === label ? null : label);
  };

  const renderThemeToggle = () => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'light'}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background-elevated/70 text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:rotate-12"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );

  return (
   <nav className="sticky top-0 z-50 w-full bg-background/75 backdrop-blur-2xl">
  <div className="w-full">
    <div className="relative flex h-20 w-full items-center justify-between pl-20 sm:pl-25 md:pl-27 lg:pl-29 xl:pl-38 2xl:pl-48 pr-7 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-24 2xl:pr-32">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Dotix home"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/dotix-logo.svg"
              alt="Dotix"
              width={200}
              height={30}
              priority
              className="site-navbar__logo h-auto w-[145px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex xl:items-center xl:gap-6 2xl:gap-8">

            {navLinks.map((link) => {
              const Icon = dropdownIcons[link.label];
              const isOpen = openDropdown === link.label;

              return (
                <div
                  key={link.label}
                  className="relative flex h-16 items-center"
                  onMouseEnter={() => {
                    if (link.hasDropdown) {
                      setOpenDropdown(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.hasDropdown) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  {link.hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => toggleDropdown(link.label)}
                      onFocus={() => setOpenDropdown(link.label)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`group flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                        isOpen
                          ? 'text-accent'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {link.label}

                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Animated Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && isOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-1/2 top-full z-[60] w-[340px] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-border/80 bg-background-card/95 p-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">

                          {/* Dropdown Header */}
                          <div className="mb-2 flex items-center gap-3 rounded-xl bg-background-elevated/70 px-3 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                              {Icon && <Icon className="h-5 w-5" />}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-text-primary">
                                {link.label}
                              </p>
                              <p className="mt-0.5 text-xs text-text-secondary">
                                {link.description}
                              </p>
                            </div>
                          </div>

                          {/* Dropdown Items */}
                          <div className="space-y-1">
                            {link.items.map((item) => (
                              <motion.div
                                key={item.label}
                                variants={itemVariants}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-background-elevated"
                                >
                                  <div>
                                    <p className="text-sm font-medium text-text-primary transition-colors group-hover:text-accent">
                                      {item.label}
                                    </p>

                                    <p className="mt-1 text-xs text-text-secondary">
                                      {item.description}
                                    </p>
                                  </div>

                                  <ArrowUpRight className="h-4 w-4 shrink-0 text-text-secondary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100" />
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Dropdown Footer */}
                          <div className="mt-2 border-t border-border/70 px-3 pt-3">
                            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary">
                              Built to move your business forward
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {renderThemeToggle()}

            <Button
              href="/contact"
              variant="primary"
              className="bg-white/85 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Build your product
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            {renderThemeToggle()}

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-background-elevated"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden xl:hidden"
            >
              <div className="mt-2 rounded-2xl border border-border/80 bg-background-card/95 p-4 shadow-xl backdrop-blur-2xl">

                <div className="space-y-2">
                  {navLinks.map((link) => {
                    const isOpen = openDropdown === link.label;

                    return (
                      <div key={link.label}>
                        {link.hasDropdown ? (
                          <>
                            <button
                              type="button"
                              onClick={() => toggleDropdown(link.label)}
                              aria-expanded={isOpen}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium text-text-primary transition-colors hover:bg-background-elevated"
                            >
                              {link.label}

                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  isOpen ? 'rotate-180 text-accent' : ''
                                }`}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-3 space-y-1 border-l border-accent/30 py-2 pl-3">
                                    {link.items.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => {
                                          setIsMenuOpen(false);
                                          setOpenDropdown(null);
                                        }}
                                        className="block rounded-lg px-3 py-3 transition-colors hover:bg-background-elevated"
                                      >
                                        <span className="block text-sm font-medium text-text-primary">
                                          {item.label}
                                        </span>
                                        <span className="mt-1 block text-xs text-text-secondary">
                                          {item.description}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block rounded-xl px-3 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-background-elevated"
                          >
                            {link.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <Button
                    href="/contact"
                    variant="primary"
                    className="w-full bg-white/85 px-4 py-3 text-sm font-semibold text-black hover:bg-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Build your product
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
