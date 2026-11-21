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
  ArrowRight,
  Layers3,
  FolderKanban,
  Code2,
  Newspaper,
  Building2,
  Database,
  Gift,
  Infinity,
  Play,
  Smartphone,
  LayoutDashboard,
  Monitor,
  Bug,
  ChartNoAxesCombined,
} from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../components/common/Button';

const themeChangeEvent = 'dotix-theme-change';

/* ============================================
   THEME
============================================ */

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

/* ============================================
   PROJECT ROUTES
============================================ */

const projectRoutes = {
  buzzer: '/case-studies/buzzr',
  buzzr: '/case-studies/buzzr',
  madjoy: '/case-studies/madjoy',
  inloopmedia: '/case-studies/inloopmedia',
  snackmedia: '/case-studies/snackmedia',
};

function getItemHref(item, type) {
  if (typeof item.href === 'string' && item.href.trim()) {
    return item.href;
  }

  if (type === 'projects') {
    const key = item.label
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '');

    return projectRoutes[key] || '/projects';
  }

  return '/';
}

/* ============================================
   NAVIGATION DATA
============================================ */

const navLinks = [
  {
    label: 'Products',
    hasDropdown: true,
    heading: "Products we've launched",
    type: 'products',
    icon: Layers3,

    promo: {
      eyebrow: 'Every product, live',
      title: "Try what we've designed, built and shipped.",
      link: 'View All Products',
      href: '/projects',
    },

    items: [
      {
        label: 'Duddy',
        description: 'AI enabled native app builder',
        href: '/case-studies/buzzr',
        logo: '/images/projects/duddy-icon.svg',
        mark: 'd.',
        markClass:
          'text-[25px] font-bold tracking-tighter text-accent dark:text-white/40',
      },
      {
        label: 'Omnibase',
        description: 'A complete backend-as-a-service',
        href: '/case-studies/omnibase',
        logo: '/images/projects/omnibase-icon.svg',
        icon: Database,
      },
      {
        label: 'RewardHub',
        description: 'Reward & monetization platform',
        href: '/case-studies/rewardhub',
        logo: '/images/projects/rewardhub-icon.svg',
        mark: 'R',
        markClass:
          'flex h-6 w-6 items-center justify-center rounded bg-accent text-sm font-bold text-white dark:bg-white/20',
      },
      {
        label: 'Apploft',
        description: 'Our premium app inventory',
        href: '/case-studies/apploft',
        logo: '/images/projects/apploft-icon.svg',
        mark: '△',
        markClass: 'text-2xl font-bold text-accent dark:text-white/50',
      },
      {
        label: 'Notix',
        description: 'Smart notification infrastructure',
        href: '/case-studies/notix',
        logo: '/images/projects/notix-icon.png',
        icon: Gift,
      },
    ],
  },

  {
    label: 'Projects',
    hasDropdown: true,
    heading: "Work we're proud of",
    type: 'projects',
    icon: FolderKanban,

    promo: {
      eyebrow: 'The full body of work',
      title: 'Work that makes an impact.',
      link: 'View All Projects',
      href: '/projects',
    },

    items: [
      {
        label: 'Buzzer',
        description: 'A platform for the Influencers',
        href: '/case-studies/buzzr',
        logo: '/images/projects/buzzr-icon.svg',
        icon: Bug,
      },
      {
        label: 'Madjoy',
        description: 'Buy gift cards & earn cashbacks',
        href: '/case-studies/madjoy',
        logo: '/images/projects/madjoy-icon.svg',
        mark: 'M',
        markClass: 'text-2xl font-black text-accent dark:text-white/65',
      },
      {
        label: 'Inloop Media',
        description: 'A digital marketing agency',
        href: '/case-studies/inloopmedia',
        logo: '/images/projects/inloop-icon.png',
        icon: Infinity,
      },
      {
        label: 'SnackMedia',
        description: 'An Influencer marketing agency',
        href: '/case-studies/snackmedia',
        logo: '/images/projects/snackmedia-icon.svg',
        icon: Play,
      },
    ],
  },

  {
    label: 'Services',
    hasDropdown: true,
    heading: 'What we do best',
    type: 'services',
    icon: Code2,

    promo: {
      eyebrow: 'From idea to launch - delivered.',
      title: 'Softwares that actually gets used.',
      link: 'View All Services',
      href: '/services',
    },

    items: [
      {
        label: 'SaaS & Dashboards',
        description:
          'Custom Dashboards, CRMs, Internal tools & SaaS products',
        href: '/services/saas-development',
        icon: LayoutDashboard,
      },
      {
        label: 'Websites & Landing pages',
        description: 'Static and Dynamic websites, blogs and forms',
        href: '/services/web-development',
        icon: Monitor,
      },
      {
        label: 'Android, iOS & Web Apps',
        description: 'Cross Platform, Android, iOS & Web Applications',
        href: '/services/mobile-app-development',
        icon: Smartphone,
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

/* ============================================
   ANIMATIONS
============================================ */

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 7,
    scale: 0.99,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.025,
    },
  },

  exit: {
    opacity: 0,
    y: 4,
    scale: 0.995,
    transition: {
      duration: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 4,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/* ============================================
   PROMOTIONAL VISUALS
============================================ */

function PromoArtwork({ type }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* PROJECTS */}
      {type === 'projects' && (
        <>
          <div className="absolute left-1/2 top-[37%] h-32 w-40 -translate-x-1/2 -translate-y-1/2 rotate-[-13deg]">

            <div className="absolute left-3 top-10 h-24 w-36 rotate-[13deg] rounded-md border border-accent/30 bg-accent/15 dark:border-white/10 dark:bg-white/[0.07]" />

            <div className="absolute left-0 top-4 h-24 w-36 rotate-[13deg] rounded-md border border-accent/45 bg-gradient-to-br from-accent/45 to-accent/10 shadow-xl dark:border-white/15 dark:from-white/30 dark:to-white/[0.03]">

              <div className="absolute left-4 top-4 h-1.5 w-10 rounded-full bg-accent/70 dark:bg-white/40" />
              <div className="absolute left-4 top-8 h-1 w-16 rounded-full bg-accent/45 dark:bg-white/20" />

              <div className="absolute right-4 top-4 h-7 w-7 rounded-full border-[4px] border-accent/60 dark:border-white/30" />

              <div className="absolute bottom-4 left-4 flex gap-1.5">
                <span className="h-4 w-8 rounded-sm bg-accent/45 dark:bg-white/20" />
                <span className="h-4 w-6 rounded-sm bg-accent/35 dark:bg-white/15" />
                <span className="h-4 w-4 rounded-sm bg-accent/45 dark:bg-white/20" />
              </div>

            </div>

            <div className="absolute -right-3 top-14 h-12 w-12 rotate-[13deg] rounded-md border border-accent/30 bg-accent/15 dark:border-white/10 dark:bg-white/[0.06]" />

          </div>

          <div className="absolute bottom-8 left-1/2 h-20 w-36 -translate-x-1/2 rounded-full bg-accent/25 blur-2xl dark:bg-white/[0.04]" />
        </>
      )}

      {/* SERVICES */}
      {type === 'services' && (
        <>
          <div className="absolute left-1/2 top-[34%] h-32 w-40 -translate-x-1/2 -translate-y-1/2">

            <div className="absolute inset-0 rounded-lg border border-accent/40 bg-background-card/80 shadow-2xl dark:border-white/15 dark:bg-white/[0.05]">

              <div className="flex h-6 items-center gap-1 border-b border-accent/25 px-2.5 dark:border-white/10">
                <span className="h-1 w-1 rounded-full bg-accent/60 dark:bg-white/30" />
                <span className="h-1 w-1 rounded-full bg-accent/60 dark:bg-white/30" />
                <span className="h-1 w-1 rounded-full bg-accent/60 dark:bg-white/30" />
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-2.5">

                <div className="col-span-2 space-y-1.5">
                  <div className="h-1.5 w-14 rounded-full bg-accent/60 dark:bg-white/30" />

                  <div className="flex h-10 items-end gap-1">
                    <span className="h-4 flex-1 rounded-t-sm bg-accent/30 dark:bg-white/15" />
                    <span className="h-7 flex-1 rounded-t-sm bg-accent/55 dark:bg-white/30" />
                    <span className="h-5 flex-1 rounded-t-sm bg-accent/40 dark:bg-white/20" />
                    <span className="h-9 flex-1 rounded-t-sm bg-accent/70 dark:bg-white/35" />
                  </div>
                </div>

                <div className="rounded border border-accent/25 bg-accent/10 p-1.5 dark:border-white/10 dark:bg-white/[0.06]">
                  <ChartNoAxesCombined className="h-7 w-7 text-accent/80 dark:text-white/40" />
                </div>

                <div className="col-span-3 h-2 rounded-sm bg-accent/20 dark:bg-white/[0.09]" />
                <div className="col-span-2 h-2 rounded-sm bg-accent/20 dark:bg-white/[0.09]" />

              </div>
            </div>

            <div className="absolute -left-7 top-14 flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-background-card dark:border-white/10 dark:bg-[#202020]">
              <Code2 className="h-4 w-4 text-accent dark:text-white/50" />
            </div>

            <div className="absolute -right-7 top-16 flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-background-card dark:border-white/10 dark:bg-[#202020]">
              <Database className="h-4 w-4 text-accent dark:text-white/50" />
            </div>

          </div>

          <div className="absolute left-1/2 top-[34%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/40 dark:border-white/15" />
        </>
      )}

      {/* PRODUCTS */}
      {type === 'products' && (
        <>
          <div className="absolute left-1/2 top-[36%] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center">

            <div className="absolute inset-0 rotate-45 rounded-xl border border-accent/45 bg-accent/15 dark:border-white/20 dark:bg-white/[0.08]" />

            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg border border-accent/45 bg-background-card/80 dark:border-white/20 dark:bg-white/[0.08]">
              <Layers3 className="h-10 w-10 text-accent dark:text-white/55" />
            </div>

            <div className="absolute -left-7 top-4 flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-background-card dark:border-white/15 dark:bg-[#202020]">
              <Code2 className="h-4 w-4 text-accent dark:text-white/50" />
            </div>

            <div className="absolute -right-7 bottom-3 flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-background-card dark:border-white/15 dark:bg-[#202020]">
              <Database className="h-4 w-4 text-accent dark:text-white/50" />
            </div>

          </div>

          <div className="absolute left-1/2 top-[36%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/40 dark:border-white/15" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-card/15 to-background-card" />

    </div>
  );
}

/* ============================================
   MEGA MENU
============================================ */

function MegaMenu({ link, onClose }) {
  const items = (link.items || []).filter(
    (item) =>
      item &&
      typeof item.label === 'string' &&
      item.label.trim()
  );

  const promoHref =
    typeof link.promo?.href === 'string' && link.promo.href.trim()
      ? link.promo.href
      : '/projects';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      className="absolute left-0 top-full z-[60] w-[min(520px,calc(100vw-24px))] pt-2"
    >

      <div className="overflow-hidden rounded-xl border border-border/80 bg-background-card/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">

        <div className="mb-2 border-b border-border/80 pb-2">
          <h3 className="text-[14px] font-semibold tracking-tight text-text-primary">
            {link.heading}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.08fr_0.92fr]">

          <div className="flex flex-col justify-between gap-0.5">

            {items.map((item) => {
              const ItemIcon = item.icon;
              const itemHref = getItemHref(item, link.type);

              return (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    href={itemHref}
                    target={
                      link.type === 'products' &&
                      itemHref.startsWith('http')
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      link.type === 'products' &&
                      itemHref.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    onClick={onClose}
                    className="group flex min-h-[46px] items-center gap-2.5 rounded-md px-1.5 py-1 transition-colors duration-200 hover:bg-background-elevated"
                  >

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                      ) : ItemIcon ? (
                        <ItemIcon
                          className="h-5 w-5 text-text-secondary/80"
                          strokeWidth={2}
                        />
                      ) : (
                        <span className={item.markClass || ''}>
                          {item.mark}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-[14px] font-semibold leading-tight tracking-tight text-text-primary transition-colors group-hover:text-accent">
                        {item.label}
                      </h4>

                      <p className="mt-0.5 max-w-[240px] text-[11px] leading-[1.35] text-text-secondary">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight className="h-3 w-3 shrink-0 text-text-secondary opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100" />

                  </Link>
                </motion.div>
              );
            })}

          </div>

          <div className="relative flex min-h-[195px] flex-col justify-end overflow-hidden rounded-lg border border-border bg-background-elevated p-3">

            <PromoArtwork type={link.type} />

            <div className="relative z-10">
              <p className="mb-1.5 text-[11px] font-semibold text-text-primary">
                {link.promo?.eyebrow}
              </p>

              <h4 className="max-w-[200px] text-[16px] font-medium leading-snug tracking-tight text-text-primary">
                {link.promo?.title}
              </h4>

              <Link
                href={promoHref}
                onClick={onClose}
                className="mt-3 inline-flex items-center gap-2 text-[12px] font-medium text-accent transition-all duration-200 hover:gap-3"
              >
                {link.promo?.link}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   NAVBAR COMPONENT
============================================ */

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  /* Load saved theme */
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dotix-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.dataset.theme = savedTheme;
      window.dispatchEvent(new Event(themeChangeEvent));
    }
  }, []);

  /* Close menus with Escape */
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

  /* Close mobile menu when resizing to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Theme Toggle */
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('dotix-theme', nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  /* Dropdown Toggle */
  const toggleDropdown = (label) => {
    setOpenDropdown((current) =>
      current === label ? null : label
    );
  };

  /* Close Menus */
  const closeMenus = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  /* Theme Toggle Button */
  const renderThemeToggle = () => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'light'}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background-elevated/70 text-text-primary transition-all duration-300 hover:border-accent hover:text-accent"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <nav className="sticky top-0 z-[100] relative w-full bg-background/75 backdrop-blur-2xl">

      <div className="relative w-full">

        {/* =====================================
            DESKTOP NAVBAR
        ===================================== */}

        <div className="relative flex h-20 w-full items-center justify-between pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 xl:pl-20 xl:pr-20 2xl:pl-24 2xl:pr-24">

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
              className="site-navbar__logo h-auto w-[125px] sm:w-[145px]"
            />
          </Link>

          {/* Desktop Navigation */}
        <div className="hidden xl:flex xl:items-center xl:gap-4 2xl:gap-5">

            {navLinks.map((link) => {
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
                     className={`group flex items-center gap-2 rounded-full px-2.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isOpen
                          ? 'bg-background-elevated text-text-primary'
                          : 'text-text-secondary hover:bg-background-elevated hover:text-text-primary'
                      }`}
                    >
                      {link.label}

                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-text-primary' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={
                        typeof link.href === 'string'
                          ? link.href
                          : '/'
                      }
                      className={`text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary ${
  link.label === 'About' ? 'ml-4' : ''
}`}
                    >
                      {link.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {link.hasDropdown && isOpen && (
                      <MegaMenu
                        link={link}
                        onClose={closeMenus}
                      />
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
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setOpenDropdown(null);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-background-elevated"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
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

        {/* =====================================
            MOBILE MENU OVERLAY
            Absolute positioning prevents
            page content from being pushed down.
        ===================================== */}

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="absolute left-0 right-0 top-full z-[110] w-full px-3 sm:px-4 xl:hidden"
            >

              <div className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border/80 bg-background-card/95 p-3.5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-4">

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

                                    {(link.items || [])
                                      .filter(
                                        (item) =>
                                          item &&
                                          typeof item.label === 'string'
                                      )
                                      .map((item) => {
                                        const itemHref = getItemHref(
                                          item,
                                          link.type
                                        );

                                        const ItemIcon = item.icon;

                                        return (
                                          <Link
                                            key={item.label}
                                            href={itemHref}
                                            target={
                                              link.type === 'products' &&
                                              itemHref.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                            }
                                            rel={
                                              link.type === 'products' &&
                                              itemHref.startsWith('http')
                                                ? 'noopener noreferrer'
                                                : undefined
                                            }
                                            onClick={closeMenus}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-background-elevated"
                                          >

                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center">

                                              {item.logo ? (
                                                <Image
                                                  src={item.logo}
                                                  alt=""
                                                  width={24}
                                                  height={24}
                                                  className="h-6 w-6 object-contain"
                                                />
                                              ) : ItemIcon ? (
                                                <ItemIcon className="h-4 w-4 text-text-secondary" />
                                              ) : (
                                                <span className={item.markClass || ''}>
                                                  {item.mark}
                                                </span>
                                              )}

                                            </span>

                                            <span className="min-w-0">
                                              <span className="block text-xs font-medium text-text-primary">
                                                {item.label}
                                              </span>

                                              <span className="mt-0.5 block text-[10px] text-text-secondary">
                                                {item.description}
                                              </span>
                                            </span>

                                          </Link>
                                        );
                                      })}

                                    <Link
                                      href={
                                        typeof link.promo?.href === 'string'
                                          ? link.promo.href
                                          : '/projects'
                                      }
                                      onClick={closeMenus}
                                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-accent"
                                    >
                                      {link.promo?.link}
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>

                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={
                              typeof link.href === 'string'
                                ? link.href
                                : '/'
                            }
                            onClick={closeMenus}
                            className="block rounded-xl px-3 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-background-elevated"
                          >
                            {link.label}
                          </Link>
                        )}

                      </div>
                    );
                  })}

                </div>

                {/* Mobile CTA */}
                <div className="mt-3 border-t border-border pt-3">
                  <Button
                    href="/contact"
                    variant="primary"
                    className="w-full bg-white/85 px-4 py-2.5 text-sm font-semibold text-black hover:bg-white"
                    onClick={closeMenus}
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