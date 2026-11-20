'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/common/Button.js';
import { FAQAccordion } from '../../../components/common/FAQAccordion.js';
import { SectionHeading as SharedSectionHeading } from '../../../components/common/SectionHeading.js';

/* NOTE: `export const metadata` cannot live in a 'use client' file.
   Put it in a sibling layout.js. document.title below is a fallback. */

/* ------------------------------------------------------------------ */
/* CONTENT                                                             */
/* ------------------------------------------------------------------ */

const steps = [
  { icon: 'pencil', title: 'Plan and design', time: 'Weeks 1–2', short: 'Goals, features and screens.' },
  { icon: 'code', title: 'Build and test', time: 'Weeks 3–10', short: 'Short sprints on real devices.' },
  { icon: 'rocket', title: 'Launch', time: 'Final weeks', short: 'Store release, closely watched.' },
  { icon: 'refresh', title: 'Support and grow', time: 'Ongoing', short: 'Fixes, updates and new features.' },
];

const faqs = [
  {
    question: 'Native or cross-platform: which is better?',
    answer:
      'Native gives you full platform features. React Native and Flutter share one codebase across iOS and Android. The right choice depends on your features, performance needs and budget.',
  },
  {
    question: 'Can you build for both iOS and Android?',
    answer: 'Yes, using React Native, Flutter or native code, whichever suits the product.',
  },
  {
    question: 'Can you develop an MVP?',
    answer: 'Yes. We pick the essential features and build a working MVP so you can test your idea early.',
  },
  {
    question: 'How long does app development take?',
    answer: 'A simple MVP takes about 4–8 weeks. A feature-rich app takes 12–20 weeks or more.',
  },
  {
    question: 'Do you handle app store submissions?',
    answer: 'Yes. We prepare the build, store assets and settings, and submit to Google Play and the App Store.',
  },
  {
    question: 'Can you improve an existing app?',
    answer: 'Yes. We fix bugs, speed it up, refresh the interface and add new features.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes. We offer ongoing fixes, compatibility updates and performance work.',
  },
];

const flow = [
  {
    title: 'Your users',
    caption: 'Where people use your product.',
    items: ['iOS app', 'Android app', 'Push notifications'],
  },
  {
    title: 'API layer',
    caption: 'A secure gateway to your data.',
    items: ['Authentication', 'REST / GraphQL API', 'Request validation'],
  },
  {
    title: 'Backend',
    caption: 'Logic and storage behind the scenes.',
    items: ['Business logic', 'Database', 'Admin dashboard'],
  },
  {
    title: 'Connected services',
    caption: 'Third-party tools where needed.',
    items: ['Payments', 'Maps and location', 'Analytics and email'],
  },
];

const platforms = [
  {
    key: 'web',
    tab: 'Web app',
    title: 'Web apps',
    text: 'Browser apps for your team and customers. Nothing to install.',
    points: ['React and Next.js', 'Dashboards and portals', 'Works on any device'],
  },
  {
    key: 'ios',
    tab: 'iOS app',
    title: 'iPhone and iPad apps',
    text: 'Apps that feel at home on Apple devices.',
    points: ['Swift or React Native', 'App Store submission', 'Push, Face ID, Apple Pay'],
  },
  {
    key: 'android',
    tab: 'Android app',
    title: 'Android apps',
    text: 'Apps built for the wide range of Android devices.',
    points: ['Kotlin or Flutter', 'Google Play release', 'Tested across screen sizes'],
  },
];

const planTypes = [
  { label: 'MVP', base: 4, desc: 'Core features, fast.' },
  { label: 'Customer app', base: 9, desc: 'Public app with accounts.' },
  { label: 'Operations app', base: 7, desc: 'Tools for your team.' },
  { label: 'Rebuild', base: 6, desc: 'Modernise an existing app.' },
];

const planFeatures = [
  { key: 'auth', label: 'User accounts', weeks: 1 },
  { key: 'pay', label: 'Payments', weeks: 2 },
  { key: 'push', label: 'Push notifications', weeks: 1 },
  { key: 'chat', label: 'Chat', weeks: 2 },
  { key: 'maps', label: 'Maps and location', weeks: 2 },
  { key: 'admin', label: 'Admin dashboard', weeks: 3 },
];

/* The four app cards.
   - `image`: portrait screenshot / mockup (about 346 x 521). Put files in
     /public (e.g. '/apps/buzzr.png'). Leave '' to show a placeholder.
   - `logo`: small square logo. Leave '' to show a placeholder.
   - Update the URLs if you have the exact links. */
const apps = [
  {
    name: 'Buzzr',
    url: 'https://buzzr.media',
    domain: 'buzzr.media',
    image: '/images/products/buzzr-mobile.png',
    logo: '/images/projects/buzzr-icon.svg',
    platforms: [['android', 'Android'], ['ios', 'iOS'], ['web', 'Web']],
  },
  {
    name: 'RewardHub',
    url: 'https://rewardhub.apploft.in',
    domain: 'rewardhub.apploft.in',
    image: '/images/products/rewardhub-mobile.png',
    logo: '/images/projects/rewardhub-icon.svg',
    platforms: [['web', 'Web']],
  },
  {
    name: 'Cash Lemon',
    url: 'https://apploft.in',
    domain: 'apploft.in',
    image: '/images/products/cash-lemon-mobile.png',
    logo: '/images/projects/apploft-icon.svg',
    platforms: [['android', 'Android']],
  },
  {
    name: 'Captcha Entry',
    url: 'https://apploft.in',
    domain: 'apploft.in',
    image: '/images/products/captcha-entry-mobile.png',
    logo: '/images/projects/apploft-icon.svg',
    platforms: [['android', 'Android']],
  },
];

/* Tech stack shown in the moving strip under the hero. Edit freely. */
const stack = [
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Next.js', 'React', 'Node.js',
  'TypeScript', 'Firebase', 'PostgreSQL', 'GraphQL', 'AWS', 'Figma', 'Stripe',
];

/* Hero diagram: sample rows shown inside the phone, and the services
   connected on the left and right. Edit freely. */
const heroRows = [
  { name: 'Maya Patel', meta: '#2043 · 3 items', status: 'Preparing', tone: 'warn', color: '#e8590c' },
  { name: 'Daniel Cruz', meta: '#2042 · 5 items', status: 'On the way', tone: 'info', color: '#1c7ed6' },
  { name: 'Aisha Khan', meta: '#2041 · 2 items', status: 'Delivered', tone: 'ok', color: '#2f9e44' },
];

const heroLeft = [
  { label: 'Authentication', sub: 'Sign in and sessions', y: 110 },
  { label: 'REST / GraphQL API', sub: 'Requests and validation', y: 300 },
  { label: 'Push notifications', sub: 'Real-time updates', y: 490 },
];

const heroRight = [
  { label: 'Database', sub: 'Orders and customers', y: 110 },
  { label: 'Payments', sub: 'Cards and wallets', y: 300 },
  { label: 'Analytics', sub: 'Reports and events', y: 490 },
];

/* connector paths: node edge to phone edge (stage is 840 x 680) */
const heroPaths = [
  'M170 134 C 215 134 215 220 262 220',
  'M170 324 C 215 324 215 340 252 340',
  'M170 514 C 215 514 215 460 262 460',
  'M670 134 C 625 134 625 220 578 220',
  'M670 324 C 625 324 625 340 588 340',
  'M670 514 C 625 514 625 460 578 460',
];

/* ------------------------------------------------------------------ */
/* SMALL HELPERS                                                       */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ma-reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHead({ label, title, intro }) {
  return (
    <Reveal className="ma-head">
      <SharedSectionHeading
        eyebrow={label}
        title={title}
        description={intro}
        spacingClassName="mb-0"
        descriptionClassName="ma-intro"
      />
    </Reveal>
  );
}

const ICONS = {
  pencil: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  rocket: 'M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 00-2.9-.1zM12 15l-3-3a22 22 0 012-4 12.9 12.9 0 0111-5c0 2.7-.8 7.5-5 11a22 22 0 01-4 2zM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0114.8-3.4L23 10M1 14l4.7 4.4A9 9 0 0020.5 15',
  check: 'M5 12l5 5L20 7',
};

function Ic({ n, s = 16, w = 1.8 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[n]} />
    </svg>
  );
}

/* Small Web / iOS / Android icons for the app cards */
function PlatIcon({ n }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      {n === 'web' && (
        <path d="M3 4h18v12H3zM8 20h8M12 16v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {n === 'ios' && (
        <path
          fill="currentColor"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        />
      )}
      {n === 'android' && (
        <path
          fill="currentColor"
          d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 003 0V19h2v3.5a1.5 1.5 0 003 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8A1.5 1.5 0 002 9.5v7a1.5 1.5 0 003 0v-7A1.5 1.5 0 003.5 8zm17 0A1.5 1.5 0 0019 9.5v7a1.5 1.5 0 003 0v-7A1.5 1.5 0 0020.5 8zM15.53 2.16l1.3-1.3a.5.5 0 00-.7-.7l-1.48 1.48A5.9 5.9 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.16a.5.5 0 00-.7.7l1.31 1.31A5.97 5.97 0 006 7h12a5.97 5.97 0 00-2.47-4.84z"
        />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* HERO DIAGRAM: one phone (web app in the mobile browser) connected   */
/* to the services behind it with animated dashed lines                */
/* ------------------------------------------------------------------ */

function HeroDiagram() {
  return (
    <div className="ma-stage hd">
      <svg className="hd-lines" viewBox="0 0 840 680" aria-hidden="true">
        {heroPaths.map((d, i) => (
          <path key={d} d={d} style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        {[...heroLeft.map((n) => [170, n.y + 24]), ...heroRight.map((n) => [670, n.y + 24])].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
        ))}
      </svg>

      {heroLeft.map((n) => (
        <div key={n.label} className="hd-node" style={{ left: 20, top: n.y }}>
          <b>{n.label}</b>
          <small>{n.sub}</small>
        </div>
      ))}
      {heroRight.map((n) => (
        <div key={n.label} className="hd-node" style={{ left: 670, top: n.y }}>
          <b>{n.label}</b>
          <small>{n.sub}</small>
        </div>
      ))}

      {/* left phone: reports */}
      <div className="hd-phone hd-phone-left">
        <div className="hd-screen">
          <span className="hd-island" />
          <div className="hd-status">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="hd-page hd-page-top">
            <div className="hd-head">
              <h4>Reports</h4>
            </div>
            <div className="hd-kpi">
              <small>Revenue this week</small>
              <strong>₹3.2L</strong>
              <em>+12% vs last week</em>
            </div>
            <div className="hd-bars">
              {[40, 62, 48, 80, 66, 92, 74].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="hd-stats">
              <div>
                <small>Orders</small>
                <strong>1,284</strong>
              </div>
              <div>
                <small>Avg. time</small>
                <strong>24 min</strong>
              </div>
            </div>
          </div>
          <span className="hd-bar" />
        </div>
      </div>

      {/* right phone: live tracking */}
      <div className="hd-phone hd-phone-right">
        <div className="hd-screen">
          <span className="hd-island" />
          <div className="hd-status">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="hd-map">
            <svg viewBox="0 0 240 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
              <path d="M-10 70 Q70 50 110 120 T250 150" fill="none" stroke="#dcdce4" strokeWidth="14" />
              <path d="M60 -10 Q90 100 70 170 T110 270" fill="none" stroke="#dcdce4" strokeWidth="10" />
              <path d="M40 210 Q90 170 120 130 T200 50" fill="none" stroke="#6c5ce7" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
              <circle cx="40" cy="210" r="6" fill="#15151f" />
              <circle cx="200" cy="50" r="8" fill="#6c5ce7" />
            </svg>
          </div>
          <div className="hd-sheet">
            <b>Daniel Cruz</b>
            <small>Arriving in 8 min</small>
            <div className="hd-progress">
              <i />
            </div>
          </div>
          <span className="hd-bar" />
        </div>
      </div>

      {/* middle phone: web app in the mobile browser */}
      <div className="hd-phone hd-phone-main">
        <div className="hd-screen">
          <span className="hd-island" />
          <div className="hd-status">
            <span>9:41</span>
            <span>5G</span>
          </div>

          <div className="hd-url">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            app.yourproduct.com
          </div>

          <div className="hd-page">
            <div className="hd-head">
              <h4>Orders</h4>
              <span>+ New</span>
            </div>

            <div className="hd-stats">
              <div>
                <small>Today</small>
                <strong>186</strong>
              </div>
              <div>
                <small>Revenue</small>
                <strong>₹58.4k</strong>
              </div>
            </div>

            <div className="hd-chart">
              <svg viewBox="0 0 220 70" width="100%" height="70" preserveAspectRatio="none">
                <path d="M0 54 C20 50 30 34 52 38 S86 58 110 32 S160 20 180 24 S210 8 220 6" fill="none" stroke="#6c5ce7" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>

            <div className="hd-list">
              {heroRows.map((r) => (
                <div key={r.name} className="hd-row">
                  <i style={{ background: r.color }}>{r.name.charAt(0)}</i>
                  <div>
                    <b>{r.name}</b>
                    <small>{r.meta}</small>
                  </div>
                  <em className={r.tone}>{r.status}</em>
                </div>
              ))}
            </div>
          </div>

          <span className="hd-bar" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PLATFORMS (text only)                                               */
/* ------------------------------------------------------------------ */

function Platforms() {
  return (
    <div className="ma-plat">
      {platforms.map((p, i) => (
        <Reveal key={p.key} delay={i * 100}>
          <div className="ma-plat-col">
            <div className="ma-step-line">
              <span />
            </div>
            <p className="ma-step-time">{p.tab}</p>
            <h3>{p.title}</h3>
            <p className="ma-body">{p.text}</p>
            <ul>
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FLOW + PLANNER                                                      */
/* ------------------------------------------------------------------ */

function FlowDiagram() {
  return (
    <div className="ma-flow">
      {flow.map((col, i) => (
        <Fragment key={col.title}>
          <Reveal delay={i * 140}>
            <div className="ma-flow-col">
              <p className="ma-flow-step">Layer {i + 1}</p>
              <h3>{col.title}</h3>
              <p className="ma-flow-cap">{col.caption}</p>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          {i < flow.length - 1 && (
            <span className="ma-conn" aria-hidden="true" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* Planner is kept here but its section is commented out in the page below. */
function Planner() {
  const [type, setType] = useState(0);
  const [platform, setPlatform] = useState('both');
  const [picked, setPicked] = useState(['auth']);

  const toggle = (k) =>
    setPicked((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const calc = useMemo(() => {
    const rows = [{ label: `${planTypes[type].label} core`, w: planTypes[type].base }];
    if (platform === 'both') rows.push({ label: 'Second platform', w: 1 });
    planFeatures.filter((f) => picked.includes(f.key)).forEach((f) => rows.push({ label: f.label, w: f.weeks }));
    const low = rows.reduce((n, r) => n + r.w, 0);
    const high = Math.round(low * 1.5);
    const m1 = Math.max(1, Math.round(low / 4.3));
    const m2 = Math.max(1, Math.round(high / 4.3));
    return { rows, low, high, max: Math.max(...rows.map((r) => r.w)), months: m1 === m2 ? `${m1} month${m1 > 1 ? 's' : ''}` : `${m1}–${m2} months` };
  }, [type, platform, picked]);

  return (
    <div className="ma-planner">
      <div className="ma-pl-left">
        <fieldset>
          <legend>
            <b>1</b> What are you building?
          </legend>
          <div className="ma-cards2">
            {planTypes.map((t, i) => (
              <button key={t.label} type="button" className={`ma-opt ${type === i ? 'on' : ''}`} onClick={() => setType(i)} aria-pressed={type === i}>
                <strong>{t.label}</strong>
                <small>{t.desc}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <b>2</b> Which platforms?
          </legend>
          <div className="ma-cards3">
            {[['ios', 'iOS', 'iPhone and iPad'], ['android', 'Android', 'Phones and tablets'], ['both', 'Both', 'Shared code, +1 wk']].map(([k, l, d]) => (
              <button key={k} type="button" className={`ma-opt ${platform === k ? 'on' : ''}`} onClick={() => setPlatform(k)} aria-pressed={platform === k}>
                <strong>{l}</strong>
                <small>{d}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <b>3</b> What should it do?
          </legend>
          <div className="ma-options">
            {planFeatures.map((f) => {
              const on = picked.includes(f.key);
              return (
                <button key={f.key} type="button" className={`ma-chip ${on ? 'on' : ''}`} onClick={() => toggle(f.key)} aria-pressed={on}>
                  <span className="ma-tick">{on && <Ic n="check" s={11} w={3} />}</span>
                  {f.label}
                  <em>+{f.weeks} wk</em>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <aside className="ma-planner-result">
        <p className="ma-label">Your rough timeline</p>
        <p className="ma-weeks" key={`${calc.low}-${calc.high}`}>
          {calc.low}–{calc.high} <span>weeks</span>
        </p>
        <p className="ma-months">About {calc.months}</p>

        <p className="ma-break-title">Where the time goes</p>
        <div className="ma-break">
          {calc.rows.map((r) => (
            <div key={r.label} className="ma-break-row">
              <span>{r.label}</span>
              <div>
                <i style={{ width: `${(r.w / calc.max) * 100}%` }} />
              </div>
              <b>{r.w} wk</b>
            </div>
          ))}
        </div>

        <p className="ma-note">A guide only. Scope changes the real number.</p>
        <Button href="/contact" variant="primary">
          Get an accurate estimate
        </Button>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function MobileAppDevelopmentPage() {
  useEffect(() => {
    document.title = 'Mobile App Development | iOS & Android | Dotix';
  }, []);

  return (
    <main className="mobile-app-page">
      <style>{CSS}</style>

      {/* HERO */}
      <section className="ma-hero">
        <div className="ma-container ma-hero-grid">
          <div className="ma-hero-copy">
            <h1 className="ma-in" style={{ animationDelay: '80ms' }}>
              One product.
              <span>Every platform</span>
            </h1>
            <p className="ma-lead ma-in" style={{ animationDelay: '160ms' }}>
              We design and build web, iOS and Android apps, from first prototype to store release and beyond.
            </p>

            <div className="ma-actions ma-in" style={{ animationDelay: '220ms' }}>
              <Button href="/contact" variant="primary">
                Start your project
              </Button>
              <a href="#planner" className="ma-link">
                Plan your app &rarr;
              </a>
            </div>
          </div>

          <div className="ma-hero-art" aria-hidden="true">
            <HeroDiagram />
          </div>
        </div>
      </section>

      {/* MOVING TECH STRIP */}
      {/* <div className="ma-marquee" aria-label="Technologies we work with">
        <div className="ma-track">
          {[...stack, ...stack].map((t, i) => (
            <span key={`${t}-${i}`} aria-hidden={i >= stack.length}>
              {t}
            </span>
          ))}
        </div>
      </div> */}

      {/* PLATFORMS */}
      <section className="ma-section">
        <div className="ma-container">
          <SectionHead
            label="Every screen"
            title="Built for the platform in people’s hands."
            intro="Each version feels native to its platform."
          />
          <Reveal delay={80}>
            <Platforms />
          </Reveal>
        </div>
      </section>

      {/* FLOW */}
      <section className="ma-section ma-alt">
        <div className="ma-container">
          <SectionHead
            label="How it fits together"
            title="What happens behind every tap."
            intro="How a typical product connects your app, data and services."
          />
          <FlowDiagram />
        </div>
      </section>

      {/* PLANNER */}
      {/* <section className="ma-section" id="planner">
        <div className="ma-container">
          <SectionHead
            label="Plan your app"
            title="Get a feel for the timeline."
            intro="Pick what you need to see a rough range."
          />
          <Reveal delay={80}>
            <Planner />
          </Reveal>
        </div>
      </section> */}

      {/* WORK */}
      <section className="ma-section ma-alt">
        <div className="ma-container">
          <SectionHead
            label="Selected work"
            title="Products we have built."
            intro="A few of our apps."
          />
          <div className="ma-pgrid">
            {apps.map((app) => (
              <article key={app.name} className="ma-app">
                <a
                  className="ma-app-shot"
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${app.name}: visit site`}
                >
                  {app.image ? (
                    <Image
                      src={app.image}
                      alt={`${app.name} screenshot`}
                      fill
                      sizes="(max-width: 560px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="ma-app-ph">
                      <span>{app.name.charAt(0)}</span>
                      <small>Add image</small>
                    </div>
                  )}
                </a>

                <div className="ma-app-body">
                  <div className="ma-app-top">
                    {app.logo ? (
                      <Image
                        className="ma-app-logo"
                        src={app.logo}
                        alt=""
                        width={34}
                        height={34}
                      />
                    ) : (
                      <span className="ma-app-logo ma-app-logo-ph">{app.name.charAt(0)}</span>
                    )}
                    <a
                      className="ma-app-domain"
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [{app.domain}]
                    </a>
                  </div>

                  <h3>{app.name}</h3>

                  <div className="ma-app-tags">
                    {app.platforms.map(([k, l]) => (
                      <span key={k}>
                        <PlatIcon n={k} />
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ma-section">
        <div className="ma-container">
          <SectionHead
            label="How we work"
            title="Four stages, no surprises."
            intro="A clear process from planning and design to development and launch, with every step defined along the way."
          />
          <Reveal className="ma-steps-wrap">
            <div className="ma-steps">
              <div className="ma-steps-line" aria-hidden="true">
                <span />
              </div>
              {steps.map((st, i) => (
                <div key={st.title} className="ma-step" style={{ '--i': i }}>
                  <div className="ma-step-dot">
                    <Ic n={st.icon} s={24} w={1.6} />
                  </div>
                  <p className="ma-step-time">{st.time}</p>
                  <h3>{st.title}</h3>
                  <p className="ma-body">{st.short}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="ma-section ma-alt">
        <div className="ma-container ma-faq-wrap">
          <SectionHead label="FAQs" title="Questions we hear often." intro="Quick answers before we talk." />
          <Reveal delay={80}>
            <div className="ma-faq">
              <FAQAccordion faqs={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="ma-cta">
        <div className="ma-container ma-narrow">
          <Reveal>
            <SharedSectionHeading
              eyebrow="Start a mobile project"
              title="Have an app in mind? Tell us about it."
              description="Tell us what you are planning. We will reply with honest feedback."
              spacingClassName="mb-6"
            />
            <div className="ma-cta-box">
              <div className="ma-cta-box-art" aria-hidden="true">
                <span className="ma-cta-orbit ma-cta-orbit-one" />
                <span className="ma-cta-orbit ma-cta-orbit-two" />
                <span className="ma-cta-spark ma-cta-spark-one" />
                <span className="ma-cta-spark ma-cta-spark-two" />
              </div>
              <div className="ma-cta-box-content">
                <p className="ma-cta-kicker">Your next app starts here</p>
                <p className="ma-cta-box-copy">
                  Share your idea and we’ll help turn it into a clear, buildable plan.
                </p>
                <Button href="/contact" variant="primary">
                  Start your project
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* STYLES                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
.mobile-app-page{
  --ma-accent:var(--accent,#8b7cff);
  --ma-bg:var(--background-primary,#0a0a12);
  --ma-bg2:var(--background-secondary,#0f0f1a);
  --ma-card:var(--background-card,#14141f);
  --ma-line:var(--border,rgba(255,255,255,.1));
  --ma-text:var(--text-secondary,#b0b2c3);
  --ma-muted:var(--text-muted,#82859a);
  background:var(--ma-bg);
  color:#f2f2f7;
  overflow:hidden
}

.mobile-app-page *{box-sizing:border-box}
.mobile-app-page h1,.mobile-app-page h2,.mobile-app-page h3{
  margin:0;
  color:#fff;
  letter-spacing:-.02em;
  font-weight:650
}
.mobile-app-page p,.mobile-app-page ul{margin:0}
.mobile-app-page ul{padding:0;list-style:none}
.mobile-app-page button{font-family:inherit;cursor:pointer}

.ma-container{max-width:1140px;margin:0 auto;padding:0 clamp(16px, 4vw, 24px)}
.ma-narrow{max-width:800px}
.ma-section{padding:112px 0}
.ma-alt{background:var(--ma-bg2)}

.ma-label{
  font-size:12px;
  font-weight:600;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--ma-accent);
  margin-bottom:18px
}

.ma-head{max-width:620px;margin-bottom:64px}

.mobile-app-page .ma-head h2{
  margin-bottom:16px;
  font-size:clamp(26px,3vw,36px);
  line-height:1.25
}

.mobile-app-page .ma-intro{
  margin-top:20px;
  font-size:16px;
  line-height:1.7;
  color:var(--ma-text)
}

.ma-body{font-size:15px;line-height:1.7;color:var(--ma-text)}

.ma-reveal{
  opacity:0;
  transform:translateY(16px);
  transition:opacity .6s ease,transform .6s ease
}
.ma-reveal.is-in{opacity:1;transform:none}
.ma-in{opacity:0;animation:maIn .7s ease forwards}

@keyframes maIn{
  from{opacity:0;transform:translateY(14px)}
  to{opacity:1;transform:none}
}

/* hero */
.ma-hero{
  position:relative;
  display:flex;
  align-items:center;
  min-height:min(92svh,820px);
  padding:96px 0;
  overflow:hidden;
  background:radial-gradient(ellipse 60% 70% at 85% 30%,rgba(139,124,255,.16),transparent 70%),var(--ma-bg)
}

.ma-hero::before{
  content:'';
  position:absolute;
  left:55%;
  bottom:-160px;
  width:900px;
  height:520px;
  transform:translateX(-50%);
  border-radius:50%;
  background:var(--ma-accent);
  opacity:.12;
  filter:blur(140px);
  pointer-events:none
}

.ma-hero-grid{
  position:relative;
  z-index:1;
  display:grid;
  grid-template-columns:minmax(0,.9fr) minmax(0,1.2fr);
  gap:16px;
  align-items:center;
  width:100%
}

.ma-hero-copy{max-width:520px}

/* same heading style as the landing page hero */
.mobile-app-page .ma-hero h1{
  font-family:var(--font-manrope),Arial,Helvetica,sans-serif;
  font-size:clamp(1.65rem,3.4vw,2.8rem);
  font-weight:500;
  line-height:1.08;
  letter-spacing:-.045em
}

.ma-hero h1 span{
  display:block;
  width:fit-content;
  margin-top:2px;
  color:transparent;
  background-image:linear-gradient(90deg,#f97316,#ea580c,#f59e0b);
  -webkit-background-clip:text;
  background-clip:text
}

html[data-theme="dark"] .ma-hero h1 span{
  background-image:linear-gradient(90deg,#fdba74,#fb923c,#fbbf24)
}

.ma-lead {
  margin: 8px 0 0;
  max-width: 460px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--ma-text);
}

.ma-actions{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:28px;
  margin-top:34px
}

.ma-link{
  color:#fff;
  font-size:15px;
  font-weight:550;
  text-decoration:none;
  border-bottom:1px solid var(--ma-line);
  padding-bottom:2px;
  transition:border-color .2s,color .2s
}

.ma-link:hover{
  border-color:var(--ma-accent);
  color:var(--ma-accent)
}

/* hero art */
.ma-hero-art{
  --k:.7;
  position:relative;
  width:calc(840px*var(--k));
  height:calc(680px*var(--k));
  justify-self:end;
  pointer-events:none
}

.ma-stage{
  position:absolute;
  left:0;
  top:0;
  width:840px;
  height:680px;
  transform:scale(var(--k));
  transform-origin:top left
}

/* hero diagram */
.hd-lines{
  position:absolute;
  inset:0;
  width:840px;
  height:680px;
  pointer-events:none
}

.hd-lines path{
  fill:none;
  stroke:var(--ma-accent);
  stroke-width:1.6;
  stroke-dasharray:6 7;
  opacity:.85;
  animation:hdFlow 1.1s linear infinite
}

.hd-lines circle{fill:var(--ma-accent)}
@keyframes hdFlow{to{stroke-dashoffset:-13}}

.hd-node{
  position:absolute;
  width:150px;
  padding:12px 14px;
  border:1px solid var(--ma-line);
  border-radius:10px;
  background:var(--ma-card);
  box-shadow:0 20px 40px -24px rgba(0,0,0,.8);
  text-align:left
}

.hd-node b{
  display:block;
  font-size:13px;
  font-weight:600;
  color:#fff;
  letter-spacing:-.01em
}

.hd-node small{
  display:block;
  margin-top:3px;
  font-size:11px;
  line-height:1.4;
  color:var(--ma-muted)
}

.hd-phone{
  position:absolute;
  width:268px;
  height:548px;
  padding:8px;
  border-radius:48px;
  background:#0b0b0f;
  box-shadow:0 0 0 2px #3a3a44 inset,0 40px 70px -30px rgba(0,0,0,.9);
  font-family:-apple-system,'SF Pro Text',system-ui,sans-serif;
  color:#15151f;
  text-align:left;
  transform-origin:50% 100%
}

.hd-phone-main{
  left:286px;
  top:56px;
  z-index:3;
  box-shadow:0 0 0 2px #3a3a44 inset,0 40px 70px -30px rgba(0,0,0,.9),0 0 80px -20px rgba(139,124,255,.35);
  animation:hdFloat 8s ease-in-out infinite
}

.hd-phone-left{
  left:178px;
  top:92px;
  z-index:1;
  transform:rotate(-11deg) scale(.9);
  animation:hdFloat 9s ease-in-out -2s infinite
}

.hd-phone-right{
  left:394px;
  top:92px;
  z-index:2;
  transform:rotate(11deg) scale(.9);
  animation:hdFloat 10s ease-in-out -4s infinite
}

.hd-page-top{padding-top:22px}

.hd-kpi{
  margin-top:14px;
  padding:12px;
  border-radius:12px;
  background:#6c5ce7;
  color:#fff
}

.hd-kpi small{display:block;font-size:10px;opacity:.8}
.hd-kpi strong{display:block;margin:2px 0;font-size:26px;letter-spacing:-.02em}
.hd-kpi em{font-size:10px;font-style:normal;opacity:.85}

.hd-bars{
  display:flex;
  align-items:flex-end;
  gap:7px;
  height:96px;
  margin-top:10px;
  padding:12px;
  border-radius:12px;
  background:#fff
}

.hd-bars i{flex:1;border-radius:3px 3px 1px 1px;background:#cfc9fb}
.hd-bars i:nth-child(6){background:#6c5ce7}

.hd-map{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:130px;
  background:#ececf2
}

.hd-sheet{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  height:170px;
  padding:22px 20px;
  border-radius:22px 22px 0 0;
  background:#fff;
  box-shadow:0 -8px 24px rgba(0,0,0,.08)
}

.hd-sheet b{display:block;font-size:16px}
.hd-sheet small{display:block;margin-top:3px;font-size:12px;color:#7a7a88}

.hd-progress{
  height:5px;
  margin-top:18px;
  border-radius:3px;
  background:#e6e6ee;
  overflow:hidden
}

.hd-progress i{
  display:block;
  width:62%;
  height:100%;
  border-radius:3px;
  background:#6c5ce7
}

@keyframes hdFloat{
  0%,100%{translate:0 0}
  50%{translate:0 -8px}
}

.hd-screen{
  position:relative;
  height:100%;
  border-radius:40px;
  background:#f4f4f8;
  overflow:hidden
}

.hd-island{
  position:absolute;
  top:9px;
  left:50%;
  transform:translateX(-50%);
  width:80px;
  height:23px;
  border-radius:14px;
  background:#000;
  z-index:2
}

.hd-status{
  display:flex;
  justify-content:space-between;
  padding:14px 26px 0 30px;
  font-size:12px;
  font-weight:600
}

.hd-url{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  height:30px;
  margin:16px 18px 0;
  border-radius:10px;
  background:#e4e4ea;
  font-size:12px;
  color:#55555f
}

.hd-page{padding:16px 16px 0}
.hd-head{display:flex;align-items:center;justify-content:space-between}

.mobile-app-page .hd-head h4{
  margin:0;
  font-size:24px;
  font-weight:700;
  letter-spacing:-.02em;
  color:#15151f
}

.hd-head span{
  padding:6px 11px;
  border-radius:7px;
  background:#6c5ce7;
  color:#fff;
  font-size:11px;
  font-weight:600
}

.hd-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.hd-stats div{padding:10px 12px;border-radius:10px;background:#fff}
.hd-stats small{display:block;font-size:10px;color:#7a7a88}
.hd-stats strong{display:block;margin-top:2px;font-size:19px}
.hd-chart{margin-top:10px;padding:10px 12px;border-radius:10px;background:#fff}
.hd-list{margin-top:10px;border-radius:12px;background:#fff;overflow:hidden}

.hd-row{
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 12px;
  border-bottom:.5px solid #e8e8ee
}

.hd-row:last-child{border:0}

.hd-row i{
  display:flex;
  flex-shrink:0;
  align-items:center;
  justify-content:center;
  width:30px;
  height:30px;
  border-radius:50%;
  color:#fff;
  font-size:12px;
  font-style:normal;
  font-weight:600
}

.hd-row div{flex:1;min-width:0}
.hd-row b{display:block;font-size:12px;font-weight:600}
.hd-row small{display:block;font-size:10px;color:#8a8a94}

.hd-row em{
  padding:2px 7px;
  border-radius:999px;
  font-size:9px;
  font-style:normal;
  font-weight:600;
  white-space:nowrap
}

.hd-row em.warn{background:#fff0dc;color:#b25e00}
.hd-row em.info{background:#e1edff;color:#0a5fd0}
.hd-row em.ok{background:#dff5e8;color:#1b7f4b}

.hd-bar{
  position:absolute;
  bottom:7px;
  left:50%;
  transform:translateX(-50%);
  width:108px;
  height:4px;
  border-radius:2px;
  background:#000
}

/* moving tech strip */
.ma-marquee{
  overflow:hidden;
  padding:22px 0;
  border-top:1px solid var(--ma-line);
  border-bottom:1px solid var(--ma-line);
  background:var(--ma-bg2);
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)
}

.ma-track{display:flex;width:max-content;animation:maMarquee 36s linear infinite}
.ma-marquee:hover .ma-track{animation-play-state:paused}

.ma-track span{
  display:inline-flex;
  align-items:center;
  gap:36px;
  padding-right:36px;
  font-size:15px;
  font-weight:550;
  color:var(--ma-text);
  white-space:nowrap
}

.ma-track span::after{
  content:'';
  width:5px;
  height:5px;
  border-radius:50%;
  background:var(--ma-accent)
}

@keyframes maMarquee{to{transform:translateX(-50%)}}

/* platforms */
.ma-plat{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}

.mobile-app-page .ma-plat-col h3{
  margin-bottom:16px;
  font-size:22px
}

.ma-plat-col ul{display:grid;gap:12px;margin-top:26px}

.ma-plat-col li{
  position:relative;
  padding-left:22px;
  font-size:15px;
  color:#e8e8f0
}

.ma-plat-col li::before{
  content:'';
  position:absolute;
  left:0;
  top:9px;
  width:10px;
  height:2px;
  background:var(--ma-accent)
}

/* flow */
.ma-flow{
  display:grid;
  grid-template-columns:1fr 48px 1fr 48px 1fr 48px 1fr;
  align-items:stretch
}

.ma-flow>.ma-reveal{display:flex}

.ma-flow-col{
  flex:1;
  padding:28px 24px;
  border:1px solid var(--ma-line);
  border-radius:12px;
  background:var(--ma-card);
  transition:border-color .3s
}

.ma-flow-col:hover{border-color:var(--ma-muted)}

.mobile-app-page .ma-flow-step{
  margin-bottom:14px;
  font-size:12px;
  color:var(--ma-muted)
}

.mobile-app-page .ma-flow-col h3{
  margin-bottom:10px;
  font-size:18px
}

.mobile-app-page .ma-flow-cap{
  min-height:40px;
  margin-bottom:22px;
  font-size:13px;
  line-height:1.6;
  color:var(--ma-muted)
}

.ma-flow-col ul{display:grid;gap:8px}

.ma-flow-col li{
  padding:10px 12px;
  border-radius:6px;
  background:rgba(255,255,255,.05);
  font-size:13px;
  color:#e8e8f0
}

.ma-conn{
  position:relative;
  align-self:center;
  height:2px;
  background:repeating-linear-gradient(90deg,var(--ma-muted) 0 6px,transparent 6px 12px);
  background-size:12px 2px;
  animation:maDash 1.2s linear infinite;
  opacity:.7
}

.ma-conn::after{
  content:'';
  position:absolute;
  right:-2px;
  top:-4px;
  border-left:7px solid var(--ma-muted);
  border-top:5px solid transparent;
  border-bottom:5px solid transparent
}

@keyframes maDash{to{background-position:12px 0}}
@keyframes maDashV{to{background-position:0 12px}}

/* planner */
#planner.ma-section{padding:88px 0}
#planner .ma-head{margin-bottom:40px}

.ma-planner{
  display:grid;
  grid-template-columns:1.3fr 1fr;
  gap:40px;
  align-items:start
}

.ma-planner fieldset{margin:0 0 26px;padding:0;border:0;min-width:0}

.ma-planner legend{
  display:flex;
  align-items:center;
  gap:10px;
  padding:0;
  margin-bottom:12px;
  font-size:14px;
  font-weight:600;
  color:#fff
}

.ma-planner legend b{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:22px;
  height:22px;
  border-radius:50%;
  background:rgba(255,255,255,.1);
  color:#fff;
  font-size:12px
}

.ma-cards2{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.ma-cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}

.ma-opt{
  display:flex;
  flex-direction:column;
  gap:3px;
  padding:12px 14px;
  border:1px solid var(--ma-line);
  border-radius:8px;
  background:transparent;
  color:var(--ma-text);
  text-align:left;
  transition:border-color .2s,background .2s
}

.ma-opt strong{font-size:14px;color:#fff;font-weight:600}
.ma-opt small{font-size:12px;line-height:1.4;color:var(--ma-muted)}
.ma-opt:hover{border-color:var(--ma-muted)}
.ma-opt.on{border-color:var(--ma-accent);background:rgba(255,255,255,.04)}

.ma-options{display:flex;flex-wrap:wrap;gap:8px}

.ma-chip{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 12px;
  border:1px solid var(--ma-line);
  border-radius:6px;
  background:transparent;
  color:var(--ma-text);
  font-size:13px;
  transition:border-color .2s,background .2s,color .2s
}

.ma-chip em{font-style:normal;font-size:11px;color:var(--ma-muted)}
.ma-chip:hover{border-color:var(--ma-muted);color:#fff}
.ma-chip.on{border-color:var(--ma-accent);background:rgba(255,255,255,.04);color:#fff}

.ma-tick{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:14px;
  height:14px;
  border:1px solid var(--ma-line);
  border-radius:3px;
  color:#fff
}

.ma-chip.on .ma-tick{background:var(--ma-accent);border-color:var(--ma-accent)}

.ma-planner-result{
  position:sticky;
  top:96px;
  padding:24px;
  border:1px solid var(--ma-line);
  border-radius:10px;
  background:var(--ma-card)
}

.ma-planner-result .ma-label{margin-bottom:12px}
.ma-weeks{font-size:30px;font-weight:650;letter-spacing:-.02em;line-height:1;color:#fff}
.ma-weeks span{font-size:15px;font-weight:500;letter-spacing:0;color:var(--ma-muted)}
.ma-months{margin:8px 0 22px;font-size:13px;color:var(--ma-text)}
.ma-break-title{margin-bottom:12px;font-size:12px;font-weight:600;color:var(--ma-muted)}
.ma-break{display:grid;gap:10px;margin-bottom:22px}

.ma-break-row{
  display:grid;
  grid-template-columns:110px 1fr 38px;
  align-items:center;
  gap:10px;
  font-size:12px;
  color:var(--ma-text)
}

.ma-break-row div{height:4px;border-radius:2px;background:var(--ma-line);overflow:hidden}

.ma-break-row i{
  display:block;
  height:100%;
  border-radius:2px;
  background:var(--ma-accent);
  transition:width .4s ease
}

.ma-break-row b{text-align:right;font-weight:600;color:#fff}
.ma-note{margin-bottom:20px;font-size:12px;line-height:1.6;color:var(--ma-muted)}

/* app cards */
.ma-pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.ma-app{display:flex;flex-direction:column;min-width:0}

.ma-app-shot{
  position:relative;
  display:block;
  aspect-ratio:346/521;
  border-radius:12px;
  background:var(--ma-card);
  overflow:hidden;
  text-decoration:none;
  transition:background .25s ease
}

.ma-app-shot img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover
}

.ma-app-ph{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:6px;
  width:100%;
  height:100%;
  border:1px dashed var(--ma-line);
  border-radius:12px;
  background:linear-gradient(135deg,#171726,#0e0e18)
}

.ma-app-ph span{
  font-size:56px;
  font-weight:650;
  color:rgba(255,255,255,.8);
  letter-spacing:-.03em
}

.ma-app-ph small{font-size:12px;color:var(--ma-muted)}

.ma-app-body{padding:24px 4px 0}

.ma-app-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px
}

.ma-app-logo{
  width:34px;
  height:34px;
  border-radius:8px;
  object-fit:contain;
  flex-shrink:0
}

.ma-app-logo-ph{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  background:var(--ma-accent);
  color:#fff;
  font-size:16px;
  font-weight:650
}

/* website link + diagonal arrow */
.ma-app-domain{
  display:inline-flex;
  align-items:center;
  justify-content:flex-end;
  gap:6px;
  min-width:0;
  max-width:calc(100% - 46px);
  font-family:inherit;
  font-size:12px;
  font-weight:500;
  line-height:1.5;
  color:var(--ma-accent);
  text-decoration:none;
  text-align:right;
  overflow-wrap:anywhere;
  transition:color .2s ease
}

.ma-app-domain svg{
  width:13px;
  height:13px;
  flex-shrink:0;
  transition:transform .25s ease
}

.ma-app-domain:hover{color:#fff}

.ma-app-domain:hover svg{
  transform:translate(3px,-3px)
}

.ma-app-domain:focus-visible{
  outline:2px solid var(--ma-accent);
  outline-offset:4px;
  border-radius:3px
}

.mobile-app-page .ma-app-body h3{
  margin:18px 0 14px;
  font-size:24px
}

.ma-app-tags{display:flex;flex-wrap:wrap;gap:8px}

.ma-app-tags span{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:6px 10px;
  border:1px solid var(--ma-line);
  border-radius:4px;
  font-size:13px;
  color:var(--ma-text)
}

.ma-app-tags svg{width:14px;height:14px}

/* process */
.ma-step-line{height:2px;margin-bottom:28px;background:var(--ma-line)}
.ma-step-line span{display:block;width:0;height:100%;background:var(--ma-accent);transition:width 1s ease .3s}
.ma-reveal.is-in .ma-step-line span{width:100%}

.ma-step-time{
  margin-bottom:14px;
  font-size:12px;
  font-weight:600;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:var(--ma-muted)
}

.ma-steps{
  position:relative;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:24px
}

.ma-steps-line{
  position:absolute;
  top:35px;
  left:12.5%;
  right:12.5%;
  height:2px;
  background:var(--ma-line)
}

.ma-steps-line span{
  display:block;
  width:0;
  height:100%;
  background:var(--ma-accent);
  transition:width 2.4s ease .3s
}

.is-in .ma-steps-line span{width:100%}

.ma-step{position:relative;padding:0 8px;text-align:center}

.ma-step-dot{
  position:relative;
  z-index:1;
  display:flex;
  align-items:center;
  justify-content:center;
  width:72px;
  height:72px;
  margin:0 auto 28px;
  border:2px solid var(--ma-line);
  border-radius:50%;
  background:var(--ma-bg);
  color:var(--ma-muted);
  transition:border-color .5s,color .5s,box-shadow .5s;
  transition-delay:calc(var(--i)*.6s + .3s)
}

.is-in .ma-step-dot{border-color:var(--ma-accent);color:var(--ma-accent)}

.mobile-app-page .ma-step h3{margin-bottom:10px;font-size:20px}
.ma-step .ma-body{max-width:220px;margin:0 auto}

/* faq */
.ma-faq-wrap{
  display:grid;
  grid-template-columns:minmax(0,.8fr) minmax(0,1.5fr);
  gap:72px;
  align-items:start
}

.ma-faq-wrap .ma-head{margin-bottom:0}
.ma-faq{font-size:15px}
.ma-faq p{line-height:1.75}

/* CTA */
.ma-cta{
  padding:120px 0;
  text-align:center;
  border-top:1px solid var(--ma-line)
}

.ma-cta h2{
  margin-bottom:20px;
  font-size:clamp(28px,3.4vw,40px);
  line-height:1.2;
  letter-spacing:-.03em
}

.ma-cta p{
  max-width:500px;
  margin:0 auto 36px;
  font-size:16px;
  line-height:1.7;
  color:var(--ma-text)
}

/* responsive */
@media(max-width:1000px){
  .ma-hero-grid{grid-template-columns:1fr;gap:40px;text-align:center}
  .ma-hero-copy{max-width:none;margin:0 auto}
  .ma-lead{margin-left:auto;margin-right:auto}
  .ma-actions{justify-content:center}
  .ma-hero-art{--k:.6;justify-self:center}

  .ma-planner{grid-template-columns:1fr;gap:44px}
  .ma-planner-result{position:static}

  .ma-flow{grid-template-columns:1fr}
  .ma-flow>.ma-reveal{display:block}

  .ma-conn{
    width:2px;
    height:40px;
    justify-self:center;
    background:repeating-linear-gradient(180deg,var(--ma-muted) 0 6px,transparent 6px 12px);
    background-size:2px 12px;
    animation-name:maDashV
  }

  .ma-conn::after{
    right:auto;
    left:-4px;
    top:auto;
    bottom:-2px;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
    border-top:7px solid var(--ma-muted);
    border-bottom:0
  }

  .ma-pgrid{grid-template-columns:repeat(2,1fr)}
  .mobile-app-page .ma-flow-cap{min-height:0}
  .ma-plat{grid-template-columns:1fr;gap:48px}
  .ma-faq-wrap{grid-template-columns:1fr;gap:40px}
}

@media(max-width:700px){
  .ma-steps{grid-template-columns:1fr;gap:40px}

  .ma-steps-line{
    top:36px;
    bottom:36px;
    left:35px;
    right:auto;
    width:2px;
    height:auto
  }

  .ma-steps-line span{
    width:100%;
    height:0;
    transition:height 2.4s ease .3s
  }

  .is-in .ma-steps-line span{height:100%}

  .ma-step{
    display:grid;
    grid-template-columns:72px 1fr;
    gap:0 20px;
    align-items:center;
    padding:0;
    text-align:left
  }

  .ma-step-dot{grid-row:1/span 3;margin:0}
  .ma-step .ma-body{margin:0}

  .ma-break-row{grid-template-columns:96px 1fr 38px}
  .ma-section{padding:72px 0}
  .ma-head{margin-bottom:48px}
  .ma-hero{padding:72px 0;min-height:auto}
  .ma-planner-result{padding:24px}
}

@media(max-width:560px){
  .ma-hero-art{--k:clamp(0.26, calc((100vw - 40px) / 840), 0.4); max-width: 100%;}
  .ma-pgrid{grid-template-columns:1fr}
  .ma-cards2,.ma-cards3{grid-template-columns:1fr}
}

@media(prefers-reduced-motion:reduce){
  .mobile-app-page *{animation:none!important;transition:none!important}
  .ma-reveal,.ma-in{opacity:1;transform:none}
  .ma-step-line span,.ma-steps-line span{width:100%;height:100%}
}
`;