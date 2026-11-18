import Link from 'next/link';
import { X, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-white">
              Dotix
            </Link>
            <p className="text-sm text-text-secondary">
              We build the software behind the businesses that run on it.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-white transition-colors" aria-label="Twitter">
                <X className="w-5 h-5" />
              </a>
              <a href="mailto:hello@dotix.io" className="text-text-secondary hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://duddy.io" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Duddy
                </Link>
              </li>
              <li>
                <Link href="https://omnibase.in" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Omnibase
                </Link>
              </li>
              <li>
                <Link href="https://rewardhub.apploft.in" className="text-sm text-text-secondary hover:text-white transition-colors">
                  RewardHub
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Apploft
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/saas-development" className="text-sm text-text-secondary hover:text-white transition-colors">
                  SaaS Development
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development" className="text-sm text-text-secondary hover:text-white transition-colors">
                  App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <Link href="/legal/privacy-policy" className="text-sm text-text-secondary hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/cookie-policy" className="text-sm text-text-secondary hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/legal/terms-and-conditions" className="text-sm text-text-secondary hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </div>
            <p className="text-sm text-text-muted">
              In service since 2023. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
