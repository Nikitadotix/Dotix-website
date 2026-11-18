'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../../components/common/Button.js';
import { FAQAccordion } from '../../../components/common/FAQAccordion.js';
import { projects } from '../../../data/projects.js';

/* NOTE: `export const metadata` cannot live in a 'use client' file.
   Put it in a sibling layout.js. document.title below is a fallback. */

/* ------------------------------------------------------------------ */
/* CONTENT                                                             */
/* ------------------------------------------------------------------ */

const steps = [
  {
    step: '01',
    title: 'Plan and design',
    time: 'Weeks 1–2',
    desc: 'We learn what you are building and who it is for, agree on the features that matter first, and design the flow and screens before any code is written.',
    points: ['Discovery workshop', 'Feature roadmap', 'Wireframes and UI design'],
  },
  {
    step: '02',
    title: 'Build and test',
    time: 'Weeks 3–10',
    desc: 'We develop the app and its backend in short cycles, share working builds as we go, and test on real devices so problems are found early.',
    points: ['Frontend and backend', 'API integration', 'Device and QA testing'],
  },
  {
    step: '03',
    title: 'Launch',
    time: 'Final weeks',
    desc: 'We prepare store assets and configurations, handle the App Store and Google Play submissions, and watch the first release closely.',
    points: ['Store submission', 'Release monitoring', 'Launch-day support'],
  },
  {
    step: '04',
    title: 'Support and grow',
    time: 'Ongoing',
    desc: 'After launch we stay on for fixes, OS compatibility updates and the next round of features based on how people use the app.',
    points: ['Bug fixes', 'OS and device updates', 'New features'],
  },
];

const faqs = [
  {
    question: 'Native vs cross-platform: which is better?',
    answer:
      'Native apps offer platform-specific functionality, while React Native and Flutter allow development for multiple platforms using a shared codebase. The right choice depends on your features, performance needs, and budget.',
  },
  {
    question: 'Can you build for both iOS and Android?',
    answer:
      'Yes. We can develop applications for both platforms using suitable technologies such as React Native or Flutter.',
  },
  {
    question: 'Can you develop an MVP?',
    answer:
      'Yes. We identify essential features and build a functional MVP to help you validate your idea before investing in a complete application.',
  },
  {
    question: 'How long does app development take?',
    answer:
      'A simple MVP may take 4–8 weeks, while a feature-rich application may take 12–20 weeks or longer, depending on complexity.',
  },
  {
    question: 'Do you handle app store submissions?',
    answer:
      'Yes. We assist with technical preparation, app configurations, store assets, and submission requirements for Google Play and Apple App Store.',
  },
  {
    question: 'Can you improve an existing application?',
    answer:
      'Yes. We can fix bugs, improve performance, modernize the interface, update architecture, and add new features.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We provide ongoing maintenance, bug fixes, compatibility updates, and performance improvements.',
  },
];

const flow = [
  {
    title: 'Your users',
    caption: 'Where people interact with your product.',
    items: ['iOS app', 'Android app', 'Push notifications'],
  },
  {
    title: 'API layer',
    caption: 'A secure gateway between the app and your data.',
    items: ['Authentication', 'REST / GraphQL API', 'Request validation'],
  },
  {
    title: 'Backend',
    caption: 'The logic and storage that keep everything running.',
    items: ['Business logic', 'Database', 'Admin dashboard'],
  },
  {
    title: 'Connected services',
    caption: 'Third-party tools plugged in where needed.',
    items: ['Payments', 'Maps and location', 'Analytics and email'],
  },
];

const planTypes = [
  { label: 'MVP', base: 4 },
  { label: 'Customer app', base: 9 },
  { label: 'Operations app', base: 7 },
  { label: 'Rebuild', base: 6 },
];

const planFeatures = [
  { key: 'auth', label: 'User accounts', weeks: 1 },
  { key: 'pay', label: 'Payments', weeks: 2 },
  { key: 'push', label: 'Push notifications', weeks: 1 },
  { key: 'chat', label: 'Chat', weeks: 2 },
  { key: 'maps', label: 'Maps and location', weeks: 2 },
  { key: 'admin', label: 'Admin dashboard', weeks: 3 },
];

/* Reads whichever link fields your project objects use. Rename here if
   your projects.js uses different field names. */
function getProjectLinks(p) {
  return [
    ['Visit site', p.liveUrl || p.url || p.link || p.href || p.website],
    ['App Store', p.appStoreUrl || p.iosUrl],
    ['Google Play', p.playStoreUrl || p.androidUrl],
  ].filter(([, href]) => Boolean(href));
}

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
      setShown(true);
      return undefined;
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
      <p className="ma-label">{label}</p>
      <h2>{title}</h2>
      {intro && <p className="ma-intro">{intro}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* HERO PHONE (CSS only)                                               */
/* A new order slides in, the list updates and the chart refills.      */
/* ------------------------------------------------------------------ */

function HeroPhone() {
  const bars = [38, 52, 44, 66, 58, 82, 74];
  const rows = [
    ['Order #2041', 'Delivered', 'ok'],
    ['Order #2042', 'On the way', 'pending'],
    ['Order #2043', 'Preparing', 'pending'],
  ];
  return (
    <div className="ma-device">
      <div className="ma-phone" aria-hidden="true">
        <div className="ma-phone-notch" />
        <div className="ma-phone-screen">
          <div className="ma-toast">
            <span />
            New order received
          </div>

          <div className="ma-app-top">
            <div>
              <small>Today</small>
              <strong>Overview</strong>
            </div>
            <span className="ma-app-avatar">A</span>
          </div>

          <div className="ma-app-card">
            <small>Orders this week</small>
            <strong>1,284</strong>
            <div className="ma-bars">
              {bars.map((h, i) => (
                <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
          </div>

          <div className="ma-app-list">
            {rows.map(([name, status, tone], i) => (
              <div key={name} className="ma-app-row" style={{ animationDelay: `${i * 220}ms` }}>
                <span>{name}</span>
                <em className={tone}>{status}</em>
              </div>
            ))}
          </div>

          <div className="ma-app-tabs">
            <i className="on" />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="ma-device-shadow" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FLOW DIAGRAM                                                        */
/* ------------------------------------------------------------------ */

function FlowDiagram() {
  return (
    <div className="ma-flow">
      {flow.map((col, i) => (
        <Reveal key={col.title} delay={i * 140} className="ma-flow-cell">
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
          {i < flow.length - 1 && (
            <span className="ma-flow-link" aria-hidden="true">
              <i style={{ animationDelay: `${i * 500}ms` }} />
            </span>
          )}
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PROCESS TIMELINE (rail fills as you scroll)                         */
/* ------------------------------------------------------------------ */

function Timeline() {
  const wrap = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.55 - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="ma-timeline" ref={wrap}>
      <div className="ma-rail" aria-hidden="true">
        <span style={{ height: `${progress * 100}%` }} />
      </div>
      {steps.map((s, i) => {
        const reached = progress >= i / steps.length + 0.02;
        return (
          <div key={s.step} className={`ma-tl ${reached ? 'is-reached' : ''}`}>
            <div className="ma-tl-dot">{s.step}</div>
            <div className="ma-tl-body">
              <p className="ma-tl-time">{s.time}</p>
              <h3>{s.title}</h3>
              <p className="ma-body">{s.desc}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PLANNER                                                             */
/* ------------------------------------------------------------------ */

function Planner() {
  const [type, setType] = useState(0);
  const [platform, setPlatform] = useState('both');
  const [picked, setPicked] = useState(['auth']);

  const toggle = (k) =>
    setPicked((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const { low, high } = useMemo(() => {
    const extra = planFeatures
      .filter((f) => picked.includes(f.key))
      .reduce((sum, f) => sum + f.weeks, 0);
    const lo = planTypes[type].base + extra + (platform === 'both' ? 1 : 0);
    return { low: lo, high: Math.round(lo * 1.5) };
  }, [type, platform, picked]);

  const pct = Math.min(100, (high / 26) * 100);
  const platformLabel = { ios: 'iOS', android: 'Android', both: 'iOS and Android' }[platform];
  const chosen = planFeatures.filter((f) => picked.includes(f.key));

  return (
    <div className="ma-planner">
      <div className="ma-planner-controls">
        <fieldset>
          <legend>What are you building?</legend>
          <div className="ma-options">
            {planTypes.map((t, i) => (
              <button
                key={t.label}
                type="button"
                className={type === i ? 'on' : ''}
                onClick={() => setType(i)}
                aria-pressed={type === i}
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Platforms</legend>
          <div className="ma-options">
            {[
              ['ios', 'iOS'],
              ['android', 'Android'],
              ['both', 'Both'],
            ].map(([k, l]) => (
              <button
                key={k}
                type="button"
                className={platform === k ? 'on' : ''}
                onClick={() => setPlatform(k)}
                aria-pressed={platform === k}
              >
                {l}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Features you need</legend>
          <div className="ma-options">
            {planFeatures.map((f) => (
              <button
                key={f.key}
                type="button"
                className={picked.includes(f.key) ? 'on' : ''}
                onClick={() => toggle(f.key)}
                aria-pressed={picked.includes(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="ma-planner-result">
        <p className="ma-label">Rough timeline</p>
        <p className="ma-weeks" key={`${low}-${high}`}>
          {low}–{high} <span>weeks</span>
        </p>
        <div className="ma-meter">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="ma-summary">
          {planTypes[type].label} for {platformLabel}
          {chosen.length > 0 ? `, with ${chosen.map((f) => f.label.toLowerCase()).join(', ')}` : ''}.
        </p>
        <p className="ma-note">
          This is only a guide. Scope, integrations and design depth all change the real number.
        </p>
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
  const featuredProjects = projects.filter((p) =>
    ['Buzzr', 'RewardHub', 'Cash Lemon', 'Captcha Entry'].includes(p.name)
  );

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
            <p className="ma-label ma-in" style={{ animationDelay: '0ms' }}>
              Mobile app development
            </p>
            <h1 className="ma-in" style={{ animationDelay: '80ms' }}>
              Apps people actually keep on their phones.
            </h1>
            <p className="ma-lead ma-in" style={{ animationDelay: '160ms' }}>
              We design and build iOS, Android and cross-platform apps for startups and
              established businesses, from the first prototype to the store release and
              everything after.
            </p>
            <div className="ma-actions ma-in" style={{ animationDelay: '240ms' }}>
              <Button href="/contact" variant="primary">
                Start your project
              </Button>
              <a href="#planner" className="ma-link">
                Plan your app &rarr;
              </a>
            </div>
          </div>

          <div className="ma-in" style={{ animationDelay: '300ms' }}>
            <HeroPhone />
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="ma-section">
        <div className="ma-container">
          <SectionHead
            label="How it fits together"
            title="What happens behind every tap."
            intro="A good app is more than its screens. Here is how a typical product connects the app, your data and the services around it."
          />
          <FlowDiagram />
        </div>
      </section>

      {/* PLANNER */}
      <section className="ma-section ma-alt" id="planner">
        <div className="ma-container">
          <SectionHead
            label="Plan your app"
            title="Get a feel for the timeline."
            intro="Choose what you are building and the features you need. You will see a rough range, which is a useful starting point for a proper conversation."
          />
          <Reveal delay={80}>
            <Planner />
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section className="ma-section">
        <div className="ma-container">
          <SectionHead
            label="Selected work"
            title="Products we have helped bring to life."
            intro="A few of the applications we have designed and built."
          />
          <div className="ma-projects">
            {featuredProjects.map((project, i) => {
              const links = getProjectLinks(project);
              return (
                <Reveal key={project.id || project.name} delay={i * 80}>
                  <article className="ma-project">
                    <span className="ma-project-index">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{project.name}</h3>
                    <p className="ma-body">{project.description}</p>
                    <div className="ma-project-links">
                      {links.length > 0 ? (
                        links.map(([label, href]) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.name}: ${label}`}
                          >
                            {label} <span aria-hidden="true">&rarr;</span>
                          </a>
                        ))
                      ) : (
                        <a href="/projects">
                          View project <span aria-hidden="true">&rarr;</span>
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ma-section ma-alt">
        <div className="ma-container">
          <SectionHead
            label="How we work"
            title="Three stages, no surprises."
            intro="A clear process so you always know what is happening and what comes next."
          />
          <Timeline />
        </div>
      </section>

      {/* FAQ */}
      <section className="ma-section">
        <div className="ma-container ma-narrow">
          <SectionHead label="FAQs" title="Questions we hear often." />
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
            <h2>Have an app in mind? Tell us about it.</h2>
            <p>
              Share what you are planning, even if it is still rough. We will reply with honest
              feedback and a sensible next step.
            </p>
            <Button href="/contact" variant="primary">
              Start your project
            </Button>
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
  --ma-accent: var(--accent, #8b7cff);
  --ma-bg: var(--background-primary, #0a0a12);
  --ma-bg2: var(--background-secondary, #0f0f1a);
  --ma-card: var(--background-card, #14141f);
  --ma-line: var(--border, rgba(255,255,255,.1));
  --ma-text: var(--text-secondary, #b0b2c3);
  --ma-muted: var(--text-muted, #82859a);
  background:var(--ma-bg);
  color:#f2f2f7;
  overflow:hidden;
}
.mobile-app-page *{box-sizing:border-box}
.mobile-app-page h1,.mobile-app-page h2,.mobile-app-page h3{margin:0;color:#fff;letter-spacing:-.02em;font-weight:650}
.mobile-app-page p,.mobile-app-page dl,.mobile-app-page dd,.mobile-app-page ul{margin:0}
.mobile-app-page ul{padding:0;list-style:none}
.mobile-app-page button{font-family:inherit;cursor:pointer}

.ma-container{max-width:1140px;margin:0 auto;padding:0 24px}
.ma-narrow{max-width:800px}
.ma-section{padding:112px 0}
.ma-alt{background:var(--ma-bg2)}

/* heading block: even gaps between label, title, intro and the content below */
.ma-label{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ma-accent);margin-bottom:18px}
.ma-head{max-width:620px;margin-bottom:64px}
.ma-head h2{font-size:clamp(24px,2.8vw,34px);line-height:1.25}
.ma-intro{margin-top:20px;font-size:16px;line-height:1.7;color:var(--ma-text)}
.ma-body{font-size:15px;line-height:1.7;color:var(--ma-text)}

/* motion */
.ma-reveal{opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s ease}
.ma-reveal.is-in{opacity:1;transform:none}
.ma-in{opacity:0;animation:maIn .7s ease forwards}
@keyframes maIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}

/* hero */
.ma-hero{padding:120px 0 88px;border-bottom:1px solid var(--ma-line)}
.ma-hero-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:72px;align-items:center}
.ma-hero h1{font-size:clamp(32px,4.2vw,50px);line-height:1.12;letter-spacing:-.03em;max-width:680px}
.ma-lead{margin-top:26px;max-width:520px;font-size:16px;line-height:1.7;color:var(--ma-text)}
.ma-actions{display:flex;flex-wrap:wrap;align-items:center;gap:28px;margin-top:38px}
.ma-link{color:#fff;font-size:15px;font-weight:550;text-decoration:none;border-bottom:1px solid var(--ma-line);padding-bottom:2px;transition:border-color .2s,color .2s}
.ma-link:hover{border-color:var(--ma-accent);color:var(--ma-accent)}

/* hero phone: still body, live screen */
.ma-device{position:relative;display:flex;justify-content:center;padding:10px 0 20px}
.ma-phone{position:relative;width:268px;height:540px;transform:scale(.8);margin:-54px 0;padding:10px;border-radius:44px;background:#1b1b27;border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 60px -25px rgba(0,0,0,.8);z-index:1}
.ma-phone-notch{position:absolute;top:18px;left:50%;transform:translateX(-50%);width:78px;height:22px;border-radius:12px;background:#000;z-index:3}
.ma-phone-screen{position:relative;height:100%;border-radius:34px;background:#0e0e18;padding:52px 16px 14px;display:flex;flex-direction:column;gap:16px;overflow:hidden}
.ma-app-top{display:flex;justify-content:space-between;align-items:center}
.ma-app-top small{display:block;font-size:11px;color:var(--ma-muted)}
.ma-app-top strong{font-size:20px;color:#fff;font-weight:650}
.ma-app-avatar{width:32px;height:32px;border-radius:50%;background:var(--ma-accent);color:#fff;font-size:13px;font-weight:650;display:flex;align-items:center;justify-content:center}
.ma-app-card{padding:16px;border-radius:18px;background:var(--ma-accent)}
.ma-app-card small{font-size:11px;color:rgba(255,255,255,.8)}
.ma-app-card strong{display:block;font-size:28px;color:#fff;font-weight:650;margin:2px 0 14px;letter-spacing:-.02em}
.ma-bars{display:flex;align-items:flex-end;gap:7px;height:64px}
.ma-bars span{flex:1;background:rgba(255,255,255,.85);border-radius:4px 4px 2px 2px;transform-origin:bottom;animation:maGrow 6s ease-in-out infinite}
.ma-app-list{display:flex;flex-direction:column;gap:10px}
.ma-app-row{display:flex;justify-content:space-between;align-items:center;padding:13px 14px;border-radius:14px;background:rgba(255,255,255,.05);font-size:13px;color:#e8e8f0;animation:maRow 6s ease-in-out infinite}
.ma-app-row em{font-style:normal;font-size:11px;color:var(--ma-muted)}
.ma-app-row em.ok{color:#6fcf97}
.ma-app-tabs{margin-top:auto;display:flex;justify-content:space-around;padding-top:14px;border-top:1px solid rgba(255,255,255,.07)}
.ma-app-tabs i{width:20px;height:5px;border-radius:3px;background:rgba(255,255,255,.18)}
.ma-app-tabs i.on{background:var(--ma-accent);width:28px}
.ma-device-shadow{position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:200px;height:18px;border-radius:50%;background:rgba(0,0,0,.45);filter:blur(14px)}

.ma-toast{position:absolute;left:12px;right:12px;top:46px;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:#fff;color:#14141f;font-size:12px;font-weight:600;box-shadow:0 10px 24px -10px rgba(0,0,0,.7);opacity:0;transform:translateY(-14px);animation:maToast 6s ease-in-out infinite}
.ma-toast span{width:8px;height:8px;border-radius:50%;background:#6fcf97}

@keyframes maGrow{0%{transform:scaleY(.15)}22%,80%{transform:scaleY(1)}100%{transform:scaleY(.15)}}
@keyframes maRow{0%{opacity:0;transform:translateX(-12px)}14%,82%{opacity:1;transform:none}96%,100%{opacity:0;transform:translateX(12px)}}
@keyframes maToast{0%,38%{opacity:0;transform:translateY(-14px)}46%,62%{opacity:1;transform:none}70%,100%{opacity:0;transform:translateY(-14px)}}

/* flow diagram */
.ma-flow{display:grid;grid-template-columns:repeat(4,1fr)}
.ma-flow-cell{position:relative;display:flex}
.ma-flow-col{flex:1;margin-right:48px;padding:28px 24px;border:1px solid var(--ma-line);border-radius:8px;background:var(--ma-card);transition:border-color .3s,transform .3s}
.ma-flow-cell:last-child .ma-flow-col{margin-right:0}
.ma-flow-col:hover{border-color:var(--ma-accent);transform:translateY(-3px)}
.ma-flow-step{font-size:12px;color:var(--ma-muted);margin-bottom:16px}
.ma-flow-col h3{font-size:16px;margin-bottom:12px}
.ma-flow-cap{font-size:13px;line-height:1.6;color:var(--ma-muted);margin-bottom:24px;min-height:42px}
.ma-flow-col ul{display:grid;gap:8px}
.ma-flow-col li{padding:10px 12px;border-radius:6px;background:rgba(255,255,255,.05);font-size:13px;color:#e8e8f0}
.ma-flow-link{position:absolute;right:0;top:50%;width:48px;height:2px;transform:translateY(-50%);background:var(--ma-line)}
.ma-flow-link::after{content:'';position:absolute;right:-1px;top:-4px;border-left:7px solid var(--ma-line);border-top:5px solid transparent;border-bottom:5px solid transparent}
.ma-flow-link i{position:absolute;left:0;top:-2px;width:6px;height:6px;border-radius:50%;background:var(--ma-accent);opacity:0;animation:maPacket 2.4s ease-in-out infinite}
@keyframes maPacket{0%{left:0;opacity:0}15%{opacity:1}75%{opacity:1}100%{left:42px;opacity:0}}

/* planner */
.ma-planner{display:grid;grid-template-columns:1.3fr 1fr;gap:56px;align-items:start}
.ma-planner fieldset{border:0;padding:0;margin:0 0 36px}
.ma-planner legend{padding:0;margin-bottom:16px;font-size:14px;font-weight:600;color:#fff}
.ma-options{display:flex;flex-wrap:wrap;gap:10px}
.ma-options button{padding:10px 16px;border-radius:6px;border:1px solid var(--ma-line);background:transparent;color:var(--ma-text);font-size:14px;transition:border-color .2s,background .2s,color .2s,transform .15s}
.ma-options button:hover{border-color:var(--ma-muted);color:#fff}
.ma-options button:active{transform:scale(.96)}
.ma-options button.on{border-color:var(--ma-accent);background:rgba(139,124,255,.12);color:#fff}
.ma-planner-result{padding:32px;border:1px solid var(--ma-line);border-radius:8px;background:var(--ma-card);position:sticky;top:96px}
.ma-planner-result .ma-label{margin-bottom:16px}
.ma-weeks{font-size:44px;font-weight:650;letter-spacing:-.03em;color:#fff;line-height:1;animation:maPop .4s ease}
.ma-weeks span{font-size:18px;font-weight:500;color:var(--ma-muted);letter-spacing:0}
@keyframes maPop{0%{opacity:.3;transform:translateY(8px)}100%{opacity:1;transform:none}}
.ma-meter{height:4px;background:var(--ma-line);border-radius:2px;margin:26px 0;overflow:hidden}
.ma-meter span{display:block;height:100%;background:var(--ma-accent);border-radius:2px;transition:width .6s cubic-bezier(.3,.8,.3,1)}
.ma-summary{font-size:15px;line-height:1.6;color:#fff;margin-bottom:14px}
.ma-note{font-size:13px;line-height:1.6;color:var(--ma-muted);margin-bottom:28px}

/* projects */
.ma-projects{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.ma-project{display:flex;flex-direction:column;height:100%;padding:32px;border:1px solid var(--ma-line);border-radius:8px;background:var(--ma-card);transition:border-color .3s,transform .3s}
.ma-project:hover{border-color:var(--ma-accent);transform:translateY(-3px)}
.ma-project-index{display:block;font-size:13px;color:var(--ma-muted);margin-bottom:28px;font-variant-numeric:tabular-nums}
.ma-project h3{font-size:19px;margin-bottom:16px}
.ma-project-links{display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:auto;padding-top:28px}
.ma-project-links a{color:#fff;font-size:14px;font-weight:550;text-decoration:none;border-bottom:1px solid var(--ma-line);padding-bottom:2px;transition:border-color .2s,color .2s}
.ma-project-links a span{display:inline-block;transition:transform .25s}
.ma-project-links a:hover{border-color:var(--ma-accent);color:var(--ma-accent)}
.ma-project-links a:hover span{transform:translateX(4px)}

/* timeline */
.ma-timeline{position:relative;max-width:820px;padding-left:4px}
.ma-rail{position:absolute;left:27px;top:28px;bottom:28px;width:2px;background:var(--ma-line)}
.ma-rail span{display:block;width:100%;background:var(--ma-accent);transition:height .15s linear}
.ma-tl{position:relative;display:flex;gap:36px;padding-bottom:56px}
.ma-tl:last-child{padding-bottom:0}
.ma-tl-dot{flex-shrink:0;position:relative;z-index:1;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--ma-bg2);border:2px solid var(--ma-line);color:var(--ma-muted);font-size:13px;font-weight:650;transition:background .4s,border-color .4s,color .4s}
.ma-tl.is-reached .ma-tl-dot{background:var(--ma-accent);border-color:var(--ma-accent);color:#fff}
.ma-tl-body{flex:1;padding:4px 0 0;opacity:.45;transition:opacity .5s ease}
.ma-tl.is-reached .ma-tl-body{opacity:1}
.ma-tl-time{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ma-muted);margin-bottom:12px}
.ma-tl-body h3{font-size:20px;margin-bottom:16px}
.ma-tl-body ul{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
.ma-tl-body li{font-size:13px;color:var(--ma-text);padding:6px 12px;border:1px solid var(--ma-line);border-radius:999px}

/* faq */
.ma-faq{font-size:15px}
.ma-faq p{line-height:1.75}

/* cta */
.ma-cta{padding:120px 0;text-align:center;border-top:1px solid var(--ma-line)}
.ma-cta h2{font-size:clamp(26px,3.2vw,38px);line-height:1.2;letter-spacing:-.03em;margin-bottom:20px}
.ma-cta p{max-width:500px;margin:0 auto 36px;font-size:16px;line-height:1.7;color:var(--ma-text)}

/* responsive */
@media (max-width:900px){
  .ma-hero-grid,.ma-planner{grid-template-columns:1fr;gap:48px}
  .ma-planner-result{position:static}
  .ma-flow{grid-template-columns:1fr}
  .ma-flow-cell{flex-direction:column;align-items:stretch}
  .ma-flow-col{margin-right:0;margin-bottom:44px}
  .ma-flow-cell:last-child .ma-flow-col{margin-bottom:0}
  .ma-flow-cap{min-height:0}
  .ma-flow-link{right:auto;left:50%;top:auto;bottom:0;width:2px;height:44px;transform:none}
  .ma-flow-link::after{right:auto;left:-4px;top:auto;bottom:-1px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid var(--ma-line);border-bottom:0}
  .ma-flow-link i{left:-2px;top:0;animation-name:maPacketV}
}
@keyframes maPacketV{0%{top:0;opacity:0}15%{opacity:1}75%{opacity:1}100%{top:38px;opacity:0}}
@media (max-width:700px){
  .ma-section{padding:72px 0}
  .ma-head{margin-bottom:48px}
  .ma-hero{padding:84px 0 60px}
  .ma-projects{grid-template-columns:1fr}
  .ma-project{padding:26px}
  .ma-planner-result{padding:24px}
  .ma-tl{gap:20px;padding-bottom:44px}
  .ma-tl-dot{width:42px;height:42px}
  .ma-rail{left:25px}
}
@media (prefers-reduced-motion:reduce){
  .mobile-app-page *{animation:none!important;transition:none!important}
  .ma-reveal,.ma-in,.ma-app-row{opacity:1;transform:none}
}
`;