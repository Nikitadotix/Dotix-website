'use client';

import { Star, ShieldCheck, Users, Rocket, Clock, Award } from 'lucide-react';

export function SocialProof() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Daily Active Users',
      subtext: 'Powered across Dotix-built platforms',
    },
    {
      icon: Rocket,
      value: '50+',
      label: 'Production MVPs Shipped',
      subtext: 'From concept to live deployment',
    },
    {
      icon: Clock,
      value: '99.8%',
      label: 'On-Time Sprint Delivery',
      subtext: 'Agile 2-week review cycles',
    },
    {
      icon: Award,
      value: '$15M+',
      label: 'Partner Value Created',
      subtext: 'Client funding & revenue generated',
    },
  ];

  const clientBrands = [
    { name: 'OmniBase', tag: 'BaaS Platform' },
    { name: 'RewardHub', tag: 'FinTech & Rewards' },
    { name: 'Duddy AI', tag: 'No-Code Engine' },
    { name: 'Buzzr', tag: 'Influencer SaaS' },
    { name: 'MadJoy', tag: 'Consumer Commerce' },
    { name: 'InloopMedia', tag: 'Growth Agency' },
  ];

  return (
    <section className="py-20 bg-background-secondary/70 border-y border-border/80 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Client Logos Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-6">
            Trusted by founders, high-growth startups, and modern businesses
          </p>

          {/* Brands Grid with stylish pill badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {clientBrands.map((brand) => (
              <div
                key={brand.name}
                className="group p-3.5 rounded-xl bg-background-card/80 border border-border/70 hover:border-accent/40 hover:bg-background-elevated transition-all duration-300 flex flex-col items-center justify-center cursor-default"
              >
                <span className="text-base font-bold text-white tracking-tight group-hover:text-accent transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] font-mono text-text-muted mt-1 group-hover:text-text-secondary">
                  {brand.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-border/60">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-background-card/60 border border-border/60 hover:border-border transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-background-elevated flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-text-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-text-muted leading-relaxed">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification and Clutch Trust Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-background-card border border-border/90 shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent text-accent"
                />
              ))}
            </div>
            <div className="text-xs text-text-secondary">
              <span className="font-bold text-white">5.0 / 5.0</span> on Clutch & Client Reviews
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-elevated/60 border border-border/70 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>100% Verified Production Delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
}
