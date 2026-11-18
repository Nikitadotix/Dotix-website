'use client';

import { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Check, 
  Clock, 
  Code2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
  Cpu
} from 'lucide-react';
import { Button } from '../common/Button.js';

export function ProjectEstimator() {
  const [projectType, setProjectType] = useState('saas');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'billing', 'analytics']);
  const [timelinePreference, setTimelinePreference] = useState('mvp');

  const projectTypes = [
    { id: 'saas', label: 'SaaS Platform / Web App', baseWeeks: 6, icon: Layers },
    { id: 'mobile', label: 'iOS & Android Mobile App', baseWeeks: 7, icon: Cpu },
    { id: 'dashboard', label: 'Internal Tool / Dashboard', baseWeeks: 4, icon: Server },
    { id: 'website', label: 'High-Performance Web App', baseWeeks: 3, icon: Zap },
  ];

  const featureOptions = [
    { id: 'auth', label: 'Multi-Tenant Auth & RBAC', weeks: 1, tech: 'JWT / Session / OAuth' },
    { id: 'billing', label: 'Stripe Subscriptions & Invoicing', weeks: 1, tech: 'Stripe Billing / Webhooks' },
    { id: 'ai', label: 'AI Engine / LLM Workflows', weeks: 1.5, tech: 'OpenAI API / Vector DB' },
    { id: 'realtime', label: 'Real-Time Sync & WebSockets', weeks: 1, tech: 'Redis PubSub / Socket.io' },
    { id: 'analytics', label: 'Custom Analytics & Reports', weeks: 1, tech: 'Telemetry / Charts / CSV Export' },
    { id: 'notifications', label: 'Push & Multi-Channel Alerts', weeks: 0.5, tech: 'FCM / Resend / SMS' },
  ];

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      if (selectedFeatures.length > 1) {
        setSelectedFeatures(selectedFeatures.filter(f => f !== id));
      }
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate estimated weeks
  const baseWeeks = projectTypes.find(t => t.id === projectType)?.baseWeeks || 6;
  const featuresWeeks = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find(f => f.id === fId);
    return acc + (feat ? feat.weeks : 0);
  }, 0);

  const speedMultiplier = timelinePreference === 'rapid' ? 0.85 : timelinePreference === 'enterprise' ? 1.3 : 1;
  const calculatedWeeks = Math.max(4, Math.round((baseWeeks + featuresWeeks) * speedMultiplier));

  // Determine recommended stack
  const getRecommendedStack = () => {
    switch (projectType) {
      case 'mobile':
        return ['React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL', 'FCM', 'Tailwind'];
      case 'dashboard':
        return ['React', 'Next.js', 'Fastify / Go', 'MariaDB', 'Tailwind', 'Redis'];
      case 'website':
        return ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'];
      case 'saas':
      default:
        return ['Next.js 15', 'Go / Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Stripe'];
    }
  };

  return (
    <section className="py-24 bg-background-secondary/90 border-t border-border/70 relative overflow-hidden" id="estimator">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[450px] bg-accent/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" /> [04] Interactive Scope Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Configure Your Architecture &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">
              Calculate Timeline
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Select your product type and core requirements to preview recommended architecture and sprint timeline immediately.
          </p>
        </div>

        {/* Estimator Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-background-card p-6 sm:p-8 rounded-2xl border border-border">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs font-mono text-accent uppercase tracking-wider block mb-3 font-semibold">
                1. Select Product Archetype
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id)}
                      className={`p-4 rounded-xl text-left border transition-all duration-200 flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-accent bg-accent/10 text-white shadow-sm'
                          : 'border-border bg-background-elevated/60 text-text-secondary hover:text-white hover:border-border/80'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-accent text-white' : 'bg-background-card text-text-muted'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Key Features Checklist */}
            <div>
              <label className="text-xs font-mono text-accent uppercase tracking-wider block mb-3 font-semibold">
                2. Key Functional Capabilities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureOptions.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 flex items-start gap-2.5 ${
                        isChecked
                          ? 'border-accent/60 bg-accent/[0.07] text-white'
                          : 'border-border/70 bg-background-elevated/40 text-text-secondary hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-accent border-accent text-white' : 'border-border bg-background-card'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-medium leading-snug">{feat.label}</div>
                        <div className="text-[10px] font-mono text-text-muted mt-0.5">{feat.tech}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Target Launch Velocity */}
            <div>
              <label className="text-xs font-mono text-accent uppercase tracking-wider block mb-3 font-semibold">
                3. Deployment Velocity Target
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'rapid', label: 'Hyper-Sprint', sub: 'Fastest MVP' },
                  { id: 'mvp', label: 'Standard Agile', sub: 'Balanced' },
                  { id: 'enterprise', label: 'Enterprise Grade', sub: 'Comprehensive' },
                ].map((vel) => (
                  <button
                    key={vel.id}
                    type="button"
                    onClick={() => setTimelinePreference(vel.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      timelinePreference === vel.id
                        ? 'border-accent bg-accent/10 text-white'
                        : 'border-border bg-background-elevated/40 text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{vel.label}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{vel.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Architectural Output & Scoping Result (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-background-card to-background-elevated p-6 sm:p-8 rounded-2xl border border-border shadow-2xl relative">
            
            {/* Top Estimated Timeline Metric */}
            <div className="mb-6 pb-6 border-b border-border/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                Estimated Sprint Roadmap
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  ~{calculatedWeeks}
                </span>
                <span className="text-lg font-bold text-accent font-mono">Weeks to Production</span>
              </div>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Includes architectural blueprint, core sprint development, automated QA testing, and live cloud deployment.
              </p>
            </div>

            {/* Recommended Architecture Stack */}
            <div className="mb-6 pb-6 border-b border-border/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent block mb-2 font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Recommended Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {getRecommendedStack().map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-background-primary text-text-primary border border-border/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones Blueprint */}
            <div className="space-y-2.5 mb-8">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-2">
                Standard Phase Progression
              </span>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-mono text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>System Architecture, Schema & UI Tokens</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-mono text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Sprint Development with Bi-Weekly Staging Deploys</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-mono text-[10px] flex items-center justify-center shrink-0">3</span>
                <span>Security Audit, Load Testing & Production Launch</span>
              </div>
            </div>

            {/* Action Call to Action */}
            <div className="space-y-3">
              <Button
                href={`/contact?type=${projectType}&timeline=${calculatedWeeks}w`}
                variant="primary"
                className="w-full py-3.5 text-sm font-semibold justify-center"
              >
                Discuss This Scope with Lead Engineers
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>NDA Protected • 48-Hour Tailored Written Proposal</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
