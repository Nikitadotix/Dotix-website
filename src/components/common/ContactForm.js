'use client';

import { useState } from 'react';
import { Button } from './Button.js';
import { FAQAccordion } from './FAQAccordion.js';
import { faqs } from '../../data/faqs.js';
import { MapPin, Mail } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    queryFor: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect to approved backend/API when confirmed
    // For now, simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', queryFor: '', message: '' });
    }, 1000);
  };

  return (
    <>
      {/* Contact Section */}
      <section className="py-14 sm:py-20 lg:py-24 bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Contact Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                Let&apos;s talk.
              </h2>
              <p className="text-text-secondary mb-6 sm:mb-8 text-sm sm:text-base">
                A human replies, not a bot.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Email</p>
                    <a href="mailto:hello@dotix.io" className="text-text-secondary hover:text-accent transition-colors">
                      hello@dotix.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Office</p>
                    <p className="text-text-secondary leading-relaxed">
                      H-49, 5th Floor, Sector 63, H-Block,<br />
                      Noida, Uttar Pradesh, India, 201301
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  href="https://maps.google.com/?q=H-49,+5th+Floor,+Sector+63,+H-Block,+Noida,+Uttar+Pradesh,+India,+201301"
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-background-card p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-border">
              {submitStatus === 'success' ? (
                <div className="text-center py-10 sm:py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message sent!
                  </h3>
                  <p className="text-text-secondary">
                    We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-background-elevated border border-border text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Company Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-background-elevated border border-border text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="queryFor" className="block text-sm font-medium text-white mb-2">
                      Query For *
                    </label>
                    <select
                      id="queryFor"
                      name="queryFor"
                      required
                      value={formData.queryFor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-background-elevated border border-border text-white focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="product">Product</option>
                      <option value="services">Services</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      How Can We Help? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-background-elevated border border-border text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Form'}
                  </Button>

                  <p className="text-xs text-text-muted text-center">
                    * Form integration pending backend confirmation
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">
            Questions, answered.
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}
