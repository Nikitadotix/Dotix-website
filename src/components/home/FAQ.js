
'use client';

import { motion } from 'framer-motion';
import { faqs } from '../../data/faqs.js';
import { FAQAccordion } from '../common/FAQAccordion.js';
import { SectionHeading } from '../common/SectionHeading.js';

export function FAQ() {
  return (
    <section
      className="relative isolate overflow-hidden border-t border-border/70 bg-background-secondary/80 py-16 sm:py-24"
      id="faq"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            opacity: [0.25, 0.5, 0.25],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/4 top-1/3 h-[400px] w-[600px] rounded-full bg-accent/[0.07] blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* FAQ Heading + Accordion */}
        <div className="mb-10 sm:mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl lg:sticky lg:top-28 lg:pt-4"
          >
            <SectionHeading
              eyebrow="Got questions?"
              title={
                <>
                  Frequently Asked{' '}
                  <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                    Questions
                  </span>
                </>
              }
              description="Everything you need to know about working with Dotix, from IP ownership and sprint communication to pricing structures."
              spacingClassName="mb-0"
              titleClassName="text-left text-2xl font-extrabold text-white sm:text-4xl md:text-5xl"
              descriptionClassName="max-w-md text-sm sm:text-base leading-relaxed"
            />
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <FAQAccordion
              faqs={faqs.filter((faq) => faq.showOnHomepage !== false)}
              initialOpenIndex={null}
            />
          </motion.div>

        </div>

     
{/* Minimal Bottom CTA */}

      </div>
    </section>
  );
}
