'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FAQAccordion({ faqs, initialOpenIndex = 0 }) {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3.5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? 'bg-background-card border-accent/40 shadow-lg shadow-accent/5'
                : 'bg-background-card/70 border-border hover:border-border/90 hover:bg-background-card'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className={`text-sm sm:text-base font-bold pr-3 sm:pr-4 transition-colors ${
                isOpen ? 'text-white' : 'text-text-primary hover:text-white'
              }`}>
                {faq.question}
              </span>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isOpen ? 'bg-accent/15 text-accent' : 'bg-background-elevated text-text-muted'
              }`}>
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                ) : (
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                )}
              </div>
            </button>
            
            {isOpen && (
              <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/40 mt-1">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
