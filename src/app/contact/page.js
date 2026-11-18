import { ContactForm } from '../../components/common/ContactForm.js';

export const metadata = {
  title: 'Contact Dotix | Let\'s Build Your Product',
  description: 'Get in touch with Dotix to discuss your software project. We build SaaS, web applications, mobile apps and business software.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-background-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Let's build your product.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Tell us what you're building and where you stand.
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
