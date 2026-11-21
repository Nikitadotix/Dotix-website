
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Sparkles,
  Send,
  MessageCircle,
  Globe2,
} from 'lucide-react';

import { Button } from './Button.js';
import { FAQAccordion } from './FAQAccordion.js';
import { faqs } from '../../data/faqs.js';

/* ============================================
   DATA
============================================ */

const queryOptions = [
  { value: 'product', label: 'Product Development' },
  { value: 'services', label: 'Digital Services' },
  { value: 'others', label: 'Something Else' },
];

const requiredFields = ['name', 'email', 'queryFor', 'message'];

const mapsUrl =
  'https://maps.google.com/?q=H-49,+5th+Floor,+Sector+63,+H-Block,+Noida,+Uttar+Pradesh,+India,+201301';

const fieldClass =
  'w-full border-0 border-b border-border bg-transparent px-0 py-3.5 text-sm text-text-primary placeholder:text-text-muted/70 outline-none transition-all duration-300 focus:border-accent focus:ring-0';

const labelClass =
  'mb-2 block text-[13px] font-medium text-text-secondary';

/* ============================================
   ANIMATION
============================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ============================================
   CONTACT DETAIL
============================================ */

function ContactDetail({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background-primary text-text-secondary">
        <Icon size={16} strokeWidth={1.6} />
      </div>

      <div className="min-w-0 pt-0.5">
        <span className="mb-1 block text-[11px] text-text-muted">
          {label}
        </span>

        <div className="text-[13px] font-medium leading-relaxed text-text-primary">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   BRIEF ROW
============================================ */

function BriefRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/70 py-3 last:border-0">
      <span className="shrink-0 text-[11px] text-text-muted">
        {label}
      </span>

      <span
        className={`max-w-[65%] break-words text-right text-[11px] transition-colors ${
          value
            ? 'font-medium text-text-primary'
            : 'text-text-muted'
        }`}
      >
        {value || 'Waiting for details'}
      </span>
    </div>
  );
}

/* ============================================
   LIVE BRIEF CARD
============================================ */

function BriefCard({ formData }) {
  const filled = requiredFields.filter(
    (key) => formData[key].trim() !== ''
  ).length;

  const percent = Math.round(
    (filled / requiredFields.length) * 100
  );

  const queryLabel =
    queryOptions.find(
      (option) => option.value === formData.queryFor
    )?.label || '';

  return (
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="lg:sticky lg:top-28"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-border p-5 sm:p-6"
        style={{
          background:
            'var(--contact-card, var(--background-secondary))',
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
          style={{ background: 'var(--accent)', opacity: 0.09 }}
        />

        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Live preview
              </span>

              <h3 className="mt-1 text-lg font-medium tracking-tight text-text-primary">
                Your project brief
              </h3>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background-primary text-accent">
              <Sparkles size={16} />
            </div>
          </div>

          <div>
            <BriefRow
              label="Your name"
              value={formData.name.trim()}
            />

            <BriefRow
              label="Email"
              value={formData.email.trim()}
            />

            <BriefRow
              label="Project type"
              value={queryLabel}
            />

            <BriefRow
              label="Your idea"
              value={formData.message.trim()}
            />
          </div>

          <div className="mt-7 rounded-xl border border-border bg-background-primary p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-medium text-text-secondary">
                Brief completion
              </span>

              <motion.span
                key={percent}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-text-primary"
              >
                {percent}%
              </motion.span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent)' }}
                initial={false}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-[10px] text-text-muted">
                {filled} of 4 fields completed
              </span>

              <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-medium text-text-secondary">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    percent === 100
                      ? 'bg-green-500'
                      : 'bg-amber-500'
                  }`}
                />
                {percent === 100 ? 'Ready to send' : 'In progress'}
              </span>
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-text-muted">
            A clearer brief helps us understand your vision and get
            the conversation started.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

/* ============================================
   CONTACT FORM
============================================ */

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    // Connect your approved backend/API here.
    // This currently simulates a successful submission.

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      setFormData({
        name: '',
        email: '',
        queryFor: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <>
      {/* ======================================
          HERO + CONTACT SECTION
      ====================================== */}

      <section className="relative overflow-hidden bg-background-secondary">
        <div className="mx-auto max-w-[1050px] px-5 pb-14 pt-14 sm:px-7 sm:pb-18 sm:pt-18 lg:px-8 lg:pb-20 lg:pt-20">

          {/* HERO */}

          <div className="grid grid-cols-1 gap-9 border-b border-border pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12 lg:pb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-background-primary px-3.5 py-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-green-500" />
                </span>

                <span className="text-[11px] font-medium text-text-secondary">
                  Open to new projects
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.23em] text-accent"
              >
                LET'S CREATE SOMETHING GREAT
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="max-w-3xl text-[clamp(3rem,6.5vw,5.5rem)] font-medium leading-[0.93] tracking-[-0.075em] text-text-primary"
              >
                Have an idea?
                <br />
                <span className="text-text-muted">
                  Let's build it
                </span>
                <span className="text-accent">.</span>
              </motion.h1>
            </motion.div>

            {/* HERO DESCRIPTION */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[340px] lg:ml-auto lg:pb-1"
            >
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Great products start with a conversation. Tell us
                what you're imagining, and let's turn that idea into
                something meaningful.
              </p>

              <a
                href="#contact-form"
                className="mt-6 inline-flex items-center gap-3 text-[13px] font-semibold text-text-primary transition-colors hover:text-accent"
              >
                Start a conversation

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white">
                  <ArrowDownRight size={16} />
                </span>
              </a>
            </motion.div>
          </div>

          {/* CONTACT INFORMATION */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 gap-7 border-b border-border py-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:py-10"
          >
            <motion.div variants={fadeUp}>
              <ContactDetail icon={Mail} label="EMAIL US">
                <a
                  href="mailto:hello@dotix.io"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  hello@dotix.io
                  <ArrowUpRight size={13} />
                </a>
              </ContactDetail>
            </motion.div>

            <motion.div variants={fadeUp}>
              <ContactDetail icon={MapPin} label="FIND OUR OFFICE">
                H-49, 5th Floor, Sector 63,
                <br />
                Noida, Uttar Pradesh, 201301

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent hover:opacity-70"
                >
                  Get directions
                  <ArrowUpRight size={12} />
                </a>
              </ContactDetail>
            </motion.div>

            <motion.div variants={fadeUp}>
              <ContactDetail icon={Clock3} label="WHAT TO EXPECT">
                A real person, a thoughtful conversation, and a
                reply from our team.
              </ContactDetail>
            </motion.div>
          </motion.div>

          {/* FORM + LIVE BRIEF */}

          <div
            id="contact-form"
            className="grid scroll-mt-24 grid-cols-1 gap-10 pt-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:pt-20"
          >
            {/* LEFT: FORM */}

            <div className="min-w-0">
              <div className="mb-8">
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  THE FIRST STEP
                </span>

                <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
                  Tell us what you're
                  <br className="hidden sm:block" />
                  thinking about<span className="text-accent">.</span>
                </h2>

                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-text-secondary">
                  Share a little about your project. We'll take it
                  from there.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-border bg-background-primary p-7 sm:p-9"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check size={24} />
                    </div>

                    <h3 className="text-2xl font-medium tracking-tight text-text-primary">
                      Message received.
                    </h3>

                    <p className="mt-3 max-w-md text-[13px] leading-relaxed text-text-secondary">
                      Thanks for reaching out. We're looking forward
                      to learning more about your idea.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitStatus(null)}
                      className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-opacity hover:opacity-70"
                    >
                      Send another enquiry
                      <ArrowUpRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {/* NAME + EMAIL */}

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Your name <span className="text-accent">*</span>
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={fieldClass}
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Work email <span className="text-accent">*</span>
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={fieldClass}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    {/* PROJECT TYPE */}

                    <fieldset>
                      <legend className={`${labelClass} mb-4`}>
                        What are you looking to build?
                        <span className="text-accent"> *</span>
                      </legend>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {queryOptions.map((option) => (
                          <label
                            key={option.value}
                            className="relative cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="queryFor"
                              value={option.value}
                              required
                              checked={
                                formData.queryFor === option.value
                              }
                              onChange={handleChange}
                              className="peer sr-only"
                            />

                            <span className="flex min-h-[50px] items-center justify-between gap-2 rounded-xl border border-border bg-background-primary px-3 py-3 text-[11px] font-medium text-text-secondary transition-all duration-300 hover:border-text-muted peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                              {option.label}

                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border transition-all peer-checked:border-accent peer-checked:bg-accent">
                                {formData.queryFor === option.value && (
                                  <Check
                                    size={10}
                                    className="text-white"
                                  />
                                )}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* MESSAGE */}

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Tell us about your idea
                        <span className="text-accent"> *</span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`${fieldClass} resize-none`}
                        placeholder="What are you planning? What problem are you trying to solve?"
                      />
                    </div>

                    {/* SUBMIT */}

                    <div className="flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex max-w-sm items-start gap-2">
                        <MessageCircle
                          size={14}
                          className="mt-0.5 shrink-0 text-accent"
                        />

                        <p className="text-[11px] leading-relaxed text-text-muted">
                          No pressure, no commitments. Just a
                          conversation about your next big idea.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto sm:min-w-[180px]"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send your enquiry
                            <Send size={14} />
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: BRIEF */}

            <div className="min-w-0">
              <BriefCard formData={formData} />

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-border px-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Globe2 size={15} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-text-primary">
                    Building beyond boundaries
                  </p>

                  <p className="mt-0.5 text-[10px] text-text-muted">
                    Ideas welcome from anywhere in the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          FAQ SECTION
      ====================================== */}

      <section className="bg-background-primary py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1050px] px-5 sm:px-7 lg:px-8">
          <div className="grid grid-cols-1 gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                GOOD TO KNOW
              </span>

              <h2 className="max-w-sm text-3xl font-medium leading-tight tracking-tight text-text-primary sm:text-4xl">
                A few things
                <br />
                you might
                <span className="text-text-muted"> wonder</span>
                <span className="text-accent">.</span>
              </h2>

              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-text-secondary">
                Have questions before getting started? Here are a
                few things that might help.
              </p>

              <a
                href="mailto:hello@dotix.io"
                className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-text-primary transition-colors hover:text-accent"
              >
                Still have questions?
                <ArrowUpRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <FAQAccordion faqs={faqs} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
